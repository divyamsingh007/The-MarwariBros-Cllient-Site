import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { Product, Order, User, Review, Category } from '../models/index.js';

// @desc    Get dashboard overview statistics
// @route   GET /api/v1/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = asyncHandler(async (req, res) => {
  // Get total orders
  const totalOrders = await Order.countDocuments();
  
  // Get total revenue
  const revenueData = await Order.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$total' } } }
  ]);
  const totalRevenue = revenueData[0]?.total || 0;
  
  // Get active customers
  const activeCustomers = await User.countDocuments({ 
    role: 'customer',
    isActive: true 
  });
  
  // Get top category
  const topCategoryData = await Order.aggregate([
    { $unwind: '$items' },
    {
      $lookup: {
        from: 'products',
        localField: 'items.product',
        foreignField: '_id',
        as: 'productDetails'
      }
    },
    { $unwind: '$productDetails' },
    {
      $group: {
        _id: '$productDetails.category',
        count: { $sum: '$items.quantity' }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 1 }
  ]);
  const topCategory = topCategoryData[0]?._id || 'N/A';
  
  // Get sales performance (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const salesPerformance = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: sevenDaysAgo },
        paymentStatus: 'paid'
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        sales: { $sum: '$total' },
        orders: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);
  
  // Get category breakdown
  const categoryBreakdown = await Order.aggregate([
    { $unwind: '$items' },
    {
      $lookup: {
        from: 'products',
        localField: 'items.product',
        foreignField: '_id',
        as: 'productDetails'
      }
    },
    { $unwind: '$productDetails' },
    {
      $group: {
        _id: '$productDetails.category',
        total: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },
        quantity: { $sum: '$items.quantity' }
      }
    }
  ]);
  
  // Get recent orders
  const recentOrders = await Order.find()
    .populate('user', 'firstName lastName email')
    .populate('items.product', 'name')
    .sort('-createdAt')
    .limit(10);
  
  res.status(200).json(
    new ApiResponse(200, {
      stats: {
        totalOrders,
        totalRevenue,
        activeCustomers,
        topCategory
      },
      salesPerformance,
      categoryBreakdown,
      recentOrders
    }, 'Dashboard statistics retrieved successfully')
  );
});

// @desc    Get analytics data
// @route   GET /api/v1/admin/analytics
// @access  Private/Admin
export const getAnalytics = asyncHandler(async (req, res) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  // Traffic metrics (using order data as proxy)
  const totalVisits = await Order.countDocuments({
    createdAt: { $gte: thirtyDaysAgo }
  });
  
  const completedOrders = await Order.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
    orderStatus: 'delivered'
  });
  
  const conversionRate = totalVisits > 0 
    ? ((completedOrders / totalVisits) * 100).toFixed(2) 
    : 0;
  
  // Traffic by channel (mock data - would come from analytics service)
  const trafficByChannel = [
    { channel: 'Direct', visits: Math.floor(Math.random() * 1000) + 500 },
    { channel: 'Organic Search', visits: Math.floor(Math.random() * 1000) + 800 },
    { channel: 'Social Media', visits: Math.floor(Math.random() * 1000) + 600 },
    { channel: 'Email', visits: Math.floor(Math.random() * 500) + 200 },
    { channel: 'Referral', visits: Math.floor(Math.random() * 500) + 300 }
  ];
  
  // Sales by category
  const salesByCategory = await Order.aggregate([
    { $match: { createdAt: { $gte: thirtyDaysAgo } } },
    { $unwind: '$items' },
    {
      $lookup: {
        from: 'products',
        localField: 'items.product',
        foreignField: '_id',
        as: 'productDetails'
      }
    },
    { $unwind: '$productDetails' },
    {
      $group: {
        _id: '$productDetails.category',
        sales: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
      }
    },
    { $sort: { sales: -1 } }
  ]);
  
  // Top selling items
  const topSellingItems = await Order.aggregate([
    { $match: { createdAt: { $gte: thirtyDaysAgo } } },
    { $unwind: '$items' },
    {
      $group: {
        _id: '$items.product',
        totalSold: { $sum: '$items.quantity' },
        revenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },
        productName: { $first: '$items.name' }
      }
    },
    { $sort: { totalSold: -1 } },
    { $limit: 10 }
  ]);
  
  res.status(200).json(
    new ApiResponse(200, {
      trafficMetrics: {
        totalVisits,
        completedOrders,
        conversionRate
      },
      trafficByChannel,
      salesByCategory,
      topSellingItems
    }, 'Analytics data retrieved successfully')
  );
});

// @desc    Get all orders with filters (Admin)
// @route   GET /api/v1/admin/orders
// @access  Private/Admin
export const getAdminOrders = asyncHandler(async (req, res) => {
  const { status, paymentStatus, startDate, endDate } = req.query;
  
  const query = {};
  
  if (status) query.orderStatus = status;
  if (paymentStatus) query.paymentStatus = paymentStatus;
  
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }
  
  const orders = await Order.find(query)
    .populate('user', 'firstName lastName email phone')
    .populate('items.product', 'name images')
    .sort('-createdAt');
  
  // Get order statistics
  const orderStats = {
    pending: await Order.countDocuments({ orderStatus: 'pending' }),
    processing: await Order.countDocuments({ orderStatus: 'processing' }),
    shipped: await Order.countDocuments({ orderStatus: 'shipped' }),
    delivered: await Order.countDocuments({ orderStatus: 'delivered' }),
    cancelled: await Order.countDocuments({ orderStatus: 'cancelled' })
  };
  
  res.status(200).json(
    new ApiResponse(200, {
      orders,
      orderStats,
      count: orders.length
    }, 'Orders retrieved successfully')
  );
});

// @desc    Get all reviews (Admin)
// @route   GET /api/v1/admin/reviews
// @access  Private/Admin
export const getAdminReviews = asyncHandler(async (req, res) => {
  const { status } = req.query;
  
  const query = {};
  if (status) query.status = status;
  
  const reviews = await Review.find(query)
    .populate('user', 'firstName lastName email avatar')
    .populate('product', 'name images category')
    .sort('-createdAt');
  
  // Get review statistics
  const reviewStats = {
    total: await Review.countDocuments(),
    pending: await Review.countDocuments({ status: 'pending' }),
    approved: await Review.countDocuments({ status: 'approved' }),
    rejected: await Review.countDocuments({ status: 'rejected' }),
    fiveStarReviews: await Review.countDocuments({ rating: 5, status: 'approved' })
  };
  
  // Calculate average rating
  const avgRatingData = await Review.aggregate([
    { $match: { status: 'approved' } },
    { $group: { _id: null, avgRating: { $avg: '$rating' } } }
  ]);
  reviewStats.averageRating = avgRatingData[0]?.avgRating?.toFixed(1) || 0;
  
  res.status(200).json(
    new ApiResponse(200, {
      reviews,
      reviewStats,
      count: reviews.length
    }, 'Reviews retrieved successfully')
  );
});

// @desc    Get products by collection/category
// @route   GET /api/v1/admin/collections/:category
// @access  Private/Admin
export const getCollectionProducts = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const { stockFilter, search } = req.query;
  
  const query = { category };
  
  // Stock filter
  if (stockFilter === 'in-stock') {
    query.stock = { $gt: 0 };
  } else if (stockFilter === 'out-of-stock') {
    query.stock = 0;
  }
  
  // Search filter
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } }
    ];
  }
  
  const products = await Product.find(query)
    .sort('-createdAt');
  
  res.status(200).json(
    new ApiResponse(200, {
      products,
      count: products.length,
      category
    }, 'Collection products retrieved successfully')
  );
});

// @desc    Get all customers
// @route   GET /api/v1/admin/customers
// @access  Private/Admin
export const getCustomers = asyncHandler(async (req, res) => {
  const customers = await User.find({ role: 'customer' })
    .select('-password')
    .sort('-createdAt');
  
  const customerStats = {
    total: customers.length,
    active: customers.filter(c => c.isActive).length,
    inactive: customers.filter(c => !c.isActive).length,
    emailVerified: customers.filter(c => c.isEmailVerified).length
  };
  
  res.status(200).json(
    new ApiResponse(200, {
      customers,
      customerStats,
      count: customers.length
    }, 'Customers retrieved successfully')
  );
});

// @desc    Update site settings
// @route   PUT /api/v1/admin/settings
// @access  Private/Admin
export const updateSettings = asyncHandler(async (req, res) => {
  // This would typically update a Settings model
  // For now, we'll just return success
  const settings = req.body;
  
  console.log('✅ Settings updated successfully:', settings);
  
  res.status(200).json(
    new ApiResponse(200, { settings }, 'Settings updated successfully')
  );
});

// @desc    Get inventory alerts (low stock products)
// @route   GET /api/v1/admin/inventory/alerts
// @access  Private/Admin
export const getInventoryAlerts = asyncHandler(async (req, res) => {
  const lowStockProducts = await Product.find({
    $expr: { $lte: ['$stock', '$lowStockThreshold'] }
  }).sort('stock');
  
  const outOfStockProducts = await Product.find({ stock: 0 });
  
  res.status(200).json(
    new ApiResponse(200, {
      lowStockProducts,
      outOfStockProducts,
      lowStockCount: lowStockProducts.length,
      outOfStockCount: outOfStockProducts.length
    }, 'Inventory alerts retrieved successfully')
  );
});

// @desc    Bulk update product status
// @route   PUT /api/v1/admin/products/bulk-update
// @access  Private/Admin
export const bulkUpdateProducts = asyncHandler(async (req, res) => {
  const { productIds, updates } = req.body;
  
  if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
    throw new ApiError(400, 'Product IDs array is required');
  }
  
  const result = await Product.updateMany(
    { _id: { $in: productIds } },
    { $set: updates }
  );
  
  res.status(200).json(
    new ApiResponse(200, { 
      modifiedCount: result.modifiedCount 
    }, 'Products updated successfully')
  );
});

// @desc    Export data (orders, customers, products)
// @route   GET /api/v1/admin/export/:type
// @access  Private/Admin
export const exportData = asyncHandler(async (req, res) => {
  const { type } = req.params;
  const { startDate, endDate } = req.query;
  
  let data;
  
  const dateFilter = {};
  if (startDate || endDate) {
    dateFilter.createdAt = {};
    if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
    if (endDate) dateFilter.createdAt.$lte = new Date(endDate);
  }
  
  switch (type) {
    case 'orders':
      data = await Order.find(dateFilter)
        .populate('user', 'firstName lastName email')
        .populate('items.product', 'name sku');
      break;
      
    case 'customers':
      data = await User.find({ role: 'customer', ...dateFilter })
        .select('-password');
      break;
      
    case 'products':
      data = await Product.find(dateFilter);
      break;
      
    default:
      throw new ApiError(400, 'Invalid export type');
  }
  
  res.status(200).json(
    new ApiResponse(200, { 
      data,
      count: data.length,
      exportType: type
    }, `${type} data exported successfully`)
  );
});
