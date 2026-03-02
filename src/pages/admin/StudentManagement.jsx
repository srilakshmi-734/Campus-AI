import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Users,
    Search,
    Filter,
    Download,
    MoreVertical,
    GraduationCap,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    Plus
} from 'lucide-react';
import { motion } from 'framer-motion';

const mockStudents = [
    { id: 'CS21B123', name: 'Arun Kumar', dept: 'CSE', sem: '5th', att: '82%', cgpa: '8.4', status: 'In Lab (DBMS)' },
    { id: 'EC21B045', name: 'Lakshmi Priya', dept: 'ECE', sem: '5th', att: '91%', cgpa: '9.2', status: 'On Campus' },
    { id: 'ME21B008', name: 'Vivek Raj', dept: 'Mech', sem: '7th', att: '74%', cgpa: '7.8', status: 'Academic Probation' },
    { id: 'CV21B210', name: 'Divya Bharathi', dept: 'Civil', sem: '3rd', att: '88%', cgpa: '8.1', status: 'On Leave' },
    { id: 'CS21B124', name: 'Sanjay Dutt', dept: 'CSE', sem: '5th', att: '78%', cgpa: '7.5', status: 'In Lab (DBMS)' },
    { id: 'IT21B099', name: 'Meera Nair', dept: 'IT', sem: '5th', att: '85%', cgpa: '8.9', status: 'On Campus' },
    { id: 'EC21B046', name: 'Rohan Varma', dept: 'ECE', sem: '5th', att: '68%', cgpa: '7.2', status: 'Low Attendance' },
];

const StudentManagement = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter text-engineering-white mb-2 uppercase">
                        STUDENT <span className="text-lemon-green italic">CENTRAL</span>
                    </h2>
                    <div className="flex items-center gap-4 text-xs font-bold text-engineering-white/40 uppercase tracking-widest">
                        <span className="flex items-center gap-2 pt-1"><Users size={14} className="text-lemon-green" /> Total: 2,847 B.Tech Enrolled</span>
                        <span>Batch: 2021-2025</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 engineering-glass border-none bg-white/5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                        <Download size={14} /> {t('export')}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-lemon-green text-engineering-black text-[10px] font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(188,240,0,0.4)] transition-all">
                        <Plus size={14} /> Add Student
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="engineering-glass p-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-engineering-white/30" size={18} />
                    <input
                        type="text"
                        placeholder={t('search')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-lemon-green/50 text-engineering-white"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <select className="bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-xs text-engineering-white/60 focus:outline-none focus:border-lemon-green/50 uppercase font-bold tracking-widest cursor-pointer">
                        <option>All Departments</option>
                        <option>CSE</option>
                        <option>ECE</option>
                        <option>Mech</option>
                    </select>
                    <select className="bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-xs text-engineering-white/60 focus:outline-none focus:border-lemon-green/50 uppercase font-bold tracking-widest cursor-pointer">
                        <option>5th Semester</option>
                        <option>7th Semester</option>
                    </select>
                    <button className="p-2 engineering-glass border-none bg-white/5 hover:bg-white/10">
                        <Filter size={18} className="text-lemon-green" />
                    </button>
                </div>
            </div>

            {/* Students Table */}
            <div className="engineering-glass overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-engineering-white/40">{t('id')}</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-engineering-white/40">Student Name</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-engineering-white/40">{t('dept')}</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-engineering-white/40">Lab Att %</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-engineering-white/40">CGPA</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-engineering-white/40">{t('status')}</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-engineering-white/40 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {mockStudents.map((student) => (
                                <motion.tr
                                    key={student.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                                    className="group transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-black text-lemon-green tracking-widest leading-none">{student.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10">
                                                <GraduationCap size={16} className="text-engineering-white/40" />
                                            </div>
                                            <span className="text-sm font-bold text-engineering-white">{student.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-bold text-engineering-white/60 tracking-widest">{student.dept}-{student.sem}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 w-16 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${parseInt(student.att) < 75 ? 'bg-red-500' : 'bg-lemon-green'
                                                        }`}
                                                    style={{ width: student.att }}
                                                />
                                            </div>
                                            <span className={`text-xs font-black ${parseInt(student.att) < 75 ? 'text-red-500' : 'text-engineering-white'
                                                }`}>{student.att}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-black text-lemon-green italic">{student.cgpa}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${student.status === 'Low Attendance' ? 'bg-red-500 animate-pulse' :
                                                    student.status.includes('Lab') ? 'bg-lemon-green animate-pulse' : 'bg-blue-400'
                                                }`} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-engineering-white/60">{student.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:text-lemon-green transition-colors text-engineering-white/30">
                                                <ExternalLink size={16} />
                                            </button>
                                            <button className="p-2 hover:text-lemon-green transition-colors text-engineering-white/30">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 bg-white/5 flex items-center justify-between border-t border-white/10">
                    <span className="text-[10px] font-bold text-engineering-white/40 uppercase tracking-widest">Showing 1-7 of 2,847 Engineering Records</span>
                    <div className="flex gap-2">
                        <button className="p-2 engineering-glass border-none bg-white/5 text-engineering-white/30 disabled:opacity-30" disabled>
                            <ChevronLeft size={16} />
                        </button>
                        <button className="p-2 engineering-glass border-none bg-white/5 text-lemon-green">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentManagement;
