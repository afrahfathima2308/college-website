const Mark = require('../models/Mark');
const User = require('../models/User');

/**
 * @route   POST /api/marks
 * @desc    Add or Update marks for a student
 * @access  Private (Faculty/Admin only)
 */
const addMark = async (req, res, next) => {
    try {
        const { studentId, subject, marksObtained, totalMarks, semester, examType } = req.body;

        // Verify student exists
        const student = await User.findById(studentId);
        if (!student || student.role !== 'student') {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        // Upsert mark (update if exists, else create)
        const mark = await Mark.findOneAndUpdate(
            {
                student: studentId,
                subject,
                semester,
                examType
            },
            {
                student: studentId,
                branch: student.branch,
                subject,
                marksObtained,
                totalMarks,
                semester,
                examType,
                addedBy: req.user.id
            },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Marks saved successfully',
            data: mark
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/marks/student/:studentId
 * @desc    Get all marks for a specific student
 * @access  Private (Faculty/Admin)
 */
const getStudentMarks = async (req, res, next) => {
    try {
        const marks = await Mark.find({ student: req.params.studentId })
            .sort({ semester: 1, subject: 1 });

        res.status(200).json({
            success: true,
            count: marks.length,
            data: marks
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/marks/my-marks
 * @desc    Get logged-in student's own marks
 * @access  Private (Student)
 */
const getMyMarks = async (req, res, next) => {
    try {
        const marks = await Mark.find({ student: req.user.id })
            .sort({ semester: 1, subject: 1 });

        res.status(200).json({
            success: true,
            count: marks.length,
            data: marks
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/marks/branch/:branch
 * @desc    Get all students in a specific branch (for faculty list)
 * @access  Private (Faculty/Admin)
 */
const getStudentsByBranch = async (req, res, next) => {
    try {
        const { branch } = req.params;
        const students = await User.find({ role: 'student', branch })
            .select('name email branch')
            .sort({ name: 1 });

        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addMark,
    getStudentMarks,
    getMyMarks,
    getStudentsByBranch
};
