import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  // Order Identification
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  
  // Customer Information
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Order Items
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    size: {
      type: String
    },
    color: {
      type: String
    },
    sku: {
      type: String
    }
  }],
  
  // Shipping Address
  shippingAddress: {
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
    }
  },
  
  // Billing Address
  billingAddress: {
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
    }
  },
  
  // Pricing
  subtotal: {
    type: Number,
    required: true,
    min: [0, 'Subtotal cannot be negative']
  },
  tax: {
    type: Number,
    default: 0,
    min: [0, 'Tax cannot be negative']
  },
  shippingFee: {
    type: Number,
    default: 0,
    min: [0, 'Shipping fee cannot be negative']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative']
  },
  total: {
    type: Number,
    required: true,
    min: [0, 'Total cannot be negative']
  },
  
  // Payment Information
  paymentMethod: {
    type: String,
    required: true,
    enum: ['cod', 'card', 'upi', 'netbanking', 'wallet']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded', 'partially-refunded'],
    default: 'pending'
  },
  paymentId: {
    type: String
  },
  paidAt: {
    type: Date
  },
  
  // Order Status
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'pending'
  },
  
  // Shipping Information
  shippingMethod: {
    type: String,
    enum: ['standard', 'express', 'overnight'],
    default: 'standard'
  },
  trackingNumber: {
    type: String
  },
  carrier: {
    type: String
  },
  shippedAt: {
    type: Date
  },
  deliveredAt: {
    type: Date
  },
  expectedDeliveryDate: {
    type: Date
  },
  
  // Coupon/Discount
  couponCode: {
    type: String,
    uppercase: true
  },
  
  // Order Notes
  customerNotes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  internalNotes: {
    type: String,
    maxlength: [1000, 'Internal notes cannot exceed 1000 characters']
  },
  
  // Status History
  statusHistory: [{
    status: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    note: {
      type: String
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  
  // Cancellation/Return
  cancellationReason: {
    type: String
  },
  cancelledAt: {
    type: Date
  },
  returnReason: {
    type: String
  },
  returnedAt: {
    type: Date
  },
  refundAmount: {
    type: Number,
    min: [0, 'Refund amount cannot be negative']
  },
  refundedAt: {
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

// Compound indexes for better query performance
// orderNumber already has unique index from pre-save hook
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderStatus: 1, paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'shippingAddress.zipCode': 1 });
orderSchema.index({ trackingNumber: 1 }, { sparse: true });

// Generate order number before saving
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.orderNumber = `ORD-${timestamp}-${random}`;
  }
  next();
});

// Method to add status history
orderSchema.methods.updateStatus = function(status, note, updatedBy) {
  this.orderStatus = status;
  this.statusHistory.push({
    status,
    timestamp: new Date(),
    note,
    updatedBy
  });
  
  // Update specific date fields based on status
  if (status === 'shipped') {
    this.shippedAt = new Date();
  } else if (status === 'delivered') {
    this.deliveredAt = new Date();
  } else if (status === 'cancelled') {
    this.cancelledAt = new Date();
  }
  
  return this.save();
};

// Method to mark as paid
orderSchema.methods.markAsPaid = function(paymentId) {
  this.paymentStatus = 'paid';
  this.paymentId = paymentId;
  this.paidAt = new Date();
  return this.save();
};

// Virtual for order age in days
orderSchema.virtual('orderAge').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
