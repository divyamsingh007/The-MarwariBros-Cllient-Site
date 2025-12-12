import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
  deleteOrder,
  getOrderStats
} from '../controllers/order.controller.js';

const router = express.Router();

// Special routes
router.get('/stats', getOrderStats);
router.get('/user/:userId', getUserOrders);

// CRUD routes
router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.delete('/:id', deleteOrder);

// Order management
router.put('/:id/status', updateOrderStatus);
router.put('/:id/payment', updatePaymentStatus);
router.put('/:id/cancel', cancelOrder);

export default router;
