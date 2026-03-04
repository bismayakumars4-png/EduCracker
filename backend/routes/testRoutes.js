/**
 * ========================================
 * EduCracker Test Routes
 * Handles test submission and results
 * ========================================
 */

const express = require('express');
const router = express.Router();
const { prisma } = require('../db');

// POST /api/tests/submit
// Submit test results and save to database
router.post('/submit', async (req, res) => {
    try {
        console.log('[TestRoute] Received test submission request');
        console.log('[TestRoute] Body:', req.body);

        // Extract data from request body
        const { testId, score, totalQuestions, percentage, timeTaken } = req.body;

        // Validate required fields
        if (!testId || score === undefined || !totalQuestions || percentage === undefined || !timeTaken) {
            console.log('[TestRoute] Validation failed: Missing required fields');
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: testId, score, totalQuestions, percentage, timeTaken'
            });
        }

        // Get userId from request (could be from auth middleware or as a field)
        // For now, we'll accept userId in body or use a default test user
        let userId = req.body.userId;

        // If no userId provided, try to get from auth header or use a mock
        if (!userId) {
            // Try to get from authorization header (Bearer token could contain user info)
            const authHeader = req.headers.authorization;
            console.log('[TestRoute] No userId in body, checking headers:', authHeader ? 'Present' : 'Not present');

            // For demo purposes, create or get a test user
            // In production, this would come from proper JWT authentication
            try {
                // Check if we have any users, if not create a demo user
                const existingUsers = await prisma.user.findFirst({
                    where: { role: 'STUDENT' }
                });

                if (existingUsers) {
                    userId = existingUsers.id;
                    console.log('[TestRoute] Using existing student user:', userId);
                } else {
                    // Create a demo student user
                    const newUser = await prisma.user.create({
                        data: {
                            email: 'demo@educracker.com',
                            password: '$2a$10$demo', // Placeholder - in production would be hashed
                            firstName: 'Demo',
                            lastName: 'Student',
                            role: 'STUDENT'
                        }
                    });
                    userId = newUser.id;
                    console.log('[TestRoute] Created demo user:', userId);
                }
            } catch (userError) {
                console.log('[TestRoute] Error handling user:', userError.message);
                // Use a default userId of 1 for fallback
                userId = 1;
            }
        }

        console.log('[TestRoute] Saving test result for user:', userId);

        // Create test result record
        const testResult = await prisma.testResult.create({
            data: {
                userId: userId,
                testId: String(testId),
                score: parseInt(score),
                totalQuestions: parseInt(totalQuestions),
                percentage: parseFloat(percentage),
                timeTaken: parseInt(timeTaken)
            }
        });

        console.log('[TestRoute] Test result saved successfully:', testResult.id);

        // Return success response
        res.status(201).json({
            success: true,
            message: 'Test result saved successfully',
            data: {
                id: testResult.id,
                testId: testResult.testId,
                score: testResult.score,
                percentage: testResult.percentage,
                createdAt: testResult.createdAt
            }
        });

    } catch (error) {
        console.error('[TestRoute] Error saving test result:', error);
        
        // Return error response
        res.status(500).json({
            success: false,
            message: 'Failed to save test result',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// GET /api/tests/results
// Get all test results for a user
router.get('/results', async (req, res) => {
    try {
        console.log('[TestRoute] Getting test results');

        // Get userId from query params or body
        const userId = req.query.userId || req.body.userId || 1;

        const results = await prisma.testResult.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { createdAt: 'desc' },
            take: 50 // Limit to recent 50 results
        });

        console.log('[TestRoute] Found results:', results.length);

        res.json({
            success: true,
            data: results
        });

    } catch (error) {
        console.error('[TestRoute] Error getting results:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get test results',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// GET /api/tests/results/:id
// Get a specific test result
router.get('/results/:id', async (req, res) => {
    try {
        const resultId = parseInt(req.params.id);
        
        const result = await prisma.testResult.findUnique({
            where: { id: resultId }
        });

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Test result not found'
            });
        }

        res.json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error('[TestRoute] Error getting result:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get test result'
        });
    }
});

// GET /api/tests/recent
// Get recent test results for dashboard
router.get('/recent', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const userId = req.query.userId || 1;
        
        const recentTests = await prisma.testResult.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { createdAt: 'desc' },
            take: limit
        });

        // Map to response format with subject, score, date, accuracy
        const tests = recentTests.map(test => ({
            subject: test.testId || 'General',
            score: Math.round(test.percentage),
            date: new Date(test.createdAt).toISOString().split('T')[0],
            accuracy: Math.round(test.percentage)
        }));

        res.json(tests);
    } catch (error) {
        console.error('[TestRoute] Error getting recent tests:', error);
        res.json([]);
    }
});

module.exports = router;
