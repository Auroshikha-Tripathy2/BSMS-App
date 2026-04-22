import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Bell, Lock, Eye, Globe } from "lucide-react";
import "../styles/pages.css";

function Settings() {
  const { user, updateUser } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    darkMode: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="page-shell">
      <section className="section-block" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div className="section-header mb-4">
          <div>
            <h1>Settings</h1>
          </div>
        </div>

        <div className="card shadow-sm mb-3">
          <div className="card-header bg-light">
            <h5 className="mb-0 d-flex align-items-center">
              <Bell size={20} className="me-2" /> Notifications
            </h5>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span>Email Notifications</span>
              <input
                type="checkbox"
                className="form-check-input"
                checked={settings.emailNotifications}
                onChange={() => handleToggle("emailNotifications")}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span>Order Updates</span>
              <input
                type="checkbox"
                className="form-check-input"
                checked={settings.orderUpdates}
                onChange={() => handleToggle("orderUpdates")}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span>Promotional Emails</span>
              <input
                type="checkbox"
                className="form-check-input"
                checked={settings.promotions}
                onChange={() => handleToggle("promotions")}
              />
            </div>
          </div>
        </div>

        <div className="card shadow-sm mb-3">
          <div className="card-header bg-light">
            <h5 className="mb-0 d-flex align-items-center">
              <Lock size={20} className="me-2" /> Security
            </h5>
          </div>
          <div className="card-body">
            <button className="btn btn-outline-primary w-100 mb-2">
              Change Password
            </button>
            <button className="btn btn-outline-primary w-100">
              Two-Factor Authentication
            </button>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-header bg-light">
            <h5 className="mb-0 d-flex align-items-center">
              <Globe size={20} className="me-2" /> Appearance
            </h5>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <span>Dark Mode</span>
              <input
                type="checkbox"
                className="form-check-input"
                checked={settings.darkMode}
                onChange={() => handleToggle("darkMode")}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Settings;
