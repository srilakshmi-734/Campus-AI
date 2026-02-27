import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star, Plus, Mail } from 'lucide-react';

const faculty = [
    { id: 'F001', name: 'Dr. K. Murugavel', dept: 'CSE', designation: 'Professor & HOD', classes: 4, rating: 4.8, exp: 18 },
    { id: 'F002', name: 'Dr. Priya Nair', dept: 'ECE', designation: 'Associate Prof.', classes: 5, rating: 4.5, exp: 12 },
    { id: 'F003', name: 'Mr. Rahul Mehta', dept: 'Mech', designation: 'Assistant Prof.', classes: 6, rating: 4.2, exp: 6 },
    { id: 'F004', name: 'Dr. Sunita Rao', dept: 'CSE', designation: 'Professor', classes: 3, rating: 4.9, exp: 22 },
    { id: 'F005', name: 'Mr. Arun Durai', dept: 'IT', designation: 'Assistant Prof.', classes: 5, rating: 4.1, exp: 4 },
    { id: 'F006', name: 'Dr. Kavitha Selvi', dept: 'ECE', designation: 'Associate Prof.', classes: 4, rating: 4.7, exp: 15 },
    { id: 'F007', name: 'Mr. Vijay Kumar', dept: 'Civil', 'designation': 'Assistant Prof.', classes: 6, rating: 3.9, exp: 3 },
    { id: 'F008', name: 'Dr. Meena Rajan', dept: 'Mech', designation: 'Professor & HOD', classes: 3, rating: 4.6, exp: 20 },
];

export default function AdminFaculty() {
    const { t } = useTranslation();
    const [filter, setFilter] = useState('All');

    const filtered = faculty.filter(f => filter === 'All' || f.dept === filter);

    return (
        <div className="space-y-5">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold gradient-text">{t('faculty')}</h1>
                    <p className="text-xs text-[var(--text-muted)]">{filtered.length} faculty members</p>
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="btn-gradient flex items-center gap-2 text-sm px-4 py-2">
                    <Plus size={16} /> Add Faculty
                </motion.button>
            </motion.div>

            {/* Dept filter chips */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="glass-card p-3 flex flex-wrap items-center gap-3 border border-white/5 shadow-lg">
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest px-2">Filter Department:</span>
                {['All', 'CSE', 'ECE', 'Mech', 'Civil', 'IT'].map(d => (
                    <button key={d} onClick={() => setFilter(d)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${filter === d
                            ? 'text-white border-transparent shadow-lg shadow-violet-500/20'
                            : 'glass-card text-[var(--text-muted)] hover:text-white border-white/5 hover:border-white/20'
                            }`}
                        style={filter === d ? { background: 'var(--gradient)' } : {}}>
                        {d}
                    </button>
                ))}
            </motion.div>

            {/* Faculty Cards */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.15 } }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {filtered.map((f, i) => (
                    <motion.div key={f.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="glass-card p-6 space-y-5 border border-white/5 hover:border-white/10 shadow-lg hover:shadow-2xl transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />

                        {/* Avatar & Header */}
                        <div className="flex flex-col items-center text-center gap-4 relative z-10">
                            <div className="w-20 h-20 rounded-2xl p-0.5 shadow-2xl relative"
                                style={{ background: 'var(--gradient)' }}>
                                <div className="w-full h-full rounded-[14px] bg-[#1a1c2c] flex items-center justify-center text-2xl font-black text-white group-hover:scale-95 transition-transform overflow-hidden">
                                    <span className="relative z-10">{f.name.split(' ').map(n => n.startsWith('Dr.') || n.startsWith('Mr.') ? '' : n[0]).join('')}</span>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-transparent" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-[#1a1c2c] shadow-lg shadow-green-500/20" />
                            </div>
                            <div>
                                <p className="font-black text-base tracking-tight leading-tight group-hover:text-violet-400 transition-colors uppercase">{f.name}</p>
                                <p className="text-[10px] font-black text-violet-400 uppercase tracking-widest mt-1 opacity-80">{f.designation}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-2 relative z-10">
                            <span className="badge badge-blue text-[10px] shadow-sm tracking-tighter capitalize">{f.dept} Dept</span>
                            <span className="text-[10px] font-bold text-[var(--text-muted)] bg-white/5 px-2 py-0.5 rounded-md border border-white/10">{f.exp} Years Exp</span>
                        </div>

                        <div className="flex items-center justify-around p-3 rounded-2xl bg-white/2 border border-white/5 relative z-10">
                            <div className="text-center">
                                <p className="text-[9px] text-[var(--text-muted)] uppercase font-bold tracking-widest mb-0.5">Classes</p>
                                <p className="text-sm font-black">{f.classes}</p>
                            </div>
                            <div className="w-px h-6 bg-white/10" />
                            <div className="text-center">
                                <p className="text-[9px] text-[var(--text-muted)] uppercase font-bold tracking-widest mb-0.5">Rating</p>
                                <div className="flex items-center gap-1 justify-center">
                                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                    <span className="text-sm font-black italic">{f.rating}</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest
                            border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10
                            text-[var(--text-muted)] hover:text-white transition-all shadow-lg active:scale-95">
                            <Mail size={14} className="group-hover:rotate-12 transition-transform" /> Contact
                        </button>
                    </motion.div>
                ))}
            </motion.div>

        </div>
    );
}
