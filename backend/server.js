const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const config = require('./src/config/env');
const errorHandler = require('./src/middleware/errorHandler');
const authRoutes = require('./src/routes/authRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// ======================
// MIDDLEWARE
// ======================

// CORS - Allow frontend to communicate with backend
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true
}));

// Body parser - Parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging (development only)
if (config.nodeEnv === 'development') {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    });
}

// ======================
// ROUTES
// ======================

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv
    });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Booking routes
app.use('/api/bookings', bookingRoutes);

// Marks routes
const markRoutes = require('./src/routes/markRoutes');
app.use('/api/marks', markRoutes);

// 404 handler for undefined routes
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// ======================
// ERROR HANDLER (Must be last)
// ======================
app.use(errorHandler);

// ======================
// START SERVER
// ======================
const PORT = config.port;

app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${config.nodeEnv}`);
    console.log(`🔗 API URL: http://localhost:${PORT}/api`);
    console.log(`💚 Health Check: http://localhost:${PORT}/api/health\n`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
    process.exit(1);
});

module.exports = app;
