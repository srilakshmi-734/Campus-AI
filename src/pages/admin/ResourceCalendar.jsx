import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    BookOpen,
    Calendar,
    Cpu,
    HardDrive,
    Settings,
    ChevronLeft,
    ChevronRight,
    Clock,
    MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';

const ResourceCalendar = () => {
    const { t } = useTranslation();

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dates = Array.from({ length: 35 }, (_, i) => ({
        day: i + 1,
        events: i === 14 ? ['B.Tech DBMS Lab'] : i === 17 ? ['VLSI Workshop'] : i === 22 ? ['NIRF Data Sync'] : []
    }));

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter text-engineering-white mb-2 uppercase">
                        CAD <span className="text-lemon-green italic">RESOURCES</span>
                    </h2>
                    <div className="flex items-center gap-4 text-xs font-bold text-engineering-white/40 uppercase tracking-widest">
                        <span className="flex items-center gap-2 pt-1"><HardDrive size={14} className="text-lemon-green" /> Infrastructure Core v9</span>
                        <span>Uptime: 100% (24/7)</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 engineering-glass border-none bg-white/5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                        Configure Assets
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Resource Sidebar */}
                <div className="space-y-6 lg:col-span-1">
                    <div className="engineering-glass p-6">
                        <h3 className="text-[10px] font-black uppercase text-lemon-green tracking-[0.3em] mb-6">Select Asset Class</h3>
                        <div className="space-y-2">
                            {[
                                { name: 'CAD Labs', icon: Cpu, count: 12 },
                                { name: 'Server Cluster', icon: HardDrive, count: 4 },
                                { name: 'Library Sync', icon: BookOpen, count: 1 },
                            ].map((item) => (
                                <button key={item.name} className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-lemon-green hover:text-engineering-black transition-all group">
                                    <div className="flex items-center gap-3">
                                        <item.icon size={16} />
                                        <span className="text-xs font-bold uppercase tracking-widest">{item.name}</span>
                                    </div>
                                    <span className="text-[10px] font-black opacity-40 group-hover:opacity-100">{item.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="engineering-glass p-6 border-none bg-white/5">
                        <h3 className="text-[10px] font-black uppercase text-engineering-white/40 tracking-[0.3em] mb-6">Upcoming Reservations</h3>
                        <div className="space-y-4">
                            {[
                                { title: 'DBMS Lab Slot', time: '10:00 AM', floor: 'L3-F4' },
                                { title: 'Project Demo', time: '02:30 PM', floor: 'C-Block' },
                            ].map((r, i) => (
                                <div key={i} className="flex gap-3 items-start border-l-2 border-lemon-green/30 pl-4 py-1">
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-engineering-white">{r.title}</p>
                                        <div className="flex items-center gap-3 text-[9px] font-black text-engineering-white/30 uppercase">
                                            <span className="flex items-center gap-1"><Clock size={10} /> {r.time}</span>
                                            <span className="flex items-center gap-1"><MapPin size={10} /> {r.floor}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Engineering Calendar */}
                <div className="lg:col-span-3 engineering-glass p-8">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                        <h3 className="text-sm font-black text-engineering-white uppercase tracking-[0.2em] italic underline decoration-lemon-green decoration-2 underline-offset-8">March 2026</h3>
                        <div className="flex gap-2">
                            <button className="p-2 border border-white/10 rounded hover:bg-white/5 transition-colors"><ChevronLeft size={16} /></button>
                            <button className="p-2 border border-white/10 rounded hover:bg-white/5 transition-colors"><ChevronRight size={16} /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden">
                        {days.map(d => (
                            <div key={d} className="bg-engineering-black p-4 text-center text-[10px] font-black text-engineering-white/30 uppercase tracking-[0.3em]">{d}</div>
                        ))}
                        {dates.map((d, i) => (
                            <div key={i} className={`bg-engineering-black/40 min-h-[100px] p-2 flex flex-col gap-1 hover:bg-white/5 transition-colors cursor-pointer group ${i < 4 || i > 31 ? 'opacity-20' : ''}`}>
                                <span className="text-[10px] font-black text-engineering-white group-hover:text-lemon-green">{d.day % 31 + 1}</span>
                                {d.events.map((e, j) => (
                                    <div key={j} className="text-[8px] font-black bg-lemon-green text-engineering-black p-1 rounded uppercase tracking-tighter truncate">
                                        {e}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourceCalendar;
