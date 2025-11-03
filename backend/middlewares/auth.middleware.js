import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import  ApiError  from '../utils/ApiError.js';
import  asyncHandler  from '../utils/asyncHandler.js';

/**
 * Verify JWT token and authenticate user
 */
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const token = req.cookies?.accessToken || 
                  req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Unauthorized request - No token provided');
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Find user (excluding password and refreshToken)
    const user = await User.findById(decodedToken._id).select('-password -refreshToken');

    if (!user) {
      throw new ApiError(401, 'Invalid access token - User not found');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new ApiError(403, 'Your account has been deactivated. Please contact support.');
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new ApiError(401, 'Invalid access token');
    }
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Access token has expired');
    }
    throw error;
  }
});

/**
 * Verify user roles
 * @param  {...string} roles - Allowed roles (e.g., 'admin', 'seller', 'customer')
 */
export const verifyRoles = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized request - Please login first');
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403, 
        `Access denied. Required role: ${roles.join(' or ')}. Your role: ${req.user.role}`
      );
    }

    next();
  });
};

/**
 * Verify if user is admin
 */
export const isAdmin = verifyRoles('admin');

/**
 * Verify if user is seller or admin
 */
export const isSellerOrAdmin = verifyRoles('seller', 'admin');

/**
 * Optional authentication - doesn't fail if no token
 * Useful for routes that work with or without authentication
 */
export const optionalAuth = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || 
                  req.header('Authorization')?.replace('Bearer ', '');

    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decodedToken._id).select('-password -refreshToken');
      
      if (user && user.isActive) {
        req.user = user;
      }
    }
  } catch (error) {
    // Silently fail - user will be undefined
  }
  
  next();
});

/**
 * Verify email is verified
 */
export const verifyEmail = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, 'Unauthorized request');
  }

  if (!req.user.isEmailVerified) {
    throw new ApiError(403, 'Please verify your email address to continue');
  }

  next();
});

/**
 * Check if user owns the resource
 * Resource ID should be in req.params or req.body
 */
export const isOwner = (resourceField = 'userId') => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized request');
    }

    const resourceUserId = req.params[resourceField] || 
                          req.body[resourceField] || 
                          req.params.id;

    // Admin can access any resource
    if (req.user.role === 'admin') {
      return next();
    }

    // Check if user owns the resource
    if (resourceUserId && resourceUserId.toString() !== req.user._id.toString()) {
      throw new ApiError(403, 'You do not have permission to access this resource');
    }

    next();
  });
};
