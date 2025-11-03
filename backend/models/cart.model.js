import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  // User Reference
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // Cart Items
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
      default: 1
    },
    price: {
      type: Number,
      required: true
    },
    size: {
      type: String
    },
    color: {
      type: String
    },
    variant: {
      type: String
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Coupon Applied
  couponCode: {
    type: String,
    uppercase: true
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative']
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Session Info
  sessionId: {
    type: String
  },
  expiresAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  },
  toObject: { 
    virtuals: true 
  }
});

// Indexes (user already has unique index in schema)
cartSchema.index({ sessionId: 1 }, { sparse: true });
cartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0, sparse: true });
cartSchema.index({ 'items.product': 1 });

// Virtual for total items
cartSchema.virtual('totalItems').get(function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Virtual for subtotal
cartSchema.virtual('subtotal').get(function() {
  return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
});

// Virtual for total
cartSchema.virtual('total').get(function() {
  return this.subtotal - this.discount;
});

// Validate cart before saving
cartSchema.pre('save', async function(next) {
  try {
    // Remove duplicate items (same product, size, color)
    const uniqueItems = [];
    const seen = new Set();
    
    for (const item of this.items) {
      const key = `${item.product}-${item.size || ''}-${item.color || ''}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueItems.push(item);
      }
    }
    
    this.items = uniqueItems;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to add item to cart
cartSchema.methods.addItem = async function(productId, quantity = 1, options = {}) {
  const Product = mongoose.model('Product');
  const product = await Product.findById(productId);
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  if (!product.isInStock(quantity)) {
    throw new Error('Insufficient stock');
  }
  
  // Check if item already exists with same options
  const existingItemIndex = this.items.findIndex(item =>
    item.product.toString() === productId.toString() &&
    item.size === options.size &&
    item.color === options.color
  );
  
  if (existingItemIndex > -1) {
    // Update quantity if item exists
    this.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    this.items.push({
      product: productId,
      quantity,
      price: product.price,
      size: options.size,
      color: options.color,
      variant: options.variant
    });
  }
  
  return this.save();
};

// Method to update item quantity
cartSchema.methods.updateItemQuantity = function(itemId, quantity) {
  const item = this.items.id(itemId);
  
  if (!item) {
    throw new Error('Item not found in cart');
  }
  
  if (quantity <= 0) {
    item.remove();
  } else {
    item.quantity = quantity;
  }
  
  return this.save();
};

// Method to remove item
cartSchema.methods.removeItem = function(itemId) {
  this.items.id(itemId).remove();
  return this.save();
};

// Method to clear cart
cartSchema.methods.clearCart = function() {
  this.items = [];
  this.couponCode = undefined;
  this.discount = 0;
  return this.save();
};

// Method to apply coupon
cartSchema.methods.applyCoupon = async function(couponCode) {
  const Coupon = mongoose.model('Coupon');
  const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() });
  
  if (!coupon || !coupon.isValid()) {
    throw new Error('Invalid or expired coupon');
  }
  
  if (!coupon.canUserUseCoupon(this.user)) {
    throw new Error('You cannot use this coupon');
  }
  
  const subtotal = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  if (subtotal < coupon.minPurchaseAmount) {
    throw new Error(`Minimum purchase amount of ₹${coupon.minPurchaseAmount} required`);
  }
  
  this.couponCode = couponCode.toUpperCase();
  this.discount = coupon.calculateDiscount(subtotal);
  
  return this.save();
};

// Method to remove coupon
cartSchema.methods.removeCoupon = function() {
  this.couponCode = undefined;
  this.discount = 0;
  return this.save();
};

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
