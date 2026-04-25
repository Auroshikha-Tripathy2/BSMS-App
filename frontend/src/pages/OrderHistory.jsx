import React, { useState, useEffect } from "react";
import { Package, Calendar, DollarSign, CheckCircle, AlertCircle } from "lucide-react";
import { ordersAPI } from "../services/api";
import "../styles/pages.css";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await ordersAPI.getOrders(token);
      setOrders(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "success";
      case "confirmed":
        return "info";
      case "shipped":
        return "primary";
      case "pending":
        return "warning";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <div className="page-shell">
        <div className="alert alert-info text-center py-5">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <section className="section-block">
        <div className="section-header mb-4">
          <div>
            <h1 className="d-flex align-items-center">
              <Package size={30} className="me-2" /> Order History
            </h1>
            <p className="text-muted">{orders.length} orders</p>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {orders.length === 0 ? (
          <div className="alert alert-info text-center py-5">
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div>
            {orders.map((order) => (
              <div key={order._id} className="card shadow-sm mb-3">
                <div className="card-body">
                  <div className="row align-items-start">
                    <div className="col-md-6">
                      <h5 className="mb-1">{order.orderNumber}</h5>
                      <div className="d-flex align-items-center text-muted small mb-2">
                        <Calendar size={16} className="me-2" />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div className="small">
                        <strong>{order.items.length} items</strong>
                        <ul className="mb-0 ms-3">
                          {order.items.map((item, idx) => (
                            <li key={idx}>
                              {item.book?.title || "Unknown Book"} (Qty: {item.quantity})
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="text-end">
                        <div className="d-flex align-items-center justify-content-end text-muted small mb-2">
                          <DollarSign size={16} className="me-1" />
                          <span>₹{order.totalAmount}</span>
                        </div>
                        <div className="mb-2">
                          <span className={`badge bg-${getStatusColor(order.status)}`}>
                            {getStatusLabel(order.status)}
                          </span>
                        </div>
                        <div className="small text-muted">
                          <p className="mb-1">
                            <strong>Payment:</strong> {order.paymentMethod}
                          </p>
                          <p className="mb-0">
                            <strong>Status:</strong>{" "}
                            <span className={`text-${getStatusColor(order.paymentStatus)}`}>
                              {getStatusLabel(order.paymentStatus)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3 text-end">
                      <div className="small text-muted">
                        <p className="mb-1">
                          <strong>Shipping To:</strong>
                        </p>
                        <p className="mb-0">
                          {order.shippingAddress?.street}, {order.shippingAddress?.city}
                        </p>
                        <p className="mb-3">{order.shippingAddress?.state} {order.shippingAddress?.pincode}</p>
                      </div>
                      <button className="btn btn-sm btn-outline-primary">
                        View Details
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

export default OrderHistory;
