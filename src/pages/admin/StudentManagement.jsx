import React, { useState, useEffect } from 'react';
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
    Plus,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/apiService';

const StudentManagement = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [department, setDepartment] = useState("");
    const [semester, setSemester] = useState("");

    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [submitting, setSubmitting] = useState(false);

    const fetchStudents = async () => {
        setLoading(true);

        try {
            const res = await api.get(
                `/api/admin/students?page=${page}&limit=10&search=${searchTerm}&department=${department}&semester=${semester}`
            );

            console.log("[fetchStudents] Raw API Response:", res.data);

            const students = res.data?.data || [];

            console.log("[fetchStudents] Extracted Students:", students);

            setStudents(students);
            setTotal(students.length);

        } catch (err) {
            console.error("[fetchStudents] Failed to fetch students:", err);

            if (err.response) {
                console.error("[fetchStudents] Error Response Data:", err.response.data);
                console.error("[fetchStudents] Error Status:", err.response.status);
            }

            setStudents([]);
            setTotal(0);

        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchStudents();
    }, [page, searchTerm, department, semester]);

    const handleAddStudent = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.post('/api/admin/create-user', {
                email: form.email,
                password: form.password,
                full_name: form.name,
                role: "student"
            });
            setShowAddModal(false);
            setForm({ name: '', email: '', password: '' });
            await fetchStudents();
            alert("Digital identity created successfully.");
        } catch (err) {
            alert(
                err.response?.data?.detail
                    ?.map(e => e.msg)
                    .join("\n") || "Operation failed"
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter text-engineering-white mb-2 uppercase">
                        STUDENT <span className="text-lemon-green italic">DATABASE</span>
                    </h2>
                    <div className="flex items-center gap-4 text-xs font-bold text-engineering-white/40 uppercase tracking-widest">
                        <span className="flex items-center gap-2 pt-1"><Users size={14} className="text-lemon-green" /> Total: {total} Students Enrolled</span>
                        <span>Batch: 2021-2025</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    {loading && (
                        <div className="flex items-center gap-2 px-4 py-2 text-[10px] font-black text-lemon-green uppercase tracking-[0.3em] animate-pulse italic">
                            Initializing Records...
                        </div>
                    )}
                    <button className="flex items-center gap-2 px-4 py-2 engineering-glass border-none bg-white/5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                        <Download size={14} /> {t('export')}
                    </button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-lemon-green text-engineering-black text-[10px] font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(188,240,0,0.4)] transition-all">
                        <Plus size={14} /> Add Student
                    </button>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-engineering-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="engineering-glass p-8 w-full max-w-md relative"
                        >
                            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-white/40 hover:text-white">
                                <X size={20} />
                            </button>
                            <h3 className="text-xl font-black text-white uppercase tracking-tighter italic mb-6">Create <span className="text-lemon-green">Student Node</span></h3>
                            <form onSubmit={handleAddStudent} className="space-y-4">
                                <input
                                    type="text" required placeholder="Full Name"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-lemon-green outline-none"
                                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                />
                                <input
                                    type="email" required placeholder="Institutional Email"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-lemon-green outline-none"
                                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                />
                                <input
                                    type="password" required placeholder="Access Password"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-lemon-green outline-none"
                                    value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                                />
                                <button
                                    type="submit" disabled={submitting}
                                    className="w-full py-4 bg-lemon-green text-engineering-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:scale-[1.02] transition-all disabled:opacity-50"
                                >
                                    {submitting ? "Initializing..." : "Register User"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

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
                    <select
                        value={department}
                        onChange={(e) => {
                            const val = e.target.value;
                            setDepartment(val === "All Departments" ? "" : val);
                            setPage(1);
                        }}
                        className={`bg-[#0a0a0a] border border-white/10 rounded-lg py-2 px-4 text-xs uppercase font-bold tracking-widest cursor-pointer focus:outline-none focus:border-lemon-green/50 
                        ${department ? "text-lemon-green border-lemon-green/40" : "text-engineering-white/60"}`}
                    >
                        <option value="" className="bg-[#0a0a0a] text-lemon-green">All Departments</option>
                        <option value="CSE" className="bg-[#0a0a0a] text-lemon-green">CSE</option>
                        <option value="ECE" className="bg-[#0a0a0a] text-lemon-green">ECE</option>
                        <option value="Mech" className="bg-[#0a0a0a] text-lemon-green">Mech</option>
                    </select>
                    <select
                        value={semester}
                        onChange={(e) => {
                            const val = e.target.value;
                            setSemester(val === "All Semesters" ? "" : val);
                            setPage(1);
                        }}
                        className={`bg-[#0a0a0a] border border-white/10 rounded-lg py-2 px-4 text-xs uppercase font-bold tracking-widest cursor-pointer focus:outline-none focus:border-lemon-green/50
                        ${semester ? "text-lemon-green border-lemon-green/40" : "text-engineering-white/60"}`}
                    >
                        <option value="" className="bg-[#0a0a0a] text-lemon-green">All Semesters</option>
                        <option value="5" className="bg-[#0a0a0a] text-lemon-green">5th Semester</option>
                        <option value="7" className="bg-[#0a0a0a] text-lemon-green">7th Semester</option>
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
                            {students.map((student) => (
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
                                            <span className="text-sm font-bold text-engineering-white">{student.name || student.full_name || 'N/A'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-bold text-engineering-white/60 tracking-widest">{student.dept || 'CSE'}-{student.sem || '5'}</span>
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
                                            <span className={`text-xs font-black ${parseInt(student.att || 80) < 75 ? 'text-red-500' : 'text-engineering-white'
                                                }`}>{student.att || '80%'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-black text-lemon-green italic">{student.cgpa || '---'}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${(student.status || 'Active') === 'Low Attendance' ? 'bg-red-500 animate-pulse' :
                                                (student.status || 'Active').includes('Lab') ? 'bg-lemon-green animate-pulse' : 'bg-blue-400'
                                                }`} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-engineering-white/60">{student.status || 'Active'}</span>
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
                    <span className="text-[10px] font-bold text-engineering-white/40 uppercase tracking-widest">
                        Showing {(page - 1) * 10 + 1}-{(page - 1) * 10 + students.length} Student Records
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className="p-2 engineering-glass border-none bg-white/5 text-engineering-white/30 disabled:opacity-30"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={students.length < 10}
                            className="p-2 engineering-glass border-none bg-white/5 text-lemon-green disabled:opacity-30"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentManagement;
