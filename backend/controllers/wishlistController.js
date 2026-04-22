import Wishlist from "../models/Wishlist.js";
import Book from "../models/Book.js";

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id }).populate("books");

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user.id });
    }

    res.status(200).json({
      success: true,
      count: wishlist.books.length,
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add book to wishlist
// @route   POST /api/wishlist/:bookId
// @access  Private
export const addToWishlist = async (req, res) => {
  try {
    const { bookId } = req.params;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        books: [bookId],
      });
    } else {
      // Check if book already in wishlist
      if (!wishlist.books.includes(bookId)) {
        wishlist.books.push(bookId);
        await wishlist.save();
      }
    }

    await wishlist.populate("books");

    res.status(200).json({
      success: true,
      message: "Book added to wishlist",
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Remove book from wishlist
// @route   DELETE /api/wishlist/:bookId
// @access  Private
export const removeFromWishlist = async (req, res) => {
  try {
    const { bookId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    wishlist.books = wishlist.books.filter(
      (id) => id.toString() !== bookId
    );

    await wishlist.save();
    await wishlist.populate("books");

    res.status(200).json({
      success: true,
      message: "Book removed from wishlist",
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Clear wishlist
// @route   DELETE /api/wishlist
// @access  Private
export const clearWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    wishlist.books = [];
    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Wishlist cleared",
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
