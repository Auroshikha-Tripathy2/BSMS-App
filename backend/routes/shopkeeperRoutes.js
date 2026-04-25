import express from "express";
import { getShopkeeperStats, getInventoryStats } from "../controllers/shopkeeperController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// All routes are protected and for shopkeepers only
router.use(protect);
router.use(authorize("owner", "admin"));

router.get("/stats", getShopkeeperStats);
router.get("/inventory-stats", getInventoryStats);

export default router;
