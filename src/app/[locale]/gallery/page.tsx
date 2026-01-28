import React from "react";
import { imagePackages } from "@/lib/gallery-data";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Download, Image as ImageIcon, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/routing";
import MainGalleryDownloadButton from "@/components/MainGalleryDownloadButton";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function GalleryPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'gallery' });

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {imagePackages.map((pkg) => (
                        <div key={pkg.slug} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="aspect-[4/3] overflow-hidden relative">
                                <img
                                    src={pkg.thumbnail}
                                    alt={pkg.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                                    {pkg.category}
                                </div>
                                <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1.5">
                                    <ImageIcon size={12} />
                                    {pkg.count} {t('items')}
                                </div>
                            </div>

                            <div className="p-10">
                                <h3 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
                                    {pkg.title}
                                </h3>
                                <p className="text-slate-500 text-base mb-10 line-clamp-2 leading-relaxed">
                                    {pkg.description}
                                </p>

                                <div className="flex items-center gap-4">
                                    <Link
                                        href={`/gallery/${pkg.slug}`}
                                        className="flex-1 px-6 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 active:scale-[0.98]"
                                    >
                                        <ExternalLink size={20} />
                                        {t('viewCollection')}
                                    </Link>
                                    <MainGalleryDownloadButton
                                        thumbnailUrl={pkg.thumbnail}
                                        title={pkg.title}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
