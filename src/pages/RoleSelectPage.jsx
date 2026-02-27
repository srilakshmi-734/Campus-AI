import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import {
  Brain, ShieldCheck, GraduationCap, ArrowRight,
  MessageSquare, CreditCard, Calendar, BarChart3,
  Globe, Sun, Moon, LogIn, ChevronDown, Sparkles
} from 'lucide-react';
import Footer from '../components/Footer';

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
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [selected, setSelected] = useState(null);
  const [langOpen, setLangOpen] = useState(false);

  const handleSelect = (roleId) => {
    setSelected(roleId);
    setTimeout(() => navigate(`/login?role=${roleId}`), 350);
  };

  const switchLang = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const scrollToRoles = () => {
    document.getElementById("roles-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden"
      style={{
        background: 'radial-gradient(ellipse at top left, rgba(124,58,237,0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(249,115,22,0.12) 0%, transparent 50%), #050312',
      }}
    >
      {/* TOP NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #f97316)' }}>
            <Brain size={18} className="text-white" />
          </div>
          <span className="font-black text-lg tracking-tighter text-white uppercase italic">
            Campus<span className="bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">AI</span> Hub
          </span>
        </div>

        <div className="flex items-center gap-6">

          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <Globe size={14} className="text-gray-400" />
                <span>{i18n.language === 'ta' ? 'தமிழ்' : 'EN'}</span>
                <ChevronDown size={10} className="text-gray-500" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-32 glass-card overflow-hidden py-1 z-50">
                    <button onClick={() => switchLang('en')} className="w-full px-4 py-2 text-left text-[10px] font-bold hover:bg-white/5">English</button>
                    <button onClick={() => switchLang('ta')} className="w-full px-4 py-2 text-left text-[10px] font-bold hover:bg-white/5">தமிழ்</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-amber-400 hover:bg-white/10 transition-all">
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Login Button */}
            <button onClick={() => navigate('/login?role=student')}
              className="flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-500/20 hover:scale-105 transition-transform active:scale-95">
              <LogIn size={15} />
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-44 pb-24 px-6 text-center max-w-5xl mx-auto z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <Sparkles size={14} className="text-violet-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">The Future of Learning is Here</span>
            <Globe size={14} className="text-sky-400 ml-1" />
          </div>

          <h1 className="font-black uppercase tracking-tight italic leading-tight">

            {/* Main Title - Very Big */}
            <div className="text-6xl md:text-8xl">
              CAMPUS AI HUB
            </div>

            {/* Subtitle - Smaller */}
            <div className="mt-4 text-lg md:text-2xl font-semibold bg-gradient-to-r 
                            from-violet-400 via-fuchsia-400 to-orange-400 
                            bg-clip-text text-transparent">
              The Intelligent Core of Modern Campus Management
            </div>

          </h1>

          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            CampusAI Hub centralizes academic operations, attendance tracking, performance analytics, and financial management into one intelligent platform.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToRoles}
            className="px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 mx-auto shadow-2xl"
            style={{ background: "linear-gradient(135deg, #7c3aed, #f97316)" }}
          >
            Get Started <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </section>

      {/* ROLE SELECTION */}
      <section id="roles-section" className="py-24 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <h2 className="text-3xl md:text-4xl font-black text-center mb-16 uppercase tracking-[0.2em] italic">
          Access Your Dashboard
        </h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selected === role.id;

            return (
              <motion.button
                key={role.id}
                whileHover={{ y: -12, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(role.id)}
                className="relative rounded-[2.5rem] p-10 text-left overflow-hidden group border border-white/5 transition-colors hover:border-white/15"
                style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(40px)' }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full transition-transform duration-700 group-hover:scale-150" />

                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ background: role.gradient }}>
                  <Icon size={30} />
                </div>

                <h3 className="text-2xl font-black mb-3 uppercase tracking-tight italic">{role.label}</h3>
                <p className="text-gray-400 text-xs mb-8 font-medium leading-relaxed">{role.sub}</p>

                <div className="space-y-3 mb-10">
                  {role.features.map(f => (
                    <div key={f} className="text-[11px] font-bold text-gray-500 flex items-center gap-2 group-hover:text-gray-300 transition-colors uppercase tracking-wider italic">
                      <div className="w-1 h-1 rounded-full bg-violet-500" /> {f}
                    </div>
                  ))}
                </div>

                <div className="font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2"
                  style={{ color: role.id === 'admin' ? '#a78bfa' : '#fb923c' }}>
                  {isSelected ? "Redirecting..." : `Continue as ${role.label}`}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight italic">
              Intelligent Features for <br />
              <span className="bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">Modern Institutions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/2 border border-white/5 rounded-3xl p-8 hover:bg-white/5 transition-colors"
                >
                  <Icon className="mb-6 text-violet-400" size={28} />
                  <h3 className="text-sm font-black mb-3 uppercase tracking-wider">{feature.title}</h3>
                  <p className="text-gray-500 text-[11px] leading-relaxed font-medium uppercase">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-6xl font-black mb-2 tracking-tighter italic"
                style={{ background: 'linear-gradient(to bottom, #fff, #334155)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {stat.value}
              </div>
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}