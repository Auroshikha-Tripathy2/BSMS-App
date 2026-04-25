import React, { useState, useEffect } from "react";
import { ShoppingBag, Star, ShoppingCart, Heart } from "lucide-react";
import { booksAPI, cartAPI, wishlistAPI } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import "../styles/pages.css";

function Shops() {
  const { isAuthenticated, user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [wishlistIds, setWishlistIds] = useState([]);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await booksAPI.getAllBooks(page, 12, category, search);
        setBooks(response.data || []);
        setTotalPages(response.pages || 1);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page, category, search]);

  // Fetch wishlist on mount
  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchWishlist = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await wishlistAPI.getWishlist(token);
          setWishlistIds(response.data?.books?.map((b) => b._id) || []);
        } catch (err) {
          console.error("Error fetching wishlist:", err);
        }
      };
      fetchWishlist();
    }
  }, [isAuthenticated, user]);

  const handleAddToCart = async (bookId) => {
    if (!isAuthenticated) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await cartAPI.addToCart(token, bookId, 1);
      alert("Book added to cart!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleWishlist = async (bookId) => {
    if (!isAuthenticated) {
      alert("Please login to add to wishlist");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (wishlistIds.includes(bookId)) {
        await wishlistAPI.removeFromWishlist(token, bookId);
        setWishlistIds(wishlistIds.filter((id) => id !== bookId));
      } else {
        await wishlistAPI.addToWishlist(token, bookId);
        setWishlistIds([...wishlistIds, bookId]);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="page-shell">
      <section className="shop-banner">
        <div>
          <span className="eyebrow">Book Shop</span>
          <h1>Browse our collection of books</h1>
          <p>
            Compare titles, discover popular reads, and shop by category from one
            simple storefront.
          </p>
        </div>

        <div className="shop-banner-badge">
          <ShoppingBag size={20} />
          <span>{books.length} books available</span>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="section-block bg-light p-3">
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search books or authors..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className="col-md-6">
            <select
              className="form-control"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Categories</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Self Growth">Self Growth</option>
              <option value="Biography">Biography</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Adventure">Adventure</option>
              <option value="Productivity">Productivity</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
        </div>
      </section>

      {error && <div className="alert alert-danger m-3">{error}</div>}
      {loading && <div className="alert alert-info m-3">Loading books...</div>}

      <section className="section-block section-tight">
        {books.length === 0 && !loading ? (
          <div className="alert alert-warning text-center">No books found</div>
        ) : (
          <div className="book-grid">
            {books.map((book) => (
              <article key={book._id} className="book-card position-relative">
                <button
                  className="btn btn-sm position-absolute top-0 end-0 m-2"
                  onClick={() => handleWishlist(book._id)}
                  style={{
                    background: wishlistIds.includes(book._id) ? "#ff6b6b" : "#f0f0f0",
                    border: "none",
                    zIndex: 10,
                  }}
                >
                  <Heart
                    size={16}
                    fill={wishlistIds.includes(book._id) ? "white" : "none"}
                    color={wishlistIds.includes(book._id) ? "white" : "gray"}
                  />
                </button>

                <img className="book-cover" src={book.cover || "https://via.placeholder.com/300x400"} alt={book.title} />
                <span className="book-tag">{book.category}</span>
                <h3>{book.title}</h3>
                <p className="book-author">{book.author}</p>
                <p className="book-description" style={{ fontSize: "0.9em" }}>
                  {book.description?.substring(0, 100) || "No description available"}
                </p>
                <div className="book-footer d-flex justify-content-between align-items-center">
                  <div>
                    <span className="fw-bold">₹{book.price}</span>
                    {book.originalPrice && (
                      <small className="text-muted ms-2" style={{ textDecoration: "line-through" }}>
                        ₹{book.originalPrice}
                      </small>
                    )}
                  </div>
                  <small>
                    <Star size={14} /> {book.rating || 0}
                  </small>
                </div>
                <button
                  className="btn btn-warning w-100 mt-2 btn-sm"
                  onClick={() => handleAddToCart(book._id)}
                  disabled={book.stock === 0}
                >
                  <ShoppingCart size={16} className="me-1" />
                  {book.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="section-block text-center">
          <nav>
            <ul className="pagination justify-content-center">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(Math.max(1, page - 1))}>
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <li key={p} className={`page-item ${page === p ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setPage(p)}>
                    {p}
                  </button>
                </li>
              ))}
              <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(Math.min(totalPages, page + 1))}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </section>
      )}
    </div>
  );
}

export default Shops;
