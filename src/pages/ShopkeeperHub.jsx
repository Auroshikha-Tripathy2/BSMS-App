import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ClipboardList, PackageSearch, Store, TrendingUp, AlertTriangle, CheckCircle, Package } from "lucide-react";
import { featuredBooks } from "../data/books";
import {
  businessInsights,
  shopkeeperFeatures,
  shopkeeperTasks,
  shopkeeperMetrics,
} from "../data/perspectives";
import { useAuth } from "../hooks/useAuth";
import "../styles/pages.css";

function ShopkeeperHub() {
  const { isAuthenticated, user } = useAuth();
  const [orders, setOrders] = useState([
    { id: "ORD-001", items: 3, total: 1299, status: "pending", customer: "John Doe" },
    { id: "ORD-002", items: 2, total: 899, status: "shipped", customer: "Jane Smith" },
    { id: "ORD-003", items: 1, total: 499, status: "delivered", customer: "Mike Johnson" },
  ]);

  const [inventory, setInventory] = useState([
    { ...featuredBooks[0], stock: 45, sold: 120, status: "active" },
    { ...featuredBooks[1], stock: 12, sold: 85, status: "low" },
    { ...featuredBooks[2], stock: 0, sold: 156, status: "outofstock" },
    { ...featuredBooks[3], stock: 89, sold: 45, status: "active" },
  ]);

  if (!isAuthenticated) {
    return (
      <div className="page-shell perspective-page">
        <section className="perspective-hero">
          <div className="hero-copy">
            <span className="eyebrow">Shopkeeper Perspective</span>
            <h1>A focused operations dashboard for bookstore owners.</h1>
            <p>
              Built to help shopkeepers manage inventory, process orders, monitor
              sales, and make quicker decisions with less manual work.
            </p>
            <div className="hero-actions">
              <Link to="/shops" className="btn btn-warning btn-lg">
                View Catalog
              </Link>
              <Link to="/login" className="btn btn-outline-dark btn-lg">
                Sign In as Shopkeeper
              </Link>
            </div>
          </div>

          <div className="perspective-panel">
            <div className="perspective-panel-head">
              <Store size={20} />
              <span>Store overview</span>
            </div>

            <div className="cover-showcase store-showcase">
              {featuredBooks.slice(2, 6).map((book, index) => (
                <img
                  key={book.id}
                  className={`showcase-book showcase-book-${index + 1}`}
                  src={book.cover}
                  alt={book.title}
                />
              ))}
            </div>

            <div className="panel-callout">
              <strong>Sign in to view real store metrics and inventory activity.</strong>
              <span>
                Orders, stock levels, low-stock alerts, and repeat buyers should only
                appear inside the authenticated shopkeeper dashboard.
              </span>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Authenticated Dashboard
  return (
    <div className="page-shell">
      {/* Welcome Header */}
      <section className="section-block bg-light mb-4" style={{ padding: "2rem" }}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1>Welcome back, {user?.name}! 📊</h1>
            <p className="text-muted">Your store dashboard</p>
          </div>
          <div>
            <button className="btn btn-primary me-2">+ Add Book</button>
            <button className="btn btn-outline-secondary">Settings</button>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="section-block">
        <div className="row g-3 mb-4">
          {shopkeeperMetrics.map((metric) => (
            <div key={metric.label} className="col-md-6 col-lg-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <p className="text-muted small mb-2">{metric.label}</p>
                  <h3 className="text-primary">{metric.value}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="row g-4">
        {/* Main Content */}
        <div className="col-lg-8">
          {/* Pending Orders */}
          <section className="section-block">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="d-flex align-items-center">
                <ClipboardList size={20} className="me-2 text-warning" /> Pending Orders
              </h4>
              <span className="badge bg-warning">{orders.filter(o => o.status === 'pending').length}</span>
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="fw-bold">{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.items}</td>
                      <td>₹{order.total}</td>
                      <td>
                        <span
                          className={`badge ${
                            order.status === "pending"
                              ? "bg-warning"
                              : order.status === "shipped"
                              ? "bg-info"
                              : "bg-success"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Inventory Status */}
          <section className="section-block">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="d-flex align-items-center">
                <Package size={20} className="me-2 text-info" /> Inventory Status
              </h4>
              <Link to="/inventory" className="btn btn-sm btn-outline-primary">
                Manage All
              </Link>
            </div>

            <div className="row g-3">
              {inventory.map((book) => (
                <div key={book.id} className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-auto">
                          <img
                            src={book.cover}
                            alt={book.title}
                            style={{ width: "80px", height: "100px", objectFit: "cover" }}
                          />
                        </div>
                        <div className="col">
                          <h6 className="mb-1">{book.title}</h6>
                          <small className="text-muted d-block mb-2">{book.author}</small>

                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="small">
                              <strong>Stock:</strong> {book.stock}
                            </span>
                            <span
                              className={`badge ${
                                book.stock === 0
                                  ? "bg-danger"
                                  : book.stock < 20
                                  ? "bg-warning"
                                  : "bg-success"
                              }`}
                            >
                              {book.stock === 0
                                ? "Out of Stock"
                                : book.stock < 20
                                ? "Low Stock"
                                : "In Stock"}
                            </span>
                          </div>

                          <small className="text-muted">
                            Sold this month: <strong>{book.sold}</strong>
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Top Selling Books */}
          <section className="section-block">
            <h4 className="d-flex align-items-center mb-3">
              <TrendingUp size={20} className="me-2 text-success" /> Top Selling Books
            </h4>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Price</th>
                    <th>Sold This Month</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {[...inventory]
                    .sort((a, b) => b.sold - a.sold)
                    .slice(0, 4)
                    .map((book) => (
                      <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>₹{book.price}</td>
                        <td>
                          <span className="badge bg-info">{book.sold}</span>
                        </td>
                        <td className="fw-bold">
                          ₹{(book.price * book.sold).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="col-lg-4">
          {/* Alerts */}
          <section className="card shadow-sm">
            <div className="card-header bg-danger text-white">
              <h6 className="mb-0 d-flex align-items-center">
                <AlertTriangle size={18} className="me-2" /> Alerts
              </h6>
            </div>
            <div className="card-body">
              <div className="mb-3 pb-3 border-bottom">
                <small className="text-muted">Stock Alert</small>
                <p className="mb-1 small">
                  <strong>Atomic Habits</strong> is running low (12 units)
                </p>
                <button className="btn btn-sm btn-outline-warning btn-sm">
                  Restock
                </button>
              </div>

              <div>
                <small className="text-muted">Stock Alert</small>
                <p className="mb-1 small">
                  <strong>Ikigai</strong> is out of stock
                </p>
                <button className="btn btn-sm btn-outline-danger btn-sm">
                  Reorder
                </button>
              </div>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="card shadow-sm mt-3">
            <div className="card-header bg-light">
              <h6 className="mb-0">Today's Performance</h6>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="small">Orders</span>
                  <strong className="text-success">+12</strong>
                </div>
                <div className="progress" style={{ height: "6px" }}>
                  <div className="progress-bar bg-success" style={{ width: "75%" }} />
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="small">Revenue</span>
                  <strong className="text-primary">₹45,280</strong>
                </div>
                <div className="progress" style={{ height: "6px" }}>
                  <div className="progress-bar bg-primary" style={{ width: "85%" }} />
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="small">Customers</span>
                  <strong className="text-info">+8</strong>
                </div>
                <div className="progress" style={{ height: "6px" }}>
                  <div className="progress-bar bg-info" style={{ width: "60%" }} />
                </div>
              </div>
            </div>
          </section>

          {/* Action Queue */}
          <section className="card shadow-sm mt-3">
            <div className="card-header bg-light">
              <h6 className="mb-0 d-flex align-items-center">
                <CheckCircle size={18} className="me-2" /> Action Queue
              </h6>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {shopkeeperTasks.slice(0, 4).map((task, index) => (
                  <li key={index} className="list-group-item px-0 py-2 small">
                    <div className="d-flex align-items-start">
                      <input
                        type="checkbox"
                        className="me-2 mt-1"
                        id={`task-${index}`}
                      />
                      <label htmlFor={`task-${index}`} className="flex-grow-1">
                        {task}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ShopkeeperHub;
          </div>
        </article>

        <article className="dashboard-card">
          <div className="section-header">
            <div>
              <span className="eyebrow">Business Insights</span>
              <h2>Signals that support better store decisions</h2>
            </div>
          </div>

          <div className="insight-stack">
            {businessInsights.map((insight) => (
              <div key={insight.title} className="insight-card">
                <p>{insight.title}</p>
                <strong>{insight.value}</strong>
                <span>{insight.note}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="section-block feature-grid">
        <article className="dashboard-card accent-card">
          <div className="accent-card-head">
            <PackageSearch size={20} />
            <span>Inventory efficiency</span>
          </div>
          <h2>Low-stock, fast-moving, and underperforming books in one glance.</h2>
          <p>
            A shopkeeper should not need multiple screens to decide what to restock
            or promote next.
          </p>
        </article>

        <article className="dashboard-card accent-card">
          <div className="accent-card-head">
            <ClipboardList size={20} />
            <span>Order pipeline</span>
          </div>
          <h2>Separate new orders, packed orders, and dispatched orders clearly.</h2>
          <p>
            That workflow keeps fulfillment fast and reduces confusion during busy
            periods.
          </p>
        </article>

        <article className="dashboard-card accent-card">
          <div className="accent-card-head">
            <ArrowUpRight size={20} />
            <span>Growth view</span>
          </div>
          <h2>Track what actually improves revenue instead of watching raw numbers only.</h2>
          <p>
            Category lift, repeat buyers, and bestselling titles should be visible
            side by side.
          </p>
        </article>
      </section>
    </div>
  );
}

export default ShopkeeperHub;
