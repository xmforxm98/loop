(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/WaveformTrimmer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WaveformTrimmer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wavesurfer$2e$js$2f$dist$2f$wavesurfer$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wavesurfer.js/dist/wavesurfer.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wavesurfer$2e$js$2f$dist$2f$plugins$2f$regions$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wavesurfer.js/dist/plugins/regions.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scissors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scissors$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scissors.js [app-client] (ecmascript) <export default as Scissors>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/undo-2.js [app-client] (ecmascript) <export default as Undo2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Helper to convert AudioBuffer to WAV Blob for WaveSurfer v7 compatibility
function bufferToWav(buffer) {
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
    for(i = 0; i < numOfChan; i++)channels.push(buffer.getChannelData(i));
    while(pos < length){
        for(i = 0; i < numOfChan; i++){
            sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
            sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // scale to 16-bit signed int
            view.setInt16(pos, sample, true); // write 16-bit sample
            pos += 2;
        }
        offset++;
    }
    return new Blob([
        bufferArray
    ], {
        type: "audio/wav"
    });
    //TURBOPACK unreachable
    ;
    function setUint16(data) {
        view.setUint16(pos, data, true);
        pos += 2;
    }
    function setUint32(data) {
        view.setUint32(pos, data, true);
        pos += 4;
    }
}
function WaveformTrimmer({ file, onSegmentsChange }) {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const wavesurferRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const regionsPluginRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioContextRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const originalBufferRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentBlobUrlRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [duration, setDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [segments, setSegments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectionRange, setSelectionRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isDecoding, setIsDecoding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const formatTime = (time)=>{
        if (isNaN(time)) return "0:00.00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        const ms = Math.floor(time % 1 * 100);
        return `${mins}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    };
    const createMergedBuffer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WaveformTrimmer.useCallback[createMergedBuffer]": (originalBuffer, currentSegments)=>{
            const ctx = audioContextRef.current;
            if (!ctx || !originalBuffer) return null;
            const sampleRate = originalBuffer.sampleRate;
            const totalLength = currentSegments.reduce({
                "WaveformTrimmer.useCallback[createMergedBuffer].totalLength": (acc, seg)=>acc + (seg.end - seg.start)
            }["WaveformTrimmer.useCallback[createMergedBuffer].totalLength"], 0);
            const frameCount = Math.floor(totalLength * sampleRate);
            if (frameCount <= 0) return null;
            const newBuffer = ctx.createBuffer(originalBuffer.numberOfChannels, frameCount, sampleRate);
            for(let channel = 0; channel < originalBuffer.numberOfChannels; channel++){
                const originalData = originalBuffer.getChannelData(channel);
                const newData = newBuffer.getChannelData(channel);
                let offset = 0;
                currentSegments.forEach({
                    "WaveformTrimmer.useCallback[createMergedBuffer]": (seg)=>{
                        const startFrame = Math.floor(seg.start * sampleRate);
                        const endFrame = Math.floor(seg.end * sampleRate);
                        const segmentData = originalData.subarray(startFrame, endFrame);
                        newData.set(segmentData, offset);
                        offset += segmentData.length;
                    }
                }["WaveformTrimmer.useCallback[createMergedBuffer]"]);
            }
            return newBuffer;
        }
    }["WaveformTrimmer.useCallback[createMergedBuffer]"], []);
    const updateWaveform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WaveformTrimmer.useCallback[updateWaveform]": async (currentSegments)=>{
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
                    for(let c = 0; c < mergedBuffer.numberOfChannels; c++){
                        const chan = mergedBuffer.getChannelData(c);
                        const chanPeaks = [];
                        const step = Math.floor(chan.length / 1000) || 1;
                        for(let n = 0; n < chan.length; n += step){
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
            } finally{
                setIsDecoding(false);
            }
        }
    }["WaveformTrimmer.useCallback[updateWaveform]"], [
        createMergedBuffer
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WaveformTrimmer.useEffect": ()=>{
            if (!containerRef.current) return;
            const wavesurfer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wavesurfer$2e$js$2f$dist$2f$wavesurfer$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
                container: containerRef.current,
                waveColor: '#e2e8f0',
                progressColor: '#3b82f6',
                cursorColor: '#3b82f6',
                cursorWidth: 2,
                barWidth: 2,
                barRadius: 3,
                height: 120,
                normalize: true,
                minPxPerSec: 50,
                interact: true
            });
            const regions = wavesurfer.registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wavesurfer$2e$js$2f$dist$2f$plugins$2f$regions$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create());
            regionsPluginRef.current = regions;
            const initAudio = {
                "WaveformTrimmer.useEffect.initAudio": async ()=>{
                    setIsDecoding(true);
                    try {
                        const arrayBuffer = await file.arrayBuffer();
                        const ctx = new (window.AudioContext || window.webkitAudioContext)();
                        audioContextRef.current = ctx;
                        const decodedBuffer = await ctx.decodeAudioData(arrayBuffer);
                        originalBufferRef.current = decodedBuffer;
                        const d = decodedBuffer.duration;
                        setDuration(d);
                        const initialSegments = [
                            {
                                id: 'init',
                                start: 0,
                                end: d
                            }
                        ];
                        setSegments(initialSegments);
                        onSegmentsChange(initialSegments);
                        const wavBlob = bufferToWav(decodedBuffer);
                        const url = URL.createObjectURL(wavBlob);
                        currentBlobUrlRef.current = url;
                        // Pre-calculate peaks array of arrays
                        const peaks = [];
                        for(let c = 0; c < decodedBuffer.numberOfChannels; c++){
                            const chan = decodedBuffer.getChannelData(c);
                            const chanPeaks = [];
                            const step = Math.floor(chan.length / 1000) || 1;
                            for(let i = 0; i < chan.length; i += step){
                                chanPeaks.push(chan[i]);
                            }
                            peaks.push(chanPeaks);
                        }
                        await wavesurfer.load(url, peaks);
                    } catch (error) {
                        console.error("Audio initialization failed:", error);
                    } finally{
                        setIsDecoding(false);
                    }
                }
            }["WaveformTrimmer.useEffect.initAudio"];
            initAudio();
            wavesurfer.on('audioprocess', {
                "WaveformTrimmer.useEffect": ()=>setCurrentTime(wavesurfer.getCurrentTime())
            }["WaveformTrimmer.useEffect"]);
            wavesurfer.on('interaction', {
                "WaveformTrimmer.useEffect": (newTime)=>{
                    wavesurfer.setTime(newTime);
                    setCurrentTime(newTime);
                }
            }["WaveformTrimmer.useEffect"]);
            regions.enableDragSelection({
                color: 'rgba(239, 68, 68, 0.3)'
            });
            regions.on('region-created', {
                "WaveformTrimmer.useEffect": (region)=>{
                    regions.getRegions().forEach({
                        "WaveformTrimmer.useEffect": (r)=>{
                            if (r.id !== region.id) r.remove();
                        }
                    }["WaveformTrimmer.useEffect"]);
                    setSelectionRange({
                        start: region.start,
                        end: region.end
                    });
                }
            }["WaveformTrimmer.useEffect"]);
            regions.on('region-updated', {
                "WaveformTrimmer.useEffect": (region)=>{
                    setSelectionRange({
                        start: region.start,
                        end: region.end
                    });
                }
            }["WaveformTrimmer.useEffect"]);
            wavesurfer.on('play', {
                "WaveformTrimmer.useEffect": ()=>setIsPlaying(true)
            }["WaveformTrimmer.useEffect"]);
            wavesurfer.on('pause', {
                "WaveformTrimmer.useEffect": ()=>setIsPlaying(false)
            }["WaveformTrimmer.useEffect"]);
            wavesurferRef.current = wavesurfer;
            return ({
                "WaveformTrimmer.useEffect": ()=>{
                    wavesurfer.destroy();
                    if (audioContextRef.current) audioContextRef.current.close();
                    if (currentBlobUrlRef.current) URL.revokeObjectURL(currentBlobUrlRef.current);
                }
            })["WaveformTrimmer.useEffect"];
        }
    }["WaveformTrimmer.useEffect"], [
        file
    ]);
    const saveToHistory = ()=>{
        setHistory((prev)=>[
                ...prev,
                [
                    ...segments
                ]
            ]);
    };
    const undo = ()=>{
        if (history.length === 0) return;
        const prevSegments = history[history.length - 1];
        setHistory((prev)=>prev.slice(0, -1));
        setSegments(prevSegments);
        onSegmentsChange(prevSegments);
        updateWaveform(prevSegments);
        regionsPluginRef.current?.clearRegions();
        setSelectionRange(null);
    };
    const togglePlay = ()=>wavesurferRef.current?.playPause();
    const handleRippleCut = ()=>{
        if (!selectionRange || !wavesurferRef.current) return;
        saveToHistory();
        const cutStart = selectionRange.start;
        const cutEnd = selectionRange.end;
        const nextSegments = [];
        let currentTimelineOffset = 0;
        segments.forEach((seg)=>{
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "waveform-container bg-slate-50/50 rounded-[2rem] p-8 border border-slate-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-6 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: togglePlay,
                                disabled: isDecoding || duration === 0,
                                className: "trimmer-btn btn-play-pause",
                                children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                    size: 28
                                }, void 0, false, {
                                    fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                    lineNumber: 338,
                                    columnNumber: 38
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                    size: 28,
                                    className: "ml-1"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                    lineNumber: 338,
                                    columnNumber: 60
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                lineNumber: 333,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-10 w-[1px] bg-slate-200 mx-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                lineNumber: 341,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleRippleCut,
                                disabled: !selectionRange || isDecoding,
                                className: "trimmer-btn btn-ripple-cut",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scissors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scissors$3e$__["Scissors"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                        lineNumber: 348,
                                        columnNumber: 25
                                    }, this),
                                    "Ripple Cut"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                lineNumber: 343,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: undo,
                                disabled: history.length === 0 || isDecoding,
                                className: "trimmer-btn btn-secondary-action",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__["Undo2"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                        lineNumber: 357,
                                        columnNumber: 25
                                    }, this),
                                    "Undo"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                lineNumber: 352,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    if (confirm('Are you sure you want to reset all edits?')) {
                                        saveToHistory();
                                        const initialSegments = [
                                            {
                                                id: 'init-' + Math.random(),
                                                start: 0,
                                                end: originalBufferRef.current?.duration || 0
                                            }
                                        ];
                                        setSegments(initialSegments);
                                        onSegmentsChange(initialSegments);
                                        updateWaveform(initialSegments);
                                    }
                                },
                                disabled: isDecoding || segments.length === 1 && segments[0].start === 0 && segments[0].end === originalBufferRef.current?.duration,
                                className: "trimmer-btn btn-secondary-action btn-reset-all",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                        lineNumber: 374,
                                        columnNumber: 25
                                    }, this),
                                    "Reset All"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                lineNumber: 361,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/WaveformTrimmer.tsx",
                        lineNumber: 332,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-mono font-bold text-primary tabular-nums",
                                children: formatTime(currentTime)
                            }, void 0, false, {
                                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                lineNumber: 380,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]",
                                children: isDecoding ? 'Processing...' : `TOTAL: ${formatTime(duration)}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                lineNumber: 383,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/WaveformTrimmer.tsx",
                        lineNumber: 379,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                lineNumber: 331,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative waveform-wrapper mt-4",
                children: [
                    isDecoding && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 z-20 bg-white/90 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center gap-4 shadow-inner border border-slate-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                lineNumber: 392,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-black text-slate-800 text-lg uppercase tracking-tight",
                                        children: "Updating Waveform"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                        lineNumber: 394,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-400 font-bold",
                                        children: "Re-rendering the rippled audio..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                        lineNumber: 395,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                lineNumber: 393,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/WaveformTrimmer.tsx",
                        lineNumber: 391,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-3xl shadow-2xl border border-slate-100 p-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: containerRef,
                            className: "waveform-viz min-h-[120px]"
                        }, void 0, false, {
                            fileName: "[project]/src/components/WaveformTrimmer.tsx",
                            lineNumber: 400,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/WaveformTrimmer.tsx",
                        lineNumber: 399,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                lineNumber: 389,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-10 overflow-hidden bg-white border border-slate-100 rounded-3xl shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h6", {
                                className: "text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]",
                                children: "Active Segments (to be merged)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                lineNumber: 406,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-md",
                                children: [
                                    segments.length,
                                    " Clips"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                lineNumber: 407,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/WaveformTrimmer.tsx",
                        lineNumber: 405,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 flex flex-wrap gap-2 max-h-[200px] overflow-y-auto",
                        children: [
                            segments.map((seg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100 text-[11px] font-mono text-slate-600 font-bold hover:bg-white transition-colors group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-4 h-4 rounded bg-slate-200 flex items-center justify-center text-[9px] text-slate-500",
                                            children: i + 1
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                            lineNumber: 412,
                                            columnNumber: 29
                                        }, this),
                                        formatTime(seg.start),
                                        " - ",
                                        formatTime(seg.end)
                                    ]
                                }, seg.id, true, {
                                    fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                    lineNumber: 411,
                                    columnNumber: 25
                                }, this)),
                            segments.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-400 italic px-2",
                                children: "No audio content remaining."
                            }, void 0, false, {
                                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                lineNumber: 416,
                                columnNumber: 47
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/WaveformTrimmer.tsx",
                        lineNumber: 409,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                lineNumber: 404,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 p-6 bg-slate-900 rounded-4xl text-white shadow-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scissors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scissors$3e$__["Scissors"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                    lineNumber: 423,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                lineNumber: 422,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-bold text-lg leading-tight",
                                        children: "Smart Ripple-Waveform"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                        lineNumber: 426,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-slate-400 font-bold uppercase tracking-widest",
                                        children: "Version 2.5 Pro"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                        lineNumber: 427,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                lineNumber: 425,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/WaveformTrimmer.tsx",
                        lineNumber: 421,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold",
                                                children: "1"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                                lineNumber: 433,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "text-white",
                                                        children: "Select Part to Remove"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                                        lineNumber: 434,
                                                        columnNumber: 35
                                                    }, this),
                                                    ": Drag on the waveform. The red area is what will be DELETED."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                                lineNumber: 434,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                        lineNumber: 432,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold",
                                                children: "2"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                                lineNumber: 437,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "text-white",
                                                        children: "Instant Ripple"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                                        lineNumber: 438,
                                                        columnNumber: 35
                                                    }, this),
                                                    ": Click Cut. The waveform will physically SHRINK, joining the edges."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                                lineNumber: 438,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                        lineNumber: 436,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                lineNumber: 431,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "flex gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold",
                                            children: "3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                            lineNumber: 443,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    className: "text-white",
                                                    children: "Precision Control"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                                    lineNumber: 444,
                                                    columnNumber: 35
                                                }, this),
                                                ": Use Undo to fix any mistake. Clicking the waveform moves the needle without playing."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                            lineNumber: 444,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                    lineNumber: 442,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                                lineNumber: 441,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/WaveformTrimmer.tsx",
                        lineNumber: 430,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/WaveformTrimmer.tsx",
                lineNumber: 420,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/WaveformTrimmer.tsx",
        lineNumber: 330,
        columnNumber: 9
    }, this);
}
_s(WaveformTrimmer, "w8zxgv+PQ+ctj2hPAQRekM3bD0w=");
_c = WaveformTrimmer;
var _c;
__turbopack_context__.k.register(_c, "WaveformTrimmer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/WaveformTrimmer.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/WaveformTrimmer.tsx [app-client] (ecmascript)"));
}),
"[project]/node_modules/wavesurfer.js/dist/wavesurfer.esm.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>w
]);
function t(t, e, i, n) {
    return new (i || (i = Promise))(function(s, r) {
        function o(t) {
            try {
                l(n.next(t));
            } catch (t) {
                r(t);
            }
        }
        function a(t) {
            try {
                l(n.throw(t));
            } catch (t) {
                r(t);
            }
        }
        function l(t) {
            var e;
            t.done ? s(t.value) : (e = t.value, e instanceof i ? e : new i(function(t) {
                t(e);
            })).then(o, a);
        }
        l((n = n.apply(t, e || [])).next());
    });
}
"function" == typeof SuppressedError && SuppressedError;
class e {
    constructor(){
        this.listeners = {};
    }
    on(t, e, i) {
        if (this.listeners[t] || (this.listeners[t] = new Set), null == i ? void 0 : i.once) {
            const i = (...n)=>{
                this.un(t, i), e(...n);
            };
            return this.listeners[t].add(i), ()=>this.un(t, i);
        }
        return this.listeners[t].add(e), ()=>this.un(t, e);
    }
    un(t, e) {
        var i;
        null === (i = this.listeners[t]) || void 0 === i || i.delete(e);
    }
    once(t, e) {
        return this.on(t, e, {
            once: !0
        });
    }
    unAll() {
        this.listeners = {};
    }
    emit(t, ...e) {
        this.listeners[t] && this.listeners[t].forEach((t)=>t(...e));
    }
}
const i = {
    decode: function(e, i) {
        return t(this, void 0, void 0, function*() {
            const t = new AudioContext({
                sampleRate: i
            });
            try {
                return yield t.decodeAudioData(e);
            } finally{
                t.close();
            }
        });
    },
    createBuffer: function(t, e) {
        if (!t || 0 === t.length) throw new Error("channelData must be a non-empty array");
        if (e <= 0) throw new Error("duration must be greater than 0");
        if ("number" == typeof t[0] && (t = [
            t
        ]), !t[0] || 0 === t[0].length) throw new Error("channelData must contain non-empty channel arrays");
        !function(t) {
            const e = t[0];
            if (e.some((t)=>t > 1 || t < -1)) {
                const i = e.length;
                let n = 0;
                for(let t = 0; t < i; t++){
                    const i = Math.abs(e[t]);
                    i > n && (n = i);
                }
                for (const e of t)for(let t = 0; t < i; t++)e[t] /= n;
            }
        }(t);
        const i = t.map((t)=>t instanceof Float32Array ? t : Float32Array.from(t));
        return {
            duration: e,
            length: i[0].length,
            sampleRate: i[0].length / e,
            numberOfChannels: i.length,
            getChannelData: (t)=>{
                const e = i[t];
                if (!e) throw new Error(`Channel ${t} not found`);
                return e;
            },
            copyFromChannel: AudioBuffer.prototype.copyFromChannel,
            copyToChannel: AudioBuffer.prototype.copyToChannel
        };
    }
};
function n(t, e) {
    const i = e.xmlns ? document.createElementNS(e.xmlns, t) : document.createElement(t);
    for (const [t, s] of Object.entries(e))if ("children" === t && s) for (const [t, e] of Object.entries(s))e instanceof Node ? i.appendChild(e) : "string" == typeof e ? i.appendChild(document.createTextNode(e)) : i.appendChild(n(t, e));
    else "style" === t ? Object.assign(i.style, s) : "textContent" === t ? i.textContent = s : i.setAttribute(t, s.toString());
    return i;
}
function s(t, e, i) {
    const s = n(t, e || {});
    return null == i || i.appendChild(s), s;
}
var r = Object.freeze({
    __proto__: null,
    createElement: s,
    default: s
});
const o = {
    fetchBlob: function(e, i, n) {
        return t(this, void 0, void 0, function*() {
            const s = yield fetch(e, n);
            if (s.status >= 400) throw new Error(`Failed to fetch ${e}: ${s.status} (${s.statusText})`);
            return function(e, i) {
                t(this, void 0, void 0, function*() {
                    if (!e.body || !e.headers) return;
                    const t = e.body.getReader(), n = Number(e.headers.get("Content-Length")) || 0;
                    let s = 0;
                    const r = (t)=>{
                        s += (null == t ? void 0 : t.length) || 0;
                        const e = Math.round(s / n * 100);
                        i(e);
                    };
                    try {
                        for(;;){
                            const e = yield t.read();
                            if (e.done) break;
                            r(e.value);
                        }
                    } catch (t) {
                        console.warn("Progress tracking error:", t);
                    }
                });
            }(s.clone(), i), s.blob();
        });
    }
};
function a(t) {
    let e = t;
    const i = new Set;
    return {
        get value () {
            return e;
        },
        set (t) {
            Object.is(e, t) || (e = t, i.forEach((t)=>t(e)));
        },
        update (t) {
            this.set(t(e));
        },
        subscribe: (t)=>(i.add(t), ()=>i.delete(t))
    };
}
function l(t, e) {
    const i = a(t());
    return e.forEach((e)=>e.subscribe(()=>{
            const e = t();
            Object.is(i.value, e) || i.set(e);
        })), {
        get value () {
            return i.value;
        },
        subscribe: (t)=>i.subscribe(t)
    };
}
function h(t, e) {
    let i;
    const n = ()=>{
        i && (i(), i = void 0), i = t();
    }, s = e.map((t)=>t.subscribe(n));
    return n(), ()=>{
        i && (i(), i = void 0), s.forEach((t)=>t());
    };
}
class u extends e {
    get isPlayingSignal() {
        return this._isPlaying;
    }
    get currentTimeSignal() {
        return this._currentTime;
    }
    get durationSignal() {
        return this._duration;
    }
    get volumeSignal() {
        return this._volume;
    }
    get mutedSignal() {
        return this._muted;
    }
    get playbackRateSignal() {
        return this._playbackRate;
    }
    get seekingSignal() {
        return this._seeking;
    }
    constructor(t){
        super(), this.isExternalMedia = !1, this.reactiveMediaEventCleanups = [], t.media ? (this.media = t.media, this.isExternalMedia = !0) : this.media = document.createElement("audio"), this._isPlaying = a(!1), this._currentTime = a(0), this._duration = a(0), this._volume = a(this.media.volume), this._muted = a(this.media.muted), this._playbackRate = a(this.media.playbackRate || 1), this._seeking = a(!1), this.setupReactiveMediaEvents(), t.mediaControls && (this.media.controls = !0), t.autoplay && (this.media.autoplay = !0), null != t.playbackRate && this.onMediaEvent("canplay", ()=>{
            null != t.playbackRate && (this.media.playbackRate = t.playbackRate);
        }, {
            once: !0
        });
    }
    setupReactiveMediaEvents() {
        this.reactiveMediaEventCleanups.push(this.onMediaEvent("play", ()=>{
            this._isPlaying.set(!0);
        })), this.reactiveMediaEventCleanups.push(this.onMediaEvent("pause", ()=>{
            this._isPlaying.set(!1);
        })), this.reactiveMediaEventCleanups.push(this.onMediaEvent("ended", ()=>{
            this._isPlaying.set(!1);
        })), this.reactiveMediaEventCleanups.push(this.onMediaEvent("timeupdate", ()=>{
            this._currentTime.set(this.media.currentTime);
        })), this.reactiveMediaEventCleanups.push(this.onMediaEvent("durationchange", ()=>{
            this._duration.set(this.media.duration || 0);
        })), this.reactiveMediaEventCleanups.push(this.onMediaEvent("loadedmetadata", ()=>{
            this._duration.set(this.media.duration || 0);
        })), this.reactiveMediaEventCleanups.push(this.onMediaEvent("seeking", ()=>{
            this._seeking.set(!0);
        })), this.reactiveMediaEventCleanups.push(this.onMediaEvent("seeked", ()=>{
            this._seeking.set(!1);
        })), this.reactiveMediaEventCleanups.push(this.onMediaEvent("volumechange", ()=>{
            this._volume.set(this.media.volume), this._muted.set(this.media.muted);
        })), this.reactiveMediaEventCleanups.push(this.onMediaEvent("ratechange", ()=>{
            this._playbackRate.set(this.media.playbackRate);
        }));
    }
    onMediaEvent(t, e, i) {
        return this.media.addEventListener(t, e, i), ()=>this.media.removeEventListener(t, e, i);
    }
    getSrc() {
        return this.media.currentSrc || this.media.src || "";
    }
    revokeSrc() {
        const t = this.getSrc();
        t.startsWith("blob:") && URL.revokeObjectURL(t);
    }
    canPlayType(t) {
        return "" !== this.media.canPlayType(t);
    }
    setSrc(t, e) {
        const i = this.getSrc();
        if (t && i === t) return;
        this.revokeSrc();
        const n = e instanceof Blob && (this.canPlayType(e.type) || !t) ? URL.createObjectURL(e) : t;
        if (i && this.media.removeAttribute("src"), n || t) try {
            this.media.src = n;
        } catch (e) {
            this.media.src = t;
        }
    }
    destroy() {
        this.reactiveMediaEventCleanups.forEach((t)=>t()), this.reactiveMediaEventCleanups = [], this.isExternalMedia || (this.media.pause(), this.revokeSrc(), this.media.removeAttribute("src"), this.media.load(), this.media.remove());
    }
    setMediaElement(t) {
        this.reactiveMediaEventCleanups.forEach((t)=>t()), this.reactiveMediaEventCleanups = [], this.media = t, this.setupReactiveMediaEvents();
    }
    play() {
        return t(this, void 0, void 0, function*() {
            try {
                return yield this.media.play();
            } catch (t) {
                if (t instanceof DOMException && "AbortError" === t.name) return;
                throw t;
            }
        });
    }
    pause() {
        this.media.pause();
    }
    isPlaying() {
        return !this.media.paused && !this.media.ended;
    }
    setTime(t) {
        this.media.currentTime = Math.max(0, Math.min(t, this.getDuration()));
    }
    getDuration() {
        return this.media.duration;
    }
    getCurrentTime() {
        return this.media.currentTime;
    }
    getVolume() {
        return this.media.volume;
    }
    setVolume(t) {
        this.media.volume = t;
    }
    getMuted() {
        return this.media.muted;
    }
    setMuted(t) {
        this.media.muted = t;
    }
    getPlaybackRate() {
        return this.media.playbackRate;
    }
    isSeeking() {
        return this.media.seeking;
    }
    setPlaybackRate(t, e) {
        null != e && (this.media.preservesPitch = e), this.media.playbackRate = t;
    }
    getMediaElement() {
        return this.media;
    }
    setSinkId(t) {
        return this.media.setSinkId(t);
    }
}
function c({ maxTop: t, maxBottom: e, halfHeight: i, vScale: n, barMinHeight: s = 0, barAlign: r }) {
    let o = Math.round(t * i * n);
    let a = o + Math.round(e * i * n) || 1;
    return a < s && (a = s, r || (o = a / 2)), {
        topHeight: o,
        totalHeight: a
    };
}
function d({ barAlign: t, halfHeight: e, topHeight: i, totalHeight: n, canvasHeight: s }) {
    return "top" === t ? 0 : "bottom" === t ? s - n : e - i;
}
function p(t, e, i) {
    const n = e - t.left, s = i - t.top;
    return [
        n / t.width,
        s / t.height
    ];
}
function m(t) {
    return Boolean(t.barWidth || t.barGap || t.barAlign);
}
function g(t, e) {
    if (!m(e)) return t;
    const i = e.barWidth || .5, n = i + (e.barGap || i / 2);
    return 0 === n ? t : Math.floor(t / n) * n;
}
function v({ scrollLeft: t, totalWidth: e, numCanvases: i }) {
    if (0 === e) return [
        0
    ];
    const n = t / e, s = Math.floor(n * i);
    return [
        s - 1,
        s,
        s + 1
    ];
}
function f(t) {
    const e = t._cleanup;
    "function" == typeof e && e();
}
function b(t) {
    const e = a({
        scrollLeft: t.scrollLeft,
        scrollWidth: t.scrollWidth,
        clientWidth: t.clientWidth
    }), i = l(()=>(function(t) {
            const { scrollLeft: e, scrollWidth: i, clientWidth: n } = t;
            if (0 === i) return {
                startX: 0,
                endX: 1
            };
            const s = e / i, r = (e + n) / i;
            return {
                startX: Math.max(0, Math.min(1, s)),
                endX: Math.max(0, Math.min(1, r))
            };
        })(e.value), [
        e
    ]), n = l(()=>(function(t) {
            return {
                left: t.scrollLeft,
                right: t.scrollLeft + t.clientWidth
            };
        })(e.value), [
        e
    ]), s = ()=>{
        e.set({
            scrollLeft: t.scrollLeft,
            scrollWidth: t.scrollWidth,
            clientWidth: t.clientWidth
        });
    };
    t.addEventListener("scroll", s, {
        passive: !0
    });
    return {
        scrollData: e,
        percentages: i,
        bounds: n,
        cleanup: ()=>{
            t.removeEventListener("scroll", s), f(e);
        }
    };
}
class y extends e {
    constructor(t, e){
        super(), this.timeouts = [], this.isScrollable = !1, this.audioData = null, this.resizeObserver = null, this.lastContainerWidth = 0, this.isDragging = !1, this.subscriptions = [], this.unsubscribeOnScroll = [], this.dragStream = null, this.scrollStream = null, this.subscriptions = [], this.options = t;
        const i = this.parentFromOptionsContainer(t.container);
        this.parent = i;
        const [n, s] = this.initHtml();
        i.appendChild(n), this.container = n, this.scrollContainer = s.querySelector(".scroll"), this.wrapper = s.querySelector(".wrapper"), this.canvasWrapper = s.querySelector(".canvases"), this.progressWrapper = s.querySelector(".progress"), this.cursor = s.querySelector(".cursor"), e && s.appendChild(e), this.initEvents();
    }
    parentFromOptionsContainer(t) {
        let e;
        if ("string" == typeof t ? e = document.querySelector(t) : t instanceof HTMLElement && (e = t), !e) throw new Error("Container not found");
        return e;
    }
    initEvents() {
        this.wrapper.addEventListener("click", (t)=>{
            const e = this.wrapper.getBoundingClientRect(), [i, n] = p(e, t.clientX, t.clientY);
            this.emit("click", i, n);
        }), this.wrapper.addEventListener("dblclick", (t)=>{
            const e = this.wrapper.getBoundingClientRect(), [i, n] = p(e, t.clientX, t.clientY);
            this.emit("dblclick", i, n);
        }), !0 !== this.options.dragToSeek && "object" != typeof this.options.dragToSeek || this.initDrag(), this.scrollStream = b(this.scrollContainer);
        const t = h(()=>{
            const { startX: t, endX: e } = this.scrollStream.percentages.value, { left: i, right: n } = this.scrollStream.bounds.value;
            this.emit("scroll", t, e, i, n);
        }, [
            this.scrollStream.percentages,
            this.scrollStream.bounds
        ]);
        if (this.subscriptions.push(t), "function" == typeof ResizeObserver) {
            const t = this.createDelay(100);
            this.resizeObserver = new ResizeObserver(()=>{
                t().then(()=>this.onContainerResize()).catch(()=>{});
            }), this.resizeObserver.observe(this.scrollContainer);
        }
    }
    onContainerResize() {
        const t = this.parent.clientWidth;
        t === this.lastContainerWidth && "auto" !== this.options.height || (this.lastContainerWidth = t, this.reRender(), this.emit("resize"));
    }
    initDrag() {
        if (this.dragStream) return;
        this.dragStream = function(t, e = {}) {
            const { threshold: i = 3, mouseButton: n = 0, touchDelay: s = 100 } = e, r = a(null), o = new Map, l = matchMedia("(pointer: coarse)").matches;
            let h = ()=>{};
            const u = (e)=>{
                if (e.button !== n) return;
                if (o.set(e.pointerId, e), o.size > 1) return;
                let a = e.clientX, u = e.clientY, c = !1;
                const d = Date.now(), p = t.getBoundingClientRect(), { left: m, top: g } = p, v = (t)=>{
                    if (t.defaultPrevented || o.size > 1) return;
                    if (l && Date.now() - d < s) return;
                    const e = t.clientX, n = t.clientY, h = e - a, p = n - u;
                    (c || Math.abs(h) > i || Math.abs(p) > i) && (t.preventDefault(), t.stopPropagation(), c || (r.set({
                        type: "start",
                        x: a - m,
                        y: u - g
                    }), c = !0), r.set({
                        type: "move",
                        x: e - m,
                        y: n - g,
                        deltaX: h,
                        deltaY: p
                    }), a = e, u = n);
                }, f = (t)=>{
                    if (o.delete(t.pointerId), c) {
                        const e = t.clientX, i = t.clientY;
                        r.set({
                            type: "end",
                            x: e - m,
                            y: i - g
                        });
                    }
                    h();
                }, b = (t)=>{
                    o.delete(t.pointerId), t.relatedTarget && t.relatedTarget !== document.documentElement || f(t);
                }, y = (t)=>{
                    c && (t.stopPropagation(), t.preventDefault());
                }, C = (t)=>{
                    t.defaultPrevented || o.size > 1 || c && t.preventDefault();
                };
                document.addEventListener("pointermove", v), document.addEventListener("pointerup", f), document.addEventListener("pointerout", b), document.addEventListener("pointercancel", b), document.addEventListener("touchmove", C, {
                    passive: !1
                }), document.addEventListener("click", y, {
                    capture: !0
                }), h = ()=>{
                    document.removeEventListener("pointermove", v), document.removeEventListener("pointerup", f), document.removeEventListener("pointerout", b), document.removeEventListener("pointercancel", b), document.removeEventListener("touchmove", C), setTimeout(()=>{
                        document.removeEventListener("click", y, {
                            capture: !0
                        });
                    }, 10);
                };
            };
            return t.addEventListener("pointerdown", u), {
                signal: r,
                cleanup: ()=>{
                    h(), t.removeEventListener("pointerdown", u), o.clear(), f(r);
                }
            };
        }(this.wrapper);
        const t = h(()=>{
            const t = this.dragStream.signal.value;
            if (!t) return;
            const e = this.wrapper.getBoundingClientRect().width, i = (n = t.x / e) < 0 ? 0 : n > 1 ? 1 : n;
            var n;
            "start" === t.type ? (this.isDragging = !0, this.emit("dragstart", i)) : "move" === t.type ? this.emit("drag", i) : "end" === t.type && (this.isDragging = !1, this.emit("dragend", i));
        }, [
            this.dragStream.signal
        ]);
        this.subscriptions.push(t);
    }
    initHtml() {
        const t = document.createElement("div"), e = t.attachShadow({
            mode: "open"
        }), i = this.options.cspNonce && "string" == typeof this.options.cspNonce ? this.options.cspNonce.replace(/"/g, "") : "";
        return e.innerHTML = `\n      <style${i ? ` nonce="${i}"` : ""}>\n        :host {\n          user-select: none;\n          min-width: 1px;\n        }\n        :host audio {\n          display: block;\n          width: 100%;\n        }\n        :host .scroll {\n          overflow-x: auto;\n          overflow-y: hidden;\n          width: 100%;\n          position: relative;\n        }\n        :host .noScrollbar {\n          scrollbar-color: transparent;\n          scrollbar-width: none;\n        }\n        :host .noScrollbar::-webkit-scrollbar {\n          display: none;\n          -webkit-appearance: none;\n        }\n        :host .wrapper {\n          position: relative;\n          overflow: visible;\n          z-index: 2;\n        }\n        :host .canvases {\n          min-height: ${this.getHeight(this.options.height, this.options.splitChannels)}px;\n          pointer-events: none;\n        }\n        :host .canvases > div {\n          position: relative;\n        }\n        :host canvas {\n          display: block;\n          position: absolute;\n          top: 0;\n          image-rendering: pixelated;\n        }\n        :host .progress {\n          pointer-events: none;\n          position: absolute;\n          z-index: 2;\n          top: 0;\n          left: 0;\n          width: 0;\n          height: 100%;\n          overflow: hidden;\n        }\n        :host .progress > div {\n          position: relative;\n        }\n        :host .cursor {\n          pointer-events: none;\n          position: absolute;\n          z-index: 5;\n          top: 0;\n          left: 0;\n          height: 100%;\n          border-radius: 2px;\n        }\n      </style>\n\n      <div class="scroll" part="scroll">\n        <div class="wrapper" part="wrapper">\n          <div class="canvases" part="canvases"></div>\n          <div class="progress" part="progress"></div>\n          <div class="cursor" part="cursor"></div>\n        </div>\n      </div>\n    `, [
            t,
            e
        ];
    }
    setOptions(t) {
        if (this.options.container !== t.container) {
            const e = this.parentFromOptionsContainer(t.container);
            e.appendChild(this.container), this.parent = e;
        }
        !0 !== t.dragToSeek && "object" != typeof this.options.dragToSeek || this.initDrag(), this.options = t, this.reRender();
    }
    getWrapper() {
        return this.wrapper;
    }
    getWidth() {
        return this.scrollContainer.clientWidth;
    }
    getScroll() {
        return this.scrollContainer.scrollLeft;
    }
    setScroll(t) {
        this.scrollContainer.scrollLeft = t;
    }
    setScrollPercentage(t) {
        const { scrollWidth: e } = this.scrollContainer, i = e * t;
        this.setScroll(i);
    }
    destroy() {
        var t;
        this.subscriptions.forEach((t)=>t()), this.container.remove(), this.resizeObserver && (this.resizeObserver.disconnect(), this.resizeObserver = null), null === (t = this.unsubscribeOnScroll) || void 0 === t || t.forEach((t)=>t()), this.unsubscribeOnScroll = [], this.dragStream && (this.dragStream.cleanup(), this.dragStream = null), this.scrollStream && (this.scrollStream.cleanup(), this.scrollStream = null);
    }
    createDelay(t = 10) {
        let e, i;
        const n = ()=>{
            e && (clearTimeout(e), e = void 0), i && (i(), i = void 0);
        };
        return this.timeouts.push(n), ()=>new Promise((s, r)=>{
                n(), i = r, e = setTimeout(()=>{
                    e = void 0, i = void 0, s();
                }, t);
            });
    }
    getHeight(t, e) {
        var i;
        const n = (null === (i = this.audioData) || void 0 === i ? void 0 : i.numberOfChannels) || 1;
        return function({ optionsHeight: t, optionsSplitChannels: e, parentHeight: i, numberOfChannels: n, defaultHeight: s = 128 }) {
            if (null == t) return s;
            const r = Number(t);
            if (!isNaN(r)) return r;
            if ("auto" === t) {
                const t = i || s;
                return (null == e ? void 0 : e.every((t)=>!t.overlay)) ? t / n : t;
            }
            return s;
        }({
            optionsHeight: t,
            optionsSplitChannels: e,
            parentHeight: this.parent.clientHeight,
            numberOfChannels: n,
            defaultHeight: 128
        });
    }
    convertColorValues(t, e) {
        return function(t, e, i) {
            if (!Array.isArray(t)) return t || "";
            if (0 === t.length) return "#999";
            if (t.length < 2) return t[0] || "";
            const n = document.createElement("canvas"), s = n.getContext("2d"), r = null != i ? i : n.height * e, o = s.createLinearGradient(0, 0, 0, r || e), a = 1 / (t.length - 1);
            return t.forEach((t, e)=>{
                o.addColorStop(e * a, t);
            }), o;
        }(t, this.getPixelRatio(), null == e ? void 0 : e.canvas.height);
    }
    getPixelRatio() {
        return t = window.devicePixelRatio, Math.max(1, t || 1);
        //TURBOPACK unreachable
        ;
        var t;
    }
    renderBarWaveform(t, e, i, n) {
        const { width: s, height: r } = i.canvas, { halfHeight: o, barWidth: a, barRadius: l, barIndexScale: h, barSpacing: u, barMinHeight: p } = function({ width: t, height: e, length: i, options: n, pixelRatio: s }) {
            const r = e / 2, o = n.barWidth ? n.barWidth * s : 1, a = n.barGap ? n.barGap * s : n.barWidth ? o / 2 : 0, l = o + a || 1;
            return {
                halfHeight: r,
                barWidth: o,
                barGap: a,
                barRadius: n.barRadius || 0,
                barMinHeight: n.barMinHeight ? n.barMinHeight * s : 0,
                barIndexScale: i > 0 ? t / l / i : 0,
                barSpacing: l
            };
        }({
            width: s,
            height: r,
            length: (t[0] || []).length,
            options: e,
            pixelRatio: this.getPixelRatio()
        }), m = function({ channelData: t, barIndexScale: e, barSpacing: i, barWidth: n, halfHeight: s, vScale: r, canvasHeight: o, barAlign: a, barMinHeight: l }) {
            const h = t[0] || [], u = t[1] || h, p = h.length, m = [];
            let g = 0, v = 0, f = 0;
            for(let t = 0; t <= p; t++){
                const p = Math.round(t * e);
                if (p > g) {
                    const { topHeight: t, totalHeight: e } = c({
                        maxTop: v,
                        maxBottom: f,
                        halfHeight: s,
                        vScale: r,
                        barMinHeight: l,
                        barAlign: a
                    }), h = d({
                        barAlign: a,
                        halfHeight: s,
                        topHeight: t,
                        totalHeight: e,
                        canvasHeight: o
                    });
                    m.push({
                        x: g * i,
                        y: h,
                        width: n,
                        height: e
                    }), g = p, v = 0, f = 0;
                }
                const b = Math.abs(h[t] || 0), y = Math.abs(u[t] || 0);
                b > v && (v = b), y > f && (f = y);
            }
            return m;
        }({
            channelData: t,
            barIndexScale: h,
            barSpacing: u,
            barWidth: a,
            halfHeight: o,
            vScale: n,
            canvasHeight: r,
            barAlign: e.barAlign,
            barMinHeight: p
        });
        i.beginPath();
        for (const t of m)l && "roundRect" in i ? i.roundRect(t.x, t.y, t.width, t.height, l) : i.rect(t.x, t.y, t.width, t.height);
        i.fill(), i.closePath();
    }
    renderLineWaveform(t, e, i, n) {
        const { width: s, height: r } = i.canvas, o = function({ channelData: t, width: e, height: i, vScale: n }) {
            const s = i / 2, r = t[0] || [];
            return [
                r,
                t[1] || r
            ].map((t, i)=>{
                const r = t.length, o = r ? e / r : 0, a = s, l = 0 === i ? -1 : 1, h = [
                    {
                        x: 0,
                        y: a
                    }
                ];
                let u = 0, c = 0;
                for(let e = 0; e <= r; e++){
                    const i = Math.round(e * o);
                    if (i > u) {
                        const t = a + (Math.round(c * s * n) || 1) * l;
                        h.push({
                            x: u,
                            y: t
                        }), u = i, c = 0;
                    }
                    const r = Math.abs(t[e] || 0);
                    r > c && (c = r);
                }
                return h.push({
                    x: u,
                    y: a
                }), h;
            });
        }({
            channelData: t,
            width: s,
            height: r,
            vScale: n
        });
        i.beginPath();
        for (const t of o)if (t.length) {
            i.moveTo(t[0].x, t[0].y);
            for(let e = 1; e < t.length; e++){
                const n = t[e];
                i.lineTo(n.x, n.y);
            }
        }
        i.fill(), i.closePath();
    }
    renderWaveform(t, e, i) {
        if (i.fillStyle = this.convertColorValues(e.waveColor, i), e.renderFunction) return void e.renderFunction(t, i);
        const n = function({ channelData: t, barHeight: e, normalize: i, maxPeak: n }) {
            var s;
            const r = e || 1;
            if (!i) return r;
            const o = t[0];
            if (!o || 0 === o.length) return r;
            let a = null != n ? n : 0;
            if (!n) for(let t = 0; t < o.length; t++){
                const e = null !== (s = o[t]) && void 0 !== s ? s : 0, i = Math.abs(e);
                i > a && (a = i);
            }
            return a ? r / a : r;
        }({
            channelData: t,
            barHeight: e.barHeight,
            normalize: e.normalize,
            maxPeak: e.maxPeak
        });
        m(e) ? this.renderBarWaveform(t, e, i, n) : this.renderLineWaveform(t, e, i, n);
    }
    renderSingleCanvas(t, e, i, n, s, r, o) {
        const a = this.getPixelRatio(), l = document.createElement("canvas");
        l.width = Math.round(i * a), l.height = Math.round(n * a), l.style.width = `${i}px`, l.style.height = `${n}px`, l.style.left = `${Math.round(s)}px`, r.appendChild(l);
        const h = l.getContext("2d");
        if (e.renderFunction ? (h.fillStyle = this.convertColorValues(e.waveColor, h), e.renderFunction(t, h)) : this.renderWaveform(t, e, h), l.width > 0 && l.height > 0) {
            const t = l.cloneNode(), i = t.getContext("2d");
            i.drawImage(l, 0, 0), i.globalCompositeOperation = "source-in", i.fillStyle = this.convertColorValues(e.progressColor, i), i.fillRect(0, 0, l.width, l.height), o.appendChild(t);
        }
    }
    renderMultiCanvas(t, e, i, n, s, r) {
        const o = this.getPixelRatio(), { clientWidth: a } = this.scrollContainer, l = i / o, h = function({ clientWidth: t, totalWidth: e, options: i }) {
            return g(Math.min(8e3, t, e), i);
        }({
            clientWidth: a,
            totalWidth: l,
            options: e
        });
        let u = {};
        if (0 === h) return;
        const c = (i)=>{
            if (i < 0 || i >= d) return;
            if (u[i]) return;
            u[i] = !0;
            const o = i * h;
            let a = Math.min(l - o, h);
            if (a = g(a, e), a <= 0) return;
            const c = function({ channelData: t, offset: e, clampedWidth: i, totalWidth: n }) {
                return t.map((t)=>{
                    const s = Math.floor(e / n * t.length), r = Math.floor((e + i) / n * t.length);
                    return t.slice(s, r);
                });
            }({
                channelData: t,
                offset: o,
                clampedWidth: a,
                totalWidth: l
            });
            this.renderSingleCanvas(c, e, a, n, o, s, r);
        }, d = Math.ceil(l / h);
        if (!this.isScrollable) {
            for(let t = 0; t < d; t++)c(t);
            return;
        }
        if (v({
            scrollLeft: this.scrollContainer.scrollLeft,
            totalWidth: l,
            numCanvases: d
        }).forEach((t)=>c(t)), d > 1) {
            const t = this.on("scroll", ()=>{
                const { scrollLeft: t } = this.scrollContainer;
                Object.keys(u).length > 10 && (s.innerHTML = "", r.innerHTML = "", u = {}), v({
                    scrollLeft: t,
                    totalWidth: l,
                    numCanvases: d
                }).forEach((t)=>c(t));
            });
            this.unsubscribeOnScroll.push(t);
        }
    }
    renderChannel(t, e, i, n) {
        var { overlay: s } = e, r = function(t, e) {
            var i = {};
            for(var n in t)Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (i[n] = t[n]);
            if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
                var s = 0;
                for(n = Object.getOwnPropertySymbols(t); s < n.length; s++)e.indexOf(n[s]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[s]) && (i[n[s]] = t[n[s]]);
            }
            return i;
        }(e, [
            "overlay"
        ]);
        const o = document.createElement("div"), a = this.getHeight(r.height, r.splitChannels);
        o.style.height = `${a}px`, s && n > 0 && (o.style.marginTop = `-${a}px`), this.canvasWrapper.style.minHeight = `${a}px`, this.canvasWrapper.appendChild(o);
        const l = o.cloneNode();
        this.progressWrapper.appendChild(l), this.renderMultiCanvas(t, r, i, a, o, l);
    }
    render(e) {
        return t(this, void 0, void 0, function*() {
            var t;
            this.timeouts.forEach((t)=>t()), this.timeouts = [], this.canvasWrapper.innerHTML = "", this.progressWrapper.innerHTML = "", null != this.options.width && (this.scrollContainer.style.width = "number" == typeof this.options.width ? `${this.options.width}px` : this.options.width);
            const i = this.getPixelRatio(), n = this.scrollContainer.clientWidth, { scrollWidth: s, isScrollable: r, useParentWidth: o, width: a } = function({ duration: t, minPxPerSec: e = 0, parentWidth: i, fillParent: n, pixelRatio: s }) {
                const r = Math.ceil(t * e), o = r > i, a = Boolean(n && !o);
                return {
                    scrollWidth: r,
                    isScrollable: o,
                    useParentWidth: a,
                    width: (a ? i : r) * s
                };
            }({
                duration: e.duration,
                minPxPerSec: this.options.minPxPerSec || 0,
                parentWidth: n,
                fillParent: this.options.fillParent,
                pixelRatio: i
            });
            if (this.isScrollable = r, this.wrapper.style.width = o ? "100%" : `${s}px`, this.scrollContainer.style.overflowX = this.isScrollable ? "auto" : "hidden", this.scrollContainer.classList.toggle("noScrollbar", !!this.options.hideScrollbar), this.cursor.style.backgroundColor = `${this.options.cursorColor || this.options.progressColor}`, this.cursor.style.width = `${this.options.cursorWidth}px`, this.audioData = e, this.emit("render"), this.options.splitChannels) for(let i = 0; i < e.numberOfChannels; i++){
                const n = Object.assign(Object.assign({}, this.options), null === (t = this.options.splitChannels) || void 0 === t ? void 0 : t[i]);
                this.renderChannel([
                    e.getChannelData(i)
                ], n, a, i);
            }
            else {
                const t = [
                    e.getChannelData(0)
                ];
                e.numberOfChannels > 1 && t.push(e.getChannelData(1)), this.renderChannel(t, this.options, a, 0);
            }
            Promise.resolve().then(()=>this.emit("rendered"));
        });
    }
    reRender() {
        if (this.unsubscribeOnScroll.forEach((t)=>t()), this.unsubscribeOnScroll = [], !this.audioData) return;
        const { scrollWidth: t } = this.scrollContainer, { right: e } = this.progressWrapper.getBoundingClientRect();
        if (this.render(this.audioData), this.isScrollable && t !== this.scrollContainer.scrollWidth) {
            const { right: t } = this.progressWrapper.getBoundingClientRect(), i = function(t) {
                const e = 2 * t;
                return (e < 0 ? Math.floor(e) : Math.ceil(e)) / 2;
            }(t - e);
            this.scrollContainer.scrollLeft += i;
        }
    }
    zoom(t) {
        this.options.minPxPerSec = t, this.reRender();
    }
    scrollIntoView(t, e = !1) {
        const { scrollLeft: i, scrollWidth: n, clientWidth: s } = this.scrollContainer, r = t * n, o = i, a = i + s, l = s / 2;
        if (this.isDragging) {
            const t = 30;
            r + t > a ? this.scrollContainer.scrollLeft += t : r - t < o && (this.scrollContainer.scrollLeft -= t);
        } else {
            (r < o || r > a) && (this.scrollContainer.scrollLeft = r - (this.options.autoCenter ? l : 0));
            const t = r - i - l;
            e && this.options.autoCenter && t > 0 && (this.scrollContainer.scrollLeft += t);
        }
    }
    renderProgress(t, e) {
        if (isNaN(t)) return;
        const i = 100 * t;
        this.canvasWrapper.style.clipPath = `polygon(${i}% 0%, 100% 0%, 100% 100%, ${i}% 100%)`, this.progressWrapper.style.width = `${i}%`, this.cursor.style.left = `${i}%`, this.cursor.style.transform = this.options.cursorWidth ? `translateX(-${t * this.options.cursorWidth}px)` : "", this.isScrollable && this.options.autoScroll && this.audioData && this.audioData.duration > 0 && this.scrollIntoView(t, e);
    }
    exportImage(e, i, n) {
        return t(this, void 0, void 0, function*() {
            const t = this.canvasWrapper.querySelectorAll("canvas");
            if (!t.length) throw new Error("No waveform data");
            if ("dataURL" === n) {
                const n = Array.from(t).map((t)=>t.toDataURL(e, i));
                return Promise.resolve(n);
            }
            return Promise.all(Array.from(t).map((t)=>new Promise((n, s)=>{
                    t.toBlob((t)=>{
                        t ? n(t) : s(new Error("Could not export image"));
                    }, e, i);
                })));
        });
    }
}
class C extends e {
    constructor(){
        super(...arguments), this.animationFrameId = null, this.isRunning = !1;
    }
    start() {
        if (this.isRunning) return;
        this.isRunning = !0;
        const t = ()=>{
            this.isRunning && (this.emit("tick"), this.animationFrameId = requestAnimationFrame(t));
        };
        t();
    }
    stop() {
        this.isRunning = !1, null !== this.animationFrameId && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = null);
    }
    destroy() {
        this.stop();
    }
}
class S extends e {
    constructor(t = new AudioContext){
        super(), this.bufferNode = null, this.playStartTime = 0, this.playedDuration = 0, this._muted = !1, this._playbackRate = 1, this._duration = void 0, this.buffer = null, this.currentSrc = "", this.paused = !0, this.crossOrigin = null, this.seeking = !1, this.autoplay = !1, this.addEventListener = this.on, this.removeEventListener = this.un, this.audioContext = t, this.gainNode = this.audioContext.createGain(), this.gainNode.connect(this.audioContext.destination);
    }
    load() {
        return t(this, void 0, void 0, function*() {});
    }
    get src() {
        return this.currentSrc;
    }
    set src(t) {
        if (this.currentSrc = t, this._duration = void 0, !t) return this.buffer = null, void this.emit("emptied");
        fetch(t).then((e)=>{
            if (e.status >= 400) throw new Error(`Failed to fetch ${t}: ${e.status} (${e.statusText})`);
            return e.arrayBuffer();
        }).then((e)=>this.currentSrc !== t ? null : this.audioContext.decodeAudioData(e)).then((e)=>{
            this.currentSrc === t && (this.buffer = e, this.emit("loadedmetadata"), this.emit("canplay"), this.autoplay && this.play());
        }).catch((t)=>{
            console.error("WebAudioPlayer load error:", t);
        });
    }
    _play() {
        if (!this.paused) return;
        this.paused = !1, this.bufferNode && (this.bufferNode.onended = null, this.bufferNode.disconnect()), this.bufferNode = this.audioContext.createBufferSource(), this.buffer && (this.bufferNode.buffer = this.buffer), this.bufferNode.playbackRate.value = this._playbackRate, this.bufferNode.connect(this.gainNode);
        let t = this.playedDuration * this._playbackRate;
        (t >= this.duration || t < 0) && (t = 0, this.playedDuration = 0), this.bufferNode.start(this.audioContext.currentTime, t), this.playStartTime = this.audioContext.currentTime, this.bufferNode.onended = ()=>{
            this.currentTime >= this.duration && (this.pause(), this.emit("ended"));
        };
    }
    _pause() {
        var t;
        this.paused = !0, null === (t = this.bufferNode) || void 0 === t || t.stop(), this.playedDuration += this.audioContext.currentTime - this.playStartTime;
    }
    play() {
        return t(this, void 0, void 0, function*() {
            this.paused && (this._play(), this.emit("play"));
        });
    }
    pause() {
        this.paused || (this._pause(), this.emit("pause"));
    }
    stopAt(t) {
        const e = t - this.currentTime, i = this.bufferNode;
        null == i || i.stop(this.audioContext.currentTime + e), null == i || i.addEventListener("ended", ()=>{
            i === this.bufferNode && (this.bufferNode = null, this.pause());
        }, {
            once: !0
        });
    }
    setSinkId(e) {
        return t(this, void 0, void 0, function*() {
            return this.audioContext.setSinkId(e);
        });
    }
    get playbackRate() {
        return this._playbackRate;
    }
    set playbackRate(t) {
        this._playbackRate = t, this.bufferNode && (this.bufferNode.playbackRate.value = t);
    }
    get currentTime() {
        return (this.paused ? this.playedDuration : this.playedDuration + (this.audioContext.currentTime - this.playStartTime)) * this._playbackRate;
    }
    set currentTime(t) {
        const e = !this.paused;
        e && this._pause(), this.playedDuration = t / this._playbackRate, e && this._play(), this.emit("seeking"), this.emit("timeupdate");
    }
    get duration() {
        var t, e;
        return null !== (t = this._duration) && void 0 !== t ? t : (null === (e = this.buffer) || void 0 === e ? void 0 : e.duration) || 0;
    }
    set duration(t) {
        this._duration = t;
    }
    get volume() {
        return this.gainNode.gain.value;
    }
    set volume(t) {
        this.gainNode.gain.value = t, this.emit("volumechange");
    }
    get muted() {
        return this._muted;
    }
    set muted(t) {
        this._muted !== t && (this._muted = t, this._muted ? this.gainNode.disconnect() : this.gainNode.connect(this.audioContext.destination));
    }
    canPlayType(t) {
        return /^(audio|video)\//.test(t);
    }
    getGainNode() {
        return this.gainNode;
    }
    getChannelData() {
        const t = [];
        if (!this.buffer) return t;
        const e = this.buffer.numberOfChannels;
        for(let i = 0; i < e; i++)t.push(this.buffer.getChannelData(i));
        return t;
    }
    removeAttribute(t) {
        switch(t){
            case "src":
                this.src = "";
                break;
            case "playbackRate":
                this.playbackRate = 0;
                break;
            case "currentTime":
                this.currentTime = 0;
                break;
            case "duration":
                this.duration = 0;
                break;
            case "volume":
                this.volume = 0;
                break;
            case "muted":
                this.muted = !1;
        }
    }
}
const E = {
    waveColor: "#999",
    progressColor: "#555",
    cursorWidth: 1,
    minPxPerSec: 0,
    fillParent: !0,
    interact: !0,
    dragToSeek: !1,
    autoScroll: !0,
    autoCenter: !0,
    sampleRate: 8e3
};
class w extends u {
    static create(t) {
        return new w(t);
    }
    getState() {
        return this.wavesurferState;
    }
    getRenderer() {
        return this.renderer;
    }
    constructor(t){
        const e = t.media || ("WebAudio" === t.backend ? new S : void 0);
        super({
            media: e,
            mediaControls: t.mediaControls,
            autoplay: t.autoplay,
            playbackRate: t.audioRate
        }), this.plugins = [], this.decodedData = null, this.stopAtPosition = null, this.subscriptions = [], this.mediaSubscriptions = [], this.abortController = null, this.reactiveCleanups = [], this.options = Object.assign({}, E, t);
        const { state: i, actions: n } = function(t) {
            var e, i, n, s, r, o;
            const h = null !== (e = null == t ? void 0 : t.currentTime) && void 0 !== e ? e : a(0), u = null !== (i = null == t ? void 0 : t.duration) && void 0 !== i ? i : a(0), c = null !== (n = null == t ? void 0 : t.isPlaying) && void 0 !== n ? n : a(!1), d = null !== (s = null == t ? void 0 : t.isSeeking) && void 0 !== s ? s : a(!1), p = null !== (r = null == t ? void 0 : t.volume) && void 0 !== r ? r : a(1), m = null !== (o = null == t ? void 0 : t.playbackRate) && void 0 !== o ? o : a(1), g = a(null), v = a(null), f = a(""), b = a(0), y = a(0), C = l(()=>!c.value, [
                c
            ]), S = l(()=>null !== g.value, [
                g
            ]), E = l(()=>S.value && u.value > 0, [
                S,
                u
            ]), w = l(()=>h.value, [
                h
            ]), P = l(()=>u.value > 0 ? h.value / u.value : 0, [
                h,
                u
            ]);
            return {
                state: {
                    currentTime: h,
                    duration: u,
                    isPlaying: c,
                    isPaused: C,
                    isSeeking: d,
                    volume: p,
                    playbackRate: m,
                    audioBuffer: g,
                    peaks: v,
                    url: f,
                    zoom: b,
                    scrollPosition: y,
                    canPlay: S,
                    isReady: E,
                    progress: w,
                    progressPercent: P
                },
                actions: {
                    setCurrentTime: (t)=>{
                        const e = Math.max(0, Math.min(u.value || 1 / 0, t));
                        h.set(e);
                    },
                    setDuration: (t)=>{
                        u.set(Math.max(0, t));
                    },
                    setPlaying: (t)=>{
                        c.set(t);
                    },
                    setSeeking: (t)=>{
                        d.set(t);
                    },
                    setVolume: (t)=>{
                        const e = Math.max(0, Math.min(1, t));
                        p.set(e);
                    },
                    setPlaybackRate: (t)=>{
                        const e = Math.max(.1, Math.min(16, t));
                        m.set(e);
                    },
                    setAudioBuffer: (t)=>{
                        g.set(t), t && u.set(t.duration);
                    },
                    setPeaks: (t)=>{
                        v.set(t);
                    },
                    setUrl: (t)=>{
                        f.set(t);
                    },
                    setZoom: (t)=>{
                        b.set(Math.max(0, t));
                    },
                    setScrollPosition: (t)=>{
                        y.set(Math.max(0, t));
                    }
                }
            };
        }({
            isPlaying: this.isPlayingSignal,
            currentTime: this.currentTimeSignal,
            duration: this.durationSignal,
            volume: this.volumeSignal,
            playbackRate: this.playbackRateSignal,
            isSeeking: this.seekingSignal
        });
        this.wavesurferState = i, this.wavesurferActions = n, this.timer = new C;
        const s = e ? void 0 : this.getMediaElement();
        this.renderer = new y(this.options, s), this.initPlayerEvents(), this.initRendererEvents(), this.initTimerEvents(), this.initReactiveState(), this.initPlugins();
        const r = this.options.url || this.getSrc() || "";
        Promise.resolve().then(()=>{
            this.emit("init");
            const { peaks: t, duration: e } = this.options;
            (r || t && e) && this.load(r, t, e).catch((t)=>{
                this.emit("error", t instanceof Error ? t : new Error(String(t)));
            });
        });
    }
    updateProgress(t = this.getCurrentTime()) {
        return this.renderer.renderProgress(t / this.getDuration(), this.isPlaying()), t;
    }
    initTimerEvents() {
        this.subscriptions.push(this.timer.on("tick", ()=>{
            if (!this.isSeeking()) {
                const t = this.updateProgress();
                this.emit("timeupdate", t), this.emit("audioprocess", t), null != this.stopAtPosition && this.isPlaying() && t >= this.stopAtPosition && this.pause();
            }
        }));
    }
    initReactiveState() {
        this.reactiveCleanups.push(function(t, e) {
            const i = [];
            i.push(h(()=>{
                const i = t.isPlaying.value;
                e.emit(i ? "play" : "pause");
            }, [
                t.isPlaying
            ])), i.push(h(()=>{
                const i = t.currentTime.value;
                e.emit("timeupdate", i), t.isPlaying.value && e.emit("audioprocess", i);
            }, [
                t.currentTime,
                t.isPlaying
            ])), i.push(h(()=>{
                t.isSeeking.value && e.emit("seeking", t.currentTime.value);
            }, [
                t.isSeeking,
                t.currentTime
            ]));
            let n = !1;
            i.push(h(()=>{
                t.isReady.value && !n && (n = !0, e.emit("ready", t.duration.value));
            }, [
                t.isReady,
                t.duration
            ]));
            let s = !1;
            return i.push(h(()=>{
                const i = t.isPlaying.value, n = t.currentTime.value, r = t.duration.value, o = r > 0 && n >= r;
                s && !i && o && e.emit("finish"), s = i && o;
            }, [
                t.isPlaying,
                t.currentTime,
                t.duration
            ])), i.push(h(()=>{
                const i = t.zoom.value;
                i > 0 && e.emit("zoom", i);
            }, [
                t.zoom
            ])), ()=>{
                i.forEach((t)=>t());
            };
        }(this.wavesurferState, {
            emit: this.emit.bind(this)
        }));
    }
    initPlayerEvents() {
        this.isPlaying() && (this.emit("play"), this.timer.start()), this.mediaSubscriptions.push(this.onMediaEvent("timeupdate", ()=>{
            const t = this.updateProgress();
            this.emit("timeupdate", t);
        }), this.onMediaEvent("play", ()=>{
            this.emit("play"), this.timer.start();
        }), this.onMediaEvent("pause", ()=>{
            this.emit("pause"), this.timer.stop(), this.stopAtPosition = null;
        }), this.onMediaEvent("emptied", ()=>{
            this.timer.stop(), this.stopAtPosition = null;
        }), this.onMediaEvent("ended", ()=>{
            this.emit("timeupdate", this.getDuration()), this.emit("finish"), this.stopAtPosition = null;
        }), this.onMediaEvent("seeking", ()=>{
            this.emit("seeking", this.getCurrentTime());
        }), this.onMediaEvent("error", ()=>{
            var t;
            this.emit("error", null !== (t = this.getMediaElement().error) && void 0 !== t ? t : new Error("Media error")), this.stopAtPosition = null;
        }));
    }
    initRendererEvents() {
        this.subscriptions.push(this.renderer.on("click", (t, e)=>{
            this.options.interact && (this.seekTo(t), this.emit("interaction", t * this.getDuration()), this.emit("click", t, e));
        }), this.renderer.on("dblclick", (t, e)=>{
            this.emit("dblclick", t, e);
        }), this.renderer.on("scroll", (t, e, i, n)=>{
            const s = this.getDuration();
            this.emit("scroll", t * s, e * s, i, n);
        }), this.renderer.on("render", ()=>{
            this.emit("redraw");
        }), this.renderer.on("rendered", ()=>{
            this.emit("redrawcomplete");
        }), this.renderer.on("dragstart", (t)=>{
            this.emit("dragstart", t);
        }), this.renderer.on("dragend", (t)=>{
            this.emit("dragend", t);
        }), this.renderer.on("resize", ()=>{
            this.emit("resize");
        }));
        {
            let t;
            const e = this.renderer.on("drag", (e)=>{
                var i;
                if (!this.options.interact) return;
                this.renderer.renderProgress(e), clearTimeout(t);
                let n = 0;
                const s = this.options.dragToSeek;
                this.isPlaying() ? n = 0 : !0 === s ? n = 200 : s && "object" == typeof s && (n = null !== (i = s.debounceTime) && void 0 !== i ? i : 200), t = setTimeout(()=>{
                    this.seekTo(e);
                }, n), this.emit("interaction", e * this.getDuration()), this.emit("drag", e);
            });
            this.subscriptions.push(()=>{
                clearTimeout(t), e();
            });
        }
    }
    initPlugins() {
        var t;
        (null === (t = this.options.plugins) || void 0 === t ? void 0 : t.length) && this.options.plugins.forEach((t)=>{
            this.registerPlugin(t);
        });
    }
    unsubscribePlayerEvents() {
        this.mediaSubscriptions.forEach((t)=>t()), this.mediaSubscriptions = [];
    }
    setOptions(t) {
        this.options = Object.assign({}, this.options, t), t.duration && !t.peaks && (this.decodedData = i.createBuffer(this.exportPeaks(), t.duration)), t.peaks && t.duration && (this.decodedData = i.createBuffer(t.peaks, t.duration)), this.renderer.setOptions(this.options), t.audioRate && this.setPlaybackRate(t.audioRate), null != t.mediaControls && (this.getMediaElement().controls = t.mediaControls);
    }
    registerPlugin(t) {
        if (this.plugins.includes(t)) return t;
        t._init(this), this.plugins.push(t);
        const e = t.once("destroy", ()=>{
            this.plugins = this.plugins.filter((e)=>e !== t), this.subscriptions = this.subscriptions.filter((t)=>t !== e);
        });
        return this.subscriptions.push(e), t;
    }
    unregisterPlugin(t) {
        this.plugins = this.plugins.filter((e)=>e !== t), t.destroy();
    }
    getWrapper() {
        return this.renderer.getWrapper();
    }
    getWidth() {
        return this.renderer.getWidth();
    }
    getScroll() {
        return this.renderer.getScroll();
    }
    setScroll(t) {
        return this.renderer.setScroll(t);
    }
    setScrollTime(t) {
        const e = t / this.getDuration();
        this.renderer.setScrollPercentage(e);
    }
    getActivePlugins() {
        return this.plugins;
    }
    loadAudio(e, n, s, r) {
        return t(this, void 0, void 0, function*() {
            var t;
            if (this.emit("load", e), !this.options.media && this.isPlaying() && this.pause(), this.decodedData = null, this.stopAtPosition = null, null === (t = this.abortController) || void 0 === t || t.abort(), this.abortController = null, !n && !s) {
                const t = this.options.fetchParams || {};
                window.AbortController && !t.signal && (this.abortController = new AbortController, t.signal = this.abortController.signal);
                const i = (t)=>this.emit("loading", t);
                n = yield o.fetchBlob(e, i, t);
                const s = this.options.blobMimeType;
                s && (n = new Blob([
                    n
                ], {
                    type: s
                }));
            }
            this.setSrc(e, n);
            const a = yield new Promise((t)=>{
                const e = r || this.getDuration();
                e ? t(e) : this.mediaSubscriptions.push(this.onMediaEvent("loadedmetadata", ()=>t(this.getDuration()), {
                    once: !0
                }));
            });
            if (!e && !n) {
                const t = this.getMediaElement();
                t instanceof S && (t.duration = a);
            }
            if (s) this.decodedData = i.createBuffer(s, a || 0);
            else if (n) {
                const t = yield n.arrayBuffer();
                this.decodedData = yield i.decode(t, this.options.sampleRate);
            }
            this.decodedData && (this.emit("decode", this.getDuration()), this.renderer.render(this.decodedData)), this.emit("ready", this.getDuration());
        });
    }
    load(e, i, n) {
        return t(this, void 0, void 0, function*() {
            try {
                return yield this.loadAudio(e, void 0, i, n);
            } catch (t) {
                throw this.emit("error", t), t;
            }
        });
    }
    loadBlob(e, i, n) {
        return t(this, void 0, void 0, function*() {
            try {
                return yield this.loadAudio("", e, i, n);
            } catch (t) {
                throw this.emit("error", t), t;
            }
        });
    }
    zoom(t) {
        if (!this.decodedData) throw new Error("No audio loaded");
        this.renderer.zoom(t), this.emit("zoom", t);
    }
    getDecodedData() {
        return this.decodedData;
    }
    exportPeaks({ channels: t = 2, maxLength: e = 8e3, precision: i = 1e4 } = {}) {
        if (!this.decodedData) throw new Error("The audio has not been decoded yet");
        const n = Math.min(t, this.decodedData.numberOfChannels), s = [];
        for(let t = 0; t < n; t++){
            const n = this.decodedData.getChannelData(t), r = [], o = n.length / e;
            for(let t = 0; t < e; t++){
                const e = n.slice(Math.floor(t * o), Math.ceil((t + 1) * o));
                let s = 0;
                for(let t = 0; t < e.length; t++){
                    const i = e[t];
                    Math.abs(i) > Math.abs(s) && (s = i);
                }
                r.push(Math.round(s * i) / i);
            }
            s.push(r);
        }
        return s;
    }
    getDuration() {
        let t = super.getDuration() || 0;
        return 0 !== t && t !== 1 / 0 || !this.decodedData || (t = this.decodedData.duration), t;
    }
    toggleInteraction(t) {
        this.options.interact = t;
    }
    setTime(t) {
        this.stopAtPosition = null, super.setTime(t), this.updateProgress(t), this.emit("timeupdate", t);
    }
    seekTo(t) {
        const e = this.getDuration() * t;
        this.setTime(e);
    }
    play(e, i) {
        const n = Object.create(null, {
            play: {
                get: ()=>super.play
            }
        });
        return t(this, void 0, void 0, function*() {
            null != e && this.setTime(e);
            const t = yield n.play.call(this);
            return null != i && (this.media instanceof S ? this.media.stopAt(i) : this.stopAtPosition = i), t;
        });
    }
    playPause() {
        return t(this, void 0, void 0, function*() {
            return this.isPlaying() ? this.pause() : this.play();
        });
    }
    stop() {
        this.pause(), this.setTime(0);
    }
    skip(t) {
        this.setTime(this.getCurrentTime() + t);
    }
    empty() {
        this.load("", [
            [
                0
            ]
        ], .001);
    }
    setMediaElement(t) {
        this.unsubscribePlayerEvents(), super.setMediaElement(t), this.initPlayerEvents();
    }
    exportImage() {
        return t(this, arguments, void 0, function*(t = "image/png", e = 1, i = "dataURL") {
            return this.renderer.exportImage(t, e, i);
        });
    }
    destroy() {
        var t;
        this.emit("destroy"), null === (t = this.abortController) || void 0 === t || t.abort(), this.plugins.forEach((t)=>t.destroy()), this.subscriptions.forEach((t)=>t()), this.unsubscribePlayerEvents(), this.reactiveCleanups.forEach((t)=>t()), this.reactiveCleanups = [], this.timer.destroy(), this.renderer.destroy(), super.destroy();
    }
}
w.BasePlugin = class extends e {
    constructor(t){
        super(), this.subscriptions = [], this.isDestroyed = !1, this.options = t;
    }
    onInit() {}
    _init(t) {
        this.isDestroyed && (this.subscriptions = [], this.isDestroyed = !1), this.wavesurfer = t, this.onInit();
    }
    destroy() {
        this.emit("destroy"), this.subscriptions.forEach((t)=>t()), this.subscriptions = [], this.isDestroyed = !0, this.wavesurfer = void 0;
    }
}, w.dom = r;
;
}),
"[project]/node_modules/wavesurfer.js/dist/plugins/regions.esm.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>d
]);
class t {
    constructor(){
        this.listeners = {};
    }
    on(t, e, i) {
        if (this.listeners[t] || (this.listeners[t] = new Set), null == i ? void 0 : i.once) {
            const i = (...n)=>{
                this.un(t, i), e(...n);
            };
            return this.listeners[t].add(i), ()=>this.un(t, i);
        }
        return this.listeners[t].add(e), ()=>this.un(t, e);
    }
    un(t, e) {
        var i;
        null === (i = this.listeners[t]) || void 0 === i || i.delete(e);
    }
    once(t, e) {
        return this.on(t, e, {
            once: !0
        });
    }
    unAll() {
        this.listeners = {};
    }
    emit(t, ...e) {
        this.listeners[t] && this.listeners[t].forEach((t)=>t(...e));
    }
}
class e extends t {
    constructor(t){
        super(), this.subscriptions = [], this.isDestroyed = !1, this.options = t;
    }
    onInit() {}
    _init(t) {
        this.isDestroyed && (this.subscriptions = [], this.isDestroyed = !1), this.wavesurfer = t, this.onInit();
    }
    destroy() {
        this.emit("destroy"), this.subscriptions.forEach((t)=>t()), this.subscriptions = [], this.isDestroyed = !0, this.wavesurfer = void 0;
    }
}
function i(t, e) {
    const n = e.xmlns ? document.createElementNS(e.xmlns, t) : document.createElement(t);
    for (const [t, s] of Object.entries(e))if ("children" === t && s) for (const [t, e] of Object.entries(s))e instanceof Node ? n.appendChild(e) : "string" == typeof e ? n.appendChild(document.createTextNode(e)) : n.appendChild(i(t, e));
    else "style" === t ? Object.assign(n.style, s) : "textContent" === t ? n.textContent = s : n.setAttribute(t, s.toString());
    return n;
}
function n(t, e, n) {
    const s = i(t, e || {});
    return null == n || n.appendChild(s), s;
}
function s(t) {
    let e = t;
    const i = new Set;
    return {
        get value () {
            return e;
        },
        set (t) {
            Object.is(e, t) || (e = t, i.forEach((t)=>t(e)));
        },
        update (t) {
            this.set(t(e));
        },
        subscribe: (t)=>(i.add(t), ()=>i.delete(t))
    };
}
function r(t, e) {
    let i;
    const n = ()=>{
        i && (i(), i = void 0), i = t();
    }, s = e.map((t)=>t.subscribe(n));
    return n(), ()=>{
        i && (i(), i = void 0), s.forEach((t)=>t());
    };
}
function o(t, e) {
    const i = s(null), n = (t)=>{
        i.set(t);
    };
    return t.addEventListener(e, n), i._cleanup = ()=>{
        t.removeEventListener(e, n);
    }, i;
}
function l(t) {
    const e = t._cleanup;
    "function" == typeof e && e();
}
function h(t, e = {}) {
    const { threshold: i = 3, mouseButton: n = 0, touchDelay: r = 100 } = e, o = s(null), h1 = new Map, a = matchMedia("(pointer: coarse)").matches;
    let d = ()=>{};
    const c = (e)=>{
        if (e.button !== n) return;
        if (h1.set(e.pointerId, e), h1.size > 1) return;
        let s = e.clientX, l = e.clientY, c = !1;
        const u = Date.now(), v = t.getBoundingClientRect(), { left: p, top: g } = v, m = (t)=>{
            if (t.defaultPrevented || h1.size > 1) return;
            if (a && Date.now() - u < r) return;
            const e = t.clientX, n = t.clientY, d = e - s, v = n - l;
            (c || Math.abs(d) > i || Math.abs(v) > i) && (t.preventDefault(), t.stopPropagation(), c || (o.set({
                type: "start",
                x: s - p,
                y: l - g
            }), c = !0), o.set({
                type: "move",
                x: e - p,
                y: n - g,
                deltaX: d,
                deltaY: v
            }), s = e, l = n);
        }, f = (t)=>{
            if (h1.delete(t.pointerId), c) {
                const e = t.clientX, i = t.clientY;
                o.set({
                    type: "end",
                    x: e - p,
                    y: i - g
                });
            }
            d();
        }, b = (t)=>{
            h1.delete(t.pointerId), t.relatedTarget && t.relatedTarget !== document.documentElement || f(t);
        }, E = (t)=>{
            c && (t.stopPropagation(), t.preventDefault());
        }, C = (t)=>{
            t.defaultPrevented || h1.size > 1 || c && t.preventDefault();
        };
        document.addEventListener("pointermove", m), document.addEventListener("pointerup", f), document.addEventListener("pointerout", b), document.addEventListener("pointercancel", b), document.addEventListener("touchmove", C, {
            passive: !1
        }), document.addEventListener("click", E, {
            capture: !0
        }), d = ()=>{
            document.removeEventListener("pointermove", m), document.removeEventListener("pointerup", f), document.removeEventListener("pointerout", b), document.removeEventListener("pointercancel", b), document.removeEventListener("touchmove", C), setTimeout(()=>{
                document.removeEventListener("click", E, {
                    capture: !0
                });
            }, 10);
        };
    };
    t.addEventListener("pointerdown", c);
    return {
        signal: o,
        cleanup: ()=>{
            d(), t.removeEventListener("pointerdown", c), h1.clear(), l(o);
        }
    };
}
class a extends t {
    constructor(t, e, i = 0){
        var n, s, r, o, l, h, a, d, c, u;
        super(), this.totalDuration = e, this.numberOfChannels = i, this.element = null, this.minLength = 0, this.maxLength = 1 / 0, this.contentEditable = !1, this.subscriptions = [], this.updatingSide = void 0, this.isRemoved = !1, this.subscriptions = [], this.id = t.id || `region-${Math.random().toString(32).slice(2)}`, this.start = this.clampPosition(t.start), this.end = this.clampPosition(null !== (n = t.end) && void 0 !== n ? n : t.start), this.drag = null === (s = t.drag) || void 0 === s || s, this.resize = null === (r = t.resize) || void 0 === r || r, this.resizeStart = null === (o = t.resizeStart) || void 0 === o || o, this.resizeEnd = null === (l = t.resizeEnd) || void 0 === l || l, this.color = null !== (h = t.color) && void 0 !== h ? h : "rgba(0, 0, 0, 0.1)", this.minLength = null !== (a = t.minLength) && void 0 !== a ? a : this.minLength, this.maxLength = null !== (d = t.maxLength) && void 0 !== d ? d : this.maxLength, this.channelIdx = null !== (c = t.channelIdx) && void 0 !== c ? c : -1, this.contentEditable = null !== (u = t.contentEditable) && void 0 !== u ? u : this.contentEditable, this.element = this.initElement(), this.setContent(t.content), this.setPart(), this.renderPosition(), this.initMouseEvents();
    }
    clampPosition(t) {
        return Math.max(0, Math.min(this.totalDuration, t));
    }
    setPart() {
        var t;
        const e = this.start === this.end;
        null === (t = this.element) || void 0 === t || t.setAttribute("part", `${e ? "marker" : "region"} ${this.id}`);
    }
    addResizeHandles(t) {
        const e = {
            position: "absolute",
            zIndex: "2",
            width: "6px",
            height: "100%",
            top: "0",
            cursor: "ew-resize",
            wordBreak: "keep-all"
        }, i = n("div", {
            part: "region-handle region-handle-left",
            style: Object.assign(Object.assign({}, e), {
                left: "0",
                borderLeft: "2px solid rgba(0, 0, 0, 0.5)",
                borderRadius: "2px 0 0 2px"
            })
        }, t), s = n("div", {
            part: "region-handle region-handle-right",
            style: Object.assign(Object.assign({}, e), {
                right: "0",
                borderRight: "2px solid rgba(0, 0, 0, 0.5)",
                borderRadius: "0 2px 2px 0"
            })
        }, t), o = h(i, {
            threshold: 1
        }), l = h(s, {
            threshold: 1
        }), a = r(()=>{
            const t = o.signal.value;
            t && ("move" === t.type && void 0 !== t.deltaX ? this.onResize(t.deltaX, "start") : "end" === t.type && this.onEndResizing("start"));
        }, [
            o.signal
        ]), d = r(()=>{
            const t = l.signal.value;
            t && ("move" === t.type && void 0 !== t.deltaX ? this.onResize(t.deltaX, "end") : "end" === t.type && this.onEndResizing("end"));
        }, [
            l.signal
        ]);
        this.subscriptions.push(()=>{
            a(), d(), o.cleanup(), l.cleanup();
        });
    }
    removeResizeHandles(t) {
        const e = t.querySelector('[part*="region-handle-left"]'), i = t.querySelector('[part*="region-handle-right"]');
        e && t.removeChild(e), i && t.removeChild(i);
    }
    initElement() {
        if (this.isRemoved) return null;
        const t = this.start === this.end;
        let e = 0, i = 100;
        this.channelIdx >= 0 && this.numberOfChannels > 0 && this.channelIdx < this.numberOfChannels && (i = 100 / this.numberOfChannels, e = i * this.channelIdx);
        const s = n("div", {
            style: {
                position: "absolute",
                top: `${e}%`,
                height: `${i}%`,
                backgroundColor: t ? "none" : this.color,
                borderLeft: t ? "2px solid " + this.color : "none",
                borderRadius: "2px",
                boxSizing: "border-box",
                transition: "background-color 0.2s ease",
                cursor: this.drag ? "grab" : "default",
                pointerEvents: "all"
            }
        });
        return !t && this.resize && this.addResizeHandles(s), s;
    }
    renderPosition() {
        if (!this.element) return;
        const t = this.start / this.totalDuration, e = (this.totalDuration - this.end) / this.totalDuration;
        this.element.style.left = 100 * t + "%", this.element.style.right = 100 * e + "%";
    }
    toggleCursor(t) {
        var e;
        this.drag && (null === (e = this.element) || void 0 === e ? void 0 : e.style) && (this.element.style.cursor = t ? "grabbing" : "grab");
    }
    initMouseEvents() {
        const { element: t } = this;
        if (!t) return;
        const e = o(t, "click"), i = o(t, "mouseenter"), n = o(t, "mouseleave"), s = o(t, "dblclick"), a = o(t, "pointerdown"), d = o(t, "pointerup"), c = e.subscribe((t)=>t && this.emit("click", t)), u = i.subscribe((t)=>t && this.emit("over", t)), v = n.subscribe((t)=>t && this.emit("leave", t)), p = s.subscribe((t)=>t && this.emit("dblclick", t)), g = a.subscribe((t)=>t && this.toggleCursor(!0)), m = d.subscribe((t)=>t && this.toggleCursor(!1));
        this.subscriptions.push(()=>{
            c(), u(), v(), p(), g(), m(), l(e), l(i), l(n), l(s), l(a), l(d);
        });
        const f = h(t), b = r(()=>{
            const t = f.signal.value;
            t && ("start" === t.type ? this.toggleCursor(!0) : "move" === t.type && void 0 !== t.deltaX ? this.onMove(t.deltaX) : "end" === t.type && (this.toggleCursor(!1), this.drag && this.emit("update-end")));
        }, [
            f.signal
        ]);
        this.subscriptions.push(()=>{
            b(), f.cleanup();
        }), this.contentEditable && this.content && (this.contentClickListener = (t)=>this.onContentClick(t), this.contentBlurListener = ()=>this.onContentBlur(), this.content.addEventListener("click", this.contentClickListener), this.content.addEventListener("blur", this.contentBlurListener));
    }
    _onUpdate(t, e, i) {
        var n;
        if (!(null === (n = this.element) || void 0 === n ? void 0 : n.parentElement)) return;
        const { width: s } = this.element.parentElement.getBoundingClientRect(), r = t / s * this.totalDuration;
        let o = e && "start" !== e ? this.start : this.start + r, l = e && "end" !== e ? this.end : this.end + r;
        const h = void 0 !== i;
        h && this.updatingSide && this.updatingSide !== e && ("start" === this.updatingSide ? o = i : l = i), o = Math.max(0, o), l = Math.min(this.totalDuration, l);
        const a = l - o;
        this.updatingSide = e;
        const d = a >= this.minLength && a <= this.maxLength;
        o <= l && (d || h) && (this.start = o, this.end = l, this.renderPosition(), this.emit("update", e));
    }
    onMove(t) {
        this.drag && this._onUpdate(t);
    }
    onResize(t, e) {
        this.resize && (this.resizeStart || "start" !== e) && (this.resizeEnd || "end" !== e) && this._onUpdate(t, e);
    }
    onEndResizing(t) {
        this.resize && (this.emit("update-end", t), this.updatingSide = void 0);
    }
    onContentClick(t) {
        t.stopPropagation();
        t.target.focus(), this.emit("click", t);
    }
    onContentBlur() {
        this.emit("update-end");
    }
    _setTotalDuration(t) {
        this.totalDuration = t, this.renderPosition();
    }
    play(t) {
        this.emit("play", t && this.end !== this.start ? this.end : void 0);
    }
    getContent(t = !1) {
        var e;
        return t ? this.content || void 0 : this.element instanceof HTMLElement ? (null === (e = this.content) || void 0 === e ? void 0 : e.innerHTML) || void 0 : "";
    }
    setContent(t) {
        var e;
        if (this.element) if (this.content && this.contentEditable && (this.contentClickListener && this.content.removeEventListener("click", this.contentClickListener), this.contentBlurListener && this.content.removeEventListener("blur", this.contentBlurListener)), null === (e = this.content) || void 0 === e || e.remove(), t) {
            if ("string" == typeof t) {
                const e = this.start === this.end;
                this.content = n("div", {
                    style: {
                        padding: `0.2em ${e ? .2 : .4}em`,
                        display: "inline-block"
                    },
                    textContent: t
                });
            } else this.content = t;
            this.contentEditable && (this.content.contentEditable = "true", this.contentClickListener = (t)=>this.onContentClick(t), this.contentBlurListener = ()=>this.onContentBlur(), this.content.addEventListener("click", this.contentClickListener), this.content.addEventListener("blur", this.contentBlurListener)), this.content.setAttribute("part", "region-content"), this.element.appendChild(this.content), this.emit("content-changed");
        } else this.content = void 0;
    }
    setOptions(t) {
        var e, i;
        if (this.element) {
            if (t.color && (this.color = t.color, this.element.style.backgroundColor = this.color), void 0 !== t.drag && (this.drag = t.drag, this.element.style.cursor = this.drag ? "grab" : "default"), void 0 !== t.start || void 0 !== t.end) {
                const n = this.start === this.end;
                this.start = this.clampPosition(null !== (e = t.start) && void 0 !== e ? e : this.start), this.end = this.clampPosition(null !== (i = t.end) && void 0 !== i ? i : n ? this.start : this.end), this.renderPosition(), this.setPart();
            }
            if (t.content && this.setContent(t.content), t.id && (this.id = t.id, this.setPart()), void 0 !== t.resize && t.resize !== this.resize) {
                const e = this.start === this.end;
                this.resize = t.resize, this.resize && !e ? this.addResizeHandles(this.element) : this.removeResizeHandles(this.element);
            }
            void 0 !== t.resizeStart && (this.resizeStart = t.resizeStart), void 0 !== t.resizeEnd && (this.resizeEnd = t.resizeEnd);
        }
    }
    remove() {
        this.isRemoved = !0, this.emit("remove"), this.subscriptions.forEach((t)=>t()), this.subscriptions = [], this.content && this.contentEditable && (this.contentClickListener && (this.content.removeEventListener("click", this.contentClickListener), this.contentClickListener = void 0), this.contentBlurListener && (this.content.removeEventListener("blur", this.contentBlurListener), this.contentBlurListener = void 0)), this.element && (this.element.remove(), this.element = null), this.unAll();
    }
}
class d extends e {
    constructor(t){
        super(t), this.regions = [], this.regionsContainer = this.initRegionsContainer();
    }
    static create(t) {
        return new d(t);
    }
    onInit() {
        if (!this.wavesurfer) throw Error("WaveSurfer is not initialized");
        this.wavesurfer.getWrapper().appendChild(this.regionsContainer), this.subscriptions.push(this.wavesurfer.on("ready", (t)=>{
            this.regions.forEach((e)=>e._setTotalDuration(t));
        }));
        let t = [];
        this.subscriptions.push(this.wavesurfer.on("timeupdate", (e)=>{
            const i = this.regions.filter((t)=>t.start <= e && (t.end === t.start ? t.start + .05 : t.end) >= e);
            i.forEach((e)=>{
                t.includes(e) || this.emit("region-in", e);
            }), t.forEach((t)=>{
                i.includes(t) || this.emit("region-out", t);
            }), t = i;
        }));
    }
    initRegionsContainer() {
        return n("div", {
            part: "regions-container",
            style: {
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                zIndex: "5",
                pointerEvents: "none"
            }
        });
    }
    getRegions() {
        return this.regions;
    }
    avoidOverlapping(t) {
        t.content && setTimeout(()=>{
            const e = t.content, i = e.getBoundingClientRect(), n = this.regions.map((e)=>{
                if (e === t || !e.content) return 0;
                const n = e.content.getBoundingClientRect();
                return i.left < n.left + n.width && n.left < i.left + i.width ? n.height : 0;
            }).reduce((t, e)=>t + e, 0);
            e.style.marginTop = `${n}px`;
        }, 10);
    }
    adjustScroll(t) {
        var e, i;
        if (!t.element) return;
        const n = null === (i = null === (e = this.wavesurfer) || void 0 === e ? void 0 : e.getWrapper()) || void 0 === i ? void 0 : i.parentElement;
        if (!n) return;
        const { clientWidth: s, scrollWidth: r } = n;
        if (r <= s) return;
        const o = n.getBoundingClientRect(), l = t.element.getBoundingClientRect(), h = l.left - o.left, a = l.right - o.left;
        h < 0 ? n.scrollLeft += h : a > s && (n.scrollLeft += a - s);
    }
    virtualAppend(t, e, i) {
        const n = ()=>{
            if (!this.wavesurfer) return;
            const n = this.wavesurfer.getWidth(), s = this.wavesurfer.getScroll(), r = e.clientWidth, o = this.wavesurfer.getDuration(), l = Math.round(t.start / o * r), h = l + (Math.round((t.end - t.start) / o * r) || 1) > s && l < s + n;
            h && !i.parentElement ? e.appendChild(i) : !h && i.parentElement && i.remove();
        };
        setTimeout(()=>{
            if (!this.wavesurfer || !t.element) return;
            n();
            const e = this.wavesurfer.on("scroll", n), i = this.wavesurfer.on("zoom", n), s = this.wavesurfer.on("resize", n);
            this.subscriptions.push(e, i, s), t.once("remove", ()=>{
                e(), i(), s();
            });
        }, 0);
    }
    saveRegion(t) {
        if (!t.element) return;
        this.virtualAppend(t, this.regionsContainer, t.element), this.avoidOverlapping(t), this.regions.push(t);
        const e = [
            t.on("update", (e)=>{
                e || this.adjustScroll(t), this.emit("region-update", t, e);
            }),
            t.on("update-end", (e)=>{
                this.avoidOverlapping(t), this.emit("region-updated", t, e);
            }),
            t.on("play", (e)=>{
                var i;
                null === (i = this.wavesurfer) || void 0 === i || i.play(t.start, e);
            }),
            t.on("click", (e)=>{
                this.emit("region-clicked", t, e);
            }),
            t.on("dblclick", (e)=>{
                this.emit("region-double-clicked", t, e);
            }),
            t.on("content-changed", ()=>{
                this.emit("region-content-changed", t);
            }),
            t.once("remove", ()=>{
                e.forEach((t)=>t()), this.regions = this.regions.filter((e)=>e !== t), this.emit("region-removed", t);
            })
        ];
        this.subscriptions.push(...e), this.emit("region-created", t);
    }
    addRegion(t) {
        var e, i;
        if (!this.wavesurfer) throw Error("WaveSurfer is not initialized");
        const n = this.wavesurfer.getDuration(), s = null === (i = null === (e = this.wavesurfer) || void 0 === e ? void 0 : e.getDecodedData()) || void 0 === i ? void 0 : i.numberOfChannels, r = new a(t, n, s);
        return this.emit("region-initialized", r), n ? this.saveRegion(r) : this.subscriptions.push(this.wavesurfer.once("ready", (t)=>{
            r._setTotalDuration(t), this.saveRegion(r);
        })), r;
    }
    enableDragSelection(t, e = 3) {
        var i;
        const n = null === (i = this.wavesurfer) || void 0 === i ? void 0 : i.getWrapper();
        if (!(n && n instanceof HTMLElement)) return ()=>{};
        let s = null, o = 0, l = 0;
        const d = h(n, {
            threshold: e
        }), c = r(()=>{
            var e, i;
            const n = d.signal.value;
            if (n) if ("start" === n.type) {
                if (o = n.x, !this.wavesurfer) return;
                const r = this.wavesurfer.getDuration(), h = null === (i = null === (e = this.wavesurfer) || void 0 === e ? void 0 : e.getDecodedData()) || void 0 === i ? void 0 : i.numberOfChannels, { width: d } = this.wavesurfer.getWrapper().getBoundingClientRect();
                l = o / d * r;
                const c = n.x / d * r, u = (n.x + 5) / d * r;
                s = new a(Object.assign(Object.assign({}, t), {
                    start: c,
                    end: u
                }), r, h), this.emit("region-initialized", s), s.element && this.regionsContainer.appendChild(s.element);
            } else "move" === n.type && void 0 !== n.deltaX ? s && s._onUpdate(n.deltaX, n.x > o ? "end" : "start", l) : "end" === n.type && s && (this.saveRegion(s), s.updatingSide = void 0, s = null);
        }, [
            d.signal
        ]);
        return ()=>{
            c(), d.cleanup();
        };
    }
    clearRegions() {
        this.regions.slice().forEach((t)=>t.remove()), this.regions = [];
    }
    destroy() {
        this.clearRegions(), super.destroy(), this.regionsContainer.remove();
    }
}
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Play
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
            key: "10ikf1"
        }
    ]
];
const Play = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("play", __iconNode);
;
 //# sourceMappingURL=play.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Play",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Pause
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "rect",
        {
            x: "14",
            y: "3",
            width: "5",
            height: "18",
            rx: "1",
            key: "kaeet6"
        }
    ],
    [
        "rect",
        {
            x: "5",
            y: "3",
            width: "5",
            height: "18",
            rx: "1",
            key: "1wsw3u"
        }
    ]
];
const Pause = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("pause", __iconNode);
;
 //# sourceMappingURL=pause.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Pause",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/scissors.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Scissors
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "6",
            cy: "6",
            r: "3",
            key: "1lh9wr"
        }
    ],
    [
        "path",
        {
            d: "M8.12 8.12 12 12",
            key: "1alkpv"
        }
    ],
    [
        "path",
        {
            d: "M20 4 8.12 15.88",
            key: "xgtan2"
        }
    ],
    [
        "circle",
        {
            cx: "6",
            cy: "18",
            r: "3",
            key: "fqmcym"
        }
    ],
    [
        "path",
        {
            d: "M14.8 14.8 20 20",
            key: "ptml3r"
        }
    ]
];
const Scissors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("scissors", __iconNode);
;
 //# sourceMappingURL=scissors.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/scissors.js [app-client] (ecmascript) <export default as Scissors>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Scissors",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scissors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scissors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scissors.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/undo-2.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Undo2
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M9 14 4 9l5-5",
            key: "102s5s"
        }
    ],
    [
        "path",
        {
            d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",
            key: "f3b9sd"
        }
    ]
];
const Undo2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("undo-2", __iconNode);
;
 //# sourceMappingURL=undo-2.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/undo-2.js [app-client] (ecmascript) <export default as Undo2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Undo2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/undo-2.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>RotateCcw
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
            key: "1357e3"
        }
    ],
    [
        "path",
        {
            d: "M3 3v5h5",
            key: "1xhq8a"
        }
    ]
];
const RotateCcw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("rotate-ccw", __iconNode);
;
 //# sourceMappingURL=rotate-ccw.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RotateCcw",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_430e36ed._.js.map