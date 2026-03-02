import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import './i18n/i18n';

import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
const AuthPage = lazy(() => import('./pages/AuthPage'));
const RoleSelectPage = lazy(() => import('./pages/RoleSelectPage'));

// New Engineering Admin pages
const AdminLayout = lazy(() => import('./components/AdminLayout'));
const EngineeringDashboard = lazy(() => import('./pages/admin/EngineeringDashboard'));
const StudentManagement = lazy(() => import('./pages/admin/StudentManagement'));
const FeesLabs = lazy(() => import('./pages/admin/FeesLabs'));
const AttendanceHeatmap = lazy(() => import('./pages/admin/AttendanceHeatmap'));
const ReportsAnalytics = lazy(() => import('./pages/admin/ReportsAnalytics'));
const ResourceCalendar = lazy(() => import('./pages/admin/ResourceCalendar'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));
const AdminFaculty = lazy(() => import('./pages/admin/Faculty'));
const AdminCourses = lazy(() => import('./pages/admin/Courses'));

// Student pages
const StudentDashboard = lazy(() => import('./pages/student/Dashboard'));
const StudentCourses = lazy(() => import('./pages/student/Courses'));
const StudentAttendance = lazy(() => import('./pages/student/Attendance'));
const StudentFees = lazy(() => import('./pages/student/Fees'));
const StudentResources = lazy(() => import('./pages/student/Resources'));
const StudentSettings = lazy(() => import('./pages/student/Settings'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-engineering-black">
    <div className="w-10 h-10 border-4 border-lemon-green border-t-transparent rounded-full animate-spin" />
  </div>
);


export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public */}
              <Route path="/" element={<RoleSelectPage />} />
              <Route path="/login" element={<AuthPage />} />

              {/* ── Engineering Admin Routes ── */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<EngineeringDashboard />} />
                <Route path="courses" element={<AdminCourses />} />
                <Route path="students" element={<StudentManagement />} />
                <Route path="fees-labs" element={<FeesLabs />} />
                <Route path="attendance" element={<AttendanceHeatmap />} />
                <Route path="reports" element={<ReportsAnalytics />} />
                <Route path="resources" element={<ResourceCalendar />} />
                <Route path="faculty" element={<AdminFaculty />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* ── Student Routes ── */}
              <Route
                path="/student"
                element={
                  <ProtectedRoute requiredRole="student">
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="courses" element={<StudentCourses />} />
                <Route path="attendance" element={<StudentAttendance />} />
                <Route path="fees" element={<StudentFees />} />
                <Route path="resources" element={<StudentResources />} />
                <Route path="settings" element={<StudentSettings />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>

      </AuthProvider>
    </ThemeProvider>
  );
}
