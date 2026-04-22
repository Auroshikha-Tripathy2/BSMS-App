import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, User, Settings, LogOut, Store, ChartSpline  } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo.png";
import "../styles/pages.css";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
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
        <div className="app-navbar-left">
          <button className="btn border-0 p-0" data-bs-toggle="offcanvas" data-bs-target="#menu">
            <img src={logo} alt="Logo" style={{ width: "110px" }} />
          </button>
          <Link to="/" className="app-navbar-home text-decoration-none text-dark fw-bold">
            Home
          </Link>
          <Link to="/reader" className="app-navbar-link text-decoration-none text-dark">
            Reader
          </Link>
          <Link to="/shopkeeper" className="app-navbar-link text-decoration-none text-dark">
            Shopkeeper
          </Link>
        </div>

        {/* CENTER (Search) */}
        <div className="app-navbar-search">
          <input
            type="text"
            className="form-control"
            placeholder="Search books, authors..."
            style={{ padding: "0.85rem 1rem", fontSize: "1rem" }}
          />
        </div>

        {/* RIGHT */}
        <div className="app-navbar-right">
          
          {isAuthenticated ? (
            <>
              <Link to="/wishlist" className="app-navbar-icon">
                <Heart size={22}/>
              </Link>

              <Link to="/cart" className="app-navbar-icon">
                <ShoppingCart size={22} />
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
              <Link to="/login" className="btn btn-outline-primary btn-sm me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}

          <Link to="/shops" className="btn btn-warning app-shop-btn">
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

              <Link to="/status" className="d-block mb-3 text-dark text-decoration-none" style={{ fontWeight: "1000", padding: "0.5rem 1rem", display: "inline-block"}}>
                <ChartSpline size={20} /> Reading Status
              </Link>

              <Link to="/orders" className="d-block mb-3 text-dark text-decoration-none" style={{ fontWeight: "1000", padding: "0.5rem 1rem", display: "inline-block"}}>
                <ShoppingCart size={20} /> Orders
              </Link>

              <hr />
            </>
          )}

          <Link to="/reader" className="d-block mb-3 text-dark text-decoration-none" style={{ fontWeight: "1000", padding: "0.5rem 1rem", display: "inline-block"}}>
            <User /> Reader View
          </Link>

          <Link to="/shopkeeper" className="d-block mb-3 text-dark text-decoration-none" style={{ fontWeight: "1000", padding: "0.5rem 1rem", display: "inline-block"}}>
            <Store size={20} /> Shopkeeper View
          </Link>

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
