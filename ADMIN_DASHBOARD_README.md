# Admin Dashboard - MarwariBros E-commerce

## Overview

A modern, responsive admin dashboard for managing the MarwariBros e-commerce website. Built with React, React Router, Chart.js, and Tailwind CSS.

## Features

### ✅ Dashboard Overview

- Real-time statistics (Total Orders, Revenue, Active Customers, Top Category)
- Interactive charts (Sales performance line chart, Category breakdown pie chart)
- Recent orders table

### ✅ Analytics & Insights

- Traffic metrics and conversion rate
- Traffic by channel (Bar chart)
- Sales by category (Bar chart)
- Top selling items table

### ✅ Collections Management

- Separate pages for each category:
  - Men Collection
  - Women Collection
  - Jewellery Collection
  - Juttis & Footwear Collection
- Features per collection:
  - Search functionality
  - Stock filter (All / In Stock / Out of Stock)
  - Product table with images, prices, stock status, tags
  - Add/Edit/Delete products
  - Modal form for product management

### ✅ Orders Management

- Order statistics (Pending, Processing, Shipped, Delivered)
- Orders table with customer info, products, status
- Status indicators with icons

### ✅ Customer Feedback & Reviews

- Review statistics (Total reviews, Average rating, Pending approval, 5-star reviews)
- Reviews table with ratings, comments, approval status
- Approve/Delete functionality

### ✅ Settings

- General settings (Site name, Admin email, Language)
- Notification preferences
- Security settings (Password change, 2FA)

## Design Features

### 🎨 UI/UX

- Clean, modern, professional design
- Consistent color scheme matching main site (#001238 navy blue, #c5a46d gold)
- Soft shadows and rounded corners
- Smooth hover effects and transitions
- Intuitive icons from react-icons
- Breadcrumb navigation

### 📱 Responsive Design

- Fully responsive across all devices
- Mobile-friendly sidebar with toggle menu
- Collapsible navigation on tablets/mobile
- Responsive grid layouts
- Touch-friendly buttons and controls

## File Structure

```
frontend/src/pages/admin/
├── AdminLayout.jsx      # Main layout with sidebar and header
├── Dashboard.jsx        # Dashboard overview with charts
├── Analytics.jsx        # Analytics and insights page
├── CollectionsPage.jsx  # Generic collection management page
├── ProductsTable.jsx    # Reusable products table component
├── ProductModal.jsx     # Add/Edit product modal form
├── Orders.jsx           # Orders management page
├── Reviews.jsx          # Customer reviews page
├── Settings.jsx         # Settings page
└── admin.css           # Admin dashboard styles
```

## Routes

- `/admin` - Dashboard Overview
- `/admin/analytics` - Analytics & Insights
- `/admin/men` - Men Collection
- `/admin/women` - Women Collection
- `/admin/jewellery` - Jewellery Collection
- `/admin/juttis-footwear` - Juttis & Footwear Collection
- `/admin/orders` - Orders Management
- `/admin/reviews` - Customer Feedback
- `/admin/settings` - Settings

## Technologies Used

- **React** - UI framework
- **React Router** - Navigation and routing
- **Chart.js** - Data visualization
- **react-chartjs-2** - React wrapper for Chart.js
- **react-icons** - Icon library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server

## Getting Started

### Installation

```bash
cd frontend
npm install
```

### Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5174/` (or next available port).

### Access Admin Dashboard

Navigate to `http://localhost:5174/admin` or click "Admin" in the main navigation menu.

## Features Implementation

### Mock Data

Currently uses mock/dummy data for demonstration. In production:

- Replace mock data with API calls
- Implement authentication/authorization
- Add backend integration for CRUD operations
- Implement image upload functionality
- Add real-time data updates

### Future Enhancements

- Backend API integration
- User authentication and role-based access
- Real image upload with cloud storage
- Export data to CSV/PDF
- Advanced filtering and sorting
- Batch operations
- Email notifications
- Activity logs
- Dark mode toggle

## Notes

- All data is currently stored in component state (client-side only)
- Product images use placeholder URLs from Unsplash
- Form validation is implemented for product management
- Responsive design tested on desktop, tablet, and mobile viewports
- No backend dependencies - fully functional frontend demo
