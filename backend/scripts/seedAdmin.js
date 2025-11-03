import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/index.js';
import connectMongoDB from '../config/mongoDB.js';

dotenv.config();

const adminUsers = [
  {
    firstName: 'Sanket',
    lastName: 'Singh',
    email: 'sanketsinghsameer@proton.me',
    password: '@1234Asdf',
    phone: '9999999999'
  },
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@admin.com',
    password: '12345678',
    phone: '8888888888'
  }
];

const seedAdminUser = async () => {
  try {
    // Connect to MongoDB
    await connectMongoDB();
    
    console.log('🌱 Seeding admin users...\n');
    
    let createdCount = 0;
    let existingCount = 0;
    
    for (const adminData of adminUsers) {
      // Check if admin already exists
      const existingAdmin = await User.findOne({ email: adminData.email });
      
      if (existingAdmin) {
        console.log(`⚠️  Admin user already exists: ${adminData.email}`);
        existingCount++;
        continue;
      }
      
      // Create admin user
      const adminUser = await User.create({
        firstName: adminData.firstName,
        lastName: adminData.lastName,
        email: adminData.email,
        password: adminData.password,
        phone: adminData.phone,
        role: 'admin',
        isEmailVerified: true,
        isPhoneVerified: true,
        isActive: true,
        addresses: [{
          addressType: 'work',
          fullName: `${adminData.firstName} ${adminData.lastName}`,
          phone: adminData.phone,
          addressLine1: 'MarwariBros Headquarters',
          addressLine2: 'Admin Office',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          zipCode: '400001',
          isDefault: true
        }],
        preferences: {
          newsletter: true,
          orderUpdates: true,
          promotions: true,
          language: 'en',
          currency: 'INR'
        }
      });
      
      console.log(`✅ Admin user created: ${adminUser.email}`);
      createdCount++;
    }
    
    console.log('\n═══════════════════════════════════════════');
    console.log('📋 ADMIN CREDENTIALS');
    console.log('═══════════════════════════════════════════');
    console.log('Admin 1:');
    console.log('  📧 Email    : sanketsinghsameer@proton.me');
    console.log('  🔒 Password : @1234Asdf');
    console.log('');
    console.log('Admin 2:');
    console.log('  � Email    : admin@admin.com');
    console.log('  🔒 Password : 12345678');
    console.log('═══════════════════════════════════════════\n');
    console.log(`� Summary: ${createdCount} created, ${existingCount} already existed\n`);
    console.log('🚀 You can now login with these credentials\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin users:', error.message);
    process.exit(1);
  }
};

// Run the seed function
seedAdminUser();
