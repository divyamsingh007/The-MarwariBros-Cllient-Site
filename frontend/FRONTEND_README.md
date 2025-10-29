# The Marwari Bros - Frontend Application

A modern e-commerce frontend built with React, Vite, and Tailwind CSS for The Marwari Bros brand. This guide is designed for backend developers who need to work on the frontend.

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Key Concepts for Backend Developers](#-key-concepts-for-backend-developers)
- [Routing System](#-routing-system)
- [Component Architecture](#-component-architecture)
- [Styling Approach](#-styling-approach)
- [API Integration](#-api-integration)
- [Environment Variables](#-environment-variables)
- [Common Tasks](#-common-tasks)
- [Troubleshooting](#-troubleshooting)

## 🛠 Tech Stack

**Core Framework:**

- **React 19.1.1** - JavaScript library for building user interfaces
- **Vite 7.1.7** - Fast build tool and development server (think of it as a modern Webpack)

**Routing:**

- **React Router DOM 7.9.3** - Client-side routing (like Express routes, but for the frontend)

**Styling:**

- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **AOS (Animate On Scroll) 2.3.4** - Animation library for scroll effects

**Data Visualization:**

- **Chart.js 4.4.0** - Charting library for admin dashboard
- **React Chart.js 2** - React wrapper for Chart.js

**Icons:**

- **React Icons 5.0.0** - Popular icon library

**Development Tools:**

- **ESLint** - Code linting (like a code quality checker)
- **Nodemon** - Not used here, but the equivalent is Vite's hot reload

## ✅ Prerequisites

Before you start, ensure you have:

- **Node.js** version 16+ (check with `node --version`)
- **npm** or **yarn** package manager
- Basic understanding of:
  - JavaScript ES6+ syntax (arrow functions, destructuring, etc.)
  - Component-based architecture
  - JSX (HTML-like syntax in JavaScript)

## 📁 Project Structure

```
frontend/
├── public/                    # Static assets (images, fonts, etc.)
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Navbar.jsx
│   │   ├── ScrollToTop.jsx
│   │   └── SecondSection.jsx
│   ├── pages/                # Page components (routes)
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Collections.jsx
│   │   └── admin/            # Admin dashboard pages
│   │       ├── AdminLayout.jsx
│   │       ├── Dashboard.jsx
│   │       ├── CollectionsPage.jsx
│   │       ├── ProductModal.jsx
│   │       ├── ProductsTable.jsx
│   │       └── Settings.jsx
│   ├── App.jsx               # Main app component with routes
│   ├── main.jsx              # Entry point (like server.js in Express)
│   ├── App.css               # App-specific styles
│   └── index.css             # Global styles
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
├── eslint.config.js          # ESLint configuration
└── package.json              # Dependencies and scripts
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
# Navigate to frontend directory
cd frontend

# Install all dependencies from package.json
npm install
```

This is equivalent to `npm install` in your backend - it installs all packages listed in `package.json`.

### 2. Start Development Server

```bash
npm run dev
```

This starts the Vite development server with:

- **Hot Module Replacement (HMR)** - Changes reflect instantly without full page reload
- **Default URL**: `http://localhost:5173`

Think of this like running `nodemon app.js` in Express - it watches for changes and auto-reloads.

### 3. Access the Application

Open your browser and navigate to:

- **Main Site**: `http://localhost:5173`
- **Admin Dashboard**: `http://localhost:5173/admin`

## 📜 Available Scripts

```bash
# Start development server (with hot reload)
npm run dev

# Build for production (creates optimized bundle)
npm run build

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint
```

**Key Differences from Backend:**

- `npm run dev` ≈ `nodemon app.js` (development mode)
- `npm run build` ≈ compiling code for production deployment
- `npm run preview` ≈ testing production build locally

## 🧠 Key Concepts for Backend Developers

### React Basics

**1. Components = Functions that Return HTML**

Think of components like route handlers in Express, but they return UI instead of JSON:

```javascript
// Backend (Express)
app.get("/products", (req, res) => {
  res.json({ products: [] });
});

// Frontend (React)
function Products() {
  return <div>Products List</div>;
}
```

**2. JSX = HTML in JavaScript**

JSX looks like HTML but is JavaScript:

```jsx
// This is JSX
const element = <h1 className="title">Hello</h1>;

// It compiles to:
const element = React.createElement("h1", { className: "title" }, "Hello");
```

**3. Props = Function Parameters**

Props pass data to components like function parameters:

```jsx
// Similar to: function getUser(userId) { }
function User({ userId, name }) {
  return <div>{name}</div>;
}

// Usage:
<User userId={1} name="John" />;
```

**4. State = In-Memory Data**

State is like variables that trigger re-renders when changed:

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0); // Like: let count = 0;

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

**5. useEffect = Lifecycle Hook**

`useEffect` runs code at specific times (similar to middleware):

```jsx
import { useEffect } from "react";

function DataFetcher() {
  useEffect(() => {
    // This runs when component mounts (like app initialization)
    fetchData();
  }, []); // Empty array = run once on mount

  return <div>Data</div>;
}
```

## 🗺 Routing System

The app uses **React Router DOM** for navigation:

### Route Structure (from `App.jsx`)

```
/                           → Home page
/about                      → About page
/collections                → Collections page
/admin                      → Admin layout (wrapper)
  ├── /admin                → Dashboard (index)
  ├── /admin/men            → Men's collection
  ├── /admin/women          → Women's collection
  ├── /admin/jewellery      → Jewellery collection
  ├── /admin/juttis-footwear → Footwear collection
  └── /admin/settings       → Settings page
```

### How Routes Work

```jsx
// Similar to Express routes:
// app.get('/', homeController)
// app.get('/about', aboutController)

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />

  {/* Nested routes (like router.use('/admin', adminRouter)) */}
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="men" element={<CollectionsPage category="Men" />} />
  </Route>
</Routes>
```

### Navigation

Use `Link` component instead of `<a>` tags to prevent page reload:

```jsx
import { Link } from 'react-router-dom';

<Link to="/admin">Go to Admin</Link>  // ✅ Good (SPA navigation)
<a href="/admin">Go to Admin</a>      // ❌ Bad (full page reload)
```

## 🏗 Component Architecture

### Component Types

**1. Page Components** (`src/pages/`)

- Top-level components for each route
- Like controllers in MVC pattern
- Example: `Home.jsx`, `Dashboard.jsx`

**2. Reusable Components** (`src/components/`)

- Shared across multiple pages
- Like utility functions
- Example: `Navbar.jsx`, `Footer.jsx`

**3. Layout Components**

- Wrapper components that provide structure
- Example: `AdminLayout.jsx` (provides admin sidebar/header)

### Component Example

```jsx
// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/collections">Collections</Link>
    </nav>
  );
}
```

## 🎨 Styling Approach

This project uses **Tailwind CSS** + **Inline Styles**:

### Tailwind CSS

Utility-first CSS framework - add classes directly to elements:

```jsx
// Instead of writing CSS files:
<div className="p-4 bg-blue-500 text-white rounded-lg">Content</div>

// Translates to:
// padding: 1rem;
// background-color: blue;
// color: white;
// border-radius: 0.5rem;
```

**Common Tailwind Classes:**

- `p-4` = padding: 1rem
- `m-4` = margin: 1rem
- `bg-blue-500` = blue background
- `text-white` = white text
- `flex` = display: flex
- `grid` = display: grid

### Inline Styles

Also uses React inline styles (JavaScript objects):

```jsx
<div
  style={{
    fontSize: "2rem",
    color: "#001238",
    marginBottom: "1rem",
  }}
>
  Title
</div>
```

**Note**: CSS properties are camelCase in React (`fontSize` not `font-size`)

## 🔌 API Integration

### Making API Calls

When you need to connect to your backend:

```jsx
import { useState, useEffect } from "react";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data when component mounts
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### POST Request Example

```jsx
async function createProduct(productData) {
  try {
    const response = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
  }
}

// Usage in component:
function AddProductForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct({ name: "New Product", price: 100 });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## 🌍 Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# API endpoint
VITE_API_URL=http://localhost:3000/api

# Other variables
VITE_APP_NAME=The Marwari Bros
```

**Important**:

- Prefix variables with `VITE_` (required by Vite)
- Access in code: `import.meta.env.VITE_API_URL`
- Restart dev server after changing `.env`

```jsx
// Usage:
const apiUrl = import.meta.env.VITE_API_URL;
fetch(`${apiUrl}/products`);
```

## 🔧 Common Tasks

### 1. Add a New Page

**Step 1:** Create component file

```jsx
// src/pages/Contact.jsx
export default function Contact() {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Contact form here...</p>
    </div>
  );
}
```

**Step 2:** Add route in `App.jsx`

```jsx
import Contact from "./pages/Contact";

// In the Routes:
<Route path="/contact" element={<Contact />} />;
```

### 2. Add a New Component

```jsx
// src/components/ProductCard.jsx
export default function ProductCard({ name, price, image }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>${price}</p>
    </div>
  );
}
```

**Usage:**

```jsx
import ProductCard from "../components/ProductCard";

<ProductCard name="Shirt" price={50} image="/shirt.jpg" />;
```

### 3. Handle Forms

```jsx
import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Call your API
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### 4. Add a New Dependency

```bash
# Install package
npm install axios

# or specific version
npm install axios@1.4.0
```

Then use it:

```jsx
import axios from "axios";

const data = await axios.get("/api/products");
```

## 🐛 Troubleshooting

### Common Issues

**1. Port Already in Use**

```bash
# Error: Port 5173 is already in use
# Solution: Kill the process or use a different port
```

**2. Module Not Found**

```bash
# Error: Cannot find module 'react'
# Solution:
npm install
```

**3. ESLint Errors**

```bash
# Run linter to see errors:
npm run lint

# Auto-fix where possible:
npm run lint -- --fix
```

**4. Build Fails**

```bash
# Clear cache and rebuild:
rm -rf node_modules
npm install
npm run build
```

**5. Changes Not Reflecting**

- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Clear browser cache
- Restart dev server

### Dev Tools

**React Developer Tools** (Browser Extension)

- Install from Chrome/Firefox store
- Inspect React components
- View props and state

## 📚 Additional Resources

### Documentation

- [React Docs](https://react.dev) - Official React documentation
- [Vite Guide](https://vitejs.dev/guide/) - Vite documentation
- [Tailwind CSS](https://tailwindcss.com/docs) - Tailwind documentation
- [React Router](https://reactrouter.com) - Routing documentation

### Learning Resources

- [React for Backend Developers](https://www.youtube.com/watch?v=Rh3tobg7hEo)
- [Modern React Course](https://react.dev/learn)

## 🤝 Working with Backend

### Typical Workflow

1. **Backend developer creates API endpoints**

   ```javascript
   // backend/routes/products.js
   router.get("/api/products", getProducts);
   router.post("/api/products", createProduct);
   ```

2. **Frontend developer consumes endpoints**
   ```jsx
   // frontend/src/pages/Products.jsx
   const response = await fetch("http://localhost:3000/api/products");
   ```

### CORS Setup

Make sure your backend has CORS enabled:

```javascript
// backend/app.js
import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:5173", // Vite dev server
  })
);
```

### Testing API Integration

Use these tools to test endpoints before integrating:

- **Postman** - API testing
- **Thunder Client** - VS Code extension
- **curl** - Command line tool

---

## 🎯 Quick Start Summary

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# http://localhost:5173

# 4. Make changes
# Edit files in src/ - changes auto-reload

# 5. Build for production
npm run build
```

---

**Need Help?**

- Check console for errors (F12 in browser)
- Review React DevTools
- Check network tab for API calls
- Read error messages carefully - they're usually helpful!

Happy coding! 🚀
