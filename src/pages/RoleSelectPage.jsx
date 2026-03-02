import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import {
  Brain, ShieldCheck, GraduationCap, ArrowRight,
  MessageSquare, CreditCard, Calendar, BarChart3,
  Globe, Sun, Moon, LogIn, ChevronDown, Sparkles, Monitor, Zap, Cpu
} from 'lucide-react';
import Footer from '../components/Footer';
import { Reveal } from '../components/Reveal';

const stats = [
  { value: "42K+", label: "Research Papers" },
  { value: "180+", label: "Tech Labs" },
  { value: "1.2M", label: "Monthly Users" },
  { value: "99.9%", label: "Uptime" },
];

const features = [
  {
    icon: Cpu,
    title: "Smart Management",
    desc: "AI-driven tools for efficient institutional administration."
  },
  {
    icon: Monitor,
    title: "Live Monitoring",
    desc: "Real-time tracking of lab resources and student attendance."
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    desc: "Safe and encrypted fee transactions and financial records."
  },
  {
    icon: Zap,
    title: "Quick Alerts",
    desc: "Instant notifications across all campus communication channels."
  }
];

const roles = [
  {
    id: 'admin',
    label: 'Admin Login',
    sub: 'Administrative access for faculty and staff',
    icon: ShieldCheck,
  },
  {
    id: 'student',
    label: 'Student Login',
    sub: 'Access your academic profile and courses',
    icon: GraduationCap,
  },
];

export default function RoleSelectPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [selected, setSelected] = useState(null);
  const [langOpen, setLangOpen] = useState(false);

  const handleSelect = (roleId) => {
    setSelected(roleId);
    setTimeout(() => navigate(`/login?role=${roleId}`), 400);
  };

  const switchLang = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const scrollToRoles = () => {
    document.getElementById("roles-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen text-engineering-white relative overflow-x-hidden bg-engineering-black selection:bg-lemon-green selection:text-engineering-black">

      {/* Background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center brightness-[0.25] saturate-[0.8] opacity-50"
        style={{ backgroundImage: `url('/campus-bg.png')` }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-engineering-black via-transparent to-engineering-black pointer-events-none" />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-lemon-green flex items-center justify-center shadow-[0_0_20px_rgba(188,240,0,0.3)]">
            <Brain size={22} className="text-engineering-black" />
          </div>
          <div>
            <span className="font-black text-xl tracking-tighter text-white uppercase italic block">
              Campus<span className="text-lemon-green">AI</span> Hub
            </span>
            <span className="text-[9px] font-black text-lemon-green/50 uppercase tracking-[0.4em]">
              Administration Suite V4
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate('/login?role=student')}
          className="px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] bg-white text-engineering-black hover:bg-lemon-green transition-all shadow-xl"
        >
          Get Started
        </button>
      </nav>

      <main className="relative z-10">

        {/* ================= HERO FULL SCREEN ================= */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center max-w-[1400px] mx-auto">
          <Reveal width="100%">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-lemon-green/10 border border-lemon-green/20 backdrop-blur-sm mb-10 mx-auto">
              <Sparkles size={14} className="text-lemon-green" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-lemon-green">
                Advanced Campus Management
              </span>
            </div>

            {/* BIG TITLE */}
            <h1 className="font-black uppercase tracking-tighter italic leading-none mb-8">
              <div className="text-[12vw] md:text-[9vw] lg:text-[8vw] text-white">
                CAMPUS<span className="text-lemon-green">AI</span>
              </div>
              <div className="text-[2.2vw] md:text-[1.8vw] tracking-[0.4em] mt-4 opacity-60">
                HUB
              </div>
            </h1>

            <p className="text-engineering-white/50 text-sm md:text-lg max-w-3xl mx-auto mb-12 font-medium leading-relaxed italic">
              The central management system for engineering institutions.
              Real-time monitoring, automated attendance, and digital governance.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToRoles}
              className="px-12 py-5 rounded-2xl bg-lemon-green text-engineering-black font-black uppercase tracking-widest text-[10px] shadow-[0_0_50px_rgba(188,240,0,0.2)] hover:bg-white transition-all flex items-center gap-3 mx-auto"
            >
              Login Options <ArrowRight size={18} />
            </motion.button>
          </Reveal>
        </section>

        {/* ================= ROLE SECTION (SMALLER) ================= */}
        <section
          id="roles-section"
          className="py-20 px-6 relative border-t border-white/5 bg-engineering-black/40"
        >
          <div className="max-w-[1200px] mx-auto">

            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-white">
                Select <span className="text-lemon-green">Login Mode</span>
              </h2>
              <p className="text-engineering-white/40 text-[10px] uppercase font-black tracking-[0.4em]">
                Please log in to access your portal
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selected === role.id;

                return (
                  <motion.button
                    key={role.id}
                    whileHover={{ y: -10 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(role.id)}
                    className="relative rounded-[2rem] p-8 text-left overflow-hidden group border border-white/10 hover:border-lemon-green/30 transition-all duration-500 engineering-glass"
                  >
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-engineering-black border border-white/10 group-hover:border-lemon-green group-hover:text-lemon-green transition-all">
                      <Icon size={28} />
                    </div>

                    <h3 className="text-2xl font-black mb-3 uppercase tracking-tighter italic text-white group-hover:text-lemon-green transition-colors">
                      {role.label}
                    </h3>

                    <p className="text-engineering-white/50 text-xs mb-6 font-bold leading-relaxed uppercase tracking-tight italic">
                      {role.sub}
                    </p>


                    <div className={`font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 transition-all duration-300 ${isSelected ? 'text-lemon-green' : 'text-engineering-white/40 group-hover:text-lemon-green'
                      }`}>
                      {isSelected ? "Redirecting..." : `Login as ${role.label.split(' ')[0]}`}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.button>
                );
              })}

            </div>
          </div>
        </section>

        {/* GEN Z BRANDING SECTION */}
        <section className="py-24 px-6 text-center border-t border-white/5 bg-engineering-black/20">
          <Reveal width="100%">
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic text-white mb-6">
              POWERED BY <span className="text-lemon-green">NEXT-GEN AI</span>
            </h1>
            <div className="w-20 h-1.5 bg-lemon-green mx-auto mb-10 rounded-full" />
            <p className="text-engineering-white/50 text-base md:text-xl max-w-2xl mx-auto font-bold leading-relaxed uppercase tracking-tight italic">
              Powered by AI, designed for Gen Z students across Tamil Nadu engineering colleges.
            </p>
          </Reveal>
        </section>

        {/* FEATURES GRID */}
        <section className="py-32 px-6 border-t border-white/5">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid md:grid-cols-4 gap-12">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-2xl w-fit group-hover:bg-lemon-green group-hover:text-engineering-black transition-all">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-xs font-black mb-4 uppercase tracking-[0.2em] text-white italic">{feature.title}</h3>
                    <p className="text-engineering-white/40 text-[11px] leading-relaxed font-bold uppercase tracking-tight">{feature.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-32 px-6 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-5xl md:text-7xl font-black mb-4 tracking-tighter italic text-white group-hover:text-lemon-green transition-colors">
                  {stat.value}
                </div>
                <div className="text-[9px] font-black text-engineering-white/30 uppercase tracking-[0.4em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}