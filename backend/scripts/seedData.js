import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Product, Category, User } from '../models/index.js';
import connectMongoDB from '../config/mongoDB.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from the backend root directory
dotenv.config({ path: join(__dirname, '..', '.env') });

const categories = [
  {
    name: 'Men',
    description: 'Clothing and accessories for men',
    slug: 'men',
    isActive: true,
    isFeatured: true,
    sortOrder: 1
  },
  {
    name: 'Women',
    description: 'Clothing and accessories for women',
    slug: 'women',
    isActive: true,
    isFeatured: true,
    sortOrder: 2
  },
  {
    name: 'Jewellery',
    description: 'Traditional and modern jewellery',
    slug: 'jewellery',
    isActive: true,
    isFeatured: true,
    sortOrder: 3
  },
  {
    name: 'Juttis & Footwear',
    description: 'Traditional and modern footwear',
    slug: 'juttis-footwear',
    isActive: true,
    isFeatured: true,
    sortOrder: 4
  }
];

const sampleProducts = [
  // Men's Products
  {
    name: 'Classic Kurta Set',
    slug: 'classic-kurta-set',
    description: 'Traditional cotton kurta set perfect for festive occasions',
    shortDescription: 'Premium cotton kurta',
    price: 2499,
    compareAtPrice: 3499,
    category: 'men',
    tags: ['kurta', 'traditional', 'festive'],
    images: [
      { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a', isPrimary: true }
    ],
    stock: 50,
    status: 'active',
    isPublished: true,
    featured: true
  },
  {
    name: 'Embroidered Sherwani',
    slug: 'embroidered-sherwani',
    description: 'Luxurious embroidered sherwani for special occasions',
    shortDescription: 'Designer sherwani',
    price: 8999,
    compareAtPrice: 12999,
    category: 'men',
    tags: ['sherwani', 'wedding', 'luxury'],
    images: [
      { url: 'https://images.unsplash.com/photo-1606522721767-e0bc0e1586a0', isPrimary: true }
    ],
    stock: 20,
    status: 'active',
    isPublished: true,
    featured: true
  },
  
  // Women's Products
  {
    name: 'Silk Saree',
    slug: 'silk-saree',
    description: 'Beautiful silk saree with traditional border work',
    shortDescription: 'Pure silk saree',
    price: 5999,
    compareAtPrice: 7999,
    category: 'women',
    tags: ['saree', 'silk', 'traditional'],
    images: [
      { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c', isPrimary: true }
    ],
    stock: 30,
    status: 'active',
    isPublished: true,
    featured: true
  },
  {
    name: 'Designer Lehenga',
    slug: 'designer-lehenga',
    description: 'Stunning designer lehenga for wedding and celebrations',
    shortDescription: 'Bridal lehenga',
    price: 15999,
    compareAtPrice: 21999,
    category: 'women',
    tags: ['lehenga', 'bridal', 'designer'],
    images: [
      { url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8', isPrimary: true }
    ],
    stock: 15,
    status: 'active',
    isPublished: true,
    featured: true
  },
  
  // Jewellery
  {
    name: 'Kundan Necklace Set',
    slug: 'kundan-necklace-set',
    description: 'Traditional Kundan necklace with earrings',
    shortDescription: 'Kundan jewellery set',
    price: 3999,
    compareAtPrice: 5499,
    category: 'accessories',
    subCategory: 'jewellery',
    tags: ['necklace', 'kundan', 'traditional'],
    images: [
      { url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338', isPrimary: true }
    ],
    stock: 40,
    status: 'active',
    isPublished: true,
    featured: true
  },
  {
    name: 'Polki Earrings',
    slug: 'polki-earrings',
    description: 'Exquisite polki earrings with traditional design',
    shortDescription: 'Polki earrings',
    price: 2499,
    compareAtPrice: 3299,
    category: 'accessories',
    subCategory: 'jewellery',
    tags: ['earrings', 'polki', 'traditional'],
    images: [
      { url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908', isPrimary: true }
    ],
    stock: 60,
    status: 'active',
    isPublished: true
  },
  
  // Footwear
  {
    name: 'Embroidered Juttis',
    slug: 'embroidered-juttis',
    description: 'Handcrafted embroidered juttis for women',
    shortDescription: 'Designer juttis',
    price: 1299,
    compareAtPrice: 1799,
    category: 'footwear',
    subCategory: 'juttis',
    tags: ['juttis', 'footwear', 'handcrafted'],
    images: [
      { url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2', isPrimary: true }
    ],
    stock: 80,
    status: 'active',
    isPublished: true,
    featured: true
  },
  {
    name: 'Leather Mojari',
    slug: 'leather-mojari',
    description: 'Premium leather mojari for men',
    shortDescription: 'Leather mojari',
    price: 1599,
    compareAtPrice: 2199,
    category: 'footwear',
    subCategory: 'mojari',
    tags: ['mojari', 'leather', 'traditional'],
    images: [
      { url: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2', isPrimary: true }
    ],
    stock: 45,
    status: 'active',
    isPublished: true
  }
];

const seedDatabase = async () => {
  try {
    await connectMongoDB();
    
    console.log('🌱 Seeding database...\n');
    
    // Clear existing data
    console.log('🗑️  Clearing existing products and categories...');
    await Product.deleteMany({});
    await Category.deleteMany({});
    
    // Seed categories
    console.log('📂 Creating categories...');
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${createdCategories.length} categories\n`);
    
    // Seed products
    console.log('📦 Creating sample products...');
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Created ${createdProducts.length} products\n`);
    
    console.log('═══════════════════════════════════════════');
    console.log('✨ Database seeded successfully!');
    console.log('═══════════════════════════════════════════');
    console.log(`📂 Categories: ${createdCategories.length}`);
    console.log(`📦 Products: ${createdProducts.length}`);
    console.log('═══════════════════════════════════════════\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
