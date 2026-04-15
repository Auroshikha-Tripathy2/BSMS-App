import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Star, Truck, ShieldCheck, Sparkles } from "lucide-react";
import { collections, featuredBooks } from "../data/books";
import {
  perspectiveCards,
  readerFeatures,
  shopkeeperFeatures,
} from "../data/perspectives";
import "../styles/pages.css";

const highlights = [
  { label: "Books Available", value: "12,000+" },
  { label: "Trusted Shops", value: "180+" },
  { label: "Cities Served", value: "40+" },
];

const services = [
  {
    icon: <Truck size={20} />,
    title: "Fast delivery",
    text: "Get your next read delivered quickly from nearby partner stores.",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Trusted sellers",
    text: "Explore curated shops with verified stock and reliable pricing.",
  },
  {
    icon: <Sparkles size={20} />,
    title: "Personal picks",
    text: "Discover recommendations for study, leisure, and gifting.",
  },
];

function Home() {
  return (
    <div className="page-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">ReadNest Book Store</span>
          <h1>Find your next favorite book, from exam prep to feel-good fiction.</h1>
          <p>
            Browse popular titles, compare shop collections, and build your reading
            list in one clean place.
          </p>

          <div className="hero-actions">
            <Link to="/shops" className="btn btn-warning btn-lg">
              Explore Shop
            </Link>
            <Link to="/register" className="btn btn-outline-dark btn-lg">
              Create Account
            </Link>
          </div>

          <div className="hero-highlights">
            {highlights.map((item) => (
              <div key={item.label} className="highlight-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-panel-top">
            <BookOpen size={24} />
            <span>Top picks this week</span>
          </div>

          {featuredBooks.slice(0, 3).map((book) => (
            <div key={book.id} className="mini-book-card">
              <img className="mini-book-cover" src={book.cover} alt={book.title} />
              <div className="mini-book-info">
                <p className="mini-book-tag">{book.tag}</p>
                <h3>{book.title}</h3>
                <p className="mini-book-author">{book.author}</p>
              </div>
              <div className="mini-book-meta">
                <span>₹{book.price}</span>
                <small>{book.rating}★</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <div>
            <span className="eyebrow">Two Perspectives</span>
            <h2>One platform, two distinct experiences</h2>
          </div>
        </div>

        <div className="perspective-card-grid">
          {perspectiveCards.map((card) => (
            <article key={card.id} className={`perspective-card ${card.accent}`}>
              <span className="eyebrow">{card.eyebrow}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <Link to={card.route} className="section-link">
                {card.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <div>
            <span className="eyebrow">Home Essentials</span>
            <h2>Everything a bookstore home page should surface first</h2>
          </div>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block dual-feature-layout">
        <article className="dashboard-card">
          <div className="section-header">
            <div>
              <span className="eyebrow">Reader Functionalities</span>
              <h2>Customer-side tools that should exist in the product</h2>
            </div>
            <Link to="/reader" className="section-link">
              See reader view
            </Link>
          </div>

          <div className="functional-list">
            {readerFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <div key={feature.title} className="functional-item">
                  <div className="service-icon">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="dashboard-card">
          <div className="section-header">
            <div>
              <span className="eyebrow">Shopkeeper Functionalities</span>
              <h2>Business-side tools that make operations efficient</h2>
            </div>
            <Link to="/shopkeeper" className="section-link">
              See shopkeeper view
            </Link>
          </div>

          <div className="functional-list">
            {shopkeeperFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <div key={feature.title} className="functional-item">
                  <div className="service-icon">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <section className="section-block">
        <div className="section-header">
          <div>
            <span className="eyebrow">Popular Collections</span>
            <h2>Quick ways to start browsing</h2>
          </div>
        </div>

        <div className="collection-grid">
          {collections.map((collection, index) => (
            <div key={collection} className="collection-card">
              <span>0{index + 1}</span>
              <h3>{collection}</h3>
              <p>Fresh titles, reader favorites, and affordable picks.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <div>
            <span className="eyebrow">Featured Books</span>
            <h2>Reader favorites on the home page</h2>
          </div>
          <Link to="/shops" className="section-link">
            View all books
          </Link>
        </div>

        <div className="book-grid">
          {featuredBooks.slice(0, 4).map((book) => (
            <article key={book.id} className="book-card">
              <img className="book-cover" src={book.cover} alt={book.title} />
              <span className="book-tag">{book.tag}</span>
              <h3>{book.title}</h3>
              <p className="book-author">{book.author}</p>
              <div className="book-footer">
                <span>₹{book.price}</span>
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

export default Home;
