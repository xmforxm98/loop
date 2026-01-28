"use client";

import React from "react";
import { Download } from "lucide-react";
import { ImageAsset } from "@/lib/gallery-data";

interface GalleryAssetCardProps {
    asset: ImageAsset;
    downloadLabel: string;
}

export default function GalleryAssetCard({ asset, downloadLabel }: GalleryAssetCardProps) {
    const handleDownload = async () => {
        try {
            const response = await fetch(asset.url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `${asset.title || 'image'}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Download failed:", error);
            window.open(asset.url, "_blank");
        }
    };

    return (
        <div key={asset.id} className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 transition-all hover:shadow-2xl hover:-translate-y-1">
            <img
                src={asset.url}
                alt={asset.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <p className="text-white text-xs font-black truncate mb-3">
                    {asset.title}
                </p>
                <button
                    onClick={handleDownload}
                    className="w-full py-2.5 bg-white text-slate-900 rounded-xl text-[11px] font-black uppercase tracking-tight flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-colors"
                >
                    <Download size={14} />
                    {downloadLabel}
                </button>
            </div>
        </div>
    );
}
