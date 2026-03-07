import { useState, useEffect } from 'react';
import api from '../../services/apiService';

// ... (inside AdminDashboard)
export default function AdminDashboard() {
    const { t } = useTranslation();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await api.get("/api/admin/dashboard");

                console.log("Dashboard API Response:", res.data);

                // Extract actual data from StandardResponse
                setData(res.data.data);

            } catch (err) {
                console.error("Failed to fetch admin dashboard", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    const displayStats = data?.stats || [];
    const displayActivities = data?.recentActivities || [];

    if (loading) return <div className="p-10 text-center text-[var(--text-muted)]">Synthesizing System Data...</div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <Reveal width="100%">
                <motion.div variants={item} initial="hidden" animate="show">
                    <h1 className="text-2xl font-bold gradient-text">{t('welcomeAdmin')} 👋</h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                        Engineering University – College of Excellence
                    </p>
                </motion.div>
            </Reveal>

            {/* Stat Cards */}
            <Reveal width="100%" delay={0.3}>
                <motion.div
                    variants={container} initial="hidden" animate="show"
                    className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5"
                >
                    {displayStats.map(({ label, value, icon: IconName, color, glow, change }) => {
                        const Icon = {
                            Users, GraduationCap, BookOpen, CalendarCheck,
                            CreditCard, AlertTriangle
                        }[IconName] || Zap;
                        return (
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
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border shadow-sm ${change?.startsWith('+') ? 'text-green-400 bg-green-400/5 border-green-400/20' : 'text-red-400 bg-red-400/5 border-red-400/20'
                                        }`}>
                                        {change}
                                    </span>
                                </div>
                                <p className="text-3xl font-black text-[var(--text-primary)] tracking-tight">{value}</p>
                                <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mt-2">{t(label)}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </Reveal>


            {/* Defaulter Control Node */}
            <Reveal width="100%" delay={0.4}>
                <motion.div variants={item} initial="hidden" animate="show" className="glass-card p-8 border-red-500/10 bg-red-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/5 to-transparent rounded-bl-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-1000" />

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                                <AlertTriangle size={32} className="text-red-500" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black tracking-tight text-white uppercase italic">Defaulter Control <span className="text-red-500">Node</span></h2>
                                <p className="text-[10px] text-red-500/50 font-black tracking-[0.3em] uppercase mt-1">Institutional Revenue Protection Protocol</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-12">
                            <div className="text-center">
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Critical Overdue</p>
                                <p className="text-2xl font-black text-white italic">12 <span className="text-xs text-red-500 not-italic">Students</span></p>
                            </div>
                            <div className="text-center border-x border-white/5 px-12">
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Total Outstanding</p>
                                <p className="text-2xl font-black text-lemon-green italic">₹4.2L</p>
                            </div>
                            <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-red-500 text-white font-black text-[10px] uppercase tracking-widest shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:scale-105 transition-all group">
                                <MessageSquare size={16} className="group-hover:animate-bounce" /> Broadcast SMS Reminder
                            </button>
                        </div>
                    </div>
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

