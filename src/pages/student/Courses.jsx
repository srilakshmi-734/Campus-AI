import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookOpen, GraduationCap, Award, Search, Filter, BookText, User } from 'lucide-react';
import { Reveal } from '../../components/Reveal';

const myCourses = [
    { code: 'CS3401', name: 'Data Structures & Algorithms', credits: 4, faculty: 'Dr. Sunita Rao', syllabus: 72, grade: 'A', semester: 'V' },
    { code: 'CS3451', name: 'Operating Systems', credits: 3, faculty: 'Dr. K. Murugavel', syllabus: 60, grade: 'B+', semester: 'V' },
    { code: 'MA3351', name: 'Engineering Mathematics III', credits: 4, faculty: 'Dr. G. Rajan', syllabus: 80, grade: 'A+', semester: 'V' },
    { code: 'CS3491', name: 'Computer Networks', credits: 3, faculty: 'Mr. Arun Durai', syllabus: 55, grade: 'B', semester: 'V' },
    { code: 'CS3492', name: 'Machine Learning Basics', credits: 4, faculty: 'Dr. Sunita Rao', syllabus: 40, grade: 'A', semester: 'V' },
    { code: 'CS3411', name: 'OS Lab', credits: 2, faculty: 'Dr. K. Murugavel', syllabus: 90, grade: 'O', semester: 'V' },
];

const gradeColors = {
    'O': 'text-lemon-green border-lemon-green',
    'A+': 'text-green-400 border-green-400',
    'A': 'text-blue-400 border-blue-400',
    'B+': 'text-orange-400 border-orange-400',
    'B': 'text-red-400 border-red-400'
};

export default function StudentCourses() {
    const { t } = useTranslation();

    return (
        <div className="space-y-8 pb-12 text-engineering-white">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <Reveal>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-lemon-green">
                            <BookText size={24} />
                            <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-80">
                                Academic Repository
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
                            {t('myCourses')}
                        </h1>
                        <p className="text-engineering-white/50 font-medium max-w-xl italic">
                            Curriculum Analytics • Semester V • 22 Credits Total
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.4}>
                    <div className="flex items-center gap-3">
                        <div className="engineering-glass px-4 py-2 border-white/10 flex items-center gap-2 group cursor-pointer hover:border-lemon-green/50 transition-all">
                            <Filter size={14} className="text-lemon-green" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Filter Sem</span>
                        </div>
                        <div className="engineering-glass px-4 py-2 border-white/10 flex items-center gap-2 group cursor-pointer hover:border-lemon-green/50 transition-all">
                            <Search size={14} className="text-lemon-green" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Search Catalog</span>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {myCourses.map((c, i) => (
                    <motion.div
                        key={c.code}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="engineering-glass p-6 group cursor-pointer border-white/5 hover:border-lemon-green/30 transition-all duration-300 relative overflow-hidden"
                    >
                        {/* Blueprint Background Effect */}
                        <div className="absolute -bottom-6 -right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <GraduationCap size={120} className="text-lemon-green" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-lemon-green group-hover:scale-110 transition-transform">
                                    <BookOpen size={20} />
                                </div>
                                <div className={`px-3 py-1 border rounded-lg text-[10px] font-black uppercase tracking-widest bg-white/5 ${gradeColors[c.grade] || 'text-white border-white/20'}`}>
                                    Grade: {c.grade}
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-[10px] font-black text-lemon-green uppercase tracking-[0.2em] mb-1 italic">{c.code} • Sem {c.semester}</p>
                                <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-lemon-green transition-colors leading-tight">
                                    {c.name}
                                </h3>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-engineering-white/50 group-hover:text-engineering-white transition-colors">
                                        <User size={12} className="text-lemon-green" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{c.faculty}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-engineering-white/50 group-hover:text-engineering-white transition-colors">
                                        <Award size={12} className="text-lemon-green" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{c.credits} Credits</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-engineering-white/40">
                                        <span>Curriculum Coverage</span>
                                        <span className="text-lemon-green">{c.syllabus}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${c.syllabus}%` }}
                                            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                            className="h-full bg-lemon-green shadow-[0_0_10px_rgba(188,240,0,0.3)] rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Performance Footer */}
            <Reveal delay={0.8}>
                <div className="engineering-glass p-8 border-lemon-green/20 mt-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-lemon-green/[0.02] to-transparent">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-lemon-green flex items-center justify-center text-engineering-black shadow-[0_0_30px_rgba(188,240,0,0.3)]">
                            <Award size={28} />
                        </div>
                        <div>
                            <h4 className="text-lg font-black uppercase tracking-tight text-white">Current Academic GPA: 8.42</h4>
                            <p className="text-[10px] text-lemon-green font-black uppercase tracking-widest">Top 5% of Engineering Node Node: TN-S1</p>
                        </div>
                    </div>
                    <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-lemon-green hover:text-engineering-black hover:border-lemon-green transition-all group">
                        Download Full Transcript
                    </button>
                </div>
            </Reveal>
        </div>
    );
}
