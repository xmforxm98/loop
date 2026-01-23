import React from "react";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import { Calendar, User, ArrowLeft, Share2, Tag } from "lucide-react";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="container py-12 animate-fade-in">
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-12 font-medium"
            >
                <ArrowLeft size={18} /> Back to Blog
            </Link>

            <article className="max-w-4xl mx-auto">
                <header className="mb-12">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
                        <Tag size={14} /> {post.category}
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight outfit">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-border">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {post.author[0]}
                            </div>
                            <div>
                                <div className="font-bold">{post.author}</div>
                                <div className="text-xs text-secondary flex items-center gap-1">
                                    <Calendar size={12} /> {new Date(post.date).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
                                </div>
                            </div>
                        </div>

                        <button className="flex items-center gap-2 text-secondary hover:text-primary transition-colors text-sm font-medium">
                            <Share2 size={18} /> Share Post
                        </button>
                    </div>
                </header>

                <div className="rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-auto object-cover max-h-[500px]"
                    />
                </div>

                {/* Ad Placeholder inside article */}
                <div className="my-12">
                    <AdBanner dataAdSlot="XXXXXXXXXX" />
                </div>

                <div
                    className="prose prose-invert prose-lg max-w-none prose-p:text-secondary prose-p:leading-relaxed prose-headings:font-bold prose-headings:text-white prose-a:text-primary prose-strong:text-white"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Ad Placeholder bottom */}
                <div className="mt-20">
                    <AdBanner dataAdSlot="XXXXXXXXXX" />
                </div>

                <footer className="mt-20 pt-12 border-t border-border">
                    <div className="glass p-10 rounded-[2.5rem] text-center">
                        <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
                        <p className="text-secondary mb-8">
                            Join thousands of audio enthusiasts using Loop to create perfect sounds every day.
                        </p>
                        <Link href="/" className="btn btn-primary px-12 py-4">
                            Try the Audio Editor
                        </Link>
                    </div>
                </footer>
            </article>
        </div>
    );
}

// Optional: Generate static paths for better performance
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}
