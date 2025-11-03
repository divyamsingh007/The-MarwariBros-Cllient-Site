import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  // Coupon Code
  code: {
    type: String,
    required: [true, 'Coupon code is required'],
    unique: true,
    uppercase: true,
    trim: true,
    maxlength: [20, 'Coupon code cannot exceed 20 characters']
  },
  
  // Description
  description: {
    type: String,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  
  // Discount Type & Value
  discountType: {
    type: String,
    required: true,
    enum: ['percentage', 'fixed', 'free-shipping']
  },
  discountValue: {
    type: Number,
    required: [true, 'Discount value is required'],
    min: [0, 'Discount value cannot be negative']
  },
  maxDiscountAmount: {
    type: Number,
    min: [0, 'Max discount amount cannot be negative']
  },
  
  // Validity Period
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  
  // Usage Limits
  maxUsage: {
    type: Number,
    min: [1, 'Max usage must be at least 1']
  },
  maxUsagePerUser: {
    type: Number,
    default: 1,
    min: [1, 'Max usage per user must be at least 1']
  },
  currentUsage: {
    type: Number,
    default: 0
  },
  
  // Minimum Requirements
  minPurchaseAmount: {
    type: Number,
    default: 0,
    min: [0, 'Minimum purchase amount cannot be negative']
  },
  minItemCount: {
    type: Number,
    default: 0,
    min: [0, 'Minimum item count cannot be negative']
  },
  
  // Applicable To
  applicableProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  applicableCategories: [{
    type: String
  }],
  excludedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  
  // User Restrictions
  applicableUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  excludedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  firstTimeUserOnly: {
    type: Boolean,
    default: false
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  
  // Usage Tracking
  usedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    usedAt: {
      type: Date,
      default: Date.now
    },
    discountAmount: {
      type: Number
    }
  }],
  
  // Created By
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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

// Indexes (code already has unique index in schema)
couponSchema.index({ isActive: 1, startDate: 1, endDate: 1 });
couponSchema.index({ endDate: 1 });
couponSchema.index({ 'usedBy.user': 1 });

// Validate dates before saving
couponSchema.pre('save', function(next) {
  if (this.startDate >= this.endDate) {
    next(new Error('End date must be after start date'));
  }
  
  if (this.discountType === 'percentage' && this.discountValue > 100) {
    next(new Error('Percentage discount cannot exceed 100%'));
  }
  
  next();
});

// Method to check if coupon is valid
couponSchema.methods.isValid = function() {
  const now = new Date();
  
  if (!this.isActive) return false;
  if (now < this.startDate || now > this.endDate) return false;
  if (this.maxUsage && this.currentUsage >= this.maxUsage) return false;
  
  return true;
};

// Method to check if user can use coupon
couponSchema.methods.canUserUseCoupon = function(userId) {
  if (!this.isValid()) return false;
  
  // Check if user is excluded
  if (this.excludedUsers.includes(userId)) return false;
  
  // Check if coupon is restricted to specific users
  if (this.applicableUsers.length > 0 && !this.applicableUsers.includes(userId)) {
    return false;
  }
  
  // Check usage per user limit
  const userUsageCount = this.usedBy.filter(
    usage => usage.user.toString() === userId.toString()
  ).length;
  
  if (userUsageCount >= this.maxUsagePerUser) return false;
  
  return true;
};

// Method to calculate discount
couponSchema.methods.calculateDiscount = function(orderAmount) {
  if (this.discountType === 'percentage') {
    let discount = (orderAmount * this.discountValue) / 100;
    if (this.maxDiscountAmount) {
      discount = Math.min(discount, this.maxDiscountAmount);
    }
    return discount;
  } else if (this.discountType === 'fixed') {
    return Math.min(this.discountValue, orderAmount);
  } else if (this.discountType === 'free-shipping') {
    return 0; // Handled separately in shipping calculation
  }
  return 0;
};

// Method to use coupon
couponSchema.methods.useCoupon = function(userId, orderId, discountAmount) {
  this.usedBy.push({
    user: userId,
    order: orderId,
    usedAt: new Date(),
    discountAmount
  });
  this.currentUsage += 1;
  return this.save();
};

// Virtual for usage percentage
couponSchema.virtual('usagePercentage').get(function() {
  if (!this.maxUsage) return 0;
  return (this.currentUsage / this.maxUsage) * 100;
});

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
