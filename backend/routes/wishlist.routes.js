import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  checkWishlist,
} from "../controllers/wishlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// All wishlist routes require authentication
router.use(verifyJWT);

// Wishlist routes
router.get("/:userId", getWishlist);
router.post("/:userId/items", addToWishlist);
router.delete("/:userId/items/:productId", removeFromWishlist);
router.delete("/:userId", clearWishlist);
router.get("/:userId/check/:productId", checkWishlist);

export default router;
