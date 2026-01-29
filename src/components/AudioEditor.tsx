"use client";
import React, { useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
    Upload,
    Music,
    Repeat,
    Layers,
    ArrowRight,
    Download,
    Trash2,
    AlertCircle,
    Loader2,
    Clock,
    MessageSquare,
    Send,
    X,
    CheckCircle2,
    Scissors,
    RotateCcw
} from "lucide-react";
import { fetchFile } from "@ffmpeg/util";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { useFFmpeg } from "@/hooks/useFFmpeg";
import "../app/audio-editor.css"; // Adjusted relative path
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

import WaveformTrimmer from "@/components/WaveformTrimmer";
import AdBanner from "@/components/AdBanner";
import * as gtag from "@/lib/gtag";


type Tool = "merge" | "loop" | "extend" | "trim";

export default function AudioEditor() {
    const t = useTranslations('home');
    const tNav = useTranslations('nav');
    const { ffmpeg, loaded, loading: ffmpegLoading, progress, load } = useFFmpeg();
    const [activeTool, setActiveTool] = useState<Tool>("merge");
    const [files, setFiles] = useState<File[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [crossfade, setCrossfade] = useState(0.5);
    const [loopCount, setLoopCount] = useState(2);
    const [targetDuration, setTargetDuration] = useState(90); // minutes
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(60);
    const [segments, setSegments] = useState<{ id: string, start: number, end: number }[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [feedbackBody, setFeedbackBody] = useState("");
    const [feedbackSent, setFeedbackSent] = useState(false);
    const [feedbackLoading, setFeedbackLoading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            if (activeTool === "merge") {
                setFiles((prev) => [...prev, ...newFiles]);
            } else {
                setFiles(newFiles);
            }

            // Auto-scroll to settings after upload
            setTimeout(() => {
                editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const moveFile = (index: number, direction: 'up' | 'down') => {
        setFiles((prev) => {
            const newFiles = [...prev];
            const targetIndex = direction === 'up' ? index - 1 : index + 1;
            if (targetIndex >= 0 && targetIndex < newFiles.length) {
                [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
            }
            return newFiles;
        });
    };

    const handleProcess = async () => {
        if (files.length === 0) {
            setError("Please select at least one file.");
            return;
        }

        let currentFFmpeg = ffmpeg;
        if (!loaded || !currentFFmpeg) {
            const instance = await load();
            if (!instance) {
                setError("Could not load the processing engine. Please check your internet connection and try again.");
                return;
            }
            currentFFmpeg = instance;
        }

        setIsProcessing(true);
        setError(null);
        setResultUrl(null);

        try {
            if (activeTool === "merge") {
                await processMerge(currentFFmpeg);
            } else if (activeTool === "loop") {
                await processLoop(currentFFmpeg);
            } else if (activeTool === "extend") {
                await processExtend(currentFFmpeg);
            } else if (activeTool === "trim") {
                await processTrim(currentFFmpeg);
            }

            // Scroll to result area
            setTimeout(() => {
                editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : "An error occurred during processing. Please try again.");
        } finally {
            setIsProcessing(false);
            gtag.event({
                action: 'process_audio',
                category: 'editor',
                label: activeTool,
            });
        }
    };

    const processMerge = async (currentFFmpeg: FFmpeg) => {
        const fileNames: string[] = [];
        for (let i = 0; i < files.length; i++) {
            const ext = files[i].name.split(".").pop();
            const name = `input${i}.${ext}`;
            await currentFFmpeg.writeFile(name, await fetchFile(files[i]));
            fileNames.push(name);
        }

        let command: string[] = [];
        const outputName = `merged_${Date.now()}.mp3`;

        if (crossfade > 0 && files.length > 1) {
            const inputs = fileNames.flatMap((name) => ["-i", name]);
            let filter = "[0:a][1:a]acrossfade=d=" + crossfade + ":c1=tri:c2=tri[a0]";
            for (let i = 2; i < files.length; i++) {
                filter += `;[a${i - 2}][${i}:a]acrossfade=d=${crossfade}:c1=tri:c2=tri[a${i - 1}]`;
            }
            const lastLabel = files.length > 1 ? `[a${files.length - 2}]` : "[0:a]";
            command = [...inputs, "-filter_complex", filter, "-map", lastLabel, outputName];
        } else {
            const concatList = fileNames.map(n => `file '${n}'`).join("\n");
            await currentFFmpeg.writeFile("concat.txt", concatList);
            command = ["-f", "concat", "-safe", "0", "-i", "concat.txt", "-c", "copy", outputName];
        }

        const res = await currentFFmpeg.exec(command);
        if (res !== 0) throw new Error("FFmpeg execution failed");

        const data = await currentFFmpeg.readFile(outputName);
        const url = URL.createObjectURL(new Blob([data as BlobPart], { type: "audio/mp3" }));
        setResultUrl(url);
    };

    const processLoop = async (currentFFmpeg: FFmpeg) => {
        const ext = files[0].name.split(".").pop();
        const inputName = `input.${ext}`;
        const outputName = `looped_${Date.now()}.mp3`;
        await currentFFmpeg.writeFile(inputName, await fetchFile(files[0]));
        const res = await currentFFmpeg.exec(["-stream_loop", (loopCount - 1).toString(), "-i", inputName, "-c", "copy", outputName]);
        if (res !== 0) throw new Error("FFmpeg execution failed");
        const data = await currentFFmpeg.readFile(outputName);
        const url = URL.createObjectURL(new Blob([data as BlobPart], { type: "audio/mp3" }));
        setResultUrl(url);
    };

    const processExtend = async (currentFFmpeg: FFmpeg) => {
        const ext = files[0].name.split(".").pop();
        const inputName = `input.${ext}`;
        const outputName = `extended_${Date.now()}.mp3`;
        await currentFFmpeg.writeFile(inputName, await fetchFile(files[0]));
        const targetSeconds = targetDuration * 60;
        const res = await currentFFmpeg.exec(["-stream_loop", "-1", "-i", inputName, "-t", targetSeconds.toString(), "-c", "copy", outputName]);
        if (res !== 0) throw new Error("FFmpeg execution failed");
        const data = await currentFFmpeg.readFile(outputName);
        const url = URL.createObjectURL(new Blob([data as BlobPart], { type: "audio/mp3" }));
        setResultUrl(url);
    };

    const processTrim = async (currentFFmpeg: FFmpeg) => {
        if (segments.length === 0) {
            setError("No segments selected.");
            return;
        }
        const ext = files[0].name.split(".").pop();
        const inputName = `input.${ext}`;
        const outputName = `trimmed_${Date.now()}.mp3`;
        await currentFFmpeg.writeFile(inputName, await fetchFile(files[0]));
        let filter = "";
        let inputs = "";
        segments.forEach((seg, i) => {
            filter += `[0:a]atrim=start=${seg.start}:end=${seg.end},asetpts=PTS-STARTPTS[a${i}];`;
            inputs += `[a${i}]`;
        });
        filter += `${inputs}concat=n=${segments.length}:v=0:a=1[out]`;
        const res = await currentFFmpeg.exec([
            "-i", inputName,
            "-filter_complex", filter,
            "-map", "[out]",
            "-c:a", "libmp3lame",
            "-q:a", "2",
            outputName
        ]);
        if (res !== 0) throw new Error("FFmpeg execution failed");
        const data = await currentFFmpeg.readFile(outputName);
        const url = URL.createObjectURL(new Blob([data as BlobPart], { type: "audio/mp3" }));
        setResultUrl(url);
    };

    const downloadResult = () => {
        if (resultUrl) {
            gtag.event({
                action: 'download_result',
                category: 'editor',
                label: activeTool,
            });
            const a = document.createElement("a");
            a.href = resultUrl;
            const toolSuffix = activeTool.charAt(0).toUpperCase() + activeTool.slice(1);
            a.download = `loop_${toolSuffix}_${Date.now()}.mp3`;
            a.click();
        }
    };

    return (
        <div className="container py-12">
            {/* Hero Section */}
            <section className="text-center mb-16 animate-fade-in px-6">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 outfit tracking-tight leading-tight">
                    Edit Audio <span className="gradient-text">Like a Pro</span>
                </h1>
                <p className="text-xl text-secondary max-w-2xl mx-auto mb-12 font-medium opacity-90">
                    Professional browser-based tools to merge, loop, and trim your audio with ease.
                </p>

                {/* Tool Cards */}
                <div className="tool-grid">
                    <motion.div
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`tool-card ${activeTool === "merge" ? "active" : ""}`}
                        onClick={() => {
                            setActiveTool("merge"); setFiles([]); setError(null); setResultUrl(null);
                            gtag.event({ action: 'select_tool', category: 'editor', label: 'merge' });
                        }}
                    >
                        <div className="icon-box"><Layers size={28} /></div>
                        <h3 className="text-xl font-bold mb-2">{t('tools.merge.title')}</h3>
                        <p className="text-sm opacity-70 font-medium">{t('tools.merge.desc')}</p>
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`tool-card ${activeTool === "loop" ? "active" : ""}`}
                        onClick={() => {
                            setActiveTool("loop"); setFiles([]); setError(null); setResultUrl(null);
                            gtag.event({ action: 'select_tool', category: 'editor', label: 'loop' });
                        }}
                    >
                        <div className="icon-box"><Repeat size={28} /></div>
                        <h3 className="text-xl font-bold mb-2">{t('tools.loop.title')}</h3>
                        <p className="text-sm opacity-70 font-medium">{t('tools.loop.desc')}</p>
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`tool-card ${activeTool === "extend" ? "active" : ""}`}
                        onClick={() => {
                            setActiveTool("extend"); setFiles([]); setError(null); setResultUrl(null);
                            gtag.event({ action: 'select_tool', category: 'editor', label: 'extend' });
                        }}
                    >
                        <div className="icon-box"><Clock size={28} /></div>
                        <h3 className="text-xl font-bold mb-2">{t('tools.extend.title')}</h3>
                        <p className="text-sm opacity-70 font-medium">{t('tools.extend.desc')}</p>
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`tool-card ${activeTool === "trim" ? "active" : ""}`}
                        onClick={() => {
                            setActiveTool("trim"); setFiles([]); setError(null); setResultUrl(null);
                            gtag.event({ action: 'select_tool', category: 'editor', label: 'trim' });
                        }}
                    >
                        <div className="icon-box"><Scissors size={28} /></div>
                        <h3 className="text-xl font-bold mb-2">{t('tools.trim.title')}</h3>
                        <p className="text-sm opacity-70 font-medium">{t('tools.trim.desc')}</p>
                    </motion.div>
                </div>
            </section>

            {/* Top Ad Unit */}
            <AdBanner dataAdSlot="6207739501" />

            {/* Main Action Area */}
            <section ref={editorRef} className="max-w-4xl mx-auto transition-all duration-500 scroll-mt-20" id="editor">
                <div className={`glass rounded-[3rem] p-1 shadow-2xl overflow-hidden ${isProcessing ? 'border-primary/30' : 'border-white/20'}`}>
                    <div className="p-8 md:p-14">
                        {/* Step 1: Upload */}
                        {!isProcessing && !resultUrl && files.length === 0 && (
                            <div
                                className="drop-zone py-20 border-3 border-dashed border-slate-200/60 rounded-[2.5rem] bg-slate-50/30 hover:bg-slate-50/80 hover:border-primary/40 transition-all cursor-pointer group"
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('active'); }}
                                onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('active'); }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    e.currentTarget.classList.remove('active');
                                    if (e.dataTransfer.files) {
                                        const newFiles = Array.from(e.dataTransfer.files);
                                        if (activeTool === "merge") {
                                            setFiles((prev) => [...prev, ...newFiles]);
                                        } else {
                                            setFiles(newFiles);
                                        }
                                    }
                                }}
                            >
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    <Upload className="text-primary" size={40} />
                                </div>
                                <h4 className="text-2xl font-black mb-3 outfit">
                                    Drop your audio files here
                                </h4>
                                <p className="text-secondary font-medium">Or click to browse from your computer</p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="audio/*"
                                    multiple={activeTool === "merge"}
                                    onChange={handleFileChange}
                                />
                            </div>
                        )}

                        {/* Step 2: Settings & Preview */}
                        {files.length > 0 && !isProcessing && !resultUrl && (
                            <div className="animate-fade-in text-left">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h5 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-1">Step 2: Preview & Configure</h5>
                                        <h4 className="text-3xl font-black outfit text-slate-800">Fine-tune your track</h4>
                                    </div>
                                    <button
                                        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-danger px-4 py-2 bg-danger/5 rounded-full hover:bg-danger/10 transition-colors"
                                        onClick={() => { setFiles([]); setResultUrl(null); }}
                                    >
                                        <Trash2 size={14} /> Clear All
                                    </button>
                                </div>

                                {/* File List for Merge */}
                                {activeTool === "merge" && (
                                    <div className="mb-10 space-y-3">
                                        <AnimatePresence mode="popLayout">
                                            {files.map((file, idx) => (
                                                <motion.div
                                                    layout
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    key={`${file.name}-${idx}`}
                                                    className="file-item p-4 bg-white/60 border border-slate-100 rounded-2xl flex items-center gap-4 hover:shadow-lg transition-all"
                                                >
                                                    <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0"><Music size={20} /></div>
                                                    <div className="file-info min-w-0">
                                                        <span className="file-name font-bold text-slate-800 truncate block">{file.name}</span>
                                                        <span className="text-[10px] font-black text-slate-400 uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                                    </div>
                                                    <div className="flex gap-1 shrink-0">
                                                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 disabled:opacity-20" onClick={() => moveFile(idx, 'up')} disabled={idx === 0}><ArrowRight size={16} className="-rotate-90" /></button>
                                                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 disabled:opacity-20" onClick={() => moveFile(idx, 'down')} disabled={idx === files.length - 1}><ArrowRight size={16} className="rotate-90" /></button>
                                                        <button className="p-2 hover:bg-red-50 text-danger/50 hover:text-danger rounded-lg transition-colors" onClick={() => removeFile(idx)}><Trash2 size={16} /></button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                        <button className="w-full p-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-sm hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2" onClick={() => fileInputRef.current?.click()}>
                                            <Upload size={16} /> Add More Files
                                        </button>
                                    </div>
                                )}

                                <div className="bg-slate-50/50 rounded-3xl border border-white/40 overflow-hidden mb-12 shadow-inner">
                                    <div className="p-6 md:p-10">
                                        {activeTool === "merge" && (
                                            <div className="input-group mb-0">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 block text-left">Crossfade Duration</label>
                                                <div className="flex items-center gap-6">
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="5"
                                                        step="0.1"
                                                        value={crossfade}
                                                        onChange={(e) => setCrossfade(parseFloat(e.target.value))}
                                                        className="flex-1 accent-primary"
                                                    />
                                                    <span className="text-2xl font-black outfit text-primary w-16 text-right">{crossfade}s</span>
                                                </div>
                                            </div>
                                        )}

                                        {activeTool === "loop" && (
                                            <div className="input-group mb-0">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 block text-left">Number of Loops</label>
                                                <div className="flex items-center gap-4">
                                                    <Repeat size={20} className="text-slate-400" />
                                                    <input
                                                        type="number"
                                                        min="2"
                                                        max="100"
                                                        value={loopCount}
                                                        onChange={(e) => setLoopCount(parseInt(e.target.value))}
                                                        className="w-full p-4 bg-white rounded-2xl border-none shadow-inner text-xl font-black outfit focus:ring-2 focus:ring-primary/20"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {activeTool === "extend" && (
                                            <div className="input-group mb-0">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 block text-left">Target Duration (Minutes)</label>
                                                <div className="flex items-center gap-4">
                                                    <Clock size={20} className="text-slate-400" />
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max="480"
                                                        value={targetDuration}
                                                        onChange={(e) => setTargetDuration(parseInt(e.target.value))}
                                                        className="w-full p-4 bg-white rounded-2xl border-none shadow-inner text-xl font-black outfit focus:ring-2 focus:ring-primary/20"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {activeTool === "trim" && (
                                            <div className="p-1">
                                                <WaveformTrimmer
                                                    file={files[0]}
                                                    onSegmentsChange={setSegments}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Main Process Button */}
                                <div className="sticky bottom-0 pb-6 pt-2 bg-gradient-to-t from-white via-white/90 to-transparent z-10">
                                    <button
                                        className="btn btn-primary w-full py-6 text-xl font-black outfit shadow-[0_20px_40px_-10px_rgba(59,130,246,0.3)] hover:shadow-[0_25px_50px_-10px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-4 group"
                                        onClick={handleProcess}
                                        disabled={ffmpegLoading}
                                    >
                                        {ffmpegLoading ? (
                                            <>
                                                <Loader2 className="animate-spin" size={24} /> Loading Engine...
                                            </>
                                        ) : (
                                            <>
                                                <span className="uppercase tracking-widest text-sm opacity-60 mr-2">Ready?</span>
                                                {activeTool === "merge" ? "Join All Tracks" :
                                                    activeTool === "loop" ? "Loop This Audio" :
                                                        activeTool === "extend" ? `Extend to ${targetDuration}m` :
                                                            "Save Your Edits"}
                                                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                    <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-6">
                                        Processed instantly in your device for maximum privacy
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Processing */}
                        {isProcessing && (
                            <div className="text-center py-20 animate-fade-in">
                                <div className="relative w-32 h-32 mx-auto mb-10">
                                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Music className="text-primary animate-pulse" size={40} />
                                    </div>
                                </div>
                                <h4 className="text-4xl font-black mb-3 outfit tracking-tight">Processing Audio...</h4>
                                <p className="text-secondary font-medium mb-12">This may take a moment. Please stay on this page.</p>

                                <div className="progress-container h-3 bg-slate-100 max-w-md mx-auto rounded-full overflow-hidden shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                                <p className="font-black text-primary mt-4 outfit text-xl">{progress}%</p>
                            </div>
                        )}

                        {/* Step 4: Result */}
                        {resultUrl && !isProcessing && (
                            <div className="text-center py-10 animate-fade-in">
                                <div className="w-24 h-24 bg-success/10 text-success rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-success/10">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h4 className="text-5xl font-black mb-4 outfit">Studio Quality Ready</h4>
                                <p className="text-secondary font-medium mb-12 text-lg">Your audio file has been processed successfully.</p>

                                <div className="flex flex-col md:flex-row gap-6 justify-center">
                                    <button className="btn btn-primary px-12 py-5 text-xl font-black outfit shadow-xl shadow-primary/20 flex items-center justify-center gap-3" onClick={downloadResult}>
                                        <Download size={24} /> Download File
                                    </button>
                                    <button
                                        className="btn glass border-slate-200 bg-white hover:bg-slate-50 px-12 py-5 text-xl font-black outfit text-slate-700 flex items-center justify-center gap-3"
                                        onClick={() => { setResultUrl(null); setFiles([]); }}
                                    >
                                        <RotateCcw size={24} /> Edit Another
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 text-danger p-6 rounded-3xl border border-danger/10 flex items-start gap-4 mt-8"
                            >
                                <AlertCircle className="shrink-0 mt-1" size={20} />
                                <div className="text-left">
                                    <p className="font-black outfit text-lg uppercase tracking-tight text-left">Processing Error</p>
                                    <p className="text-sm font-medium opacity-80 text-left">{error}</p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Trust & Privacy */}
            <section className="mt-20 max-w-4xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="glass p-8 rounded-[2.5rem] border-white/20 flex gap-6 items-start">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 shadow-inner">
                            <AlertCircle size={28} />
                        </div>
                        <div className="text-left">
                            <h5 className="font-black outfit text-xl mb-2">{t('features.privacy.title')}</h5>
                            <p className="text-sm text-secondary font-medium leading-relaxed">
                                {t('features.privacy.desc')}
                            </p>
                        </div>
                    </div>
                    <div className="glass p-8 rounded-[2.5rem] border-white/20 flex gap-6 items-start">
                        <div className="w-14 h-14 bg-green-100/50 rounded-2xl flex items-center justify-center text-green-600 shrink-0 shadow-inner">
                            <CheckCircle2 size={28} />
                        </div>
                        <div className="text-left">
                            <h5 className="font-black outfit text-xl mb-2">High Fidelity</h5>
                            <p className="text-sm text-secondary font-medium leading-relaxed">
                                We use FFmpeg technology to ensure your audio quality remains pristine after processing.
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            {/* Feedback Trigger */}
            <section className="mt-32 text-center pb-20">
                <div className="inline-block p-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-[2.2rem]">
                    <button
                        onClick={() => setIsFeedbackOpen(true)}
                        className="px-12 py-5 bg-white border border-white/50 rounded-[2rem] hover:bg-slate-50 transition-all flex items-center gap-4 text-xl font-black outfit text-slate-800 shadow-xl"
                    >
                        <MessageSquare size={24} className="text-primary" />
                        Submit Feedback
                    </button>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-8">
                    Help us build the world&apos;s best audio suite
                </p>
            </section>

            {/* Feedback Modal */}
            <AnimatePresence>
                {isFeedbackOpen && (
                    <div className="modal-overlay">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { if (!feedbackSent) setIsFeedbackOpen(false); }}
                            className="absolute inset-0 cursor-pointer"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="modal-container max-w-lg"
                        >
                            <div className="modal-content overflow-hidden p-0 rounded-[3rem]">
                                {!feedbackSent ? (
                                    <div className="p-10 md:p-14 text-left">
                                        <div className="flex items-center justify-between mb-10">
                                            <div>
                                                <h6 className="text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-2">Connect with us</h6>
                                                <h3 className="text-4xl font-black outfit tracking-tight text-slate-800">Your Thoughts?</h3>
                                            </div>
                                            <button onClick={() => setIsFeedbackOpen(false)} className="p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors"><X size={24} /></button>
                                        </div>
                                        <textarea
                                            value={feedbackBody}
                                            onChange={(e) => setFeedbackBody(e.target.value)}
                                            placeholder="Share your suggestion or report a bug..."
                                            className="feedback-textarea p-6 rounded-3xl bg-slate-50 border-slate-100 min-h-[220px] focus:ring-4 focus:ring-primary/10 transition-all font-medium mb-8 w-full block"
                                        />
                                        <button
                                            disabled={!feedbackBody.trim() || feedbackLoading}
                                            onClick={() => {
                                                const subject = encodeURIComponent('Feedback from Loop');
                                                const body = encodeURIComponent(feedbackBody);
                                                window.open(`mailto:xmforxm98@gmail.com?subject=${subject}&body=${body}`, '_blank');
                                                setFeedbackSent(true);
                                            }}
                                            className="btn btn-primary w-full py-5 text-xl font-black outfit rounded-[1.8rem] shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                                        >
                                            {feedbackLoading ? <Loader2 size={24} className="animate-spin" /> : <><Send size={20} /> Send Feedback</>}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="p-10 md:p-14 text-center py-6 animate-fade-in">
                                        <div className="w-24 h-24 bg-success/10 text-success rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-xl shadow-success/10">
                                            <CheckCircle2 size={48} />
                                        </div>
                                        <h4 className="text-4xl font-black mb-4 outfit text-slate-800">Message Sent</h4>
                                        <p className="text-secondary font-medium mb-12 leading-relaxed text-lg">Thank you for helping us improve!</p>
                                        <button className="btn btn-primary w-full py-5 rounded-[1.8rem] font-black outfit text-xl" onClick={() => { setIsFeedbackOpen(false); setFeedbackSent(false); setFeedbackBody(""); }}>Close</button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
