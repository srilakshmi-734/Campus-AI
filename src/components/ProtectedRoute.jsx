import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {

    const { role, token, loading } = useAuth();

    // Wait for authentication verification
    if (loading) {
        return null; // Or a loading spinner
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const currentRole = role?.toLowerCase();
    const targetRole = requiredRole?.toLowerCase();

    if (targetRole && currentRole !== targetRole) {
        return <Navigate to={`/${currentRole}/dashboard`} replace />;
    }

    return children;
}