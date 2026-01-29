import React from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import DiyLabClient from '@/components/DiyLabClient';

export default async function DiyLabPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('developers.diyLab');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header section with Nano Banana theme */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <h1 className="text-4xl font-black tracking-tight text-gray-900">
                        {t('title')}
                    </h1>
                    <p className="mt-2 text-lg text-gray-500">
                        {t('subtitle')}
                    </p>
                </div>
            </div>

            <DiyLabClient />
        </div>
    );
}
