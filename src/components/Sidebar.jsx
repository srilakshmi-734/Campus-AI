import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard, Users, GraduationCap, BookOpen,
    CalendarCheck, CreditCard, BarChart3, Package,
    Settings, Brain, X, MessageSquare, Home, ChevronLeft, ChevronRight,
    User, Database
} from 'lucide-react';

const adminNav = [
    { key: 'dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { key: 'courses', icon: BookOpen, path: '/admin/courses' },
    { key: 'students', icon: Users, path: '/admin/students' },
    { key: 'faculty', icon: GraduationCap, path: '/admin/faculty' },
    { key: 'feesLabs', icon: Database, path: '/admin/fees-labs' },
    { key: 'attendance', icon: CalendarCheck, path: '/admin/attendance' },
    { key: 'reports', icon: BarChart3, path: '/admin/reports' },
    { key: 'resources', icon: Package, path: '/admin/resources' },
    { key: 'settings', icon: Settings, path: '/admin/settings' },
];

const studentNav = [
    { key: 'dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
    { key: 'courses', icon: BookOpen, path: '/student/courses' },
    { key: 'attendance', icon: CalendarCheck, path: '/student/attendance' },
    { key: 'fees', icon: CreditCard, path: '/student/fees' },
    { key: 'settings', icon: Settings, path: '/student/settings' },
];

function SidebarItem({ item, collapsed, t }) {
    const location = useLocation();
    const isActive = location.pathname === item.path;

    return (
        <NavLink to={item.path} className="block group">
            <motion.div
                whileTap={{ scale: 0.98 }}
                className={`
                    relative flex items-center gap-4 px-4 py-4 m-2 rounded-2xl cursor-pointer
                    transition-all duration-300
                    ${isActive
                        ? 'bg-lemon-green text-engineering-black shadow-[0_0_20px_rgba(188,240,0,0.2)]'
                        : 'text-engineering-white/60 hover:text-white hover:bg-white/5'}
                `}
            >
                <item.icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    className="shrink-0 relative z-10"
                />

                <AnimatePresence initial={false}>
                    {!collapsed && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className={`text-[11px] font-black uppercase tracking-[0.2em] italic whitespace-nowrap relative z-10`}
                        >
                            {t(item.key)}
                        </motion.span>
                    )}
                </AnimatePresence>

                {isActive && (
                    <motion.div
                        layoutId="sidebar-active-pill"
                        className="absolute inset-y-0 -right-2 w-1.5 bg-lemon-green rounded-l-full shadow-[0_0_15px_rgba(188,240,0,0.8)]"
                    />
                )}
            </motion.div>
        </NavLink>
    );
}

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, onMobileClose }) {
    const { t } = useTranslation();
    const { role, userName } = useAuth();
    const navItems = role === 'admin' ? adminNav : studentNav;

    return (
        <>
            {/* Mobile Backdrop */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onMobileClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Main Sidebar Wrapper */}
            <motion.aside
                animate={{
                    width: collapsed ? 100 : 280,
                    x: mobileOpen ? 0 : (window.innerWidth < 768 ? -280 : 0)
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className={`
                    fixed left-0 top-0 h-screen z-[70] 
                    bg-engineering-black border-r border-white/5 
                    flex flex-col shadow-2xl
                `}
            >
                {/* Header Logo */}
                <div className="p-8 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-lemon-green flex items-center justify-center shadow-[0_0_20px_rgba(188,240,0,0.3)] shrink-0">
                        <Brain size={22} className="text-engineering-black" />
                    </div>
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="overflow-hidden"
                        >
                            <span className="font-black text-lg tracking-tighter text-white uppercase italic block">
                                Campus<span className="text-lemon-green">AI</span>
                            </span>
                        </motion.div>
                    )}
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 px-2 space-y-1 overflow-y-auto no-scrollbar py-4">
                    {navItems.map(item => (
                        <SidebarItem key={item.key} item={item} collapsed={collapsed} t={t} />
                    ))}
                </nav>

                {/* Footer Section */}
                <div className="p-4 border-t border-white/5 space-y-4">
                    {/* User Profile */}
                    <div className={`
                        flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5
                        ${collapsed ? 'justify-center px-0' : ''}
                    `}>
                        <div className="relative">
                            <div className="w-12 h-12 rounded-2xl bg-lemon-green flex items-center justify-center shadow-[0_0_15px_rgba(188,240,0,0.2)]">
                                <User size={24} className="text-engineering-black" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-lemon-green border-4 border-engineering-black shadow-inner" />
                        </div>

                        {!collapsed && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col overflow-hidden"
                            >
                                <span className="text-xs font-black text-white uppercase tracking-tighter italic truncate">
                                    {userName || 'LAKSHMI'}
                                </span>
                                <span className="text-[9px] font-black text-lemon-green uppercase tracking-widest leading-none mt-1">
                                    {role === 'admin' ? 'SYSTEM ADMIN' : '3RD YR • CSE'}
                                </span>
                            </motion.div>
                        )}
                    </div>

                    {/* Collapse Toggle */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-engineering-white/40 hover:text-white group"
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                        {!collapsed && (
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] ml-3">Collapse View</span>
                        )}
                    </button>
                </div>
            </motion.aside>
        </>
    );
}
