import express from "express";
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  cancelOrder,
} from "../controllers/orderController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All order routes are protected
router.post("/", protect, createOrder);
router.get("/", protect, getOrders);
router.get("/:id", protect, getOrder);
router.put("/:id", protect, updateOrder);
router.delete("/:id", protect, cancelOrder);

export default router;
