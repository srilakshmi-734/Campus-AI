import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CreditCard, AlertTriangle, CheckCircle, Send, Download, Search, TrendingUp, MessageSquare } from 'lucide-react';
import { Reveal } from '../../components/Reveal';
import { exportToCSV } from '../../utils/exportUtils';

const defaulters = [
    { id: 'CS002', name: 'Priya Rajan', dept: 'CSE', amount: 18500, due: '2026-01-15', status: 'overdue' },
    { id: 'EC002', name: 'Divya Mohan', dept: 'ECE', amount: 22000, due: '2026-01-15', status: 'overdue' },
    { id: 'ME001', name: 'Sneha Vijay', dept: 'Mech', amount: 9200, due: '2026-02-20', status: 'due_soon' },
    { id: 'IT002', name: 'Ravi Subash', dept: 'IT', amount: 15000, due: '2026-01-28', status: 'overdue' },
    { id: 'CS006', name: 'Kavya Prakash', dept: 'CSE', amount: 8500, due: '2026-03-01', status: 'due_soon' },
];

const categories = [
    { name: 'Tuition Fee', pct: 60, color: '#7c3aed' },
    { name: 'Hostel Fee', pct: 20, color: '#f97316' },
    { name: 'Lab Fee', pct: 12, color: '#10b981' },
    { name: 'Exam Fee', pct: 8, color: '#3b82f6' },
];



export default function AdminFees() {
    const { t } = useTranslation();
    const [search, setSearch] = useState('');

    const filtered = defaulters.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.id.toLowerCase().includes(search.toLowerCase())
    );

    const handleExport = () => {
        exportToCSV(filtered, 'Fee_Defaulters_Report');
    };


    return (
        <div className="space-y-6">
            <Reveal width="100%">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-xl font-bold gradient-text">{t('fees')}</h1>
                    <p className="text-xs text-[var(--text-muted)]">Fee collection & defaulter management</p>
                </motion.div>
            </Reveal>

            {/* Summary Cards */}
            <Reveal width="100%" delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: 'Total Collected', value: '₹48.2L', icon: CheckCircle, color: '#10b981', sub: '82% of target' },
                        { label: 'Pending', value: '₹12.5L', icon: AlertTriangle, color: '#f97316', sub: '18% remaining' },
                        { label: 'Defaulters', value: '47', icon: CreditCard, color: '#ef4444', sub: 'students pending' },
                    ].map(({ label, value, icon: Icon, color, sub }, i) => (
                        <motion.div key={label}
                            whileHover={{ y: -3 }}
                            className="glass-card p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ background: `${color}20` }}>
                                    <Icon size={20} style={{ color }} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{value}</p>
                                    <p className="text-xs text-[var(--text-muted)]">{sub}</p>
                                </div>
                            </div>
                            <p className="text-xs text-[var(--text-muted)]">{label}</p>
                        </motion.div>
                    ))}
                </div>
            </Reveal>

            <div className="space-y-8">
                {/* Defaulters Table */}
                <Reveal width="100%" delay={0.4}>
                    <motion.div className="glass-card overflow-hidden border border-white/5 shadow-2xl">
                        <div className="px-8 py-6 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                                    <CreditCard size={24} className="text-violet-400" />
                                </div>
                                <div>
                                    <h2 className="font-black text-lg tracking-tight uppercase">Fee Defaulters</h2>
                                    <p className="text-[10px] text-[var(--text-muted)] font-bold tracking-widest uppercase">Immediate attention required</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1 lg:justify-end">
                                <div className="relative flex-1 max-w-md">
                                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                                    <input
                                        type="text"
                                        placeholder="Search by ID or Name..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="glass-input w-full text-sm pl-12 py-3 rounded-2xl border-white/5 bg-white/2"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                                        onClick={handleExport}
                                        className="flex-1 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest glass-card px-6 py-3 hover:bg-white/10 transition-all border border-white/10">
                                        <Download size={14} /> {t('export')}
                                    </motion.button>
                                    <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                                        className="flex-1 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest btn-gradient px-6 py-3 shadow-lg shadow-violet-500/20">
                                        <Send size={14} /> Bulk Remind
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="campus-table w-full">
                                <thead>
                                    <tr className="bg-white/2">
                                        <th className="text-left py-5 px-8">Student Identification</th>
                                        <th className="text-left py-5 px-8">Full Name</th>
                                        <th className="text-left py-5 px-8">Department</th>
                                        <th className="text-left py-5 px-8 text-right">Outstanding Amount</th>
                                        <th className="text-left py-5 px-8">Deadline</th>
                                        <th className="text-left py-5 px-8 text-center">Status Alert</th>
                                        <th className="text-left py-5 px-8 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filtered.map((d, i) => (
                                        <motion.tr key={d.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="hover:bg-white/5 transition-colors group"
                                        >
                                            <td className="py-5 px-8 font-mono text-xs text-violet-400 font-bold">{d.id}</td>
                                            <td className="py-5 px-8">
                                                <p className="font-extrabold text-sm tracking-tight group-hover:text-violet-400 transition-colors">{d.name}</p>
                                            </td>
                                            <td className="py-5 px-8">
                                                <span className="badge badge-blue text-[10px] font-black uppercase tracking-tighter">{d.dept}</span>
                                            </td>
                                            <td className="py-5 px-8 text-right">
                                                <span className="text-red-400 font-black font-mono text-base">₹{d.amount.toLocaleString()}</span>
                                            </td>
                                            <td className="py-5 px-8 text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider">
                                                {new Date(d.due).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="py-5 px-8 text-center">
                                                <span className={`badge ${d.status === 'overdue' ? 'badge-red' : 'badge-yellow'} text-[10px] font-black uppercase tracking-widest px-4 shadow-sm`}>
                                                    {d.status === 'overdue' ? 'Overdue' : 'Due Soon'}
                                                </span>
                                            </td>
                                            <td className="py-5 px-8 text-right">
                                                <button className="p-2 rounded-xl bg-lemon-green/10 text-lemon-green hover:bg-lemon-green hover:text-engineering-black transition-all group/sms" title="Send SMS reminder">
                                                    <MessageSquare size={14} className="group-hover/sms:scale-110" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filtered.length === 0 && (
                            <div className="py-32 text-center bg-white/2">
                                <Search size={64} className="mx-auto text-white/5 mb-6" />
                                <p className="text-[var(--text-muted)] text-lg font-medium italic underline underline-offset-8 decoration-white/5">No records found matching your search</p>
                            </div>
                        )}
                    </motion.div>
                </Reveal>

                {/* Category Breakdown */}
                <Reveal width="100%" delay={0.5}>
                    <motion.div className="glass-card p-10 border border-white/5 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -mr-32 -mt-32 opacity-50 group-hover:scale-110 transition-transform duration-700" />

                        <div className="flex items-center gap-4 mb-10 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                                <TrendingUp size={28} className="text-orange-400" />
                            </div>
                            <div>
                                <h2 className="font-black text-xl tracking-tight uppercase">Institutional Fee Distribution</h2>
                                <p className="text-[10px] text-[var(--text-muted)] font-bold tracking-widest uppercase">Global revenue allocation breakdown</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                            {categories.map(({ name, pct, color }, i) => (
                                <div key={name} className="space-y-5 animate-reveal" style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">{name}</span>
                                        <span className="font-black text-2xl tabular-nums italic" style={{ color }}>{pct}%</span>
                                    </div>
                                    <div className="progress-bar h-4 bg-white/5 border border-white/5 p-1">
                                        <motion.div className="progress-fill shadow-[0_0_15px_rgba(0,0,0,0.3)] shadow-[var(--color)]"
                                            style={{ background: `linear-gradient(90deg, ${color}, ${color}cc)`, '--color': `${color}40` }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${pct}%` }}
                                            transition={{ duration: 1.5, delay: 0.7 + i * 0.1, ease: "circOut" }}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 pt-2 opacity-50">
                                        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                                        <p className="text-[9px] font-bold text-[var(--text-muted)] tracking-tighter">ESTIMATED YIELD: ₹{(48.2 * pct / 100).toFixed(1)}L</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Legend Banner */}
                        <div className="mt-12 p-8 rounded-3xl bg-white/2 border border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                            {categories.map(({ name, pct, color }) => (
                                <div key={name} className="flex items-center gap-4 group/item cursor-default">
                                    <div className="w-4 h-4 rounded-lg shadow-lg group-hover/item:scale-125 transition-transform" style={{ background: color, boxShadow: `0 0 12px ${color}80` }} />
                                    <div>
                                        <p className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-tighter">{name}</p>
                                        <p className="text-[9px] font-bold text-[var(--text-muted)]">{pct}% CONTRIBUTION</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </Reveal>
            </div>


        </div>
    );
}

