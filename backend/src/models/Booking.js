const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    // Venue Information (Hall or Classroom)
    hallName: {
        type: String,
        required: [true, 'Please provide venue name'],
        enum: [
            // Seminar Halls
            'Main Seminar Hall', 'Conference Room A', 'Conference Room B', 'Auditorium', 'Mini Hall',
            // Classrooms
            'Classroom 101', 'Classroom 102', 'Classroom 103', 'Classroom 201', 'Classroom 202', 
            'Classroom 203', 'Classroom 301', 'Classroom 302', 'Classroom 303', 'Classroom 401',
            'Classroom 402', 'Classroom 403', 'Computer Lab 1', 'Computer Lab 2', 'Computer Lab 3'
        ]
    },

    // Booking Details
    eventName: {
        type: String,
        required: [true, 'Please provide event name'],
        trim: true
    },

    description: {
        type: String,
        required: [true, 'Please provide event description'],
        trim: true
    },

    // Date and Time
    date: {
        type: Date,
        required: [true, 'Please provide booking date']
    },

    startTime: {
        type: String,
        required: [true, 'Please provide start time'],
        match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide valid time in HH:MM format']
    },

    endTime: {
        type: String,
        required: [true, 'Please provide end time'],
        match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide valid time in HH:MM format']
    },

    // User Information
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    department: {
        type: String,
        required: [true, 'Please provide department'],
        enum: ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Other']
    },

    contactNumber: {
        type: String,
        required: [true, 'Please provide contact number']
    },

    // Additional Details
    expectedAttendees: {
        type: Number,
        required: [true, 'Please provide expected number of attendees'],
        min: 1
    },

    equipmentNeeded: [{
        type: String,
        enum: ['Projector', 'Microphone', 'Speakers', 'Whiteboard', 'Video Conference', 'None']
    }],

    // Status
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },

    // Admin Actions
    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    reviewedAt: {
        type: Date
    },

    rejectionReason: {
        type: String
    }
}, {
    timestamps: true
});

// Index for efficient queries
bookingSchema.index({ date: 1, hallName: 1, status: 1 });
bookingSchema.index({ bookedBy: 1 });

// Check for conflicts before saving
bookingSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('date') || this.isModified('startTime') || this.isModified('endTime') || this.isModified('hallName')) {
        // Check if there's a conflicting approved booking
        // Two time ranges overlap if: startTime1 < endTime2 AND endTime1 > startTime2
        const conflictingBooking = await this.constructor.findOne({
            _id: { $ne: this._id },
            hallName: this.hallName,
            date: this.date,
            status: 'approved',
            startTime: { $lt: this.endTime },
            endTime: { $gt: this.startTime }
        });

        if (conflictingBooking) {
            const error = new Error('This venue is already booked for the selected time slot');
            error.statusCode = 400;
            return next(error);
        }
    }
    next();
});

module.exports = mongoose.model('Booking', bookingSchema);
