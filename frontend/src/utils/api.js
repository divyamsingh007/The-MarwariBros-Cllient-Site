import axios from "axios";

// Axios instance for the frontend app
// - Uses Vite env var VITE_API_URL if present, otherwise falls back to localhost
// - Adds JSON headers by default
// - Attaches Authorization header from localStorage if a token is present
// - Exports helpers to set/clear token and the axios instance

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // enable cookies/sessions for authentication
});

// Request interceptor: attach Bearer token if present in localStorage
api.interceptors.request.use(
  (config) => {
    try {
      const token =
        localStorage.getItem("adminToken") ||
        localStorage.getItem("authToken") ||
        localStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      // localStorage might throw in some edge cases (SSR etc.) — ignore safely
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: basic handler for common cases (401 -> optionally redirect)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 errors (unauthorized)
    if (error?.response?.status === 401) {
      // Clear all auth tokens
      clearAuthToken();
      // Redirect to login if on admin route
      if (
        window.location.pathname.startsWith("/admin") &&
        window.location.pathname !== "/admin/login"
      ) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

// Helper to persist token and set default header for subsequent requests
export function setAuthToken(token) {
  if (!token) return;
  try {
    localStorage.setItem("authToken", token);
  } catch (err) {
    // ignore storage errors
  }
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function clearAuthToken() {
  try {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
  } catch (err) {
    // ignore
  }
  if (api.defaults.headers.common)
    delete api.defaults.headers.common.Authorization;
}

export default api;
