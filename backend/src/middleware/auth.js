const { verifyToken } = require('../utils/jwt');
const User = require('../models/User');

/**
 * Middleware to verify JWT token and authenticate user
 * Attaches user object to req.user if valid
 */
const verifyTokenMiddleware = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        // Extract token (remove 'Bearer ' prefix)
        const token = authHeader.substring(7);

        // Verify token
        const decoded = verifyToken(token);

        // Get user from database (excluding password)
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found. Token invalid.'
            });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
            error: error.message
        });
    }
};

/**
 * Middleware to check if authenticated user is an admin
 * Must be used AFTER verifyTokenMiddleware
 */
const isAdmin = (req, res, next) => {
    // Check if user exists (set by verifyTokenMiddleware)
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }

    // Check if user role is admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin privileges required.'
        });
    }

    next();
};

/**
 * Middleware to check if user has one of the required roles
 * @param {...String} roles - List of allowed roles
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }

        next();
    };
};

module.exports = {
    verifyToken: verifyTokenMiddleware,
    isAdmin,
    authorize
};
