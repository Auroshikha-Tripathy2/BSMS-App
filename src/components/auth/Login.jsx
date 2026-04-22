import "../../styles/login.css";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Store } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/logo.png"; // ✅ fixed path

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !role) {
      setError("Please fill in all fields and select a role");
      return;
    }

    setLoading(true);

    try {
      // Mock API call - replace with real backend call
      const token = "mock-jwt-token-" + Date.now();
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email: email,
        role: role,
        phone: "",
        address: "",
      };

      // Call login from context
      login(userData, role, token);

      // Navigate based on role
      if (role === "reader") {
        navigate("/reader");
      } else if (role === "owner") {
        navigate("/shopkeeper");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

              <form className="mt-4" onSubmit={handleLogin}>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={showOtp || loading}
                />
               
                {/* ROLE */}
                {!showOtp && (
                  <>

                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />

                    <label className="mt-3">Select Role</label>

                    <div className="role-container">
                      <div
                        className={`role ${role === "reader" ? "active" : ""}`}
                        onClick={() => !loading && setRole("reader")}
                      >
                        <User size={28} />
                        <span>Reader</span>
                      </div>

                      <div
                        className={`role ${role === "owner" ? "active" : ""}`}
                        onClick={() => !loading && setRole("owner")}
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
                      disabled={loading}
                    />
                  </>
                )}

                {/* BUTTON */}
                <button
                  type="submit"
                  className="login-btn mt-4"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : showOtp ? "Verify OTP" : "Login"}
                </button>

                {/* FORGOT PASSWORD */}
                {!showOtp && (
                  <p className="text-center mt-3">
                    <span
                      onClick={() => !loading && setShowOtp(true)}
                      style={{
                        cursor: loading ? "not-allowed" : "pointer",
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
