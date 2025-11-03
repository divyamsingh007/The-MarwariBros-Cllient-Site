import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { Notification } from '../models/index.js';

// @desc    Create notification
// @route   POST /api/v1/notifications
// @access  Private/Admin
export const createNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.create(req.body);

  res.status(201).json(
    new ApiResponse(201, { notification }, 'Notification created successfully')
  );
});

// @desc    Get user notifications
// @route   GET /api/v1/notifications/user/:userId
// @access  Private
export const getUserNotifications = asyncHandler(async (req, res) => {
  const { unreadOnly } = req.query;

  const query = { user: req.params.userId };
  if (unreadOnly === 'true') {
    query.isRead = false;
  }

  const notifications = await Notification.find(query)
    .sort('-createdAt')
    .limit(50);

  const unreadCount = await Notification.getUnreadCount(req.params.userId);

  res.status(200).json(
    new ApiResponse(200, {
      notifications,
      count: notifications.length,
      unreadCount
    }, 'Notifications retrieved successfully')
  );
});

// @desc    Get notification by ID
// @route   GET /api/v1/notifications/:id
// @access  Private
export const getNotificationById = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    throw new ApiError(404, 'Notification not found');
  }

  res.status(200).json(
    new ApiResponse(200, { notification }, 'Notification retrieved successfully')
  );
});

// @desc    Mark notification as read
// @route   PUT /api/v1/notifications/:id/read
// @access  Private
export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    throw new ApiError(404, 'Notification not found');
  }

  await notification.markAsRead();

  res.status(200).json(
    new ApiResponse(200, { notification }, 'Notification marked as read')
  );
});

// @desc    Mark all notifications as read
// @route   PUT /api/v1/notifications/user/:userId/read-all
// @access  Private
export const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.markAllAsRead(req.params.userId);

  res.status(200).json(
    new ApiResponse(200, null, 'All notifications marked as read')
  );
});

// @desc    Delete notification
// @route   DELETE /api/v1/notifications/:id
// @access  Private
export const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    throw new ApiError(404, 'Notification not found');
  }

  await notification.deleteOne();

  res.status(200).json(
    new ApiResponse(200, null, 'Notification deleted successfully')
  );
});

// @desc    Delete all user notifications
// @route   DELETE /api/v1/notifications/user/:userId
// @access  Private
export const deleteAllUserNotifications = asyncHandler(async (req, res) => {
  await Notification.deleteMany({ user: req.params.userId });

  res.status(200).json(
    new ApiResponse(200, null, 'All notifications deleted successfully')
  );
});

// @desc    Get unread count
// @route   GET /api/v1/notifications/user/:userId/unread-count
// @access  Private
export const getUnreadCount = asyncHandler(async (req, res) => {
  const unreadCount = await Notification.getUnreadCount(req.params.userId);

  res.status(200).json(
    new ApiResponse(200, { unreadCount }, 'Unread count retrieved successfully')
  );
});
