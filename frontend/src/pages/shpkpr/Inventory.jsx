import "../../styles/dashboard.css";

export default function Inventory() {
  const books = [
    { id: 1, name: "Atomic Habits", stock: 12, price: 499 },
    { id: 2, name: "Rich Dad Poor Dad", stock: 8, price: 399 },
    { id: 3, name: "Ikigai", stock: 15, price: 299 },
    { id: 4, name: "Deep Work", stock: 5, price: 450 },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="page-title">Inventory</h1>

      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Book Name</th>
            <th>Stock</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>{book.stock}</td>
              <td>₹{book.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}