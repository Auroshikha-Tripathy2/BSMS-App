import Order from "../models/Order.js";
import Book from "../models/Book.js";

// @desc    Create order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide order items",
      });
    }

    let totalAmount = 0;

    // Validate books and calculate total
    const validatedItems = await Promise.all(
      items.map(async (item) => {
        const book = await Book.findById(item.book);

        if (!book) {
          throw new Error(`Book ${item.book} not found`);
        }

        if (book.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${book.title}`);
        }

        totalAmount += book.price * item.quantity;

        return {
          book: item.book,
          quantity: item.quantity,
          price: book.price,
        };
      })
    );

    const order = await Order.create({
      customer: req.user.id,
      items: validatedItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    // Reduce stock for each book
    for (const item of validatedItems) {
      await Book.findByIdAndUpdate(
        item.book,
        { $inc: { stock: -item.quantity } }
      );
    }

    const populatedOrder = await order.populate("items.book");

    res.status(201).json({
      success: true,
      data: populatedOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all orders (Admin) or user orders
// @route   GET /api/orders
// @access  Private
export const getOrders = async (req, res) => {
  try {
    let query = {};

    // Readers see only their orders
    if (req.user.role === "reader") {
      query.customer = req.user.id;
    }
    // Shopkeepers can see orders for their books
    else if (req.user.role === "owner") {
      // Get all books by this shopkeeper
      const shopkeeperBooks = await Book.find({ shopkeeper: req.user.id });
      query.items = { $elemMatch: { book: { $in: shopkeeperBooks.map(b => b._id) } } };
    }

    const orders = await Order.find(query)
      .populate("customer", "name email phone")
      .populate("items.book")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "name email phone")
      .populate("items.book");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check authorization
    if (order.customer._id.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this order",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update order status (Shopkeeper/Admin)
// @route   PUT /api/orders/:id
// @access  Private (Shopkeeper/Admin)
export const updateOrder = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Cancel order
// @route   DELETE /api/orders/:id
// @access  Private
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check authorization
    if (order.customer.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this order",
      });
    }

    if (order.status === "delivered" || order.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel order with status ${order.status}`,
      });
    }

    // Restore stock
    for (const item of order.items) {
      await Book.findByIdAndUpdate(
        item.book,
        { $inc: { stock: item.quantity } }
      );
    }

    order.status = "cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
