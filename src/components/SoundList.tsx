"use client";

import React, { useState, useRef, useEffect } from "react";
import { SoundItem } from "@/lib/sounds-data";
import { Play, Pause, Download, Volume2 } from "lucide-react";

interface SoundListProps {
    items: SoundItem[];
    labels: {
        preview: string;
        name: string;
        category: string;
        duration: string;
        download: string;
    };
}

export default function SoundList({ items, labels }: SoundListProps) {
    const [playingId, setPlayingId] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handlePlay = (item: SoundItem) => {
        if (playingId === item.id) {
            // Stop
            audioRef.current?.pause();
            setPlayingId(null);
        } else {
            // Play new
            if (audioRef.current) {
                audioRef.current.src = item.url;
                audioRef.current.play();
            }
            setPlayingId(item.id);
        }
    };

    // Initialize audio object once
    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.onended = () => setPlayingId(null);
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    return (
        <div className="overflow-hidden bg-white/50 backdrop-blur-xl rounded-[32px] border border-slate-200 shadow-2xl shadow-slate-200/50">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b border-slate-100">
                            <th scope="col" className="px-8 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] w-24">
                                {labels.preview}
                            </th>
                            <th scope="col" className="px-8 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                {labels.name}
                            </th>
                            <th scope="col" className="px-8 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] hidden sm:table-cell">
                                {labels.category}
                            </th>
                            <th scope="col" className="px-8 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                {labels.duration}
                            </th>
                            <th scope="col" className="px-8 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                {labels.download}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {items.map((item) => (
                            <tr key={item.id} className={`group transition-all duration-300 ${playingId === item.id ? "bg-blue-50/50" : "hover:bg-slate-50/80"}`}>
                                <td className="px-8 py-6 whitespace-nowrap">
                                    <button
                                        onClick={() => handlePlay(item)}
                                        className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-500 ${playingId === item.id
                                            ? "bg-blue-600 text-white shadow-xl shadow-blue-600/30 scale-105"
                                            : "bg-slate-100 text-slate-600 hover:bg-white hover:text-blue-600 hover:shadow-lg hover:shadow-slate-200 hover:-translate-y-0.5"
                                            }`}
                                    >
                                        {playingId === item.id ? <Pause size={18} fill="currentColor" /> : <Play size={18} className="translate-x-0.5" fill="currentColor" />}
                                    </button>
                                </td>
                                <td className="px-8 py-6 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${playingId === item.id ? "bg-blue-600 scale-150 animate-pulse" : "bg-slate-200 group-hover:bg-slate-400"}`} />
                                        <span className={`text-base font-bold tracking-tight transition-colors duration-300 ${playingId === item.id ? "text-blue-700" : "text-slate-900 group-hover:text-blue-600"}`}>
                                            {item.title}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 whitespace-nowrap hidden sm:table-cell">
                                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                        {item.category}
                                    </span>
                                </td>
                                <td className="px-8 py-6 whitespace-nowrap text-sm text-slate-400 font-bold font-mono group-hover:text-slate-600 transition-colors">
                                    {item.duration}
                                </td>
                                <td className="px-8 py-6 whitespace-nowrap text-right">
                                    <a
                                        href={item.url}
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-10 h-10 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md rounded-xl transition-all"
                                    >
                                        <Download size={20} />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
