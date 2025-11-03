import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { Coupon } from '../models/index.js';

// @desc    Create coupon
// @route   POST /api/v1/coupons
// @access  Private/Admin
export const createCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.create(req.body);

  res.status(201).json(
    new ApiResponse(201, { coupon }, 'Coupon created successfully')
  );
});

// @desc    Get all coupons
// @route   GET /api/v1/coupons
// @access  Private/Admin
export const getAllCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find().sort('-createdAt');

  res.status(200).json(
    new ApiResponse(200, { coupons, count: coupons.length }, 'Coupons retrieved successfully')
  );
});

// @desc    Get active coupons
// @route   GET /api/v1/coupons/active
// @access  Public
export const getActiveCoupons = asyncHandler(async (req, res) => {
  const now = new Date();
  
  const coupons = await Coupon.find({
    isActive: true,
    isPublic: true,
    startDate: { $lte: now },
    endDate: { $gte: now }
  }).sort('-discountValue');

  res.status(200).json(
    new ApiResponse(200, { coupons, count: coupons.length }, 'Active coupons retrieved successfully')
  );
});

// @desc    Get coupon by code
// @route   GET /api/v1/coupons/code/:code
// @access  Public
export const getCouponByCode = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findOne({ code: req.params.code.toUpperCase() });

  if (!coupon) {
    throw new ApiError(404, 'Coupon not found');
  }

  res.status(200).json(
    new ApiResponse(200, { coupon }, 'Coupon retrieved successfully')
  );
});

// @desc    Validate coupon
// @route   POST /api/v1/coupons/validate
// @access  Public
export const validateCoupon = asyncHandler(async (req, res) => {
  const { code, userId, orderAmount } = req.body;

  const coupon = await Coupon.findOne({ code: code.toUpperCase() });

  if (!coupon) {
    throw new ApiError(404, 'Invalid coupon code');
  }

  if (!coupon.isValid()) {
    throw new ApiError(400, 'Coupon is expired or inactive');
  }

  if (userId && !coupon.canUserUseCoupon(userId)) {
    throw new ApiError(400, 'You cannot use this coupon');
  }

  if (orderAmount < coupon.minPurchaseAmount) {
    throw new ApiError(400, `Minimum purchase amount of ₹${coupon.minPurchaseAmount} required`);
  }

  const discount = coupon.calculateDiscount(orderAmount);

  res.status(200).json(
    new ApiResponse(200, { 
      valid: true,
      coupon,
      discount
    }, 'Coupon is valid')
  );
});

// @desc    Update coupon
// @route   PUT /api/v1/coupons/:id
// @access  Private/Admin
export const updateCoupon = asyncHandler(async (req, res) => {
  let coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    throw new ApiError(404, 'Coupon not found');
  }

  coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json(
    new ApiResponse(200, { coupon }, 'Coupon updated successfully')
  );
});

// @desc    Delete coupon
// @route   DELETE /api/v1/coupons/:id
// @access  Private/Admin
export const deleteCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    throw new ApiError(404, 'Coupon not found');
  }

  await coupon.deleteOne();

  res.status(200).json(
    new ApiResponse(200, null, 'Coupon deleted successfully')
  );
});

// @desc    Get coupon usage stats
// @route   GET /api/v1/coupons/:id/stats
// @access  Private/Admin
export const getCouponStats = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id)
    .populate('usedBy.user', 'firstName lastName email')
    .populate('usedBy.order', 'orderNumber total');

  if (!coupon) {
    throw new ApiError(404, 'Coupon not found');
  }

  const totalDiscount = coupon.usedBy.reduce((sum, usage) => sum + usage.discountAmount, 0);

  res.status(200).json(
    new ApiResponse(200, {
      coupon,
      stats: {
        currentUsage: coupon.currentUsage,
        maxUsage: coupon.maxUsage,
        usagePercentage: coupon.usagePercentage,
        totalDiscount,
        uniqueUsers: new Set(coupon.usedBy.map(u => u.user.toString())).size
      }
    }, 'Coupon stats retrieved successfully')
  );
});
