import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ClipboardList, PackageSearch, Store } from "lucide-react";
import { featuredBooks } from "../data/books";
import {
  businessInsights,
  shopkeeperFeatures,
  shopkeeperTasks,
} from "../data/perspectives";
import "../styles/pages.css";

function ShopkeeperHub() {
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

      <section className="section-block">
        <div className="section-header">
          <div>
            <span className="eyebrow">Shopkeeper Tools</span>
            <h2>Functionalities shaped around store efficiency</h2>
          </div>
        </div>

        <div className="feature-grid">
          {shopkeeperFeatures.map((feature) => {
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
              <span className="eyebrow">Operational Queue</span>
              <h2>What the store should act on next</h2>
            </div>
          </div>

          <div className="task-stack">
            {shopkeeperTasks.map((task, index) => (
              <div key={task} className="task-item">
                <span className="task-index">{index + 1}</span>
                <p>{task}</p>
              </div>
            ))}
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
