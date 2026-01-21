const Booking = require('../models/Booking');

/**
 * @route   POST /api/bookings
 * @desc    Create a new booking
 * @access  Private (Student/Faculty)
 */
const createBooking = async (req, res, next) => {
    try {
        const {
            hallName,
            eventName,
            description,
            date,
            startTime,
            endTime,
            department,
            contactNumber,
            expectedAttendees,
            equipmentNeeded
        } = req.body;

        // Create booking
        const booking = await Booking.create({
            hallName,
            eventName,
            description,
            date,
            startTime,
            endTime,
            bookedBy: req.user._id,
            department,
            contactNumber,
            expectedAttendees,
            equipmentNeeded: equipmentNeeded || []
        });

        // Populate user details
        await booking.populate('bookedBy', 'name email role');

        res.status(201).json({
            success: true,
            message: 'Booking created successfully. Awaiting admin approval.',
            data: { booking }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/bookings
 * @desc    Get all bookings (Admin sees all, users see their own)
 * @access  Private
 */
const getAllBookings = async (req, res, next) => {
    try {
        let query = {};

        // Students and faculty see only their bookings
        if (req.user.role !== 'admin') {
            query.bookedBy = req.user._id;
        }

        const bookings = await Booking.find(query)
            .populate('bookedBy', 'name email role department')
            .populate('reviewedBy', 'name email')
            .sort({ date: -1, createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: { bookings }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/bookings/pending
 * @desc    Get all pending bookings (Admin only)
 * @access  Private/Admin
 */
const getPendingBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ status: 'pending' })
            .populate('bookedBy', 'name email role department')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: { bookings }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/bookings/:id
 * @desc    Get single booking
 * @access  Private
 */
const getBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('bookedBy', 'name email role department')
            .populate('reviewedBy', 'name email');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Users can only view their own bookings (unless admin)
        if (req.user.role !== 'admin' && booking.bookedBy._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this booking'
            });
        }

        res.status(200).json({
            success: true,
            data: { booking }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/bookings/:id/approve
 * @desc    Approve a booking
 * @access  Private/Admin
 */
const approveBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        if (booking.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: `Booking has already been ${booking.status}`
            });
        }

        booking.status = 'approved';
        booking.reviewedBy = req.user._id;
        booking.reviewedAt = Date.now();

        await booking.save();
        await booking.populate('bookedBy', 'name email role');
        await booking.populate('reviewedBy', 'name email');

        res.status(200).json({
            success: true,
            message: 'Booking approved successfully',
            data: { booking }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/bookings/:id/reject
 * @desc    Reject a booking
 * @access  Private/Admin
 */
const rejectBooking = async (req, res, next) => {
    try {
        const { reason } = req.body;

        if (!reason) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a rejection reason'
            });
        }

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        if (booking.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: `Booking has already been ${booking.status}`
            });
        }

        booking.status = 'rejected';
        booking.rejectionReason = reason;
        booking.reviewedBy = req.user._id;
        booking.reviewedAt = Date.now();

        await booking.save();
        await booking.populate('bookedBy', 'name email role');
        await booking.populate('reviewedBy', 'name email');

        res.status(200).json({
            success: true,
            message: 'Booking rejected',
            data: { booking }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   DELETE /api/bookings/:id
 * @desc    Delete/Cancel a booking
 * @access  Private
 */
const deleteBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Only booking creator or admin can delete
        if (req.user.role !== 'admin' && booking.bookedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this booking'
            });
        }

        // Don't allow deletion of approved bookings by non-admins
        if (booking.status === 'approved' && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Cannot cancel an approved booking. Please contact admin.'
            });
        }

        await booking.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Booking deleted successfully',
            data: {}
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/bookings/availability/:hallName
 * @desc    Check hall availability for a date
 * @access  Private
 */
const checkAvailability = async (req, res, next) => {
    try {
        const { hallName } = req.params;
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a date'
            });
        }

        const bookings = await Booking.find({
            hallName,
            date: new Date(date),
            status: { $in: ['approved', 'pending'] }
        }).select('startTime endTime status eventName');

        res.status(200).json({
            success: true,
            data: { bookings }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getPendingBookings,
    getBooking,
    approveBooking,
    rejectBooking,
    deleteBooking,
    checkAvailability
};
