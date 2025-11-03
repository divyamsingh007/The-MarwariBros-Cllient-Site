import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { Review, Order } from '../models/index.js';

// @desc    Create product review
// @route   POST /api/v1/reviews
// @access  Private
export const createReview = asyncHandler(async (req, res) => {
  const { product, user, rating, title, comment, images, order } = req.body;

  // Check if user already reviewed this product
  const existingReview = await Review.findOne({ product, user });

  if (existingReview) {
    throw new ApiError(400, 'You have already reviewed this product');
  }

  // Check if this is a verified purchase
  let isVerifiedPurchase = false;
  if (order) {
    const orderDoc = await Order.findOne({
      _id: order,
      user,
      'items.product': product,
      orderStatus: 'delivered'
    });
    isVerifiedPurchase = !!orderDoc;
  }

  const review = await Review.create({
    product,
    user,
    order,
    rating,
    title,
    comment,
    images,
    isVerifiedPurchase
  });

  res.status(201).json(
    new ApiResponse(201, { review }, 'Review created successfully')
  );
});

// @desc    Get all reviews for a product
// @route   GET /api/v1/reviews/product/:productId
// @access  Public
export const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ 
    product: req.params.productId,
    status: 'approved',
    isPublished: true
  })
    .populate('user', 'firstName lastName avatar')
    .sort('-createdAt');

  res.status(200).json(
    new ApiResponse(200, { reviews, count: reviews.length }, 'Reviews retrieved successfully')
  );
});

// @desc    Get review by ID
// @route   GET /api/v1/reviews/:id
// @access  Public
export const getReviewById = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id)
    .populate('user', 'firstName lastName avatar')
    .populate('product', 'name images');

  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  res.status(200).json(
    new ApiResponse(200, { review }, 'Review retrieved successfully')
  );
});

// @desc    Update review
// @route   PUT /api/v1/reviews/:id
// @access  Private
export const updateReview = asyncHandler(async (req, res) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  const { rating, title, comment, images } = req.body;

  review.rating = rating || review.rating;
  review.title = title || review.title;
  review.comment = comment || review.comment;
  review.images = images || review.images;
  review.status = 'pending'; // Reset to pending for re-moderation

  await review.save();

  res.status(200).json(
    new ApiResponse(200, { review }, 'Review updated successfully')
  );
});

// @desc    Delete review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  await review.deleteOne();

  res.status(200).json(
    new ApiResponse(200, null, 'Review deleted successfully')
  );
});

// @desc    Approve review (Admin)
// @route   PUT /api/v1/reviews/:id/approve
// @access  Private/Admin
export const approveReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  await review.approve(req.body.moderatorId);

  res.status(200).json(
    new ApiResponse(200, { review }, 'Review approved successfully')
  );
});

// @desc    Reject review (Admin)
// @route   PUT /api/v1/reviews/:id/reject
// @access  Private/Admin
export const rejectReview = asyncHandler(async (req, res) => {
  const { moderatorId, reason } = req.body;

  const review = await Review.findById(req.params.id);

  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  await review.reject(moderatorId, reason);

  res.status(200).json(
    new ApiResponse(200, { review }, 'Review rejected successfully')
  );
});

// @desc    Mark review as helpful
// @route   POST /api/v1/reviews/:id/helpful
// @access  Private
export const markReviewHelpful = asyncHandler(async (req, res) => {
  const { userId, isHelpful } = req.body;

  const review = await Review.findById(req.params.id);

  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  await review.markAsHelpful(userId, isHelpful);

  res.status(200).json(
    new ApiResponse(200, { review }, 'Review marked as helpful')
  );
});

// @desc    Add seller response to review
// @route   POST /api/v1/reviews/:id/response
// @access  Private/Admin
export const addSellerResponse = asyncHandler(async (req, res) => {
  const { comment, respondedBy } = req.body;

  const review = await Review.findById(req.params.id);

  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  review.sellerResponse = {
    comment,
    respondedBy,
    respondedAt: new Date()
  };

  await review.save();

  res.status(200).json(
    new ApiResponse(200, { review }, 'Seller response added successfully')
  );
});
