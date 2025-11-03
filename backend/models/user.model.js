import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  // Basic Information
  firstName: {
    type: String,
    // required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    // required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password by default in queries
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  
  // User Role
  role: {
    type: String,
    enum: ['customer', 'admin', 'seller'],
    default: 'customer'
  },
  
  // Profile Information
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say']
  },
  
  // Addresses
  addresses: [{
    addressType: {
      type: String,
      enum: ['home', 'work', 'other'],
      default: 'home'
    },
    fullName: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    addressLine1: {
      type: String,
      required: true
    },
    addressLine2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true,
      default: 'India'
    },
    zipCode: {
      type: String,
      required: true
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  }],
  
  // Shopping Cart
  cart: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity cannot be less than 1'],
      default: 1
    },
    size: {
      type: String
    },
    color: {
      type: String
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Wishlist
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  
  // Orders
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  
  // Payment Methods
  savedPaymentMethods: [{
    type: {
      type: String,
      enum: ['card', 'upi', 'netbanking']
    },
    lastFourDigits: String,
    cardholderName: String,
    expiryDate: String,
    isDefault: {
      type: Boolean,
      default: false
    }
  }],
  
  // Account Status
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isPhoneVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Security
  refreshToken: {
    type: String,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  emailVerificationToken: String,
  emailVerificationExpire: Date,
  
  // Preferences
  preferences: {
    newsletter: {
      type: Boolean,
      default: true
    },
    orderUpdates: {
      type: Boolean,
      default: true
    },
    promotions: {
      type: Boolean,
      default: true
    },
    language: {
      type: String,
      default: 'en'
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  
  // Analytics
  lastLogin: {
    type: Date
  },
  loginCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.password;
      delete ret.resetPasswordToken;
      delete ret.resetPasswordExpire;
      delete ret.emailVerificationToken;
      delete ret.emailVerificationExpire;
      delete ret.__v;
      return ret;
    }
  },
  toObject: { 
    virtuals: true 
  }
});

// Indexes for better query performance (email already has unique index)
userSchema.index({ role: 1, isActive: 1 });
userSchema.index({ 'addresses.zipCode': 1 });
userSchema.index({ createdAt: -1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Generate Access Token (JWT)
userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
      firstName: this.firstName,
      lastName: this.lastName
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRY || '1d'
    }
  );
};

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d'
    }
  );
};

// Generate both tokens
userSchema.methods.generateAuthTokens = function() {
  const accessToken = this.generateAccessToken();
  const refreshToken = this.generateRefreshToken();
  
  return { accessToken, refreshToken };
};

// Method to generate password reset token
userSchema.methods.generatePasswordResetToken = function() {
  const resetToken = Math.random().toString(36).substring(2, 15) + 
                     Math.random().toString(36).substring(2, 15);
  
  this.resetPasswordToken = require('crypto')
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

// Static method to find user by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Method to add item to cart
userSchema.methods.addToCart = function(productId, quantity = 1, options = {}) {
  const existingItemIndex = this.cart.findIndex(
    item => item.product.toString() === productId.toString() &&
            item.size === options.size &&
            item.color === options.color
  );
  
  if (existingItemIndex > -1) {
    this.cart[existingItemIndex].quantity += quantity;
  } else {
    this.cart.push({
      product: productId,
      quantity,
      size: options.size,
      color: options.color
    });
  }
  
  return this.save();
};

// Method to remove item from cart
userSchema.methods.removeFromCart = function(productId) {
  this.cart = this.cart.filter(item => item.product.toString() !== productId.toString());
  return this.save();
};

// Method to clear cart
userSchema.methods.clearCart = function() {
  this.cart = [];
  return this.save();
};

const User = mongoose.model('User', userSchema);

export default User;
