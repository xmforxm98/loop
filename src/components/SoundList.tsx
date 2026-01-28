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
        <div className="overflow-hidden bg-white shadow-sm rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">
                            {labels.preview}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {labels.name}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                            {labels.category}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {labels.duration}
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {labels.download}
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {items.map((item) => (
                        <tr key={item.id} className={`hover:bg-blue-50/50 transition-colors ${playingId === item.id ? "bg-blue-50" : ""}`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => handlePlay(item)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${playingId === item.id
                                            ? "bg-blue-600 text-white shadow-md scale-110"
                                            : "bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600"
                                        }`}
                                >
                                    {playingId === item.id ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex flex-col">
                                    <span className={`text-sm font-medium ${playingId === item.id ? "text-blue-700" : "text-gray-900"}`}>
                                        {item.title}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {item.category}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                {item.duration}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a
                                    href={item.url}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-blue-600 transition-colors inline-block p-2 rounded-lg hover:bg-blue-50"
                                >
                                    <Download size={18} />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
