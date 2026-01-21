const express = require('express');
const {
    addMark,
    getStudentMarks,
    getMyMarks,
    getStudentsByBranch
} = require('../controllers/markController');
const { verifyToken, authorize } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(verifyToken);

// Faculty/Admin Routes
router.post('/', authorize('admin', 'faculty'), addMark);
router.get('/student/:studentId', authorize('admin', 'faculty'), getStudentMarks);
router.get('/branch/:branch', authorize('admin', 'faculty'), getStudentsByBranch);

// Student Routes
router.get('/my-marks', authorize('student'), getMyMarks);

module.exports = router;
