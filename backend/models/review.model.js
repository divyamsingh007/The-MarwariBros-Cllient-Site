import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  // Review Details
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product reference is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  
  // Rating & Content
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  title: {
    type: String,
    required: [true, 'Review title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    trim: true,
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  
  // Images/Media
  images: [{
    url: {
      type: String,
      required: true
    },
    caption: {
      type: String
    }
  }],
  
  // Verification
  isVerifiedPurchase: {
    type: Boolean,
    default: false
  },
  
  // Status & Moderation
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'flagged'],
    default: 'pending'
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  
  // Helpfulness
  helpfulCount: {
    type: Number,
    default: 0
  },
  notHelpfulCount: {
    type: Number,
    default: 0
  },
  helpfulUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  // Seller Response
  sellerResponse: {
    comment: {
      type: String,
      maxlength: [500, 'Response cannot exceed 500 characters']
    },
    respondedAt: {
      type: Date
    },
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  
  // Additional Info
  pros: [{
    type: String,
    trim: true
  }],
  cons: [{
    type: String,
    trim: true
  }],
  
  // Moderation
  flaggedReason: {
    type: String
  },
  moderatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  moderatedAt: {
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
reviewSchema.index({ product: 1, user: 1 }, { unique: true });
reviewSchema.index({ product: 1, status: 1, rating: -1 });
reviewSchema.index({ user: 1, createdAt: -1 });
reviewSchema.index({ status: 1, isPublished: 1 });
reviewSchema.index({ createdAt: -1 });

// Update product average rating after save
reviewSchema.post('save', async function(doc) {
  try {
    await doc.constructor.updateProductRating(doc.product);
  } catch (error) {
    console.error('Error updating product rating:', error);
  }
});

// Update product average rating after status change
reviewSchema.post('findOneAndUpdate', async function(doc) {
  try {
    if (doc) {
      await doc.constructor.updateProductRating(doc.product);
    }
  } catch (error) {
    console.error('Error updating product rating:', error);
  }
});

// Static method to update product rating
reviewSchema.statics.updateProductRating = async function(productId) {
  const Product = mongoose.model('Product');
  
  const stats = await this.aggregate([
    { $match: { product: productId, status: 'approved', isPublished: true } },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);
  
  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      averageRating: Math.round(stats[0].averageRating * 10) / 10,
      totalReviews: stats[0].totalReviews
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      averageRating: 0,
      totalReviews: 0
    });
  }
};

// Update product rating after remove
reviewSchema.post('remove', async function(doc) {
  try {
    await doc.constructor.updateProductRating(doc.product);
  } catch (error) {
    console.error('Error updating product rating:', error);
  }
});

// Method to mark review as helpful
reviewSchema.methods.markAsHelpful = function(userId, isHelpful = true) {
  const userIndex = this.helpfulUsers.indexOf(userId);
  
  if (userIndex === -1) {
    this.helpfulUsers.push(userId);
    if (isHelpful) {
      this.helpfulCount += 1;
    } else {
      this.notHelpfulCount += 1;
    }
  }
  
  return this.save();
};

// Method to approve review
reviewSchema.methods.approve = function(moderatorId) {
  this.status = 'approved';
  this.isPublished = true;
  this.moderatedBy = moderatorId;
  this.moderatedAt = new Date();
  return this.save();
};

// Method to reject review
reviewSchema.methods.reject = function(moderatorId, reason) {
  this.status = 'rejected';
  this.isPublished = false;
  this.flaggedReason = reason;
  this.moderatedBy = moderatorId;
  this.moderatedAt = new Date();
  return this.save();
};

const Review = mongoose.model('Review', reviewSchema);

export default Review;
