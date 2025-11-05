import express from "express";
import {
  createProduct,
  getAllProducts,
  getAllProductsAdmin,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getFeaturedProducts,
  getBestSellingProducts,
  updateProductStock,
} from "../controllers/product.controller.js";
import {
  verifyJWT,
  isAdmin,
  isSellerOrAdmin,
  optionalAuth,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes (no auth required)
router.get("/featured", getFeaturedProducts);
router.get("/best-sellers", getBestSellingProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/slug/:slug", getProductBySlug);
router.get("/", optionalAuth, getAllProducts);
router.get("/:id", getProductById);

// Admin/Seller routes
router.get("/admin", verifyJWT, isAdmin, getAllProductsAdmin);
router.post("/", verifyJWT, isSellerOrAdmin, createProduct);
router.put("/:id", verifyJWT, isSellerOrAdmin, updateProduct);
router.delete("/:id", verifyJWT, isSellerOrAdmin, deleteProduct);
router.patch("/:id/stock", verifyJWT, isSellerOrAdmin, updateProductStock);

export default router;
