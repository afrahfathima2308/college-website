const express = require('express');
const {
    markAttendance,
    updateAttendance,
    getMyAttendance,
    getAttendanceByBranch
} = require('../controllers/attendanceController');
const { verifyToken, authorize } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(verifyToken);

// Faculty/Admin Routes
router.post('/mark', authorize('admin', 'faculty'), markAttendance);
router.put('/update/:id', authorize('admin', 'faculty'), updateAttendance);
router.get('/branch/:branch', authorize('admin', 'faculty'), getAttendanceByBranch);

// Student Routes
router.get('/my', authorize('student'), getMyAttendance);

module.exports = router;
