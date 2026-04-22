import Book from "../models/Book.js";

// @desc    Get all books
// @route   GET /api/books
// @access  Public
export const getAllBooks = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10, sort = "-createdAt" } = req.query;

    let query = {};

    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const books = await Book.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("shopkeeper", "shopName");

    const total = await Book.countDocuments(query);

    res.status(200).json({
      success: true,
      count: books.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get featured books
// @route   GET /api/books/featured
// @access  Public
export const getFeaturedBooks = async (req, res) => {
  try {
    const books = await Book.find({ isFeatured: true })
      .limit(10)
      .populate("shopkeeper", "shopName");

    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("shopkeeper", "shopName");

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create book (Shopkeeper only)
// @route   POST /api/books
// @access  Private (Shopkeeper)
export const createBook = async (req, res) => {
  try {
    const { title, author, category, price, stock } = req.body;

    if (!title || !author || !category || !price || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const book = await Book.create({
      ...req.body,
      shopkeeper: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update book (Shopkeeper only)
// @route   PUT /api/books/:id
// @access  Private (Shopkeeper)
export const updateBook = async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if user is the book owner
    if (book.shopkeeper.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this book",
      });
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete book (Shopkeeper only)
// @route   DELETE /api/books/:id
// @access  Private (Shopkeeper)
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if user is the book owner
    if (book.shopkeeper.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this book",
      });
    }

    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get books by shopkeeper
// @route   GET /api/books/shopkeeper/:shopkeeperId
// @access  Public
export const getShopkeeperBooks = async (req, res) => {
  try {
    const books = await Book.find({ shopkeeper: req.params.shopkeeperId });

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get my books (Shopkeeper)
// @route   GET /api/books/my-books
// @access  Private (Shopkeeper)
export const getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ shopkeeper: req.user.id }).sort("-createdAt");

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
