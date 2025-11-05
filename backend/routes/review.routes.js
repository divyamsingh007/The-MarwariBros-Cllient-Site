import express from "express";
import {
  createReview,
  getProductReviews,
  getReviewById,
  updateReview,
  deleteReview,
  approveReview,
  rejectReview,
  markReviewHelpful,
  addSellerResponse,
} from "../controllers/review.controller.js";
import {
  verifyJWT,
  isAdmin,
  isSellerOrAdmin,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/product/:productId", getProductReviews);
router.get("/:id", getReviewById);

// User routes (require authentication)
router.post("/", verifyJWT, createReview);
router.put("/:id", verifyJWT, updateReview);
router.delete("/:id", verifyJWT, deleteReview);
router.post("/:id/helpful", verifyJWT, markReviewHelpful);

// Admin/Seller routes
router.put("/:id/approve", verifyJWT, isAdmin, approveReview);
router.put("/:id/reject", verifyJWT, isAdmin, rejectReview);
router.post("/:id/response", verifyJWT, isSellerOrAdmin, addSellerResponse);

export default router;
