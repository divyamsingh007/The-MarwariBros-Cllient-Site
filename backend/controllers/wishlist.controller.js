import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { Wishlist } from '../models/index.js';

// @desc    Get user's wishlist
// @route   GET /api/v1/wishlist/:userId
// @access  Private
export const getWishlist = asyncHandler(async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.params.userId })
    .populate('items.product', 'name price images averageRating stock');

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.params.userId, items: [] });
  }

  res.status(200).json(
    new ApiResponse(200, { wishlist }, 'Wishlist retrieved successfully')
  );
});

// @desc    Add item to wishlist
// @route   POST /api/v1/wishlist/:userId/items
// @access  Private
export const addToWishlist = asyncHandler(async (req, res) => {
  const { productId, priority, notes } = req.body;

  let wishlist = await Wishlist.findOne({ user: req.params.userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.params.userId, items: [] });
  }

  await wishlist.addItem(productId, { priority, notes });

  // Populate wishlist items
  wishlist = await Wishlist.findById(wishlist._id)
    .populate('items.product', 'name price images averageRating stock');

  res.status(200).json(
    new ApiResponse(200, { wishlist }, 'Item added to wishlist successfully')
  );
});

// @desc    Remove item from wishlist
// @route   DELETE /api/v1/wishlist/:userId/items/:productId
// @access  Private
export const removeFromWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.params.userId });

  if (!wishlist) {
    throw new ApiError(404, 'Wishlist not found');
  }

  await wishlist.removeItem(req.params.productId);

  // Populate wishlist items
  const updatedWishlist = await Wishlist.findById(wishlist._id)
    .populate('items.product', 'name price images averageRating stock');

  res.status(200).json(
    new ApiResponse(200, { wishlist: updatedWishlist }, 'Item removed from wishlist successfully')
  );
});

// @desc    Clear wishlist
// @route   DELETE /api/v1/wishlist/:userId
// @access  Private
export const clearWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.params.userId });

  if (!wishlist) {
    throw new ApiError(404, 'Wishlist not found');
  }

  await wishlist.clearWishlist();

  res.status(200).json(
    new ApiResponse(200, { wishlist }, 'Wishlist cleared successfully')
  );
});

// @desc    Check if product is in wishlist
// @route   GET /api/v1/wishlist/:userId/check/:productId
// @access  Private
export const checkWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.params.userId });

  const inWishlist = wishlist ? wishlist.hasProduct(req.params.productId) : false;

  res.status(200).json(
    new ApiResponse(200, { inWishlist }, 'Wishlist check completed')
  );
});
