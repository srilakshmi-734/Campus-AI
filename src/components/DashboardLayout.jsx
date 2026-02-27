import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AIChatbot from './AIChatbot';


const SIDEBAR_FULL = 260;
const SIDEBAR_COLLAPSED = 64;

export default function DashboardLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_FULL;

    return (
        <div className="page-bg min-h-screen">
            {/* Sidebar */}
            <Sidebar
                collapsed={collapsed}
                mobileOpen={mobileOpen}
                onMobileClose={() => setMobileOpen(false)}
            />

            {/* Navbar — passes sidebar toggle */}
            <Navbar
                onMenuToggle={() => setMobileOpen(o => !o)}
                sidebarCollapsed={collapsed}
                onSidebarToggle={() => setCollapsed(c => !c)}
            />

            {/* Main content — pushes right by sidebarWidth on desktop */}
            <motion.div
                animate={{ marginLeft: sidebarWidth }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="pt-[64px] min-h-screen hidden md:block"
            >
                <AnimatePresence mode="wait">
                    <motion.main
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="min-h-[calc(100vh-64px)] p-4 md:p-6"
                    >
                        <Outlet />
                    </motion.main>
                </AnimatePresence>
            </motion.div>

            {/* Mobile main content — no left margin (sidebar is overlay on mobile) */}
            <div className="pt-[64px] md:hidden min-h-screen">
                <AnimatePresence mode="wait">
                    <motion.main
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="min-h-[calc(100vh-64px)] p-4"
                    >
                        <Outlet />
                    </motion.main>
                </AnimatePresence>
            </div>

            {/* AI Assistant */}
            <AIChatbot />
        </div>
    );
}

