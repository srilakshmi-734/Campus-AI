import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
    GraduationCap,
    CalendarCheck,
    BookOpen,
    CreditCard,
    Award,
    Timer,
    Clock,
    MapPin,
    Bell,
    UserCheck,
    Mail,
    Phone,
    ExternalLink,
    Zap,
    BarChart3
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { Reveal } from "../../components/Reveal";
import api from "../../services/apiService";

import {
    studentDetails,
    studentStats,
    semesterProgress
} from "../../utils/studentData";

const iconMap = {
    CalendarCheck,
    BookOpen,
    CreditCard,
    Award
};

export default function StudentDashboard() {
    const { t } = useTranslation();
    const { userName } = useAuth();

    const [data, setData] = useState({
        studentDetails,
        studentStats,
        semesterProgress
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await api.get("/api/student/dashboard");

                const backendData = res?.data?.data || {};

                setData({
                    studentDetails: backendData.studentDetails || studentDetails,
                    studentStats: backendData.studentStats || studentStats,
                    semesterProgress:
                        backendData.semesterProgress || semesterProgress
                });
            } catch (err) {
                console.error("Student dashboard API failed, using fallback data");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="p-10 text-center text-engineering-white font-black uppercase tracking-[0.3em] animate-pulse">
                Syncing Neural Link...
            </div>
        );
    }

    const displayData = data || {};

    const displayName = userName ? userName.split(" ")[0] : "Student";

    return (
        <div className="space-y-8 pb-12">

            {/* Hero Section */}

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

                <Reveal>
                    <div className="space-y-2">

                        <div className="flex items-center gap-3 text-lemon-green">
                            <GraduationCap size={24} />
                            <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-80">
                                Engineering Student Portal
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-engineering-white uppercase">
                            {t("welcomeStudent")}, <br />
                            <span className="text-lemon-green italic">
                                {displayName}
                            </span>
                        </h1>

                        <p className="text-engineering-white/50 font-medium max-w-xl">
                            {displayData.studentDetails?.dept} • Semester{" "}
                            {displayData.studentDetails?.sem} •{" "}
                            {displayData.studentDetails?.college}
                        </p>

                    </div>
                </Reveal>

                <Reveal delay={0.4}>
                    <div className="engineering-glass p-4 flex items-center gap-4 border-lemon-green/20">

                        <div className="text-right">
                            <p className="text-[10px] uppercase font-black text-lemon-green tracking-widest">
                                Enrollment ID
                            </p>
                            <p className="font-mono text-sm text-engineering-white">
                                {displayData.studentDetails?.enrollmentId}
                            </p>
                        </div>

                        <div className="w-[1px] h-8 bg-white/10" />

                        <div className="text-right">
                            <p className="text-[10px] uppercase font-black text-lemon-green tracking-widest">
                                Batch
                            </p>
                            <p className="font-mono text-sm text-engineering-white">
                                {displayData.studentDetails?.batch}
                            </p>
                        </div>

                    </div>
                </Reveal>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {(displayData.studentStats || []).map((stat) => {

                    const Icon = iconMap[stat.icon] || GraduationCap;

                    return (

                        <div
                            key={stat.label}
                            className="engineering-glass p-6 group cursor-pointer transition-all duration-300 hover:border-lemon-green/40 hover:scale-[1.02]"
                        >

                            <div className="flex justify-between items-start mb-4">

                                <div className="p-3 rounded-xl bg-white/5 text-engineering-white group-hover:text-lemon-green transition-colors">
                                    <Icon size={20} />
                                </div>

                                <div className="text-[10px] font-bold text-lemon-green bg-lemon-green/10 px-2 py-1 rounded">
                                    {stat.change}
                                </div>

                            </div>

                            <h3 className="text-xs font-bold text-engineering-white/50 uppercase tracking-widest mb-1">
                                {t(stat.label)}
                            </h3>

                            <p className="text-3xl font-black text-engineering-white tracking-tighter tabular-nums">
                                {stat.value}
                            </p>

                        </div>

                    );
                })}

            </div>

            {/* Semester Progress */}

            <section className="engineering-glass p-8 border-lemon-green/20 relative overflow-hidden">

                <div className="flex items-center gap-3 mb-8">

                    <div className="p-2 bg-lemon-green/10 text-lemon-green rounded-lg">
                        <BarChart3 size={20} />
                    </div>

                    <div>
                        <h2 className="text-lg font-black uppercase tracking-tight text-engineering-white">
                            {t("semesterProgress")}
                        </h2>

                        <p className="text-xs text-engineering-white/40 uppercase tracking-widest font-bold">
                            Week {displayData.semesterProgress?.currentWeek} of{" "}
                            {displayData.semesterProgress?.totalWeeks}
                        </p>
                    </div>

                </div>

                <div className="space-y-6">

                    <div className="flex justify-between items-end mb-2">
                        <span className="text-4xl font-black text-lemon-green tracking-tighter">
                            {displayData.semesterProgress?.pct || 0}%
                        </span>
                    </div>

                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[2px]">

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{
                                width: `${displayData.semesterProgress?.pct || 0}%`
                            }}
                            transition={{ duration: 1.5 }}
                            className="h-full bg-lemon-green rounded-full shadow-[0_0_15px_rgba(188,240,0,0.5)]"
                        />

                    </div>

                </div>

            </section>

        </div>
    );
}