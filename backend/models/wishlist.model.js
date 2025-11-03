import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  // User Reference
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // Wishlist Items
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    priority: {
      type: Number,
      default: 0
    },
    notes: {
      type: String,
      maxlength: [200, 'Notes cannot exceed 200 characters']
    }
  }],
  
  // Wishlist Name (for multiple wishlists feature)
  name: {
    type: String,
    default: 'My Wishlist',
    maxlength: [50, 'Wishlist name cannot exceed 50 characters']
  },
  
  // Privacy
  isPublic: {
    type: Boolean,
    default: false
  },
  
  // Share Settings
  shareToken: {
    type: String,
    unique: true,
    sparse: true
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

// Indexes (user and shareToken already have unique indexes in schema)
wishlistSchema.index({ 'items.product': 1 });

// Virtual for total items
wishlistSchema.virtual('totalItems').get(function() {
  return this.items.length;
});

// Method to add item to wishlist
wishlistSchema.methods.addItem = function(productId, options = {}) {
  // Check if item already exists
  const existingItem = this.items.find(item =>
    item.product.toString() === productId.toString()
  );
  
  if (existingItem) {
    throw new Error('Product already in wishlist');
  }
  
  this.items.push({
    product: productId,
    priority: options.priority || 0,
    notes: options.notes
  });
  
  return this.save();
};

// Method to remove item from wishlist
wishlistSchema.methods.removeItem = function(productId) {
  this.items = this.items.filter(item =>
    item.product.toString() !== productId.toString()
  );
  return this.save();
};

// Method to check if product is in wishlist
wishlistSchema.methods.hasProduct = function(productId) {
  return this.items.some(item =>
    item.product.toString() === productId.toString()
  );
};

// Method to clear wishlist
wishlistSchema.methods.clearWishlist = function() {
  this.items = [];
  return this.save();
};

// Method to generate share token
wishlistSchema.methods.generateShareToken = function() {
  if (!this.shareToken) {
    this.shareToken = Math.random().toString(36).substring(2, 15) +
                     Math.random().toString(36).substring(2, 15);
  }
  return this.save();
};

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
