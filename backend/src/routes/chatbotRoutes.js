const express = require('express');
const router = express.Router();
const { processMessage, getChatbotStats } = require('../controllers/chatbotController');

/**
 * @route   POST /api/chatbot/message
 * @desc    Process user message and return bot response
 * @access  Public
 */
router.post('/message', processMessage);

/**
 * @route   GET /api/chatbot/stats
 * @desc    Get chatbot statistics
 * @access  Public
 */
router.get('/stats', getChatbotStats);

module.exports = router;
