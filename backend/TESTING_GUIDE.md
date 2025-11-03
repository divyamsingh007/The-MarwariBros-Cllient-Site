# Quick Start Guide - Testing API Endpoints

## Prerequisites
- Server running on `http://localhost:3000`
- MongoDB connected

## Quick Test Commands (using curl)

### 1. Register a User
```bash
curl -X POST http://localhost:3000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890"
  }'
```

### 2. Login User
```bash
curl -X POST http://localhost:3000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Create a Product
```bash
curl -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Cotton T-Shirt",
    "description": "Premium quality cotton t-shirt",
    "shortDescription": "Comfortable cotton tee",
    "price": 499,
    "category": "men",
    "stock": 100,
    "images": [{
      "url": "https://via.placeholder.com/400",
      "isPrimary": true
    }],
    "status": "active",
    "isPublished": true
  }'
```

### 4. Get All Products
```bash
curl http://localhost:3000/api/v1/products
```

### 5. Search Products
```bash
curl "http://localhost:3000/api/v1/products?keyword=shirt&category=men&price[lte]=1000"
```

### 6. Add to Cart
```bash
curl -X POST http://localhost:3000/api/v1/cart/USER_ID/items \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "PRODUCT_ID",
    "quantity": 2,
    "size": "M"
  }'
```

### 7. Get User Cart
```bash
curl http://localhost:3000/api/v1/cart/USER_ID
```

### 8. Create Order
```bash
curl -X POST http://localhost:3000/api/v1/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID",
    "items": [{
      "product": "PRODUCT_ID",
      "quantity": 2
    }],
    "shippingAddress": {
      "fullName": "John Doe",
      "phone": "1234567890",
      "addressLine1": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "zipCode": "400001"
    },
    "billingAddress": {
      "fullName": "John Doe",
      "phone": "1234567890",
      "addressLine1": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "zipCode": "400001"
    },
    "paymentMethod": "cod"
  }'
```

### 9. Create Category
```bash
curl -X POST http://localhost:3000/api/v1/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Men",
    "description": "Men category",
    "isActive": true,
    "isFeatured": true
  }'
```

### 10. Create Coupon
```bash
curl -X POST http://localhost:3000/api/v1/coupons \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SAVE20",
    "description": "Save 20% on all orders",
    "discountType": "percentage",
    "discountValue": 20,
    "startDate": "2025-01-01",
    "endDate": "2025-12-31",
    "maxUsage": 100,
    "isActive": true,
    "isPublic": true
  }'
```

### 11. Validate Coupon
```bash
curl -X POST http://localhost:3000/api/v1/coupons/validate \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SAVE20",
    "orderAmount": 1000
  }'
```

### 12. Create Review
```bash
curl -X POST http://localhost:3000/api/v1/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "product": "PRODUCT_ID",
    "user": "USER_ID",
    "rating": 5,
    "title": "Excellent Product!",
    "comment": "Great quality and fast delivery"
  }'
```

### 13. Add to Wishlist
```bash
curl -X POST http://localhost:3000/api/v1/wishlist/USER_ID/items \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "PRODUCT_ID"
  }'
```

## Testing with Postman

### Import Collection
1. Open Postman
2. Click Import
3. Create new collection "E-Commerce API"
4. Add requests based on the endpoints above

### Environment Variables
Create environment with:
- `baseUrl`: `http://localhost:3000/api/v1`
- `userId`: (save after user registration)
- `productId`: (save after product creation)

### Test Flow
1. **Setup**
   - Register User → Save userId
   - Create Categories
   - Create Products → Save productId

2. **Shopping Flow**
   - Browse Products
   - Add to Cart
   - Apply Coupon
   - Create Order

3. **Review Flow**
   - Create Review
   - Approve Review (Admin)

4. **Admin Flow**
   - Create Products
   - Manage Orders
   - View Statistics

## Sample Data for Testing

### Sample Users
```json
[
  {
    "firstName": "Admin",
    "lastName": "User",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  },
  {
    "firstName": "Test",
    "lastName": "Customer",
    "email": "customer@example.com",
    "password": "password123"
  }
]
```

### Sample Products
```json
[
  {
    "name": "Classic White T-Shirt",
    "description": "Premium cotton t-shirt in classic white",
    "price": 499,
    "category": "men",
    "stock": 50
  },
  {
    "name": "Blue Denim Jeans",
    "description": "Comfortable stretch denim jeans",
    "price": 1499,
    "category": "men",
    "stock": 30
  },
  {
    "name": "Red Cotton Kurta",
    "description": "Traditional cotton kurta for women",
    "price": 799,
    "category": "women",
    "stock": 40
  }
]
```

### Sample Categories
```json
[
  { "name": "Men", "description": "Men's clothing" },
  { "name": "Women", "description": "Women's clothing" },
  { "name": "Kids", "description": "Kids clothing" },
  { "name": "Accessories", "description": "Fashion accessories" }
]
```

## Common Issues & Solutions

### 1. MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env file

### 2. Port Already in Use
- Change PORT in .env file
- Kill process using: `npx kill-port 3000`

### 3. Validation Errors
- Check required fields in request body
- Ensure data types match schema

### 4. 404 Not Found
- Verify route path
- Check if ID exists in database

## Useful Commands

### Start Server
```bash
npm run dev
```

### Check MongoDB Connection
```bash
mongosh
use ecommerce
db.users.find()
```

### Clear All Collections
```bash
mongosh
use ecommerce
db.dropDatabase()
```

## Next Steps

1. Test all endpoints
2. Add authentication middleware
3. Implement file upload for images
4. Add payment gateway integration
5. Set up email notifications
6. Deploy to production

---

Happy Testing! 🚀
