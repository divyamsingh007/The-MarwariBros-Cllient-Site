import express from "express";
import {
  createNotification,
  getUserNotifications,
  getNotificationById,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllUserNotifications,
  getUnreadCount,
} from "../controllers/notification.controller.js";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// All notification routes require authentication
router.use(verifyJWT);

// User routes
router.get("/user/:userId", getUserNotifications);
router.get("/user/:userId/unread-count", getUnreadCount);
router.put("/user/:userId/read-all", markAllAsRead);
router.delete("/user/:userId", deleteAllUserNotifications);
router.get("/:id", getNotificationById);
router.put("/:id/read", markAsRead);
router.delete("/:id", deleteNotification);

// Admin routes
router.post("/", isAdmin, createNotification);

export default router;
