import "../../styles/dashboard.css";

export default function Orders() {
  const orders = [
    { id: 101, customer: "Amit", book: "Atomic Habits", amount: 499, status: "Delivered" },
    { id: 102, customer: "Priya", book: "Ikigai", amount: 299, status: "Pending" },
    { id: 103, customer: "Rahul", book: "Deep Work", amount: 450, status: "Shipped" },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="page-title">Orders</h1>

      <table className="custom-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Book</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.book}</td>
              <td>₹{order.amount}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}