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
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // In development, be extremely permissive to avoid connection errors
        if (config.nodeEnv === 'development') {
            return callback(null, true);
        }

        const envOrigins = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : [];
        const allowedOrigins = [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            ...envOrigins,
            'https://college-portal-frontend-chi.vercel.app'
        ];

        // Check if origin matches any allowed origin (handling trailing slashes and trimming)
        const isAllowed = allowedOrigins.some(allowed => {
            if (!allowed) return false;
            const cleanAllowed = allowed.trim();
            return origin === cleanAllowed || origin === cleanAllowed + '/';
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Body parser - Parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging (EVERY REQUEST in development)
if (config.nodeEnv === 'development') {
    app.use((req, res, next) => {
        console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
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

// Root route for easy verification
app.get('/', (req, res) => {
    res.send('College Portal API is Running 🚀');
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

const HOST = '127.0.0.1'; // Bind specifically to 127.0.0.1 for proxy consistency

app.listen(PORT, HOST, () => {
    console.log(`\n🚀 Server running on http://127.0.0.1:${PORT}`);
    console.log(`📍 Environment: ${config.nodeEnv}`);
    console.log(`🔗 API URL: http://${HOST}:${PORT}/api`);
    console.log(`💚 Health Check: http://${HOST}:${PORT}/api/health\n`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
    process.exit(1);
});

module.exports = app;
