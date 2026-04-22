import Cart from "../models/Cart.js";
import Book from "../models/Book.js";

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate("items.book");

    if (!cart) {
      cart = await Cart.create({ user: req.user.id });
    }

    // Calculate total price
    let totalPrice = 0;
    cart.items.forEach((item) => {
      totalPrice += item.book.price * item.quantity;
    });
    cart.totalPrice = totalPrice;
    await cart.save();

    res.status(200).json({
      success: true,
      count: cart.items.length,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add book to cart
// @route   POST /api/cart/:bookId
// @access  Private
export const addToCart = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { quantity = 1 } = req.body;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [{ book: bookId, quantity }],
      });
    } else {
      // Check if book already in cart
      const existingItem = cart.items.find(
        (item) => item.book.toString() === bookId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ book: bookId, quantity });
      }

      await cart.save();
    }

    // Calculate total price
    let totalPrice = 0;
    for (const item of cart.items) {
      const cartBook = await Book.findById(item.book);
      totalPrice += cartBook.price * item.quantity;
    }
    cart.totalPrice = totalPrice;
    await cart.save();

    await cart.populate("items.book");

    res.status(200).json({
      success: true,
      message: "Book added to cart",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:bookId
// @access  Private
export const updateCartItem = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity",
      });
    }

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const cartItem = cart.items.find(
      (item) => item.book.toString() === bookId
    );

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Item not in cart",
      });
    }

    cartItem.quantity = quantity;

    // Calculate total price
    let totalPrice = 0;
    for (const item of cart.items) {
      const cartBook = await Book.findById(item.book);
      totalPrice += cartBook.price * item.quantity;
    }
    cart.totalPrice = totalPrice;

    await cart.save();
    await cart.populate("items.book");

    res.status(200).json({
      success: true,
      message: "Cart item updated",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Remove book from cart
// @route   DELETE /api/cart/:bookId
// @access  Private
export const removeFromCart = async (req, res) => {
  try {
    const { bookId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.book.toString() !== bookId
    );

    // Calculate total price
    let totalPrice = 0;
    for (const item of cart.items) {
      const cartBook = await Book.findById(item.book);
      totalPrice += cartBook.price * item.quantity;
    }
    cart.totalPrice = totalPrice;

    await cart.save();
    await cart.populate("items.book");

    res.status(200).json({
      success: true,
      message: "Book removed from cart",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
