import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/logo.png";
import "../../styles/login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* LEFT */}
      <div className="auth-left">
        <div className="auth-left-content">
          <img src={logo} alt="ReadNest" />
          <h2>Welcome back to ReadNest</h2>
          <p>Discover, manage, and explore the world of books — all in one place.</p>
          <ul className="auth-bullet">
            <li>Browse thousands of books</li>
            <li>Track your reading progress</li>
            <li>Manage inventory &amp; orders</li>
          </ul>
        </div>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <div className="auth-box">
          {/* Toggle */}
          <div className="auth-toggle">
            <button className="active">Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </div>

          {/* Error */}
          {error && <div className="auth-error">{error}</div>}

          {/* Form */}
          <form className="auth-form" onSubmit={handleLogin}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
          <div className="auth-footer" style={{ marginTop: "0.5rem" }}>
            <Link to="/admin-login">Admin Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
