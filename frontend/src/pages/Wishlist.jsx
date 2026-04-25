import React, { useState, useEffect } from "react";
import { Heart, X, ShoppingCart } from "lucide-react";
import { wishlistAPI, cartAPI } from "../services/api";
import "../styles/pages.css";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch wishlist on mount
  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await wishlistAPI.getWishlist(token);
      setWishlistItems(response.data?.books || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      await wishlistAPI.removeFromWishlist(token, bookId);
      setWishlistItems(wishlistItems.filter((item) => item._id !== bookId));
      alert("Book removed from wishlist");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddToCart = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      await cartAPI.addToCart(token, bookId, 1);
      alert("Book added to cart!");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="page-shell">
        <div className="alert alert-info text-center py-5">Loading wishlist...</div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <section className="section-block">
        <div className="section-header mb-4">
          <div>
            <h1 className="d-flex align-items-center">
              <Heart size={30} className="me-2 text-danger" /> My Wishlist
            </h1>
            <p className="text-muted">{wishlistItems.length} items in your wishlist</p>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {wishlistItems.length === 0 ? (
          <div className="alert alert-info text-center py-5">
            <p>Your wishlist is empty. Start adding books!</p>
          </div>
        ) : (
          <div className="row g-4">
            {wishlistItems.map((book) => (
              <div key={book._id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={book.cover || "https://via.placeholder.com/300x400"}
                    alt={book.title}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text text-muted">{book.author}</p>
                    <div className="mb-2">
                      <p className="card-text fw-bold mb-1">₹{book.price}</p>
                      <small className="text-muted">
                        {book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}
                      </small>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-warning flex-grow-1"
                        onClick={() => handleAddToCart(book._id)}
                        disabled={book.stock === 0}
                      >
                        <ShoppingCart size={16} className="me-1" />
                        {book.stock === 0 ? "Out of Stock" : "Add to Cart"}
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => removeFromWishlist(book._id)}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Wishlist;
