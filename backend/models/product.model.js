import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [200, "Product name cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    shortDescription: {
      type: String,
      maxlength: [500, "Short description cannot exceed 500 characters"],
    },

    // Pricing
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    compareAtPrice: {
      type: Number,
      min: [0, "Compare at price cannot be negative"],
    },
    costPerItem: {
      type: Number,
      min: [0, "Cost cannot be negative"],
    },

    // Category & Classification
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: [
        "men",
        "women",
        "kids",
        "jewelry",
        "footwear",
        "home-decor",
        "other",
      ],
    },
    subCategory: {
      type: String,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // Images
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
        },
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // Inventory
    sku: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    barcode: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 10,
    },
    trackInventory: {
      type: Boolean,
      default: true,
    },

    // Variants (Size, Color, etc.)
    variants: [
      {
        size: {
          type: String,
        },
        color: {
          type: String,
        },
        price: {
          type: Number,
        },
        stock: {
          type: Number,
          default: 0,
        },
        sku: {
          type: String,
        },
        image: {
          type: String,
        },
      },
    ],

    // Shipping
    weight: {
      type: Number, // in kg
      min: [0, "Weight cannot be negative"],
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: {
        type: String,
        enum: ["cm", "in"],
        default: "cm",
      },
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },

    // SEO
    seoTitle: {
      type: String,
      maxlength: [70, "SEO title cannot exceed 70 characters"],
    },
    seoDescription: {
      type: String,
      maxlength: [160, "SEO description cannot exceed 160 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Status & Visibility
    status: {
      type: String,
      enum: ["draft", "active", "archived"],
      default: "draft",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },

    // Reviews & Rating
    averageRating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be more than 5"],
    },
    totalReviews: {
      type: Number,
      default: 0,
    },

    // Sales & Analytics
    totalSales: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },

    // Additional Details
    brand: {
      type: String,
      trim: true,
    },
    manufacturer: {
      type: String,
      trim: true,
    },
    material: {
      type: String,
    },
    careInstructions: {
      type: String,
    },

    // Vendor/Seller
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Related Products
    relatedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Indexes for better query performance
productSchema.index({ name: "text", description: "text", tags: "text" });
productSchema.index({ category: 1, subCategory: 1, status: 1 });
productSchema.index({ price: 1 });
productSchema.index({ status: 1, isPublished: 1 });
// slug already has unique index defined in schema
productSchema.index({ averageRating: -1, totalReviews: -1 });
productSchema.index({ totalSales: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ featured: 1, isPublished: 1 });

// Generate slug before saving
productSchema.pre("save", async function (next) {
  try {
    if (this.isModified("name") && !this.slug) {
      let baseSlug = this.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      // Ensure unique slug
      let slug = baseSlug;
      let counter = 1;

      while (await this.constructor.findOne({ slug, _id: { $ne: this._id } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      this.slug = slug;
    }

    // Auto-publish if status is active
    if (
      this.isModified("status") &&
      this.status === "active" &&
      !this.publishedAt
    ) {
      this.publishedAt = new Date();
      this.isPublished = true;
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Virtual for discount percentage
productSchema.virtual("discountPercentage").get(function () {
  if (this.compareAtPrice && this.compareAtPrice > this.price) {
    return Math.round(
      ((this.compareAtPrice - this.price) / this.compareAtPrice) * 100
    );
  }
  return 0;
});

// Virtual for stock status
productSchema.virtual("stockStatus").get(function () {
  if (this.stock === 0) return "out-of-stock";
  if (this.stock <= this.lowStockThreshold) return "low-stock";
  return "in-stock";
});

// Method to check if product is in stock
productSchema.methods.isInStock = function (quantity = 1) {
  return this.stock >= quantity;
};

// Method to update stock
productSchema.methods.updateStock = function (quantity) {
  this.stock += quantity;
  return this.save();
};

// Method to increment views
productSchema.methods.incrementViews = function () {
  this.views += 1;
  return this.save();
};

const Product = mongoose.model("Product", productSchema);

export default Product;
