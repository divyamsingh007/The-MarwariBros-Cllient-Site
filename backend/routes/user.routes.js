import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addAddress,
  updateAddress,
  deleteAddress,
  changePassword
} from '../controllers/user.controller.js';
import { verifyJWT, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshAccessToken);

// Protected Auth routes
router.post('/logout', verifyJWT, logoutUser);
router.get('/me', verifyJWT, getCurrentUser);

// User CRUD routes
router.get('/', verifyJWT, isAdmin, getAllUsers);
router.get('/:id', verifyJWT, getUserById);
router.put('/:id', verifyJWT, updateUser);
router.delete('/:id', verifyJWT, isAdmin, deleteUser);

// Address management
router.post('/:id/addresses', verifyJWT, addAddress);
router.put('/:id/addresses/:addressId', verifyJWT, updateAddress);
router.delete('/:id/addresses/:addressId', verifyJWT, deleteAddress);

// Password management
router.put('/:id/change-password', verifyJWT, changePassword);

export default router;
