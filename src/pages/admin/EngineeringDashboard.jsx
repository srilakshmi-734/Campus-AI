import React from 'react';
import { useTranslation } from 'react-i18next';
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

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Welcome Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter text-engineering-white mb-2 uppercase">
                        INSTITUTIONAL <span className="text-lemon-green italic">OVERVIEW</span>
                    </h2>
                    <div className="flex items-center gap-4 text-xs font-bold text-engineering-white/40 uppercase tracking-widest">
                        <span className="flex items-center gap-2 pt-1"><Cpu size={14} className="text-lemon-green" /> Operational Intelligence Matrix</span>
                        <span>Update: Live Status</span>
                    </div>
                </div>
                <div className="hidden sm:flex gap-2">
                    <button className="px-4 py-2 engineering-glass border-none bg-white/5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                        Generate NIRF
                    </button>
                    <button className="px-4 py-2 bg-lemon-green text-engineering-black text-[10px] font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(188,240,0,0.4)] transition-all">
                        Real-time Sync
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title={t('totalStudents')} value="2,847" icon={Users} trend="+12.5%" color="lemon-green" />
                <StatCard title={t('feesCollected')} value="₹8.5Cr" icon={IndianRupee} trend="+4.2%" color="lemon-green" />
                <StatCard title={t('avgAttendance')} value="88.4%" icon={Activity} trend="+1.8%" color="lemon-green" />
                <StatCard title={t('activelabs')} value="42" icon={TrendingUp} trend="+3" color="lemon-green" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-2 engineering-glass p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-lemon-green">Department Revenue Analytics</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 text-[10px] text-engineering-white/50 uppercase font-black">
                                <div className="w-2 h-2 rounded-full bg-lemon-green" /> Revenue
                            </div>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="rgba(255,255,255,0.3)"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="rgba(255,255,255,0.3)"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(val) => `₹${val / 1000000}M`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#0A0A0A',
                                        border: '1px solid rgba(188,240,0,0.2)',
                                        borderRadius: '8px',
                                        fontSize: '12px'
                                    }}
                                    itemStyle={{ color: '#BCF000' }}
                                />
                                <Bar
                                    dataKey="revenue"
                                    fill="#BCF000"
                                    radius={[4, 4, 0, 0]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Action Items */}
                <div className="space-y-6">
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-engineering-white/60">{t('hodActions')}</h3>
                    <div className="space-y-4">
                        {[
                            { id: 'CSE-DBMS-01', title: 'DBMS Lab Equipment Sign-off', priority: 'High', type: 'Laboratory' },
                            { id: 'ECE-VLSI-04', title: 'VLSI Workshop Approval', priority: 'Medium', type: 'Workshop' },
                            { id: 'ADM-FEES-99', title: 'Final Semester Fee Reconciliation', priority: 'Critical', type: 'Finance' },
                        ].map((action, i) => (
                            <motion.div
                                key={action.id}
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
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-lemon-green mb-6">Placement Trend vNIRF</h3>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#BCF000" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#BCF000" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(188,240,0,0.2)' }}
                                    itemStyle={{ color: '#BCF000' }}
                                />
                                <Area type="monotone" dataKey="students" stroke="#BCF000" fillOpacity={1} fill="url(#colorStudents)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="engineering-glass p-8 border-none bg-lemon-green text-engineering-black">
                    <div className="flex items-center gap-3 mb-6">
                        <ShieldCheck size={28} />
                        <h3 className="font-black text-xl tracking-tighter uppercase italic">Institutional Standards</h3>
                    </div>
                    <p className="text-sm font-bold opacity-80 mb-6 leading-relaxed">
                        All academic protocols are being followed. Engineering University 75% attendance criteria and laboratory safety standards for the current semester are being monitored.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/10 p-4 rounded-xl">
                            <span className="text-[10px] uppercase font-black opacity-60">Avg Placement</span>
                            <p className="text-2xl font-black italic">92.4%</p>
                        </div>
                        <div className="bg-black/10 p-4 rounded-xl">
                            <span className="text-[10px] uppercase font-black opacity-60">Lab Uptime</span>
                            <p className="text-2xl font-black italic">100%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EngineeringDashboard;
