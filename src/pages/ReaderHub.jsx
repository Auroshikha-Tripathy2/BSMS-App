import React from "react";
import { Link } from "react-router-dom";
import { Compass, MapPin, Star } from "lucide-react";
import { featuredBooks } from "../data/books";
import {
  readerActions,
  readerFeatures,
  readerInsights,
} from "../data/perspectives";
import "../styles/pages.css";

function ReaderHub() {
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

      <section className="section-block">
        <div className="section-header">
          <div>
            <span className="eyebrow">Reader Tools</span>
            <h2>Functionalities shaped around the customer journey</h2>
          </div>
        </div>

        <div className="feature-grid">
          {readerFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <article key={feature.title} className="service-card">
                <div className="service-icon">
                  <Icon size={20} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-block dashboard-grid">
        <article className="dashboard-card">
          <div className="section-header">
            <div>
              <span className="eyebrow">Quick Actions</span>
              <h2>Useful actions for the reader dashboard</h2>
            </div>
          </div>

          <div className="action-list">
            {readerActions.map((action) => {
              const Icon = action.icon;

              return (
                <div key={action.title} className="action-item">
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
