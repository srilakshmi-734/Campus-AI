import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    BarChart3,
    TrendingUp,
    Target,
    Award,
    Download,
    Share2,
    PieChart as PieChartIcon,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis
} from 'recharts';

const placementData = [
    { name: 'Tier 1 (Product)', value: 45, color: '#BCF000' },
    { name: 'Tier 2 (Service)', value: 35, color: 'rgba(188, 240, 0, 0.6)' },
    { name: 'Higher Studies', value: 15, color: 'rgba(188, 240, 0, 0.3)' },
    { name: 'Entrepreneurship', value: 5, color: 'rgba(188, 240, 0, 0.1)' },
];

const nirfData = [
    { subject: 'Teaching', A: 95, fullMark: 100 },
    { subject: 'Research', A: 82, fullMark: 100 },
    { subject: 'Graduation', A: 88, fullMark: 100 },
    { subject: 'Outreach', A: 75, fullMark: 100 },
    { subject: 'Perception', A: 91, fullMark: 100 },
];

const ReportsAnalytics = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter text-engineering-white mb-2 uppercase">
                        NIRF & <span className="text-lemon-green italic">ANALYTICS</span>
                    </h2>
                    <div className="flex items-center gap-4 text-xs font-bold text-engineering-white/40 uppercase tracking-widest">
                        <span className="flex items-center gap-2 pt-1"><Award size={14} className="text-lemon-green" /> National Institutional Ranking Framework</span>
                        <span>Data Cycle: 2026-Q1</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest text-engineering-white hover:bg-white/5 transition-colors">
                        <Share2 size={14} /> {t('export')}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-lemon-green text-engineering-black text-[10px] font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(188,240,0,0.4)] transition-all">
                        Submit to University
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* NIRF Spider Chart */}
                <div className="engineering-glass p-8">
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-lemon-green mb-8">{t('nirfMetrics')}</h3>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={nirfData}>
                                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                <PolarAngleAxis dataKey="subject" stroke="rgba(255,255,255,0.4)" fontSize={10} fontVariant="bold" />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="none" />
                                <Radar
                                    name="Institution"
                                    dataKey="A"
                                    stroke="#BCF000"
                                    fill="#BCF000"
                                    fillOpacity={0.4}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(188,240,0,0.2)' }}
                                    itemStyle={{ color: '#BCF000' }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Placement Pie Chart */}
                <div className="engineering-glass p-8">
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-lemon-green mb-8">{t('placementCharts')}</h3>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={placementData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {placementData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(188,240,0,0.2)', fontSize: '10px' }}
                                    itemStyle={{ color: '#BCF000' }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    formatter={(value) => <span className="text-[10px] font-black uppercase text-white/60 tracking-widest">{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Metric Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Publications', value: '142', sub: 'Q1 Journals', icon: BarChart3 },
                    { label: 'Patents filed', value: '28', sub: 'Last 12 Months', icon: Target },
                    { label: 'Student-to-Faculty', value: '1:15', sub: 'Global Standard', icon: Award },
                    { label: 'Placement ROI', value: '185%', sub: 'Avg Salary / Fee', icon: TrendingUp },
                ].map((m, i) => (
                    <div key={i} className="engineering-glass p-6 border-white/5 bg-white/5">
                        <div className="p-2 w-fit rounded bg-lemon-green/10 text-lemon-green mb-4">
                            <m.icon size={20} />
                        </div>
                        <p className="text-[10px] font-black text-engineering-white/30 uppercase tracking-[0.2em] mb-1">{m.label}</p>
                        <h4 className="text-2xl font-black text-engineering-white tracking-widest">{m.value}</h4>
                        <p className="text-[10px] font-bold text-lemon-green/60 uppercase">{m.sub}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportsAnalytics;
