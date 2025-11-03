import axiosInstance from './axios';

// ============ Product Services ============
export const productService = {
  // Get all products with filters
  getAll: (params = {}) => axiosInstance.get('/products', { params }),
  
  // Get all products (Admin - including drafts)
  getAllAdmin: (params = {}) => axiosInstance.get('/products/admin', { params }),
  
  // Get product by ID
  getById: (id) => axiosInstance.get(`/products/${id}`),
  
  // Get product by slug
  getBySlug: (slug) => axiosInstance.get(`/products/slug/${slug}`),
  
  // Get products by category
  getByCategory: (category, params = {}) => 
    axiosInstance.get(`/products/category/${category}`, { params }),
  
  // Get featured products
  getFeatured: () => axiosInstance.get('/products/featured'),
  
  // Get best selling products
  getBestSellers: () => axiosInstance.get('/products/best-sellers'),
  
  // Create product (Admin)
  create: (data) => axiosInstance.post('/products', data),
  
  // Update product (Admin)
  update: (id, data) => axiosInstance.put(`/products/${id}`, data),
  
  // Delete product (Admin)
  delete: (id) => axiosInstance.delete(`/products/${id}`),
  
  // Update product stock
  updateStock: (id, quantity) => 
    axiosInstance.patch(`/products/${id}/stock`, { quantity }),
};

// ============ User Services ============
export const userService = {
  // Register
  register: (data) => axiosInstance.post('/users/register', data),
  
  // Login
  login: (data) => axiosInstance.post('/users/login', data),
  
  // Get all users (Admin)
  getAll: () => axiosInstance.get('/users'),
  
  // Get user by ID
  getById: (id) => axiosInstance.get(`/users/${id}`),
  
  // Update user
  update: (id, data) => axiosInstance.put(`/users/${id}`, data),
  
  // Delete user (Admin)
  delete: (id) => axiosInstance.delete(`/users/${id}`),
  
  // Change password
  changePassword: (id, data) => axiosInstance.put(`/users/${id}/change-password`, data),
  
  // Address management
  addAddress: (userId, data) => axiosInstance.post(`/users/${userId}/addresses`, data),
  updateAddress: (userId, addressId, data) => 
    axiosInstance.put(`/users/${userId}/addresses/${addressId}`, data),
  deleteAddress: (userId, addressId) => 
    axiosInstance.delete(`/users/${userId}/addresses/${addressId}`),
};

// ============ Order Services ============
export const orderService = {
  // Create order
  create: (data) => axiosInstance.post('/orders', data),
  
  // Get all orders (Admin)
  getAll: () => axiosInstance.get('/orders'),
  
  // Get order by ID
  getById: (id) => axiosInstance.get(`/orders/${id}`),
  
  // Get user's orders
  getByUser: (userId) => axiosInstance.get(`/orders/user/${userId}`),
  
  // Update order status
  updateStatus: (id, status) => axiosInstance.put(`/orders/${id}/status`, { status }),
  
  // Update payment status
  updatePayment: (id, data) => axiosInstance.put(`/orders/${id}/payment`, data),
  
  // Cancel order
  cancel: (id) => axiosInstance.put(`/orders/${id}/cancel`),
  
  // Delete order (Admin)
  delete: (id) => axiosInstance.delete(`/orders/${id}`),
  
  // Get order statistics (Admin)
  getStats: () => axiosInstance.get('/orders/stats'),
};

// ============ Cart Services ============
export const cartService = {
  // Get user's cart
  get: (userId) => axiosInstance.get(`/cart/${userId}`),
  
  // Add item to cart
  addItem: (userId, data) => axiosInstance.post(`/cart/${userId}/items`, data),
  
  // Update cart item quantity
  updateItem: (userId, itemId, quantity) => 
    axiosInstance.put(`/cart/${userId}/items/${itemId}`, { quantity }),
  
  // Remove item from cart
  removeItem: (userId, itemId) => axiosInstance.delete(`/cart/${userId}/items/${itemId}`),
  
  // Clear cart
  clear: (userId) => axiosInstance.delete(`/cart/${userId}`),
  
  // Apply coupon
  applyCoupon: (userId, code) => axiosInstance.post(`/cart/${userId}/coupon`, { code }),
  
  // Remove coupon
  removeCoupon: (userId) => axiosInstance.delete(`/cart/${userId}/coupon`),
};

// ============ Wishlist Services ============
export const wishlistService = {
  // Get user's wishlist
  get: (userId) => axiosInstance.get(`/wishlist/${userId}`),
  
  // Add item to wishlist
  addItem: (userId, productId) => 
    axiosInstance.post(`/wishlist/${userId}/items`, { productId }),
  
  // Remove item from wishlist
  removeItem: (userId, itemId) => 
    axiosInstance.delete(`/wishlist/${userId}/items/${itemId}`),
  
  // Clear wishlist
  clear: (userId) => axiosInstance.delete(`/wishlist/${userId}`),
};

// ============ Review Services ============
export const reviewService = {
  // Create review
  create: (data) => axiosInstance.post('/reviews', data),
  
  // Get all reviews
  getAll: (params = {}) => axiosInstance.get('/reviews', { params }),
  
  // Get review by ID
  getById: (id) => axiosInstance.get(`/reviews/${id}`),
  
  // Get reviews by product
  getByProduct: (productId) => axiosInstance.get(`/reviews/product/${productId}`),
  
  // Get reviews by user
  getByUser: (userId) => axiosInstance.get(`/reviews/user/${userId}`),
  
  // Update review
  update: (id, data) => axiosInstance.put(`/reviews/${id}`, data),
  
  // Delete review
  delete: (id) => axiosInstance.delete(`/reviews/${id}`),
  
  // Mark review as helpful
  markHelpful: (id) => axiosInstance.post(`/reviews/${id}/helpful`),
};

// ============ Category Services ============
export const categoryService = {
  // Create category (Admin)
  create: (data) => axiosInstance.post('/categories', data),
  
  // Get all categories
  getAll: () => axiosInstance.get('/categories'),
  
  // Get category by ID
  getById: (id) => axiosInstance.get(`/categories/${id}`),
  
  // Get category by slug
  getBySlug: (slug) => axiosInstance.get(`/categories/slug/${slug}`),
  
  // Update category (Admin)
  update: (id, data) => axiosInstance.put(`/categories/${id}`, data),
  
  // Delete category (Admin)
  delete: (id) => axiosInstance.delete(`/categories/${id}`),
};

// ============ Coupon Services ============
export const couponService = {
  // Create coupon (Admin)
  create: (data) => axiosInstance.post('/coupons', data),
  
  // Get all coupons (Admin)
  getAll: () => axiosInstance.get('/coupons'),
  
  // Get coupon by ID (Admin)
  getById: (id) => axiosInstance.get(`/coupons/${id}`),
  
  // Validate coupon
  validate: (code) => axiosInstance.post('/coupons/validate', { code }),
  
  // Update coupon (Admin)
  update: (id, data) => axiosInstance.put(`/coupons/${id}`, data),
  
  // Delete coupon (Admin)
  delete: (id) => axiosInstance.delete(`/coupons/${id}`),
  
  // Toggle coupon active status (Admin)
  toggleActive: (id) => axiosInstance.patch(`/coupons/${id}/toggle-active`),
};

// ============ Notification Services ============
export const notificationService = {
  // Get user's notifications
  get: (userId) => axiosInstance.get(`/notifications/${userId}`),
  
  // Mark notification as read
  markAsRead: (userId, notificationId) => 
    axiosInstance.put(`/notifications/${userId}/${notificationId}/read`),
  
  // Mark all as read
  markAllAsRead: (userId) => axiosInstance.put(`/notifications/${userId}/read-all`),
  
  // Delete notification
  delete: (userId, notificationId) => 
    axiosInstance.delete(`/notifications/${userId}/${notificationId}`),
  
  // Clear all notifications
  clearAll: (userId) => axiosInstance.delete(`/notifications/${userId}`),
};

// ============ Admin Services ============
export const adminService = {
  // Get dashboard stats
  getDashboardStats: () => axiosInstance.get('/admin/dashboard/stats'),
  
  // Get revenue analytics
  getRevenueAnalytics: (params = {}) => 
    axiosInstance.get('/admin/analytics/revenue', { params }),
  
  // Get sales analytics
  getSalesAnalytics: (params = {}) => 
    axiosInstance.get('/admin/analytics/sales', { params }),
  
  // Get user analytics
  getUserAnalytics: (params = {}) => 
    axiosInstance.get('/admin/analytics/users', { params }),
  
  // Get product analytics
  getProductAnalytics: (params = {}) => 
    axiosInstance.get('/admin/analytics/products', { params }),
};

export default {
  productService,
  userService,
  orderService,
  cartService,
  wishlistService,
  reviewService,
  categoryService,
  couponService,
  notificationService,
  adminService,
};
