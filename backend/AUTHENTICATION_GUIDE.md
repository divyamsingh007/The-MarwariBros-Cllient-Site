# Authentication & Authorization Guide

## 🔐 Overview

MarwariBros E-commerce backend uses **JWT (JSON Web Tokens)** for authentication with both access and refresh tokens.

## 📋 Table of Contents

1. [Environment Setup](#environment-setup)
2. [Authentication Flow](#authentication-flow)
3. [API Endpoints](#api-endpoints)
4. [Middleware Usage](#middleware-usage)
5. [Frontend Integration](#frontend-integration)
6. [Security Best Practices](#security-best-practices)

---

## 🔧 Environment Setup

Add these variables to your `.env` file:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-change-this
JWT_ACCESS_EXPIRY=1d
JWT_REFRESH_EXPIRY=7d
CORS_ORIGIN=http://localhost:5173
```

**Important:** Use strong, random strings for JWT secrets in production!

---

## 🔄 Authentication Flow

### 1. **Register/Login**
- User registers or logs in
- Server generates **access token** (short-lived, 1 day) and **refresh token** (long-lived, 7 days)
- Tokens are sent in:
  - HTTP-only cookies (secure)
  - Response body (for mobile/non-browser clients)

### 2. **Making Authenticated Requests**
- Client sends access token in:
  - Cookie (automatically)
  - OR Authorization header: `Bearer <token>`
- Middleware verifies token and attaches user to `req.user`

### 3. **Token Refresh**
- When access token expires, use refresh token to get new tokens
- Refresh token is rotated (old one invalidated, new one issued)

### 4. **Logout**
- Refresh token removed from database
- Cookies cleared
- Client discards tokens

---

## 🌐 API Endpoints

### Authentication Endpoints

#### Register User
```http
POST /api/v1/users/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "phone": "9876543210"
}
```

**Response:**
```json
{
  "statusCode": 201,
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "...",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "customer"
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

#### Login User
```http
POST /api/v1/users/login
Content-Type: application/json

{
  "email": "sanketsinghsameer@proton.me",
  "password": "@1234Asdf"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "...",
      "firstName": "Sanket",
      "role": "admin",
      "email": "sanketsinghsameer@proton.me"
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

#### Logout User
```http
POST /api/v1/users/logout
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Logged out successfully",
  "data": {}
}
```

#### Refresh Access Token
```http
POST /api/v1/users/refresh-token
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Access token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

#### Get Current User
```http
GET /api/v1/users/me
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Current user retrieved successfully",
  "data": {
    "user": {
      "_id": "...",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "customer",
      "isEmailVerified": false,
      "isActive": true
    }
  }
}
```

---

## 🛡️ Middleware Usage

### Available Middleware

1. **`verifyJWT`** - Verify user is authenticated
2. **`isAdmin`** - Verify user has admin role
3. **`isSellerOrAdmin`** - Verify user is seller or admin
4. **`verifyRoles(...roles)`** - Verify user has specific roles
5. **`optionalAuth`** - Optional authentication (doesn't fail if no token)
6. **`verifyEmail`** - Verify email is verified
7. **`isOwner(field)`** - Verify user owns the resource

### Usage Examples

#### Protect a Route (Require Login)
```javascript
import { verifyJWT } from '../middlewares/auth.middleware.js';

router.get('/profile', verifyJWT, getUserProfile);
```

#### Protect Admin-Only Route
```javascript
import { verifyJWT, isAdmin } from '../middlewares/auth.middleware.js';

router.get('/admin/dashboard', verifyJWT, isAdmin, getDashboard);

// Or protect all routes in a router
router.use(verifyJWT, isAdmin);
router.get('/dashboard', getDashboard);
router.get('/users', getAllUsers);
```

#### Verify Specific Roles
```javascript
import { verifyJWT, verifyRoles } from '../middlewares/auth.middleware.js';

router.put('/products/:id', 
  verifyJWT, 
  verifyRoles('admin', 'seller'), 
  updateProduct
);
```

#### Optional Authentication
```javascript
import { optionalAuth } from '../middlewares/auth.middleware.js';

// Works with or without login (e.g., personalized homepage)
router.get('/products', optionalAuth, getProducts);
```

#### Verify Resource Ownership
```javascript
import { verifyJWT, isOwner } from '../middlewares/auth.middleware.js';

router.put('/orders/:id', verifyJWT, isOwner('userId'), updateOrder);
```

### Accessing Authenticated User

In your controller, access the authenticated user via `req.user`:

```javascript
export const getProfile = async (req, res) => {
  const user = req.user; // Available after verifyJWT middleware
  
  console.log(user._id);        // User ID
  console.log(user.email);      // User email
  console.log(user.role);       // User role (customer, admin, seller)
  console.log(user.firstName);  // User first name
  
  // ... rest of your logic
};
```

---

## 💻 Frontend Integration

### Using Axios

```javascript
import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  withCredentials: true // Important: Send cookies
});

// Login
const login = async (email, password) => {
  try {
    const response = await api.post('/users/login', { email, password });
    const { accessToken, refreshToken } = response.data.data;
    
    // Store tokens (optional - cookies are already set)
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response.data);
    throw error;
  }
};

// Make authenticated request
const getProfile = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await api.get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Profile error:', error);
    throw error;
  }
};

// Auto-refresh token on 401 error
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await api.post('/users/refresh-token', { refreshToken });
        
        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Redirect to login
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Logout
const logout = async () => {
  try {
    await api.post('/users/logout');
    localStorage.clear();
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout error:', error);
  }
};
```

### Using Fetch

```javascript
// Login
const login = async (email, password) => {
  const response = await fetch('http://localhost:8080/api/v1/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Important: Include cookies
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  
  if (data.success) {
    localStorage.setItem('accessToken', data.data.accessToken);
    return data;
  }
  throw new Error(data.message);
};

// Make authenticated request
const getProfile = async () => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('http://localhost:8080/api/v1/users/me', {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    credentials: 'include'
  });
  
  return response.json();
};
```

---

## 🔒 Security Best Practices

### 1. **Token Storage**
- ✅ **Cookies (Recommended)**: HTTP-only, secure, SameSite
- ✅ **Memory**: In React state (lost on refresh)
- ⚠️ **localStorage**: Vulnerable to XSS attacks (use with caution)
- ❌ **sessionStorage**: Same as localStorage

### 2. **Password Requirements**
Current minimum: 6 characters

**Recommended for production:**
```javascript
// In user.model.js
password: {
  type: String,
  required: true,
  minlength: [8, 'Password must be at least 8 characters'],
  validate: {
    validator: function(v) {
      // At least one uppercase, lowercase, number, special char
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(v);
    },
    message: 'Password must contain uppercase, lowercase, number, and special character'
  }
}
```

### 3. **CORS Configuration**
```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 4. **Rate Limiting** (Recommended)
Install: `npm install express-rate-limit`

```javascript
import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests
  message: 'Too many login attempts, please try again later'
});

router.post('/login', authLimiter, loginUser);
```

### 5. **Environment Variables**
- Never commit `.env` to version control
- Use different secrets for dev/staging/production
- Rotate secrets periodically

### 6. **HTTPS in Production**
- Always use HTTPS in production
- Set `secure: true` for cookies

---

## 🧪 Testing Authentication

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:8080/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "Test1234",
    "phone": "9876543210"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/v1/users/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "sanketsinghsameer@proton.me",
    "password": "@1234Asdf"
  }'
```

**Get Profile (with cookie):**
```bash
curl -X GET http://localhost:8080/api/v1/users/me \
  -b cookies.txt
```

**Get Profile (with Authorization header):**
```bash
curl -X GET http://localhost:8080/api/v1/users/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🎯 Quick Reference

### User Roles
- `customer` - Regular user (default)
- `seller` - Can manage their products
- `admin` - Full access

### Token Expiry
- **Access Token**: 1 day (customize in .env)
- **Refresh Token**: 7 days (customize in .env)

### Admin Credentials
- **Email**: `sanketsinghsameer@proton.me` | `admin@admin.com`
- **Password**: `@1234Asdf` | `12345678`

### Protected Routes Example
```javascript
// Public routes
POST /api/v1/users/register
POST /api/v1/users/login
POST /api/v1/users/refresh-token

// Protected routes (require login)
GET  /api/v1/users/me
POST /api/v1/users/logout
GET  /api/v1/orders
POST /api/v1/cart/add

// Admin-only routes
GET  /api/v1/admin/dashboard
GET  /api/v1/admin/customers
PUT  /api/v1/admin/settings
```

---

**Happy Coding! 🚀**
