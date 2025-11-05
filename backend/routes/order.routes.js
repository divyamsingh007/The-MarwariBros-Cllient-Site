import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
  deleteOrder,
  getOrderStats,
} from "../controllers/order.controller.js";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// All order routes require authentication
router.use(verifyJWT);

// User routes
router.post("/", createOrder);
router.get("/user/:userId", getUserOrders);
router.get("/:id", getOrderById);
router.put("/:id/cancel", cancelOrder);

// Admin routes
router.get("/stats", isAdmin, getOrderStats);
router.get("/", isAdmin, getAllOrders);
router.put("/:id/status", isAdmin, updateOrderStatus);
router.put("/:id/payment", isAdmin, updatePaymentStatus);
router.delete("/:id", isAdmin, deleteOrder);

export default router;
