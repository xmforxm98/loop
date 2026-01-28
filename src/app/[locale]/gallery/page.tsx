import React from "react";
import { imagePackages } from "@/lib/gallery-data";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Download, Image as ImageIcon, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/routing";

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
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl tracking-tight mb-4">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {imagePackages.map((pkg) => (
                        <div key={pkg.slug} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="aspect-[4/3] overflow-hidden relative">
                                <img
                                    src={pkg.thumbnail}
                                    alt={pkg.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-900 border border-white/20">
                                    {pkg.category}
                                </div>
                                <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1.5">
                                    <ImageIcon size={12} />
                                    {pkg.count} {t('items')}
                                </div>
                            </div>

                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-slate-900 mb-3 leading-tight">
                                    {pkg.title}
                                </h3>
                                <p className="text-slate-600 text-sm mb-8 line-clamp-2 leading-relaxed opacity-80">
                                    {pkg.description}
                                </p>

                                <div className="flex items-center gap-4">
                                    <button className="flex-1 bg-blue-600 text-white font-bold py-3.5 rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-[0.98]">
                                        <Download size={18} />
                                        {t('download')}
                                    </button>
                                    <Link
                                        href={`/gallery/${pkg.slug}`}
                                        className="flex-1 px-4 py-3.5 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 hover:text-slate-900 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                                    >
                                        <ExternalLink size={18} />
                                        {t('viewCollection')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
