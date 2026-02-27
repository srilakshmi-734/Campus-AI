import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Plus, Eye, MessageSquare, Trash2, Download, TrendingUp } from 'lucide-react';
import { exportToCSV } from '../../utils/exportUtils';


const students = [
    { id: 'CS001', name: 'Arjun Kumar', dept: 'CSE', sem: 3, attendance: 87, fees: 0, status: 'active' },
    { id: 'CS002', name: 'Priya Rajan', dept: 'CSE', sem: 5, attendance: 65, fees: 18500, status: 'danger' },
    { id: 'EC001', name: 'Rahul Sharma', dept: 'ECE', sem: 3, attendance: 79, fees: 0, status: 'active' },
    { id: 'ME001', name: 'Sneha Vijay', dept: 'Mech', sem: 1, attendance: 72, fees: 9200, status: 'warning' },
    { id: 'CS003', name: 'Vikram Anand', dept: 'CSE', sem: 7, attendance: 91, fees: 0, status: 'active' },
    { id: 'EC002', name: 'Divya Mohan', dept: 'ECE', sem: 5, attendance: 58, fees: 22000, status: 'danger' },
    { id: 'ME002', name: 'Karthik Raj', dept: 'Mech', sem: 3, attendance: 83, fees: 0, status: 'active' },
    { id: 'IT001', name: 'Ananya Subramanian', dept: 'IT', sem: 5, attendance: 76, fees: 5000, status: 'warning' },
    { id: 'CS004', name: 'Surya Prakash', dept: 'CSE', sem: 1, attendance: 95, fees: 0, status: 'active' },
    { id: 'EC003', name: 'Meenakshi S.', dept: 'ECE', sem: 7, attendance: 88, fees: 0, status: 'active' },
];

const statusBadge = (s) => {
    const map = { active: 'badge-green', warning: 'badge-yellow', danger: 'badge-red' };
    return map[s] || 'badge-blue';
};

export default function AdminStudents() {
    const { t } = useTranslation();
    const [studentList, setStudentList] = useState(students);
    const [search, setSearch] = useState('');
    const [deptFilter, setDeptFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    const filtered = studentList.filter(s => {
        const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.id.toLowerCase().includes(search.toLowerCase());
        const matchDept = deptFilter === 'All' || s.dept === deptFilter;
        const matchStatus = statusFilter === 'All' || s.status === statusFilter;
        return matchSearch && matchDept && matchStatus;
    });

    const handleMessage = (name) => {
        alert(`Message interface for ${name} opened. Ready to type...`);
    };

    const handleDelete = (id) => {
        if (confirm(`Are you sure you want to remove student ${id}?`)) {
            setStudentList(prev => prev.filter(s => s.id !== id));
        }
    };


    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold gradient-text">{t('students')}</h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1">{filtered.length} total students enrolled</p>
                </div>
                <div className="flex items-center gap-3">
                    <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                        onClick={() => exportToCSV(filtered, 'Students_List')}
                        className="glass-card flex items-center gap-2 text-xs font-bold px-4 py-2.5 hover:bg-white/10 transition-all border border-white/10">
                        <Download size={14} /> Export
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                        className="btn-gradient flex items-center gap-2 text-xs font-bold px-5 py-2.5 shadow-lg shadow-violet-500/20">
                        <Plus size={16} /> Add Student
                    </motion.button>
                </div>
            </motion.div>

            {/* Filters bar */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="glass-card p-2 flex flex-col md:flex-row items-stretch md:items-center gap-2 border border-white/5">
                <div className="relative flex-1 group">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-violet-400 transition-colors" />
                    <input value={search} onChange={e => setSearch(e.target.value)}
                        placeholder={t('search')} className="glass-input text-sm pl-10 py-2.5 bg-transparent border-none" />
                </div>
                <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 glass-card px-3 py-1 border border-white/10">
                        <Filter size={14} className="text-violet-400" />
                        <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
                            className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer py-1.5 min-w-[80px]">
                            {['All', 'CSE', 'ECE', 'Mech', 'IT'].map(d => <option key={d} value={d} className="bg-[#1a1c2c]">{d === 'All' ? 'All Depts' : d}</option>)}
                        </select>
                    </div>
                    <div className="flex items-center gap-2 glass-card px-3 py-1 border border-white/10">
                        <TrendingUp size={14} className="text-orange-400" />
                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                            className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer py-1.5 min-w-[90px]">
                            {['All', 'active', 'warning', 'danger'].map(s => <option key={s} value={s} className="bg-[#1a1c2c] capitalize">{s === 'All' ? 'All Status' : s}</option>)}
                        </select>
                    </div>
                </div>

            </motion.div>

            {/* Main Table */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                className="glass-card border border-white/5 shadow-2xl relative">
                <div className="overflow-x-auto lg:overflow-x-hidden">
                    <table className="campus-table w-full table-fixed min-w-[1000px] lg:min-w-0">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/2">
                                <th className="text-left py-4 px-6 w-[100px] lg:w-[8%]">{t('id')}</th>
                                <th className="text-left py-4 px-6 w-[200px] lg:w-[22%]">{t('name_col')}</th>
                                <th className="text-left py-4 px-6 w-[100px] lg:w-[10%]">{t('dept')}</th>
                                <th className="text-left py-4 px-6 text-center w-[100px] lg:w-[10%]">{t('semester')}</th>
                                <th className="text-left py-4 px-6 w-[180px] lg:w-[15%]">Attendance</th>
                                <th className="text-left py-4 px-6 text-right w-[120px] lg:w-[12%]">Fees Status</th>
                                <th className="text-left py-4 px-6 text-center w-[120px] lg:w-[11%]">{t('status')}</th>
                                <th className="text-right py-4 px-6 w-[140px] lg:w-[12%]">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filtered.map((s, i) => (
                                <motion.tr key={s.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-white/5 transition-colors group"
                                >
                                    <td className="py-5 px-6 font-mono text-xs text-violet-400 font-black truncate">{s.id}</td>
                                    <td className="py-5 px-6 truncate">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-lg shrink-0"
                                                style={{ background: `linear-gradient(135deg, var(--accent-1), var(--accent-2))` }}>
                                                {s.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="font-extrabold text-xs tracking-tight uppercase group-hover:text-violet-400 transition-colors truncate">{s.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <span className="badge badge-blue text-[9px] font-black uppercase tracking-tighter">{s.dept}</span>
                                    </td>
                                    <td className="py-5 px-6 text-center font-black text-[10px] uppercase">SEM {s.sem}</td>
                                    <td className="py-5 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="progress-bar flex-1 h-1.5 bg-white/5 border border-white/5">
                                                <div className="progress-fill shadow-[0_0_8px_rgba(0,0,0,0.2)]" style={{
                                                    width: `${s.attendance}%`,
                                                    background: s.attendance < 75 ? '#ef4444' : s.attendance < 85 ? '#fbbf24' : '#10b981',
                                                }} />
                                            </div>
                                            <span className="text-[10px] font-black tabular-nums">{s.attendance}%</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6 text-right font-mono text-xs font-black">
                                        {s.fees > 0 ? (
                                            <span className="text-red-400">₹{s.fees.toLocaleString()}</span>
                                        ) : (
                                            <span className="text-green-400 text-[10px] font-black tracking-widest uppercase">Paid</span>
                                        )}
                                    </td>
                                    <td className="py-5 px-6 text-center">
                                        <span className={`badge ${statusBadge(s.status)} text-[9px] uppercase font-black tracking-widest px-3 shadow-sm`}>{s.status}</span>
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="flex items-center justify-end gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                            <button title="View" className="p-2 rounded-lg hover:bg-violet-500/20 text-violet-400 transition-all border border-transparent hover:border-violet-500/20"><Eye size={14} /></button>
                                            <button
                                                onClick={() => handleMessage(s.name)}
                                                title="Message"
                                                className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400 transition-all border border-transparent hover:border-blue-500/20">
                                                <MessageSquare size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(s.id)}
                                                title="Remove"
                                                className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-all border border-transparent hover:border-red-500/20"><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filtered.length === 0 && (
                    <div className="py-20 text-center">
                        <Search size={40} className="mx-auto text-white/10 mb-4" />
                        <p className="text-[var(--text-muted)] text-sm italic">No students match your criteria</p>
                    </div>
                )}
            </motion.div>
        </div>

    );
}
