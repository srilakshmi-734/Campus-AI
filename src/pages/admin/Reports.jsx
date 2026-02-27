import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FileText, Download, BarChart3, Users, CreditCard, BookOpen } from 'lucide-react';

const reportTypes = [
    { title: 'Attendance Report', desc: 'Department & student-wise attendance analytics', icon: Users, color: '#7c3aed' },
    { title: 'Fee Collection Report', desc: 'Monthly fee collection and defaulter summary', icon: CreditCard, color: '#f97316' },
    { title: 'Academic Performance', desc: 'GPA distribution and course completion stats', icon: BookOpen, color: '#10b981' },
    { title: 'Faculty Report', desc: 'Teaching hours, ratings and workload analysis', icon: BarChart3, color: '#3b82f6' },
    { title: 'Resource Utilisation', desc: 'Lab bookings and hostel occupancy report', icon: FileText, color: '#ec4899' },
    { title: 'Annual Summary', desc: 'Full year comprehensive institutional report', icon: FileText, color: '#fbbf24' },
];

import { Reveal } from '../../components/Reveal';
import { exportToCSV } from '../../utils/exportUtils';

export default function AdminReports() {
    const { t } = useTranslation();

    const handleExport = (title, format) => {
        const dummyData = [
            { report: title, generatedAt: new Date().toLocaleString(), format: format },
            { key: 'Metric A', value: '85%' },
            { key: 'Metric B', value: '12%' },
        ];
        exportToCSV(dummyData, `${title.replace(/\s+/g, '_')}_Report`);
    };

    return (
        <div className="space-y-6">
            <Reveal width="100%">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-xl font-bold gradient-text">{t('reports')}</h1>
                    <p className="text-xs text-[var(--text-muted)]">Generate and export institutional reports</p>
                </motion.div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {reportTypes.map(({ title, desc, icon: Icon, color }, i) => (
                    <Reveal key={title} width="100%" delay={i * 0.1}>
                        <motion.div
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="glass-card p-6 space-y-5 cursor-pointer group h-full border border-white/5 hover:border-white/10 shadow-lg hover:shadow-2xl transition-all"
                        >
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner relative"
                                style={{ background: `${color}10` }}>
                                <div className="absolute inset-0 rounded-2xl opacity-20" style={{ background: color }} />
                                <Icon size={26} style={{ color }} className="relative z-10" />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-base tracking-tight">{title}</h3>
                                <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed font-medium">{desc}</p>
                            </div>
                            <div className="flex gap-2 pt-2">
                                <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                                    onClick={() => handleExport(title, 'PDF')}
                                    className="flex-1 flex items-center justify-center gap-2 text-xs py-2.5 rounded-xl font-bold transition-all shadow-md"
                                    style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                                    <Download size={14} /> PDF
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                                    onClick={() => handleExport(title, 'Excel')}
                                    className="flex-1 flex items-center justify-center gap-2 text-xs py-2.5 rounded-xl font-bold transition-all border border-white/10 hover:bg-white/5"
                                    style={{ color }}>
                                    <Download size={14} /> Excel
                                </motion.button>

                            </div>
                        </motion.div>
                    </Reveal>
                ))}
            </div>

        </div>
    );
}

