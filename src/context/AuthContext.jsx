import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/apiService";

const AuthContext = createContext(null);

function readStorage() {
    const token = localStorage.getItem("campusai_token");
    const role = localStorage.getItem("campusai_role");

    return {
        token: token || null,
        isLoggedIn: !!token,
        role: role ? role.toLowerCase() : null,
        userName: localStorage.getItem("campusai_name") || "",
        email: localStorage.getItem("campusai_email") || "",
    };
}

export function AuthProvider({ children }) {

    const [auth, setAuth] = useState(readStorage);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("campusai_token");

        if (!token) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {

            try {

                const res = await api.get("/api/auth/me");
                const user = res.data.data || res.data;

                // ✅ Preserve login session name
                const storedName = localStorage.getItem("campusai_name");

                setAuth({
                    token,
                    isLoggedIn: true,
                    role: user.role ? user.role.toLowerCase() : null,
                    userName: storedName || "",
                    email: user.email || "",
                });

            } catch (err) {

                console.error("Auth verification failed", err);
                logout();

            } finally {

                setLoading(false);

            }
        };

        fetchUser();

    }, []);

    const login = ({ token, role, name, email }) => {

        const normalizedRole = role ? role.toLowerCase() : null;

        localStorage.setItem("campusai_token", token);
        localStorage.setItem("campusai_role", normalizedRole || "");
        localStorage.setItem("campusai_name", name || "");
        localStorage.setItem("campusai_email", email || "");

        setAuth({
            token,
            isLoggedIn: true,
            role: normalizedRole,
            userName: name || "",
            email: email || "",
        });
    };

    const logout = () => {

        localStorage.removeItem("campusai_token");
        localStorage.removeItem("campusai_role");
        localStorage.removeItem("campusai_name");
        localStorage.removeItem("campusai_email");

        setAuth({
            token: null,
            isLoggedIn: false,
            role: null,
            userName: "",
            email: "",
        });

        // Redirect to homepage
        window.location.replace("/");
    };

    return (
        <AuthContext.Provider value={{ ...auth, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
}