// ============================================
// TRADE HUB - Contact Model (MongoDB Schema)
// ============================================
// This file defines the structure for contact form submissions.
// Stores messages from customers for later review.

const mongoose = require('mongoose');

// ============================================
// CONTACT SCHEMA DEFINITION
// ============================================

const contactSchema = new mongoose.Schema({
    // Sender's name
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },

    // Sender's email for reply
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },

    // Message subject
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        trim: true
    },

    // Message content
    message: {
        type: String,
        required: [true, 'Message is required']
    },

    // Whether the message has been read by admin
    isRead: {
        type: Boolean,
        default: false
    },

    // Whether a reply has been sent
    isReplied: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

// ============================================
// INDEXES
// ============================================

contactSchema.index({ isRead: 1 });
contactSchema.index({ createdAt: -1 });

// ============================================
// MODEL CREATION
// ============================================

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
