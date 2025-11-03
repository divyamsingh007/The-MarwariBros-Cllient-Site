# E-Commerce Backend API

Complete backend API for a full-featured e-commerce website built with Node.js, Express, and MongoDB.

## 🚀 Features

### Core Functionality
- ✅ **User Management** - Registration, login, profile management
- ✅ **Product Catalog** - CRUD operations, search, filters, categories
- ✅ **Shopping Cart** - Add/remove items, coupon support
- ✅ **Wishlist** - Save favorite products
- ✅ **Order Management** - Complete order lifecycle
- ✅ **Reviews & Ratings** - Product reviews with moderation
- ✅ **Coupons** - Discount codes and validation
- ✅ **Categories** - Hierarchical category structure
- ✅ **Notifications** - User notification system

### Technical Features
- ✅ RESTful API design
- ✅ MongoDB with Mongoose ODM
- ✅ Advanced query features (filtering, sorting, pagination)
- ✅ Error handling middleware
- ✅ Data validation
- ✅ Password hashing with bcrypt
- ✅ Standardized API responses
- ✅ Compound indexes for performance
- ✅ Virtual fields and methods

## 📁 Project Structure

```
backend/
├── app.js                      # Main application file
├── package.json                # Dependencies
├── API_DOCUMENTATION.md        # API documentation
├── config/
│   └── mongoDB.js             # MongoDB connection
├── controllers/
│   ├── user.controller.js     # User business logic
│   ├── product.controller.js  # Product business logic
│   ├── order.controller.js    # Order business logic
│   ├── cart.controller.js     # Cart business logic
│   ├── wishlist.controller.js # Wishlist business logic
│   ├── review.controller.js   # Review business logic
│   ├── category.controller.js # Category business logic
│   ├── coupon.controller.js   # Coupon business logic
│   └── notification.controller.js
├── models/
│   ├── user.model.js          # User schema
│   ├── product.model.js       # Product schema
│   ├── order.model.js         # Order schema
│   ├── cart.model.js          # Cart schema
│   ├── wishlist.model.js      # Wishlist schema
│   ├── review.model.js        # Review schema
│   ├── category.model.js      # Category schema
│   ├── coupon.model.js        # Coupon schema
│   ├── notification.model.js  # Notification schema
│   └── index.js               # Model exports
├── routes/
│   ├── user.routes.js         # User routes
│   ├── product.routes.js      # Product routes
│   ├── order.routes.js        # Order routes
│   ├── cart.routes.js         # Cart routes
│   ├── wishlist.routes.js     # Wishlist routes
│   ├── review.routes.js       # Review routes
│   ├── category.routes.js     # Category routes
│   ├── coupon.routes.js       # Coupon routes
│   ├── notification.routes.js # Notification routes
│   └── index.js               # Route exports
└── utils/
    ├── asyncHandler.js        # Async error handler
    ├── ApiError.js            # Custom error class
    ├── ApiResponse.js         # Standardized response
    ├── ApiFeatures.js         # Query features
    └── errorHandler.js        # Error middleware
```

## 🛠️ Installation

1. **Install dependencies**
```bash
npm install
```

2. **Environment Variables**
Create a `.env` file in the backend directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecommerce
NODE_ENV=development
```

3. **Start the server**
```bash
# Development mode
npm run dev

# Production mode
node app.js
```

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

### Available Routes

#### Users (`/users`)
- POST `/users/register` - Register user
- POST `/users/login` - Login user
- GET `/users` - Get all users
- GET `/users/:id` - Get user by ID
- PUT `/users/:id` - Update user
- DELETE `/users/:id` - Delete user
- POST `/users/:id/addresses` - Add address
- PUT `/users/:id/change-password` - Change password

#### Products (`/products`)
- POST `/products` - Create product
- GET `/products` - Get all products (with filters)
- GET `/products/:id` - Get product by ID
- GET `/products/slug/:slug` - Get product by slug
- PUT `/products/:id` - Update product
- DELETE `/products/:id` - Delete product
- GET `/products/featured` - Get featured products
- GET `/products/best-sellers` - Get best sellers

#### Orders (`/orders`)
- POST `/orders` - Create order
- GET `/orders` - Get all orders
- GET `/orders/:id` - Get order by ID
- GET `/orders/user/:userId` - Get user orders
- PUT `/orders/:id/status` - Update order status
- PUT `/orders/:id/cancel` - Cancel order
- GET `/orders/stats` - Get statistics

#### Cart (`/cart`)
- GET `/cart/:userId` - Get cart
- POST `/cart/:userId/items` - Add to cart
- PUT `/cart/:userId/items/:itemId` - Update quantity
- DELETE `/cart/:userId/items/:itemId` - Remove item
- POST `/cart/:userId/coupon` - Apply coupon

#### Wishlist (`/wishlist`)
- GET `/wishlist/:userId` - Get wishlist
- POST `/wishlist/:userId/items` - Add to wishlist
- DELETE `/wishlist/:userId/items/:productId` - Remove item

#### Reviews (`/reviews`)
- POST `/reviews` - Create review
- GET `/reviews/product/:productId` - Get product reviews
- PUT `/reviews/:id/approve` - Approve review (Admin)
- POST `/reviews/:id/helpful` - Mark helpful

#### Categories (`/categories`)
- POST `/categories` - Create category
- GET `/categories` - Get all categories
- GET `/categories/:id` - Get category
- GET `/categories/featured` - Get featured

#### Coupons (`/coupons`)
- POST `/coupons` - Create coupon
- GET `/coupons/active` - Get active coupons
- POST `/coupons/validate` - Validate coupon
- GET `/coupons/:id/stats` - Get stats

#### Notifications (`/notifications`)
- POST `/notifications` - Create notification
- GET `/notifications/user/:userId` - Get user notifications
- PUT `/notifications/:id/read` - Mark as read

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete details.

## 🔍 Query Features

### Search
```
GET /api/v1/products?keyword=shirt
```

### Filtering
```
GET /api/v1/products?category=men&price[gte]=500&price[lte]=2000
```

### Sorting
```
GET /api/v1/products?sort=-price,name
```

### Pagination
```
GET /api/v1/products?page=2&limit=12
```

### Field Limiting
```
GET /api/v1/products?fields=name,price,images
```

## 📊 Database Models

### User Model
- Personal info, addresses, cart, wishlist, orders
- Password hashing, email verification
- Role-based access (customer, admin, seller)

### Product Model
- Details, pricing, inventory, variants
- SEO fields, images, reviews
- Categories, tags, related products

### Order Model
- Items, addresses, payment, shipping
- Status tracking, order history
- Cancellation, returns

### Review Model
- Rating, comment, images
- Verification, moderation
- Helpfulness voting

### Cart Model
- Items with variants
- Coupon support
- Auto-cleanup

### Category Model
- Hierarchical structure
- Parent-child relationships
- Featured categories

### Coupon Model
- Discount types (%, fixed, free shipping)
- Usage limits, date ranges
- User restrictions

## 🛡️ Error Handling

All errors follow a standardized format:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error message",
  "errors": []
}
```

## 📝 Response Format

Success responses:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success message",
  "data": { /* response data */ }
}
```

## 🚦 Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## 🔐 Security Features

- ✅ Password hashing with bcrypt
- ✅ Input validation
- ✅ Error sanitization
- ✅ MongoDB injection prevention
- ✅ CORS enabled

## 🎯 Best Practices

- ✅ Async/await with error handling
- ✅ DRY principles
- ✅ Separation of concerns (MVC)
- ✅ Standardized responses
- ✅ Proper HTTP status codes
- ✅ Database indexing
- ✅ Virtual fields for computed data
- ✅ Mongoose middleware (pre/post hooks)

## 📦 Dependencies

```json
{
  "bcrypt": "^6.0.0",
  "cors": "^2.8.5",
  "dotenv": "^17.2.2",
  "express": "^5.1.0",
  "mongoose": "^8.18.2"
}
```

## 🚀 Deployment

1. Set environment variables on your hosting platform
2. Ensure MongoDB is accessible
3. Update CORS settings for your domain
4. Set NODE_ENV to 'production'
5. Deploy using your preferred method (Heroku, AWS, DigitalOcean, etc.)

## 📄 License

ISC

## 👨‍💻 Author

Your Name

---

**Happy Coding! 🎉**
