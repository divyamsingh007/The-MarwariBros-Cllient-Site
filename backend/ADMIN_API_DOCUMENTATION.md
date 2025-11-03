# Admin Dashboard API Documentation

## Admin Routes - `/api/v1/admin`

Complete API documentation for the MarwariBros Admin Dashboard backend.

## 🔐 Authentication

All admin routes require:
- User must be logged in
- User role must be `admin`

**Note:** Authentication middleware needs to be implemented and added to routes.

---

## 📊 Dashboard & Analytics

### Get Dashboard Statistics
Get overview statistics for the admin dashboard.

**Endpoint:** `GET /api/v1/admin/dashboard`

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Dashboard statistics retrieved successfully",
  "data": {
    "stats": {
      "totalOrders": 156,
      "totalRevenue": 234500,
      "activeCustomers": 89,
      "topCategory": "women"
    },
    "salesPerformance": [
      {
        "_id": "2025-10-25",
        "sales": 45600,
        "orders": 12
      }
    ],
    "categoryBreakdown": [
      {
        "_id": "women",
        "total": 125000,
        "quantity": 85
      }
    ],
    "recentOrders": [...]
  }
}
```

### Get Analytics Data
Get detailed analytics including traffic and sales data.

**Endpoint:** `GET /api/v1/admin/analytics`

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "data": {
    "trafficMetrics": {
      "totalVisits": 1250,
      "completedOrders": 89,
      "conversionRate": "7.12"
    },
    "trafficByChannel": [...],
    "salesByCategory": [...],
    "topSellingItems": [...]
  }
}
```

---

## 🛍️ Orders Management

### Get All Orders (Admin)
Get all orders with filtering options.

**Endpoint:** `GET /api/v1/admin/orders`

**Query Parameters:**
- `status` - Filter by order status (pending, processing, shipped, delivered, cancelled)
- `paymentStatus` - Filter by payment status (pending, paid, failed, refunded)
- `startDate` - Filter orders from date (ISO format)
- `endDate` - Filter orders until date (ISO format)

**Example:**
```
GET /api/v1/admin/orders?status=pending&paymentStatus=paid
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "data": {
    "orders": [...],
    "orderStats": {
      "pending": 12,
      "processing": 8,
      "shipped": 15,
      "delivered": 89,
      "cancelled": 5
    },
    "count": 129
  }
}
```

---

## ⭐ Reviews Management

### Get All Reviews (Admin)
Get all reviews with filtering and statistics.

**Endpoint:** `GET /api/v1/admin/reviews`

**Query Parameters:**
- `status` - Filter by review status (pending, approved, rejected, flagged)

**Example:**
```
GET /api/v1/admin/reviews?status=pending
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "data": {
    "reviews": [...],
    "reviewStats": {
      "total": 245,
      "pending": 12,
      "approved": 220,
      "rejected": 13,
      "fiveStarReviews": 98,
      "averageRating": "4.3"
    },
    "count": 245
  }
}
```

---

## 📦 Collections Management

### Get Products by Collection/Category
Get products for a specific collection with filters.

**Endpoint:** `GET /api/v1/admin/collections/:category`

**Path Parameters:**
- `category` - Category name (men, women, jewellery, juttis-footwear, etc.)

**Query Parameters:**
- `stockFilter` - Filter by stock (all, in-stock, out-of-stock)
- `search` - Search by product name, description, or tags

**Examples:**
```
GET /api/v1/admin/collections/men
GET /api/v1/admin/collections/women?stockFilter=in-stock
GET /api/v1/admin/collections/jewellery?search=kundan
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "data": {
    "products": [...],
    "count": 24,
    "category": "men"
  }
}
```

---

## 👥 Customer Management

### Get All Customers
Get all customers with statistics.

**Endpoint:** `GET /api/v1/admin/customers`

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "data": {
    "customers": [...],
    "customerStats": {
      "total": 156,
      "active": 142,
      "inactive": 14,
      "emailVerified": 138
    },
    "count": 156
  }
}
```

---

## ⚙️ Settings

### Update Site Settings
Update site-wide settings.

**Endpoint:** `PUT /api/v1/admin/settings`

**Request Body:**
```json
{
  "siteName": "MarwariBros",
  "adminEmail": "admin@marwaribros.com",
  "language": "en",
  "currency": "INR",
  "notifications": {
    "orderNotifications": true,
    "reviewNotifications": true,
    "lowStockAlerts": true
  },
  "security": {
    "twoFactorAuth": false
  }
}
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Settings updated successfully",
  "data": {
    "settings": {...}
  }
}
```

---

## 📊 Inventory Management

### Get Inventory Alerts
Get low stock and out of stock products.

**Endpoint:** `GET /api/v1/admin/inventory/alerts`

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "data": {
    "lowStockProducts": [...],
    "outOfStockProducts": [...],
    "lowStockCount": 8,
    "outOfStockCount": 3
  }
}
```

---

## 🔄 Bulk Operations

### Bulk Update Products
Update multiple products at once.

**Endpoint:** `PUT /api/v1/admin/products/bulk-update`

**Request Body:**
```json
{
  "productIds": [
    "product_id_1",
    "product_id_2",
    "product_id_3"
  ],
  "updates": {
    "status": "active",
    "isPublished": true,
    "featured": true
  }
}
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Products updated successfully",
  "data": {
    "modifiedCount": 3
  }
}
```

---

## 📤 Data Export

### Export Data
Export orders, customers, or products data.

**Endpoint:** `GET /api/v1/admin/export/:type`

**Path Parameters:**
- `type` - Data type to export (orders, customers, products)

**Query Parameters:**
- `startDate` - Export data from date (ISO format)
- `endDate` - Export data until date (ISO format)

**Examples:**
```
GET /api/v1/admin/export/orders
GET /api/v1/admin/export/customers?startDate=2025-01-01&endDate=2025-12-31
GET /api/v1/admin/export/products
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "orders data exported successfully",
  "data": {
    "data": [...],
    "count": 156,
    "exportType": "orders"
  }
}
```

---

## 🔧 Admin User Setup

### Create Admin User

Run the seed script to create an admin user:

```bash
npm run seed:admin
```

**Default Admin Credentials:**
- **Email:** admin@marwaribros.com
- **Password:** Admin@123
- **Role:** admin

⚠️ **Important:** Change the password after first login!

---

## 📊 Seed Sample Data

### Seed Database with Sample Data

Run the seed script to populate the database:

```bash
# Seed only admin user
npm run seed:admin

# Seed sample products and categories
npm run seed:data

# Seed everything (admin + data)
npm run seed:all
```

This will create:
- ✅ Admin user
- ✅ 4 Categories (Men, Women, Jewellery, Juttis & Footwear)
- ✅ 8 Sample products

---

## 🎯 Route Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/dashboard` | Dashboard statistics |
| GET | `/admin/analytics` | Analytics data |
| GET | `/admin/orders` | All orders with filters |
| GET | `/admin/reviews` | All reviews with stats |
| GET | `/admin/collections/:category` | Products by collection |
| GET | `/admin/customers` | All customers |
| PUT | `/admin/settings` | Update settings |
| GET | `/admin/inventory/alerts` | Inventory alerts |
| PUT | `/admin/products/bulk-update` | Bulk update products |
| GET | `/admin/export/:type` | Export data |

---

## 🔒 Security Notes

1. **Authentication Required:** Add authentication middleware to all admin routes
2. **Role Check:** Verify user has admin role
3. **Rate Limiting:** Implement rate limiting for admin routes
4. **Audit Logs:** Log all admin actions
5. **Password Security:** Use strong passwords and enable 2FA

---

## 📝 Testing Admin Routes

### Using cURL

**Dashboard Stats:**
```bash
curl http://localhost:8080/api/v1/admin/dashboard
```

**Get Orders:**
```bash
curl "http://localhost:8080/api/v1/admin/orders?status=pending"
```

**Get Collection Products:**
```bash
curl http://localhost:8080/api/v1/admin/collections/men
```

**Bulk Update Products:**
```bash
curl -X PUT http://localhost:8080/api/v1/admin/products/bulk-update \
  -H "Content-Type: application/json" \
  -d '{
    "productIds": ["id1", "id2"],
    "updates": {"status": "active"}
  }'
```

---

## 🎨 Frontend Integration

The admin routes are designed to work seamlessly with the React admin dashboard located at:
- `frontend/src/pages/admin/`

### Integration Steps:

1. **Use fetch/axios** to call admin endpoints
2. **Handle authentication** with JWT tokens
3. **Display data** in admin components
4. **Implement real-time updates** using WebSockets (optional)

### Example Frontend Integration:

```javascript
// Get dashboard stats
const fetchDashboardStats = async () => {
  const response = await fetch('http://localhost:8080/api/v1/admin/dashboard');
  const data = await response.json();
  return data.data;
};

// Get orders
const fetchOrders = async (status) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/admin/orders?status=${status}`
  );
  const data = await response.json();
  return data.data;
};
```

---

## 🚀 Next Steps

1. ✅ Admin routes created
2. ✅ Admin user seed script ready
3. ✅ Sample data seed script ready
4. ⏳ Add authentication middleware
5. ⏳ Connect frontend to backend
6. ⏳ Implement real-time updates
7. ⏳ Add file upload for product images
8. ⏳ Implement audit logging

---

**Happy Managing! 🎉**
