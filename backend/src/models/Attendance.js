const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    period: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    status: {
        type: String,
        enum: ['Present', 'Absent'],
        required: true
    },
    branch: {
        type: String,
        required: true,
        enum: ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil', 'CSM', 'CSD', 'Other']
    },
    editHistory: [{
        previousStatus: String,
        newStatus: String,
        editedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        editedAt: {
            type: Date,
            default: Date.now
        },
        reason: String
    }]
}, {
    timestamps: true
});

// Compound index to ensure unique attendance per student per date per period
attendanceSchema.index({ student: 1, date: 1, period: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
