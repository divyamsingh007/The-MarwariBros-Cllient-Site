import React, { useState, useEffect } from "react";
import { FiUser, FiLock, FiGlobe, FiSave, FiBell } from "react-icons/fi";
import { adminService, userService } from "../../api/services";

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: "MarwariBros",
    adminEmail: "admin@marwaribros.com",
    notifications: true,
    emailAlerts: true,
    orderNotifications: true,
    language: "en",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    // Load current user data
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);
    if (userData.email) {
      setSettings(prev => ({ ...prev, adminEmail: userData.email }));
    }
  }, []);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
    setError(null);
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
    setPasswordError(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Save general settings
      await adminService.updateSettings(settings);
      
      // If email changed, update user profile
      if (user && settings.adminEmail !== user.email) {
        const userId = user._id;
        await userService.update(userId, { email: settings.adminEmail });
        
        // Update localStorage with new email
        const updatedUser = { ...user, email: settings.adminEmail };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save settings:", err);
      setError(err.response?.data?.message || "Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    if (!passwordData.currentPassword) {
      setPasswordError("Current password is required");
      return;
    }

    setLoading(true);

    try {
      // Get user ID from localStorage
      const userId = user?._id;
      
      if (!userId) {
        throw new Error("User ID not found. Please login again.");
      }

      await userService.changePassword(userId, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      
      setPasswordSuccess(true);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to change password:", err);
      setPasswordError(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-fade-in">
      <h2 className="admin-card-title mb-6">Settings</h2>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        <form onSubmit={handleSave}>
          <div style={{ display: "grid", gap: "1.5rem" }}>
            <div className="admin-card">
              <h3 className="admin-card-title">
                <FiUser style={{ display: "inline", marginRight: "0.5rem" }} />
                General Settings
              </h3>

              <div className="admin-form-group">
                <label className="admin-label" htmlFor="siteName">
                  Site Name
                </label>
                <input
                  id="siteName"
                  type="text"
                  className="admin-input"
                  value={settings.siteName}
                  onChange={(e) => handleChange("siteName", e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label" htmlFor="adminEmail">
                  Admin Email
                </label>
                <input
                  id="adminEmail"
                  type="email"
                  className="admin-input"
                  value={settings.adminEmail}
                  onChange={(e) => handleChange("adminEmail", e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label" htmlFor="language">
                  <FiGlobe style={{ display: "inline", marginRight: "0.5rem" }} />
                  Language
                </label>
                <select
                  id="language"
                  className="admin-select"
                  value={settings.language}
                  onChange={(e) => handleChange("language", e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Spanish</option>
                </select>
              </div>
            </div>
            
            <div className="admin-card">
              <h3 className="admin-card-title">
                <FiBell style={{ display: "inline", marginRight: "0.5rem" }} />
                Notifications
              </h3>

              <div className="admin-form-group">
                <label className="admin-label">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => handleChange("notifications", e.target.checked)}
                    style={{ marginRight: "0.5rem" }}
                  />
                  Enable Notifications
                </label>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">
                  <input
                    type="checkbox"
                    checked={settings.emailAlerts}
                    onChange={(e) => handleChange("emailAlerts", e.target.checked)}
                    style={{ marginRight: "0.5rem" }}
                  />
                  Email Alerts
                </label>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">
                  <input
                    type="checkbox"
                    checked={settings.orderNotifications}
                    onChange={(e) => handleChange("orderNotifications", e.target.checked)}
                    style={{ marginRight: "0.5rem" }}
                  />
                  Order Notifications
                </label>
              </div>
            </div>

            {error && (
              <div style={{ 
                padding: "1rem", 
                backgroundColor: "#fed7d7", 
                color: "#c53030", 
                borderRadius: "0.5rem" 
              }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <button 
                type="submit" 
                className="admin-btn admin-btn-primary"
                disabled={loading}
              >
                <FiSave />
                {loading ? "Saving..." : "Save Settings"}
              </button>
              {saved && (
                <span
                  style={{
                    color: "#38a169",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  ✓ Settings saved successfully!
                </span>
              )}
            </div>
          </div>
        </form>

        <form onSubmit={handlePasswordSubmit}>
          <div className="admin-card">
            <h3 className="admin-card-title">
              <FiLock style={{ display: "inline", marginRight: "0.5rem" }} />
              Change Password
            </h3>

            <div className="admin-form-group">
              <label className="admin-label" htmlFor="currentPassword">
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                className="admin-input"
                value={passwordData.currentPassword}
                onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label" htmlFor="newPassword">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                className="admin-input"
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                minLength={8}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label" htmlFor="confirmPassword">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="admin-input"
                value={passwordData.confirmPassword}
                onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                minLength={8}
              />
            </div>

            {passwordError && (
              <div style={{ color: "#e53e3e", fontSize: "0.875rem", marginBottom: "1rem" }}>
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div style={{ color: "#38a169", fontSize: "0.875rem", marginBottom: "1rem" }}>
                ✓ Password changed successfully!
              </div>
            )}

            <button 
              type="submit"
              className="admin-btn admin-btn-secondary"
              disabled={loading}
            >
              <FiLock />
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
