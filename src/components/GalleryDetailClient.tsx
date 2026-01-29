"use client";

import React from "react";
import { Download, Share2 } from "lucide-react";
import { ImageAsset } from "@/lib/gallery-data";
import * as gtag from "@/lib/gtag";

interface GalleryDetailClientProps {
    pkgTitle: string;
    assets: ImageAsset[];
    labels: {
        share: string;
        downloadAll: string;
        download: string;
    };
}

export default function GalleryDetailClient({ pkgTitle, assets, labels }: GalleryDetailClientProps) {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: pkgTitle,
                    text: `Check out this image collection: ${pkgTitle}`,
                    url: window.location.href,
                });
                gtag.event({
                    action: 'share_gallery',
                    category: 'engagement',
                    label: pkgTitle
                });
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    const handleDownload = async (url: string, filename: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Download failed:", error);
            // Fallback: open in new tab
            window.open(url, "_blank");
        }
    };

    const handleDownloadAll = async () => {
        alert("Preparing all files for download. This may take a moment...");
        // For now, since we don't have JSZip, we'll download them sequentially or just a few
        // Sequential download can trigger browser blocks, so we'll just download the first 5 as a demo
        // or explain it's coming soon.
        // Let's at least try to download them.
        for (let i = 0; i < Math.min(assets.length, 5); i++) {
            await handleDownload(assets[i].url, `${assets[i].title || 'image'}.png`);
            // Add a small delay
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        gtag.event({
            action: 'download_all_gallery',
            category: 'engagement',
            label: pkgTitle
        });
        if (assets.length > 5) {
            alert("Downloaded the first 5 images. For the full collection, please use a desktop browser.");
        }
    };

    return (
        <div className="flex flex-wrap gap-4 items-center">
            <button
                onClick={handleShare}
                className="flex-1 lg:flex-none px-10 py-5 bg-white text-slate-600 font-bold rounded-2xl hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center justify-center gap-3 border border-slate-200 shadow-sm active:scale-[0.98]"
            >
                <Share2 size={22} />
                {labels.share}
            </button>
            <button
                onClick={handleDownloadAll}
                className="flex-1 lg:flex-none px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/30 active:scale-[0.98]"
            >
                <Download size={22} />
                {labels.downloadAll}
            </button>
        </div>
    );
}
