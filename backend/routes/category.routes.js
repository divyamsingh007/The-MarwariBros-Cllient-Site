import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
  getSubcategories,
  getFeaturedCategories,
} from "../controllers/category.controller.js";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/featured", getFeaturedCategories);
router.get("/slug/:slug", getCategoryBySlug);
router.get("/:id/subcategories", getSubcategories);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// Admin routes
router.post("/", verifyJWT, isAdmin, createCategory);
router.put("/:id", verifyJWT, isAdmin, updateCategory);
router.delete("/:id", verifyJWT, isAdmin, deleteCategory);

export default router;
