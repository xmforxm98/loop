import React from "react";
import { Shield, Zap, Lock, Globe, Cpu, Heart } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="container py-20 animate-fade-in">
            {/* Hero */}
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 outfit">
                    About <span className="gradient-text">Loop</span>
                </h1>
                <p className="text-xl text-secondary">
                    We're on a mission to bring professional-grade audio editing tools to everyone,
                    directly in the browser, with 100% privacy and zero cost.
                </p>
            </div>

            {/* Philosophy Area */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
                <div className="glass p-10 rounded-[2.5rem] border-primary/20">
                    <h2 className="text-3xl font-bold mb-6">Our Philosophy</h2>
                    <p className="text-secondary leading-relaxed mb-6">
                        Loop was born out of a simple frustration: Why does editing a simple audio loop or merging two tracks require either a massive software installation or uploading private files to a mysterious server?
                    </p>
                    <p className="text-secondary leading-relaxed">
                        We believe that the best creative tools are the ones that are always available, lightning fast, and respect your data. By leveraging the latest in WebAssembly technology, we've moved the "engine" into your browser, so your files never leave your computer.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="glass p-6 rounded-3xl text-center flex flex-col items-center justify-center border-none bg-primary/5">
                        <Shield className="text-primary mb-3" size={32} />
                        <span className="font-bold">100% Private</span>
                    </div>
                    <div className="glass p-6 rounded-3xl text-center flex flex-col items-center justify-center border-none bg-primary/5">
                        <Zap className="text-primary mb-3" size={32} />
                        <span className="font-bold">Instant Speed</span>
                    </div>
                    <div className="glass p-6 rounded-3xl text-center flex flex-col items-center justify-center border-none bg-primary/5">
                        <Lock className="text-primary mb-3" size={32} />
                        <span className="font-bold">Zero Uploads</span>
                    </div>
                    <div className="glass p-6 rounded-3xl text-center flex flex-col items-center justify-center border-none bg-primary/5">
                        <Globe className="text-primary mb-3" size={32} />
                        <span className="font-bold">Fully Browser-Based</span>
                    </div>
                </div>
            </div>

            {/* Technical Background */}
            <section className="mb-32">
                <h2 className="text-4xl font-extrabold text-center mb-12 outfit">How it Works</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-3xl border border-border hover:border-primary/50 transition-colors">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                            <Cpu size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-4">WebAssembly Processing</h3>
                        <p className="text-secondary text-sm leading-relaxed">
                            We use a specialized build of FFmpeg compiled to WebAssembly. This allows your CPU to process audio data at high speeds without needing any server-side computing.
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl border border-border hover:border-primary/50 transition-colors">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                            <Lock size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-4">In-Memory Storage</h3>
                        <p className="text-secondary text-sm leading-relaxed">
                            When you "upload" a file, it is read into your browser's virtual memory (RAM). It exists there only as long as the tab is open. We never see your data.
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl border border-border hover:border-primary/50 transition-colors">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                            <Heart size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Open & Free</h3>
                        <p className="text-secondary text-sm leading-relaxed">
                            The tools are free to use. We rely on community support and non-intrusive ads to keep the lights on, ensuring that everyone has access to quality audio tools.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact/CTA */}
            <div className="text-center bg-primary rounded-[3rem] p-16 text-white shadow-2xl shadow-primary/20">
                <h2 className="text-4xl font-bold mb-6">Want to help us grow?</h2>
                <p className="text-white/80 max-w-xl mx-auto mb-10 text-lg">
                    We're constantly adding new tools and improving our engine. If you have suggestions or want to report a bug, we'd love to hear from you.
                </p>
                <button className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all">
                    Contact the Team
                </button>
            </div>
        </div>
    );
}
