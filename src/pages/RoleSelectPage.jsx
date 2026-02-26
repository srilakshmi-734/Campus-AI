import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Brain,
    ShieldCheck,
    GraduationCap,
    ArrowRight,
    Sparkles,
    BarChart3,
    MessageSquare,
    CreditCard,
    Calendar
} from 'lucide-react';

const stats = [
    { value: "128K+", label: "Active Students" },
    { value: "420+", label: "Partner Institutions" },
    { value: "3.8M+", label: "Attendance Records Processed" },
    { value: "99.4%", label: "Platform Uptime" },
];

const features = [
    {
        icon: MessageSquare,
        title: "AI Academic Assistant",
        desc: "Instant academic query resolution and intelligent student guidance."
    },
    {
        icon: Calendar,
        title: "Smart Attendance Tracking",
        desc: "Automated attendance monitoring with predictive insights."
    },
    {
        icon: CreditCard,
        title: "Digital Fee Management",
        desc: "Real-time fee tracking, reminders, and secure transactions."
    },
    {
        icon: BarChart3,
        title: "Performance Analytics",
        desc: "Advanced dashboards with CGPA and academic trend analysis."
    }
];

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

    const scrollToRoles = () => {
        document.getElementById("roles-section")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen text-white relative overflow-hidden"
            style={{
                background:
                    'radial-gradient(ellipse at top left, rgba(124,58,237,0.25) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(249,115,22,0.2) 0%, transparent 50%), linear-gradient(160deg, #07051a 0%, #110a2e 40%, #0d0820 100%)',
            }}
        >

            {/* HERO SECTION */}
            <section className="pt-28 pb-24 px-6 text-center max-w-5xl mx-auto relative z-10">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
                            style={{ background: 'linear-gradient(135deg, #7c3aed, #f97316)' }}>
                            <Brain size={32} />
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black mb-6">
                        The Intelligent Core of Modern Campus Management{" "}
                        {/* <span className="bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">
              AI Intelligence
            </span> */}
                    </h1>

                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                        CampusAI Hub centralizes academic operations, attendance tracking,
                        performance analytics, and financial management into one intelligent platform.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={scrollToRoles}
                        className="px-8 py-4 rounded-2xl font-semibold"
                        style={{ background: "linear-gradient(135deg, #7c3aed, #f97316)" }}
                    >
                        Get Started <ArrowRight size={18} className="inline ml-2" />
                    </motion.button>
                </motion.div>
            </section>

            {/* STATS */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
                        >
                            <div className="text-3xl font-bold">{stat.value}</div>
                            <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* FEATURES */}
            <section className="py-20 px-6">
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-black mb-4">
                        Intelligent Features for Modern Institutions
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        AI-driven automation designed to enhance campus efficiency.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={i}
                                whileHover={{ y: -8 }}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center"
                            >
                                <Icon className="mx-auto mb-4 text-violet-400" size={30} />
                                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* DASHBOARD PREVIEW */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 text-center">
                    <h3 className="text-2xl font-bold mb-8">
                        Real-Time Dashboard Insights
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: "Attendance Rate", value: "93%" },
                            { label: "Average CGPA", value: "8.9" },
                            { label: "Fee Collection", value: "₹4.6Cr" },
                            { label: "Active Courses", value: "186" },
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 rounded-2xl p-6">
                                <div className="text-2xl font-bold text-violet-400">
                                    {item.value}
                                </div>
                                <div className="text-xs text-gray-400 mt-2">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ROLE SELECTION */}
            <section id="roles-section" className="py-24 px-6">
                <h2 className="text-4xl font-black text-center mb-14">
                    Access Your Dashboard
                </h2>

                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    {roles.map((role) => {
                        const Icon = role.icon;
                        const isHovered = hovered === role.id;
                        const isSelected = selected === role.id;

                        return (
                            <motion.button
                                key={role.id}
                                whileHover={{ y: -8 }}
                                whileTap={{ scale: 0.97 }}
                                onHoverStart={() => setHovered(role.id)}
                                onHoverEnd={() => setHovered(null)}
                                onClick={() => handleSelect(role.id)}
                                className="relative rounded-3xl p-8 text-left"
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(20px)',
                                }}
                            >
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                                    style={{ background: role.gradient }}>
                                    <Icon size={28} />
                                </div>

                                <h3 className="text-2xl font-bold mb-2">{role.label}</h3>
                                <p className="text-gray-400 text-sm mb-6">{role.sub}</p>

                                <div className="space-y-2 mb-6">
                                    {role.features.map(f => (
                                        <div key={f} className="text-sm text-gray-300">• {f}</div>
                                    ))}
                                </div>

                                <div className="font-semibold text-sm"
                                    style={{ color: role.id === 'admin' ? '#a78bfa' : '#fb923c' }}>
                                    {isSelected ? "Redirecting..." : `Continue as ${role.label}`}
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </section>

        </div>
    );
}