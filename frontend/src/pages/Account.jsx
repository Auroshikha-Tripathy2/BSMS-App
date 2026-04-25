import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { User, Mail, Phone, MapPin, Edit, Check, X } from "lucide-react";
import "../styles/pages.css";

function Account() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    const result = await updateUser(formData);
    setLoading(false);
    if (result && result.success) {
      setIsEditing(false);
    } else {
      alert(result?.error || "Failed to update profile");
    }
  };

  return (
    <div className="page-shell">
      <section className="section-block" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div className="section-header mb-4">
          <div>
            <h1>My Account</h1>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="d-flex align-items-center mb-4">
              <div className="rounded-circle bg-warning p-3" style={{ width: "80px", height: "80px" }}>
                <User size={40} className="text-white" />
              </div>
              <div className="ms-3">
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control mb-1"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                ) : (
                  <h3 className="mb-0">{user?.name || "User"}</h3>
                )}
                <p className="text-muted mb-0">{user?.role || "Reader"}</p>
              </div>
              <div className="ms-auto d-flex gap-2">
                {isEditing ? (
                  <>
                    <button className="btn btn-success" onClick={handleSave} disabled={loading}>
                      <Check size={18} /> Save
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => setIsEditing(false)} disabled={loading}>
                      <X size={18} /> Cancel
                    </button>
                  </>
                ) : (
                  <button className="btn btn-outline-primary" onClick={() => setIsEditing(true)}>
                    <Edit size={18} /> Edit
                  </button>
                )}
              </div>
            </div>

            <hr />

            <div className="mb-3">
              <label className="fw-bold text-muted small">Email Address</label>
              <div className="d-flex align-items-center">
                <Mail size={18} className="text-muted me-2" />
                <span>{user?.email || "user@example.com"}</span>
              </div>
            </div>

            <div className="mb-3">
              <label className="fw-bold text-muted small">Phone Number</label>
              <div className="d-flex align-items-center mt-1">
                <Phone size={18} className="text-muted me-2" />
                {isEditing ? (
                  <input
                    type="tel"
                    className="form-control"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                ) : (
                  <span>{user?.phone || "Not set"}</span>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="fw-bold text-muted small">Address</label>
              <div className="d-flex align-items-center mt-1">
                <MapPin size={18} className="text-muted me-2" />
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter address"
                  />
                ) : (
                  <span>{user?.address || "Not set"}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Account;
