import React from "react";
import { ShoppingBag, Star } from "lucide-react";
import { featuredBooks } from "../data/books";
import "../styles/pages.css";

function Shops() {
  return (
    <div className="page-shell">
      <section className="shop-banner">
        <div>
          <span className="eyebrow">Book Shop</span>
          <h1>Browse multiple books with prices in rupees</h1>
          <p>
            Compare titles, discover popular reads, and shop by category from one
            simple storefront.
          </p>
        </div>

        <div className="shop-banner-badge">
          <ShoppingBag size={20} />
          <span>{featuredBooks.length} books ready to explore</span>
        </div>
      </section>

      <section className="section-block section-tight">
        <div className="book-grid">
          {featuredBooks.map((book) => (
            <article key={book.id} className="book-card">
              <img className="book-cover" src={book.cover} alt={book.title} />
              <span className="book-tag">{book.category}</span>
              <h3>{book.title}</h3>
              <p className="book-author">{book.author}</p>
              <p className="book-description">
                Carefully selected for readers looking for quality, value, and a
                great next read.
              </p>
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

export default Shops;
