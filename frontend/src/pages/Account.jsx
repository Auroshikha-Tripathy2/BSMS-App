import React from "react";
import { useAuth } from "../hooks/useAuth";
import { User, Mail, Phone, MapPin, Edit } from "lucide-react";
import "../styles/pages.css";

function Account() {
  const { user } = useAuth();

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
                <h3 className="mb-0">{user?.name || "User"}</h3>
                <p className="text-muted mb-0">{user?.role || "Reader"}</p>
              </div>
              <button className="btn btn-outline-primary ms-auto">
                <Edit size={18} /> Edit
              </button>
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
              <div className="d-flex align-items-center">
                <Phone size={18} className="text-muted me-2" />
                <span>{user?.phone || "Not set"}</span>
              </div>
            </div>

            <div className="mb-3">
              <label className="fw-bold text-muted small">Address</label>
              <div className="d-flex align-items-center">
                <MapPin size={18} className="text-muted me-2" />
                <span>{user?.address || "Not set"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Account;
