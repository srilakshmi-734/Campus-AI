import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import api from '../services/apiService';
import { Brain, Eye, EyeOff, ShieldCheck, GraduationCap, ArrowRight, ArrowLeft, Zap, Shield, Fingerprint } from 'lucide-react';

const roleConfig = {
    admin: {
        label: 'Admin Login',
        Icon: ShieldCheck,
        color: '#BCF000',
        gradient: 'linear-gradient(135deg, #BCF000 0%, #8FB600 100%)',
        glow: 'rgba(188,240,0,0.3)',
        placeholder: 'admin@engineering.edu',
        namePlaceholder: 'Full Name',
        node: 'ADMIN'
    },
    student: {
        label: 'Engineering Student',
        Icon: GraduationCap,
        color: '#BCF000',
        gradient: 'linear-gradient(135deg, #F5F5F5 0%, #A3A3A3 100%)',
        glow: 'rgba(255,255,255,0.2)',
        placeholder: 'student@engineering.edu',
        namePlaceholder: 'Full Name',
        node: 'STUDENT'
    },
};

export default function AuthPage() {
    const { t } = useTranslation();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const roleParam = params.get('role') || 'student';
    const config = roleConfig[roleParam] || roleConfig.student;

    const [mode, setMode] = useState('login');
    const [name, setName] = useState('');
    const [uniqueId, setUniqueId] = useState('');
    const [department, setDepartment] = useState('');
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [section, setSection] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const depts = ['Computer Science (CSE)', 'Electronics (ECE)', 'Mechanical (Mech)', 'Information Tech (IT)', 'Electrical (EEE)', 'Civil Engineering'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !email.includes('@')) { setError(t('invalidEmail')); return; }
        if (password.length < 8) { setError(t('passwordWeak')); return; }

        if (mode === 'signup') {
            if (!name.trim()) { setError('Full Name is required.'); return; }
            if (!uniqueId.trim()) { setError(`${roleParam === 'admin' ? t('employeeId') : t('studentId')} is required.`); return; }
            if (!department) { setError('Please select a department.'); return; }
            if (roleParam === 'student') {
                if (!year) { setError('Please select your year of study.'); return; }
                if (!semester) { setError('Please select your semester.'); return; }
                if (!section) { setError('Please select your section.'); return; }
                if (!mobile.trim() || mobile.length < 10) { setError('Please enter a valid 10-digit mobile number.'); return; }
            }
            if (!agreeTerms) { setError('You must agree to the Terms and Conditions.'); return; }
        }

        setLoading(true);

        try {
            let endpoint = "";
            let payload = { email, password };

            if (mode === 'signup') {
                endpoint = roleParam === 'admin' ? `/api/admin/register` : `/api/student/register`;
                payload.name = name;
            } else {
                endpoint = roleParam === 'admin' ? `/api/admin/login` : `/api/student/login`;
            }

            const response = await api.post(endpoint, payload);

            if (mode === 'login') {
                // User manual edit indicated response.data.data.access_token
                const token = response.data.data?.access_token || response.data.access_token;
                const backendRole = response.data.data?.role || response.data.role;

                localStorage.setItem('campusai_token', token);
                localStorage.setItem('campusai_role', backendRole);

                try {
                    const profileRes = await api.get('/api/auth/me');
                    const user = profileRes.data.data || profileRes.data;
                    const userRole = user.role ? user.role.toLowerCase() : (backendRole || roleParam).toLowerCase();

                    login({
                        token,
                        role: userRole,
                        name: name.trim(),
                        email: user.email || email
                    });

                    navigate(userRole === 'admin' ? '/admin/dashboard' : '/student/dashboard');
                } catch (profileErr) {
                    console.error("Profile fetch failed:", profileErr);
                    const finalRole = (backendRole || roleParam).toLowerCase();
                    login({
                        token,
                        role: finalRole,
                        name: name.trim(),
                        email: email
                    });
                    navigate(finalRole === 'admin' ? '/admin/dashboard' : '/student/dashboard');
                }
            } else {
                setMode('login');
                setError('');
            }
        } catch (err) {
            if (mode === 'login') {
                if (err.response?.status === 401) {
                    setError('Invalid email or password');
                } else if (!err.response) {
                    setError('Unable to connect to server');
                } else {
                    setError('Authentication failed');
                }
            } else {
                setError(err.response?.data?.detail || err.message || 'Registration failed');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex relative overflow-hidden bg-engineering-black text-engineering-white font-outfit">
            <div
                className="fixed inset-0 z-0 bg-cover bg-center brightness-[0.2] saturate-[0.8] opacity-40 scale-105"
                style={{ backgroundImage: `url('/campus-bg.png')` }}
            />
            <div className="fixed inset-0 z-0 bg-gradient-to-br from-engineering-black via-transparent to-engineering-black/80 pointer-events-none" />

            <div className="hidden lg:flex lg:w-[45%] flex-col items-center justify-center p-20 relative z-10 border-r border-white/5">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '32px 32px',
                    }} />

                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative text-center"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-24 h-24 rounded-[2rem] bg-lemon-green flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(188,240,0,0.3)]"
                    >
                        <Brain size={48} className="text-engineering-black" />
                    </motion.div>

                    <h1 className="text-5xl font-black text-white mb-4 tracking-tighter uppercase italic leading-none">
                        Campus<span className="text-lemon-green italic">AI</span> Hub
                    </h1>
                    <p className="text-lemon-green/50 mb-12 text-[10px] font-black uppercase tracking-[0.5em] italic">Campus Management Hub</p>

                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl mb-12 bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-[0.2em] italic shadow-2xl backdrop-blur-md">
                        <config.Icon size={16} className="text-lemon-green" />
                        {config.label} Portal
                    </div>

                    <div className="space-y-4 text-left max-w-sm mx-auto p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl">
                        {(roleParam === 'admin'
                            ? ['Cloud Synchronization', 'Asset Management', 'Fee Management', 'Policy Controls']
                            : ['Academic Records', 'Lab Access', 'Fee Portal', 'Knowledge Base']
                        ).map((f, i) => (
                            <motion.div key={f}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-engineering-white/40 italic group hover:text-white transition-colors"
                            >
                                <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 bg-lemon-green/10 text-lemon-green">
                                    <Zap size={10} />
                                </div>
                                {f}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <Link to="/" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-engineering-white/40 hover:text-lemon-green transition-all group mb-10 italic">
                        <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" />
                        Go Back
                    </Link>

                    <div className="engineering-glass p-8 md:p-10 border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                            <Fingerprint size={100} className="text-lemon-green" />
                        </div>

                        <div className="flex bg-white/5 p-1.5 rounded-2xl mb-10 border border-white/10">
                            {['login', 'signup'].map(m => (
                                <button key={m} onClick={() => { setMode(m); setError(''); }}
                                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${mode === m
                                        ? 'bg-lemon-green text-engineering-black shadow-[0_5px_20px_rgba(188,240,0,0.3)]'
                                        : 'text-engineering-white/40 hover:text-white'}`}>
                                    {m === 'login' ? 'Login' : 'Sign Up'}
                                </button>
                            ))}
                        </div>

                        <div className="mb-10">
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                                {mode === 'login' ? 'Login' : 'Create Account'}
                            </h2>
                            <p className="text-[10px] font-bold text-engineering-white/30 uppercase tracking-[0.3em] mt-2 italic">
                                Campus <span className="text-lemon-green">{config.node}</span>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <AnimatePresence mode="wait">
                                {mode === 'signup' ? (
                                    <motion.div
                                        key="signup-fields"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-4"
                                    >
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-black text-engineering-white/40 uppercase tracking-[0.3em] italic">{t('name')}</label>
                                            <div className="relative">
                                                <input type="text" value={name} onChange={e => setName(e.target.value)}
                                                    placeholder={config.namePlaceholder}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm font-bold text-white outline-none focus:border-lemon-green focus:bg-white/10 transition-all italic"
                                                />
                                                <Shield className="absolute right-4 top-1/2 -translate-y-1/2 text-lemon-green/30" size={16} />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[9px] font-black text-engineering-white/40 uppercase tracking-[0.3em] italic">
                                                {roleParam === 'admin' ? t('employeeId') : t('studentId')}
                                            </label>
                                            <input type="text" value={uniqueId} onChange={e => setUniqueId(e.target.value)}
                                                placeholder={roleParam === 'admin' ? 'EMP-XXXX' : 'EU-CSE-XXX'}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm font-bold text-white outline-none focus:border-lemon-green focus:bg-white/10 transition-all italic"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[9px] font-black text-engineering-white/40 uppercase tracking-[0.3em] italic">{t('department')}</label>
                                            <select value={department} onChange={e => setDepartment(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm font-bold text-white outline-none focus:border-lemon-green focus:bg-white/10 transition-all italic appearance-none"
                                            >
                                                <option value="" disabled className="bg-engineering-black">Select Department</option>
                                                {depts.map(d => <option key={d} value={d} className="bg-engineering-black">{d}</option>)}
                                            </select>
                                        </div>

                                        {roleParam === 'student' && (
                                            <>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] font-black text-engineering-white/40 uppercase tracking-[0.3em] italic">{t('yearOfStudy')}</label>
                                                        <select value={year} onChange={e => setYear(e.target.value)}
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm font-bold text-white outline-none focus:border-lemon-green focus:bg-white/10 transition-all italic appearance-none"
                                                        >
                                                            <option value="" disabled className="bg-engineering-black">Year</option>
                                                            {['1st Year', '2nd Year', '3rd Year', '4th Year'].map(y => <option key={y} value={y} className="bg-engineering-black">{y}</option>)}
                                                        </select>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] font-black text-engineering-white/40 uppercase tracking-[0.3em] italic">{t('semester')}</label>
                                                        <select value={semester} onChange={e => setSemester(e.target.value)}
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm font-bold text-white outline-none focus:border-lemon-green focus:bg-white/10 transition-all italic appearance-none"
                                                        >
                                                            <option value="" disabled className="bg-engineering-black">Sem</option>
                                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s} className="bg-engineering-black">Sem {s}</option>)}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] font-black text-engineering-white/40 uppercase tracking-[0.3em] italic">{t('section')}</label>
                                                        <select value={section} onChange={e => setSection(e.target.value)}
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm font-bold text-white outline-none focus:border-lemon-green focus:bg-white/10 transition-all italic appearance-none"
                                                        >
                                                            <option value="" disabled className="bg-engineering-black">Section</option>
                                                            {['A', 'B', 'C', 'D'].map(s => <option key={s} value={s} className="bg-engineering-black">Section {s}</option>)}
                                                        </select>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] font-black text-engineering-white/40 uppercase tracking-[0.3em] italic">{t('mobileNumber')}</label>
                                                        <input type="text" value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g, ''))}
                                                            placeholder="99XXXXXXXX"
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm font-bold text-white outline-none focus:border-lemon-green focus:bg-white/10 transition-all italic"
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="login-name"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-1"
                                    >
                                        <label className="text-[9px] font-black text-engineering-white/40 uppercase tracking-[0.3em] italic">{t('name')} (Session Name)</label>
                                        <input type="text" value={name} onChange={e => setName(e.target.value)}
                                            placeholder="Enter name for this session"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm font-bold text-white outline-none focus:border-lemon-green focus:bg-white/10 transition-all italic"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-engineering-white/40 uppercase tracking-[0.3em] italic">{t('email')}</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                    placeholder={config.placeholder}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm font-bold text-white outline-none focus:border-lemon-green focus:bg-white/10 transition-all italic"
                                />
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <label className="text-[9px] font-black text-engineering-white/40 uppercase tracking-[0.3em] italic">{t('password')}</label>
                                    {mode === 'login' && (
                                        <button type="button" className="text-[9px] font-bold text-lemon-green/60 hover:text-lemon-green uppercase tracking-widest transition-colors">
                                            {t('forgotPassword')}
                                        </button>
                                    )}
                                </div>
                                <div className="relative">
                                    <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 pr-14 text-sm font-bold text-white outline-none focus:border-lemon-green focus:bg-white/10 transition-all"
                                    />
                                    <button type="button" onClick={() => setShowPass(s => !s)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-engineering-white/20 hover:text-lemon-green transition-colors">
                                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-2">
                                {mode === 'login' ? (
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="hidden" />
                                        <div className={`w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center ${rememberMe ? 'bg-lemon-green border-lemon-green' : 'border-white/10 bg-white/5 group-hover:border-lemon-green/50'}`}>
                                            {rememberMe && <Shield size={12} className="text-engineering-black" />}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-engineering-white/40 group-hover:text-engineering-white transition-colors">{t('rememberMe')}</span>
                                    </label>
                                ) : (
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} className="hidden" />
                                        <div className={`w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center ${agreeTerms ? 'bg-lemon-green border-lemon-green' : 'border-white/10 bg-white/5 group-hover:border-lemon-green/50'}`}>
                                            {agreeTerms && <Shield size={12} className="text-engineering-black" />}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-engineering-white/40 group-hover:text-engineering-white transition-colors">{t('agreeTerms')}</span>
                                    </label>
                                )}
                            </div>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-[10px] font-black text-red-500 uppercase tracking-widest text-center italic"
                                    >
                                        [ERR] {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.button
                                type="submit" disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-5 rounded-xl bg-white text-engineering-black font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-lemon-green transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-engineering-black border-t-transparent rounded-full animate-spin" />
                                        <span>{mode === 'login' ? 'Signing in...' : 'Processing...'}</span>
                                    </div>
                                ) : (
                                    <>{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={18} /></>
                                )}
                            </motion.button>
                        </form>
                    </div>

                    <div className="mt-8 text-center flex flex-col items-center gap-4">
                        <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
                            className="text-[10px] font-black uppercase tracking-[0.2em] text-engineering-white/40 hover:text-lemon-green transition-colors italic">
                            {mode === 'login' ? 'New here? Create an account' : 'Already have an account? Login'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
