import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Terminal, Package, Sparkles, TrendingUp, Code, Copy, Check, FlaskConical } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { Link } from '@/i18n/routing';

export default async function DevelopersPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('developers');

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    {t('title')}
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    {t('subtitle')}
                </p>
            </div>

            {/* Top Ad Unit */}
            <AdBanner dataAdSlot="6207739501" />

            <div className="grid md:grid-cols-2 gap-12 mb-20">
                {/* NPM Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <Package size={24} />
                        </div>
                        <h2 className="text-2xl font-bold">{t('npmSection.title')}</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        {t('npmSection.desc')}
                    </p>

                    {/* Tarot Card Package */}
                    <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold text-gray-900">{t('tarotPackage.title')}</h3>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase tracking-wider">v1.0.0</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-6">
                            {t('tarotPackage.desc')}
                        </p>
                        <div className="flex items-center gap-3 bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm relative group">
                            <Terminal size={14} className="text-gray-400" />
                            <span>{t('tarotPackage.install')}</span>
                            <button className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded">
                                <Copy size={16} />
                            </button>
                        </div>
                    </div>

                    {/* DIY Lab Teaser */}
                    <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-600 rounded-lg text-white">
                                <FlaskConical size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">{t('diyTeaser.title')}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-6">
                            {t('diyTeaser.desc')}
                        </p>
                        <Link
                            href="/developers/diy-lab"
                            className="inline-flex items-center justify-center w-full py-3 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        >
                            {t('diyTeaser.link')}
                        </Link>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                            <TrendingUp size={24} />
                        </div>
                        <h2 className="text-2xl font-bold">{t('benefit.title')}</h2>
                    </div>
                    <div className="grid gap-4">
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <Check className="text-green-500 shrink-0" size={20} />
                                <span className="font-medium text-gray-700">{t(`benefit.items.${i}`)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Monetization Explanation */}
            <div className="bg-gradient-to-br from-gray-900 to-blue-900 text-white p-12 rounded-3xl relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                        <Sparkles className="text-yellow-400" />
                        {t('monetization.title')}
                    </h2>
                    <p className="text-blue-100 text-lg opacity-90 leading-relaxed">
                        {t('monetization.desc')}
                    </p>
                </div>
                <Code className="absolute -bottom-10 -right-10 text-white/5 w-64 h-64 rotate-12" />
            </div>

            {/* Bottom Ad Unit */}
            <AdBanner dataAdSlot="6207739501" />
        </div>
    );
}
