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

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-20 bg-slate-50/50 p-8 md:p-12 rounded-[40px] border border-slate-100/80">
                    <div className="flex-1 max-w-3xl">
                        <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[11px] font-black uppercase tracking-widest mb-6 border border-blue-100/50">
                            {pkg.category}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-8">
                            {pkg.title}
                        </h1>
                        <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">
                            {pkg.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                        <button className="flex-1 lg:flex-none px-10 py-5 bg-white text-slate-600 font-bold rounded-2xl hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center justify-center gap-3 border border-slate-200 shadow-sm active:scale-[0.98]">
                            <Share2 size={22} />
                            {t('share')}
                        </button>
                        <button className="flex-1 lg:flex-none px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/30 active:scale-[0.98]">
                            <Download size={22} />
                            {t('downloadAll')}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {pkg.assets.length > 0 ? pkg.assets.map((asset) => (
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
                                <button className="w-full py-2.5 bg-white text-slate-900 rounded-xl text-[11px] font-black uppercase tracking-tight flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-colors">
                                    <Download size={14} />
                                    {t('download')}
                                </button>
                            </div>
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
