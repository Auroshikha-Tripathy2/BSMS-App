import { Link } from "react-router-dom";
import { Heart, ShoppingCart, User, Settings, LogOut, Store, ChartSpline  } from "lucide-react";

function Navbar() {
  return (
    <>
      {/* NAVBAR */}
      <nav
        className="navbar bg-white shadow-sm d-flex justify-content-between align-items-center"
        style={{ padding: "1.8rem 6rem" }}  
      >
        {/* LEFT (Logo → opens menu) */}
        <button className="btn border-0" data-bs-toggle="offcanvas" data-bs-target="#menu"  >
          <img  src="src/assets/logo.png"   alt="Logo"   style={{ width: "110px" }}  />
        </button>

        {/* CENTER (Search) */}
        <div style={{ width: "70%" }}>
          <input type="text" className="form-control" placeholder="Search books, authors..." 
                  style={{ padding: "0.6rem 1rem", fontSize: "1rem" }}/>
        </div>

        {/* RIGHT */}
        <div className="d-flex align-items-center gap-4">
          
          <Link to="/wishlist">
            <Heart size={22}/>
          </Link>

          <Link to="/cart">
            <ShoppingCart size={22} />
          </Link>

          <Link to="/shops" className="btn btn-warning">
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
