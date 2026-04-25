import "../../styles/dashboard.css";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { LayoutDashboard, Package, Plus, ChartLine, LogOut } from "lucide-react";
import { TrendingUp, BookOpen, AlertTriangle, ShoppingBagIcon, PenBox } from "lucide-react";
import logo from "../../assets/logo.png";

function AdminDashboard() {
  const navigate = useNavigate();

  const { onLogout } = useOutletContext() || {};
  const [inventory, setInventory] = useState([
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 24.99,
    stock: 39,
    image: "https://covers.openlibrary.org/b/id/10523338-L.jpg"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    price: 27.99,
    stock: 12,
    image: "https://covers.openlibrary.org/b/id/11153219-L.jpg"
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 22.99,
    stock: 5,
    image: "https://covers.openlibrary.org/b/id/9259256-L.jpg"
  },
  {
    title: "Educated",
    author: "Tara Westover",
    price: 26.99,
    stock: 30,
    image: "https://covers.openlibrary.org/b/id/9251996-L.jpg"
  }
]);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
  });

  

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingBagIcon},
    { id: "analytics", label: "Analytics", icon: ChartLine}
  ];

  const lowStockBooks = inventory.filter((b) => b.stock < 10);

  const handleAddBook = (e) => {
    e.preventDefault();
    setInventory([...inventory, { ...newBook, stock: Number(newBook.stock) }]);
    setActiveTab("inventory");
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">

        {/* SIDEBAR */}
        <div className={collapsed ? "col-md-1 sidebar collapsed" : "col-md-3 sidebar"}>

          {/* LOGO (toggle) */}
          <div className="text-center mt-4">
            <button
              className="btn border-0"
              onClick={() => setCollapsed(!collapsed)}
            >
              <img
                src={logo}
                alt="logo"
                style={{ width: collapsed ? "60px" : "150px" }}
              />
            </button>

            {!collapsed && <p className="mt-2">Manage your Store</p>}
          </div>

          {/* NAV */}
          <div className="mt-4 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  className={`btn w-100 mb-2 ${
                    activeTab === item.id ? "btn-warning" : "btn-light"
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon size={18} />
                  {!collapsed && <span className="ms-2">{item.label}</span>}
                </button>
              );
            })}
          </div>

          {/* LOGOUT */}
          <div className="p-2 mt-auto">
            <button className="btn btn-dark w-100" onClick={onLogout}>
              {!collapsed ? "Logout" : "⏻"}
            </button>
          </div>
        </div>

        {/* MAIN PANEL */}
        <div className={collapsed ? "col-md-11 main-panel" : "col-md-9 main-panel"}>

          {/* TOP BAR */}
          <div className="topbar">
            <h5>
              {navItems.find((i) => i.id === activeTab)?.label}
            </h5>

            <input
              type="text"
              className="form-control w-25"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* CONTENT */}
          <div className="p-4">

            {/* DASHBOARD */}
            {activeTab === "dashboard" && (
            <>
                {/* STATS */}
                <div className="row g-4 mb-4">

                    {/* SALES */}
                    <div className="col-md-3">
                            <div className="stat-card">
                            <div className="stat-header">
                                <TrendingUp size={28} />
                                <span>Total Sales</span>
                                
                            </div>
                            <h3>₹12,345</h3>
                            <p className="text-success">+12.5% from last month</p>
                        </div>
                    </div>

                    {/* ORDERS */}
                    <div className="col-md-3">
                        <div className="stat-card">
                            <div className="stat-header">
                                <Package size={28} />
                                <span>Total Orders</span>
                                
                            </div>
                            <h3>234</h3>
                            <p className="text-success">+8.3% from last month</p>
                        </div>
                    </div>

                    {/* BOOKS */}
                    <div className="col-md-3">
                        <div className="stat-card">
                            <div className="stat-header">
                                <BookOpen size={28} />
                                <span>Books in Stock</span>
                                
                            </div>
                            <h3>{inventory.length}</h3>
                            <p className="text-muted">Total catalog items</p>
                        </div>
                    </div>

                    {/* LOW STOCK */}
                    <div className="col-md-3">
                        <div className="stat-card warning">
                            <div className="stat-header">
                                <AlertTriangle size={28} />
                                <span>Low Stock</span>
                                
                            </div>
                            <h3>{lowStockBooks.length}</h3>
                            <p className="text-danger">Requires attention</p>
                        </div>
                    </div>

                </div>

                {/* ALERT */}
                {lowStockBooks.length > 0 && (
                <div className="alert-box mb-4">
                    <div>
                    <strong>Low Stock Alert</strong>
                    <p className="mb-2">
                        {lowStockBooks.length} items are running low on stock
                    </p>
                    <button
                        className="btn btn-warning btn-sm"
                        onClick={() => setActiveTab("inventory")}
                    >
                        View Inventory
                    </button>
                    </div>
                </div>
                )}

                {/* TABLE */}
                <div className="table-wrapper">

  <h4 className="table-title">Recent Orders</h4>

  <div className="custom-table">
    <table className="table mb-0">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Book</th>
          <th>Date</th>
          <th>Status</th>
          <th className="text-end">Total</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>#1001</td>
          <td>Sarah Johnson</td>
          <td>The Great Gatsby</td>
          <td>2026-04-12</td>
          <td><span className="badge success">Delivered</span></td>
          <td className="text-end">₹15.99</td>
        </tr>

        <tr>
          <td>#1002</td>
          <td>Michael Chen</td>
          <td>1984</td>
          <td>2026-04-13</td>
          <td><span className="badge warning">Processing</span></td>
          <td className="text-end">₹14.99</td>
        </tr>

        <tr>
          <td>#1003</td>
          <td>Emma Wilson</td>
          <td>To Kill a Mockingbird</td>
          <td>2026-04-14</td>
          <td><span className="badge primary">Shipped</span></td>
          <td className="text-end">₹12.99</td>
        </tr>

        <tr>
          <td>#1004</td>
          <td>James Brown</td>
          <td>Pride and Prejudice</td>
          <td>2026-04-14</td>
          <td><span className="badge warning">Processing</span></td>
          <td className="text-end">₹13.99</td>
        </tr>
      </tbody>
    </table>
  </div>

</div>
            </>
            )}
            {/* INVENTORY */}
            {activeTab === "inventory" && (
  <div>

    {/* HEADER */}
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h4 className="inventory-title">Inventory Management</h4>

      <button
        className="btn add-btn"
        onClick={() => setActiveTab("addbook")}
      >
        + Add Book
      </button>
    </div>

    {/* TABLE */}
    <div className="inventory-table">

      <table className="table mb-0">
        <thead>
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>

        <tbody>

          {inventory.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No books available
              </td>
            </tr>
          ) : (
            inventory.map((book, i) => (
              <tr key={i}>

                {/* BOOK */}
                <td>
                  <div className="book-cell">
                    <img
                      src={book.image}
                      alt={book.title}
                      onError={(e) => (e.target.src = "/placeholder.png")}
                    />
                    <span>{book.title}</span>
                  </div>
                </td>

                {/* AUTHOR */}
                <td className="text-muted">{book.author}</td>

                {/* PRICE */}
                <td className="fw-semibold">${book.price}</td>

                {/* STOCK */}
                <td>
                  <input
                    type="number"
                    value={book.stock}
                    className="stock-input"
                    onChange={(e) => {
                      const updated = [...inventory];
                      updated[i].stock = Number(e.target.value);
                      setInventory(updated);
                    }}
                  />
                </td>

                {/* STATUS */}
                <td>
                  {book.stock < 10 ? (
                    <span className="status low">Low Stock</span>
                  ) : (
                    <span className="status ok">In Stock</span>
                  )}
                </td>

                {/* ACTION */}
                <td className="text-end">
                  <PenBox />
                </td>

              </tr>
            ))
          )}

        </tbody>
      </table>

    </div>
  </div>
)}

            {/* ADD BOOK */}
           {activeTab === "addbook" && (
  <div className="addbook-wrapper">

    <h3 className="addbook-title">Add New Book</h3>

    <div className="addbook-card">

      <form onSubmit={handleAddBook}>

        {/* TITLE */}
        <div className="mb-3">
          <label>Book Title</label>
          <input
            type="text"
            placeholder="Enter book title"
            value={newBook.title}
            onChange={(e) =>
              setNewBook({ ...newBook, title: e.target.value })
            }
            className="form-input"
            required
          />
        </div>

        {/* AUTHOR */}
        <div className="mb-3">
          <label>Author</label>
          <input
            type="text"
            placeholder="Enter author name"
            value={newBook.author}
            onChange={(e) =>
              setNewBook({ ...newBook, author: e.target.value })
            }
            className="form-input"
            required
          />
        </div>

        {/* PRICE + STOCK */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Price ($)</label>
            <input
              type="number"
              placeholder="0.00"
              value={newBook.price}
              onChange={(e) =>
                setNewBook({ ...newBook, price: e.target.value })
              }
              className="form-input"
              required
            />
          </div>

          <div className="col-md-6">
            <label>Stock</label>
            <input
              type="number"
              placeholder="0"
              value={newBook.stock}
              onChange={(e) =>
                setNewBook({ ...newBook, stock: e.target.value })
              }
              className="form-input"
              required
            />
          </div>
        </div>

        {/* ISBN */}
        <div className="mb-3">
          <label>ISBN</label>
          <input
            type="text"
            placeholder="978-0-00-000000-0"
            value={newBook.isbn || ""}
            onChange={(e) =>
              setNewBook({ ...newBook, isbn: e.target.value })
            }
            className="form-input"
          />
        </div>

        {/* GENRE */}
        <div className="mb-4">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Fiction, Non-Fiction, Mystery..."
            value={newBook.genre || ""}
            onChange={(e) =>
              setNewBook({ ...newBook, genre: e.target.value })
            }
            className="form-input"
          />
        </div>

        {/* BUTTON */}
        <button type="submit" className="btn-warning btn-sm">
          Add Book to Inventory
        </button>

      </form>
    </div>
  </div>
)}

          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;

// import "../../styles/dashboard.css";

// export default function Dashboard() {
//   return (
//     <div className="dashboard-container">
//       <h1 className="page-title">Dashboard</h1>

//       <div className="card-grid">
//         <div className="card">
//           <h3>Total Books</h3>
//           <p>120</p>
//         </div>

//         <div className="card">
//           <h3>Orders</h3>
//           <p>45</p>
//         </div>

//         <div className="card">
//           <h3>Revenue</h3>
//           <p>₹12,500</p>
//         </div>

//         <div className="card">
//           <h3>Users</h3>
//           <p>300</p>
//         </div>
//       </div>
//     </div>
//   );
// }