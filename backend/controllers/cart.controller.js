import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Cart, Product } from "../models/index.js";

// @desc    Get user's cart
// @route   GET /api/v1/cart/:userId
// @access  Private
export const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.params.userId }).populate(
    "items.product",
    "name price images stock"
  );

  if (!cart) {
    // Create new cart if doesn't exist
    cart = await Cart.create({ user: req.params.userId, items: [] });
  }

  res
    .status(200)
    .json(new ApiResponse(200, { cart }, "Cart retrieved successfully"));
});

// @desc    Add item to cart
// @route   POST /api/v1/cart/:userId/items
// @access  Private
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity, size, color, variant } = req.body;

  let cart = await Cart.findOne({ user: req.params.userId });

  if (!cart) {
    cart = await Cart.create({ user: req.params.userId, items: [] });
  }

  await cart.addItem(productId, quantity, { size, color, variant });

  // Populate cart items
  cart = await Cart.findById(cart._id).populate(
    "items.product",
    "name price images stock"
  );

  res
    .status(200)
    .json(new ApiResponse(200, { cart }, "Item added to cart successfully"));
});

// @desc    Update cart item quantity
// @route   PUT /api/v1/cart/:userId/items/:itemId
// @access  Private
export const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;

  const cart = await Cart.findOne({ user: req.params.userId });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  await cart.updateItemQuantity(req.params.itemId, quantity);

  // Populate cart items
  const updatedCart = await Cart.findById(cart._id).populate(
    "items.product",
    "name price images stock"
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { cart: updatedCart },
        "Cart item updated successfully"
      )
    );
});

// @desc    Remove item from cart
// @route   DELETE /api/v1/cart/:userId/items/:itemId
// @access  Private
export const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.params.userId });

  if (!cart) {
    throw new ApiError(404, "Cart ");
  }

  await cart.removeItem(req.params.itemId);

  // Populate cart items
  const updatedCart = await Cart.findById(cart._id).populate(
    "items.product",
    "name price images stock"
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { cart: updatedCart },
        "Item removed from cart successfully"
      )
    );
});

// @desc    Clear cart
// @route   DELETE /api/v1/cart/:userId
// @access  Private
export const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.params.userId });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  await cart.clearCart();

  res
    .status(200)
    .json(new ApiResponse(200, { cart }, "Cart cleared successfully"));
});

// @desc    Apply coupon to cart
// @route   POST /api/v1/cart/:userId/coupon
// @access  Private
export const applyCoupon = asyncHandler(async (req, res) => {
  const { couponCode } = req.body;

  const cart = await Cart.findOne({ user: req.params.userId });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  await cart.applyCoupon(couponCode);

  // Populate cart items
  const updatedCart = await Cart.findById(cart._id).populate(
    "items.product",
    "name price images stock"
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, { cart: updatedCart }, "Coupon applied successfully")
    );
});

// @desc    Remove coupon from cart
// @route   DELETE /api/v1/cart/:userId/coupon
// @access  Private
export const removeCoupon = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.params.userId });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  await cart.removeCoupon();

  // Populate cart items
  const updatedCart = await Cart.findById(cart._id).populate(
    "items.product",
    "name price images stock"
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, { cart: updatedCart }, "Coupon removed successfully")
    );
});
