const Announcement = require('../models/Announcement');

/**
 * Get all active announcements (Public)
 */
const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.getActiveAnnouncements();

    return res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements
    });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch announcements'
    });
  }
};

/**
 * Create new announcement (Admin only)
 */
const createAnnouncement = async (req, res) => {
  try {
    const { title, content, type, expiryDate } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: 'Title and content are required'
      });
    }

    const announcement = await Announcement.create({
      title,
      content,
      type: type || 'info',
      postedBy: req.user._id, // From auth middleware
      expiryDate: expiryDate || null
    });

    await announcement.populate('postedBy', 'name email');

    return res.status(201).json({
      success: true,
      message: 'Announcement created successfully',
      data: announcement
    });
  } catch (error) {
    console.error('Error creating announcement:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to create announcement'
    });
  }
};

/**
 * Update announcement (Admin only)
 */
const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, type, isActive, expiryDate } = req.body;

    const announcement = await Announcement.findById(id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        error: 'Announcement not found'
      });
    }

    // Update fields
    if (title !== undefined) announcement.title = title;
    if (content !== undefined) announcement.content = content;
    if (type !== undefined) announcement.type = type;
    if (isActive !== undefined) announcement.isActive = isActive;
    if (expiryDate !== undefined) announcement.expiryDate = expiryDate;

    await announcement.save();
    await announcement.populate('postedBy', 'name email');

    return res.status(200).json({
      success: true,
      message: 'Announcement updated successfully',
      data: announcement
    });
  } catch (error) {
    console.error('Error updating announcement:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update announcement'
    });
  }
};

/**
 * Delete announcement (Admin only)
 */
const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findById(id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        error: 'Announcement not found'
      });
    }

    await announcement.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Announcement deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete announcement'
    });
  }
};

/**
 * Increment click count (Public)
 */
const incrementClickCount = async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findByIdAndUpdate(
      id,
      { $inc: { clickCount: 1 } },
      { new: true }
    );

    if (!announcement) {
      return res.status(404).json({
        success: false,
        error: 'Announcement not found'
      });
    }

    return res.status(200).json({
      success: true,
      clickCount: announcement.clickCount
    });
  } catch (error) {
    console.error('Error incrementing click count:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update click count'
    });
  }
};

/**
 * Get single announcement (Public)
 */
const getAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findById(id)
      .populate('postedBy', 'name email');

    if (!announcement) {
      return res.status(404).json({
        success: false,
        error: 'Announcement not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: announcement
    });
  } catch (error) {
    console.error('Error fetching announcement:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch announcement'
    });
  }
};

module.exports = {
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  incrementClickCount,
  getAnnouncementById
};
