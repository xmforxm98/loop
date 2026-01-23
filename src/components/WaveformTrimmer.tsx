"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';
import { Play, Pause, Scissors, Undo2, RotateCcw } from 'lucide-react';

interface Segment {
    id: string;
    start: number;
    end: number;
}

interface WaveformTrimmerProps {
    file: File;
    onSegmentsChange: (segments: Segment[]) => void;
}

// Helper to convert AudioBuffer to WAV Blob for WaveSurfer v7 compatibility
function bufferToWav(buffer: AudioBuffer): Blob {
    const numOfChan = buffer.numberOfChannels;
    const length = buffer.length * numOfChan * 2 + 44;
    const bufferArray = new ArrayBuffer(length);
    const view = new DataView(bufferArray);
    const channels = [];
    let i, sample, offset = 0, pos = 0;

    // write WAVE header
    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8); // file length - 8
    setUint32(0x45564157); // "WAVE"

    setUint32(0x20746d66); // "fmt " chunk
    setUint32(16); // length = 16
    setUint16(1); // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(buffer.sampleRate);
    setUint32(buffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2); // block-align
    setUint16(16); // 16-bit (hardcoded)

    setUint32(0x61746164); // "data" - chunk
    setUint32(length - pos - 4); // chunk length

    // write interleaved data
    for (i = 0; i < numOfChan; i++) channels.push(buffer.getChannelData(i));

    while (pos < length) {
        for (i = 0; i < numOfChan; i++) {
            sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
            sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // scale to 16-bit signed int
            view.setInt16(pos, sample, true); // write 16-bit sample
            pos += 2;
        }
        offset++;
    }

    return new Blob([bufferArray], { type: "audio/wav" });

    function setUint16(data: number) {
        view.setUint16(pos, data, true);
        pos += 2;
    }

    function setUint32(data: number) {
        view.setUint32(pos, data, true);
        pos += 4;
    }
}

export default function WaveformTrimmer({ file, onSegmentsChange }: WaveformTrimmerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);
    const regionsPluginRef = useRef<RegionsPlugin | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const originalBufferRef = useRef<AudioBuffer | null>(null);
    const currentBlobUrlRef = useRef<string | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [segments, setSegments] = useState<Segment[]>([]);
    const [history, setHistory] = useState<Segment[][]>([]);
    const [selectionRange, setSelectionRange] = useState<{ start: number, end: number } | null>(null);
    const [isDecoding, setIsDecoding] = useState(false);

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00.00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        const ms = Math.floor((time % 1) * 100);
        return `${mins}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    };

    const createMergedBuffer = useCallback((originalBuffer: AudioBuffer, currentSegments: Segment[]) => {
        const ctx = audioContextRef.current;
        if (!ctx || !originalBuffer) return null;

        const sampleRate = originalBuffer.sampleRate;
        const totalLength = currentSegments.reduce((acc, seg) => acc + (seg.end - seg.start), 0);
        const frameCount = Math.floor(totalLength * sampleRate);

        if (frameCount <= 0) return null;

        const newBuffer = ctx.createBuffer(
            originalBuffer.numberOfChannels,
            frameCount,
            sampleRate
        );

        for (let channel = 0; channel < originalBuffer.numberOfChannels; channel++) {
            const originalData = originalBuffer.getChannelData(channel);
            const newData = newBuffer.getChannelData(channel);
            let offset = 0;

            currentSegments.forEach(seg => {
                const startFrame = Math.floor(seg.start * sampleRate);
                const endFrame = Math.floor(seg.end * sampleRate);
                const segmentData = originalData.subarray(startFrame, endFrame);
                newData.set(segmentData, offset);
                offset += segmentData.length;
            });
        }

        return newBuffer;
    }, []);

    const updateWaveform = useCallback(async (currentSegments: Segment[]) => {
        if (!wavesurferRef.current || !originalBufferRef.current) return;

        setIsDecoding(true);
        try {
            const mergedBuffer = createMergedBuffer(originalBufferRef.current, currentSegments);

            if (currentBlobUrlRef.current) {
                URL.revokeObjectURL(currentBlobUrlRef.current);
                currentBlobUrlRef.current = null;
            }

            if (mergedBuffer) {
                const wavBlob = bufferToWav(mergedBuffer);
                const url = URL.createObjectURL(wavBlob);
                currentBlobUrlRef.current = url;

                // Pre-calculate peaks array of arrays for instant v7 rendering
                const peaks = [];
                for (let c = 0; c < mergedBuffer.numberOfChannels; c++) {
                    const chan = mergedBuffer.getChannelData(c);
                    const chanPeaks = [];
                    const step = Math.floor(chan.length / 1000) || 1;
                    for (let n = 0; n < chan.length; n += step) {
                        chanPeaks.push(chan[n]);
                    }
                    peaks.push(chanPeaks);
                }

                await wavesurferRef.current.load(url, peaks);
                setDuration(mergedBuffer.duration);
            } else {
                setDuration(0);
            }
        } catch (error) {
            console.error("Waveform update failed:", error);
        } finally {
            setIsDecoding(false);
        }
    }, [createMergedBuffer]);

    useEffect(() => {
        if (!containerRef.current) return;

        const wavesurfer = WaveSurfer.create({
            container: containerRef.current,
            waveColor: '#cbd5e1',
            progressColor: '#3b82f6',
            cursorColor: '#3b82f6',
            cursorWidth: 2,
            barWidth: 2,
            barGap: 3,
            barRadius: 4,
            height: 120,
            normalize: true,
            minPxPerSec: 50,
            interact: true,
        });

        const regions = wavesurfer.registerPlugin(RegionsPlugin.create());
        regionsPluginRef.current = regions;

        const initAudio = async () => {
            setIsDecoding(true);
            try {
                const arrayBuffer = await file.arrayBuffer();
                const ctx = new (window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext!)();
                audioContextRef.current = ctx;
                const decodedBuffer = await ctx.decodeAudioData(arrayBuffer);
                originalBufferRef.current = decodedBuffer;

                const d = decodedBuffer.duration;
                setDuration(d);

                const initialSegments = [{ id: 'init', start: 0, end: d }];
                setSegments(initialSegments);
                onSegmentsChange(initialSegments);

                const wavBlob = bufferToWav(decodedBuffer);
                const url = URL.createObjectURL(wavBlob);
                currentBlobUrlRef.current = url;

                const peaks = [];
                for (let c = 0; c < decodedBuffer.numberOfChannels; c++) {
                    const chan = decodedBuffer.getChannelData(c);
                    const chanPeaks = [];
                    const step = Math.floor(chan.length / 1000) || 1;
                    for (let i = 0; i < chan.length; i += step) {
                        chanPeaks.push(chan[i]);
                    }
                    peaks.push(chanPeaks);
                }

                await wavesurfer.load(url, peaks);
            } catch (error) {
                console.error("Audio initialization failed:", error);
            } finally {
                setIsDecoding(false);
            }
        };

        initAudio();

        wavesurfer.on('audioprocess', () => setCurrentTime(wavesurfer.getCurrentTime()));
        wavesurfer.on('interaction', (newTime) => {
            wavesurfer.setTime(newTime);
            setCurrentTime(newTime);
        });

        regions.enableDragSelection({
            color: 'rgba(59, 130, 246, 0.2)',
        });

        regions.on('region-created', (region) => {
            regions.getRegions().forEach((r) => {
                if (r.id !== region.id) r.remove();
            });
            setSelectionRange({ start: region.start, end: region.end });
        });

        regions.on('region-updated', (region) => {
            setSelectionRange({ start: region.start, end: region.end });
        });

        wavesurfer.on('play', () => setIsPlaying(true));
        wavesurfer.on('pause', () => setIsPlaying(false));

        wavesurferRef.current = wavesurfer;

        // Keyboard shortcuts
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                wavesurfer.playPause();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            wavesurfer.destroy();
            if (audioContextRef.current) audioContextRef.current.close();
            if (currentBlobUrlRef.current) URL.revokeObjectURL(currentBlobUrlRef.current);
        };
    }, [file]);

    const saveToHistory = () => {
        setHistory(prev => [...prev, [...segments]]);
    };

    const undo = () => {
        if (history.length === 0) return;
        const prevSegments = history[history.length - 1];
        setHistory(prev => prev.slice(0, -1));
        setSegments(prevSegments);
        onSegmentsChange(prevSegments);

        updateWaveform(prevSegments);

        regionsPluginRef.current?.clearRegions();
        setSelectionRange(null);
    };

    const togglePlay = () => wavesurferRef.current?.playPause();

    const handleRippleCut = () => {
        if (!selectionRange || !wavesurferRef.current) return;

        saveToHistory();

        const cutStart = selectionRange.start;
        const cutEnd = selectionRange.end;

        const nextSegments: Segment[] = [];
        let currentTimelineOffset = 0;

        segments.forEach(seg => {
            const segDuration = seg.end - seg.start;
            const segTimelineStart = currentTimelineOffset;
            const segTimelineEnd = currentTimelineOffset + segDuration;

            if (segTimelineEnd <= cutStart || segTimelineStart >= cutEnd) {
                nextSegments.push(seg);
            } else {
                if (segTimelineStart < cutStart) {
                    const keepDurationBefore = cutStart - segTimelineStart;
                    nextSegments.push({
                        id: Math.random().toString(36).substr(2, 9),
                        start: seg.start,
                        end: seg.start + keepDurationBefore
                    });
                }
                if (segTimelineEnd > cutEnd) {
                    const skipDuration = cutEnd - segTimelineStart;
                    nextSegments.push({
                        id: Math.random().toString(36).substr(2, 9),
                        start: seg.start + skipDuration,
                        end: seg.end
                    });
                }
            }
            currentTimelineOffset += segDuration;
        });

        setSegments(nextSegments);
        onSegmentsChange(nextSegments);
        updateWaveform(nextSegments);

        regionsPluginRef.current?.clearRegions();
        setSelectionRange(null);
    };

    const handleCrop = () => {
        if (!selectionRange || !wavesurferRef.current) return;

        saveToHistory();

        const cutStart = selectionRange.start;
        const cutEnd = selectionRange.end;

        const nextSegments: Segment[] = [];
        let currentTimelineOffset = 0;

        segments.forEach(seg => {
            const segDuration = seg.end - seg.start;
            const segTimelineStart = currentTimelineOffset;
            const segTimelineEnd = currentTimelineOffset + segDuration;

            // Map timeline cut to original segment
            if (cutStart < segTimelineEnd && cutEnd > segTimelineStart) {
                const overlapStart = Math.max(segTimelineStart, cutStart);
                const overlapEnd = Math.min(segTimelineEnd, cutEnd);

                const originalStart = seg.start + (overlapStart - segTimelineStart);
                const originalEnd = seg.start + (overlapEnd - segTimelineStart);

                nextSegments.push({
                    id: Math.random().toString(36).substr(2, 9),
                    start: originalStart,
                    end: originalEnd
                });
            }
            currentTimelineOffset += segDuration;
        });

        setSegments(nextSegments);
        onSegmentsChange(nextSegments);
        updateWaveform(nextSegments);

        regionsPluginRef.current?.clearRegions();
        setSelectionRange(null);
    };

    return (
        <div className="waveform-container bg-slate-50/80 backdrop-blur-md rounded-[2.5rem] p-10 border border-slate-200/60 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-3">
                    <button
                        onClick={togglePlay}
                        disabled={isDecoding || duration === 0}
                        className="trimmer-btn btn-play-pause w-16 h-16 shadow-lg shadow-primary/20"
                    >
                        {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                    </button>

                    <div className="h-12 w-[1px] bg-slate-200/80 mx-2" />

                    <button
                        onClick={handleCrop}
                        disabled={!selectionRange || isDecoding}
                        className="trimmer-btn px-6 py-3.5 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-hover hover:-translate-y-0.5 transition-all shadow-md shadow-primary/10 disabled:opacity-30"
                    >
                        <Scissors size={20} />
                        Keep Selected
                    </button>

                    <button
                        onClick={handleRippleCut}
                        disabled={!selectionRange || isDecoding}
                        className="trimmer-btn px-6 py-3.5 bg-danger text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-red-600 hover:-translate-y-0.5 transition-all shadow-md shadow-danger/10 disabled:opacity-30"
                    >
                        <Trash2 size={20} />
                        Delete Part
                    </button>

                    <div className="h-12 w-[1px] bg-slate-200/80 mx-2" />

                    <button
                        onClick={undo}
                        disabled={history.length === 0 || isDecoding}
                        className="trimmer-btn btn-secondary-action p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all font-bold flex items-center gap-2"
                        title="Undo (Ctrl+Z)"
                    >
                        <Undo2 size={20} />
                        Undo
                    </button>

                    <button
                        onClick={() => {
                            if (confirm('Are you sure you want to reset all edits?')) {
                                saveToHistory();
                                const initialSegments = [{ id: 'init-' + Math.random(), start: 0, end: originalBufferRef.current?.duration || 0 }];
                                setSegments(initialSegments);
                                onSegmentsChange(initialSegments);
                                updateWaveform(initialSegments);
                            }
                        }}
                        disabled={isDecoding || (segments.length === 1 && segments[0].start === 0 && segments[0].end === originalBufferRef.current?.duration)}
                        className="trimmer-btn text-slate-400 hover:text-danger p-3.5 transition-all font-bold flex items-center gap-2"
                    >
                        <RotateCcw size={20} />
                        Reset
                    </button>
                </div>

                <div className="flex flex-col items-end bg-white/50 px-6 py-3 rounded-2xl border border-white/80 shadow-sm">
                    <div className="text-3xl font-mono font-black text-primary tabular-nums tracking-tighter">
                        {formatTime(currentTime)}
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                        {isDecoding ? 'Updating...' : `Duration: ${formatTime(duration)}`}
                    </div>
                </div>
            </div>

            <div className="relative waveform-wrapper mt-4">
                {isDecoding && (
                    <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-md rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all animate-fade-in">
                        <Loader2 className="w-12 h-12 text-primary animate-spin" />
                        <div className="text-center">
                            <p className="font-black text-slate-800 text-lg uppercase tracking-tight">Processing</p>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Applying your edits...</p>
                        </div>
                    </div>
                )}
                <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8">
                    <div ref={containerRef} className="waveform-viz min-h-[120px]" />
                </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-6">
                {/* Active Segments Panel */}
                <div className="flex-1 overflow-hidden bg-white/50 border border-slate-200/60 rounded-3xl shadow-sm">
                    <div className="px-6 py-4 bg-slate-100/50 border-b border-slate-200/60 flex items-center justify-between">
                        <h6 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Active Audio Segments</h6>
                        <span className="px-3 py-1 bg-primary text-white text-[10px] font-black rounded-full uppercase tracking-widest">{segments.length} Clips</span>
                    </div>
                    <div className="p-5 flex flex-wrap gap-2 max-h-[160px] overflow-y-auto">
                        {segments.map((seg, i) => (
                            <div key={seg.id} className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-2xl border border-slate-100 text-[11px] font-mono text-slate-600 font-bold hover:shadow-md hover:border-primary/20 transition-all group">
                                <span className="w-5 h-5 rounded-lg bg-slate-100 flex items-center justify-center text-[9px] text-slate-500 group-hover:bg-primary group-hover:text-white transition-colors">{i + 1}</span>
                                {formatTime(seg.start)} - {formatTime(seg.end)}
                            </div>
                        ))}
                        {segments.length === 0 && (
                            <div className="w-full py-8 text-center">
                                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">No audio content remaining</p>
                                <p className="text-[10px] text-slate-300">Try undoing your last action or reset.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Instructions Panel */}
                <div className="md:w-72 bg-slate-900 rounded-3xl p-6 text-white shadow-2xl flex flex-col justify-center">
                    <h6 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">Quick Guide</h6>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 font-black text-[10px]">1</div>
                            <p className="text-[11px] text-slate-300 leading-relaxed font-bold">
                                <span className="text-white">Drag</span> on waveform to select a part.
                            </p>
                        </li>
                        <li className="flex gap-3">
                            <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 font-black text-[10px]">2</div>
                            <p className="text-[11px] text-slate-300 leading-relaxed font-bold">
                                Use <span className="text-primary">Keep selected</span> to trim everything else.
                            </p>
                        </li>
                        <li className="flex gap-3">
                            <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 font-black text-[10px]">3</div>
                            <p className="text-[11px] text-slate-300 leading-relaxed font-bold">
                                Use <span className="text-danger">Delete Part</span> to remove specific noise.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

// Add these imports at the top
import { Trash2, Loader2 } from 'lucide-react';

