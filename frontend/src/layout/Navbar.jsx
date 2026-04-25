import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, User, Settings, LogOut, Store, ChartSpline, Moon, Sun, Menu } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo.png";
import "../styles/pages.css";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar app-navbar bg-white shadow-sm">
        {/* LEFT (Logo → opens menu) */}
        <div className="app-navbar-left d-flex align-items-center gap-3">
          <button 
            className="btn btn-glass p-2 rounded-circle d-flex align-items-center justify-content-center transition-all" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#menu"
            title="Open Menu"
          >
            <Menu size={24} className="navbar-menu-icon" />
          </button>
          <Link to="/" className="p-0">
            <img src={logo} alt="Logo" style={{ width: "110px" }} />
          </Link>
          <Link to="/" className="app-navbar-home text-decoration-none text-dark fw-bold">
            Home
          </Link>
          {/* Show Reader tab only for guests and readers */}
          {(!isAuthenticated || user?.role === "reader") && (
            <Link to="/reader" className="app-navbar-link text-decoration-none text-dark">
              Reader
            </Link>
          )}
          {/* Show Shopkeeper tab for guests and owners */}
          {(!isAuthenticated || user?.role === "owner") && (
            <Link to="/shopkeeper" className="app-navbar-link text-decoration-none text-dark">
              Shopkeeper
            </Link>
          )}
        </div>

        {/* CENTER (Search) */}
        <div className="app-navbar-search">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            style={{ padding: "0.85rem 1rem", fontSize: "1rem" }}
          />
        </div>

        {/* RIGHT */}
        <div className="app-navbar-right">
          
          {isAuthenticated ? (
            <>
              <button
                onClick={toggleDarkMode}
                className="btn btn-sm btn-outline-secondary me-2 d-flex align-items-center justify-content-center"
                style={{ width: "36px", height: "36px", borderRadius: "50%" }}
                title="Toggle Theme"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <Link to="/wishlist" className="app-navbar-icon">
                <Heart size={22}/>
              </Link>

              <Link to="/cart" className="app-navbar-icon">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>

              <div className="dropdown">
                <button
                  className="btn btn-sm btn-outline-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <User size={20} /> {user?.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link to="/account" className="dropdown-item">
                      <User size={16} className="me-2" /> Account
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="dropdown-item">
                      <Settings size={16} className="me-2" /> Settings
                    </Link>
                  </li>
                  {user?.role !== "owner" && (
                    <>
                      <li>
                        <Link to="/status" className="dropdown-item">
                          <ChartSpline size={16} className="me-2" /> Reading Status
                        </Link>
                      </li>
                      <li>
                        <Link to="/orders" className="dropdown-item">
                          <ShoppingCart size={16} className="me-2" /> Orders
                        </Link>
                      </li>
                    </>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item text-danger"
                    >
                      <LogOut size={16} className="me-2" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={toggleDarkMode}
                className="btn btn-sm btn-outline-secondary me-3 d-flex align-items-center justify-content-center"
                style={{ width: "36px", height: "36px", borderRadius: "50%" }}
                title="Toggle Theme"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <Link to="/login" className="btn me-2 btn-theme-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-theme-solid">
                Register
              </Link>
            </>
          )}

          <Link to="/shops" className="btn ms-3 btn-theme-shop">
            <Store size={20} /> Shop
          </Link>
        </div>
      </nav>

      {/* SIDE MENU */}
      <div className="offcanvas offcanvas-start" id="menu">
        <div className="offcanvas-header">
          <h5>Menu</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body">

          {isAuthenticated && (
            <>
              <Link to="/account" className="d-block mb-3 text-dark text-decoration-none" style={{ fontWeight: "1000", padding: "0.5rem 1rem", display: "inline-block"}}>
                <User /> Account
              </Link>

              <Link to="/settings" className="d-block mb-3 text-dark text-decoration-none" style={{ fontWeight: "1000", padding: "0.5rem 1rem", display: "inline-block"}}>
                <Settings /> Settings
              </Link>

              {user?.role !== "owner" && (
                <>
                  <Link to="/status" className="d-block mb-3 text-dark text-decoration-none" style={{ fontWeight: "1000", padding: "0.5rem 1rem", display: "inline-block"}}>
                    <ChartSpline size={20} /> Reading Status
                  </Link>

                  <Link to="/orders" className="d-block mb-3 text-dark text-decoration-none" style={{ fontWeight: "1000", padding: "0.5rem 1rem", display: "inline-block"}}>
                    <ShoppingCart size={20} /> Orders
                  </Link>
                </>
              )}

              <hr />
            </>
          )}

          {/* Role-based page links in side menu */}
          {(!isAuthenticated || user?.role === "reader") && (
            <Link to="/reader" className="d-block mb-3 text-dark text-decoration-none" style={{ fontWeight: "1000", padding: "0.5rem 1rem", display: "inline-block"}}>
              <User /> Reader View
            </Link>
          )}

          {(!isAuthenticated || user?.role === "owner") && (
            <Link to="/shopkeeper" className="d-block mb-3 text-dark text-decoration-none" style={{ fontWeight: "1000", padding: "0.5rem 1rem", display: "inline-block"}}>
              <Store size={20} /> Shopkeeper View
            </Link>
          )}

          {isAuthenticated && (
            <>
              <hr />
              <button
                onClick={handleLogout}
                className="btn btn-link text-danger text-decoration-none"
                style={{ fontWeight: "1000", padding: "0.5rem 1rem", border: "none", background: "none", cursor: "pointer" }}
              >
                <LogOut /> Logout
              </button>
            </>
          )}

        </div>
      </div>
    </>
  );
}

export default Navbar;
