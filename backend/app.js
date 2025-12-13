import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectMongoDB from "./config/mongoDB.js";
import errorHandler from "./utils/errorHandler.js";
import ApiError from "./utils/ApiError.js";

// Import routes
import {
  userRoutes,
  productRoutes,
  orderRoutes,
  cartRoutes,
  reviewRoutes,
  categoryRoutes,
  couponRoutes,
  notificationRoutes,
  adminRoutes,
} from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api", (req, res) => {
  res.json({ message: "API is working!" });
});

// API v1 Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/coupons", couponRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/admin", adminRoutes);

// 404 Handler
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// Error Handler Middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  connectMongoDB();
  console.log(`Server is running on port ${PORT}`);
  console.log(`API v1 available at http://localhost:${PORT}/api/v1`);
});
