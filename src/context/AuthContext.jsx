import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedRole && storedToken) {
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData, userRole, token) => {
    setUser(userData);
    setRole(userRole);
    setIsAuthenticated(true);

    // Store in localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userRole);
    localStorage.setItem("token", token);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);

    // Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
  };

  // Update user function
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const value = {
    user,
    role,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
