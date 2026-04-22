import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList,
  Store,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Package,
} from "lucide-react";
import { featuredBooks } from "../data/books";
import { shopkeeperTasks, shopkeeperMetrics } from "../data/perspectives";
import { useAuth } from "../hooks/useAuth";
import "../styles/pages.css";

function ShopkeeperHub() {
  const { isAuthenticated, user } = useAuth();

  const [orders] = useState([
    { id: "ORD-001", items: 3, total: 1299, status: "pending", customer: "John Doe" },
    { id: "ORD-002", items: 2, total: 899, status: "shipped", customer: "Jane Smith" },
    { id: "ORD-003", items: 1, total: 499, status: "delivered", customer: "Mike Johnson" },
  ]);

  const [inventory] = useState([
    { ...featuredBooks[0], stock: 45, sold: 120 },
    { ...featuredBooks[1], stock: 12, sold: 85 },
    { ...featuredBooks[2], stock: 0, sold: 156 },
    { ...featuredBooks[3], stock: 89, sold: 45 },
  ]);

  // ================= UNAUTH VIEW =================
  if (!isAuthenticated) {
    return (
      <div className="page-shell perspective-page">
        <section className="perspective-hero">
          <div className="hero-copy">
            <span className="eyebrow">Shopkeeper Perspective</span>
            <h1>Manage your bookstore efficiently.</h1>
            <p>Track orders, inventory, and growth from one dashboard.</p>

            <div className="hero-actions">
              <Link to="/shops" className="btn btn-warning btn-lg">
                View Catalog
              </Link>
              <Link to="/login" className="btn btn-outline-dark btn-lg">
                Sign In
              </Link>
            </div>
          </div>

          <div className="perspective-panel">
            <div className="perspective-panel-head">
              <Store size={20} />
              <span>Store Overview</span>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ================= AUTH VIEW =================
  return (
    <div className="page-shell">
      {/* Header */}
      <section className="section-block bg-light mb-4 p-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1>Welcome, {user?.name}! 📊</h1>
            <p className="text-muted">Store dashboard</p>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <div className="row g-3 mb-4">
        {shopkeeperMetrics.map((m) => (
          <div key={m.label} className="col-md-3">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <p className="text-muted small">{m.label}</p>
                <h3>{m.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Orders */}
        <div className="col-lg-8">
          <section className="section-block">
            <h4 className="mb-3 d-flex align-items-center">
              <ClipboardList size={20} className="me-2" />
              Orders
            </h4>

            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.customer}</td>
                    <td>₹{o.total}</td>
                    <td>{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Inventory */}
          <section className="section-block">
            <h4 className="mb-3 d-flex align-items-center">
              <Package size={20} className="me-2" />
              Inventory
            </h4>

            <div className="row g-3">
              {inventory.map((book) => (
                <div key={book.id} className="col-md-6">
                  <div className="card p-2">
                    <h6>{book.title}</h6>
                    <small>{book.author}</small>
                    <p>Stock: {book.stock}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          <div className="card mb-3">
            <div className="card-header bg-danger text-white">
              <AlertTriangle size={16} /> Alerts
            </div>
            <div className="card-body">
              <p>Low stock items need restocking.</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <CheckCircle size={16} /> Tasks
            </div>
            <div className="card-body">
              {shopkeeperTasks.map((task, i) => (
                <div key={i}>
                  <input type="checkbox" /> {task}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopkeeperHub;