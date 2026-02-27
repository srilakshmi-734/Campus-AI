export const studentDetails = {
    name: 'Arjun Raghav',
    dept: 'Computer Science & Engineering',
    sem: 5,
    enrollmentId: 'CU2021CSE084',
    batch: '2021-2025',
    admissionDate: '12 Aug 2021',
    college: 'Campus University – COE'
};

export const studentStats = [
    { label: 'myAttendance', value: '87%', change: '+2.4%', icon: 'CalendarCheck', color: '#10b981', glow: 'stat-glow-green' },
    { label: 'myCourses', value: '06', change: 'Enrolled', icon: 'BookOpen', color: '#7c3aed', glow: 'stat-glow-violet' },
    { label: 'myFees', value: '₹0', change: 'No Dues', icon: 'CreditCard', color: '#3b82f6', glow: 'stat-glow-blue' },
    { label: 'CGPA', value: '8.42', change: '+0.15', icon: 'Award', color: '#f97316', glow: 'stat-glow-orange' },
];

export const semesterProgress = {
    pct: 68,
    daysLeft: 42,
    currentWeek: 12,
    totalWeeks: 18
};

export const absentLog = [
    { date: '2026-02-24', subject: 'Mathematics III', hour: '2nd Hour', time: '10:30–11:30', reason: 'Medical', status: 'Approved' },
    { date: '2026-02-20', subject: 'Data Structures', hour: '1st Hour', time: '09:00–10:00', reason: 'Personal', status: 'Pending' },
    { date: '2026-02-15', subject: 'OS Lab', hour: '4th & 5th Hour', time: '14:00–16:00', reason: 'Technical Issue (Online Class)', status: 'Approved' },
    { date: '2026-02-12', subject: 'Computer Networks', hour: '3rd Hour', time: '11:45–12:45', reason: 'On-Duty (Event)', status: 'Approved' },
];

export const studentSchedule = [
    { subject: 'Data Structures', time: '09:00–10:00', room: 'CS-Lab 2', faculty: 'Dr. Sunita Rao', status: 'completed' },
    { subject: 'Mathematics III', time: '10:30–11:30', room: 'S-103', faculty: 'Dr. G. Rajan', status: 'live' },
    { subject: 'OS Lab', time: '14:00–16:00', room: 'CS-Lab 1', faculty: 'Dr. K. Murugavel', status: 'upcoming' },
];

export const studentNotices = [
    { id: 1, text: 'Semester exam schedule released', time: 'Today', type: 'info', category: 'Exam Cell', icon: 'Bell' },
    { id: 2, text: 'Lab records submission deadline: Mar 5', time: 'Yesterday', type: 'warn', category: 'Dept', icon: 'AlertTriangle' },
    { id: 3, text: 'Sports Day registrations open!', time: '2 days ago', type: 'success', category: 'General', icon: 'Zap' },
];

export const campusDirectory = [
    { role: 'HOD - CSE', name: 'Dr. K. Murugavel', email: 'hod.cse@campusuniv.edu', phone: '+91 98400 12345' },
    { role: 'Exam Cell', name: 'Admin Office', email: 'exams@campusuniv.edu', phone: '044-2235 7890' },
    { role: 'Library', name: 'Central Lib', email: 'lib@campusuniv.edu', phone: '044-2235 1122' },
];
