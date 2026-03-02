import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    BookOpen,
    Plus,
    Search,
    Filter,
    MoreVertical,
    Zap,
    Cpu,
    Target
} from 'lucide-react';

const courses = [
    { code: 'CS301', name: 'Data Structures & Algorithms', dept: 'CSE', credits: 4, enrolled: 90, syllabus: 72, faculty: 'Dr. Sunita Rao' },
    { code: 'CS401', name: 'Operating Systems', dept: 'CSE', credits: 3, enrolled: 88, syllabus: 60, faculty: 'Dr. K. Murugavel' },
    { code: 'EC301', name: 'Digital Signal Processing', dept: 'ECE', credits: 4, enrolled: 76, syllabus: 85, faculty: 'Dr. Priya Nair' },
    { code: 'ME201', name: 'Thermodynamics', dept: 'Mech', credits: 3, enrolled: 65, syllabus: 50, faculty: 'Dr. Meena Rajan' },
    { code: 'CS501', name: 'Machine Learning', dept: 'CSE', credits: 4, enrolled: 110, syllabus: 40, faculty: 'Dr. Sunita Rao' },
    { code: 'IT301', name: 'Web Technologies', dept: 'IT', credits: 3, enrolled: 82, syllabus: 90, faculty: 'Mr. Arun Durai' },
    { code: 'EC401', name: 'VLSI Design', dept: 'ECE', credits: 4, enrolled: 70, syllabus: 65, faculty: 'Dr. Kavitha Selvi' },
    { code: 'ME401', name: 'Fluid Mechanics', dept: 'Mech', credits: 3, enrolled: 60, syllabus: 78, faculty: 'Mr. Rahul Mehta' },
];

export default function AdminCourses() {
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const [deptFilter, setDeptFilter] = useState('All');

    const filtered = courses.filter(c => {
        const s = search.toLowerCase();
        return (deptFilter === 'All' || c.dept === deptFilter) &&
            (c.name.toLowerCase().includes(s) || c.code.toLowerCase().includes(s));
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter text-engineering-white mb-2 uppercase">
                        ACADEMIC <span className="text-lemon-green italic">CURRICULUM</span>
                    </h2>
                    <div className="flex items-center gap-4 text-xs font-bold text-engineering-white/40 uppercase tracking-widest">
                        <span className="flex items-center gap-2 pt-1">
                            <BookOpen size={14} className="text-lemon-green" />
                            {filtered.length} ACTIVE SYLLABUS NODES
                        </span>
                        <span>Phase: Semester V & VII</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-lemon-green text-engineering-black text-[10px] font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(188,240,0,0.4)] transition-all">
                        <Plus size={14} /> Provision New Course
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="engineering-glass p-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-engineering-white/30" size={18} />
                    <input
                        type="text"
                        placeholder="Search Academic Module Code / Title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-lemon-green/50 text-engineering-white font-bold italic"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
                    {['All', 'CSE', 'ECE', 'Mech', 'IT'].map(d => (
                        <button
                            key={d}
                            onClick={() => setDeptFilter(d)}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border whitespace-nowrap ${deptFilter === d
                                    ? 'bg-lemon-green text-engineering-black border-lemon-green'
                                    : 'bg-white/5 text-engineering-white/40 border-white/10 hover:border-white/20'
                                }`}
                        >
                            {d}
                        </button>
                    ))}
                    <button className="p-2 engineering-glass border-none bg-white/5 hover:bg-white/10 shrink-0">
                        <Filter size={18} className="text-lemon-green" />
                    </button>
                </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((c, i) => (
                    <motion.div
                        key={c.code}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -8 }}
                        className="engineering-glass p-6 group transition-all relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Cpu size={60} className="text-lemon-green" />
                        </div>

                        {/* Card Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-lemon-green bg-lemon-green/10 px-2 py-0.5 rounded w-fit uppercase tracking-widest mb-2">{c.code}</span>
                                <h3 className="text-lg font-black text-engineering-white tracking-tighter uppercase leading-[1.1] group-hover:text-lemon-green transition-colors">{c.name}</h3>
                                <p className="text-[10px] font-bold text-engineering-white/40 uppercase tracking-widest mt-1">Credits: {c.credits} • {c.dept} DIVISION</p>
                            </div>
                            <button className="text-engineering-white/20 hover:text-lemon-green transition-colors shrink-0">
                                <MoreVertical size={18} />
                            </button>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <p className="text-[8px] text-engineering-white/30 uppercase font-black mb-1">Lead Academic</p>
                                <p className="text-xs font-black italic text-engineering-white truncate">{c.faculty}</p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <p className="text-[8px] text-engineering-white/30 uppercase font-black mb-1">Enrolled Nodes</p>
                                <p className="text-xs font-black italic text-engineering-white">{c.enrolled}</p>
                            </div>
                        </div>

                        {/* Progress Section */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <div className="flex items-center gap-2">
                                    <Target size={12} className="text-lemon-green" />
                                    <span className="text-[9px] font-black text-engineering-white/60 uppercase tracking-widest">Syllabus completion</span>
                                </div>
                                <span className={`text-xl font-black italic tracking-tighter ${c.syllabus >= 80 ? 'text-lemon-green' : 'text-engineering-white/80'
                                    }`}>{c.syllabus}%</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    className="h-full bg-lemon-green"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${c.syllabus}%` }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                />
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5">
                            <span className="text-[9px] font-black text-engineering-white/40 tracking-[0.2em] italic uppercase flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-lemon-green" />
                                Academic Sync Live
                            </span>
                            <button className="text-[10px] font-black text-lemon-green uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                                Full Syllabus
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filtered.length === 0 && (
                <div className="py-20 text-center engineering-glass border-dashed border-white/10 bg-transparent">
                    <BookOpen size={48} className="mx-auto text-engineering-white/5 mb-4" />
                    <p className="text-engineering-white/40 text-sm font-bold uppercase tracking-widest">No curriculum modules identified</p>
                </div>
            )}
        </div>
    );
}
