import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { Brain, Eye, EyeOff, ShieldCheck, GraduationCap, ArrowRight, ArrowLeft, Zap, Shield, Fingerprint } from 'lucide-react';

const roleConfig = {
    admin: {
        label: 'Institutional Admin',
        Icon: ShieldCheck,
        color: '#BCF000',
        gradient: 'linear-gradient(135deg, #BCF000 0%, #8FB600 100%)',
        glow: 'rgba(188,240,0,0.3)',
        placeholder: 'admin@engineering.edu',
        namePlaceholder: 'Full Name',
        node: 'ADMIN-PORTAL'
    },
    student: {
        label: 'Engineering Student',
        Icon: GraduationCap,
        color: '#BCF000',
        gradient: 'linear-gradient(135deg, #F5F5F5 0%, #A3A3A3 100%)',
        glow: 'rgba(255,255,255,0.2)',
        placeholder: 'student@engineering.edu',
        namePlaceholder: 'Full Name',
        node: 'STUDENT-PORTAL'
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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (mode === 'signup' && !name.trim()) { setError('Validator: Name is required.'); return; }
        if (!email.trim()) { setError('Validator: Email is required.'); return; }
        if (password.length < 4) { setError('Validator: Password must be at least 4 characters.'); return; }

        setLoading(true);
        await new Promise(r => setTimeout(r, 800));

        // Use the name from the input if it's signup or if we have it, 
        // otherwise fall back to the email prefix or role label
        const displayName = name.trim() || email.split('@')[0].toUpperCase() || config.label;

        login({ role: roleParam, name: displayName });
        navigate(roleParam === 'admin' ? '/admin/dashboard' : '/student/dashboard');
    };

    return (
        <div className="min-h-screen flex relative overflow-hidden bg-engineering-black text-engineering-white font-outfit">
            {/* Background Layer */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center brightness-[0.2] saturate-[0.8] opacity-40 scale-105"
                style={{ backgroundImage: `url('/campus-bg.png')` }}
            />
            <div className="fixed inset-0 z-0 bg-gradient-to-br from-engineering-black via-transparent to-engineering-black/80 pointer-events-none" />

            {/* Left Panel – Asset Showcase */}
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
                    <p className="text-lemon-green/50 mb-12 text-[10px] font-black uppercase tracking-[0.5em] italic">Campus Management System</p>

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

            {/* Right Panel – Access Form */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    {/* Return Link */}
                    <Link to="/" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-engineering-white/40 hover:text-lemon-green transition-all group mb-10 italic">
                        <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" />
                        Go Back
                    </Link>

                    <div className="engineering-glass p-8 md:p-10 border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                            <Fingerprint size={100} className="text-lemon-green" />
                        </div>

                        {/* Mode Toggle */}
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

                        {/* Heading */}
                        <div className="mb-10">
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                                {mode === 'login' ? 'Login' : 'Create Account'}
                            </h2>
                            <p className="text-[10px] font-bold text-engineering-white/30 uppercase tracking-[0.3em] mt-2 italic">
                                Portal: <span className="text-lemon-green">{config.node}</span>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-engineering-white/40 uppercase tracking-[0.3em] italic">Your Full Name</label>
                                <div className="relative">
                                    <input type="text" value={name} onChange={e => setName(e.target.value)}
                                        placeholder={config.namePlaceholder}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm font-bold text-white outline-none focus:border-lemon-green focus:bg-white/10 transition-all italic"
                                    />
                                    <Shield className="absolute right-4 top-1/2 -translate-y-1/2 text-lemon-green/30" size={16} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-engineering-white/40 uppercase tracking-[0.3em] italic">Email Address</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                    placeholder={config.placeholder}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm font-bold text-white outline-none focus:border-lemon-green focus:bg-white/10 transition-all italic"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-engineering-white/40 uppercase tracking-[0.3em] italic">Password</label>
                                <div className="relative">
                                    <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 pr-14 text-sm font-bold text-white outline-none focus:border-lemon-green focus:bg-white/10 transition-all"
                                    />
                                    <button type="button" onClick={() => setShowPass(s => !s)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-engineering-white/20 hover:text-lemon-green transition-colors">
                                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Error Flash */}
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
                                    <div className="w-5 h-5 border-2 border-engineering-black border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={18} /></>
                                )}
                            </motion.button>
                        </form>
                    </div>

                    {/* Mode Link */}
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
