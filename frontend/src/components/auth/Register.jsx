import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Store } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/logo.png";
import "../../styles/login.css";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword || !role) {
      setError("Please fill in all fields and select a role");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const result = await register(name, email, password, role);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred during registration");
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
          <h2>Join ReadNest today</h2>
          <p>Whether you're a reader or a bookstore owner, ReadNest has the tools you need.</p>
          <ul className="auth-bullet">
            <li>Browse thousands of books</li>
            <li>Manage your shop &amp; inventory</li>
            <li>Track reading progress</li>
            <li>Get price &amp; stock alerts</li>
          </ul>
        </div>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <div className="auth-box">
          {/* Toggle */}
          <div className="auth-toggle">
            <button onClick={() => navigate("/login")}>Login</button>
            <button className="active">Register</button>
          </div>

          {/* Error */}
          {error && <div className="auth-error">{error}</div>}

          {/* Form */}
          <form className="auth-form" onSubmit={handleRegister}>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />

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

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              required
            />

            <label>Phone Number (Optional)</label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
            />

            <label>Select Role</label>
            <div className="auth-role-grid">
              <div
                className={`auth-role-card ${role === "reader" ? "active" : ""}`}
                onClick={() => !loading && setRole("reader")}
              >
                <User size={28} color={role === "reader" ? "#d4b100" : "#555"} />
                <span>Reader</span>
              </div>
              <div
                className={`auth-role-card ${role === "owner" ? "active" : ""}`}
                onClick={() => !loading && setRole("owner")}
              >
                <Store size={28} color={role === "owner" ? "#d4b100" : "#555"} />
                <span>Shop Owner</span>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
