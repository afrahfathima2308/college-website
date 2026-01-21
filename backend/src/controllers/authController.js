const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const config = require('../config/env');

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return JWT token
 * @access  Public
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // DEMO LOGIN: Check if it's a demo login attempt
        const isDemoEmail = email.endsWith('@srit.ac.in');
        const isDemoPassword = password === 'srit1234';

        if (isDemoEmail && isDemoPassword) {
            // Auto-create demo user if doesn't exist
            let user = await User.findOne({ email });

            if (!user) {
                // Determine role from email prefix
                let role = 'student'; // default
                if (email.startsWith('admin')) {
                    role = 'admin';
                } else if (email.startsWith('faculty')) {
                    role = 'faculty';
                }

                // Create demo user
                user = await User.create({
                    name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
                    email: email,
                    password: 'srit1234',
                    role: role
                });
            }

            // Generate JWT token
            const token = generateToken(user);

            // Return user info and token
            return res.status(200).json({
                success: true,
                message: 'Demo login successful',
                data: {
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    },
                    token
                }
            });
        }

        // REGULAR LOGIN: Find user and include password field
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Return user info and token (password excluded by toJSON method)
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public (for student/faculty) | Private/Admin (for admin creation only)
 * @note    Public registration allows student and faculty roles only
 *          Admin accounts require special permissions (see logic below)
 */
const register = async (req, res, next) => {
    try {
        const { name, email, password, role, branch } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and password'
            });
        }

        // Validate branch for students
        if (role === 'student' && !branch) {
            return res.status(400).json({
                success: false,
                message: 'Please select a branch'
            });
        }

        // Enforce srit.ac.in domain
        if (!email.endsWith('@srit.ac.in')) {
            return res.status(400).json({
                success: false,
                message: 'Registration is restricted to @srit.ac.in domain only'
            });
        }

        // Security: Check if trying to create admin account
        if (role === 'admin') {
            // Only allow if:
            // 1. First admin (no admin exists yet) AND email matches FIRST_ADMIN_EMAIL
            // 2. OR request is from an authenticated admin user (req.user exists)

            // Strict check for single admin ID
            if (email !== 'admin@srit.ac.in' && email !== config.firstAdminEmail) {
                return res.status(403).json({
                    success: false,
                    message: 'Admin registration is restricted to specific IDs only'
                });
            }

            const adminCount = await User.countDocuments({ role: 'admin' });

            if (adminCount === 0) {
                // First admin creation - must match FIRST_ADMIN_EMAIL
                if (!config.firstAdminEmail || email !== config.firstAdminEmail) {
                    return res.status(403).json({
                        success: false,
                        message: 'First admin email must match FIRST_ADMIN_EMAIL in environment variables'
                    });
                }
            } else {
                // Subsequent admin creation - must be done by existing admin
                if (!req.user || req.user.role !== 'admin') {
                    return res.status(403).json({
                        success: false,
                        message: 'Only admins can create admin accounts'
                    });
                }
            }
        }

        // Security: Restrict faculty to specific ID
        if (role === 'faculty') {
            if (email !== 'faculty@srit.ac.in') {
                return res.status(403).json({
                    success: false,
                    message: 'Faculty registration is restricted to faculty@srit.ac.in only'
                });
            }
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'student', // Default to student if no role specified
            branch: role === 'student' ? branch : undefined
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged-in user
 * @access  Private
 */
const getMe = async (req, res, next) => {
    try {
        // req.user is set by verifyToken middleware
        res.status(200).json({
            success: true,
            data: {
                user: req.user
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
    register,
    getMe
};
