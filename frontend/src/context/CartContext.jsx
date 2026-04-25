import React, { createContext, useState, useEffect, useContext } from "react";
import { cartAPI } from "../services/api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token || !isAuthenticated) {
      setCartCount(0);
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);
      const response = await cartAPI.getCart(token);
      if (response.success) {
        const items = response.data?.items || [];
        setCartItems(items);
        // Sum up the quantities of all items
        const count = items.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
      }
    } catch (err) {
      console.error("Error fetching cart in context:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const value = {
    cartCount,
    cartItems,
    loading,
    refreshCart: fetchCart,
    setCartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
