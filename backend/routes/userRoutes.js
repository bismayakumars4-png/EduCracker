/**
 * ========================================
 * EduCracker - User Routes
 * API endpoints for user profile, plan, and settings
 * ========================================
 */

const express = require('express');
const router = express.Router();
const { prisma } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { authenticate } = require('../middleware/authMiddleware');

// ========================================
// POST /api/user/register
// Register a new user
// ========================================
router.post('/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName, role } = req.body;

        // Validate required fields
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ 
                success: false,
                message: 'Please provide all required fields' 
            });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: 'User with this email already exists' 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role: role || 'STUDENT'
            }
        });

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error('[User Routes] Registration error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Registration failed. Please try again.' 
        });
    }
});

// ========================================
// POST /api/user/login
// Login user
// ========================================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'Please provide email and password' 
            });
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid email or password' 
            });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid email or password' 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        // Update last active date (skip if field doesn't exist in schema)
        // await prisma.user.update({
        //     where: { id: user.id },
        //     data: { lastActiveDate: new Date() }
        // });

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                plan: user.plan
            }
        });
    } catch (error) {
        console.error('[User Routes] Login error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Login failed. Please try again.' 
        });
    }
});

// ========================================
// GET /api/user/profile
// Get current user profile
// ========================================
router.get('/profile', authenticate, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                avatar: true,
                role: true,
                plan: true,
                planExpiresAt: true,
                createdAt: true
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate initials from name
        const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

        // Format response
        res.json({
            name: `${user.firstName} ${user.lastName}`,
            role: user.role || 'Student',
            plan: user.plan || 'free',
            avatarInitials: initials
        });
    } catch (error) {
        console.error('[User Routes] Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// ========================================
// GET /api/user/plan
// Get user subscription plan status
// ========================================
router.get('/plan', authenticate, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: {
                plan: true,
                planExpiresAt: true
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if plan is active
        let isActive = false;
        let planStatus = 'free';

        if (user.plan === 'PRO') {
            if (user.planExpiresAt && new Date(user.planExpiresAt) > new Date()) {
                isActive = true;
                planStatus = 'premium';
            } else if (!user.planExpiresAt) {
                // No expiration means lifetime pro
                isActive = true;
                planStatus = 'premium';
            }
        }

        // Format expiration date
        const expires = user.planExpiresAt 
            ? new Date(user.planExpiresAt).toISOString().split('T')[0]
            : null;

        res.json({
            plan: planStatus,
            expires: expires
        });
    } catch (error) {
        console.error('[User Routes] Error fetching plan:', error);
        res.status(500).json({ error: 'Failed to fetch plan' });
    }
});

// ========================================
// PUT /api/user/profile
// Update user profile
// ========================================
router.put('/profile', authenticate, async (req, res) => {
    try {
        const { firstName, lastName, avatar } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id: req.userId },
            data: {
                firstName: firstName,
                lastName: lastName,
                avatar: avatar
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                avatar: true
            }
        });

        res.json({
            success: true,
            user: updatedUser
        });
    } catch (error) {
        console.error('[User Routes] Error updating profile:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// ========================================
// Google OAuth Routes
// ========================================

// GET /api/user/auth/google
// Initiate Google OAuth flow
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// GET /api/user/auth/google/callback
// Handle Google OAuth callback
router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login.html?error=google_auth_failed' }),
    async (req, res) => {
        try {
            // Generate JWT token for the user
            const token = jwt.sign(
                { userId: req.user.id, email: req.user.email },
                process.env.JWT_SECRET || 'default_secret',
                { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
            );

            // Redirect to frontend with token
            const frontendUrl = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' 
                ? 'https://your-app.onrender.com' 
                : 'http://localhost:3000');
            res.redirect(`${frontendUrl}/dashboard.html?token=${token}&googleAuth=true`);
        } catch (error) {
            console.error('[Google OAuth Callback] Error:', error);
            res.redirect('/login.html?error=auth_failed');
        }
    }
);

// GET /api/user/auth/google/current
// Get current user info for Google-authenticated users
router.get('/auth/google/current', authenticate, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                googleId: true,
                avatar: true,
                role: true,
                plan: true
            }
        });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            user,
            isGoogleUser: !!user.googleId
        });
    } catch (error) {
        console.error('[Google Current User] Error:', error);
        res.status(500).json({ success: false, message: 'Failed to get user info' });
    }
});

module.exports = router;
