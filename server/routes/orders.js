// ============================================
// TRADE HUB - Order Routes
// ============================================
// This file handles all order-related API endpoints.
// Customers can create orders, and admins can manage them.

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// ============================================
// POST /api/orders
// ============================================
// Creates a new order when customer completes checkout

router.post('/', async (req, res) => {
    try {
        // Log incoming request for debugging
        console.log('Order request body:', JSON.stringify(req.body, null, 2));

        // Destructure required fields from request body
        const { customer, items, paymentMethod, notes } = req.body;

        // Validate that items array is not empty
        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Order must contain at least one item'
            });
        }

        // Calculate total amount from items
        const totalAmount = items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        // Create the order document
        const order = await Order.create({
            customer,
            items,
            totalAmount,
            paymentMethod: paymentMethod || 'cod',
            notes: notes || ''
        });

        console.log('Order created successfully:', order._id);

        // Send success response with order details
        res.status(201).json({
            success: true,
            message: 'Order placed successfully!',
            data: {
                orderId: order._id,
                totalAmount: order.totalAmount,
                status: order.status
            }
        });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Error placing order',
            error: error.message
        });
    }
});

// ============================================
// GET /api/orders
// ============================================
// Retrieves all orders (admin functionality)

router.get('/', async (req, res) => {
    try {
        // Find all orders, sort by newest
        const orders = await Order.find()
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
});

// ============================================
// GET /api/orders/:id
// ============================================
// Retrieves a specific order by ID

router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching order',
            error: error.message
        });
    }
});

// ============================================
// PUT /api/orders/:id/status
// ============================================
// Updates order status (admin functionality)

router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;

        // Validate status value
        const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            message: `Order status updated to ${status}`,
            data: order
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating order status',
            error: error.message
        });
    }
});

module.exports = router;
