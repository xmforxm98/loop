"use client";

import React from "react";
import { Download } from "lucide-react";

interface MainGalleryDownloadButtonProps {
    thumbnailUrl: string;
    title: string;
}

export default function MainGalleryDownloadButton({ thumbnailUrl, title }: MainGalleryDownloadButtonProps) {
    const handleDownload = async () => {
        try {
            const response = await fetch(thumbnailUrl);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `${title}-thumbnail.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Download failed:", error);
            window.open(thumbnailUrl, "_blank");
        }
    };

    return (
        <button
            onClick={handleDownload}
            className="px-6 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 hover:text-slate-900 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
        >
            <Download size={20} />
        </button>
    );
}
