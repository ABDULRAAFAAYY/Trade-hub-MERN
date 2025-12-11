// ============================================
// TRADE HUB - Database Seeding Script
// ============================================
// This script populates the MongoDB database with all 16 products
// from the original Trade Hub website.
// Run with: npm run seed

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Import Product model
const Product = require('../models/Product');

// ============================================
// PRODUCT DATA
// ============================================
// All 16 products from the original website with full details

const products = [
    {
        name: 'Airpods Pro 2 with Touch Controls',
        shortName: 'AIRPODS PRO 2ND GENERATION WITH TOUCH SCREEN DISPLAY',
        slug: 'airpods-pro-2',
        price: 5999,
        rating: 5,
        category: 'Electronics',
        description: 'The Apple AirPods are wireless earbuds designed by Apple Inc. They offer seamless connectivity with Apple devices like iPhones. The AirPods provide high-quality audio, easy setup, and convenient features like Siri integration. When paired with an iPhone, you can enjoy features like automatic device switching, quick access to Siri, and customization options through the iPhone settings.',
        mainImage: 'airpods 2.jpeg',
        additionalImages: ['airpods 2.jpeg', 'airpodd.webp', 'airpd.jpeg', 'airpod.jpeg'],
        featured: true
    },
    {
        name: 'Adidas AEROREADY 3-STRIPES BASEBALL CAP',
        shortName: 'Adidas AEROREADY 3-STRIPES BASEBALL CAP',
        slug: 'adidas-baseball-cap',
        price: 999,
        rating: 5,
        category: 'Fashion',
        description: 'Stay cool and stylish with this Adidas AEROREADY 3-Stripes Baseball Cap. Features moisture-wicking AEROREADY technology to keep you dry and comfortable. The classic 3-stripes design adds a sporty touch to any outfit. Adjustable back closure ensures a perfect fit.',
        mainImage: 'addidas cap.jpeg',
        additionalImages: ['addidas cap.jpeg'],
        featured: true
    },
    {
        name: 'Watch Band Quick Release Leather Strap for Samsung Galaxy Watch 3',
        shortName: 'Watch band Quick release Leather Strap for Samsung Galaxy Watch 3',
        slug: 'samsung-watch-leather-strap',
        price: 999,
        rating: 5,
        category: 'Electronics',
        description: 'Premium quality leather watch band compatible with Samsung Galaxy Watch 3. Features quick release pins for easy installation. Made from genuine leather with stainless steel buckle. Comfortable to wear all day long.',
        mainImage: 'patta.jpeg',
        additionalImages: ['patta.jpeg'],
        featured: true
    },
    {
        name: 'Decorative Calligraphy Wooden Wall Clock',
        shortName: 'Decorative Calligraphy Wooden Wall Clock',
        slug: 'calligraphy-wall-clock',
        price: 999,
        rating: 5,
        category: 'Home',
        description: 'Beautiful decorative wall clock featuring elegant calligraphy design. Made from high-quality wood with a smooth finish. Perfect for adding a touch of elegance to any room. Silent non-ticking movement for peaceful environment.',
        mainImage: 'potraitclock.jpeg',
        additionalImages: ['potraitclock.jpeg'],
        featured: true
    },
    {
        name: 'H60 Watch 9 Smartwatch with 7+1 Strap',
        shortName: 'H60 Watch 9 Smartwatch with 7+1 Strap',
        slug: 'h60-smartwatch',
        price: 3999,
        rating: 5,
        category: 'Electronics',
        description: 'Advanced smartwatch with multiple features including heart rate monitoring, step counter, sleep tracking, and more. Comes with 7+1 interchangeable straps for different styles. Water-resistant design. Compatible with both Android and iOS devices.',
        mainImage: 'smartwatch.jpeg',
        additionalImages: ['smartwatch.jpeg'],
        featured: true
    },
    {
        name: 'Nikah Date Fixing Cards - Marriage Date Fixing Card',
        shortName: 'Nikah Date Fixing Cards, Marriage Date Fixing Card By Khatoon Trends',
        slug: 'nikah-date-cards',
        price: 499,
        rating: 5,
        category: 'Gifts',
        description: 'Beautiful Nikah date fixing cards designed by Khatoon Trends. Perfect for announcing your special day. Premium quality printing with elegant design. Customizable with your details.',
        mainImage: 'save the date.jpeg',
        additionalImages: ['save the date.jpeg'],
        featured: true
    },
    {
        name: 'Rice Dispenser Food Storage Box Container',
        shortName: 'Rice Dispenser Food Storage Box Container | Insect Moisture Proof |',
        slug: 'rice-dispenser-storage',
        price: 5999,
        rating: 5,
        category: 'Home',
        description: 'Keep your rice and grains fresh with this insect and moisture proof storage container. Features a built-in dispenser for easy access. Large capacity design. Made from food-grade materials. Perfect for organized kitchen storage.',
        mainImage: 'kitchen.jpeg',
        additionalImages: ['kitchen.jpeg'],
        featured: true
    },
    {
        name: 'LED Neon Light Signs',
        shortName: 'LED Neon Light Signs',
        slug: 'led-neon-signs',
        price: 6200,
        rating: 5,
        category: 'Lighting',
        description: 'Custom LED neon light signs for home decoration, business, or events. Energy-efficient LED technology with long lifespan. Available in multiple colors. Easy to install and safe to use. Perfect for creating ambiance.',
        mainImage: 'led writing.jpeg',
        additionalImages: ['led writing.jpeg'],
        featured: true
    },
    {
        name: 'SNK Fitness GYM GLOVES with Wrist Support',
        shortName: 'SNK Fitness GYM GLOVES Weight Lifting Gloves Fitness Gloves With Wrist Support',
        slug: 'gym-gloves',
        price: 699,
        rating: 5,
        category: 'Sports',
        description: 'Professional gym gloves with integrated wrist support for weight lifting and fitness. Padded palm for grip and protection. Breathable material keeps hands cool. Adjustable wrist strap for secure fit. Durable construction for long-term use.',
        mainImage: 'gymgrip.jpeg',
        additionalImages: ['gymgrip.jpeg', 'gymgrip2.jpeg'],
        featured: false
    },
    {
        name: 'Wooden Wall Clock 3D Bird Style',
        shortName: 'Wooden Wall Clock 3D Bird Style Wooden Watch Design Decoration',
        slug: 'wooden-bird-clock',
        price: 999,
        rating: 5,
        category: 'Home',
        description: 'Unique 3D bird style wooden wall clock that adds character to any room. Handcrafted from quality wood. Silent quartz movement. A perfect blend of art and functionality.',
        mainImage: 'woddenwc.jpeg',
        additionalImages: ['woddenwc.jpeg'],
        featured: false
    },
    {
        name: 'Multipurpose Wooden Wall Hanger',
        shortName: 'Mister Traders Brand Multipurpose Wooden Wall Hanger | Mobile Charging Stand | Keys Hanging Hooks',
        slug: 'wooden-wall-hanger',
        price: 699,
        rating: 5,
        category: 'Home',
        description: 'Versatile wooden wall organizer from Mister Traders. Features hooks for keys, shelf for phone charging, and hooks for other items. Solid wood construction. Easy to mount. Keeps your entrance organized.',
        mainImage: 'wallhanger.jpeg',
        additionalImages: ['wallhanger.jpeg', 'wallhanger2.jpeg'],
        featured: false
    },
    {
        name: 'Automatic Sensor Night Light',
        shortName: 'Automatic Sensor Light Night',
        slug: 'sensor-night-light',
        price: 999,
        rating: 5,
        category: 'Lighting',
        description: 'Smart automatic sensor night light that turns on in darkness and off in daylight. Energy efficient LED. Perfect for hallways, bathrooms, and bedrooms. Plug directly into wall outlet. Safe for children.',
        mainImage: 'autonl.jpeg',
        additionalImages: ['autonl.jpeg', 'autonl2.jpeg'],
        featured: false
    },
    {
        name: 'Mobile Waist Bag for Men and Women',
        shortName: 'Mobile Waist Bag For Both Men And Women',
        slug: 'mobile-waist-bag',
        price: 2699,
        rating: 5,
        category: 'Fashion',
        description: 'Stylish and functional waist bag suitable for both men and women. Perfect for carrying phone, wallet, keys and essentials. Adjustable strap fits all sizes. Multiple compartments for organization. Great for travel, shopping, and outdoor activities.',
        mainImage: 'waistbag.jpeg',
        additionalImages: ['waistbag.jpeg'],
        featured: false
    },
    {
        name: 'X-TIGER Arm Sports Sleeves',
        shortName: 'X-TIGER Arm Sports Sleeves',
        slug: 'arm-sports-sleeves',
        price: 999,
        rating: 5,
        category: 'Sports',
        description: 'Professional arm sleeves for sports and outdoor activities. Provides UV protection and compression support. Moisture-wicking fabric keeps you dry. Suitable for cycling, running, basketball and more.',
        mainImage: 'idk.jpeg',
        additionalImages: ['idk.jpeg'],
        featured: false
    },
    {
        name: 'Fairy String Lights for Indoor & Outdoor',
        shortName: '10Ft/30 LEDs Fairy String Lights for Indoor&Outdoor Decoration',
        slug: 'fairy-string-lights',
        price: 600,
        rating: 5,
        category: 'Lighting',
        description: '10 feet fairy string lights with 30 LEDs. Perfect for indoor and outdoor decoration. Creates magical ambiance for bedrooms, patios, weddings, and parties. Battery operated for flexible placement. Multiple lighting modes.',
        mainImage: 'led.jpeg',
        additionalImages: ['led.jpeg'],
        featured: false
    },
    {
        name: 'Custom Photo Printed 3D LED Lamp',
        shortName: 'CUSTOM PHOTO PRINTED 3D LED LAMP',
        slug: '3d-led-lamp',
        price: 2900,
        rating: 5,
        category: 'Gifts',
        description: 'Personalized 3D LED lamp with your custom photo. Perfect gift for birthdays, anniversaries, and special occasions. LED technology for long-lasting illumination. Multiple color options with remote control. Unique and memorable gift idea.',
        mainImage: '3dlamp.jpeg',
        additionalImages: ['3dlamp.jpeg'],
        featured: false
    }
];

// ============================================
// SEED FUNCTION
// ============================================
// Connects to database and inserts all products

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tradehub');
        console.log('✅ Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert all products
        const createdProducts = await Product.insertMany(products);
        console.log(`✅ Successfully inserted ${createdProducts.length} products`);

        // Log each product
        console.log('\n📦 Products added:');
        createdProducts.forEach((product, index) => {
            console.log(`   ${index + 1}. ${product.name} - Rs.${product.price}`);
        });

        console.log('\n🎉 Database seeding completed successfully!');

        // Close connection
        await mongoose.connection.close();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        process.exit(1);
    }
};

// Run the seeding function
seedDatabase();
