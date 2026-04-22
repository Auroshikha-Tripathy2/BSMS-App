import React, { useState } from "react";
import { Heart, X } from "lucide-react";
import { featuredBooks } from "../data/books";
import "../styles/pages.css";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState(featuredBooks.slice(0, 4));

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

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

        {wishlistItems.length === 0 ? (
          <div className="alert alert-info text-center py-5">
            <p>Your wishlist is empty. Start adding books!</p>
          </div>
        ) : (
          <div className="row g-4">
            {wishlistItems.map((book) => (
              <div key={book.id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text text-muted">{book.author}</p>
                    <p className="card-text fw-bold">₹{book.price}</p>
                    <div className="d-flex gap-2">
                      <button className="btn btn-warning flex-grow-1">
                        Add to Cart
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => removeFromWishlist(book.id)}
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
