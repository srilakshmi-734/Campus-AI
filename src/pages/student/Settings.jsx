import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Save, User, Bell, ShieldCheck, Camera, Settings2, Globe, Cpu, Fingerprint } from 'lucide-react';
import { Reveal } from '../../components/Reveal';

export default function StudentSettings() {
    const { t } = useTranslation();
    const { userName } = useAuth();

    const [form, setForm] = useState({
        name: userName || 'Engineering Student',
        email: 'student@engineering.edu',
        phone: '+91 98765 43210',
        rollNo: '24CSE001',
        dept: 'Computer Science & Engineering',
        sem: '5',
        notifyEmail: true,
        notifySMS: false,
        notifyAttendance: true,
        notifyFees: true,
    });
    const [saved, setSaved] = useState(false);

    const toggle = (key) => setForm(f => ({ ...f, [key]: !f[key] }));

    const handleSave = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-8 pb-12 text-engineering-white max-w-4xl">
            {/* Header Section */}
            <Reveal>
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-lemon-green">
                        <Settings2 size={24} />
                        <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-80">
                            Personal Preferences
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
                        {t('settings')}
                    </h1>
                    <p className="text-engineering-white/50 font-medium max-w-xl italic">
                        Profile & Notification Management
                    </p>
                </div>
            </Reveal>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="engineering-glass p-8 border-white/5 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Fingerprint size={120} className="text-lemon-green" />
                    </div>

                    <div className="relative z-10 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-lemon-green/10 rounded-lg text-lemon-green">
                                <User size={20} />
                            </div>
                            <h2 className="text-sm font-black uppercase tracking-widest italic text-white">Student Profile</h2>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="relative group/avatar">
                                <div className="w-24 h-24 rounded-2xl bg-white/5 border-2 border-dashed border-lemon-green/30 flex items-center justify-center text-4xl font-black text-lemon-green group-hover/avatar:border-lemon-green transition-all shadow-[0_0_30px_rgba(188,240,0,0.1)]">
                                    {form.name?.charAt(0) || 'E'}
                                </div>
                                <button type="button" className="absolute -bottom-2 -right-2 p-2 bg-lemon-green text-engineering-black rounded-lg shadow-lg hover:scale-110 transition-transform">
                                    <Camera size={14} />
                                </button>
                            </div>
                            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { label: 'Full Name', key: 'name', icon: User },
                                    { label: 'Email Address', key: 'email', icon: Globe },
                                    { label: 'Phone Number', key: 'phone', icon: Cpu },
                                    { label: 'Roll Number (Read Only)', key: 'rollNo', readOnly: true, icon: Fingerprint },
                                ].map(({ label, key, readOnly, icon: Icon }) => (
                                    <div key={key} className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-engineering-white/40 flex items-center gap-2">
                                            <Icon size={10} className="text-lemon-green" />
                                            {label}
                                        </label>
                                        <input
                                            value={form[key]}
                                            onChange={e => !readOnly && setForm(f => ({ ...f, [key]: e.target.value }))}
                                            readOnly={readOnly}
                                            className={`w-full bg-white/5 border ${readOnly ? 'border-white/5 opacity-50 cursor-not-allowed' : 'border-white/10 focus:border-lemon-green'} rounded-xl px-4 py-3 text-sm font-bold text-white transition-all outline-none`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Notifications */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="engineering-glass p-8 border-white/5 space-y-6"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-lemon-green/10 rounded-lg text-lemon-green">
                                <Bell size={20} />
                            </div>
                            <h2 className="text-sm font-black uppercase tracking-widest italic text-white">Notifications</h2>
                        </div>

                        <div className="space-y-4">
                            {[
                                { key: 'notifyEmail', label: 'Email Notifications' },
                                { key: 'notifySMS', label: 'SMS Alerts' },
                                { key: 'notifyAttendance', label: 'Attendance Warnings' },
                                { key: 'notifyFees', label: 'Fee Due Reminders' },
                            ].map(({ key, label }) => (
                                <div key={key} className="flex items-center justify-between p-4 bg-white/2 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                                    <span className="text-xs font-bold uppercase tracking-tight text-engineering-white/80">{label}</span>
                                    <button
                                        type="button"
                                        onClick={() => toggle(key)}
                                        className={`w-12 h-6 rounded-full transition-all duration-300 relative border ${form[key] ? 'bg-lemon-green border-lemon-green' : 'bg-white/5 border-white/10'}`}
                                    >
                                        <div className={`absolute top-1 w-3.5 h-3.5 rounded-sm transition-all duration-300 ${form[key] ? 'left-7 bg-engineering-black rotate-45' : 'left-1 bg-white/30 rotate-0'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Security & System */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="engineering-glass p-8 border-white/5 flex flex-col justify-between"
                    >
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-lemon-green/10 rounded-lg text-lemon-green">
                                    <ShieldCheck size={20} />
                                </div>
                                <h2 className="text-sm font-black uppercase tracking-widest italic text-white">Security Settings</h2>
                            </div>

                            <p className="text-xs text-engineering-white/50 leading-relaxed font-medium uppercase tracking-tight italic">
                                Last Login: <span className="text-lemon-green">02 MAR 2026 • 09:42 AM</span>
                                <br />Security Status: Active
                            </p>

                            <div className="space-y-3">
                                <button type="button" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white hover:text-engineering-black transition-all text-left">
                                    Change Password
                                </button>
                                <button type="button" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white hover:text-engineering-black transition-all text-left">
                                    Logout from all devices
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <button type="button" className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-400 transition-colors">
                                Delete Account
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-3 px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${saved ? 'bg-lemon-green text-engineering-black shadow-[0_0_40px_rgba(188,240,0,0.3)]' : 'bg-white text-engineering-black shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-lemon-green'}`}
                    >
                        <Save size={16} />
                        {saved ? 'Settings Saved' : 'Save Changes'}
                    </motion.button>
                </div>
            </form>
        </div>
    );
}
