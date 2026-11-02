// lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // all requests will be prefixed with /api
  withCredentials: true, // important: include cookies automatically
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to handle session expiration or unauthorized requests
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      typeof window !== "undefined"
    ) {
      const currentPath = window.location.pathname;
      const isPublicRoute =
        currentPath.startsWith("/login") ||
        currentPath.startsWith("/get-started") ||
        currentPath.startsWith("/signup") ||
        currentPath === "/";

      if (!isPublicRoute) {
        try {
          localStorage.removeItem("auth-storage");
        } catch (e) {
          // ignore
        }
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
