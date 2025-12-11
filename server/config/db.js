// ============================================
// TRADE HUB - MongoDB Database Configuration
// ============================================
// This file handles the connection to MongoDB database using Mongoose ODM.
// Mongoose provides a schema-based solution to model application data.

const mongoose = require('mongoose');

// ============================================
// DATABASE CONNECTION FUNCTION
// ============================================
// This async function establishes connection to MongoDB
// It uses the connection string from environment variables

const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB
        // mongoose.connect() returns a promise that resolves when connected
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tradehub');

        // Log successful connection with the host name
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // If connection fails, log the error and exit the process
        console.error(`❌ MongoDB Connection Error: ${error.message}`);

        // Exit process with failure code (1)
        // This prevents the server from running without a database
        process.exit(1);
    }
};

// ============================================
// MONGOOSE CONNECTION EVENTS
// ============================================
// These event listeners help monitor the database connection status

// Fired when connection is lost
mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB disconnected');
});

// Fired when reconnected after losing connection
mongoose.connection.on('reconnected', () => {
    console.log('🔄 MongoDB reconnected');
});

// Export the connection function for use in server.js
module.exports = connectDB;
