import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import {
    Users,
    IndianRupee,
    TrendingUp,
    Activity,
    ArrowUpRight,
    Zap,
    ShieldCheck,
    ChevronRight,
    Cpu
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../services/apiService';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area
} from 'recharts';

const data = [
    { name: 'CSE', revenue: 4500000, students: 640 },
    { name: 'ECE', revenue: 3200000, students: 580 },
    { name: 'Mech', revenue: 2800000, students: 520 },
    { name: 'Civil', revenue: 1800000, students: 480 },
    { name: 'IT', revenue: 3800000, students: 627 },
];

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="engineering-glass p-6 engineering-glass-hover"
    >
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl bg-${color}/10 text-${color}`}>
                <Icon size={24} />
            </div>
            <div className="flex items-center gap-1 text-lemon-green text-[10px] font-bold">
                <ArrowUpRight size={14} />
                {trend}
            </div>
        </div>
        <div className="space-y-1">
            <h3 className="text-engineering-white/50 text-[10px] uppercase tracking-widest font-bold font-clash">{title}</h3>
            <p className="text-3xl font-black text-engineering-white tracking-tighter">{value}</p>
        </div>
    </motion.div>
);

const EngineeringDashboard = () => {
    const { t } = useTranslation();
    const { userName } = useAuth();
    const displayName = userName ? userName.split(" ")[0] : "Admin";
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deptStats, setDeptStats] = useState([]);
    const [placementStats, setPlacementStats] = useState([]);

    useEffect(() => {
        const fetchDeptStats = async () => {
            try {
                const res = await api.get("/api/admin/department-stats");
                console.log("Department stats:", res.data);
                setDeptStats(res.data.data || []);
            } catch (error) {
                console.error("Failed to fetch department stats", error);
            }
        };
        fetchDeptStats();
    }, []);

    useEffect(() => {
        const fetchPlacementStats = async () => {
            try {
                const res = await api.get("/api/admin/placement-stats");
                setPlacementStats(res.data.data || []);
            } catch (error) {
                console.error("Failed to fetch placement stats", error);
            }
        };
        fetchPlacementStats();
    }, []);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await api.get("/api/admin/dashboard-stats");
                console.log("[EngineeringDashboard] API Response:", res.data);
                // Unpack StandardResponse: { success, data: { total_students, ... }, message }
                setData(res.data?.data || null);
            } catch (err) {
                console.error("Failed to fetch admin dashboard", err);
                setData(null);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    if (loading) return <div className="p-10 text-center text-engineering-white italic uppercase tracking-[0.3em]">Synching Neural Grid...</div>;
    if (!data) return <div className="p-10 text-center text-engineering-white italic uppercase tracking-[0.3em]">Grid Connection Lost.</div>;

    const stats = [
        { title: t('totalStudents'), value: data?.total_students ?? "---", icon: Users, trend: "+0%", color: "lemon-green" },
        { title: t('feesCollected'), value: data?.fees_collected != null ? `₹${data.fees_collected.toLocaleString()}` : "---", icon: IndianRupee, trend: "+0%", color: "lemon-green" },
        { title: t('avgAttendance'), value: data?.average_attendance != null ? `${data.average_attendance}%` : "---", icon: Activity, trend: "+0%", color: "lemon-green" },
        { title: t('activelabs'), value: data?.labs_in_session ?? "---", icon: TrendingUp, trend: "+0", color: "lemon-green" },
    ];

    const chartData = data.chartData || [];
    const activities = data.activities || [];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Welcome Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter text-engineering-white mb-2 uppercase">
                        WELCOME, <span className="text-lemon-green italic">{displayName}</span>
                    </h2>
                    <div className="flex items-center gap-4 text-xs font-bold text-engineering-white/40 uppercase tracking-widest">
                        <span className="flex items-center gap-2 pt-1"><Cpu size={14} className="text-lemon-green" /> Real-time System Status</span>
                        <span>Update: {loading ? 'Syncing...' : 'Online'}</span>
                    </div>
                </div>
                <div className="hidden sm:flex gap-2">
                    <button className="px-4 py-2 engineering-glass border-none bg-white/5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                        Ranking Reports
                    </button>
                    <button className="px-4 py-2 bg-lemon-green text-engineering-black text-[10px] font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(188,240,0,0.4)] transition-all">
                        Real-time Sync
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <StatCard
                        key={i}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon || Users}
                        trend={stat.trend}
                        color={stat.color || "lemon-green"}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-2 engineering-glass p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-lemon-green">Department Students & Fees</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 text-[10px] text-engineering-white/50 uppercase font-black">
                                <div className="w-2 h-2 rounded-full bg-lemon-green" /> Revenue
                            </div>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={deptStats} margin={{ bottom: 40 }}>
                                <XAxis
                                    dataKey="department"
                                    stroke="#BCF000"
                                    interval={0}
                                    tick={({ x, y, payload }) => {
                                        const words = payload.value.split(" ");
                                        const firstLine = words.slice(0, 2).join(" ");
                                        const secondLine = words.slice(2).join(" ");

                                        return (
                                            <text x={x} y={y + 10} textAnchor="middle" fill="#BCF000" fontSize={12}>
                                                <tspan x={x} dy="0">{firstLine}</tspan>
                                                <tspan x={x} dy="14">{secondLine}</tspan>
                                            </text>
                                        );
                                    }}
                                />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="students" fill="#BCF000" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Action Items */}
                <div className="space-y-6">
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-engineering-white/60">{t('hodActions')}</h3>
                    <div className="space-y-4">
                        {activities.map((action, i) => (
                            <motion.div
                                key={action.id || i}
                                whileHover={{ x: 5 }}
                                className="engineering-glass p-4 bg-white/5 hover:bg-white/10 group cursor-pointer transition-all border-white/5"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[9px] font-black text-lemon-green bg-lemon-green/10 px-2 py-0.5 rounded uppercase tracking-widest">{action.id}</span>
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${action.priority === 'Critical' ? 'bg-red-500/20 text-red-500' : 'bg-engineering-white/10 text-engineering-white/60'
                                        }`}>{action.priority}</span>
                                </div>
                                <p className="text-sm font-bold text-engineering-white mb-3">{action.title}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-engineering-white/40 font-bold uppercase">{action.type}</span>
                                    <ChevronRight size={14} className="text-lemon-green opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* NIRF & Placement Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="engineering-glass p-8 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <Zap size={120} />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-lemon-green mb-6">Placement Statistics</h3>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={placementStats}>
                                <XAxis dataKey="year" stroke="#BCF000" />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "rgba(0,0,0,0.85)",
                                        border: "1px solid rgba(188,240,0,0.3)",
                                        borderRadius: "8px",
                                        color: "#BCF000"
                                    }}
                                    labelStyle={{
                                        color: "#BCF000",
                                        fontWeight: "bold"
                                    }}
                                    itemStyle={{
                                        color: "#BCF000"
                                    }}
                                    cursor={{ stroke: "#BCF000", strokeWidth: 1 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="placed"
                                    stroke="#BCF000"
                                    strokeWidth={3}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="engineering-glass p-8 border-none bg-lemon-green text-engineering-black">
                    <div className="flex items-center gap-3 mb-6">
                        <ShieldCheck size={28} />
                        <h3 className="font-black text-xl tracking-tighter uppercase italic">Compliance Status</h3>
                    </div>
                    <p className="text-sm font-bold opacity-80 mb-6 leading-relaxed">
                        {data.complianceText || "All campus activities are being monitored. Engineering University 75% attendance criteria and laboratory safety protocols for the current semester are active."}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/10 p-4 rounded-xl">
                            <span className="text-[10px] uppercase font-black opacity-60">Avg Placement</span>
                            <p className="text-2xl font-black italic">{data.avgPlacement || "92.4%"}</p>
                        </div>
                        <div className="bg-black/10 p-4 rounded-xl">
                            <span className="text-[10px] uppercase font-black opacity-60">Lab Uptime</span>
                            <p className="text-2xl font-black italic">{data.labUptime || "100%"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EngineeringDashboard;
