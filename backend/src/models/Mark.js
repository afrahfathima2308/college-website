const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    branch: {
        type: String,
        required: true,
        enum: ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil', 'CSM', 'CSD', 'Other']
    },
    semester: {
        type: String,
        required: [true, 'Please provide semester'],
        enum: ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2']
    },
    subject: {
        type: String,
        required: [true, 'Please provide subject name'],
        trim: true
    },
    marksObtained: {
        type: Number,
        required: [true, 'Please provide marks obtained'],
        min: 0
    },
    totalMarks: {
        type: Number,
        required: [true, 'Please provide total marks'],
        min: 0,
        default: 100
    },
    examType: {
        type: String,
        enum: ['Mid-1', 'Mid-2', 'Semester', 'Assignment', 'Lab'],
        default: 'Semester'
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Compound index to prevent duplicate entry for same student, subject, semester and exam type
markSchema.index({ student: 1, subject: 1, semester: 1, examType: 1 }, { unique: true });

module.exports = mongoose.model('Mark', markSchema);
