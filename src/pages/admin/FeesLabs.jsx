import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Database,
    IndianRupee,
    Calendar,
    AlertTriangle,
    ExternalLink,
    Cpu,
    Bookmark,
    MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

const FeesLabs = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div>
                <h2 className="text-4xl font-black tracking-tighter text-engineering-white mb-2 uppercase">
                    FINANCE & <span className="text-lemon-green italic">LABS</span>
                </h2>
                <p className="text-xs font-bold text-engineering-white/40 uppercase tracking-widest">
                    Workshop Fees & Laboratory Resource Tracking
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Fee Defaulters Section */}
                <div className="engineering-glass p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-500/10 rounded-lg">
                                <AlertTriangle size={20} className="text-red-500" />
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-engineering-white">{t('defaulters')}</h3>
                        </div>
                        <span className="text-[10px] font-black text-red-500 bg-red-500/10 px-2 py-1 rounded">Action Required: 12</span>
                    </div>

                    <div className="space-y-4">
                        {[
                            { id: 'CS21B001', name: 'Ravi Teja', amount: '₹45,000', overdue: '15 Days', dept: 'CSE' },
                            { id: 'EC21B092', name: 'Ananya S', amount: '₹12,400', overdue: '22 Days', dept: 'ECE' },
                            { id: 'ME21B011', name: 'Karthik Raja', amount: '₹45,000', overdue: '10 Days', dept: 'Mech' },
                        ].map((d) => (
                            <div key={d.id} className="engineering-glass p-4 bg-white/5 border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-lemon-green tracking-widest">{d.id}</p>
                                        <p className="text-[10px] text-engineering-white/40 uppercase font-black">{d.dept}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-engineering-white">{d.name}</p>
                                        <p className="text-xs text-red-500/80 font-bold uppercase">{d.overdue} Overdue</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-engineering-white">{d.amount}</p>
                                    <div className="flex flex-col items-end gap-1 mt-1">
                                        <button className="text-[10px] font-black text-lemon-green uppercase tracking-widest hover:underline flex items-center gap-1">
                                            Pay Fees
                                        </button>
                                        <button className="text-[10px] font-black text-white/40 hover:text-lemon-green uppercase tracking-widest flex items-center gap-1 transition-colors group">
                                            <MessageSquare size={10} className="group-hover:animate-bounce" /> Send SMS Notify
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Workshop Bookings */}
                <div className="engineering-glass p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-lemon-green/10 rounded-lg">
                                <Cpu size={20} className="text-lemon-green" />
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-engineering-white">{t('workshopBookings')}</h3>
                        </div>
                        <button className="text-[10px] font-black text-lemon-green uppercase tracking-widest">View All</button>
                    </div>

                    <div className="space-y-6">
                        {[
                            { title: 'Generative AI for B.Tech', lab: 'Center for Excellence - Lab 4', date: 'March 15, 2026', capacity: '45/50' },
                            { title: 'Advanced VLSI Design', lab: 'Engineering Affiliate Lab', date: 'March 18, 2026', capacity: '28/30' },
                            { title: 'Formula Student CAD', lab: 'Mech Main CAD Lab', date: 'March 22, 2026', capacity: '12/60' },
                        ].map((w, i) => (
                            <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-lemon-green/30 hover:before:bg-lemon-green transition-all group">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="text-sm font-black text-engineering-white group-hover:text-lemon-green transition-colors">{w.title}</h4>
                                    <span className="text-[10px] font-bold text-engineering-white/40 bg-white/5 px-2 py-0.5 rounded uppercase">{w.capacity}</span>
                                </div>
                                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-engineering-white/50">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {w.date}</span>
                                    <span className="flex items-center gap-1"><Database size={12} /> {w.lab}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="engineering-glass p-6 bg-lemon-green text-engineering-black">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Total Lab Revenue</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black italic">₹4.2M</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Quarterly</span>
                    </div>
                </div>
                <div className="engineering-glass p-6 bg-white/5 border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-engineering-white/40">Active Lab Grants</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-engineering-white tracking-widest italic">18</span>
                        <span className="text-[10px] font-bold text-lemon-green uppercase tracking-widest">Projects</span>
                    </div>
                </div>
                <div className="engineering-glass p-6 bg-white/5 border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-engineering-white/40">Lab Downtime</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-engineering-white tracking-widest italic">0.2%</span>
                        <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Normal</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeesLabs;
