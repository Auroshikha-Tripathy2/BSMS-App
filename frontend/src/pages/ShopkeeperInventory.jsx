import React, { useState, useEffect, useMemo } from "react";
import { 
  Package, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  ArrowUpDown, 
  Filter, 
  ExternalLink,
  Eye,
  Heart,
  ShoppingCart,
  DollarSign
} from "lucide-react";
import { shopkeeperAPI } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import "../styles/pages.css";

function ShopkeeperInventory() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  
  // Form state
  const initialFormState = {
    title: "",
    author: "",
    category: "Fiction",
    price: "",
    stock: "",
    cover: "",
    description: ""
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await shopkeeperAPI.getInventoryStats(token);
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching inventory:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      const token = localStorage.getItem("token");
      await shopkeeperAPI.deleteBook(token, id);
      setBooks(books.filter(b => b._id !== id));
    } catch (err) {
      alert("Failed to delete book");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (editingBook) {
        const res = await shopkeeperAPI.updateBook(token, editingBook._id, formData);
        setBooks(books.map(b => b._id === editingBook._id ? { ...b, ...res.data } : b));
        // Also refresh to get latest aggregated stats
        fetchInventory();
      } else {
        const res = await shopkeeperAPI.addBook(token, formData);
        // Add basic book info to list immediately
        const newBook = {
          ...res.data,
          unitsSold: 0,
          wishlistedBy: 0,
          cartedBy: 0,
          revenue: 0
        };
        setBooks([newBook, ...books]);
      }
      setShowModal(false);
      setFormData(initialFormState);
      setEditingBook(null);
    } catch (err) {
      console.error("Submit error:", err);
      alert(err.message || "Operation failed. Please check all fields.");
    }
  };

  const openEditModal = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category || "Fiction",
      price: book.price,
      stock: book.stock,
      cover: book.cover || "",
      description: book.description || ""
    });
    setShowModal(true);
  };

  const filteredBooks = useMemo(() => {
    return books.filter(b => 
      b.title.toLowerCase().includes(search.toLowerCase()) || 
      b.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [books, search]);

  if (loading) return <div className="text-center p-5">Loading Inventory...</div>;

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1 text-theme-header">Inventory Management</h2>
          <p className="text-muted">Track your stock levels and sales performance per item.</p>
        </div>
        <button 
          className="btn btn-theme-solid px-4 py-2 rounded-3 d-flex align-items-center"
          onClick={() => {
            setEditingBook(null);
            setFormData(initialFormState);
            setShowModal(true);
          }}
        >
          <Plus size={18} className="me-2" /> Add New Book
        </button>
      </div>

      {/* Filters and Search */}
      <div className="card border-0 shadow-sm rounded-4 mb-4 card-glass animate-slideUp" style={{ animationDelay: '0.1s' }}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group bg-transparent border border-secondary rounded-3 overflow-hidden">
                <span className="input-group-text bg-transparent border-0">
                  <Search size={18} className="text-muted" />
                </span>
                <input 
                  type="text" 
                  className="form-control bg-transparent border-0 shadow-none text-theme-body" 
                  placeholder="Search by title or author..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-md-end gap-2">
              <button className="btn btn-outline-secondary d-flex align-items-center rounded-3 border-secondary text-theme-body">
                <Filter size={18} className="me-2" /> Filter
              </button>
              <button className="btn btn-outline-secondary d-flex align-items-center rounded-3 border-secondary text-theme-body">
                <ArrowUpDown size={18} className="me-2" /> Sort
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden card-glass animate-slideUp" style={{ animationDelay: '0.2s' }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 text-theme-body">
            <thead className="bg-theme-muted text-theme-muted small text-uppercase fw-bold">
              <tr>
                <th className="px-4 py-3 border-0">Book Details</th>
                <th className="py-3 border-0">Stock</th>
                <th className="py-3 border-0">Price</th>
                <th className="py-3 border-0">Sold</th>
                <th className="py-3 border-0">Engagement</th>
                <th className="py-3 border-0">Revenue</th>
                <th className="py-3 border-0 text-end px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book._id}>
                  <td className="px-4 py-3 border-0">
                    <div className="d-flex align-items-center">
                      <div className="bg-theme-muted rounded-2 me-3 overflow-hidden" style={{ width: 45, height: 60 }}>
                        <img src={book.cover || "https://via.placeholder.com/150x200"} alt="" className="w-100 h-100 object-fit-cover" />
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold">{book.title}</h6>
                        <small className="text-muted">{book.author}</small>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 border-0">
                    <div className="d-flex align-items-center">
                      <span className={`fw-bold ${book.stock < 5 ? 'text-danger' : 'text-theme-header'}`}>{book.stock}</span>
                      {book.stock < 5 && <AlertCircle size={14} className="ms-2 text-danger" />}
                    </div>
                    <div className="progress mt-1 bg-secondary bg-opacity-25" style={{ height: 4, width: 60 }}>
                      <div className={`progress-bar ${book.stock < 5 ? 'bg-danger' : 'bg-theme-yellow'}`} style={{ width: `${Math.min(book.stock * 2, 100)}%` }}></div>
                    </div>
                  </td>
                  <td className="py-3 border-0 fw-medium">₹{book.price}</td>
                  <td className="py-3 border-0">
                    <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3">
                      {book.unitsSold || 0} units
                    </span>
                  </td>
                  <td className="py-3 border-0">
                    <div className="d-flex gap-3 text-muted small">
                      <span title="Wishlisted count"><Heart size={14} className="me-1 text-theme-lilac" /> {book.wishlistedBy || 0}</span>
                      <span title="In-cart count"><ShoppingCart size={14} className="me-1 text-theme-yellow" /> {book.cartedBy || 0}</span>
                    </div>
                  </td>
                  <td className="py-3 border-0">
                    <span className="fw-bold text-theme-header">₹{book.revenue || 0}</span>
                  </td>
                  <td className="py-3 border-0 text-end px-4">
                    <div className="d-flex justify-content-end gap-2">
                      <button className="btn btn-sm btn-glass text-theme-lilac" onClick={() => openEditModal(book)}><Edit3 size={16} /></button>
                      <button className="btn btn-sm btn-glass text-danger" onClick={() => handleDelete(book._id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-secondary border rounded-4 shadow-lg card-glass overflow-hidden">
              <div className="modal-header border-0 pt-4 px-4 bg-transparent">
                <h5 className="modal-title fw-bold text-theme-header">{editingBook ? "Edit Book" : "Add New Book"}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4 bg-transparent">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label text-theme-muted small fw-bold">Book Title</label>
                      <input type="text" className="form-control rounded-3 bg-transparent border-secondary text-theme-body" required 
                        value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-theme-muted small fw-bold">Author</label>
                      <input type="text" className="form-control rounded-3 bg-transparent border-secondary text-theme-body" required 
                        value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-theme-muted small fw-bold">Category</label>
                      <select className="form-select rounded-3 bg-transparent border-secondary text-theme-body" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                        <option className="bg-dark">Fiction</option>
                        <option className="bg-dark">Non-Fiction</option>
                        <option className="bg-dark">Self Growth</option>
                        <option className="bg-dark">Biography</option>
                        <option className="bg-dark">Fantasy</option>
                        <option className="bg-dark">Finance</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-theme-muted small fw-bold">Price (₹)</label>
                      <input type="number" className="form-control rounded-3 bg-transparent border-secondary text-theme-body" required 
                        value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-theme-muted small fw-bold">Initial Stock</label>
                      <input type="number" className="form-control rounded-3 bg-transparent border-secondary text-theme-body" required 
                        value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-theme-muted small fw-bold">Cover Image URL</label>
                      <input type="text" className="form-control rounded-3 bg-transparent border-secondary text-theme-body" placeholder="https://..." 
                        value={formData.cover} onChange={(e) => setFormData({...formData, cover: e.target.value})} />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-theme-muted small fw-bold">Description</label>
                      <textarea className="form-control rounded-3 bg-transparent border-secondary text-theme-body" rows="3" 
                        value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0 pb-4 px-4 bg-transparent">
                  <button type="button" className="btn btn-outline-secondary rounded-3 px-4 border-secondary text-theme-body" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-theme-solid rounded-3 px-4">{editingBook ? "Save Changes" : "Add Book"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AlertCircle({ size, className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}

export default ShopkeeperInventory;
