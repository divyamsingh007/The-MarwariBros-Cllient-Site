import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  const [showPassword, setShowPassword] = useState(false);

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
          setIsLoading(false);
          return;
        }

        localStorage.setItem("adminToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("adminUser", JSON.stringify(user));

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
    <div className="admin-login-page">
      {/* Decorative Background Elements */}
      <div className="admin-login-bg">
        <div className="admin-login-pattern"></div>
        <div className="admin-login-shape admin-login-shape-1"></div>
        <div className="admin-login-shape admin-login-shape-2"></div>
        <div className="admin-login-shape admin-login-shape-3"></div>
      </div>

      {/* Main Content */}
      <div className="admin-login-container">
        {/* Left Side - Branding */}
        <div className="admin-login-brand">
          <Link to="/" className="admin-login-home-link">
            <svg
              className="admin-login-home-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Store
          </Link>

          <div className="admin-login-brand-content">
            <div className="admin-login-logo">
              <div className="admin-login-logo-accent"></div>
              <h1 className="admin-login-brand-title">The MarwariBrothers</h1>
            </div>

            <div className="admin-login-brand-text">
              <h2 className="admin-login-subtitle">Admin Portal</h2>
              <p className="admin-login-description">
                Manage your entire store from one powerful dashboard. Control
                products, track orders, and grow your business.
              </p>
            </div>

            <div className="admin-login-features">
              <div className="admin-login-feature">
                <div className="admin-login-feature-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h4>Secure Access</h4>
                  <p>Protected with enterprise-grade security</p>
                </div>
              </div>

              <div className="admin-login-feature">
                <div className="admin-login-feature-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h4>Lightning Fast</h4>
                  <p>Optimized for performance and speed</p>
                </div>
              </div>

              <div className="admin-login-feature">
                <div className="admin-login-feature-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4>Analytics</h4>
                  <p>Real-time insights and reports</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="admin-login-form-wrapper">
          <div className="admin-login-form-container">
            <div className="admin-login-form-header">
              <h2 className="admin-login-form-title">Welcome Back</h2>
              <p className="admin-login-form-subtitle">
                Sign in to access your admin dashboard
              </p>
            </div>

            {error && (
              <div className="admin-login-error">
                <svg
                  className="admin-login-error-icon"
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

            <form onSubmit={handleSubmit} className="admin-login-form">
              <div className="admin-login-input-group">
                <label htmlFor="email" className="admin-login-label">
                  Email Address
                </label>
                <div className="admin-login-input-wrapper">
                  <svg
                    className="admin-login-input-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="admin-login-input"
                    placeholder="admin@marwaribrothers.com"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="admin-login-input-group">
                <label htmlFor="password" className="admin-login-label">
                  Password
                </label>
                <div className="admin-login-input-wrapper">
                  <svg
                    className="admin-login-input-icon"
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
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="admin-login-input"
                    placeholder="Enter your password"
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    className="admin-login-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                  >
                    {showPassword ? (
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="admin-login-options">
                <label className="admin-login-checkbox">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="admin-login-forgot">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="admin-login-submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="admin-login-spinner" viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="32"
                        strokeDashoffset="32"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="0 12 12"
                          to="360 12 12"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

            <div className="admin-login-footer">
              <p>
                Need assistance?{" "}
                <a href="#" className="admin-login-support">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
