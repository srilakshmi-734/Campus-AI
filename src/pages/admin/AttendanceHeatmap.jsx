import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Clock,
    Activity,
    AlertCircle,
    CheckCircle2,
    Users,
    Layers,
    ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

const AttendanceHeatmap = () => {
    const { t } = useTranslation();

    const mockData = [
        { day: 'Mon', '8-10': 92, '10-12': 88, '1-3': 85, '3-5': 78 },
        { day: 'Tue', '8-10': 95, '10-12': 91, '1-3': 89, '3-5': 82 },
        { day: 'Wed', '8-10': 88, '10-12': 85, '1-3': 72, '3-5': 68 },
        { day: 'Thu', '8-10': 90, '10-12': 82, '1-3': 86, '3-5': 80 },
        { day: 'Fri', '8-10': 94, '10-12': 89, '1-3': 82, '3-5': 75 },
    ];

    const getColor = (val) => {
        if (val < 75) return 'bg-red-500/80';
        if (val < 85) return 'bg-lemon-green/40';
        return 'bg-lemon-green';
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter text-engineering-white mb-2 uppercase">
                        ATTENDANCE <span className="text-lemon-green italic">HEATMAP</span>
                    </h2>
                    <div className="flex items-center gap-4 text-xs font-bold text-engineering-white/40 uppercase tracking-widest">
                        <span className="flex items-center gap-2 pt-1"><Activity size={14} className="text-lemon-green" /> ENGINEERING UNIV 75% MANDATORY</span>
                        <span>Ref: SEM-5-DBMS_LAB</span>
                    </div>
                </div>
                <div className="engineering-glass px-4 py-2 border-none bg-white/5">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-red-500" />
                            <span className="text-[10px] font-bold text-engineering-white/60 tracking-widest uppercase">Critical (&lt;75%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-lemon-green" />
                            <span className="text-[10px] font-bold text-engineering-white/60 tracking-widest uppercase">Compliant (&gt;75%)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Heatmap Section */}
                <div className="lg:col-span-2 engineering-glass p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-lemon-green">Weekly Laboratory Utilization</h3>
                        <button className="text-[10px] font-black text-engineering-white/40 uppercase tracking-widest flex items-center gap-2 hover:text-lemon-green transition-colors">
                            <Layers size={14} /> Full Log
                        </button>
                    </div>

                    <div className="w-full overflow-x-auto no-scrollbar">
                        <div className="min-w-[600px] space-y-2">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12" />
                                {['8-10 AM', '10-12 PM', '1-3 PM', '3-5 PM'].map((time) => (
                                    <div key={time} className="flex-1 text-center text-[10px] font-black text-engineering-white/30 uppercase tracking-[0.2em]">{time}</div>
                                ))}
                            </div>
                            {mockData.map((row) => (
                                <div key={row.day} className="flex items-center gap-4">
                                    <div className="w-12 text-xs font-black text-engineering-white/80 uppercase tracking-widest">{row.day}</div>
                                    {Object.entries(row).filter(([k]) => k !== 'day').map(([time, val], i) => (
                                        <motion.div
                                            key={time}
                                            whileHover={{ scale: 0.98, opacity: 0.9 }}
                                            className={`flex-1 h-32 rounded-lg ${getColor(val)} transition-all flex flex-col items-center justify-center p-2 relative group cursor-pointer`}
                                        >
                                            <span className="text-engineering-black font-black text-2xl tracking-tighter opacity-80">{val}%</span>
                                            {val < 75 && (
                                                <div className="absolute top-2 right-2">
                                                    <AlertCircle size={14} className="text-engineering-black/40" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                                        </motion.div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Attendance Stats */}
                <div className="space-y-6">
                    <div className="engineering-glass p-8 border-none bg-red-500/10 border-l-4 border-l-red-500">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle size={24} className="text-red-500" />
                            <h3 className="text-xs font-black text-red-500 uppercase tracking-[0.2em]">Mandatory Warning</h3>
                        </div>
                        <p className="text-sm font-bold text-red-500/80 mb-6 leading-relaxed">
                            Lab sessions on Wednesday (3-5 PM) are consistently below the 75% Engineering University threshold.
                        </p>
                        <button className="w-full py-3 bg-red-500 text-engineering-white text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-colors">
                            Notify CSE HOD
                        </button>
                    </div>

                    <div className="engineering-glass p-8 border-none bg-white/5">
                        <h3 className="text-xs font-black text-engineering-white/40 uppercase tracking-[0.2em] mb-6">Course Compliance</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'DBMS Lab', val: '88%', status: 'Normal' },
                                { name: 'Operating Systems', val: '92%', status: 'Excellence' },
                                { name: 'Microprocessors', val: '76%', status: 'At Risk' },
                                { name: 'Power Systems', val: '84%', status: 'Normal' },
                            ].map((c) => (
                                <div key={c.name} className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold text-engineering-white">{c.name}</p>
                                        <p className="text-[10px] font-bold text-engineering-white/30 uppercase">{c.status}</p>
                                    </div>
                                    <div className="text-right text-lg font-black text-lemon-green italic">
                                        {c.val}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceHeatmap;
