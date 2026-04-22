import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Compass, MapPin, Star, ShoppingBag, BookOpen, Heart, TrendingUp, AlertCircle } from "lucide-react";
import { featuredBooks } from "../data/books";
import {
  readerActions,
  readerFeatures,
  readerMetrics,
} from "../data/perspectives";
import { useAuth } from "../hooks/useAuth";
import "../styles/pages.css";

function ReaderHub() {
  const { isAuthenticated, user } = useAuth();
  const [wishlist, setWishlist] = useState([1, 3, 5]);
  const [priceAlerts, setPriceAlerts] = useState([2, 4]);

  if (!isAuthenticated) {
    return (
      <div className="page-shell perspective-page">
        <section className="perspective-hero">
          <div className="hero-copy">
            <span className="eyebrow">Reader Perspective</span>
            <h1>A calmer, smarter experience for readers and customers.</h1>
            <p>
              Designed for discovery, comparison, ordering, and reading progress so
              users can move from browsing to buying without friction.
            </p>
            <div className="hero-actions">
              <Link to="/shops" className="btn btn-warning btn-lg">
                Browse Books
              </Link>
              <Link to="/login" className="btn btn-outline-dark btn-lg">
                Sign In as Reader
              </Link>
            </div>
          </div>

          <div className="perspective-panel">
            <div className="perspective-panel-head">
              <Compass size={20} />
              <span>Reader command bar</span>
            </div>

            <div className="cover-showcase">
              {featuredBooks.slice(0, 4).map((book, index) => (
                <img
                  key={book.id}
                  className={`showcase-book showcase-book-${index + 1}`}
                  src={book.cover}
                  alt={book.title}
                />
              ))}
            </div>

            <div className="panel-callout">
              <strong>Sign in to unlock your personal reader dashboard.</strong>
              <span>
                Wishlist, reading progress, price alerts, and order activity will
                appear after login.
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
            <h1>Welcome back, {user?.name}! 📚</h1>
            <p className="text-muted">Continue your reading journey</p>
          </div>
          <Link to="/shops" className="btn btn-warning btn-lg">
            <ShoppingBag size={20} className="me-2" /> Browse Books
          </Link>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="section-block">
        <div className="row g-3 mb-4">
          {readerMetrics.map((metric) => (
            <div key={metric.label} className="col-md-6 col-lg-3">
              <div className="card shadow-sm text-center">
                <div className="card-body">
                  <p className="text-muted small mb-2">{metric.label}</p>
                  <h3 className="text-warning">{metric.value}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="row g-4">
        {/* Left Column */}
        <div className="col-lg-8">
          {/* Currently Reading */}
          <section className="section-block">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="d-flex align-items-center">
                <BookOpen size={20} className="me-2 text-info" /> Currently Reading
              </h4>
              <Link to="/status" className="btn btn-sm btn-outline-primary">
                View All
              </Link>
            </div>

            <div className="row g-3">
              {featuredBooks.slice(0, 3).map((book) => (
                <div key={book.id} className="col-md-6">
                  <div className="card h-100">
                    <img
                      src={book.cover}
                      alt={book.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{book.title}</h5>
                      <p className="card-text text-muted small">{book.author}</p>
                      <div className="progress" style={{ height: "6px" }}>
                        <div
                          className="progress-bar bg-warning"
                          style={{ width: "65%" }}
                        />
                      </div>
                      <small className="text-muted d-block mt-2">65% - 234/360 pages</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Orders */}
          <section className="section-block">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="d-flex align-items-center">
                <ShoppingBag size={20} className="me-2 text-success" /> Recent Orders
              </h4>
              <Link to="/orders" className="btn btn-sm btn-outline-primary">
                View All
              </Link>
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Books</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#ORD-2024-001</td>
                    <td>3 books</td>
                    <td>₹1,299</td>
                    <td><span className="badge bg-success">Delivered</span></td>
                    <td><button className="btn btn-sm btn-outline-primary">Details</button></td>
                  </tr>
                  <tr>
                    <td>#ORD-2024-002</td>
                    <td>2 books</td>
                    <td>₹799</td>
                    <td><span className="badge bg-info">In Transit</span></td>
                    <td><button className="btn btn-sm btn-outline-primary">Track</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Recommendations */}
          <section className="section-block">
            <h4 className="d-flex align-items-center mb-3">
              <TrendingUp size={20} className="me-2 text-primary" /> Recommended For You
            </h4>

            <div className="row g-3">
              {featuredBooks.slice(4, 8).map((book) => (
                <div key={book.id} className="col-md-6">
                  <div className="card">
                    <div className="position-relative">
                      <img
                        src={book.cover}
                        alt={book.title}
                        style={{ height: "180px", width: "100%", objectFit: "cover" }}
                      />
                      <div className="position-absolute top-0 end-0 m-2">
                        <div className="d-flex gap-2">
                          <button
                            className={`btn btn-sm rounded-circle ${
                              wishlist.includes(book.id) ? "btn-danger" : "btn-outline-danger"
                            }`}
                          >
                            <Heart size={16} fill={wishlist.includes(book.id) ? "currentColor" : "none"} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className="card-title mb-1">{book.title}</h6>
                          <small className="text-muted">{book.author}</small>
                        </div>
                        <div className="d-flex align-items-center">
                          <Star size={14} className="text-warning" fill="currentColor" />
                          <small className="ms-1">{book.rating}</small>
                        </div>
                      </div>
                      <p className="text-muted small mb-2">{book.category}</p>
                      <button className="btn btn-warning btn-sm w-100">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="col-lg-4">
          {/* Price Alerts */}
          <section className="card shadow-sm sticky-top" style={{ top: "20px" }}>
            <div className="card-header bg-light">
              <h6 className="mb-0 d-flex align-items-center">
                <AlertCircle size={18} className="me-2 text-warning" /> Price Alerts
              </h6>
            </div>
            <div className="card-body">
              {featuredBooks
                .filter((book) => priceAlerts.includes(book.id))
                .map((book) => (
                  <div key={book.id} className="mb-3 pb-3 border-bottom">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <p className="mb-1 small fw-bold">{book.title}</p>
                        <small className="text-muted">{book.author}</small>
                      </div>
                      <button className="btn-close btn-sm"></button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted small">₹{book.price}</span>
                      <span className="badge bg-success">Stock available</span>
                    </div>
                  </div>
                ))}
              <button className="btn btn-outline-warning w-100 btn-sm">
                Manage Alerts
              </button>
            </div>
          </section>

          {/* Wishlist Shortcut */}
          <section className="card shadow-sm mt-3">
            <div className="card-header bg-light">
              <h6 className="mb-0 d-flex align-items-center">
                <Heart size={18} className="me-2 text-danger" /> Your Wishlist
              </h6>
            </div>
            <div className="card-body">
              <p className="text-muted small mb-3">
                You have {wishlist.length} books saved
              </p>
              <Link to="/wishlist" className="btn btn-outline-danger w-100 btn-sm">
                View Wishlist
              </Link>
            </div>
          </section>

          {/* Shopping Cart */}
          <section className="card shadow-sm mt-3">
            <div className="card-header bg-light">
              <h6 className="mb-0 d-flex align-items-center">
                <ShoppingBag size={18} className="me-2 text-warning" /> Shopping Cart
              </h6>
            </div>
            <div className="card-body">
              <p className="text-muted small mb-3">
                3 items in cart • ₹1,299 total
              </p>
              <Link to="/cart" className="btn btn-warning w-100 btn-sm">
                Proceed to Checkout
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ReaderHub;
                  <Icon size={18} />
                  <span>{action.title}</span>
                </div>
              );
            })}
          </div>
        </article>

        <article className="dashboard-card">
          <div className="section-header">
            <div>
              <span className="eyebrow">Reader Insights</span>
              <h2>Signals that feel personal and useful</h2>
            </div>
          </div>

          <div className="insight-stack">
            {readerInsights.map((insight) => (
              <div key={insight.title} className="insight-card">
                <p>{insight.title}</p>
                <strong>{insight.value}</strong>
                <span>{insight.note}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="section-block">
        <div className="section-header">
          <div>
            <span className="eyebrow">Recommended Books</span>
            <h2>Books surfaced for reader decision-making</h2>
          </div>
        </div>

        <div className="book-grid">
          {featuredBooks.slice(0, 4).map((book) => (
            <article key={book.id} className="book-card">
              <img className="book-cover" src={book.cover} alt={book.title} />
              <span className="book-tag">{book.category}</span>
              <h3>{book.title}</h3>
              <p className="book-author">{book.author}</p>
              <div className="reader-book-meta">
                <span>
                  <MapPin size={14} /> Nearby stock available
                </span>
                <small>
                  <Star size={14} /> {book.rating}
                </small>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ReaderHub;
