/**
 * ========================================
 * EduCracker Backend Server
 * Express.js Server with Hardening
 * ========================================
 */

// Suppress Node.js deprecation warnings
process.on('warning', (warning) => {
    if (warning.name === 'DeprecationWarning' && 
        (warning.code === 'DEP0169' || warning.code === 'DEP0040')) {
        return; // Suppress specific deprecation warnings
    }
});

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

// Load Passport configuration
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

// ========================================
// Passport.js Initialization for Google OAuth
// ========================================
app.use(passport.initialize());

// Session configuration
// Note: For production, consider using connect-mongo or connect-redis for session storage
// to prevent memory leaks and enable scaling across multiple processes
app.use(session({
    secret: process.env.JWT_SECRET || 'educracker_session_secret',
    resave: false,
    saveUninitialized: false,
    name: 'educracker.sid',
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true,
        sameSite: 'lax'
    }
}));

app.use(passport.session());

// ========================================
// Static Files Serving (Frontend)
// ========================================

// Serve frontend static files
app.use('/static', express.static(path.join(__dirname, '../frontend'), {
    maxAge: '1h',
    etag: true,
    fallthrough: true
}));

// Also serve frontend at root for direct access
app.use(express.static(path.join(__dirname, '../frontend'), {
    index: ['index.html', 'index.htm'],
    maxAge: '1h',
    etag: true
}));

// ========================================
// Middleware
// ========================================

// ========================================
// CORS Configuration - Dynamic based on environment
// ========================================
const corsOptions = {
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        // In production, strictly check against allowed origins
        const allowedOrigins = [
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'http://localhost:5000',
            'http://localhost:10000',
            process.env.FRONTEND_URL
        ].filter(Boolean);
        
        // In production, only allow defined origins
        if (process.env.NODE_ENV === 'production') {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.log('[CORS] Rejected origin:', origin);
                callback(new Error('Not allowed by CORS'));
            }
        } else {
            // In development, allow all origins for easier testing
            callback(null, true);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
    console.log(`[Server] ${req.method} ${req.path}`);
    next();
});

// ========================================
// Routes
// ========================================

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        service: 'EduCracker API',
        timestamp: new Date().toISOString()
    });
});

// API info
app.get('/api', (req, res) => {
    res.json({
        name: 'EduCracker API',
        version: '1.0.0',
        description: 'Backend API for EduCracker Exam Platform'
    });
});

// Test route
app.get('/test', (req, res) => {
    res.send('OK');
});

// Serve frontend pages from pages folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/index.html'));
});

// ========================================
// Serve individual HTML pages from pages folder
// ========================================

const pages = [
    'login', 'register', 'index', 'dashboard', 'tests', 'pricing',
    'take-test', 'test-instructions', 'test-result', 'notes',
    'questions', 'analytics', 'leaderboard', 'achievements',
    'profile', 'settings', 'schedule', 'bookmarks', 'results', 'help',
    // New pages added
    'syllabus', 'formulas', 'flashcards', 'previous-papers', 'sample-papers'
];

pages.forEach(page => {
    app.get(`/${page}.html`, (req, res) => {
        res.sendFile(path.join(__dirname, `../frontend/pages/${page}.html`));
    });
});

// Load database module
const { testConnection } = require('./db');

// Test routes
app.use('/api/tests', require('./routes/testRoutes'));

// Dashboard routes
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// User routes
app.use('/api/user', require('./routes/userRoutes'));

// AI routes (ChatGPT integration)
app.use('/api/ai', require('./routes/aiRoutes'));

// Subscription routes
app.use('/api/subscription', require('./routes/subscriptionRoutes'));

// Payment routes (Stripe integration)
app.use('/api/payment', require('./routes/paymentRoutes'));

// Syllabus routes (Board & Exam preparation)
app.use('/api/syllabus', require('./routes/syllabusRoutes'));

// Smart Learning routes (weak areas, progress tracking)
app.use('/api/learning', require('./routes/learningRoutes'));

// Google Drive routes
app.use('/api/google', require('./routes/googleDriveRoutes'));

// Google Classroom routes
app.use('/api/classroom', require('./routes/googleClassroomRoutes'));

// Practice routes (flashcards, questions, quick practice)
app.use('/api/practice', require('./routes/practiceRoutes'));

// ========================================
// Error Handlers
// ========================================

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('[Server] Error:', err);
    const message = process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : err.message;
    res.status(err.status || 500).json({
        error: err.name || 'Error',
        message: message
    });
});

// ========================================
// Start Server
// ========================================

async function startServer() {
    console.log('\n========================================');
    console.log('   EduCracker Backend Server');
    console.log('========================================\n');
    
    // Test database connection
    console.log('[Server] Testing database connection...');
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
        console.warn('[Server] ⚠ Database connection failed - starting anyway (read-only mode)');
    }
    
    // Start HTTP server
    const serverUrl = process.env.NODE_ENV === 'production' 
        ? `https://${process.env.RENDER_EXTERNAL_URL || 'your-app.onrender.com'}`
        : `http://localhost:${PORT}`;
    
    app.listen(PORT, () => {
        console.log('\n========================================');
        console.log('   Server Started Successfully!');
        console.log('========================================');
        console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`[Server] Server URL:  ${serverUrl}`);
        console.log(`[Server] API URL:    ${serverUrl}/api`);
        console.log(`[Server] Health:     ${serverUrl}/api/health`);
        console.log('========================================\n');
    });
}

startServer();

module.exports = app;
