const express = require('express');
const router = express.Router();
const {
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  incrementClickCount,
  getAnnouncementById
} = require('../controllers/announcementController');
const { verifyToken, isAdmin } = require('../middleware/auth');

/**
 * @route   GET /api/announcements
 * @desc    Get all active announcements
 * @access  Public
 */
router.get('/', getAllAnnouncements);

/**
 * @route   GET /api/announcements/:id
 * @desc    Get single announcement
 * @access  Public
 */
router.get('/:id', getAnnouncementById);

/**
 * @route   POST /api/announcements/:id/click
 * @desc    Increment click count for analytics
 * @access  Public
 */
router.post('/:id/click', incrementClickCount);

/**
 * @route   POST /api/announcements
 * @desc    Create new announcement
 * @access  Admin only
 */
router.post('/', verifyToken, isAdmin, createAnnouncement);

/**
 * @route   PUT /api/announcements/:id
 * @desc    Update announcement
 * @access  Admin only
 */
router.put('/:id', verifyToken, isAdmin, updateAnnouncement);

/**
 * @route   DELETE /api/announcements/:id
 * @desc    Delete announcement
 * @access  Admin only
 */
router.delete('/:id', verifyToken, isAdmin, deleteAnnouncement);

module.exports = router;
