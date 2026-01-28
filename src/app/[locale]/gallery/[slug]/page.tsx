import React from "react";
import { imagePackages } from "@/lib/gallery-data";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from "next/navigation";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { Link } from "@/i18n/routing";

export function generateStaticParams() {
    const params: { locale: string; slug: string }[] = [];
    routing.locales.forEach((locale) => {
        imagePackages.forEach((pkg) => {
            params.push({ locale, slug: pkg.slug });
        });
    });
    return params;
}

export default async function PackageDetailPage({
    params
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'gallery' });

    const pkg = imagePackages.find((p) => p.slug === slug);
    if (!pkg) notFound();

    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/gallery"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                    {t('backToGallery')}
                </Link>

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
                    <div className="max-w-3xl">
                        <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-blue-100">
                            {pkg.category}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
                            {pkg.title}
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            {pkg.description}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex-1 lg:flex-none px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                            <Share2 size={20} />
                            {t('share')}
                        </button>
                        <button className="flex-1 lg:flex-none px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20">
                            <Download size={20} />
                            {t('downloadAll')}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {pkg.assets.length > 0 ? pkg.assets.map((asset) => (
                        <div key={asset.id} className="group relative aspect-[2/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 transition-all hover:shadow-2xl">
                            <img
                                src={asset.url}
                                alt={asset.title}
                                className="w-full h-full object-contain bg-white transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-white text-[10px] font-bold truncate">
                                    {asset.title}
                                </p>
                            </div>
                            <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-xl text-slate-900 opacity-0 group-hover:opacity-100 transition-all hover:bg-white scale-90 group-hover:scale-100 shadow-sm">
                                <Download size={18} />
                            </button>
                        </div>
                    )) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-slate-400 font-medium">Coming soon...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
