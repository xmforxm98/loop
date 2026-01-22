"use client";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { useRef, useState, useCallback } from "react";

export const useFFmpeg = () => {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ffmpeg, setFfmpeg] = useState<FFmpeg | null>(null);
    const loadPromiseRef = useRef<Promise<boolean> | null>(null);
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);

    const load = useCallback(async () => {
        if (loaded && ffmpeg) return true;
        if (loadPromiseRef.current) return loadPromiseRef.current;

        const task = (async () => {
            setLoading(true);
            const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";

            const instance = new FFmpeg();
            setFfmpeg(instance);

            instance.on("log", ({ message }) => {
                setLogs((prev) => [...prev.slice(-10), message]);
                console.log(message);
            });

            instance.on("progress", ({ progress }) => {
                setProgress(Math.round(progress * 100));
            });

            try {
                await instance.load({
                    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
                    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
                });
                setLoaded(true);
                return true;
            } catch (error) {
                console.error("FFmpeg load error:", error);
                return false;
            } finally {
                setLoading(false);
                loadPromiseRef.current = null;
            }
        })();

        loadPromiseRef.current = task;
        return task;
    }, [loaded, ffmpeg]);

    return {
        ffmpeg: ffmpeg as FFmpeg,
        loaded,
        loading,
        progress,
        logs,
        load,
        setProgress
    };
};
