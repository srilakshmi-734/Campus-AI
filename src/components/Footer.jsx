import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-[#050312]/80 backdrop-blur-xl py-8 px-6 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Brand Logo Section */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #f97316)' }}>
                        <Brain size={20} className="text-white" />
                    </div>
                    <span className="font-black text-lg tracking-tighter text-white uppercase italic">
                        Campus<span className="bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">AI</span> Hub
                    </span>
                </div>

                {/* Copyright Section */}
                <div className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase flex items-center gap-2">
                    <span>© 2026</span>
                    <span className="opacity-30">•</span>
                    <span>Tamil Nadu Engg. Community</span>
                    <span className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[8px] text-gray-400">IN</span>
                </div>

                {/* Social Links Section */}
                <div className="flex items-center gap-8">
                    {['Instagram', 'Twitter', 'LinkedIn'].map((platform) => (
                        <motion.a
                            key={platform}
                            href={`#${platform.toLowerCase()}`}
                            whileHover={{ y: -2, color: '#fff' }}
                            className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase hover:text-white transition-colors"
                        >
                            {platform}
                        </motion.a>
                    ))}
                </div>

            </div>
        </footer>
    );
}
