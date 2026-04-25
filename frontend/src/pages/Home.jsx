import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen, Star, Truck, ShieldCheck, Sparkles, ShoppingCart,
  Heart, BarChart2, Package, PlusCircle, Search, SlidersHorizontal, X
} from "lucide-react";
import { collections } from "../data/books";
import { perspectiveCards, readerFeatures, shopkeeperFeatures } from "../data/perspectives";
import { booksAPI, cartAPI, wishlistAPI } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../context/CartContext";
import "../styles/pages.css";
import "../styles/home.css";

const CATEGORIES = ["All", "Fiction", "Self Growth", "Finance", "Fantasy", "Adventure", "Biography", "Productivity", "Lifestyle"];

// Highlights are now dynamic based on DB stats
const getHighlights = (totalBooks) => [
  { label: "Books Available", value: `${totalBooks.toLocaleString()}+` },
  { label: "Trusted Shops", value: "180+" },
  { label: "Cities Served", value: "40+" },
];

// ─── BOOK CARD ────────────────────────────────────────────────────────────────
function BookCard({ book, handleAddToCart, handleAddToWishlist }) {
  return (
    <article className="gz-book-card">
      <div className="gz-book-cover-wrap">
        <img
          src={book.cover || "https://via.placeholder.com/150x200"}
          alt={book.title}
          className="gz-book-cover"
        />
        <button
          className="gz-wishlist-btn"
          onClick={() => handleAddToWishlist(book._id)}
          title="Add to wishlist"
        >
          <Heart size={15} />
        </button>
      </div>
      <div className="gz-book-body">
        <span className="gz-badge">{book.category}</span>
        <h3 className="gz-book-title" title={book.title}>{book.title}</h3>
        <p className="gz-book-author">{book.author}</p>
        <div className="gz-book-footer">
          <span className="gz-price">₹{book.price}</span>
          <span className="gz-rating"><Star size={12} /> {book.rating}</span>
        </div>
        <button
          className="gz-cart-btn"
          onClick={() => handleAddToCart(book._id)}
          disabled={book.stock === 0}
        >
          <ShoppingCart size={14} />
          {book.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}

// ─── SEARCH + FILTER BAR ─────────────────────────────────────────────────────
function SearchFilterBar({ search, setSearch, activeCategory, setActiveCategory }) {
  return (
    <div className="gz-search-section">
      <div className="gz-search-wrap">
        <Search size={18} className="gz-search-icon" />
        <input
          type="text"
          className="gz-search-input"
          placeholder="Search books, authors, genres..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="gz-search-clear" onClick={() => setSearch("")}>
            <X size={16} />
          </button>
        )}
      </div>
      <div className="gz-filter-chips">
        <SlidersHorizontal size={16} className="gz-filter-icon" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`gz-chip ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── READER HOME ─────────────────────────────────────────────────────────────
function ReaderHome({ books, loading, handleAddToCart, handleAddToWishlist, user, totalBooks }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    let result = books;
    if (activeCategory !== "All") result = result.filter(b => b.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(b =>
        b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      );
    }
    return result;
  }, [books, search, activeCategory]);

  return (
    <>
      {/* Hero greeting */}
      <div className="gz-reader-hero">
        <div className="gz-reader-hero-text">
          <p className="gz-eyebrow">Welcome back, {user?.name?.split(" ")[0]}!</p>
          <h1 className="gz-hero-heading">What are you <span className="gz-gradient-text">reading</span> today?</h1>
          <p className="gz-sub">Discover fresh drops, track your reads, and find your next obsession.</p>
          <div className="d-flex gap-3 flex-wrap mt-3">
            <Link to="/status" className="gz-cta-btn">Track Progress</Link>
            <Link to="/wishlist" className="gz-cta-btn-outline">My Wishlist</Link>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <section className="section-block">
        <SearchFilterBar
          search={search}
          setSearch={setSearch}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className="gz-results-header">
          <span>{(search || activeCategory !== "All") ? filtered.length : totalBooks} books found</span>
          <Link to="/shops" className="section-link">Browse all →</Link>
        </div>

        {loading ? (
          <div className="gz-loading">
            {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="gz-skeleton" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="gz-empty">
            <p>No books found for <strong>"{search}"</strong></p>
            <button className="gz-chip active" onClick={() => { setSearch(""); setActiveCategory("All"); }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="gz-book-grid">
            {filtered.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                handleAddToCart={handleAddToCart}
                handleAddToWishlist={handleAddToWishlist}
              />
            ))}
          </div>
        )}
      </section>

      {/* Quick Links */}
      <section className="section-block">
        <div className="section-header">
          <div>
            <span className="eyebrow">Your Space</span>
            <h2>Quick links</h2>
          </div>
        </div>
        <div className="service-grid">
          {[
            { to: "/status", icon: <BookOpen size={20} />, title: "Reading Status", text: "Track pages read, mark books complete." },
            { to: "/wishlist", icon: <Heart size={20} />, title: "My Wishlist", text: "Books saved for later — add to cart anytime." },
            { to: "/orders", icon: <Package size={20} />, title: "My Orders", text: "Order history and delivery tracking." },
          ].map(item => (
            <Link to={item.to} key={item.title} style={{ textDecoration: "none" }}>
              <article className="service-card gz-quick-card">
                <div className="service-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

// ─── SHOPKEEPER HOME ──────────────────────────────────────────────────────────
function ShopkeeperHome({ user }) {
  return (
    <>
      <div className="gz-reader-hero">
        <div className="gz-reader-hero-text">
          <p className="gz-eyebrow">Shop Dashboard</p>
          <h1 className="gz-hero-heading">Hello, <span className="gz-gradient-text">{user?.name?.split(" ")[0]}</span></h1>
          <p className="gz-sub">Manage your inventory, track orders, and grow your bookstore.</p>
          <div className="d-flex gap-3 flex-wrap mt-3">
            <Link to="/shopkeeper" className="gz-cta-btn">Manage Shop</Link>
          </div>
        </div>
      </div>

      <section className="section-block">
        <div className="section-header">
          <div>
            <span className="eyebrow">Quick Actions</span>
            <h2>Your shop tools</h2>
          </div>
        </div>
        <div className="service-grid">
          {[
            { to: "/shopkeeper", icon: <Package size={20} />, title: "Manage Inventory", text: "View, add, and update books in your shop." },
            { to: "/shopkeeper", icon: <PlusCircle size={20} />, title: "Add New Book", text: "List a book with price, stock, and cover." },
            { to: "/shopkeeper", icon: <BarChart2 size={20} />, title: "Analytics", text: "Track orders and monitor stock levels." },
          ].map(item => (
            <Link to={item.to} key={item.title} style={{ textDecoration: "none" }}>
              <article className="service-card gz-quick-card">
                <div className="service-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <div>
            <span className="eyebrow">Features</span>
            <h2>What you can do</h2>
          </div>
        </div>
        <div className="functional-list">
          {shopkeeperFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="functional-item">
                <div className="service-icon"><Icon size={18} /></div>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

// ─── GUEST HOME ───────────────────────────────────────────────────────────────
function GuestHome({ books, loading, handleAddToCart, handleAddToWishlist, totalBooks }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    let result = books;
    if (activeCategory !== "All") result = result.filter(b => b.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(b =>
        b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      );
    }
    return result;
  }, [books, search, activeCategory]);

  return (
    <>
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">ReadNest Book Store</span>
          <h1>Find your next favorite book.</h1>
          <p>Browse popular titles, compare shop collections, and build your reading list in one place.</p>
          <div className="hero-actions">
            <Link to="/shops" className="gz-cta-btn">Explore Shop</Link>
            <Link to="/register" className="gz-cta-btn-outline">Create Account</Link>
          </div>
          <div className="hero-highlights">
            {getHighlights(totalBooks || 0).map((item) => (
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
          {loading ? <p className="mt-3">Loading...</p> : books.slice(0, 3).map((book) => (
            <div key={book._id} className="mini-book-card">
              <img className="mini-book-cover" src={book.cover || "https://via.placeholder.com/60x90"} alt={book.title} />
              <div className="mini-book-info">
                <p className="mini-book-tag">{book.category}</p>
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

      {/* Search + filter */}
      <section className="section-block">
        <div className="section-header mb-1">
          <div>
            <span className="eyebrow">Browse Books</span>
            <h2>Explore our collection</h2>
          </div>
          <Link to="/shops" className="section-link">View all →</Link>
        </div>

        <SearchFilterBar
          search={search}
          setSearch={setSearch}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className="gz-results-header">
          <span>{(search || activeCategory !== "All") ? filtered.length : totalBooks} books found</span>
        </div>

        {loading ? (
          <div className="gz-loading">
            {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="gz-skeleton" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="gz-empty">
            <p>No books match <strong>"{search}"</strong></p>
            <button className="gz-chip active" onClick={() => { setSearch(""); setActiveCategory("All"); }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="gz-book-grid">
            {filtered.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                handleAddToCart={handleAddToCart}
                handleAddToWishlist={handleAddToWishlist}
              />
            ))}
          </div>
        )}
      </section>

      {/* Two perspectives */}
      <section className="section-block">
        <div className="section-header">
          <div>
            <span className="eyebrow">Two Perspectives</span>
            <h2>One platform, two experiences</h2>
          </div>
        </div>
        <div className="perspective-card-grid">
          {perspectiveCards.map((card) => (
            <article key={card.id} className={`perspective-card ${card.accent}`}>
              <span className="eyebrow">{card.eyebrow}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <Link to={card.route} className="section-link">{card.cta}</Link>
            </article>
          ))}
        </div>
      </section>

      {/* Reader Features */}
      <section className="section-block">
        <div className="section-header">
          <div>
            <span className="eyebrow">For Readers</span>
            <h2>Everything a reader needs</h2>
          </div>
          <Link to="/reader" className="section-link">Explore Reader View</Link>
        </div>
        <div className="gz-features-grid">
          {readerFeatures.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="gz-feature-card gz-feature-reader">
                <div className="gz-feature-icon"><Icon size={22} /></div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Shopkeeper Features */}
      <section className="section-block">
        <div className="section-header">
          <div>
            <span className="eyebrow">For Shop Owners</span>
            <h2>Run your bookstore smarter</h2>
          </div>
          <Link to="/shopkeeper" className="section-link">Explore Shop View</Link>
        </div>
        <div className="gz-features-grid">
          {shopkeeperFeatures.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="gz-feature-card gz-feature-shop">
                <div className="gz-feature-icon gz-feature-icon-shop"><Icon size={22} /></div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Collections */}
      <section className="section-block">
        <div className="section-header">
          <div>
            <span className="eyebrow">Popular Collections</span>
            <h2>Quick ways to browse</h2>
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
    </>
  );
}

// ─── MAIN HOME ────────────────────────────────────────────────────────────────
function Home() {
  const { isAuthenticated, user } = useAuth();
  const { refreshCart } = useCart();
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    booksAPI.getAllBooks(1, 100).then(res => {
      setBooks(res.data || []);
      setTotalBooks(res.total || 0);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleAddToCart = async (bookId) => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    try {
      await cartAPI.addToCart(token, bookId, 1);
      refreshCart();
      alert("Added to cart!");
    } catch (err) { alert(err.message || "Failed"); }
  };

  const handleAddToWishlist = async (bookId) => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    try {
      await wishlistAPI.addToWishlist(token, bookId);
      alert("Saved to wishlist!");
    } catch (err) { alert(err.message || "Failed"); }
  };

  const props = { books, loading, handleAddToCart, handleAddToWishlist, totalBooks };

  return (
    <div className="page-shell">
      {isAuthenticated && user?.role === "owner"
        ? <ShopkeeperHome user={user} />
        : isAuthenticated && user?.role === "reader"
          ? <ReaderHome {...props} user={user} />
          : <GuestHome {...props} />
      }
    </div>
  );
}

export default Home;
