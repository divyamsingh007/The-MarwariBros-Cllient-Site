import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../api/services";
import "./Login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await userService.login(formData);

      if (response.data.success) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        localStorage.setItem("accessToken", response.data.data.accessToken);

        // Redirect to admin dashboard
        navigate("/admin");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">The Marwari Bros</h1>
            <p className="login-subtitle">Admin Dashboard</p>
          </div>

          {error && (
            <div className="login-error">
              <span>⚠️</span>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="admin@marwaribrothers.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account? Contact your administrator</p>

            {/* Development credentials */}
            <div className="dev-credentials">
              <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
                Test Credentials:
              </p>
              <p style={{ fontSize: "0.75rem" }}>Email: admin@admin.com</p>
              <p style={{ fontSize: "0.75rem" }}>Password: 12345678</p>
            </div>
          </div>
        </div>

        <div className="login-decoration">
          <div className="decoration-circle decoration-circle-1"></div>
          <div className="decoration-circle decoration-circle-2"></div>
          <div className="decoration-circle decoration-circle-3"></div>
        </div>
      </div>
    </div>
  );
}
