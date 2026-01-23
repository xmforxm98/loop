import React from "react";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import { Calendar, User, ArrowLeft, Share2, Tag } from "lucide-react";
import { Link } from "@/i18n/routing";
import AdBanner from "@/components/AdBanner";
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

interface PageProps {
    params: Promise<{ slug: string; locale: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug, locale } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    const t = await getTranslations({ locale, namespace: 'blog' });

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-12 font-medium"
                >
                    <ArrowLeft size={18} /> {t('backToBlog')}
                </Link>

                <article className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Header Image */}
                    <div className="relative h-64 md:h-96 overflow-hidden">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-6 left-6 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-2">
                            <Tag size={14} /> {post.category}
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <header className="mb-12">
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-gray-200">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                                        {post.author[0]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{post.author}</div>
                                        <div className="text-xs text-gray-500 flex items-center gap-1">
                                            <Calendar size={12} /> {new Date(post.date).toLocaleDateString(locale === 'en' ? 'en-US' : locale)}
                                        </div>
                                    </div>
                                </div>

                                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
                                    <Share2 size={18} /> {t('sharePost')}
                                </button>
                            </div>
                        </header>

                        {/* Ad Placeholder inside article */}
                        <div className="my-12">
                            <AdBanner dataAdSlot="XXXXXXXXXX" />
                        </div>

                        <div
                            className="prose prose-lg max-w-none 
                prose-headings:font-bold prose-headings:text-gray-900 
                prose-p:text-gray-700 prose-p:leading-relaxed 
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900
                prose-ol:text-gray-700 prose-ul:text-gray-700
                prose-li:text-gray-700"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Ad Placeholder bottom */}
                        <div className="mt-20">
                            <AdBanner dataAdSlot="XXXXXXXXXX" />
                        </div>

                        <footer className="mt-20 pt-12 border-t border-gray-200">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-10 rounded-2xl text-center text-white">
                                <h3 className="text-2xl font-bold mb-4">{t('enjoyedArticle')}</h3>
                                <p className="text-white/90 mb-8">
                                    {t('joinThousands')}
                                </p>
                                <Link href="/#editor" className="inline-block bg-white text-blue-600 px-12 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
                                    {t('tryEditor')}
                                </Link>
                            </div>
                        </footer>
                    </div>
                </article>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const paths = [];
    for (const locale of routing.locales) {
        for (const post of blogPosts) {
            paths.push({ locale, slug: post.slug });
        }
    }
    return paths;
}
