const jwt = require('jsonwebtoken');
const config = require('../config/env');

/**
 * Generate JWT token for user
 * @param {Object} user - User object with id and role
 * @returns {string} - JWT token
 */
const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };

    return jwt.sign(payload, config.jwtSecret, {
        expiresIn: config.jwtExpire
    });
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} - Decoded token payload
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

module.exports = {
    generateToken,
    verifyToken
};
