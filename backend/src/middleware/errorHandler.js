const config = require('../config/env');

/**
 * Centralized error handling middleware
 * Handles all errors thrown in the application
 */
const errorHandler = (err, req, res, next) => {
    // Log error to console
    console.error('❌ Error:', err.message);

    // Default error status and message
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Mongoose duplicate key error (E11000)
    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue)[0];
        message = `${field} already exists`;
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        statusCode = 400;
        const errors = Object.values(err.errors).map(e => e.message);
        message = errors.join(', ');
    }

    // Mongoose cast error (invalid ObjectId)
    if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    // Response
    res.status(statusCode).json({
        success: false,
        message,
        // Include stack trace only in development
        ...(config.nodeEnv === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;
