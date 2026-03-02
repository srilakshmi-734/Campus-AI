import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CreditCard, CheckCircle, AlertTriangle, Receipt, Download, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Reveal } from '../../components/Reveal';

const feeItems = [
    { label: 'Tuition Fee', amount: 45000, paid: true, dueDate: '2025-12-01', ref: 'TRX-9921' },
    { label: 'Hostel Fee', amount: 18000, paid: true, dueDate: '2025-12-01', ref: 'TRX-8832' },
    { label: 'Lab Fee', amount: 5000, paid: true, dueDate: '2026-01-15', ref: 'TRX-7741' },
    { label: 'Exam Fee', amount: 1500, paid: false, dueDate: '2026-03-10', ref: 'PENDING' },
    { label: 'Sports Fee', amount: 500, paid: true, dueDate: '2025-12-01', ref: 'TRX-6612' },
];

export default function StudentFees() {
    const { t } = useTranslation();
    const totalPaid = feeItems.filter(f => f.paid).reduce((s, f) => s + f.amount, 0);
    const totalDue = feeItems.filter(f => !f.paid).reduce((s, f) => s + f.amount, 0);

    return (
        <div className="space-y-8 pb-12 text-engineering-white">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <Reveal>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-lemon-green">
                            <Receipt size={24} />
                            <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-80">
                                Financial Ledger
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
                            {t('myFees')}
                        </h1>
                        <p className="text-engineering-white/50 font-medium max-w-xl italic">
                            Academic Session 2025-26 • Transaction History
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.4}>
                    <div className="engineering-glass p-4 border-white/10 flex items-center gap-4 group cursor-pointer hover:border-lemon-green/50 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-lemon-green/10 flex items-center justify-center text-lemon-green">
                            <Download size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-lemon-green">Tax Invoice</p>
                            <p className="text-sm font-bold uppercase tracking-tight text-white">Download All</p>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Financial Status Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="engineering-glass p-6 border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent group"
                >
                    <div className="flex justify-between items-center mb-4">
                        <div className="p-3 bg-lemon-green/10 rounded-xl text-lemon-green">
                            <TrendingUp size={20} />
                        </div>
                        <span className="text-[10px] font-bold text-lemon-green uppercase tracking-widest">98% Paid</span>
                    </div>
                    <p className="text-3xl font-black tracking-tighter text-white uppercase">₹{totalPaid.toLocaleString()}</p>
                    <p className="text-[10px] font-black text-engineering-white/40 uppercase tracking-widest mt-1">Total Disbursed</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`engineering-glass p-6 group ${totalDue > 0 ? 'border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.05)]' : 'border-lemon-green/20'}`}
                >
                    <div className="flex justify-between items-center mb-4">
                        <div className={`p-3 rounded-xl ${totalDue > 0 ? 'bg-red-500/10 text-red-400' : 'bg-lemon-green/10 text-lemon-green'}`}>
                            <AlertTriangle size={20} />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${totalDue > 0 ? 'text-red-400' : 'text-lemon-green'}`}>
                            {totalDue > 0 ? 'Payment Required' : 'Account Cleared'}
                        </span>
                    </div>
                    <p className={`text-3xl font-black tracking-tighter uppercase ${totalDue > 0 ? 'text-red-500' : 'text-white'}`}>
                        {totalDue > 0 ? `₹${totalDue.toLocaleString()}` : '0.00'}
                    </p>
                    <p className="text-[10px] font-black text-engineering-white/40 uppercase tracking-widest mt-1">Outstanding Balance</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="engineering-glass p-6 border-white/5 bg-gradient-to-tr from-lemon-green/[0.03] to-transparent group"
                >
                    <div className="flex justify-between items-center mb-4">
                        <div className="p-3 bg-white/5 rounded-xl text-white">
                            <CreditCard size={20} />
                        </div>
                        <span className="text-[10px] font-bold text-engineering-white/40 uppercase tracking-widest">Active Node</span>
                    </div>
                    <p className="text-3xl font-black tracking-tighter text-white uppercase italic">HDFC PB-90</p>
                    <p className="text-[10px] font-black text-engineering-white/40 uppercase tracking-widest mt-1">Primary Payment Source</p>
                </motion.div>
            </div>

            {/* Ledger Breakdown */}
            <Reveal delay={0.4}>
                <div className="engineering-glass border-white/10 overflow-hidden">
                    <div className="px-8 py-5 border-b border-white/5 bg-white/2 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Receipt size={18} className="text-lemon-green" />
                            <h2 className="text-sm font-black uppercase tracking-widest italic">Institutional Ledger Breakdown</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-lemon-green animate-pulse" />
                            <span className="text-[9px] font-black text-lemon-green uppercase tracking-widest">Gateway active</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/2">
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-engineering-white/40">Description</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-engineering-white/40">Amount</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-engineering-white/40">Reference Node</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-engineering-white/40">Deadline</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-engineering-white/40">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feeItems.map((f, i) => (
                                    <motion.tr
                                        key={f.label}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.05 }}
                                        className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-default"
                                    >
                                        <td className="px-8 py-6">
                                            <p className="font-bold text-sm uppercase tracking-tight group-hover:text-lemon-green transition-colors">{f.label}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="font-black text-base text-white">₹{f.amount.toLocaleString()}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[10px] font-mono text-engineering-white/50 bg-white/5 px-2 py-1 rounded border border-white/10 uppercase">{f.ref}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-[11px] font-bold text-engineering-white/60 uppercase">{f.dueDate}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            {f.paid ? (
                                                <div className="flex items-center gap-2 text-lemon-green">
                                                    <CheckCircle size={14} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">SUCCESS</span>
                                                </div>
                                            ) : (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-[0_8px_20px_rgba(239,68,68,0.2)] hover:bg-white hover:text-red-500 transition-all"
                                                >
                                                    Pay Now <ArrowUpRight size={12} />
                                                </motion.button>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Reveal>

            {/* Support Box */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-8 engineering-glass border-white/10 relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2 italic text-center md:text-left">Payment System Queries?</h3>
                    <p className="text-xs text-engineering-white/50 font-medium max-w-md text-center md:text-left uppercase tracking-tight leading-relaxed">
                        For institutional scholarships or payment node failure corrections, please contact the central bursar office at <span className="text-lemon-green font-black">finance@campusai.hub</span>
                    </p>
                </div>
                <button className="relative z-10 px-8 py-4 border border-lemon-green/30 text-lemon-green rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-lemon-green hover:text-engineering-black transition-all">
                    Open Support Ticket
                </button>
            </div>
        </div>
    );
}
