import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  Star,
  ShoppingBag,
  BookOpen,
  Heart,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { featuredBooks } from "../data/books";
import { readerMetrics } from "../data/perspectives";
import { useAuth } from "../hooks/useAuth";
import "../styles/pages.css";

function ReaderHub() {
  const { isAuthenticated, user } = useAuth();
  const [wishlist, setWishlist] = useState([1, 3, 5]);
  const [priceAlerts] = useState([2, 4]);

  // Toggle wishlist
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // ================= UNAUTHENTICATED VIEW =================
  if (!isAuthenticated) {
    return (
      <div className="page-shell perspective-page">
        <section className="perspective-hero">
          <div className="hero-copy">
            <span className="eyebrow">Reader Perspective</span>
            <h1>A calmer, smarter experience for readers and customers.</h1>
            <p>
              Designed for discovery, comparison, ordering, and reading progress.
            </p>

            <div className="hero-actions">
              <Link to="/shops" className="btn btn-warning btn-lg">
                Browse Books
              </Link>
              <Link to="/login" className="btn btn-outline-dark btn-lg">
                Sign In
              </Link>
            </div>
          </div>

          <div className="perspective-panel">
            <div className="perspective-panel-head">
              <Compass size={20} />
              <span>Reader dashboard</span>
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
              <strong>Sign in to unlock your dashboard</strong>
              <span>
                Wishlist, alerts, and orders will appear after login.
              </span>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ================= AUTHENTICATED VIEW =================
  return (
    <div className="page-shell">
      {/* Header */}
      <section className="section-block bg-light mb-4 p-4">
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

      {/* Metrics */}
      <section className="section-block">
        <div className="row g-3 mb-4">
          {readerMetrics.map((metric) => (
            <div key={metric.label} className="col-md-6 col-lg-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <p className="text-muted small">{metric.label}</p>
                  <h3 className="text-warning">{metric.value}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="row g-4">
        {/* LEFT */}
        <div className="col-lg-8">
          {/* Currently Reading */}
          <section className="section-block">
            <h4 className="mb-3 d-flex align-items-center">
              <BookOpen size={20} className="me-2 text-info" />
              Currently Reading
            </h4>

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
                      <h5>{book.title}</h5>
                      <small className="text-muted">{book.author}</small>

                      <div className="progress mt-2" style={{ height: "6px" }}>
                        <div
                          className="progress-bar bg-warning"
                          style={{ width: "65%" }}
                        />
                      </div>

                      <small className="text-muted">65% completed</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommendations */}
          <section className="section-block">
            <h4 className="mb-3 d-flex align-items-center">
              <TrendingUp size={20} className="me-2 text-primary" />
              Recommended
            </h4>

            <div className="row g-3">
              {featuredBooks.slice(4, 8).map((book) => (
                <div key={book.id} className="col-md-6">
                  <div className="card">
                    <img
                      src={book.cover}
                      alt={book.title}
                      style={{ height: "180px", objectFit: "cover" }}
                    />

                    <div className="card-body">
                      <h6>{book.title}</h6>
                      <small className="text-muted">{book.author}</small>

                      <div className="d-flex justify-content-between mt-2">
                        <span>
                          <Star size={14} /> {book.rating}
                        </span>

                        <button
                          onClick={() => toggleWishlist(book.id)}
                          className={`btn btn-sm ${
                            wishlist.includes(book.id)
                              ? "btn-danger"
                              : "btn-outline-danger"
                          }`}
                        >
                          <Heart size={14} />
                        </button>
                      </div>

                      <button className="btn btn-warning btn-sm w-100 mt-2">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <div className="col-lg-4">
          {/* Price Alerts */}
          <div className="card shadow-sm mb-3">
            <div className="card-header">
              <AlertCircle size={16} /> Price Alerts
            </div>

            <div className="card-body">
              {featuredBooks
                .filter((b) => priceAlerts.includes(b.id))
                .map((book) => (
                  <div key={book.id} className="mb-2">
                    <strong>{book.title}</strong>
                    <p className="small text-muted">₹{book.price}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Wishlist */}
          <div className="card shadow-sm">
            <div className="card-header">
              <Heart size={16} /> Wishlist
            </div>

            <div className="card-body">
              <p>{wishlist.length} books saved</p>

              <Link to="/wishlist" className="btn btn-outline-danger w-100">
                View Wishlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReaderHub;