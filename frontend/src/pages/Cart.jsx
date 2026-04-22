import React, { useState } from "react";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { featuredBooks } from "../data/books";
import "../styles/pages.css";

function Cart() {
  const [cartItems, setCartItems] = useState(
    featuredBooks.slice(0, 3).map((book) => ({
      ...book,
      quantity: 1,
    }))
  );

  const updateQuantity = (id, amount) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="page-shell">
      <section className="section-block">
        <div className="section-header mb-4">
          <div>
            <h1 className="d-flex align-items-center">
              <ShoppingCart size={30} className="me-2 text-warning" /> Shopping Cart
            </h1>
            <p className="text-muted">{cartItems.length} items</p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="alert alert-info text-center py-5">
            <p>Your cart is empty. Continue shopping!</p>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              {cartItems.map((item) => (
                <div key={item.id} className="card shadow-sm mb-3">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <img
                          src={item.cover}
                          alt={item.title}
                          style={{ width: "100%", height: "150px", objectFit: "cover" }}
                        />
                      </div>
                      <div className="col-md-5">
                        <h5>{item.title}</h5>
                        <p className="text-muted mb-0">{item.author}</p>
                        <p className="fw-bold mt-2">₹{item.price}</p>
                      </div>
                      <div className="col-md-3">
                        <div className="d-flex align-items-center border rounded">
                          <button
                            className="btn btn-sm"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button
                            className="btn btn-sm"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2 text-end">
                        <p className="fw-bold mb-2">₹{item.price * item.quantity}</p>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-lg-4">
              <div className="card shadow-sm sticky-top">
                <div className="card-body">
                  <h5 className="card-title mb-3">Order Summary</h5>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping</span>
                    <span className="text-success">Free</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold mb-3">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <button className="btn btn-warning w-100 mb-2">
                    Checkout
                  </button>
                  <button className="btn btn-outline-secondary w-100">
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Cart;
