import "../../styles/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Store, Shield } from "lucide-react";
import logo from "../../assets/logo.png"; 

function Register() {
  const navigate = useNavigate();          // ✅ FIX
  const [role, setRole] = useState("");    // ✅ FIX

  return (
    <div className="register-page">
      <div className="container-fluid">
        <div className="row h-100">

          {/* LEFT */}
          <div className="col-md-6 d-none d-md-flex left-panel">
            <div style={{ padding: 100 }}>
              <img
                src={logo}   // ✅ FIX
                alt="logo"
                className="logo mb-4"
                style={{ width: "250px" }}
              />

              <h1 className="fw-bold">Welcome to ReadNest</h1>

              <p className="mt-3">
                Discover, manage, and explore the world of books.
              </p>

              <ul className="mt-4">
                <li>Browse thousands of books</li>
                <li>Manage inventory</li>
                <li>Track analytics</li>
              </ul>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-md-6 col-12 d-flex align-items-center justify-content-center">
            <div className="right-panel">

              {/* TOGGLE */}
              <div className="toggle">
                <button onClick={() => navigate("/login")}>Login</button>
                <button className="active">Register</button>
              </div>

              <form className="mt-4">

                <label>Email Address</label>
                <input type="email" placeholder="you@example.com" />

                <label>Password</label>
                <input type="password" placeholder="••••••••" />

                <label>Confirm Password</label>
                <input type="password" placeholder="••••••••" />

                <label>Phone Number</label>
                <input type="tel" placeholder="+1 234 567 8900" />

                <label className="mt-3">Select Role</label>

                <div className="role-container">

                  <div
                    className={`role ${role === "reader" ? "active" : ""}`}
                    onClick={() => setRole("reader")}
                  >
                    <User size={28} />
                    <span>Reader</span>
                  </div>

                  <div
                    className={`role ${role === "owner" ? "active" : ""}`}
                    onClick={() => setRole("owner")}
                  >
                    <Store size={28} />
                    <span>Shop Owner</span>
                  </div>

                  <div
                    className={`role ${role === "admin" ? "active" : ""}`}
                    onClick={() => setRole("admin")}
                  >
                    <Shield size={28} />
                    <span>Admin</span>
                  </div>

                </div>

                <button className="login-btn mt-4">Register</button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;