import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import './i18n/i18n';

import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
const AuthPage = lazy(() => import('./pages/AuthPage'));
const RoleSelectPage = lazy(() => import('./pages/RoleSelectPage'));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminStudents = lazy(() => import('./pages/admin/Students'));
const AdminFaculty = lazy(() => import('./pages/admin/Faculty'));
const AdminCourses = lazy(() => import('./pages/admin/Courses'));
const AdminAttendance = lazy(() => import('./pages/admin/Attendance'));
const AdminFees = lazy(() => import('./pages/admin/Fees'));
const AdminReports = lazy(() => import('./pages/admin/Reports'));
const AdminResources = lazy(() => import('./pages/admin/Resources'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));

// Student pages
const StudentDashboard = lazy(() => import('./pages/student/Dashboard'));
const StudentCourses = lazy(() => import('./pages/student/Courses'));
const StudentAttendance = lazy(() => import('./pages/student/Attendance'));
const StudentFees = lazy(() => import('./pages/student/Fees'));
const StudentResources = lazy(() => import('./pages/student/Resources'));
const StudentSettings = lazy(() => import('./pages/student/Settings'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-10 h-10 border-4 border-[var(--accent-1)] border-t-transparent rounded-full animate-spin" />
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

              {/* ── Admin Routes ── */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="students" element={<AdminStudents />} />
                <Route path="faculty" element={<AdminFaculty />} />
                <Route path="courses" element={<AdminCourses />} />
                <Route path="attendance" element={<AdminAttendance />} />
                <Route path="fees" element={<AdminFees />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="resources" element={<AdminResources />} />
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
