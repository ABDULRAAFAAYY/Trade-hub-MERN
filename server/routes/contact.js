// ============================================
// TRADE HUB - Contact Routes
// ============================================
// This file handles contact form submissions from customers.

const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// ============================================
// POST /api/contact
// ============================================
// Submits a new contact form message

router.post('/', async (req, res) => {
    try {
        // Destructure form fields from request body
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Create new contact message in database
        const contactMessage = await Contact.create({
            name,
            email,
            subject,
            message
        });

        res.status(201).json({
            success: true,
            message: 'Thank you for your message! We will get back to you soon.',
            data: {
                id: contactMessage._id,
                name: contactMessage.name
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error submitting message',
            error: error.message
        });
    }
});

// ============================================
// GET /api/contact
// ============================================
// Retrieves all contact messages (admin functionality)

router.get('/', async (req, res) => {
    try {
        // Get filter from query params
        const query = {};
        if (req.query.unread === 'true') {
            query.isRead = false;
        }

        const messages = await Contact.find(query)
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: messages.length,
            data: messages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching messages',
            error: error.message
        });
    }
});

// ============================================
// PUT /api/contact/:id/read
// ============================================
// Marks a message as read

router.put('/:id/read', async (req, res) => {
    try {
        const message = await Contact.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }

        res.json({
            success: true,
            message: 'Message marked as read',
            data: message
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating message',
            error: error.message
        });
    }
});

module.exports = router;
