import express from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  checkWishlist
} from '../controllers/wishlist.controller.js';

const router = express.Router();

// Wishlist routes
router.get('/:userId', getWishlist);
router.post('/:userId/items', addToWishlist);
router.delete('/:userId/items/:productId', removeFromWishlist);
router.delete('/:userId', clearWishlist);
router.get('/:userId/check/:productId', checkWishlist);

export default router;
