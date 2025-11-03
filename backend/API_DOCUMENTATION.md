# E-Commerce API Documentation

## Base URL
```
http://localhost:3000/api/v1
```

## API Endpoints

### 👤 Users API (`/api/v1/users`)

#### Authentication
- **POST** `/users/register` - Register new user
- **POST** `/users/login` - Login user

#### User Management
- **GET** `/users` - Get all users (Admin)
- **GET** `/users/:id` - Get user by ID
- **PUT** `/users/:id` - Update user profile
- **DELETE** `/users/:id` - Delete user (Admin)

#### Address Management
- **POST** `/users/:id/addresses` - Add new address
- **PUT** `/users/:id/addresses/:addressId` - Update address
- **DELETE** `/users/:id/addresses/:addressId` - Delete address

#### Password Management
- **PUT** `/users/:id/change-password` - Change password

---

### 📦 Products API (`/api/v1/products`)

#### Product CRUD
- **POST** `/products` - Create product (Admin)
- **GET** `/products` - Get all products (with filters, search, pagination)
- **GET** `/products/:id` - Get product by ID
- **GET** `/products/slug/:slug` - Get product by slug
- **PUT** `/products/:id` - Update product (Admin)
- **DELETE** `/products/:id` - Delete product (Admin)

#### Special Queries
- **GET** `/products/admin` - Get all products including drafts (Admin)
- **GET** `/products/featured` - Get featured products
- **GET** `/products/best-sellers` - Get best selling products
- **GET** `/products/category/:category` - Get products by category

#### Stock Management
- **PATCH** `/products/:id/stock` - Update product stock

**Query Parameters for GET /products:**
- `keyword` - Search by name/description
- `category` - Filter by category
- `price[gte]` - Minimum price
- `price[lte]` - Maximum price
- `rating[gte]` - Minimum rating
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `sort` - Sort by field (e.g., `-price`, `name`)
- `fields` - Select specific fields

---

### 🛍️ Orders API (`/api/v1/orders`)

#### Order CRUD
- **POST** `/orders` - Create new order
- **GET** `/orders` - Get all orders (Admin)
- **GET** `/orders/:id` - Get order by ID
- **DELETE** `/orders/:id` - Delete order (Admin)

#### Order Management
- **GET** `/orders/user/:userId` - Get user's orders
- **PUT** `/orders/:id/status` - Update order status
- **PUT** `/orders/:id/payment` - Update payment status
- **PUT** `/orders/:id/cancel` - Cancel order

#### Statistics
- **GET** `/orders/stats` - Get order statistics (Admin)

---

### 🛒 Cart API (`/api/v1/cart`)

- **GET** `/cart/:userId` - Get user's cart
- **POST** `/cart/:userId/items` - Add item to cart
- **PUT** `/cart/:userId/items/:itemId` - Update cart item quantity
- **DELETE** `/cart/:userId/items/:itemId` - Remove item from cart
- **DELETE** `/cart/:userId` - Clear cart

#### Coupon Management
- **POST** `/cart/:userId/coupon` - Apply coupon to cart
- **DELETE** `/cart/:userId/coupon` - Remove coupon from cart

---

### ❤️ Wishlist API (`/api/v1/wishlist`)

- **GET** `/wishlist/:userId` - Get user's wishlist
- **POST** `/wishlist/:userId/items` - Add item to wishlist
- **DELETE** `/wishlist/:userId/items/:productId` - Remove item from wishlist
- **DELETE** `/wishlist/:userId` - Clear wishlist
- **GET** `/wishlist/:userId/check/:productId` - Check if product in wishlist

---

### ⭐ Reviews API (`/api/v1/reviews`)

#### Review CRUD
- **POST** `/reviews` - Create review
- **GET** `/reviews/product/:productId` - Get product reviews
- **GET** `/reviews/:id` - Get review by ID
- **PUT** `/reviews/:id` - Update review
- **DELETE** `/reviews/:id` - Delete review

#### Review Moderation (Admin)
- **PUT** `/reviews/:id/approve` - Approve review
- **PUT** `/reviews/:id/reject` - Reject review
- **POST** `/reviews/:id/response` - Add seller response

#### User Interaction
- **POST** `/reviews/:id/helpful` - Mark review as helpful

---

### 📂 Categories API (`/api/v1/categories`)

- **POST** `/categories` - Create category (Admin)
- **GET** `/categories` - Get all categories
- **GET** `/categories/:id` - Get category by ID
- **GET** `/categories/slug/:slug` - Get category by slug
- **PUT** `/categories/:id` - Update category (Admin)
- **DELETE** `/categories/:id` - Delete category (Admin)

#### Special Queries
- **GET** `/categories/featured` - Get featured categories
- **GET** `/categories/:id/subcategories` - Get category's subcategories

---

### 🎟️ Coupons API (`/api/v1/coupons`)

#### Coupon CRUD
- **POST** `/coupons` - Create coupon (Admin)
- **GET** `/coupons` - Get all coupons (Admin)
- **PUT** `/coupons/:id` - Update coupon (Admin)
- **DELETE** `/coupons/:id` - Delete coupon (Admin)

#### Public Routes
- **GET** `/coupons/active` - Get active public coupons
- **GET** `/coupons/code/:code` - Get coupon by code
- **POST** `/coupons/validate` - Validate coupon

#### Statistics
- **GET** `/coupons/:id/stats` - Get coupon usage stats

---

### 🔔 Notifications API (`/api/v1/notifications`)

- **POST** `/notifications` - Create notification (Admin)
- **GET** `/notifications/user/:userId` - Get user notifications
- **GET** `/notifications/:id` - Get notification by ID
- **PUT** `/notifications/:id/read` - Mark notification as read
- **DELETE** `/notifications/:id` - Delete notification

#### Bulk Operations
- **GET** `/notifications/user/:userId/unread-count` - Get unread count
- **PUT** `/notifications/user/:userId/read-all` - Mark all as read
- **DELETE** `/notifications/user/:userId` - Delete all user notifications

---

## Request/Response Examples

### Register User
```json
POST /api/v1/users/register
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890"
}
```

### Create Product
```json
POST /api/v1/products
{
  "name": "Cotton T-Shirt",
  "description": "Premium quality cotton t-shirt",
  "price": 499,
  "category": "men",
  "stock": 100,
  "images": [
    {
      "url": "https://example.com/image.jpg",
      "isPrimary": true
    }
  ]
}
```

### Create Order
```json
POST /api/v1/orders
{
  "userId": "userId123",
  "items": [
    {
      "product": "productId123",
      "quantity": 2,
      "size": "M"
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "phone": "1234567890",
    "addressLine1": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001"
  },
  "billingAddress": { /* same as shipping */ },
  "paymentMethod": "card"
}
```

### Apply Coupon to Cart
```json
POST /api/v1/cart/:userId/coupon
{
  "couponCode": "SAVE20"
}
```

### Create Review
```json
POST /api/v1/reviews
{
  "product": "productId123",
  "user": "userId123",
  "rating": 5,
  "title": "Excellent Product!",
  "comment": "Great quality and fast delivery"
}
```

## Response Format

### Success Response
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Success message",
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "statusCode": 400,
  "success": false,
  "message": "Error message",
  "errors": []
}
```

## Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Features
✅ RESTful API design
✅ Advanced filtering & search
✅ Pagination support
✅ Error handling
✅ Input validation
✅ Standardized responses
✅ Virtual fields
✅ Populate references
✅ Sorting & field limiting
