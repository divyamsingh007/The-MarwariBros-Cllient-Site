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

const router = express.Router();

// Special routes (must be before /:id)
router.get('/featured', getFeaturedProducts);
router.get('/best-sellers', getBestSellingProducts);
router.get('/admin', getAllProductsAdmin);
router.get('/category/:category', getProductsByCategory);
router.get('/slug/:slug', getProductBySlug);

// CRUD routes
router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

// Stock management
router.patch('/:id/stock', updateProductStock);

export default router;
