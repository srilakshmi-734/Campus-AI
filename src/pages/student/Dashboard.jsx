// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import {
    CalendarCheck, BookOpen, CreditCard, Award,
    Bell, Phone, Mail, UserCheck, Zap,
    AlertTriangle, GraduationCap,
    ArrowUpRight
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
            {/* Premium Hero Row */}
            <Reveal width="100%">
                <div className="flex flex-col xl:flex-row gap-6">
                    <motion.div variants={item} initial="hidden" animate="show"
                        className="flex-1 glass-card p-8 border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-full -mr-40 -mt-40 transition-transform duration-1000 group-hover:scale-110" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 p-[1px] shadow-2xl">
                                <div className="w-full h-full rounded-[15px] bg-slate-900/80 flex items-center justify-center overflow-hidden">
                                    <span className="text-2xl font-black text-white italic">
                                        {userName?.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                            </div>
                            <div className="text-center md:text-left">
                                <h1 className="text-2xl font-black gradient-text uppercase tracking-tight leading-none mb-2">
                                    {t('welcomeStudent')}, {userName?.split(' ')[0]} 👋
                                </h1>
                                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-1">
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
                                        <GraduationCap size={12} className="text-violet-400" />
                                        <span className="text-[9px] font-black uppercase tracking-wider text-[var(--text-muted)]">
                                            {studentDetails.dept}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
                                        <Zap size={12} className="text-orange-400" />
                                        <span className="text-[9px] font-black uppercase tracking-wider text-[var(--text-muted)]">
                                            SEM {studentDetails.sem}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
                                        <UserCheck size={12} className="text-blue-400" />
                                        <span className="text-[9px] font-black uppercase tracking-wider text-[var(--text-muted)]">
                                            {studentDetails.enrollmentId}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Semester Progress Tracker */}
                    <motion.div variants={item} initial="hidden" animate="show" transition={{ delay: 0.2 }}
                        className="xl:w-1/3 glass-card p-6 border border-white/5 relative bg-gradient-to-br from-white/[0.02] to-transparent">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Semester Progress</h2>
                            <span className="text-xs font-black text-violet-400">{semesterProgress.pct}%</span>
                        </div>

                        <div className="relative h-2.5 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${semesterProgress.pct}%` }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-2.5 rounded-xl bg-white/2 border border-white/5 text-center">
                                <p className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Days Left</p>
                                <p className="text-lg font-black tracking-tight leading-none">{semesterProgress.daysLeft}</p>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white/2 border border-white/5 text-center">
                                <p className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Current Week</p>
                                <p className="text-lg font-black tracking-tight leading-none">{semesterProgress.currentWeek}/18</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Reveal>

            {/* Glowing Stat Cards */}
            <Reveal width="100%" delay={0.3}>
                <motion.div variants={container} initial="hidden" animate="show"
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {studentStats.map(({ label, value, change, icon, color, glow }) => {
                        const Icon = iconMap[icon];
                        return (
                            <motion.div key={label} variants={item}
                                whileHover={{ y: -4, scale: 1.02 }}
                                className={`glass-card p-5 border border-white/5 relative overflow-hidden group ${glow}`}>
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform" />

                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all group-hover:rotate-6"
                                        style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                                        <Icon size={20} style={{ color }} />
                                    </div>
                                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-lg border shadow-sm ${change.startsWith('+') ? 'text-green-400 bg-green-400/5 border-green-400/20' :
                                        'text-blue-400 bg-blue-400/5 border-blue-400/20'
                                        }`}>
                                        {change}
                                    </span>
                                </div>

                                <p className="text-3xl font-black tabular-nums tracking-tighter mb-0.5">{value}</p>
                                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest leading-none">{t(label)}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </Reveal>

            {/* Full Width Operational Schedule */}
            <Reveal width="100%" delay={0.4}>
                <motion.div className="glass-card p-8 border border-white/5 relative overflow-hidden group min-h-[400px]">
                    <div className="absolute top-0 left-0 w-1 h-full bg-violet-600/50" />

                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20 shadow-lg shrink-0">
                                <Timer size={24} className="text-violet-400" />
                            </div>
                            <div>
                                <h2 className="font-black text-lg uppercase tracking-tight italic">Daily Operational Schedule</h2>
                                <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest">Academic Roster · {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                            </div>
                        </div>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className="md:ml-auto flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-violet-400 bg-violet-500/5 px-6 py-2.5 rounded-full border border-violet-500/20 hover:bg-violet-500/10 transition-all">
                            Full Week View <ArrowUpRight size={14} />
                        </motion.button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {studentSchedule.map((c, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className={`relative flex items-center gap-6 p-6 rounded-[2rem] transition-all duration-500 border group/row ${c.status === 'live'
                                    ? 'bg-violet-600/10 border-violet-500/30 shadow-[0_0_30px_rgba(124,58,237,0.15)] bg-slate-900/40'
                                    : 'bg-white/2 border-white/5 hover:bg-white/5'
                                    }`}>

                                <div className="text-center min-w-[70px]">
                                    <p className={`text-base font-black tracking-tighter ${c.status === 'live' ? 'text-white' : 'text-violet-400'}`}>{c.time.split('–')[0]}</p>
                                    <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-tighter">{c.time.split('–')[1]}</p>
                                </div>

                                <div className="w-px h-10 bg-white/10" />

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <p className="font-black text-sm tracking-tight truncate group-hover/row:text-violet-400 transition-colors uppercase leading-none">{c.subject}</p>
                                        {c.status === 'live' && (
                                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                                                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
                                                <span className="text-[7px] font-black text-green-400 uppercase tracking-widest">LIVE</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-[10px] font-bold text-[var(--text-muted)] truncate uppercase tracking-[0.1em]">
                                        {c.faculty} <span className="opacity-20 mx-1">|</span> {c.room}
                                    </p>
                                </div>

                                <div className="hidden sm:block">
                                    <div className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-xl border transition-all ${c.status === 'completed' ? 'bg-green-400/5 text-green-400 border-green-400/20 backdrop-blur-md' :
                                        c.status === 'live' ? 'bg-violet-500 text-white border-transparent shadow-[0_8px_20px_rgba(124,58,237,0.4)]' :
                                            'bg-white/5 text-[var(--text-muted)] border-white/10'
                                        }`}>
                                        {c.status}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </Reveal>

            {/* Utility Row: Notices and Directory in One Line Properly */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Notice Center */}
                <Reveal width="100%" delay={0.5}>
                    <motion.div className="glass-card p-6 border border-white/5 shadow-xl relative bg-gradient-to-b from-orange-500/[0.03] to-transparent h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                                <Bell size={18} className="text-orange-400" />
                            </div>
                            <h2 className="font-black text-base uppercase tracking-tight">Institutional Feed</h2>
                        </div>
                        <div className="space-y-4 flex-1">
                            {studentNotices.slice(0, 3).map((n, i) => {
                                const NoticeIcon = iconMap[n.icon] || Bell;
                                return (
                                    <div key={i} className="flex items-start gap-4 p-5 rounded-3xl hover:bg-white/5 transition-all border border-white/5 group bg-white/2 cursor-default">
                                        <div className={`p-2.5 rounded-xl shadow-lg border shrink-0 ${n.type === 'success' ? 'bg-green-400/10 border-green-400/20 text-green-400' :
                                            n.type === 'warn' ? 'bg-red-400/10 border-red-400/20 text-red-400' :
                                                'bg-blue-400/10 border-blue-400/20 text-blue-400'
                                            }`}>
                                            <NoticeIcon size={14} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-black text-[var(--text-primary)] leading-tight uppercase tracking-tight group-hover:text-orange-400 transition-colors line-clamp-2">{n.text}</p>
                                            <div className="flex items-center gap-3 mt-3">
                                                <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest">{n.category}</span>
                                                <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest px-2">{n.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </Reveal>

                {/* Quick Directory */}
                <Reveal width="100%" delay={0.6}>
                    <motion.div className="glass-card p-6 border border-white/5 shadow-xl bg-gradient-to-br from-blue-500/[0.05] via-transparent to-violet-500/[0.05] h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                <UserCheck size={18} className="text-blue-400" />
                            </div>
                            <h2 className="font-black text-base uppercase tracking-tight">Quick Directory</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-4 flex-1">
                            {campusDirectory.slice(0, 3).map((contact, i) => (
                                <div key={i} className="p-5 rounded-[2rem] bg-slate-900/60 border border-white/5 hover:border-blue-500/30 transition-all group overflow-hidden relative">
                                    <div className="relative z-10 flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">{contact.role}</p>
                                            <p className="text-xs font-black uppercase tracking-tight text-white">{contact.name}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                                className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-blue-500/20 text-blue-400 flex items-center justify-center transition-all border border-white/10 shadow-lg">
                                                <Phone size={14} />
                                            </motion.button>
                                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                                className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-violet-500/20 text-violet-400 flex items-center justify-center transition-all border border-white/10 shadow-lg">
                                                <Mail size={14} />
                                            </motion.button>
                                        </div>
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
