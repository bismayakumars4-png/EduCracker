/**
 * ========================================
 * EduCracker - Authentication Middleware
 * Middleware to verify JWT tokens and extract user information
 * ========================================
 */

const jwt = require('jsonwebtoken');

/**
 * Authentication middleware
 * Verifies JWT token from Authorization header and attaches user to request
 */
const authenticate = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required. Please login.'
            });
        }

        // Extract token from "Bearer <token>" format
        const token = authHeader.startsWith('Bearer ')
            ? authHeader.slice(7)
            : authHeader;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided. Please login.'
            });
        }

        // Verify the token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'default_secret'
        );

        // Attach user ID to request
        req.userId = decoded.userId;
        req.userEmail = decoded.email;

        next();
    } catch (error) {
        console.error('[Auth Middleware] Token verification error:', error.message);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired. Please login again.'
            });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Please login.'
            });
        }

        return res.status(401).json({
            success: false,
            message: 'Authentication failed. Please login.'
        });
    }
};

/**
 * Optional authentication middleware
 * Attaches user if token is provided, but doesn't require it
 * Use this for routes that can work with or without authentication
 */
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            req.userId = null;
            return next();
        }

        const token = authHeader.startsWith('Bearer ')
            ? authHeader.slice(7)
            : authHeader;

        if (!token) {
            req.userId = null;
            return next();
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'default_secret'
        );

        req.userId = decoded.userId;
        req.userEmail = decoded.email;
        next();
    } catch (error) {
        // If token is invalid, just continue without user
        req.userId = null;
        next();
    }
};

module.exports = {
    authenticate,
    optionalAuth
};
