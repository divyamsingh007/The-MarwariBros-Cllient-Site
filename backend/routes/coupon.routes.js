import express from "express";
import {
  createCoupon,
  getAllCoupons,
  getActiveCoupons,
  getCouponByCode,
  validateCoupon,
  updateCoupon,
  deleteCoupon,
  getCouponStats,
} from "../controllers/coupon.controller.js";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public/User routes
router.get("/active", verifyJWT, getActiveCoupons);
router.get("/code/:code", verifyJWT, getCouponByCode);
router.post("/validate", verifyJWT, validateCoupon);

// Admin routes
router.post("/", verifyJWT, isAdmin, createCoupon);
router.get("/", verifyJWT, isAdmin, getAllCoupons);
router.put("/:id", verifyJWT, isAdmin, updateCoupon);
router.delete("/:id", verifyJWT, isAdmin, deleteCoupon);
router.get("/:id/stats", verifyJWT, isAdmin, getCouponStats);

export default router;
