import React from "react";
import { Shield, Zap, Lock, Globe, Cpu, Heart } from "lucide-react";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function AboutPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'about' });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-gray-600">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Philosophy Area */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
                    <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border border-blue-100 shadow-lg">
                        <h2 className="text-3xl font-bold mb-6">{t('philosophy.title')}</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {t('philosophy.p1')}
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            {t('philosophy.p2')}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-6 rounded-2xl text-center flex flex-col items-center justify-center">
                            <Shield className="text-blue-600 mb-3" size={32} />
                            <span className="font-bold text-gray-900">{t('features.private')}</span>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-2xl text-center flex flex-col items-center justify-center">
                            <Zap className="text-blue-600 mb-3" size={32} />
                            <span className="font-bold text-gray-900">{t('features.speed')}</span>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-2xl text-center flex flex-col items-center justify-center">
                            <Lock className="text-blue-600 mb-3" size={32} />
                            <span className="font-bold text-gray-900">{t('features.noUpload')}</span>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-2xl text-center flex flex-col items-center justify-center">
                            <Globe className="text-blue-600 mb-3" size={32} />
                            <span className="font-bold text-gray-900">{t('features.browser')}</span>
                        </div>
                    </div>
                </div>

                {/* Technical Background */}
                <section className="mb-32">
                    <h2 className="text-4xl font-extrabold text-center mb-12">{t('howItWorks')}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                <Cpu size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{t('tech.wasm.title')}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {t('tech.wasm.desc')}
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                <Lock size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{t('tech.memory.title')}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {t('tech.memory.desc')}
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                <Heart size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{t('tech.free.title')}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {t('tech.free.desc')}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact/CTA */}
                <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-16 text-white shadow-2xl">
                    <h2 className="text-4xl font-bold mb-6">{t('cta.title')}</h2>
                    <p className="text-white/90 max-w-xl mx-auto mb-10 text-lg">
                        {t('cta.desc')}
                    </p>
                    <button className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg">
                        {t('cta.button')}
                    </button>
                </div>
            </div>
        </div>
    );
}
