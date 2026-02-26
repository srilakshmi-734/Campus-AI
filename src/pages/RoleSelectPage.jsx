import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, ShieldCheck, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';

const roles = [
    {
        id: 'admin',
        label: 'Administrator',
        sub: 'Manage students, faculty, courses & reports',
        icon: ShieldCheck,
        gradient: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
        glow: 'rgba(124,58,237,0.5)',
        features: ['Full dashboard access', 'Student & faculty management', 'Reports & analytics'],
    },
    {
        id: 'student',
        label: 'Student',
        sub: 'View courses, attendance, fees & resources',
        icon: GraduationCap,
        gradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
        glow: 'rgba(249,115,22,0.5)',
        features: ['My courses & schedule', 'Attendance tracking', 'Fee management'],
    },
];

export default function RoleSelectPage() {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(null);
    const [selected, setSelected] = useState(null);

    const handleSelect = (roleId) => {
        setSelected(roleId);
        setTimeout(() => navigate(`/login?role=${roleId}`), 350);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
            style={{
                background: 'radial-gradient(ellipse at top left, rgba(124,58,237,0.25) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(249,115,22,0.2) 0%, transparent 50%), linear-gradient(160deg, #07051a 0%, #110a2e 40%, #0d0820 100%)',
            }}>

            {/* Animated background grid */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }} />

            {/* Floating orbs */}
            <motion.div
                animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-20 left-20 w-48 h-48 rounded-full blur-3xl opacity-20"
                style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
            <motion.div
                animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-20 right-20 w-64 h-64 rounded-full blur-3xl opacity-15"
                style={{ background: 'radial-gradient(circle, #f97316, transparent)' }} />
            <motion.div
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 left-10 w-32 h-32 rounded-full blur-3xl opacity-10"
                style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />

            <div className="relative z-10 w-full max-w-4xl px-4 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-center mb-12"
                >
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <motion.div
                            animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl"
                            style={{ background: 'linear-gradient(135deg, #7c3aed, #f97316)' }}
                        >
                            <Brain size={28} className="text-white" />
                        </motion.div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
                        Campus<span style={{
                            background: 'linear-gradient(135deg, #a78bfa, #fb923c)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>AI</span> Hub
                    </h1>
                    <p className="text-gray-400 text-base md:text-lg font-medium">
                        AI-Powered Campus Management System
                    </p>

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="mt-5 flex items-center justify-center gap-2"
                    >
                        <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.6))' }} />
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-violet-300 font-medium"
                            style={{ border: '1px solid rgba(124,58,237,0.3)', background: 'rgba(124,58,237,0.1)' }}>
                            <Sparkles size={11} />
                            Choose your role to continue
                        </div>
                        <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(249,115,22,0.6))' }} />
                    </motion.div>
                </motion.div>

                {/* Role Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {roles.map((role, i) => {
                        const Icon = role.icon;
                        const isHovered = hovered === role.id;
                        const isSelected = selected === role.id;

                        return (
                            <motion.button
                                key={role.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.15, duration: 0.5, ease: 'easeOut' }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onHoverStart={() => setHovered(role.id)}
                                onHoverEnd={() => setHovered(null)}
                                onClick={() => handleSelect(role.id)}
                                className="relative text-left rounded-3xl p-8 cursor-pointer overflow-hidden group"
                                style={{
                                    background: isHovered || isSelected
                                        ? 'rgba(255,255,255,0.08)'
                                        : 'rgba(255,255,255,0.04)',
                                    border: isHovered || isSelected
                                        ? `1px solid ${role.id === 'admin' ? 'rgba(124,58,237,0.6)' : 'rgba(249,115,22,0.6)'}`
                                        : '1px solid rgba(255,255,255,0.08)',
                                    boxShadow: isHovered || isSelected
                                        ? `0 20px 60px ${role.glow.replace('0.5', '0.3')}, inset 0 1px 0 rgba(255,255,255,0.1)`
                                        : '0 4px 24px rgba(0,0,0,0.3)',
                                    backdropFilter: 'blur(20px)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {/* Background gradient on hover */}
                                <motion.div
                                    animate={{ opacity: isHovered || isSelected ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 rounded-3xl"
                                    style={{ background: `radial-gradient(ellipse at top left, ${role.glow.replace('0.5', '0.12')} 0%, transparent 60%)` }}
                                />

                                {/* Icon */}
                                <motion.div
                                    animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl relative"
                                    style={{ background: role.gradient, boxShadow: isHovered ? `0 8px 32px ${role.glow}` : `0 4px 16px ${role.glow.replace('0.5', '0.3')}` }}
                                >
                                    <Icon size={30} className="text-white" strokeWidth={1.8} />
                                </motion.div>

                                {/* Label */}
                                <h2 className="text-2xl font-bold text-white mb-2 relative">{role.label}</h2>
                                <p className="text-sm text-gray-400 mb-6 leading-relaxed relative">{role.sub}</p>

                                {/* Features */}
                                <div className="space-y-2 relative mb-6">
                                    {role.features.map(f => (
                                        <div key={f} className="flex items-center gap-2 text-sm text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full"
                                                style={{ background: role.id === 'admin' ? '#a78bfa' : '#fb923c' }} />
                                            {f}
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <motion.div
                                    animate={{ x: isHovered ? 4 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-2 font-semibold text-sm relative"
                                    style={{ color: role.id === 'admin' ? '#a78bfa' : '#fb923c' }}
                                >
                                    {isSelected ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Redirecting...
                                        </span>
                                    ) : (
                                        <>Continue as {role.label} <ArrowRight size={16} /></>
                                    )}
                                </motion.div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Footer note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-center text-xs text-gray-600 mt-10"
                >
                </motion.p>
            </div>
        </div>
    );
}
