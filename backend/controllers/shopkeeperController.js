import Order from "../models/Order.js";
import Book from "../models/Book.js";
import Cart from "../models/Cart.js";
import Wishlist from "../models/Wishlist.js";

// @desc    Get shopkeeper dashboard stats
// @route   GET /api/shopkeeper/stats
// @access  Private (Shopkeeper)
export const getShopkeeperStats = async (req, res) => {
  try {
    const shopkeeperId = req.user.id;

    // 1. Get all books by this shopkeeper
    const books = await Book.find({ shopkeeper: shopkeeperId });
    const bookIds = books.map(b => b._id);

    // 2. Total revenue from orders containing these books
    // We only count the portion of the order that belongs to this shopkeeper
    const orders = await Order.find({
      "items.book": { $in: bookIds },
      status: { $ne: "cancelled" }
    }).populate("items.book");

    let totalRevenue = 0;
    let totalSalesCount = 0;
    
    orders.forEach(order => {
      order.items.forEach(item => {
        if (bookIds.some(id => id.toString() === item.book._id.toString())) {
          totalRevenue += item.price * item.quantity;
          totalSalesCount += item.quantity;
        }
      });
    });

    // 3. Wishlist count for these books
    const wishlistCount = await Wishlist.countDocuments({
      book: { $in: bookIds }
    });

    // 4. Cart count for these books
    const cartCount = await Cart.countDocuments({
      "items.book": { $in: bookIds }
    });

    // 5. Low stock alert (stock < 5)
    const lowStockBooks = books.filter(b => b.stock < 5);

    res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        totalSalesCount,
        totalBooks: books.length,
        wishlistCount,
        cartCount,
        lowStockCount: lowStockBooks.length,
        recentOrdersCount: orders.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get sales analytics per book
// @route   GET /api/shopkeeper/inventory-stats
// @access  Private (Shopkeeper)
export const getInventoryStats = async (req, res) => {
  try {
    const shopkeeperId = req.user.id;
    const books = await Book.find({ shopkeeper: shopkeeperId });
    const bookIds = books.map(b => b._id);

    const stats = await Promise.all(books.map(async (book) => {
      const wishlistedBy = await Wishlist.countDocuments({ book: book._id });
      const cartedBy = await Cart.countDocuments({ "items.book": book._id });
      
      // Calculate total sold for this book
      const orders = await Order.find({ 
        "items.book": book._id,
        status: { $ne: "cancelled" }
      });
      
      const unitsSold = orders.reduce((sum, order) => {
        const item = order.items.find(i => i.book.toString() === book._id.toString());
        return sum + (item ? item.quantity : 0);
      }, 0);

      return {
        _id: book._id,
        title: book.title,
        stock: book.stock,
        price: book.price,
        unitsSold,
        wishlistedBy,
        cartedBy,
        revenue: unitsSold * book.price
      };
    }));

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
