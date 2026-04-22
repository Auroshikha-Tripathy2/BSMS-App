import React, { createContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authAPI.login(email, password);
      
      if (response.success) {
        const userData = response.user;
        const token = response.token;
        
        setUser(userData);
        setRole(userData.role);
        setIsAuthenticated(true);

        // Store in localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("role", userData.role);
        localStorage.setItem("token", token);

        return { success: true, user: userData, role: userData.role };
      }
    } catch (err) {
      const errorMessage = err.message || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name, email, password, role) => {
    try {
      setError(null);
      setLoading(true);

      const response = await authAPI.register(name, email, password, role);

      if (response.success) {
        const userData = response.user;
        const token = response.token;

        setUser(userData);
        setRole(userData.role);
        setIsAuthenticated(true);

        // Store in localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("role", userData.role);
        localStorage.setItem("token", token);

        return { success: true, user: userData, role: userData.role };
      }
    } catch (err) {
      const errorMessage = err.message || "Registration failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await authAPI.logout(token);
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setRole(null);
      setIsAuthenticated(false);
      setError(null);

      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("token");
    }
  };

  // Update user function
  const updateUser = async (updateData) => {
    try {
      setError(null);
      const token = localStorage.getItem("token");

      const response = await authAPI.updateProfile(token, updateData);

      if (response.success) {
        const updatedUser = response.user;
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return { success: true, user: updatedUser };
      }
    } catch (err) {
      const errorMessage = err.message || "Update failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    user,
    role,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
