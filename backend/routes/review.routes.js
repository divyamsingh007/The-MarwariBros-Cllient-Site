import express from 'express';
import {
  createReview,
  getProductReviews,
  getReviewById,
  updateReview,
  deleteReview,
  approveReview,
  rejectReview,
  markReviewHelpful,
  addSellerResponse
} from '../controllers/review.controller.js';

const router = express.Router();

// Review routes
router.post('/', createReview);
router.get('/product/:productId', getProductReviews);
router.get('/:id', getReviewById);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

// Admin routes
router.put('/:id/approve', approveReview);
router.put('/:id/reject', rejectReview);
router.post('/:id/response', addSellerResponse);

// User interaction
router.post('/:id/helpful', markReviewHelpful);

export default router;
