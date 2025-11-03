import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { User, Cart, Wishlist } from '../models/index.js';
import jwt from 'jsonwebtoken';

// @desc    Register a new user
// @route   POST /api/v1/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  // Check if user already exists
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    throw new ApiError(400, 'User with this email already exists');
  }

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone
  });

  // Create cart and wishlist for the user
  await Cart.create({ user: user._id, items: [] });
  await Wishlist.create({ user: user._id, items: [] });

  // Generate tokens
  const { accessToken, refreshToken } = user.generateAuthTokens();
  
  // Save refresh token to user
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // Cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  };

  // Remove sensitive fields
  const userResponse = user.toObject();
  delete userResponse.password;
  delete userResponse.refreshToken;

  res
    .status(201)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        201, 
        { user: userResponse, accessToken, refreshToken }, 
        'User registered successfully'
      )
    );
});

// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Please provide email and password');
  }

  // Find user and include password
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Check if account is active
  if (!user.isActive) {
    throw new ApiError(403, 'Your account has been deactivated. Please contact support.');
  }

  // Generate tokens
  const { accessToken, refreshToken } = user.generateAuthTokens();
  
  // Save refresh token to user
  user.refreshToken = refreshToken;
  user.lastLogin = new Date();
  user.loginCount += 1;
  await user.save({ validateBeforeSave: false });

  // Cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  };

  // Remove sensitive fields
  const userResponse = user.toObject();
  delete userResponse.password;
  delete userResponse.refreshToken;

  res
    .status(200)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200, 
        { user: userResponse, accessToken, refreshToken }, 
        'Login successful'
      )
    );
});

// @desc    Logout user
// @route   POST /api/v1/users/logout
// @access  Private
export const logoutUser = asyncHandler(async (req, res) => {
  // Clear refresh token from database
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  // Cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res
    .status(200)
    .clearCookie('accessToken', cookieOptions)
    .clearCookie('refreshToken', cookieOptions)
    .json(new ApiResponse(200, {}, 'Logged out successfully'));
});

// @desc    Refresh access token
// @route   POST /api/v1/users/refresh-token
// @access  Public
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, 'Unauthorized request - No refresh token');
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
    );

    const user = await User.findById(decodedToken._id).select('+refreshToken');

    if (!user) {
      throw new ApiError(401, 'Invalid refresh token - User not found');
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, 'Refresh token is expired or invalid');
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = user.generateAuthTokens();

    // Save new refresh token
    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    // Cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    };

    res
      .status(200)
      .cookie('accessToken', accessToken, cookieOptions)
      .cookie('refreshToken', newRefreshToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          'Access token refreshed successfully'
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid refresh token');
  }
});

// @desc    Get current user
// @route   GET /api/v1/users/me
// @access  Private
export const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(200, { user: req.user }, 'Current user retrieved successfully')
  );
});

// @desc    Get all users (Admin)
// @route   GET /api/v1/users
// @access  Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');

  res.status(200).json(
    new ApiResponse(200, { users, count: users.length }, 'Users retrieved successfully')
  );
});

// @desc    Get user by ID
// @route   GET /api/v1/users/:id
// @access  Private
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json(
    new ApiResponse(200, { user }, 'User retrieved successfully')
  );
});

// @desc    Update user profile
// @route   PUT /api/v1/users/:id
// @access  Private
export const updateUser = asyncHandler(async (req, res) => {
  const { password, role, ...updateData } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Update user fields
  Object.assign(user, updateData);
  await user.save();

  res.status(200).json(
    new ApiResponse(200, { user }, 'User updated successfully')
  );
});

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  await user.deleteOne();

  // Also delete associated cart and wishlist
  await Cart.deleteOne({ user: req.params.id });
  await Wishlist.deleteOne({ user: req.params.id });

  res.status(200).json(
    new ApiResponse(200, null, 'User deleted successfully')
  );
});

// @desc    Add address
// @route   POST /api/v1/users/:id/addresses
// @access  Private
export const addAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // If this is the first address or marked as default, set it as default
  if (user.addresses.length === 0 || req.body.isDefault) {
    user.addresses.forEach(addr => addr.isDefault = false);
    req.body.isDefault = true;
  }

  user.addresses.push(req.body);
  await user.save();

  res.status(200).json(
    new ApiResponse(200, { user }, 'Address added successfully')
  );
});

// @desc    Update address
// @route   PUT /api/v1/users/:id/addresses/:addressId
// @access  Private
export const updateAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const address = user.addresses.id(req.params.addressId);

  if (!address) {
    throw new ApiError(404, 'Address not found');
  }

  // If setting as default, unset others
  if (req.body.isDefault) {
    user.addresses.forEach(addr => addr.isDefault = false);
  }

  Object.assign(address, req.body);
  await user.save();

  res.status(200).json(
    new ApiResponse(200, { user }, 'Address updated successfully')
  );
});

// @desc    Delete address
// @route   DELETE /api/v1/users/:id/addresses/:addressId
// @access  Private
export const deleteAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.addresses.id(req.params.addressId).deleteOne();
  await user.save();

  res.status(200).json(
    new ApiResponse(200, { user }, 'Address deleted successfully')
  );
});

// @desc    Change password
// @route   PUT /api/v1/users/:id/change-password
// @access  Private
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.params.id).select('+password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Verify current password
  const isPasswordCorrect = await user.comparePassword(currentPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(401, 'Current password is incorrect');
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.status(200).json(
    new ApiResponse(200, null, 'Password changed successfully')
  );
});
