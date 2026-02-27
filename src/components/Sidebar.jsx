import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard, Users, GraduationCap, BookOpen,
    CalendarCheck, CreditCard, BarChart3, Package,
    Settings, Brain, X
} from 'lucide-react';

const adminNav = [
    { key: 'dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { key: 'students', icon: Users, path: '/admin/students' },
    { key: 'faculty', icon: GraduationCap, path: '/admin/faculty' },
    { key: 'courses', icon: BookOpen, path: '/admin/courses' },
    { key: 'attendance', icon: CalendarCheck, path: '/admin/attendance' },
    { key: 'fees', icon: CreditCard, path: '/admin/fees' },
    { key: 'reports', icon: BarChart3, path: '/admin/reports' },
    { key: 'resources', icon: Package, path: '/admin/resources' },
    { key: 'settings', icon: Settings, path: '/admin/settings' },
];

const studentNav = [
    { key: 'dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
    { key: 'courses', icon: BookOpen, path: '/student/courses' },
    { key: 'attendance', icon: CalendarCheck, path: '/student/attendance' },
    { key: 'fees', icon: CreditCard, path: '/student/fees' },
    { key: 'resources', icon: Package, path: '/student/resources' },
    { key: 'settings', icon: Settings, path: '/student/settings' },
];

function SidebarItem({ item, collapsed, t }) {
    const location = useLocation();
    const isActive = location.pathname === item.path;

    return (
        <NavLink to={item.path} title={collapsed ? t(item.key) : undefined} aria-label={t(item.key)}>
            <motion.div
                whileHover={{ x: collapsed ? 0 : 3 }}
                whileTap={{ scale: 0.96 }}
                className={`
          relative flex items-center gap-3 mx-2 my-0.5 rounded-xl cursor-pointer
          transition-colors duration-150
          ${collapsed ? 'px-0 py-3 justify-center' : 'px-4 py-3'}
          ${isActive ? 'sidebar-active text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}
        `}
                style={!isActive ? { ':hover': { background: 'rgba(124,58,237,0.08)' } } : {}}
            >
                {/* Hover bg */}
                {!isActive && (
                    <motion.div
                        className="absolute inset-0 rounded-xl"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        style={{ background: 'rgba(124,58,237,0.08)' }}
                    />
                )}

                {/* Active animated background */}
                {isActive && (
                    <motion.div
                        layoutId="activeHighlight"
                        className="absolute inset-0 rounded-xl"
                        style={{
                            background: 'linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(249,115,22,0.1) 100%)',
                            borderLeft: '3px solid #7c3aed',
                            boxShadow: '0 0 20px rgba(124,58,237,0.2)',
                        }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                )}

                <item.icon
                    size={18}
                    className={`shrink-0 relative z-10 transition-colors ${isActive ? 'text-violet-400' : ''
                        }`}
                />

                <AnimatePresence initial={false}>
                    {!collapsed && (
                        <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            className={`text-sm font-medium overflow-hidden whitespace-nowrap relative z-10 ${isActive ? 'text-white' : ''
                                }`}
                        >
                            {t(item.key)}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </NavLink>
    );
}

/**
 * Sidebar props:
 *  - collapsed (boolean): desktop collapse state
 *  - mobileOpen (boolean): mobile drawer open
 *  - onMobileClose: close mobile drawer
 */
export default function Sidebar({ collapsed, mobileOpen, onMobileClose }) {
    const { t } = useTranslation();
    const { role, userName } = useAuth();
    const navItems = role === 'admin' ? adminNav : studentNav;

    // Lock scroll on mobile drawer
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const sidebarBody = (isMobile = false) => (
        <div className="flex flex-col h-full">
            {/* Top: Logo + mobile close */}
            <div className={`flex items-center ${collapsed && !isMobile ? 'justify-center px-3' : 'justify-between px-5'} pt-5 pb-4`}>
                <div className={`flex items-center gap-2.5 ${collapsed && !isMobile ? '' : ''}`}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #f97316)' }}>
                        <Brain size={17} className="text-white" />
                    </div>
                    <AnimatePresence initial={false}>
                        {(!collapsed || isMobile) && (
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <p className="font-bold text-sm leading-tight text-white whitespace-nowrap">CampusAI</p>
                                <p className="text-[10px] text-gray-500 whitespace-nowrap">Hub</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                {isMobile && (
                    <button onClick={onMobileClose}
                        aria-label="Close sidebar"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                        <X size={18} />
                    </button>
                )}
            </div>

            {/* User badge */}
            <AnimatePresence initial={false}>
                {(!collapsed || isMobile) && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mx-3 mb-4 overflow-hidden"
                    >
                        <div className="px-3 py-2.5 rounded-xl"
                            style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">
                                {role === 'admin' ? 'Administrator' : 'Student Portal'}
                            </p>
                            <p className="text-sm font-semibold text-white truncate">{userName}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto overflow-x-hidden py-1 space-y-0.5">
                {navItems.map(item => (
                    <SidebarItem key={item.key} item={item} collapsed={collapsed && !isMobile} t={t} />
                ))}
            </nav>

            {/* Collapsed avatar (desktop) */}
            {collapsed && !isMobile && (
                <div className="flex justify-center pb-4 pt-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #f97316)' }}>
                        {userName.charAt(0)}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <>
            {/* ── Mobile backdrop ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        key="bd"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onMobileClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* ── Mobile drawer ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.aside
                        key="drawer"
                        initial={{ x: -280 }}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                        className="fixed left-0 top-0 h-screen w-[260px] z-50 md:hidden glass-sidebar"
                    >
                        {sidebarBody(true)}
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* ── Desktop sidebar (always rendered, width transitions) ── */}
            <motion.aside
                animate={{ width: collapsed ? 64 : 260 }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="hidden md:block fixed left-0 top-0 h-screen z-40 glass-sidebar overflow-hidden"
                style={{ width: collapsed ? 64 : 260 }}
            >
                {sidebarBody(false)}
            </motion.aside>
        </>
    );
}
