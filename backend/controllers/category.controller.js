import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { Category, Product } from '../models/index.js';

// @desc    Create category
// @route   POST /api/v1/categories
// @access  Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);

  res.status(201).json(
    new ApiResponse(201, { category }, 'Category created successfully')
  );
});

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true })
    .populate('parent', 'name slug')
    .sort('sortOrder');

  res.status(200).json(
    new ApiResponse(200, { categories, count: categories.length }, 'Categories retrieved successfully')
  );
});

// @desc    Get category by ID
// @route   GET /api/v1/categories/:id
// @access  Public
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)
    .populate('parent', 'name slug');

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  res.status(200).json(
    new ApiResponse(200, { category }, 'Category retrieved successfully')
  );
});

// @desc    Get category by slug
// @route   GET /api/v1/categories/slug/:slug
// @access  Public
export const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug })
    .populate('parent', 'name slug');

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  res.status(200).json(
    new ApiResponse(200, { category }, 'Category retrieved successfully')
  );
});

// @desc    Update category
// @route   PUT /api/v1/categories/:id
// @access  Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json(
    new ApiResponse(200, { category }, 'Category updated successfully')
  );
});

// @desc    Delete category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  // Check if category has subcategories
  const subcategories = await Category.find({ parent: req.params.id });
  
  if (subcategories.length > 0) {
    throw new ApiError(400, 'Cannot delete category with subcategories');
  }

  await category.deleteOne();

  res.status(200).json(
    new ApiResponse(200, null, 'Category deleted successfully')
  );
});

// @desc    Get category subcategories
// @route   GET /api/v1/categories/:id/subcategories
// @access  Public
export const getSubcategories = asyncHandler(async (req, res) => {
  const subcategories = await Category.find({ 
    parent: req.params.id,
    isActive: true
  }).sort('sortOrder');

  res.status(200).json(
    new ApiResponse(200, { subcategories, count: subcategories.length }, 'Subcategories retrieved successfully')
  );
});

// @desc    Get featured categories
// @route   GET /api/v1/categories/featured
// @access  Public
export const getFeaturedCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ 
    isFeatured: true,
    isActive: true
  })
    .sort('sortOrder')
    .limit(10);

  res.status(200).json(
    new ApiResponse(200, { categories, count: categories.length }, 'Featured categories retrieved successfully')
  );
});
