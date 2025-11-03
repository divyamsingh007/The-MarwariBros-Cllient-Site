import express from 'express';
import {
  getDashboardStats,
  getAnalytics,
  getAdminOrders,
  getAdminReviews,
  getCollectionProducts,
  getCustomers,
  updateSettings,
  getInventoryAlerts,
  bulkUpdateProducts,
  exportData
} from '../controllers/admin.controller.js';
import { verifyJWT, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(verifyJWT, isAdmin);

// Dashboard & Analytics
router.get('/dashboard', getDashboardStats);
router.get('/analytics', getAnalytics);

// Orders Management
router.get('/orders', getAdminOrders);

// Reviews Management
router.get('/reviews', getAdminReviews);

// Collections Management
router.get('/collections/:category', getCollectionProducts);

// Customer Management
router.get('/customers', getCustomers);

// Settings
router.put('/settings', updateSettings);

// Inventory Management
router.get('/inventory/alerts', getInventoryAlerts);

// Bulk Operations
router.put('/products/bulk-update', bulkUpdateProducts);

// Data Export
router.get('/export/:type', exportData);

export default router;
