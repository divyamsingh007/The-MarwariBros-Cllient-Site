import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { Order, Product, Cart } from '../models/index.js';

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const {
    items,
    shippingAddress,
    billingAddress,
    paymentMethod,
    couponCode
  } = req.body;

  // Calculate totals
  let subtotal = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await Product.findById(item.product);
    
    if (!product) {
      throw new ApiError(404, `Product not found: ${item.product}`);
    }

    if (!product.isInStock(item.quantity)) {
      throw new ApiError(400, `Insufficient stock for ${product.name}`);
    }

    orderItems.push({
      product: product._id,
      name: product.name,
      image: product.images[0]?.url,
      quantity: item.quantity,
      price: product.price,
      size: item.size,
      color: item.color,
      sku: product.sku
    });

    subtotal += product.price * item.quantity;
  }

  // Calculate tax and shipping
  const tax = subtotal * 0.18; // 18% GST
  const shippingFee = subtotal > 500 ? 0 : 50;
  const discount = 0; // Calculate from coupon if provided

  const total = subtotal + tax + shippingFee - discount;

  // Create order
  const order = await Order.create({
    user: req.body.userId,
    items: orderItems,
    shippingAddress,
    billingAddress,
    subtotal,
    tax,
    shippingFee,
    discount,
    total,
    paymentMethod,
    couponCode
  });

  // Update product stock and sales
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    product.stock -= item.quantity;
    product.totalSales += item.quantity;
    await product.save();
  }

  // Clear user's cart if userId is provided
  if (req.body.userId) {
    await Cart.findOneAndUpdate(
      { user: req.body.userId },
      { $set: { items: [], couponCode: null, discount: 0 } }
    );
  }

  res.status(201).json(
    new ApiResponse(201, { order }, 'Order created successfully')
  );
});

// @desc    Get all orders
// @route   GET /api/v1/orders
// @access  Private/Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'firstName lastName email')
    .sort('-createdAt');

  const totalAmount = orders.reduce((acc, order) => acc + order.total, 0);

  res.status(200).json(
    new ApiResponse(200, {
      orders,
      count: orders.length,
      totalAmount
    }, 'Orders retrieved successfully')
  );
});

// @desc    Get order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'firstName lastName email phone')
    .populate('items.product', 'name images');

  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  res.status(200).json(
    new ApiResponse(200, { order }, 'Order retrieved successfully')
  );
});

// @desc    Get user's orders
// @route   GET /api/v1/orders/user/:userId
// @access  Private
export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.userId })
    .populate('items.product', 'name images')
    .sort('-createdAt');

  res.status(200).json(
    new ApiResponse(200, { orders, count: orders.length }, 'User orders retrieved successfully')
  );
});

// @desc    Update order status
// @route   PUT /api/v1/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, note } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  await order.updateStatus(status, note, req.body.updatedBy);

  res.status(200).json(
    new ApiResponse(200, { order }, 'Order status updated successfully')
  );
});

// @desc    Update payment status
// @route   PUT /api/v1/orders/:id/payment
// @access  Private/Admin
export const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { paymentId } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  await order.markAsPaid(paymentId);

  res.status(200).json(
    new ApiResponse(200, { order }, 'Payment status updated successfully')
  );
});

// @desc    Cancel order
// @route   PUT /api/v1/orders/:id/cancel
// @access  Private
export const cancelOrder = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  if (order.orderStatus === 'delivered') {
    throw new ApiError(400, 'Cannot cancel delivered order');
  }

  // Restore product stock
  for (const item of order.items) {
    const product = await Product.findById(item.product);
    if (product) {
      product.stock += item.quantity;
      product.totalSales -= item.quantity;
      await product.save();
    }
  }

  order.orderStatus = 'cancelled';
  order.cancellationReason = reason;
  order.cancelledAt = new Date();
  await order.save();

  res.status(200).json(
    new ApiResponse(200, { order }, 'Order cancelled successfully')
  );
});

// @desc    Delete order
// @route   DELETE /api/v1/orders/:id
// @access  Private/Admin
export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  await order.deleteOne();

  res.status(200).json(
    new ApiResponse(200, null, 'Order deleted successfully')
  );
});

// @desc    Get order statistics
// @route   GET /api/v1/orders/stats
// @access  Private/Admin
export const getOrderStats = asyncHandler(async (req, res) => {
  const stats = await Order.aggregate([
    {
      $group: {
        _id: '$orderStatus',
        count: { $sum: 1 },
        totalAmount: { $sum: '$total' }
      }
    }
  ]);

  const totalOrders = await Order.countDocuments();
  const totalRevenue = await Order.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$total' } } }
  ]);

  res.status(200).json(
    new ApiResponse(200, {
      stats,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0
    }, 'Order statistics retrieved successfully')
  );
});
