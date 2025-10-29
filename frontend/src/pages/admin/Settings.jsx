import React, { useState } from "react";
import { FiUser, FiLock, FiGlobe, FiSave } from "react-icons/fi";

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: "MarwariBros",
    adminEmail: "admin@marwaribros.com",
    notifications: true,
    emailAlerts: true,
    orderNotifications: true,
    language: "en",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h2 className="admin-card-title mb-6">Settings</h2>

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
              <FiLock style={{ display: "inline", marginRight: "0.5rem" }} />
              Security
            </h3>

            <div className="admin-form-group">
              <label className="admin-label">Change Password</label>
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() =>
                  alert(
                    "Password change functionality would be implemented here"
                  )
                }
              >
                Change Password
              </button>
            </div>

            
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button type="submit" className="admin-btn admin-btn-primary">
              <FiSave />
              Save Settings
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
    </div>
  );
}
