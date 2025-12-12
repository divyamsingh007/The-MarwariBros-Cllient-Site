import express from 'express';
import {
  createNotification,
  getUserNotifications,
  getNotificationById,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllUserNotifications,
  getUnreadCount
} from '../controllers/notification.controller.js';

const router = express.Router();

// Special routes
router.get('/user/:userId', getUserNotifications);
router.get('/user/:userId/unread-count', getUnreadCount);
router.put('/user/:userId/read-all', markAllAsRead);
router.delete('/user/:userId', deleteAllUserNotifications);

// CRUD routes
router.post('/', createNotification);
router.get('/:id', getNotificationById);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteNotification);

export default router;
