import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import api from "../../utils/api";
import { API_PATH } from "../../utils/apiPaths";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post(API_PATH.LOGIN, formData);

      if (response.data.success) {
        const { accessToken, refreshToken, user } = response.data.data;

        if (user.role !== "admin") {
          setError("Access denied. Admin privileges required.");
          return;
        }

        localStorage.setItem("adminToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("adminUser", JSON.stringify(user));

        const responsejj = await api.get(API_PATH.PRODUCTS);
        console.log(responsejj);
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);

      if (err.response) {
        const errorMessage =
          err.response.data?.message || "Invalid email or password";
        setError(errorMessage);
      } else if (err.request) {
        setError("Cannot connect to server. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>

      <div className="login-content">
        <div className="login-brand-section">
          <div className="login-brand-content">
            <div className="login-logo-wrapper">
              <div className="login-logo-accent"></div>
              <h1 className="login-brand-title">The MarwariBros</h1>
            </div>
            <p className="login-brand-subtitle">Admin Portal</p>
            <div className="login-brand-divider"></div>
            <p className="login-brand-description">
              Manage your store, products, orders, and customers all in one
              place.
            </p>
            <div className="login-features">
              <div className="login-feature">
                <svg
                  className="login-feature-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Secure Authentication</span>
              </div>

              <div className="login-feature">
                <svg
                  className="login-feature-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Easy Management</span>
              </div>
            </div>
          </div>
        </div>

        <div className="login-form-section">
          <div className="login-form-container">
            <div className="login-form-header">
              <h2 className="login-form-title">Welcome Back</h2>
              <p className="login-form-subtitle">
                Sign in to your admin account
              </p>
            </div>

            {error && (
              <div className="login-error">
                <svg
                  className="login-error-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-form-group">
                <label htmlFor="email" className="login-label">
                  Email Address
                </label>
                <div className="login-input-wrapper">
                  <svg
                    className="login-input-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="login-input"
                    placeholder="admin@marwaribros.com"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="login-form-group">
                <label htmlFor="password" className="login-label">
                  Password
                </label>
                <div className="login-input-wrapper">
                  <svg
                    className="login-input-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="login-input"
                    placeholder="Enter your password"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="login-form-footer">
                <a href="#" className="login-forgot-link">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className={`login-submit-btn ${
                  isLoading ? "login-submit-btn--loading" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="login-spinner" viewBox="0 0 24 24">
                      <circle
                        className="login-spinner-circle"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg
                      className="login-submit-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <p className="login-footer-text">
              Need help?{" "}
              <a href="#" className="login-footer-link">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
