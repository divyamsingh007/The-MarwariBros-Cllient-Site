import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
} from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// All cart routes require authentication
router.use(verifyJWT);

// Cart routes
router.get("/:userId", getCart);
router.post("/:userId/items", addToCart);
router.put("/:userId/items/:itemId", updateCartItem);
router.delete("/:userId/items/:itemId", removeFromCart);
router.delete("/:userId", clearCart);

// Coupon routes
router.post("/:userId/coupon", applyCoupon);
router.delete("/:userId/coupon", removeCoupon);

export default router;
