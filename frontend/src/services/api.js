// API configuration
const API_BASE_URL = "http://localhost:5000/api";

// Default headers
const getHeaders = (token = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

// Auth API calls
export const authAPI = {
  register: async (name, email, password, role) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ name, email, password, role }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    return await response.json();
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    return await response.json();
  },

  getMe: async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch user");
    }

    return await response.json();
  },

  updateProfile: async (token, updateData) => {
    const response = await fetch(`${API_BASE_URL}/auth/update`, {
      method: "PUT",
      headers: getHeaders(token),
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Update failed");
    }

    return await response.json();
  },

  logout: async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Logout failed");
    }

    return await response.json();
  },
};

// Books API calls
export const booksAPI = {
  getAllBooks: async (page = 1, limit = 12, category = "", search = "") => {
    let query = `?page=${page}&limit=${limit}`;
    if (category) query += `&category=${category}`;
    if (search) query += `&search=${search}`;

    const response = await fetch(`${API_BASE_URL}/books${query}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch books");
    }

    return await response.json();
  },

  getFeaturedBooks: async () => {
    const response = await fetch(`${API_BASE_URL}/books/featured`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch featured books");
    }

    return await response.json();
  },

  getBook: async (id) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch book");
    }

    return await response.json();
  },

  getShopkeeperBooks: async (shopkeeperId) => {
    const response = await fetch(`${API_BASE_URL}/books/shopkeeper/${shopkeeperId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch books");
    }

    return await response.json();
  },
};

// Cart API calls
export const cartAPI = {
  getCart: async (token) => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: "GET",
      headers: getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch cart");
    }

    return await response.json();
  },

  addToCart: async (token, bookId, quantity = 1) => {
    const response = await fetch(`${API_BASE_URL}/cart/${bookId}`, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to add to cart");
    }

    return await response.json();
  },

  updateCartItem: async (token, itemId, quantity) => {
    const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
      method: "PUT",
      headers: getHeaders(token),
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update cart");
    }

    return await response.json();
  },

  removeFromCart: async (token, itemId) => {
    const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
      method: "DELETE",
      headers: getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to remove from cart");
    }

    return await response.json();
  },
};

// Orders API calls
export const ordersAPI = {
  createOrder: async (token, orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create order");
    }

    return await response.json();
  },

  getOrders: async (token) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "GET",
      headers: getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch orders");
    }

    return await response.json();
  },

  getOrder: async (token, orderId) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: "GET",
      headers: getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch order");
    }

    return await response.json();
  },

  updateOrderStatus: async (token, orderId, status) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: "PUT",
      headers: getHeaders(token),
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update order");
    }

    return await response.json();
  },
};

// Wishlist API calls
export const wishlistAPI = {
  getWishlist: async (token) => {
    const response = await fetch(`${API_BASE_URL}/wishlist`, {
      method: "GET",
      headers: getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch wishlist");
    }

    return await response.json();
  },

  addToWishlist: async (token, bookId) => {
    const response = await fetch(`${API_BASE_URL}/wishlist/${bookId}`, {
      method: "POST",
      headers: getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to add to wishlist");
    }

    return await response.json();
  },

  removeFromWishlist: async (token, bookId) => {
    const response = await fetch(`${API_BASE_URL}/wishlist/${bookId}`, {
      method: "DELETE",
      headers: getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to remove from wishlist");
    }

    return await response.json();
  },

  clearWishlist: async (token) => {
    const response = await fetch(`${API_BASE_URL}/wishlist`, {
      method: "DELETE",
      headers: getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to clear wishlist");
    }

    return await response.json();
  },
};

// Shopkeeper API calls
export const shopkeeperAPI = {
  getStats: async (token) => {
    const response = await fetch(`${API_BASE_URL}/shopkeeper/stats`, {
      method: "GET",
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error("Failed to fetch shopkeeper stats");
    return await response.json();
  },

  getInventoryStats: async (token) => {
    const response = await fetch(`${API_BASE_URL}/shopkeeper/inventory-stats`, {
      method: "GET",
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error("Failed to fetch inventory stats");
    return await response.json();
  },

  addBook: async (token, bookData) => {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify(bookData),
    });
    if (!response.ok) throw new Error("Failed to add book");
    return await response.json();
  },

  updateBook: async (token, id, bookData) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: "PUT",
      headers: getHeaders(token),
      body: JSON.stringify(bookData),
    });
    if (!response.ok) throw new Error("Failed to update book");
    return await response.json();
  },

  deleteBook: async (token, id) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: "DELETE",
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error("Failed to delete book");
    return await response.json();
  },

  getOrders: async (token) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "GET",
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error("Failed to fetch orders");
    return await response.json();
  },
};
