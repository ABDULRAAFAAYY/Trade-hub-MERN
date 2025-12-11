// ============================================
// TRADE HUB - Order Model (MongoDB Schema)
// ============================================
// This file defines the structure for customer orders in MongoDB.
// Orders contain customer details and purchased items.

const mongoose = require('mongoose');

// ============================================
// ORDER ITEM SUB-SCHEMA
// ============================================
// Defines the structure for individual items within an order

const orderItemSchema = new mongoose.Schema({
    // Product slug for reference (optional)
    productSlug: {
        type: String
    },

    // Product name (stored for historical record)
    name: {
        type: String,
        required: true
    },

    // Quantity ordered
    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    // Price at time of purchase (stored to preserve historical pricing)
    price: {
        type: Number,
        required: true
    },

    // Product image (optional)
    image: {
        type: String,
        default: ''
    }
});

// ============================================
// ORDER SCHEMA DEFINITION
// ============================================

const orderSchema = new mongoose.Schema({
    // Customer Information
    customer: {
        // Customer's full name
        name: {
            type: String,
            required: [true, 'Customer name is required'],
            trim: true
        },

        // Email address for order confirmation
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
        },

        // Phone number for delivery coordination
        phone: {
            type: String,
            required: [true, 'Phone number is required']
        },

        // Delivery address
        address: {
            type: String,
            required: [true, 'Delivery address is required']
        },

        // City
        city: {
            type: String,
            required: [true, 'City is required']
        }
    },

    // Array of ordered items
    items: [orderItemSchema],

    // Total order amount
    totalAmount: {
        type: Number,
        required: true
    },

    // Order status tracking
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },

    // Payment method
    paymentMethod: {
        type: String,
        enum: ['cod', 'card', 'easypaisa', 'jazzcash'],
        default: 'cod'  // Cash on Delivery is default in Pakistan
    },

    // Order notes (optional)
    notes: {
        type: String
    }

}, {
    timestamps: true  // Adds createdAt and updatedAt
});

// ============================================
// INDEXES
// ============================================

orderSchema.index({ 'customer.email': 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });  // Recent orders first

// ============================================
// MODEL CREATION
// ============================================

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
