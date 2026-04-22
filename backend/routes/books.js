import express from "express";
import {
  getAllBooks,
  getFeaturedBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getShopkeeperBooks,
  getMyBooks,
} from "../controllers/bookController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getAllBooks);
router.get("/featured", getFeaturedBooks);
router.get("/shopkeeper/:shopkeeperId", getShopkeeperBooks);
router.get("/:id", getBook);

// Protected routes
router.post("/", protect, authorize("owner"), createBook);
router.put("/:id", protect, authorize("owner"), updateBook);
router.delete("/:id", protect, authorize("owner"), deleteBook);
router.get("/my-books", protect, authorize("owner"), getMyBooks);

export default router;
