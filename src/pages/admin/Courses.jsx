import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookOpen, Plus, Search } from 'lucide-react';

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
        return (filter_dept => deptFilter === 'All' || c.dept === deptFilter)(deptFilter) &&
            (c.name.toLowerCase().includes(s) || c.code.toLowerCase().includes(s));
    });

    return (
        <div className="space-y-5">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold gradient-text">{t('courses')}</h1>
                    <p className="text-xs text-[var(--text-muted)]">{filtered.length} active courses</p>
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="btn-gradient flex items-center gap-2 text-sm px-4 py-2">
                    <Plus size={16} /> Add Course
                </motion.button>
            </motion.div>

            {/* Filters */}
            <div className="glass-card p-3 flex flex-col lg:flex-row items-stretch lg:items-center gap-4 border border-white/5 shadow-xl">
                <div className="flex items-center gap-3 px-4 py-2 glass-card border border-white/10 flex-1 max-w-xl">
                    <Search size={18} className="text-violet-400" />
                    <input value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search by course name or code..."
                        className="bg-transparent text-sm w-full focus:outline-none placeholder:text-white/20" />
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mr-2">Filter by Department:</span>
                    {['All', 'CSE', 'ECE', 'Mech', 'IT'].map(d => (
                        <button key={d} onClick={() => setDeptFilter(d)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${deptFilter === d
                                ? 'text-white border-transparent shadow-lg shadow-violet-500/20'
                                : 'glass-card text-[var(--text-muted)] hover:text-white border-white/5 hover:border-white/20'
                                }`}
                            style={deptFilter === d ? { background: 'var(--gradient)' } : {}}>
                            {d}
                        </button>
                    ))}
                </div>
            </div>

            {/* Course Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {filtered.map((c, i) => (
                    <motion.div key={c.code}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -5, scale: 1.01 }}
                        className="glass-card p-6 space-y-5 border border-white/5 hover:border-white/10 shadow-lg hover:shadow-2xl transition-all group"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner"
                                    style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
                                    <BookOpen size={22} className="text-violet-400" />
                                </div>
                                <div>
                                    <p className="font-extrabold text-sm tracking-tight">{c.name}</p>
                                    <p className="text-[11px] font-bold text-violet-400 mt-0.5">{c.code} <span className="text-white/20 mx-1">|</span> {c.credits} Credits</p>
                                </div>
                            </div>
                            <span className="badge badge-violet text-[10px] shadow-sm uppercase">{c.dept}</span>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5">
                            <div className="text-center flex-1">
                                <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider mb-0.5">Faculty</p>
                                <p className="text-xs font-semibold">{c.faculty}</p>
                            </div>
                            <div className="w-px h-8 bg-white/10" />
                            <div className="text-center flex-1">
                                <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider mb-0.5">Enrolled</p>
                                <p className="text-xs font-semibold">{c.enrolled}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-[11px] font-bold">
                                <span className="text-[var(--text-muted)] uppercase tracking-wider">Syllabus Completion</span>
                                <span className="tabular-nums" style={{
                                    color: c.syllabus >= 80 ? '#10b981' : c.syllabus >= 60 ? '#fbbf24' : '#ef4444'
                                }}>{c.syllabus}%</span>
                            </div>
                            <div className="progress-bar h-2 bg-white/5 border border-white/5">
                                <motion.div className="progress-fill shadow-lg"
                                    style={{ background: c.syllabus >= 80 ? '#10b981' : c.syllabus >= 60 ? '#fbbf24' : '#ef4444' }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${c.syllabus}%` }}
                                    transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            {filtered.length === 0 && (
                <div className="py-20 text-center">
                    <Search size={48} className="mx-auto text-white/5 mb-4" />
                    <p className="text-[var(--text-muted)] text-lg font-medium italic underline underline-offset-8 decoration-white/5">No courses found matching your search</p>
                </div>
            )}

        </div>
    );
}
