import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CalendarCheck, AlertTriangle, CheckCircle2, Activity } from 'lucide-react';
import { Reveal } from '../../components/Reveal';

const myAttendance = [
    { subject: 'Data Structures', total: 48, attended: 42, pct: 87, code: 'CS3401' },
    { subject: 'Operating Systems', total: 36, attended: 29, pct: 80, code: 'CS3451' },
    { subject: 'Mathematics III', total: 48, attended: 44, pct: 91, code: 'MA3351' },
    { subject: 'Computer Networks', total: 36, attended: 25, pct: 69, code: 'CS3491' },
    { subject: 'Machine Learning', total: 48, attended: 40, pct: 83, code: 'CS3492' },
    { subject: 'OS Lab', total: 24, attended: 23, pct: 95, code: 'CS3411' },
];

export default function StudentAttendance() {
    const { t } = useTranslation();
    const overall = Math.round(myAttendance.reduce((s, a) => s + a.pct, 0) / myAttendance.length);

    return (
        <div className="space-y-8 pb-12 text-engineering-white">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <Reveal>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-lemon-green">
                            <Activity size={24} />
                            <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-80">
                                Real-time Analytics
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
                            {t('myAttendance')}
                        </h1>
                        <p className="text-engineering-white/50 font-medium max-w-xl italic">
                            Semester V • Academic Session 2025-26
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.4}>
                    <div className="engineering-glass p-4 border-lemon-green/20">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black text-lemon-green border-2 border-dashed border-lemon-green/30 shadow-[0_0_20px_rgba(188,240,0,0.2)]">
                                {overall}%
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-black text-lemon-green tracking-widest">Aggregate</p>
                                <p className="font-bold text-sm text-engineering-white uppercase tracking-tight">Compliance Status</p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Overall Status Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`engineering-glass p-8 relative overflow-hidden group ${overall >= 75 ? 'border-lemon-green/30' : 'border-red-500/30'}`}
            >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <CalendarCheck size={120} className={overall >= 75 ? 'text-lemon-green' : 'text-red-500'} />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                            {overall >= 75 ? (
                                <CheckCircle2 className="text-lemon-green" size={24} />
                            ) : (
                                <AlertTriangle className="text-red-500" size={24} />
                            )}
                            <h2 className="text-2xl font-black uppercase tracking-tight">
                                {overall >= 75 ? 'Operational Eligibility Confirmed' : 'Compliance Shortage Detected'}
                            </h2>
                        </div>
                        <p className="text-engineering-white/60 leading-relaxed max-w-2xl font-medium">
                            {overall >= 75
                                ? "Current attendance parameters meet the minimum mandatory institutional requirement of 75%. Automated hall ticket generation is active."
                                : "CRITICAL: Attendance has dropped below the 75% threshold. Please consult with the HOD immediately to avoid semester condonation."}
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-lemon-green" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Sem Credits: 24</span>
                            </div>
                            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-lemon-green" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Medical Leaves: 0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Subject Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myAttendance.map(({ subject, total, attended, pct, code }, i) => (
                    <motion.div
                        key={subject}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className={`engineering-glass p-6 group transition-all duration-300 hover:scale-[1.01] ${pct < 75 ? 'border-red-500/20 stat-glow-orange' : 'border-white/10 stat-glow-green'}`}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-[10px] font-black text-lemon-green uppercase tracking-widest mb-1">{code}</p>
                                <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-lemon-green transition-colors">
                                    {subject}
                                </h3>
                            </div>
                            <div className="text-right">
                                <p className={`text-4xl font-black tracking-tighter ${pct < 75 ? 'text-red-500' : 'text-engineering-white'}`}>
                                    {pct}%
                                </p>
                                <p className="text-[10px] font-bold text-engineering-white/40 uppercase tracking-widest">Attendance</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-engineering-white/50">
                                <span>Progressive Node</span>
                                <span>{attended} / {total} Units</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                    className={`h-full rounded-full ${pct < 75 ? 'bg-red-500' : 'bg-lemon-green'} shadow-[0_0_10px_rgba(188,240,0,0.3)]`}
                                />
                            </div>
                        </div>

                        {pct < 75 && (
                            <div className="mt-6 flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                                <AlertTriangle className="text-red-500" size={14} />
                                <span className="text-[10px] font-black text-red-400 uppercase tracking-tight">Requires 4 more classes for compliance</span>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Footer Legend */}
            <div className="flex justify-center pt-8">
                <div className="engineering-glass px-8 py-3 flex gap-8 items-center border-white/5 text-[10px] font-black uppercase tracking-widest text-engineering-white/40">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-lemon-green" />
                        <span>High Operational Access (&gt;85%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        <span>Vulnerable Node (75% - 85%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span>Critical Breach (&lt;75%)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
