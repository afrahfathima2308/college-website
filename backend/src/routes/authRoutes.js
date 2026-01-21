const express = require('express');
const { login, register, getMe } = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', login);

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 * @access  Public (for student/faculty) | Private/Admin (for admin creation)
 * @note    First admin can be created if email matches FIRST_ADMIN_EMAIL env variable
 *          Subsequent admin accounts require authentication by existing admin
 */
router.post('/register', register);

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged-in user info
 * @access  Private
 */
router.get('/me', verifyToken, getMe);

module.exports = router;
