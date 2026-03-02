import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Package, Monitor, FlaskConical, BookOpen, Clock, Users, ArrowUpRight, Search, Zap, Library } from 'lucide-react';
import { Reveal } from '../../components/Reveal';

const labs = [
    { name: 'Advanced AI Computing Lab', available: true, nextSlot: '14:00', capacity: 60, booked: 48, node: 'NODE-A1' },
    { name: 'Neural Networks Research Lab', available: false, nextSlot: '16:00', capacity: 50, booked: 50, node: 'NODE-B2' },
    { name: 'VLSI & Precision Electronics Lab', available: true, nextSlot: '11:00', capacity: 40, booked: 22, node: 'NODE-C3' },
];

const library = [
    { title: 'Introduction to Algorithms – Cormen', available: 3, code: 'LIB-CS-001', category: 'Theory' },
    { title: 'Operating Systems – Silberschatz', available: 1, code: 'LIB-CS-042', category: 'Systems' },
    { title: 'Computer Networks – Tanenbaum', available: 0, code: 'LIB-CS-109', category: 'Networks' },
    { title: 'Machine Learning – Mitchell', available: 5, code: 'LIB-AI-221', category: 'Intelligence' },
];

export default function StudentResources() {
    const { t } = useTranslation();

    return (
        <div className="space-y-8 pb-12 text-engineering-white">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <Reveal>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-lemon-green">
                            <Zap size={24} />
                            <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-80">
                                Institutional Assets
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
                            {t('resources')}
                        </h1>
                        <p className="text-engineering-white/50 font-medium max-w-xl italic">
                            Operational status of physical & digital infrastructure
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.4}>
                    <div className="engineering-glass px-6 py-3 border-white/10 flex items-center gap-4 group cursor-pointer hover:border-lemon-green/50 transition-all">
                        <Search size={18} className="text-lemon-green" />
                        <span className="text-xs font-black uppercase tracking-widest text-white">Asset Catalog</span>
                    </div>
                </Reveal>
            </div>

            {/* Lab Availability Section */}
            <div className="space-y-6">
                <Reveal delay={0.2}>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-lemon-green/10 rounded-lg text-lemon-green">
                            <Monitor size={20} />
                        </div>
                        <h2 className="text-sm font-black uppercase tracking-widest italic">Live Lab Telemetry</h2>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {labs.map(({ name, available, nextSlot, capacity, booked, node }, i) => (
                        <motion.div
                            key={name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className={`engineering-glass p-6 group relative overflow-hidden transition-all duration-300 ${available ? 'border-lemon-green/20 stat-glow-green' : 'border-red-500/20'}`}
                        >
                            <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <FlaskConical size={100} className={available ? 'text-lemon-green' : 'text-red-500'} />
                            </div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[9px] font-black text-engineering-white/40 uppercase tracking-widest">{node}</span>
                                    <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest ${available ? 'bg-lemon-green text-engineering-black' : 'bg-red-500/20 text-red-500'}`}>
                                        {available ? 'Operational' : 'Full Capacity'}
                                    </span>
                                </div>

                                <h3 className="text-lg font-black uppercase tracking-tight text-white mb-6 group-hover:text-lemon-green transition-colors leading-tight min-h-[3rem]">
                                    {name}
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-[10px] font-bold text-engineering-white/60">
                                        <div className="flex items-center gap-2">
                                            <Clock size={12} className="text-lemon-green" />
                                            <span className="uppercase tracking-widest">{available ? `Next Window: ${nextSlot}` : `Opens: ${nextSlot}`}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users size={12} className="text-lemon-green" />
                                            <span className="uppercase tracking-widest">{booked}/{capacity} Nodes</span>
                                        </div>
                                    </div>

                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(booked / capacity) * 100}%` }}
                                            transition={{ duration: 1.2, delay: 0.6 + i * 0.1 }}
                                            className={`h-full ${available ? 'bg-lemon-green' : 'bg-red-500'} shadow-[0_0_10px_rgba(188,240,0,0.3)] rounded-full`}
                                        />
                                    </div>

                                    {available && (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full mt-2 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-lemon-green hover:text-engineering-black hover:border-lemon-green transition-all"
                                        >
                                            Incur Provisioning
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Library Section */}
            <div className="space-y-6">
                <Reveal delay={0.6}>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-lemon-green/10 rounded-lg text-lemon-green">
                            <Library size={20} />
                        </div>
                        <h2 className="text-sm font-black uppercase tracking-widest italic">Knowledge Repository Assets</h2>
                    </div>
                </Reveal>

                <div className="engineering-glass border-white/10 overflow-hidden">
                    <div className="grid grid-cols-1 divide-y divide-white/5">
                        {library.map(({ title, available, code, category }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 + i * 0.08 }}
                                className="group p-6 hover:bg-white/[0.03] transition-colors flex flex-col md:flex-row items-center justify-between gap-6"
                            >
                                <div className="flex items-center gap-6 flex-1">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lemon-green group-hover:scale-110 transition-transform">
                                        <BookOpen size={20} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-[9px] font-black text-lemon-green uppercase tracking-[0.2em] italic">{category}</span>
                                            <span className="text-[9px] font-mono text-engineering-white/40 uppercase tracking-widest">{code}</span>
                                        </div>
                                        <h4 className="text-base font-black uppercase tracking-tight text-white group-hover:text-lemon-green transition-colors">{title}</h4>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden md:block">
                                        <p className={`text-lg font-black tracking-tighter ${available > 0 ? 'text-white' : 'text-red-500'}`}>
                                            {available > 0 ? available : 'ZERO'}
                                        </p>
                                        <p className="text-[9px] font-bold text-engineering-white/40 uppercase tracking-widest">Available Nodes</p>
                                    </div>

                                    {available > 0 ? (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 bg-lemon-green text-engineering-black rounded-lg text-[10px] font-black uppercase tracking-widest shadow-[0_8px_20px_rgba(188,240,0,0.2)] hover:bg-white transition-all flex items-center gap-2"
                                        >
                                            Request Node <ArrowUpRight size={12} />
                                        </motion.button>
                                    ) : (
                                        <div className="px-6 py-2 border border-red-500/20 text-red-500 rounded-lg text-[10px] font-black uppercase tracking-widest bg-red-500/5">
                                            Out of Operations
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Disclaimer */}
            <div className="text-center pt-12 pb-8">
                <p className="text-[9px] font-black text-engineering-white/30 uppercase tracking-[0.3em]">
                    Institutional Asset Control Protocol • All interactions logged under NODE-STU-ALPHA
                </p>
            </div>
        </div>
    );
}
