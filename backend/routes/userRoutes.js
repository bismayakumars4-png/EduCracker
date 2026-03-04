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
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure Passport Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'your_google_client_id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your_google_client_secret',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/user/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let user = await prisma.user.findUnique({
        where: { email: profile.emails[0].value }
      });

      if (user) {
        // Update user with Google ID if not already set
        if (!user.googleId) {
          user = await prisma.user.update({
            where: { id: user.id },
            data: { googleId: profile.id }
          });
        }
        return done(null, user);
      }

      // Create new user with Google profile
      const nameParts = profile.displayName.split(' ');
      const firstName = nameParts[0] || 'Google';
      const lastName = nameParts.slice(1).join(' ') || 'User';

      user = await prisma.user.create({
        data: {
          email: profile.emails[0].value,
          googleId: profile.id,
          firstName: firstName,
          lastName: lastName,
          // No password for Google users
          role: 'STUDENT'
        }
      });

      return done(null, user);
    } catch (error) {
      console.error('[Google OAuth] Error:', error);
      return done(error, null);
    }
  }
));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

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

        // Check if user is a Google OAuth user (no password)
        if (!user.password) {
            return res.status(401).json({ 
                success: false,
                message: 'Please sign in with Google' 
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
// Mock User ID (in production, get from session/token)
// ========================================
const MOCK_USER_ID = 1;

// ========================================
// GET /api/user/profile
// Get current user profile
// ========================================
router.get('/profile', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: MOCK_USER_ID },
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
router.get('/plan', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: MOCK_USER_ID },
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
router.put('/profile', async (req, res) => {
    try {
        const { firstName, lastName, avatar } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id: MOCK_USER_ID },
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
// GET /api/user/auth/google
// Initiate Google OAuth flow
// ========================================
router.get('/auth/google', passport.authenticate('google', { 
    scope: ['profile', 'email'] 
}));

// ========================================
// GET /api/user/auth/google/callback
// Google OAuth callback handler
// ========================================
router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login?error=google_auth_failed' }),
    async (req, res) => {
        try {
            const user = req.user;
            
            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET || 'default_secret',
                { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
            );

            // Redirect to frontend with token
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
            res.redirect(`${frontendUrl}/pages/dashboard.html?token=${token}&googleAuth=true`);
        } catch (error) {
            console.error('[Google OAuth Callback] Error:', error);
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
            res.redirect(`${frontendUrl}/pages/login.html?error=auth_failed`);
        }
    }
);

// ========================================
// POST /api/user/auth/google/token
// Verify Google ID token (for frontend token-based auth)
// ========================================
router.post('/auth/google/token', async (req, res) => {
    try {
        const { googleToken } = req.body;

        if (!googleToken) {
            return res.status(400).json({ 
                success: false,
                message: 'Google token is required' 
            });
        }

        // Note: In production, verify the Google token using Google's OAuth2 API
        // For simplicity, we'll create a mock verification here
        // In production, use google-auth-library to verify the token
        
        // For now, we'll return a placeholder that requires proper token verification
        // You would need to install and use 'google-auth-library' package
        res.status(501).json({
            success: false,
            message: 'Token verification not implemented. Please use OAuth flow.'
        });
    } catch (error) {
        console.error('[Google Token Auth] Error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Authentication failed' 
        });
    }
});

module.exports = router;
