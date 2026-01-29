"use client";
import React from "react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { Music, Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from 'next-intl';

interface NavbarProps {
    locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = React.useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations('nav');

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'ko', name: '한국어' },
        { code: 'zh', name: '中文' },
        { code: 'ja', name: '日本語' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' },
        { code: 'it', name: 'Italiano' },
        { code: 'es', name: 'Español' },
        { code: 'pt', name: 'Português' },
        { code: 'ar', name: 'العربية' },
    ];

    const handleLanguageChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
        setIsLangMenuOpen(false);
    };

    const navLinks = [
        { name: t('about'), href: "/about" },
        { name: t('sounds'), href: "/sounds" },
        { name: t('gallery'), href: "/gallery" },
        { name: t('developers'), href: "/developers" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group shrink-0">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                            <Music size={18} />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Edit-All</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8 ml-auto desktop-only">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-blue-600 ${pathname === link.href ? "text-blue-600" : "text-gray-600"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors border border-gray-200 rounded-lg px-2 py-1"
                            >
                                <Globe size={16} />
                                <span className="text-xs uppercase font-bold">{locale}</span>
                            </button>

                            {isLangMenuOpen && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 max-h-80 overflow-y-auto z-50">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => handleLanguageChange(lang.code)}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${locale === lang.code ? "text-blue-600 font-bold" : "text-gray-600"
                                                }`}
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link
                            href="/#editor"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                        >
                            {t('tryEditor')}
                        </Link>
                    </div>

                    {/* Mobile Menu Button - Using mobile-only class to force hide on desktop */}
                    <div className="flex items-center gap-4 md:hidden ml-auto mobile-only">
                        <button
                            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                            className="text-gray-600 border border-gray-200 rounded-lg px-2 py-1 flex items-center gap-1"
                        >
                            <Globe size={16} />
                            <span className="uppercase font-bold text-xs">{locale}</span>
                        </button>

                        <button
                            className="text-gray-600 hover:text-gray-900 p-1"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {(isOpen || (isLangMenuOpen && window.innerWidth < 768)) && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-200 overflow-hidden mobile-only"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {/* If Lang menu is open in mobile, show langs, else show nav */}
                            {isLangMenuOpen ? (
                                <div className="grid grid-cols-2 gap-2">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                handleLanguageChange(lang.code);
                                            }}
                                            className={`text-left text-sm py-2 px-3 rounded-lg ${locale === lang.code ? "bg-blue-50 text-blue-600 font-bold" : "text-gray-600"
                                                }`}
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setIsLangMenuOpen(false)}
                                        className="col-span-2 text-center text-sm text-gray-500 mt-2 py-2"
                                    >
                                        Close Language Menu
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`block text-base font-medium ${pathname === link.href ? "text-blue-600" : "text-gray-600"
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                    <Link
                                        href="/#editor"
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full bg-blue-600 text-white px-5 py-3 rounded-lg text-center font-semibold hover:bg-blue-700 transition-colors"
                                    >
                                        {t('tryEditor')}
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
