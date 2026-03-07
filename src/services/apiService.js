import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "",
});

/* ---------------- REQUEST INTERCEPTOR ---------------- */

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("campusai_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token.trim()}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/* ---------------- RESPONSE INTERCEPTOR ---------------- */

api.interceptors.response.use(
    (response) => response,

    (error) => {
        const status = error.response?.status;
        const url = error.config?.url || "";

        const isLoginPage = window.location.pathname === "/login";
        const isAuthCheck = url.includes("/auth/me");

        // Only logout if token is truly invalid
        if (status === 401 && !isLoginPage && !isAuthCheck) {

            console.warn("Unauthorized request detected:", url);

            // Clear auth storage
            localStorage.removeItem("campusai_token");
            localStorage.removeItem("campusai_role");
            localStorage.removeItem("campusai_name");
            localStorage.removeItem("campusai_email");

            // Redirect to home page safely
            window.location.replace("/");
        }

        return Promise.reject(error);
    }
);

export default api;