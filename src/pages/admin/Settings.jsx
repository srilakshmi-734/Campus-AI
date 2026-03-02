import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    Save,
    School,
    Bell,
    Globe,
    Shield,
    Database,
    Server,
    Zap,
    Cpu
} from 'lucide-react';

export default function AdminSettings() {
    const { t } = useTranslation();
    const [form, setForm] = useState({
        collegeName: 'Engineering University – COE',
        address: 'Main Campus Hub, Tech Corridor, IT City – 600025',
        phone: '+91-44-22350000',
        email: 'admin@engineeringuniv.edu',
        semester: '5',
        smsCredits: '5000',
    });
    const [saved, setSaved] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div>
                <h2 className="text-4xl font-black tracking-tighter text-engineering-white mb-2 uppercase">
                    SYSTEM <span className="text-lemon-green italic">SETTINGS</span>
                </h2>
                <p className="text-xs font-bold text-engineering-white/40 uppercase tracking-widest">
                    Manage institutional information and preferences
                </p>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* College Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="engineering-glass p-8 space-y-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-lemon-green/10 rounded-lg">
                            <School size={20} className="text-lemon-green" />
                        </div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-engineering-white">Institutional Profile</h3>
                    </div>

                    <div className="space-y-4">
                        {[
                            { label: 'University Name', key: 'collegeName', icon: Shield },
                            { label: 'Campus Address', key: 'address', icon: Globe },
                            { label: 'Contact Number', key: 'phone', icon: Zap },
                            { label: 'Admin Email', key: 'email', icon: Database },
                        ].map(({ label, key, icon: Icon }) => (
                            <div key={key} className="space-y-2">
                                <label className="flex items-center gap-2 text-[9px] font-black text-engineering-white/40 uppercase tracking-[0.3em] italic">
                                    <Icon size={10} className="text-lemon-green" />
                                    {label}
                                </label>
                                <input
                                    value={form[key]}
                                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm font-bold text-white outline-none focus:border-lemon-green/50 focus:bg-white/10 transition-all italic"
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="space-y-8">
                    {/* System Preferences */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="engineering-glass p-8 space-y-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-lemon-green/10 rounded-lg">
                                <Cpu size={20} className="text-lemon-green" />
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-engineering-white">System Parameters</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-engineering-white/40 uppercase tracking-[0.3em] italic">Active Semester</label>
                                <select
                                    value={form.semester}
                                    onChange={e => setForm(f => ({ ...f, semester: e.target.value }))}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3 text-sm font-bold text-lemon-green outline-none focus:border-lemon-green/50 transition-all cursor-pointer appearance-none"
                                >
                                    {['1', '2', '3', '4', '5', '6', '7', '8'].map(s => <option key={s} value={s} className="bg-engineering-black">Node {s}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-engineering-white/40 uppercase tracking-[0.3em] italic">SMS Credits</label>
                                <div className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm font-black text-white/50 italic flex items-center justify-between">
                                    {form.smsCredits}
                                    <Zap size={12} className="text-lemon-green" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Notification Templates */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
                        className="engineering-glass p-8 space-y-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-lemon-green/10 rounded-lg">
                                <Bell size={20} className="text-lemon-green" />
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-engineering-white">Notification Templates</h3>
                        </div>

                        <div className="space-y-4">
                            {[
                                { label: 'Fee Reminder Template', val: 'Dear {student_name}, your fee of ₹{amount} is due on {due_date}.' },
                                { label: 'Attendance Alert Template', val: 'Alert: {student_name} attendance is {percentage}%. Action required.' },
                            ].map(({ label, val }) => (
                                <div key={label} className="space-y-2">
                                    <label className="text-[9px] font-black text-engineering-white/40 uppercase tracking-[0.3em] italic">{label}</label>
                                    <textarea
                                        defaultValue={val}
                                        rows={2}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-xs font-bold text-white/70 outline-none focus:border-lemon-green/50 focus:bg-white/10 transition-all italic resize-none"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Save Button */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all flex items-center justify-center gap-3 ${saved ? 'bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'bg-lemon-green text-engineering-black'
                            }`}
                    >
                        <Save size={18} />
                        {saved ? 'Settings Saved' : 'Save System Settings'}
                    </motion.button>
                </div>
            </form>
        </div>
    );
}
