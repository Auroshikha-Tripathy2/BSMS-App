import React from "react";
import { Package, Calendar, DollarSign, CheckCircle } from "lucide-react";
import "../styles/pages.css";

function OrderHistory() {
  const orders = [
    {
      id: "ORD-001",
      date: "2024-03-15",
      items: 3,
      total: 599,
      status: "delivered",
      books: ["The Great Gatsby", "To Kill a Mockingbird", "1984"],
    },
    {
      id: "ORD-002",
      date: "2024-02-28",
      items: 2,
      total: 399,
      status: "delivered",
      books: ["Pride and Prejudice", "Jane Eyre"],
    },
    {
      id: "ORD-003",
      date: "2024-02-10",
      items: 1,
      total: 299,
      status: "processing",
      books: ["Wuthering Heights"],
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "success";
      case "processing":
        return "info";
      case "shipped":
        return "primary";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

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

        {orders.length === 0 ? (
          <div className="alert alert-info text-center py-5">
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div>
            {orders.map((order) => (
              <div key={order.id} className="card shadow-sm mb-3">
                <div className="card-body">
                  <div className="row align-items-start">
                    <div className="col-md-6">
                      <h5 className="mb-1">{order.id}</h5>
                      <div className="d-flex align-items-center text-muted small mb-2">
                        <Calendar size={16} className="me-2" />
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                      <div className="small">
                        <strong>{order.items} items</strong>
                        <ul className="mb-0 ms-3">
                          {order.books.map((book, idx) => (
                            <li key={idx}>{book}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="text-end">
                        <div className="d-flex align-items-center justify-content-end text-muted small mb-2">
                          <DollarSign size={16} className="me-1" />
                          <span>₹{order.total}</span>
                        </div>
                        <span
                          className={`badge bg-${getStatusColor(order.status)}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                    </div>

                    <div className="col-md-3 text-end">
                      <button className="btn btn-sm btn-outline-primary mb-2">
                        View Details
                      </button>
                      <br />
                      <button className="btn btn-sm btn-outline-secondary">
                        Reorder
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
