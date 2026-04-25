import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  Store,
  ChevronRight
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import ShopkeeperDashboard from "./ShopkeeperDashboard";
import ShopkeeperInventory from "./ShopkeeperInventory";
import "../styles/pages.css";

function ShopkeeperHub() {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  // ================= UNAUTH VIEW =================
  if (!isAuthenticated) {
    return (
      <div className="page-shell perspective-page">
        <section className="perspective-hero">
          <div className="hero-copy">
            <span className="eyebrow">Professional Store Management</span>
            <h1>Scale your bookstore with smart analytics.</h1>
            <p>A comprehensive dashboard for inventory tracking, order management, and sales growth.</p>

            <div className="hero-actions">
              <Link to="/shops" className="gz-cta-btn">
                Browse Global Catalog
              </Link>
              <Link to="/login" className="gz-cta-btn-outline">
                Sign In to Dashboard
              </Link>
            </div>
          </div>

          <div className="perspective-panel store-showcase">
            <div className="perspective-panel-head">
              <Store size={20} />
              <span>Partner Ecosystem</span>
            </div>
            
            <div className="p-4 text-center">
              <div className="mb-4 text-muted">
                <LayoutDashboard size={48} className="opacity-25 mb-3" />
                <p>Advanced metrics and inventory tools become available once you sign in as a shopkeeper.</p>
              </div>
              <div className="d-flex flex-column gap-2">
                <div className="p-3 bg-light rounded-3 text-start small">
                  <strong>Inventory Control</strong>
                  <p className="mb-0 text-muted">Real-time stock monitoring and low-stock alerts.</p>
                </div>
                <div className="p-3 bg-light rounded-3 text-start small">
                  <strong>Sales Analytics</strong>
                  <p className="mb-0 text-muted">Track wishlist frequency and cart additions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-shell bg-theme-main min-vh-100">
      {/* Sub-Header / Navigation */}
      <div className="sticky-top shadow-sm card-glass border-0 border-bottom border-secondary" style={{ top: "70px", zIndex: 100, backdropFilter: "blur(20px)" }}>
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between py-2">
            <div className="d-flex align-items-center gap-4">
              <button 
                className={`btn btn-link text-decoration-none px-0 py-2 d-flex align-items-center fw-bold transition-all ${activeTab === 'dashboard' ? 'text-theme-yellow border-bottom border-3 border-theme-yellow' : 'text-theme-muted'}`}
                onClick={() => setActiveTab("dashboard")}
              >
                <LayoutDashboard size={18} className="me-2" /> Dashboard
              </button>
              <button 
                className={`btn btn-link text-decoration-none px-0 py-2 d-flex align-items-center fw-bold transition-all ${activeTab === 'inventory' ? 'text-theme-yellow border-bottom border-3 border-theme-yellow' : 'text-theme-muted'}`}
                onClick={() => setActiveTab("inventory")}
              >
                <Package size={18} className="me-2" /> Inventory
              </button>
            </div>
            
            <div className="d-flex align-items-center gap-2">
              <span className="small text-theme-muted d-none d-md-inline">Store: <strong className="text-theme-header">{user?.shopName || "My Bookstore"}</strong></span>
              <button className="btn btn-sm btn-glass rounded-circle p-2">
                <Settings size={18} className="text-theme-muted" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="container-fluid px-4">
        {activeTab === "dashboard" ? (
          <ShopkeeperDashboard />
        ) : (
          <ShopkeeperInventory />
        )}
      </main>
    </div>
  );
}

export default ShopkeeperHub;