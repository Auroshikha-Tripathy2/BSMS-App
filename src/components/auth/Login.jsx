import "../../styles/login.css";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Store } from "lucide-react";
import logo from "../../assets/logo.png"; // ✅ fixed path

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");

  return (
    <div className="login-page">
      <div className="container-fluid">
        <div className="row h-100">

          {/* LEFT */}
          <div className="col-md-6 d-none d-md-flex left-panel">
            <div style={{ padding: 100 }}>
              <img
                src={logo}
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
                <button className="active">Login</button>
                <button onClick={() => navigate("/register")}>
                  Register
                </button>
              </div>

              <form className="mt-4">

                <label>Email Address</label>
                <input type="email" placeholder="you@example.com" />
               
                {/* ROLE */}
                {!showOtp && (
                  <>

                    <label>Password</label>
                    <input type="password" placeholder="••••••••" />

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
                    </div>
                  </>
                )}

                {/* OTP FIELD */}
                {showOtp && (
                  <>
                    <label className="mt-3">Enter OTP</label>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </>
                )}

                {/* BUTTON */}
                <button className="login-btn mt-4">
                  {showOtp ? "Verify OTP" : "Login"}
                </button>

                {/* FORGOT PASSWORD */}
                {!showOtp && (
                  <p className="text-center mt-3">
                    <span
                      onClick={() => setShowOtp(true)}
                      style={{
                        cursor: "pointer",
                        color: "#d4b100"
                      }}
                    >
                      Forgot your password?
                    </span>
                  </p>
                )}

              </form>

              {/* ADMIN LOGIN */}
              <p className="text-center mt-3">
                <Link
                  to="/admin-login"
                  style={{ textDecoration: "none", color: "#d4b100" }}
                >
                  Admin Login
                </Link>
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
