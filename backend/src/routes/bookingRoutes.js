const express = require('express');
const {
    createBooking,
    getAllBookings,
    getPendingBookings,
    getBooking,
    approveBooking,
    rejectBooking,
    deleteBooking,
    checkAvailability
} = require('../controllers/bookingController');
const { verifyToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

/**
 * @route   GET /api/bookings/pending
 * @desc    Get all pending bookings (Admin only)
 * @access  Private/Admin
 */
router.get('/pending', isAdmin, getPendingBookings);

/**
 * @route   GET /api/bookings/availability/:hallName
 * @desc    Check hall availability
 * @access  Private
 */
router.get('/availability/:hallName', checkAvailability);

/**
 * @route   GET /api/bookings
 * @desc    Get all bookings (filtered by role)
 * @access  Private
 */
router.get('/', getAllBookings);

/**
 * @route   POST /api/bookings
 * @desc    Create new booking
 * @access  Private
 */
router.post('/', createBooking);

/**
 * @route   GET /api/bookings/:id
 * @desc    Get single booking
 * @access  Private
 */
router.get('/:id', getBooking);

/**
 * @route   PUT /api/bookings/:id/approve
 * @desc    Approve booking
 * @access  Private/Admin
 */
router.put('/:id/approve', isAdmin, approveBooking);

/**
 * @route   PUT /api/bookings/:id/reject
 * @desc    Reject booking
 * @access  Private/Admin
 */
router.put('/:id/reject', isAdmin, rejectBooking);

/**
 * @route   DELETE /api/bookings/:id
 * @desc    Delete/Cancel booking
 * @access  Private
 */
router.delete('/:id', deleteBooking);

module.exports = router;
