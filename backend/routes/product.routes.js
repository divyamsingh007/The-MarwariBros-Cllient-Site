import express from 'express';
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
  updateProductStock
} from '../controllers/product.controller.js';
import { verifyJWT, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public routes - no authentication required
router.get('/featured', getFeaturedProducts);
router.get('/best-sellers', getBestSellingProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/slug/:slug', getProductBySlug);

// Admin only routes - require authentication and admin role (must come before /:id)
router.get('/admin', verifyJWT, isAdmin, getAllProductsAdmin);

// More public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin routes for mutations
router.post('/', verifyJWT, isAdmin, createProduct);
router.put('/:id', verifyJWT, isAdmin, updateProduct);
router.delete('/:id', verifyJWT, isAdmin, deleteProduct);
router.patch('/:id/stock', verifyJWT, isAdmin, updateProductStock);

export default router;
