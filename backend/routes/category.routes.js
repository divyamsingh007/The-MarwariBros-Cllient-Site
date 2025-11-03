import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
  getSubcategories,
  getFeaturedCategories
} from '../controllers/category.controller.js';

const router = express.Router();

// Special routes
router.get('/featured', getFeaturedCategories);
router.get('/slug/:slug', getCategoryBySlug);
router.get('/:id/subcategories', getSubcategories);

// CRUD routes
router.post('/', createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
