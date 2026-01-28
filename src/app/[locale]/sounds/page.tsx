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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight">
                        {t('title')}
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                <SoundList items={soundItems} labels={labels} />
            </div>
        </div>
    );
}
