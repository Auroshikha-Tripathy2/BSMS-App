import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All wishlist routes are protected
router.get("/", protect, getWishlist);
router.post("/:bookId", protect, addToWishlist);
router.delete("/:bookId", protect, removeFromWishlist);
router.delete("/", protect, clearWishlist);

export default router;
