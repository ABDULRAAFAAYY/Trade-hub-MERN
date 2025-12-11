// ============================================
// TRADE HUB - Main Server Entry Point
// ============================================
// This file initializes the Express.js server and connects all middleware,
// routes, and database configuration together.

const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// ============================================
// DATABASE CONNECTION
// ============================================
// Connect to MongoDB database (either local or Atlas cloud)
connectDB();

// ============================================
// MIDDLEWARE CONFIGURATION
// ============================================

// Enable CORS (Cross-Origin Resource Sharing)
// This allows the React frontend (running on different port) to access this API
app.use(cors());

// Parse incoming JSON requests
// This middleware parses JSON payloads in request bodies
app.use(express.json());

// Parse URL-encoded form data
// This handles form submissions with application/x-www-form-urlencoded content type
app.use(express.urlencoded({ extended: true }));

// Serve static files (product images) from the 'public' directory
// This makes all files in /public accessible via URL
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// ============================================
// API ROUTES
// ============================================

// Product routes - handles all /api/products endpoints
app.use('/api/products', require('./routes/products'));

// Order routes - handles all /api/orders endpoints
app.use('/api/orders', require('./routes/orders'));

// Contact routes - handles all /api/contact endpoints
app.use('/api/contact', require('./routes/contact'));

// ============================================
// ROOT ROUTE
// ============================================
// Simple welcome message for the API root
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Trade Hub API',
        version: '1.0.0',
        endpoints: {
            products: '/api/products',
            orders: '/api/orders',
            contact: '/api/contact'
        }
    });
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================
// Catches any errors that occur in route handlers
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ============================================
// SERVER INITIALIZATION
// ============================================
// Define the port number (from environment variable or default 5000)
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`
  ============================================
  🚀 Trade Hub Server is running!
  ============================================
  📍 URL: http://localhost:${PORT}
  📦 API: http://localhost:${PORT}/api/products
  ============================================
  `);
});
