// eslint-disable-next-line no-unused-vars
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import {
    CalendarCheck, BookOpen, CreditCard, Award,
    Bell, Phone, Mail, UserCheck, Zap,
    AlertTriangle, GraduationCap,
    ArrowUpRight, Timer, MapPin, ExternalLink, Clock,
    BarChart3
} from 'lucide-react';
import {
    studentDetails, studentStats, semesterProgress,
    studentSchedule, studentNotices, campusDirectory
} from '../../utils/studentData';
import { Reveal } from '../../components/Reveal';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const iconMap = {
    CalendarCheck, BookOpen, CreditCard, Award, Bell, AlertTriangle, Zap
};

export default function StudentDashboard() {
    const { t } = useTranslation();
    const { userName } = useAuth();

    return (
        <div className="space-y-8 pb-12">
            {/* Engineering Hero Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <Reveal>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-lemon-green">
                            <GraduationCap size={24} />
                            <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-80">
                                Engineering Student Portal
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-engineering-white uppercase">
                            {t('welcomeStudent')}, <br />
                            <span className="text-lemon-green italic">{userName?.split(' ')[0] || studentDetails.name}</span>
                        </h1>
                        <p className="text-engineering-white/50 font-medium max-w-xl">
                            {studentDetails.dept} • Semester {studentDetails.sem} • {studentDetails.college}
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.4}>
                    <div className="engineering-glass p-4 flex items-center gap-4 border-lemon-green/20">
                        <div className="text-right">
                            <p className="text-[10px] uppercase font-black text-lemon-green tracking-widest">Enrollment ID</p>
                            <p className="font-mono text-sm text-engineering-white">{studentDetails.enrollmentId}</p>
                        </div>
                        <div className="w-[1px] h-8 bg-white/10" />
                        <div className="text-right">
                            <p className="text-[10px] uppercase font-black text-lemon-green tracking-widest">Batch</p>
                            <p className="font-mono text-sm text-engineering-white">{studentDetails.batch}</p>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Stats Grid */}
            <motion.div variants={container} initial="hidden" animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {studentStats.map((stat, i) => {
                    const Icon = iconMap[stat.icon] || GraduationCap;
                    return (
                        <motion.div
                            key={stat.label}
                            variants={item}
                            className={`engineering-glass p-6 group cursor-pointer transition-all duration-300 hover:border-lemon-green/40 hover:scale-[1.02] ${stat.glow}`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-white/5 text-engineering-white group-hover:text-lemon-green transition-colors">
                                    <Icon size={20} />
                                </div>
                                <div className="text-[10px] font-bold text-lemon-green bg-lemon-green/10 px-2 py-1 rounded">
                                    {stat.change}
                                </div>
                            </div>
                            <h3 className="text-xs font-bold text-engineering-white/50 uppercase tracking-widest mb-1">
                                {t(stat.label)}
                            </h3>
                            <p className="text-3xl font-black text-engineering-white tracking-tighter tabular-nums">
                                {stat.value}
                            </p>
                        </motion.div>
                    );
                })}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Activities */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Schedule */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Timer className="text-lemon-green" size={20} />
                                <h2 className="text-lg font-black uppercase tracking-tight text-engineering-white">
                                    {t('dailySchedule')}
                                </h2>
                            </div>
                            <span className="text-[10px] font-bold text-lemon-green uppercase tracking-widest">
                                {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                        <div className="space-y-3">
                            {studentSchedule.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className={`engineering-glass p-4 flex items-center justify-between group transition-all hover:bg-white/5 ${item.status === 'live' ? 'border-lemon-green/50 shadow-[0_0_20px_rgba(188,240,0,0.1)]' : 'border-white/5'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center border ${item.status === 'live' ? 'bg-lemon-green border-lemon-green text-engineering-black' : 'bg-white/5 border-white/10 text-engineering-white/40'
                                            }`}>
                                            <span className="text-[10px] font-black uppercase leading-none">{item.status === 'live' ? 'LIVE' : 'UP'}</span>
                                            <Clock size={14} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-engineering-white group-hover:text-lemon-green transition-colors uppercase tracking-tight">
                                                {item.subject}
                                            </h4>
                                            <p className="text-[11px] text-engineering-white/40 uppercase font-medium">
                                                {item.faculty} • {item.time}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-xs text-lemon-green font-bold justify-end">
                                            <MapPin size={12} />
                                            {item.room}
                                        </div>
                                        <p className="text-[10px] text-engineering-white/30 uppercase mt-1">Laminar Flow Lab</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Progress Section */}
                    <section className="engineering-glass p-8 border-lemon-green/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Zap size={120} className="text-lemon-green" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-lemon-green/10 text-lemon-green rounded-lg">
                                    <BarChart3 size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-black uppercase tracking-tight text-engineering-white">
                                        {t('semesterProgress')}
                                    </h2>
                                    <p className="text-xs text-engineering-white/40 uppercase tracking-widest font-bold">Week {semesterProgress.currentWeek} of {semesterProgress.totalWeeks}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-4xl font-black text-lemon-green tracking-tighter">{semesterProgress.pct}%</span>
                                    <span className="text-[10px] font-bold text-engineering-white/40 uppercase tracking-widest">Course Completion</span>
                                </div>
                                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[2px]">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${semesterProgress.pct}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full bg-lemon-green rounded-full shadow-[0_0_15px_rgba(188,240,0,0.5)]"
                                    />
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                                    <div className="p-3 border border-white/5 bg-white/2 rounded-lg text-center">
                                        <p className="text-[10px] font-bold text-engineering-white/30 uppercase mb-1">Days Left</p>
                                        <p className="text-xl font-black text-engineering-white">{semesterProgress.daysLeft}</p>
                                    </div>
                                    <div className="p-3 border border-white/5 bg-white/2 rounded-lg text-center font-mono">
                                        <p className="text-[10px] font-bold text-engineering-white/30 uppercase mb-1">Status</p>
                                        <p className="text-xs font-bold text-lemon-green uppercase">On Track</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    {/* Notices */}
                    <section className="engineering-glass p-6 border-white/10">
                        <div className="flex items-center gap-2 mb-6">
                            <Bell className="text-lemon-green" size={18} />
                            <h2 className="text-sm font-black uppercase tracking-widest text-engineering-white">
                                {t('noticeFeed')}
                            </h2>
                        </div>
                        <div className="space-y-6">
                            {studentNotices.map((notice, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className={`mt-1 shrink-0 w-2 h-2 rounded-full ${notice.type === 'warn' ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]' :
                                        notice.type === 'info' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' :
                                            'bg-lemon-green shadow-[0_0_8px_rgba(188,240,0,0.6)]'
                                        }`} />
                                    <div>
                                        <p className="text-xs font-bold text-engineering-white group-hover:text-lemon-green transition-colors leading-relaxed uppercase tracking-tight">
                                            {notice.text}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-[9px] uppercase font-black text-engineering-white/30 tracking-tight italic">
                                                {notice.category}
                                            </span>
                                            <span className="text-[9px] uppercase font-bold text-lemon-green/40">
                                                • {notice.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-3 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-engineering-white/50 hover:bg-lemon-green hover:text-engineering-black hover:border-lemon-green transition-all">
                            View Archive
                        </button>
                    </section>

                    {/* Quick Contacts */}
                    <section className="engineering-glass p-6 border-white/10">
                        <div className="flex items-center gap-2 mb-6">
                            <UserCheck className="text-lemon-green" size={18} />
                            <h2 className="text-sm font-black uppercase tracking-widest text-engineering-white">
                                {t('quickDirectory')}
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {campusDirectory.map((contact, i) => (
                                <div key={i} className="p-4 border border-white/5 bg-white/2 rounded-xl group hover:border-lemon-green/30 transition-all">
                                    <p className="text-[10px] font-bold text-lemon-green uppercase tracking-widest mb-1">{contact.role}</p>
                                    <p className="text-sm font-bold text-engineering-white mb-3 group-hover:translate-x-1 transition-transform uppercase tracking-tight">{contact.name}</p>
                                    <div className="flex gap-3">
                                        <button className="p-2 bg-white/5 rounded-lg text-engineering-white/40 hover:text-lemon-green hover:bg-lemon-green/10 transition-colors">
                                            <Mail size={14} />
                                        </button>
                                        <button className="p-2 bg-white/5 rounded-lg text-engineering-white/40 hover:text-lemon-green hover:bg-lemon-green/10 transition-colors">
                                            <Phone size={14} />
                                        </button>
                                        <button className="ml-auto p-2 bg-white/5 rounded-lg text-engineering-white/40 hover:text-lemon-green hover:bg-lemon-green/10 transition-colors">
                                            <ExternalLink size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
