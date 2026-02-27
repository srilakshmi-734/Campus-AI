import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Save, School, Bell, Globe } from 'lucide-react';

export default function AdminSettings() {
    const { t } = useTranslation();
    const [form, setForm] = useState({
        collegeName: 'Campus University – COE',
        address: 'Sardar Patel Road, Guindy, Chennai – 600025',
        phone: '+91-44-22359159',
        email: 'admin@campusuniv.edu',
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
        <div className="space-y-6 max-w-2xl">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-xl font-bold gradient-text">{t('settings')}</h1>
                <p className="text-xs text-[var(--text-muted)]">System configuration & preferences</p>
            </motion.div>

            <form onSubmit={handleSave} className="space-y-5">
                {/* College Info */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                    className="glass-card p-5 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <School size={18} className="text-violet-400" />
                        <h2 className="font-semibold text-sm">College Information</h2>
                    </div>
                    {[
                        { label: 'College Name', key: 'collegeName' },
                        { label: 'Address', key: 'address' },
                        { label: 'Phone', key: 'phone' },
                        { label: 'Email', key: 'email' },
                    ].map(({ label, key }) => (
                        <div key={key}>
                            <label className="block text-xs text-[var(--text-muted)] mb-1 font-medium uppercase tracking-wider">{label}</label>
                            <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                className="glass-input text-sm" />
                        </div>
                    ))}
                </motion.div>

                {/* System Preferences */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                    className="glass-card p-5 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Globe size={18} className="text-orange-400" />
                        <h2 className="font-semibold text-sm">System Preferences</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-[var(--text-muted)] mb-1 font-medium uppercase tracking-wider">Current Semester</label>
                            <select value={form.semester} onChange={e => setForm(f => ({ ...f, semester: e.target.value }))}
                                className="glass-input text-sm" style={{ background: 'var(--bg-card)' }}>
                                {['1', '2', '3', '4', '5', '6', '7', '8'].map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-[var(--text-muted)] mb-1 font-medium uppercase tracking-wider">SMS Credits</label>
                            <input value={form.smsCredits} onChange={e => setForm(f => ({ ...f, smsCredits: e.target.value }))}
                                className="glass-input text-sm" readOnly />
                        </div>
                    </div>
                </motion.div>

                {/* Notification Templates */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                    className="glass-card p-5 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Bell size={18} className="text-green-400" />
                        <h2 className="font-semibold text-sm">Notification Templates</h2>
                    </div>
                    {[
                        { label: 'Fee Reminder SMS', val: 'Dear {student_name}, your fee of ₹{amount} is due on {due_date}.' },
                        { label: 'Attendance Alert SMS', val: 'Alert: {student_name} attendance is {percentage}%. Action required.' },
                    ].map(({ label, val }) => (
                        <div key={label}>
                            <label className="block text-xs text-[var(--text-muted)] mb-1 font-medium uppercase tracking-wider">{label}</label>
                            <textarea defaultValue={val} rows={2}
                                className="glass-input text-sm resize-none" />
                        </div>
                    ))}
                </motion.div>

                {/* Save Button */}
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-gradient flex items-center gap-2 px-6 py-3 text-sm"
                    style={saved ? { background: '#10b981', boxShadow: '0 8px 24px rgba(16,185,129,0.4)' } : {}}
                >
                    <Save size={16} />
                    {saved ? '✓ Saved Successfully!' : 'Save Settings'}
                </motion.button>
            </form>
        </div>
    );
}
