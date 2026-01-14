import React, { useState, useEffect } from "react";
import { FiUser, FiLock, FiGlobe, FiSave, FiBell } from "react-icons/fi";
import { adminService, userService } from "../../api/services";

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: "MarwariBrothers",
    adminEmail: "admin@marwaribrothers.com",
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
      setSettings((prev) => ({ ...prev, adminEmail: userData.email }));
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
        localStorage.setItem("user", JSON.stringify(updatedUser));
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
      setPasswordError(
        err.response?.data?.message || "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-fade-in">
      <h2 className="admin-card-title mb-6">Settings</h2>

      <div style={{ display: "grid", gap: "1.5rem" }}>
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
                onChange={(e) =>
                  handlePasswordChange("currentPassword", e.target.value)
                }
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
                onChange={(e) =>
                  handlePasswordChange("newPassword", e.target.value)
                }
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
                onChange={(e) =>
                  handlePasswordChange("confirmPassword", e.target.value)
                }
                minLength={8}
              />
            </div>

            {passwordError && (
              <div
                style={{
                  color: "#e53e3e",
                  fontSize: "0.875rem",
                  marginBottom: "1rem",
                }}
              >
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div
                style={{
                  color: "#38a169",
                  fontSize: "0.875rem",
                  marginBottom: "1rem",
                }}
              >
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
