import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    LogOut,
    MessageSquare,
    Globe,
    Monitor,
    Brain
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
    const { i18n } = useTranslation();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLangToggle = () => {
        const langs = ['en', 'ta'];
        const nextIdx = (langs.indexOf(i18n.language) + 1) % langs.length;
        i18n.changeLanguage(langs[nextIdx]);
        localStorage.setItem('campusai_lang', langs[nextIdx]);
    };

    return (
        <div className="relative min-h-screen selection:bg-lemon-green selection:text-engineering-black overflow-x-hidden bg-engineering-black font-['Inter']">
            {/* Fullscreen Campus Background */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center transition-all duration-1000 brightness-[0.2] saturate-[0.8]"
                style={{ backgroundImage: `url('/campus-bg.png')` }}
            />
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-engineering-black/60 via-transparent to-engineering-black/95 pointer-events-none" />

            {/* Premium Sidebar */}
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileOpen={mobileOpen}
                onMobileClose={() => setMobileOpen(false)}
            />

            {/* Floating Support Chat */}
            <div className="fixed bottom-10 right-10 z-50">
                <button
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="p-5 bg-lemon-green text-engineering-black rounded-3xl shadow-lg hover:scale-110 transition-transform group"
                >
                    <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
                </button>

                <AnimatePresence>
                    {isChatOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 30, scale: 0.9 }}
                            className="fixed bottom-24 right-6 w-[40vw] h-[70vh] bg-black border border-white/10 rounded-2xl shadow-xl flex flex-col z-50"
                        >
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10 p-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-lemon-green animate-pulse" />
                                    <span className="font-black text-[10px] tracking-[0.3em] uppercase italic">Student Support</span>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto text-sm space-y-3 p-4 no-scrollbar font-bold uppercase tracking-tight italic">
                                <div className="bg-[#1a1a1a] p-4 border border-white/10 text-gray-200 rounded-2xl">
                                    Status: Connected. How can I assist you today?
                                </div>
                            </div>
                            <div className="border-t border-white/10 p-3 flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Ask something..."
                                    className="w-full bg-[#0f0f0f] border border-white/10 rounded-2xl py-3 px-4 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-lemon-green/50 text-white placeholder:text-gray-500"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Header Area */}
            <header className={`
                fixed top-0 right-0 z-30 px-10 py-8 flex justify-between items-center transition-all duration-300
                ${collapsed ? 'left-[100px]' : 'left-[280px]'}
                hidden md:flex bg-gradient-to-b from-engineering-black/80 to-transparent backdrop-blur-sm
            `}>
                <div>
                    <h2 className="text-xl font-black tracking-tighter text-white uppercase italic">
                        Student <span className="text-lemon-green">Portal</span>
                    </h2>
                    <p className="text-[10px] text-lemon-green/50 tracking-[0.4em] font-black uppercase mt-1">
                        Student Dashboard • Version 4.0
                    </p>
                </div>

                <div className="flex items-center gap-8">
                    <button
                        onClick={() => setIsChatOpen(!isChatOpen)}
                        className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                    >
                        <Brain size={16} className="text-lemon-green group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-lemon-green">AI Assistant</span>
                    </button>

                    <button
                        onClick={handleLangToggle}
                        className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-lemon-green/30 transition-all group"
                    >
                        <Globe size={16} className="text-lemon-green group-hover:rotate-12 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">{i18n.language}</span>
                    </button>

                    <button
                        onClick={() => { logout(); navigate('/'); }}
                        className="flex items-center gap-3 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all group"
                    >
                        <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Logout</span>
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className={`
                relative z-10 transition-all duration-300 min-h-screen
                ${collapsed ? 'md:ml-[100px]' : 'md:ml-[280px]'}
                pt-32 pb-20 px-6 md:px-12
            `}>
                <div className="max-w-[1600px] mx-auto w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;

