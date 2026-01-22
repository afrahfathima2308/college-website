require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/college_website',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  nodeEnv: process.env.NODE_ENV || 'development',
  firstAdminEmail: process.env.FIRST_ADMIN_EMAIL || '',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
};

// Validate required environment variables
if (!config.jwtSecret) {
  console.warn('WARNING: JWT_SECRET is not defined in environment variables. Authentication will fail.');
}

module.exports = config;
