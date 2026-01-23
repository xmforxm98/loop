import React from "react";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function BlogListPage() {
    return (
        <div className="container py-20 animate-fade-in">
            <div className="mb-16 text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 outfit">
                    The <span className="gradient-text">Loop Blog</span>
                </h1>
                <p className="text-xl text-secondary max-w-2xl mx-auto">
                    Insights, tutorials, and deep dives into the world of browser-based audio production.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group glass border-border/50 hover:border-primary/30 rounded-3xl overflow-hidden transition-all hover:translate-y-[-4px] flex flex-col"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4 bg-primary/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
                                {post.category}
                            </div>
                        </div>

                        <div className="p-8 flex-1 flex flex-col">
                            <div className="flex items-center gap-4 text-xs text-secondary mb-4">
                                <span className="flex items-center gap-1">
                                    <Calendar size={12} /> {new Date(post.date).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                    <User size={12} /> {post.author}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                                {post.title}
                            </h3>

                            <p className="text-secondary text-sm mb-6 line-clamp-3 leading-relaxed">
                                {post.excerpt}
                            </p>

                            <div className="mt-auto flex items-center gap-2 text-primary font-bold text-sm">
                                Read More <ArrowRight size={16} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
