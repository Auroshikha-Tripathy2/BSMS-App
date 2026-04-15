import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, User, Settings, LogOut, Store, ChartSpline  } from "lucide-react";
import logo from "../assets/logo.png";
import "../styles/pages.css";

function Navbar() {
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
          
          <Link to="/wishlist" className="app-navbar-icon">
            <Heart size={22}/>
          </Link>

          <Link to="/cart" className="app-navbar-icon">
            <ShoppingCart size={22} />
          </Link>

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

          <Link to="/account" className="d-block mb-3 text-dark text-decoration-none" style={{ fontWeight: "1000", padding: "0.5rem 1rem", display: "inline-block"}}>
            <User /> Account
          </Link>

          <Link to="/settings" className="d-block mb-3 text-dark text-decoration-none" style={{ fontWeight: "1000", padding: "0.5rem 1rem", display: "inline-block"}}>
            <Settings /> Settings
          </Link>

          <Link to="/status" className="d-block mb-3 text-dark text-decoration-none" style={{ fontWeight: "1000", padding: "0.5rem 1rem", display: "inline-block"}}>
            <ChartSpline size={20} /> Reading Status
          </Link>

          <Link to="/reader" className="d-block mb-3 text-dark text-decoration-none" style={{ fontWeight: "1000", padding: "0.5rem 1rem", display: "inline-block"}}>
            <User /> Reader View
          </Link>

          <Link to="/shopkeeper" className="d-block mb-3 text-dark text-decoration-none" style={{ fontWeight: "1000", padding: "0.5rem 1rem", display: "inline-block"}}>
            <Store size={20} /> Shopkeeper View
          </Link>

          <hr />

          <Link to="/logout" className="text-danger text-decoration-none" style={{ fontWeight: "1000", padding: "0.5rem 1rem", display: "inline-block"}}>
            <LogOut /> Logout
          </Link>

        </div>
      </div>
    </>
  );
}

export default Navbar;
