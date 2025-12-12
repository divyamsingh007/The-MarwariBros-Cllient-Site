import express from 'express';
import {
  createCoupon,
  getAllCoupons,
  getActiveCoupons,
  getCouponByCode,
  validateCoupon,
  updateCoupon,
  deleteCoupon,
  getCouponStats
} from '../controllers/coupon.controller.js';

const router = express.Router();

// Special routes
router.get('/active', getActiveCoupons);
router.get('/code/:code', getCouponByCode);
router.post('/validate', validateCoupon);
router.get('/:id/stats', getCouponStats);

// CRUD routes
router.post('/', createCoupon);
router.get('/', getAllCoupons);
router.put('/:id', updateCoupon);
router.delete('/:id', deleteCoupon);

export default router;
