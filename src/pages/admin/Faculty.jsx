import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    Star,
    Plus,
    Mail,
    Search,
    Filter,
    MoreVertical,
    GraduationCap,
    ExternalLink,
    Zap
} from 'lucide-react';

const faculty = [
    { id: 'F001', name: 'Dr. K. Murugavel', dept: 'CSE', designation: 'Professor & HOD', classes: 4, rating: 4.8, exp: 18 },
    { id: 'F002', name: 'Dr. Priya Nair', dept: 'ECE', designation: 'Associate Prof.', classes: 5, rating: 4.5, exp: 12 },
    { id: 'F003', name: 'Mr. Rahul Mehta', dept: 'Mech', designation: 'Assistant Prof.', classes: 6, rating: 4.2, exp: 6 },
    { id: 'F004', name: 'Dr. Sunita Rao', dept: 'CSE', designation: 'Professor', classes: 3, rating: 4.9, exp: 22 },
    { id: 'F005', name: 'Mr. Arun Durai', dept: 'IT', designation: 'Assistant Prof.', classes: 5, rating: 4.1, exp: 4 },
    { id: 'F006', name: 'Dr. Kavitha Selvi', dept: 'ECE', designation: 'Associate Prof.', classes: 4, rating: 4.7, exp: 15 },
    { id: 'F007', name: 'Mr. Vijay Kumar', dept: 'Civil', designation: 'Assistant Prof.', classes: 6, rating: 3.9, exp: 3 },
    { id: 'F008', name: 'Dr. Meena Rajan', dept: 'Mech', designation: 'Professor & HOD', classes: 3, rating: 4.6, exp: 20 },
];

export default function AdminFaculty() {
    const { t } = useTranslation();
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = faculty.filter(f =>
        (filter === 'All' || f.dept === filter) &&
        (f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.id.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter text-engineering-white mb-2 uppercase">
                        FACULTY <span className="text-lemon-green italic">REGISTRY</span>
                    </h2>
                    <div className="flex items-center gap-4 text-xs font-bold text-engineering-white/40 uppercase tracking-widest">
                        <span className="flex items-center gap-2 pt-1">
                            <GraduationCap size={14} className="text-lemon-green" />
                            {filtered.length} ACTIVE INTELLECTS
                        </span>
                        <span>Session: 2026-EVEN</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-lemon-green text-engineering-black text-[10px] font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(188,240,0,0.4)] transition-all">
                        <Plus size={14} /> Onboard Faculty
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="engineering-glass p-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-engineering-white/30" size={18} />
                    <input
                        type="text"
                        placeholder="Search Research Scholars / Professors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-lemon-green/50 text-engineering-white font-bold italic"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
                    {['All', 'CSE', 'ECE', 'Mech', 'Civil', 'IT'].map(d => (
                        <button
                            key={d}
                            onClick={() => setFilter(d)}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border whitespace-nowrap ${filter === d
                                    ? 'bg-lemon-green text-engineering-black border-lemon-green'
                                    : 'bg-white/5 text-engineering-white/40 border-white/10 hover:border-white/20'
                                }`}
                        >
                            {d}
                        </button>
                    ))}
                    <button className="p-2 engineering-glass border-none bg-white/5 hover:bg-white/10">
                        <Filter size={18} className="text-lemon-green" />
                    </button>
                </div>
            </div>

            {/* Faculty Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((f, i) => (
                    <motion.div
                        key={f.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -8 }}
                        className="engineering-glass p-6 group transition-all relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Zap size={60} className="text-lemon-green" />
                        </div>

                        {/* Card Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-lemon-green bg-lemon-green/10 px-2 py-0.5 rounded w-fit uppercase tracking-widest mb-2">{f.id}</span>
                                <h3 className="text-lg font-black text-engineering-white tracking-tighter uppercase leading-tight group-hover:text-lemon-green transition-colors">{f.name}</h3>
                                <p className="text-[10px] font-bold text-engineering-white/40 uppercase tracking-widest mt-1">{f.designation}</p>
                            </div>
                            <button className="text-engineering-white/20 hover:text-lemon-green transition-colors">
                                <MoreVertical size={18} />
                            </button>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-2 mb-6">
                            <div className="bg-white/5 p-2 rounded-lg">
                                <p className="text-[8px] text-engineering-white/30 uppercase font-black mb-1">Rank</p>
                                <div className="flex items-center gap-1">
                                    <Star size={10} className="text-lemon-green fill-lemon-green" />
                                    <span className="text-xs font-black italic text-engineering-white">{f.rating}</span>
                                </div>
                            </div>
                            <div className="bg-white/5 p-2 rounded-lg">
                                <p className="text-[8px] text-engineering-white/30 uppercase font-black mb-1">XP</p>
                                <p className="text-xs font-black italic text-engineering-white">{f.exp}Y</p>
                            </div>
                            <div className="bg-white/5 p-2 rounded-lg">
                                <p className="text-[8px] text-engineering-white/30 uppercase font-black mb-1">Nodes</p>
                                <p className="text-xs font-black italic text-engineering-white">{f.classes}</p>
                            </div>
                        </div>

                        {/* Dept Badge */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <span className="text-[10px] font-black text-engineering-white/60 tracking-[0.2em]">{f.dept} DIVISION</span>
                            <div className="flex gap-2">
                                <button className="p-2 bg-white/5 rounded-lg hover:bg-lemon-green hover:text-engineering-black transition-all">
                                    <Mail size={14} />
                                </button>
                                <button className="p-2 bg-white/5 rounded-lg hover:bg-lemon-green hover:text-engineering-black transition-all">
                                    <ExternalLink size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Records Footer */}
            <div className="flex items-center justify-between px-6 py-4 engineering-glass bg-white/5 border-white/10">
                <span className="text-[10px] font-bold text-engineering-white/30 uppercase tracking-[0.4em]">Integrated Academic Intelligence Unit • v4.0.2</span>
                <span className="text-[10px] font-black text-lemon-green uppercase tracking-widest italic flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-lemon-green animate-pulse" />
                    All nodes operational
                </span>
            </div>
        </div>
    );
}
