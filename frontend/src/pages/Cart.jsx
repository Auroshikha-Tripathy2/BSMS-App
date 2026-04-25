import React, { useState, useEffect } from "react";
import { ShoppingCart, X, Plus, Minus, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { cartAPI, ordersAPI } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../context/CartContext";
import "../styles/pages.css";
import "../styles/home.css";

function Cart() {
  const { user } = useAuth();
  const { refreshCart } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutData, setCheckoutData] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    paymentMethod: "cod",
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await cartAPI.getCart(token);
      setCartItems(response.data?.items || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (bookId, quantity) => {
    try {
      if (quantity < 1) {
        await removeFromCart(bookId);
        return;
      }

      const token = localStorage.getItem("token");
      
      // Update local state first for instant feedback
      setCartItems(prev => prev.map((item) =>
        item.book._id === bookId ? { ...item, quantity } : item
      ));

      // Persist to backend
      await cartAPI.updateCartItem(token, bookId, quantity);
      refreshCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError("Failed to update quantity. Please try again.");
      // Refetch to sync state on error
      fetchCart();
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      
      // Update local state first
      setCartItems(prev => prev.filter((item) => item.book._id !== bookId));
      
      // Persist to backend
      await cartAPI.removeFromCart(token, bookId);
      refreshCart();
    } catch (err) {
      console.error("Error removing from cart:", err);
      setError("Failed to remove item. Please try again.");
      fetchCart();
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const orderData = {
        items: cartItems.map((item) => ({
          book: item.book._id,
          quantity: item.quantity,
        })),
        shippingAddress: checkoutData,
        paymentMethod: checkoutData.paymentMethod,
      };

      const response = await ordersAPI.createOrder(token, orderData);
      alert("Order placed successfully! Order ID: " + response.data?.orderNumber);
      setShowCheckout(false);
      setCheckoutData({
        street: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
        paymentMethod: "cod",
      });
      setCartItems([]);
      fetchCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const totalPrice = calculateTotal();

  if (loading) {
    return (
      <div className="page-shell">
        <div className="alert alert-info text-center py-5">Loading cart...</div>
      </div>
    );
  }

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

        {error && <div className="alert alert-danger">{error}</div>}

        {cartItems.length === 0 ? (
          <div className="alert alert-info text-center py-5">
            <p>Your cart is empty.</p>
            <Link to="/shops" className="btn btn-warning mt-2">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              {cartItems.map((item) => (
                <div key={item.book._id} className="card shadow-sm mb-3">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <img
                          src={item.book.cover || "https://via.placeholder.com/100x150"}
                          alt={item.book.title}
                          style={{ width: "100%", height: "150px", objectFit: "cover" }}
                        />
                      </div>
                      <div className="col-md-5">
                        <h5>{item.book.title}</h5>
                        <p className="text-muted mb-0">{item.book.author}</p>
                        <p className="fw-bold mt-2">₹{item.book.price}</p>
                        <small className="text-muted">
                          {item.book.stock > 0 ? `${item.book.stock} in stock` : "Out of stock"}
                        </small>
                      </div>
                      <div className="col-md-3">
                        <div className="d-flex align-items-center cart-qty-selector">
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.book._id, item.quantity - 1)}
                          >
                            <Minus size={18} />
                          </button>
                          <span className="qty-value">{item.quantity}</span>
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.book._id, item.quantity + 1)}
                            disabled={item.quantity >= item.book.stock}
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2 text-end">
                        <p className="fw-bold mb-2">₹{item.book.price * item.quantity}</p>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeFromCart(item.book._id)}
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
                  <button
                    className="btn btn-theme-solid w-100 mb-2"
                    onClick={() => setShowCheckout(true)}
                  >
                    Proceed to Checkout
                  </button>
                  <Link to="/shops" className="btn btn-theme-outline w-100">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Checkout</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCheckout(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Street Address</label>
                      <input
                        type="text"
                        className="form-control"
                        value={checkoutData.street}
                        onChange={(e) =>
                          setCheckoutData({ ...checkoutData, street: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        value={checkoutData.city}
                        onChange={(e) =>
                          setCheckoutData({ ...checkoutData, city: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        className="form-control"
                        value={checkoutData.state}
                        onChange={(e) =>
                          setCheckoutData({ ...checkoutData, state: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Pincode</label>
                      <input
                        type="text"
                        className="form-control"
                        value={checkoutData.pincode}
                        onChange={(e) =>
                          setCheckoutData({ ...checkoutData, pincode: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={checkoutData.phone}
                      onChange={(e) =>
                        setCheckoutData({ ...checkoutData, phone: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Payment Method</label>
                    <select
                      className="form-control"
                      value={checkoutData.paymentMethod}
                      onChange={(e) =>
                        setCheckoutData({ ...checkoutData, paymentMethod: e.target.value })
                      }
                    >
                      <option value="cod">Cash on Delivery</option>
                      <option value="credit_card">Credit Card</option>
                      <option value="debit_card">Debit Card</option>
                      <option value="upi">UPI</option>
                      <option value="net_banking">Net Banking</option>
                    </select>
                  </div>

                  <div className="alert alert-info d-flex">
                    <AlertCircle size={20} className="me-2" />
                    <div>
                      <strong>Order Total: ₹{totalPrice}</strong>
                      <p className="mb-0 small mt-1">
                        Your order will be processed immediately after payment.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCheckout(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={handleCheckout}
                  disabled={submitting}
                >
                  {submitting ? "Processing..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
