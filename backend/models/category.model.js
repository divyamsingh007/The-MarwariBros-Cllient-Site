import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
    maxlength: [100, 'Category name cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  
  // Hierarchy
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  level: {
    type: Number,
    default: 0
  },
  
  // Display
  image: {
    type: String
  },
  icon: {
    type: String
  },
  color: {
    type: String,
    default: '#000000'
  },
  
  // SEO
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  seoTitle: {
    type: String,
    maxlength: [70, 'SEO title cannot exceed 70 characters']
  },
  seoDescription: {
    type: String,
    maxlength: [160, 'SEO description cannot exceed 160 characters']
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  
  // Ordering
  sortOrder: {
    type: Number,
    default: 0
  },
  
  // Product Count
  productCount: {
    type: Number,
    default: 0
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

// Indexes (slug already has unique index in schema)
categorySchema.index({ parent: 1, sortOrder: 1 });
categorySchema.index({ isActive: 1, isFeatured: 1 });

// Generate slug before saving and set level
categorySchema.pre('save', async function(next) {
  try {
    // Generate slug
    if (this.isModified('name') && !this.slug) {
      let baseSlug = this.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      // Ensure unique slug
      let slug = baseSlug;
      let counter = 1;
      
      while (await this.constructor.findOne({ slug, _id: { $ne: this._id } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      
      this.slug = slug;
    }
    
    // Set level based on parent
    if (this.isModified('parent')) {
      if (this.parent) {
        const parentCategory = await this.constructor.findById(this.parent);
        this.level = parentCategory ? parentCategory.level + 1 : 0;
      } else {
        this.level = 0;
      }
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Method to get all subcategories
categorySchema.methods.getSubcategories = function() {
  return this.model('Category').find({ parent: this._id });
};

// Virtual for full path
categorySchema.virtual('fullPath').get(async function() {
  let path = [this.name];
  let current = this;
  
  while (current.parent) {
    current = await this.model('Category').findById(current.parent);
    if (current) {
      path.unshift(current.name);
    }
  }
  
  return path.join(' > ');
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
