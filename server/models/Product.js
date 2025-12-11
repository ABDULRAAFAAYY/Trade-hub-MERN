// ============================================
// TRADE HUB - Product Model (MongoDB Schema)
// ============================================
// This file defines the structure of products stored in MongoDB.
// Mongoose schemas provide data validation and type casting.

const mongoose = require('mongoose');

// ============================================
// PRODUCT SCHEMA DEFINITION
// ============================================
// Schema defines the structure, types, and validation for each product document

const productSchema = new mongoose.Schema({
    // Product name - required string field
    // Example: "Airpods Pro 2 with Touch Controls"
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true  // Removes whitespace from both ends
    },

    // Short name for product cards
    // Example: "AIRPODS PRO 2ND GENERATION"
    shortName: {
        type: String,
        required: true,
        trim: true
    },

    // URL-friendly identifier
    // Example: "airpods-pro-2"
    slug: {
        type: String,
        required: true,
        unique: true,  // No two products can have the same slug
        lowercase: true
    },

    // Product price in Pakistani Rupees
    // Example: 5999
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative']
    },

    // Star rating (1-5)
    // Example: 5
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },

    // Product category for filtering
    // Example: "Electronics"
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Fashion', 'Home', 'Sports', 'Gifts', 'Lighting']
    },

    // Detailed product description
    description: {
        type: String,
        required: true
    },

    // Main product image filename
    // Example: "airpods 2.jpeg"
    mainImage: {
        type: String,
        required: true
    },

    // Array of additional product images
    // Example: ["airpods 2.jpeg", "airpodd.webp", "airpd.jpeg"]
    additionalImages: [{
        type: String
    }],

    // Whether product appears in featured section
    featured: {
        type: Boolean,
        default: false
    },

    // Stock quantity (optional, for future inventory)
    stock: {
        type: Number,
        default: 100
    }

}, {
    // Schema options
    timestamps: true  // Automatically adds createdAt and updatedAt fields
});

// ============================================
// VIRTUAL PROPERTIES
// ============================================
// Virtual properties are computed properties that don't get stored in the database

// Get full image URL for main image
productSchema.virtual('mainImageUrl').get(function () {
    return `/images/${this.mainImage}`;
});

// ============================================
// INDEXES
// ============================================
// Indexes improve query performance for frequently searched fields

productSchema.index({ slug: 1 });  // Index for fast slug lookups
productSchema.index({ category: 1 });  // Index for category filtering
productSchema.index({ featured: 1 });  // Index for featured products query

// ============================================
// MODEL CREATION
// ============================================
// Create and export the Product model
// The model provides an interface to interact with the 'products' collection

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
