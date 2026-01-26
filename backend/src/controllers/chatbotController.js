const knowledgeBase = require('../data/chatbotKnowledge');

/**
 * Process user message and return appropriate response
 */
const processMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    // Convert message to lowercase for pattern matching
    const userMessage = message.toLowerCase().trim();

    // Get response based on message content
    const response = generateResponse(userMessage);

    return res.status(200).json({
      success: true,
      response: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process message',
      message: error.message
    });
  }
};

/**
 * Generate appropriate response based on user message
 */
function generateResponse(userMessage) {
  // Check for greetings
  if (matchesPatterns(userMessage, knowledgeBase.greetings.patterns)) {
    return getRandomResponse(knowledgeBase.greetings.responses);
  }

  // Check for thank you
  if (matchesPatterns(userMessage, knowledgeBase.thanks.patterns)) {
    return getRandomResponse(knowledgeBase.thanks.responses);
  }

  // Check for goodbye
  if (matchesPatterns(userMessage, knowledgeBase.goodbye.patterns)) {
    return getRandomResponse(knowledgeBase.goodbye.responses);
  }

  // Check for admissions-related queries
  if (matchesPatterns(userMessage, knowledgeBase.admissions.patterns)) {
    // Check for specific sub-topics
    if (userMessage.includes('document') || userMessage.includes('paper') || userMessage.includes('certificate')) {
      return knowledgeBase.admissions.responses.documents;
    }
    if (userMessage.includes('eligib') || userMessage.includes('qualif') || userMessage.includes('criteri')) {
      return knowledgeBase.admissions.responses.eligibility;
    }
    return knowledgeBase.admissions.responses.general;
  }

  // Check for fee-related queries
  if (matchesPatterns(userMessage, knowledgeBase.fees.patterns)) {
    // Check for scholarship-specific queries
    if (userMessage.includes('scholar') || userMessage.includes('discount') || userMessage.includes('waiver')) {
      return knowledgeBase.fees.responses.scholarships;
    }
    return knowledgeBase.fees.responses.general;
  }

  // Check for exam-related queries
  if (matchesPatterns(userMessage, knowledgeBase.exams.patterns)) {
    // Check for result-specific queries
    if (userMessage.includes('result') || userMessage.includes('grade') || userMessage.includes('cgpa') || userMessage.includes('marks')) {
      return knowledgeBase.exams.responses.results;
    }
    return knowledgeBase.exams.responses.general;
  }

  // Check for faculty-related queries
  if (matchesPatterns(userMessage, knowledgeBase.faculty.patterns)) {
    // Check for achievement-specific queries
    if (userMessage.includes('achieve') || userMessage.includes('award') || userMessage.includes('research') || userMessage.includes('publication')) {
      return knowledgeBase.faculty.responses.achievements;
    }
    return knowledgeBase.faculty.responses.general;
  }

  // Check for placement-related queries
  if (matchesPatterns(userMessage, knowledgeBase.placements.patterns)) {
    // Check for training-specific queries
    if (userMessage.includes('train') || userMessage.includes('prepar') || userMessage.includes('skill') || userMessage.includes('course')) {
      return knowledgeBase.placements.responses.training;
    }
    return knowledgeBase.placements.responses.general;
  }

  // Check for facility-related queries
  if (matchesPatterns(userMessage, knowledgeBase.facilities.patterns)) {
    return knowledgeBase.facilities.responses.general;
  }

  // Check for programs offered
  if (matchesPatterns(userMessage, knowledgeBase.programs.patterns)) {
    return knowledgeBase.programs.responses.general;
  }

  // Check for location
  if (matchesPatterns(userMessage, knowledgeBase.location.patterns)) {
    return knowledgeBase.location.responses.general;
  }

  // Check for contact information
  if (matchesPatterns(userMessage, knowledgeBase.contact.patterns)) {
    return knowledgeBase.contact.responses.general;
  }

  // Check for campus life
  if (matchesPatterns(userMessage, knowledgeBase.campusLife.patterns)) {
    return knowledgeBase.campusLife.responses.general;
  }

  // Check for library
  if (matchesPatterns(userMessage, knowledgeBase.library.patterns)) {
    return knowledgeBase.library.responses.general;
  }

  // Check for research
  if (matchesPatterns(userMessage, knowledgeBase.research.patterns)) {
    return knowledgeBase.research.responses.general;
  }

  // Check for alumni
  if (matchesPatterns(userMessage, knowledgeBase.alumni.patterns)) {
    return knowledgeBase.alumni.responses.general;
  }

  // Check for attendance
  if (matchesPatterns(userMessage, knowledgeBase.attendance.patterns)) {
    return knowledgeBase.attendance.responses.general;
  }

  // Check for transport
  if (matchesPatterns(userMessage, knowledgeBase.transport.patterns)) {
    return knowledgeBase.transport.responses.general;
  }

  // Check for canteen/food
  if (matchesPatterns(userMessage, knowledgeBase.canteen.patterns)) {
    return knowledgeBase.canteen.responses.general;
  }

  // Check for student support
  if (matchesPatterns(userMessage, knowledgeBase.support.patterns)) {
    return knowledgeBase.support.responses.general;
  }

  // Check for extended scholarships info
  if (matchesPatterns(userMessage, knowledgeBase.scholarshipsExtended.patterns)) {
    return knowledgeBase.scholarshipsExtended.responses.general;
  }

  // Check for about college
  if (matchesPatterns(userMessage, knowledgeBase.about.patterns)) {
    return knowledgeBase.about.responses.general;
  }

  // If no match found, return fallback response
  return getRandomResponse(knowledgeBase.fallback);
}

/**
 * Check if user message matches any of the patterns
 */
function matchesPatterns(message, patterns) {
  return patterns.some(pattern => message.includes(pattern));
}

/**
 * Get random response from array of responses
 */
function getRandomResponse(responses) {
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

/**
 * Get chatbot stats (optional - for analytics)
 */
const getChatbotStats = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      stats: {
        totalTopics: 18,
        topics: [
          'Admissions & Eligibility',
          'Fee Structure & Scholarships',
          'Exam Schedules & Results',
          'Faculty & Departments',
          'Placements & Training',
          'Campus Facilities',
          'Programs Offered',
          'Location & Directions',
          'Contact Information',
          'Campus Life & Activities',
          'Library Services',
          'Research & Innovation',
          'Alumni Network',
          'Attendance Policy',
          'Transportation',
          'Food & Canteen',
          'Student Support',
          'About College'
        ],
        status: 'active'
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch stats'
    });
  }
};

module.exports = {
  processMessage,
  getChatbotStats
};
