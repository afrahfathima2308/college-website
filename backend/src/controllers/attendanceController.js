const Attendance = require('../models/Attendance');
const User = require('../models/User');

/**
 * @route   POST /api/attendance/mark
 * @desc    Mark attendance for a list of students
 * @access  Private (Faculty/Admin)
 */
const markAttendance = async (req, res, next) => {
    try {
        const { date, period, branch, attendanceData } = req.body;

        if (!attendanceData || !Array.isArray(attendanceData)) {
            return res.status(400).json({ success: false, message: 'Invalid attendance data' });
        }

        const results = await Promise.all(attendanceData.map(async (record) => {
            return await Attendance.findOneAndUpdate(
                {
                    student: record.studentId,
                    date: new Date(date),
                    period
                },
                {
                    student: record.studentId,
                    faculty: req.user.id,
                    date: new Date(date),
                    period,
                    status: record.status,
                    branch
                },
                { upsert: true, new: true, runValidators: true }
            );
        }));

        res.status(200).json({
            success: true,
            message: 'Attendance marked successfully',
            data: results
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/attendance/update/:id
 * @desc    Update a specific attendance record (with edit logging)
 * @access  Private (Faculty/Admin)
 */
const updateAttendance = async (req, res, next) => {
    try {
        const { status, reason } = req.body;
        const attendance = await Attendance.findById(req.params.id);

        if (!attendance) {
            return res.status(404).json({ success: false, message: 'Attendance record not found' });
        }

        // Define edit window (e.g., 24 hours)
        const editWindow = 24 * 60 * 60 * 1000;
        const timePassed = Date.now() - attendance.createdAt.getTime();

        if (timePassed > editWindow && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Edit window has passed. Only admins can edit now.'
            });
        }

        attendance.editHistory.push({
            previousStatus: attendance.status,
            newStatus: status,
            editedBy: req.user.id,
            reason
        });

        attendance.status = status;
        await attendance.save();

        res.status(200).json({
            success: true,
            message: 'Attendance updated successfully',
            data: attendance
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/attendance/my
 * @desc    Get logged-in student's own attendance records and stats
 * @access  Private (Student)
 */
const getMyAttendance = async (req, res, next) => {
    try {
        const attendanceRecords = await Attendance.find({ student: req.user.id })
            .sort({ date: -1, period: 1 });

        const totalRecords = attendanceRecords.length;
        const presentCount = attendanceRecords.filter(r => r.status === 'Present').length;
        const percentage = totalRecords > 0 ? (presentCount / totalRecords) * 100 : 0;

        res.status(200).json({
            success: true,
            data: attendanceRecords,
            stats: {
                totalClasses: totalRecords,
                presentCount,
                percentage: percentage.toFixed(2)
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/attendance/branch/:branch
 * @desc    Get attendance records for a branch/date/period (for faculty to view/edit)
 * @access  Private (Faculty/Admin)
 */
const getAttendanceByBranch = async (req, res, next) => {
    try {
        const { branch } = req.params;
        const { date, period } = req.query;

        const query = { branch };
        if (date) query.date = new Date(date);
        if (period) query.period = period;

        const records = await Attendance.find(query)
            .populate('student', 'name email')
            .sort({ date: -1, period: 1 });

        res.status(200).json({
            success: true,
            count: records.length,
            data: records
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    markAttendance,
    updateAttendance,
    getMyAttendance,
    getAttendanceByBranch
};
