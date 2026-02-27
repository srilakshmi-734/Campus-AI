import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    Users, GraduationCap, BookOpen, CalendarCheck,
    CreditCard, TrendingUp, AlertTriangle, CheckCircle,
    BarChart3, Zap,
} from 'lucide-react';

const stats = [
    { label: 'totalStudents', value: '2,847', icon: Users, color: '#7c3aed', glow: 'stat-glow-violet', change: '+12%' },
    { label: 'totalFaculty', value: '186', icon: GraduationCap, color: '#3b82f6', glow: 'stat-glow-blue', change: '+3%' },
    { label: 'activeCourses', value: '64', icon: BookOpen, color: '#10b981', glow: 'stat-glow-green', change: '+8%' },
    { label: 'avgAttendance', value: '82.4%', icon: CalendarCheck, color: '#f97316', glow: 'stat-glow-orange', change: '-1.2%' },
    { label: 'feesCollected', value: '₹48.2L', icon: CreditCard, color: '#7c3aed', glow: 'stat-glow-violet', change: '+18%' },
    { label: 'pendingFees', value: '₹12.5L', icon: AlertTriangle, color: '#ef4444', glow: 'stat-glow-orange', change: '-5%' },
];

const recentActivities = [
    { text: 'New student Arjun R. enrolled in CSE', time: '5 min ago', type: 'success' },
    { text: 'Lab booking approved for Prof. Meena', time: '12 min ago', type: 'info' },
    { text: '3 students flagged for low attendance', time: '30 min ago', type: 'warn' },
    { text: 'Fee reminder sent to 47 defaulters', time: '1 hr ago', type: 'info' },
    { text: 'Semester exam schedule published', time: '2 hrs ago', type: 'success' },
];

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

import { Reveal } from '../../components/Reveal';

export default function AdminDashboard() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            {/* Header */}
            <Reveal width="100%">
                <motion.div variants={item} initial="hidden" animate="show">
                    <h1 className="text-2xl font-bold gradient-text">{t('welcomeAdmin')} 👋</h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                        Campus University – College of Excellence
                    </p>
                </motion.div>
            </Reveal>

            {/* Stat Cards */}
            <Reveal width="100%" delay={0.3}>
                <motion.div
                    variants={container} initial="hidden" animate="show"
                    className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5"
                >
                    {stats.map(({ label, value, icon: Icon, color, glow, change }) => (
                        <motion.div key={label} variants={item}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className={`glass-card p-6 ${glow} cursor-default transition-all border border-white/5 relative overflow-hidden group`}
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
                            <div className="flex items-start justify-between mb-4 relative z-10">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                                    <Icon size={24} style={{ color }} />
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border shadow-sm ${change.startsWith('+') ? 'text-green-400 bg-green-400/5 border-green-400/20' : 'text-red-400 bg-red-400/5 border-red-400/20'
                                    }`}>
                                    {change}
                                </span>
                            </div>
                            <p className="text-3xl font-black text-[var(--text-primary)] tracking-tight">{value}</p>
                            <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mt-2">{t(label)}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </Reveal>


            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Reveal width="100%" delay={0.4}>
                    <motion.div variants={item} initial="hidden" animate="show" className="glass-card p-5 h-full">
                        <div className="flex items-center gap-2 mb-4">
                            <Zap size={18} className="text-violet-400" />
                            <h2 className="font-semibold text-sm">Recent Activity</h2>
                        </div>
                        <div className="space-y-3">
                            {recentActivities.map((a, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${a.type === 'success' ? 'bg-green-400' :
                                        a.type === 'warn' ? 'bg-yellow-400' : 'bg-blue-400'
                                        }`} />
                                    <div>
                                        <p className="text-sm text-[var(--text-primary)]">{a.text}</p>
                                        <p className="text-xs text-[var(--text-muted)]">{a.time}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Reveal>

                {/* Quick Stats */}
                <Reveal width="100%" delay={0.5}>
                    <motion.div variants={item} initial="hidden" animate="show" className="glass-card p-5 h-full">
                        <div className="flex items-center gap-2 mb-4">
                            <BarChart3 size={18} className="text-orange-400" />
                            <h2 className="font-semibold text-sm">Department Attendance</h2>
                        </div>
                        <div className="space-y-4">
                            {[
                                { dept: 'CSE', pct: 87, color: '#7c3aed' },
                                { dept: 'ECE', pct: 79, color: '#3b82f6' },
                                { dept: 'Mech', pct: 74, color: '#f97316' },
                                { dept: 'Civil', pct: 83, color: '#10b981' },
                                { dept: 'IT', pct: 88, color: '#ec4899' },
                            ].map(({ dept, pct, color }) => (
                                <div key={dept}>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-[var(--text-muted)]">{dept}</span>
                                        <span className="font-semibold" style={{ color }}>{pct}%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <motion.div
                                            className="progress-fill"
                                            style={{ background: color }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${pct}%` }}
                                            transition={{ duration: 0.8, delay: 0.2 }}
                                        />
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

