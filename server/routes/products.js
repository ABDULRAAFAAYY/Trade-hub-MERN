// ============================================
// TRADE HUB - Product Routes
// ============================================
// This file defines all API endpoints related to products.
// Routes handle HTTP requests and delegate to controller functions.

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ============================================
// GET /api/products
// ============================================
// Retrieves all products from the database
// Query params: category (optional filter)

router.get('/', async (req, res) => {
    try {
        // Build query object based on optional filters
        const query = {};

        // Filter by category if provided in query string
        // Example: GET /api/products?category=Electronics
        if (req.query.category) {
            query.category = req.query.category;
        }

        // Find all products matching the query
        // .sort({ createdAt: -1 }) orders by newest first
        const products = await Product.find(query).sort({ createdAt: -1 });

        // Send successful response with products array
        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        // Handle any database errors
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
});

// ============================================
// GET /api/products/featured
// ============================================
// Retrieves only featured products for homepage display

router.get('/featured', async (req, res) => {
    try {
        // Find products where featured is true
        // Limit to 8 products for homepage
        const products = await Product.find({ featured: true }).limit(8);

        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching featured products',
            error: error.message
        });
    }
});

// ============================================
// GET /api/products/:slug
// ============================================
// Retrieves a single product by its URL slug
// Slug is a URL-friendly version of the product name

router.get('/:slug', async (req, res) => {
    try {
        // Find product by slug parameter
        // req.params.slug comes from the URL: /api/products/airpods-pro-2
        const product = await Product.findOne({ slug: req.params.slug });

        // If no product found, return 404 error
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Send the found product
        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
});

// ============================================
// POST /api/products
// ============================================
// Creates a new product (admin functionality)

router.post('/', async (req, res) => {
    try {
        // Create new product from request body
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating product',
            error: error.message
        });
    }
});

// ============================================
// PUT /api/products/:slug
// ============================================
// Updates an existing product

router.put('/:slug', async (req, res) => {
    try {
        // findOneAndUpdate finds the document and updates it
        // { new: true } returns the updated document
        // { runValidators: true } ensures schema validation on update
        const product = await Product.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
});

// ============================================
// DELETE /api/products/:slug
// ============================================
// Deletes a product from the database

router.delete('/:slug', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ slug: req.params.slug });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message
        });
    }
});

// Export the router for use in server.js
module.exports = router;
