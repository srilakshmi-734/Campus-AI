import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Globe } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl py-12 px-6 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">

                {/* Brand Logo Section */}
                <div className="flex items-center gap-4 group cursor-default">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(188,240,0,0.2)] bg-lemon-green group-hover:scale-110 transition-transform">
                        <Brain size={24} className="text-black" />
                    </div>
                    <div>
                        <span className="font-black text-xl tracking-tighter text-white uppercase italic block">
                            Campus<span className="text-lemon-green">AI</span> Hub
                        </span>
                        <span className="text-[9px] font-black text-engineering-white/30 uppercase tracking-[0.3em]">Institutional Node Alpha</span>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="text-[10px] font-black tracking-[0.3em] text-engineering-white/40 uppercase flex flex-col items-center md:items-start gap-1">
                    <div className="flex items-center gap-2">
                        <span>© 2026</span>
                        <span className="opacity-30">•</span>
                        <span>Tamil Nadu Engineering Community</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe size={10} className="text-lemon-green" />
                        <span>Centralized Governance Protocol</span>
                    </div>
                </div>

                {/* Social Links Section */}
                <div className="flex items-center gap-8">
                    {['X-Corp', 'LinkedIn', 'Terminal'].map((platform) => (
                        <motion.a
                            key={platform}
                            href={`#${platform.toLowerCase()}`}
                            whileHover={{ y: -2, color: '#BCF000' }}
                            className="text-[10px] font-black tracking-[0.3em] text-engineering-white/40 uppercase hover:text-lemon-green transition-colors relative group"
                        >
                            {platform}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lemon-green transition-all group-hover:w-full" />
                        </motion.a>
                    ))}
                </div>

            </div>
        </footer>
    );
}
