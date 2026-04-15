import "../../styles/login.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Store, Shield } from "lucide-react";
import logo from "../../assets/logo.png"; 

function AdminLogin() {
  const navigate = useNavigate();

  return (
    <div className="register-page">
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
              <p className="mt-3">Welcome Admin!</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-md-6 col-12 d-flex align-items-center justify-content-center">
            <div className="right-panel">
              <form className="mt-4">

                <label>Admin ID</label>
                <input type="text" placeholder="Enter your admin ID" />

                <label>Password</label>
                <input type="password" placeholder="••••••••" />

                <button className="login-btn mt-4">Login</button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
