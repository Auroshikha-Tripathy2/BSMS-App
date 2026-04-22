import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All cart routes are protected
router.get("/", protect, getCart);
router.post("/:bookId", protect, addToCart);
router.put("/:bookId", protect, updateCartItem);
router.delete("/:bookId", protect, removeFromCart);
router.delete("/", protect, clearCart);

export default router;
