<<<<<<< HEAD
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

        // In development, be extremely permissive
        if (config.nodeEnv === 'development') {
            return callback(null, true);
        }

        const envOrigins = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : [];
        const allowedOrigins = [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            ...envOrigins,
            'https://college-portal-frontend-chi.vercel.app',
            /\.vercel\.app$/ // Allow all vercel subdomains for convenience
        ];

        // Check if origin matches any allowed origin or pattern
        const isAllowed = allowedOrigins.some(allowed => {
            if (!allowed) return false;
            if (allowed instanceof RegExp) return allowed.test(origin);
            const cleanAllowed = allowed.trim();
            return origin === cleanAllowed || origin === cleanAllowed + '/';
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            console.warn('CORS Blocked Origin:', origin);
            // In production, we might want to be strict, but for debugging let's allow and log
            callback(null, true);
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

// Basic Health Check (both at / and /api/health)
app.get('/health', (req, res) => {
    res.json({ success: true, message: 'Server is healthy', timestamp: new Date() });
});

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv
    });
});

// Root route
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

// Attendance routes
const attendanceRoutes = require('./src/routes/attendanceRoutes');
app.use('/api/attendance', attendanceRoutes);

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

// Only start the server if we're not being imported (e.g. by Vercel's runner)
if (require.main === module) {
    const HOST = '0.0.0.0';
    app.listen(PORT, HOST, () => {
        console.log(`\n🚀 Server running on http://${HOST}:${PORT}`);
        console.log(`📍 Environment: ${config.nodeEnv}`);
        console.log(`🔗 API URL: http://${HOST}:${PORT}/api`);
        console.log(`💚 Health Check: http://${HOST}:${PORT}/api/health\n`);
    });
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
    // Do not call process.exit(1) on Vercel
});

module.exports = app;
=======
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

        // In development, be extremely permissive
        if (config.nodeEnv === 'development') {
            return callback(null, true);
        }

        const envOrigins = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : [];
        const allowedOrigins = [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            ...envOrigins,
            'https://college-portal-frontend-chi.vercel.app',
            /\.vercel\.app$/ // Allow all vercel subdomains for convenience
        ];

        // Check if origin matches any allowed origin or pattern
        const isAllowed = allowedOrigins.some(allowed => {
            if (!allowed) return false;
            if (allowed instanceof RegExp) return allowed.test(origin);
            const cleanAllowed = allowed.trim();
            return origin === cleanAllowed || origin === cleanAllowed + '/';
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            console.warn('CORS Blocked Origin:', origin);
            // In production, we might want to be strict, but for debugging let's allow and log
            callback(null, true);
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

// Basic Health Check (both at / and /api/health)
app.get('/health', (req, res) => {
    res.json({ success: true, message: 'Server is healthy', timestamp: new Date() });
});

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv
    });
});

// Root route
app.get('/', (req, res) => {
    res.send('College Portal API is Running 🚀');
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Booking routes
app.use('/api/bookings', bookingRoutes);

// Chatbot routes
const chatbotRoutes = require('./src/routes/chatbotRoutes');
app.use('/api/chatbot', chatbotRoutes);

// Announcement routes
const announcementRoutes = require('./src/routes/announcementRoutes');
app.use('/api/announcements', announcementRoutes);

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

// Only start the server if we're not being imported (e.g. by Vercel's runner)
if (require.main === module) {
    const HOST = '0.0.0.0';
    app.listen(PORT, HOST, () => {
        console.log(`\n🚀 Server running on http://${HOST}:${PORT}`);
        console.log(`📍 Environment: ${config.nodeEnv}`);
        console.log(`🔗 API URL: http://${HOST}:${PORT}/api`);
        console.log(`💚 Health Check: http://${HOST}:${PORT}/api/health\n`);
    });
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
    // Do not call process.exit(1) on Vercel
});

module.exports = app;
>>>>>>> 44e402835893a3db949a00e413ee26ac861db95f
