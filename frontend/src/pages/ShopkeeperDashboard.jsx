import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  ShoppingCart, 
  Heart, 
  Package, 
  Plus, 
  Trash2, 
  Edit3, 
  Search,
  CheckSquare,
  StickyNote,
  AlertCircle,
  FileText
} from "lucide-react";
import { shopkeeperAPI } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import "../styles/pages.css";

function ShopkeeperDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("shopkeeper_notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("shopkeeper_notes", JSON.stringify(notes));
  }, [notes]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const [statsRes, ordersRes] = await Promise.all([
        shopkeeperAPI.getStats(token),
        shopkeeperAPI.getOrders(token)
      ]);
      setStats(statsRes.data);
      setOrders(ordersRes.data.slice(0, 5)); // Only show recent 5
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes([{ id: Date.now(), text: newNote, completed: false }, ...notes]);
    setNewNote("");
  };

  const toggleNote = (id) => {
    setNotes(notes.map(n => n.id === id ? { ...n, completed: !n.completed } : n));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  if (loading) return <div className="text-center p-5">Loading Dashboard...</div>;

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h2 className="fw-bold mb-1 text-theme-header">Business Overview</h2>
        <p className="text-muted">Welcome back, {user?.name}. Here's what's happening with your store today.</p>
      </div>

      {/* Metric Cards */}
      <div className="row g-4 mb-4">
        <MetricCard 
          icon={<TrendingUp className="text-theme-lilac" />} 
          label="Total Revenue" 
          value={`₹${stats?.totalRevenue || 0}`} 
          trend="+12% from last month"
          index={0}
        />
        <MetricCard 
          icon={<ShoppingCart className="text-theme-yellow" />} 
          label="Total Orders" 
          value={stats?.totalSalesCount || 0} 
          trend={`${stats?.recentOrdersCount || 0} new orders`}
          index={1}
        />
        <MetricCard 
          icon={<Heart className="text-theme-lilac" />} 
          label="Wishlist Saves" 
          value={stats?.wishlistCount || 0} 
          trend="Potential future sales"
          index={2}
        />
        <MetricCard 
          icon={<Package className="text-theme-yellow" />} 
          label="Low Stock Items" 
          value={stats?.lowStockCount || 0} 
          trend="Needs attention"
          isAlert={stats?.lowStockCount > 0}
          index={3}
        />
      </div>

      <div className="row g-4">
        {/* Recent Orders */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden card-glass animate-slideUp" style={{ animationDelay: '0.4s' }}>
            <div className="card-header border-0 py-3 d-flex justify-content-between align-items-center bg-transparent">
              <h5 className="mb-0 fw-bold">Recent Orders</h5>
              <button className="btn btn-sm btn-link text-decoration-none text-theme-lilac">View All</button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 text-theme-body">
                  <thead className="bg-theme-muted text-theme-muted">
                    <tr>
                      <th className="px-4 py-3 border-0">Order ID</th>
                      <th className="py-3 border-0">Customer</th>
                      <th className="py-3 border-0">Items</th>
                      <th className="py-3 border-0">Amount</th>
                      <th className="py-3 border-0 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? orders.map((order) => (
                      <tr key={order._id}>
                        <td className="px-4 py-3 border-0 fw-medium">#{order.orderNumber?.split('-').slice(1).join('') || order._id.slice(-6)}</td>
                        <td className="py-3 border-0">
                          <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: 32, height: 32, fontSize: 12 }}>
                              {order.customer?.name?.[0]}
                            </div>
                            {order.customer?.name}
                          </div>
                        </td>
                        <td className="py-3 border-0">{order.items.length} items</td>
                        <td className="py-3 border-0 fw-bold">₹{order.totalAmount}</td>
                        <td className="py-3 border-0 text-center">
                          <span className={`badge rounded-pill px-3 py-2 ${
                            order.status === 'delivered' ? 'bg-success bg-opacity-10 text-success' :
                            order.status === 'pending' ? 'bg-warning bg-opacity-10 text-warning' :
                            'bg-primary bg-opacity-10 text-primary'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="text-center py-5 text-muted">No recent orders found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Notes / To-Do List */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 card-glass animate-slideUp" style={{ animationDelay: '0.5s' }}>
            <div className="card-header border-0 py-3 bg-transparent">
              <h5 className="mb-0 fw-bold d-flex align-items-center">
                <StickyNote size={20} className="me-2 text-theme-yellow" />
                Store Tasks
              </h5>
            </div>
            <div className="card-body d-flex flex-column">
              <div className="input-group mb-3 border border-secondary rounded-3 overflow-hidden bg-transparent">
                <input 
                  type="text" 
                  className="form-control border-0 shadow-none bg-transparent text-theme-body" 
                  placeholder="Add a new task..." 
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addNote()}
                />
                <button className="btn btn-theme-solid px-3 border-0" onClick={addNote}>
                  <Plus size={20} />
                </button>
              </div>

              <div className="flex-grow-1 overflow-auto" style={{ maxHeight: '350px' }}>
                {notes.length > 0 ? notes.map(note => (
                  <div key={note.id} className={`d-flex align-items-center p-3 mb-2 rounded-3 border-start border-4 ${
                    note.completed ? 'bg-theme-muted border-secondary text-muted' : 'bg-theme-accent-light border-theme-yellow'
                  }`}>
                    <div 
                      className={`me-3 cursor-pointer d-flex align-items-center justify-content-center rounded-circle border ${
                        note.completed ? 'bg-secondary text-white border-secondary' : 'bg-transparent border-theme-yellow text-white'
                      }`} 
                      style={{ width: 20, height: 20 }}
                      onClick={() => toggleNote(note.id)}
                    >
                      {note.completed && <Plus size={14} style={{ transform: 'rotate(45deg)' }} />}
                    </div>
                    <span className={`flex-grow-1 ${note.completed ? 'text-decoration-line-through' : ''}`}>
                      {note.text}
                    </span>
                    <button className="btn btn-link btn-sm text-danger p-0" onClick={() => deleteNote(note.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                )) : (
                  <div className="text-center py-4 text-muted fst-italic">
                    <CheckSquare size={30} className="mb-2 opacity-25" />
                    <p>No tasks for today. Relax!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, trend, isAlert, index }) {
  return (
    <div className="col-md-3">
      <div className={`card border-0 shadow-sm rounded-4 card-glass animate-slideUp ${isAlert ? 'border-top border-4 border-warning animate-pulse-slow' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
        <div className="card-body p-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="bg-theme-muted p-2 rounded-3">{icon}</div>
            {isAlert && <AlertCircle size={18} className="text-warning" />}
          </div>
          <h4 className="fw-bold mb-1">
            <span className="text-theme-header">{value}</span>
          </h4>
          <p className="text-muted small mb-0">{label}</p>
          <div className="mt-3 pt-2 border-top border-secondary opacity-50">
            <span className={`small ${trend.includes('+') ? 'text-success' : 'text-muted'}`}>
              {trend}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopkeeperDashboard;
