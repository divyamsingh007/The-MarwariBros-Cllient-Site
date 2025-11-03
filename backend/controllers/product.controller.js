import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiFeatures from '../utils/ApiFeatures.js';
import { Product } from '../models/index.js';

// @desc    Create a new product
// @route   POST /api/v1/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json(
    new ApiResponse(201, { product }, 'Product created successfully')
  );
});

// @desc    Get all products with filters, search, pagination
// @route   GET /api/v1/products
// @access  Public
export const getAllProducts = asyncHandler(async (req, res) => {
  const resultsPerPage = 12;
  
  // Count total products matching filters
  const apiFeatures = new ApiFeatures(
    Product.find({ isPublished: true, status: 'active' }),
    req.query
  )
    .search()
    .filter();

  let products = await apiFeatures.query.clone();
  const filteredProductsCount = products.length;

  // Apply sorting, field limiting, and pagination
  apiFeatures.sort().limitFields().paginate();
  products = await apiFeatures.query;

  res.status(200).json(
    new ApiResponse(200, {
      products,
      count: products.length,
      totalProducts: filteredProductsCount,
      resultsPerPage,
      currentPage: parseInt(req.query.page, 10) || 1
    }, 'Products retrieved successfully')
  );
});

// @desc    Get all products (Admin - including drafts)
// @route   GET /api/v1/products/admin
// @access  Private/Admin
export const getAllProductsAdmin = asyncHandler(async (req, res) => {
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await apiFeatures.query;

  res.status(200).json(
    new ApiResponse(200, { products, count: products.length }, 'Products retrieved successfully')
  );
});

// @desc    Get product by ID
// @route   GET /api/v1/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('relatedProducts', 'name price images averageRating')
    .populate('vendor', 'firstName lastName email');

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  // Increment views
  await product.incrementViews();

  res.status(200).json(
    new ApiResponse(200, { product }, 'Product retrieved successfully')
  );
});

// @desc    Get product by slug
// @route   GET /api/v1/products/slug/:slug
// @access  Public
export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate('relatedProducts', 'name price images averageRating')
    .populate('vendor', 'firstName lastName email');

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  // Increment views
  await product.incrementViews();

  res.status(200).json(
    new ApiResponse(200, { product }, 'Product retrieved successfully')
  );
});

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json(
    new ApiResponse(200, { product }, 'Product updated successfully')
  );
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  await product.deleteOne();

  res.status(200).json(
    new ApiResponse(200, null, 'Product deleted successfully')
  );
});

// @desc    Get products by category
// @route   GET /api/v1/products/category/:category
// @access  Public
export const getProductsByCategory = asyncHandler(async (req, res) => {
  const apiFeatures = new ApiFeatures(
    Product.find({ 
      category: req.params.category,
      isPublished: true,
      status: 'active'
    }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await apiFeatures.query;

  res.status(200).json(
    new ApiResponse(200, { products, count: products.length }, 'Products retrieved successfully')
  );
});

// @desc    Get featured products
// @route   GET /api/v1/products/featured
// @access  Public
export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ 
    featured: true,
    isPublished: true,
    status: 'active'
  })
    .limit(10)
    .sort('-averageRating');

  res.status(200).json(
    new ApiResponse(200, { products, count: products.length }, 'Featured products retrieved successfully')
  );
});

// @desc    Get best selling products
// @route   GET /api/v1/products/best-sellers
// @access  Public
export const getBestSellingProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ 
    isPublished: true,
    status: 'active'
  })
    .sort('-totalSales')
    .limit(10);

  res.status(200).json(
    new ApiResponse(200, { products, count: products.length }, 'Best selling products retrieved successfully')
  );
});

// @desc    Update product stock
// @route   PATCH /api/v1/products/:id/stock
// @access  Private/Admin
export const updateProductStock = asyncHandler(async (req, res) => {
  const { quantity } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  await product.updateStock(quantity);

  res.status(200).json(
    new ApiResponse(200, { product }, 'Stock updated successfully')
  );
});
