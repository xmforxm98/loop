"use client";
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Sparkles, Layers, Wand2, Download, Package } from 'lucide-react';
import Image from 'next/image';
import * as gtag from '@/lib/gtag';

const majorArcana = [
    'foolcrown', 'magician', 'highpriestess', 'theempress', 'emperor',
    'hierophant', 'lover', 'chariot', 'strength', 'hermit',
    'wheeloffortune', 'justice', 'hangedman', 'death', 'temperance',
    'devil', 'tower', 'star', 'moon', 'sun', 'judgment', 'world'
];

const styles = [
    { id: 1, name: 'Noble Classic', color: 'bg-blue-500' },
    { id: 2, name: 'Deep Mystic', color: 'bg-purple-600' },
    { id: 3, name: 'Golden Luxury', color: 'bg-yellow-500' },
    { id: 4, name: 'Artistic Modern', color: 'bg-indigo-500' }
];

const FIREBASE_BASE = 'https://firebasestorage.googleapis.com/v0/b/innerfive.firebasestorage.app/o/';
const ALT_MEDIA = '?alt=media';
const firebaseItem = (path: string) => `${FIREBASE_BASE}${encodeURIComponent(path)}${ALT_MEDIA}`;

export default function DiyLabClient() {
    const t = useTranslations('developers.diyLab');
    const [selectedCard, setSelectedCard] = useState('foolcrown');
    const [selectedStyle, setSelectedStyle] = useState(1);

    const currentUrl = firebaseItem(`tarot_cards/${selectedCard === 'hermit' ? `Hermit${selectedStyle}.png` : `${selectedCard}${selectedStyle}.png`}`);

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Control Panel */}
                <div className="flex-1 space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <Package className="text-blue-500" />
                            {t('selectCard')}
                        </h2>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {majorArcana.map(card => (
                                <button
                                    key={card}
                                    onClick={() => {
                                        setSelectedCard(card);
                                        gtag.event({ action: 'diy_select_card', category: 'diy_lab', label: card });
                                    }}
                                    className={`px-3 py-2 text-xs rounded-lg border transition-all ${selectedCard === card
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                                        }`}
                                >
                                    {card.charAt(0).toUpperCase() + card.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <Layers className="text-purple-500" />
                            {t('selectStyle')}
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {styles.map(style => (
                                <button
                                    key={style.id}
                                    onClick={() => {
                                        setSelectedStyle(style.id);
                                        gtag.event({ action: 'diy_select_style', category: 'diy_lab', label: style.name });
                                    }}
                                    className={`px-6 py-3 rounded-xl border-2 transition-all flex items-center gap-3 ${selectedStyle === style.id
                                        ? 'border-purple-600 bg-purple-50 text-purple-900'
                                        : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-purple-200'
                                        }`}
                                >
                                    <div className={`w-4 h-4 rounded-full ${style.color}`} />
                                    <span className="font-bold">{style.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-gray-900 to-indigo-900 rounded-2xl text-white">
                        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                            <Sparkles className="text-yellow-400" />
                            Nano Banana Engine
                        </h3>
                        <p className="text-indigo-100 text-sm opacity-80 mb-4">
                            Our proprietary DIY engine allows developers to programmatically compose spiritual assets.
                        </p>
                        <div className="bg-black/30 p-4 rounded-lg font-mono text-xs">
                            <span className="text-blue-400">const</span> card = <span className="text-yellow-400">tarotBuilder</span>.<span className="text-green-400">getCard</span>(<span className="text-orange-400">'{selectedCard}'</span>, <span className="text-purple-400">{selectedStyle}</span>);
                        </div>
                    </div>
                </div>

                {/* Preview Panel */}
                <div className="w-full md:w-[400px] flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 self-start">
                        <Wand2 className="text-yellow-500" />
                        {t('preview')}
                    </h2>

                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative bg-white p-4 rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden">
                            <Image
                                src={currentUrl}
                                alt="Tarot Preview"
                                width={350}
                                height={600}
                                className="rounded-2xl shadow-inner animate-in fade-in zoom-in duration-500"
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            // Link to current image for download
                            const a = document.createElement('a');
                            a.href = currentUrl;
                            a.download = `tarot-${selectedCard}-${selectedStyle}.png`;
                            a.click();
                            gtag.event({
                                action: 'diy_download',
                                category: 'diy_lab',
                                label: `${selectedCard}-${selectedStyle}`
                            });
                        }}
                        className="mt-8 w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl active:scale-95"
                    >
                        <Download size={20} />
                        Download Customized Card
                    </button>
                    <p className="mt-4 text-gray-400 text-sm">Powered by username231 & Edit-All</p>
                </div>
            </div>
        </div>
    );
}
