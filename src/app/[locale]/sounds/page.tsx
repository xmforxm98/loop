import React from "react";
import { soundItems } from "@/lib/sounds-data";
import SoundList from "@/components/SoundList";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function SoundsPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'sounds' });

    const labels = {
        preview: t('table.preview'),
        name: t('table.name'),
        category: t('table.category'),
        duration: t('table.duration'),
        download: t('table.download'),
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-20">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                <SoundList items={soundItems} labels={labels} />
            </div>
        </div>
    );
}
