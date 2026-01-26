const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
    maxlength: [2000, 'Content cannot exceed 2000 characters']
  },
  type: {
    type: String,
    enum: ['info', 'important', 'urgent', 'event'],
    default: 'info'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  clickCount: {
    type: Number,
    default: 0
  },
  expiryDate: {
    type: Date,
    default: null // null means no expiry
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

// Index for efficient queries
announcementSchema.index({ isActive: 1, createdAt: -1 });
announcementSchema.index({ expiryDate: 1 });

// Method to check if announcement is still valid
announcementSchema.methods.isValid = function () {
  if (!this.isActive) return false;
  if (this.expiryDate && this.expiryDate < new Date()) return false;
  return true;
};

// Static method to get all active announcements
announcementSchema.statics.getActiveAnnouncements = function () {
  const now = new Date();
  return this.find({
    isActive: true,
    $or: [
      { expiryDate: null },
      { expiryDate: { $gt: now } }
    ]
  })
    .sort({ createdAt: -1 })
    .populate('postedBy', 'name email')
    .limit(50); // Limit to 50 most recent
};

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
