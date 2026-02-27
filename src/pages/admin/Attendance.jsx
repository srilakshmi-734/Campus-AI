import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, CheckCircle, TrendingDown, TrendingUp } from 'lucide-react';

const deptData = [
    { dept: 'CSE', present: 87, absent: 13 },
    { dept: 'ECE', present: 79, absent: 21 },
    { dept: 'Mech', present: 74, absent: 26 },
    { dept: 'Civil', present: 83, absent: 17 },
    { dept: 'IT', present: 88, absent: 12 },
];

const lowStudents = [
    { id: 'CS002', name: 'Priya Rajan', dept: 'CSE', att: 65, risk: 'Critical' },
    { id: 'EC002', name: 'Divya Mohan', dept: 'ECE', att: 58, risk: 'Critical' },
    { id: 'ME001', name: 'Sneha Vijay', dept: 'Mech', att: 72, risk: 'High' },
    { id: 'IT002', name: 'Ravi Subash', dept: 'IT', att: 74, risk: 'High' },
    { id: 'CS005', name: 'Mani Kannan', dept: 'CSE', att: 70, risk: 'High' },
];

const riskColors = { Critical: 'badge-red', High: 'badge-yellow', Medium: 'badge-blue', Low: 'badge-green' };

export default function AdminAttendance() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-xl font-bold gradient-text">{t('attendance')}</h1>
                <p className="text-xs text-[var(--text-muted)]">Current semester overview</p>
            </motion.div>

            {/* Dept Bars */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                className="glass-card p-8 border border-white/5 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                    <TrendingUp size={22} className="text-violet-400" />
                    <h2 className="font-extrabold text-lg tracking-tight">Department-wise Analytics</h2>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-12 gap-y-8">
                    {deptData.map(({ dept, present, absent }, i) => (
                        <div key={dept} className="group">
                            <div className="flex items-center justify-between text-sm mb-3">
                                <span className="font-bold tracking-wide group-hover:text-violet-400 transition-colors uppercase text-xs">{dept} Engineering</span>
                                <div className="flex items-center gap-4 text-[11px] font-bold">
                                    <span className="text-green-400 px-2 py-0.5 rounded-lg bg-green-400/10 border border-green-400/20">{present}% PRESENT</span>
                                    <span className="text-red-400 px-2 py-0.5 rounded-lg bg-red-400/10 border border-red-400/20">{absent}% ABSENT</span>
                                </div>
                            </div>
                            <div className="h-4 rounded-full overflow-hidden flex bg-white/5 border border-white/5 p-0.5">
                                <motion.div
                                    style={{ background: present >= 80 ? '#10b981' : present >= 75 ? '#fbbf24' : '#ef4444' }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${present}%` }}
                                    transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                                    className="h-full rounded-full shadow-lg"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Middle Section */}
            <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
                {/* Summary Stats */}
                <div className="flex flex-col gap-4">
                    {[
                        { label: 'Avg. Attendance', value: '82.2%', icon: CheckCircle, color: '#10b981', trend: '+2.4%' },
                        { label: 'Students at Risk', value: '47', icon: AlertTriangle, color: '#ef4444', trend: '-5' },
                        { label: 'Flagged Depts', value: '2', icon: TrendingDown, color: '#f97316', trend: 'Critical' },
                    ].map(({ label, value, icon: Icon, color, trend }, i) => (
                        <motion.div key={label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            whileHover={{ scale: 1.02, x: 5 }}
                            className="glass-card p-6 flex items-center gap-5 border border-white/5 shadow-xl group"
                        >
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                                style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                                <Icon size={26} style={{ color }} />
                            </div>
                            <div className="flex-1">
                                <p className="text-3xl font-black tabular-nums tracking-tight">{value}</p>
                                <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mt-1">{label}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-black px-2 py-1 rounded-md bg-white/5 border border-white/10">{trend}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Low Attendance Table */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                    className="glass-card overflow-hidden border border-white/5 shadow-2xl 2xl:col-span-2">
                    <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/2">
                        <div className="flex items-center gap-3">
                            <AlertTriangle size={20} className="text-red-400" />
                            <h2 className="font-extrabold text-base tracking-tight">Immediate Attention Required</h2>
                        </div>
                        <span className="text-[10px] font-bold px-3 py-1 bg-red-400/10 text-red-400 border border-red-400/20 rounded-full uppercase tracking-tighter">5 alerts</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="campus-table w-full">
                            <thead>
                                <tr className="bg-white/2 border-b border-white/5">
                                    <th className="text-left py-4 px-6">ID</th>
                                    <th className="text-left py-4 px-6">Student Name</th>
                                    <th className="text-left py-4 px-6">Dept</th>
                                    <th className="text-left py-4 px-6 text-center">Attendance</th>
                                    <th className="text-right py-4 px-6">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {lowStudents.map((s, i) => (
                                    <motion.tr key={s.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="hover:bg-white/5 transition-colors group"
                                        transition={{ delay: 0.35 + i * 0.05 }}>
                                        <td className="py-4 px-6 font-mono text-xs text-violet-400">{s.id}</td>
                                        <td className="py-4 px-6 font-bold text-sm tracking-tight">{s.name}</td>
                                        <td className="py-4 px-6">
                                            <span className="badge badge-blue text-[10px] uppercase font-bold">{s.dept}</span>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                <span className="text-red-400 font-black tabular-nums">{s.att}%</span>
                                                <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                                    <div className="bg-red-500 h-full" style={{ width: `${s.att}%` }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-red-400/10 text-red-400 border border-red-400/20 hover:bg-red-400 hover:text-white transition-all shadow-lg shadow-red-500/10">
                                                Remind
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>

        </div>
    );
}
