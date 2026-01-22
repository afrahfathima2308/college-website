const mongoose = require('mongoose');
const config = require('./env');

/**
 * Connect to MongoDB database
 * @returns {Promise<void>}
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.mongodbUri, {
            // These options are no longer needed in Mongoose 6+
            // but included for compatibility if using older versions
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📁 Database: ${conn.connection.name}`);
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        // Do not call process.exit(1) as it crashes the Vercel serverless function
    }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
    console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB error:', err);
});

module.exports = connectDB;
