/**
 * ========================================
 * EduCracker AI Routes
 * API endpoints for ChatGPT integration
 * ========================================
 */

const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const { checkAILimit, incrementUsage, getUserPlan, PLAN_LIMITS } = require('../services/subscriptionService');
const { authenticate, optionalAuth } = require('../middleware/authMiddleware');

// Middleware to check if API key is configured
const checkApiKey = (req, res, next) => {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey || apiKey === '' || apiKey === 'your_openai_api_key_here') {
    return res.status(503).json({
      success: false,
      error: 'AI service is not available',
      code: 'AI_SERVICE_UNAVAILABLE',
      message: 'OpenAI API key is not configured. Please contact the administrator or add your API key to enable AI features.',
      details: 'The AI question generation feature requires an OpenAI API key to be configured on the server.'
    });
  }
  next();
};

// Middleware to check user plan and usage limits
const checkUsageLimit = async (req, res, next) => {
  // Get user ID from authenticated request
  const userId = req.userId;
  
  if (!userId) {
    // No user - require authentication
    return res.status(401).json({
      success: false,
      error: 'Authentication required',
      code: 'AUTH_REQUIRED',
      message: 'Please login to use AI features.'
    });
  }

  try {
    const limitCheck = await checkAILimit(userId, 'aiNotesPerDay');
    
    if (!limitCheck.allowed && !limitCheck.isPro) {
      return res.status(403).json({
        success: false,
        error: 'Daily limit reached',
        code: 'DAILY_LIMIT_REACHED',
        message: 'You\'ve used your free AI notes for today. Upgrade to Pro for unlimited access!',
        upgradePrompt: true,
        usage: {
          used: limitCheck.used,
          limit: limitCheck.limit,
          remaining: limitCheck.remaining
        },
        pricing: {
          monthly: 49,
          yearly: 299,
          savings: '49%'
        }
      });
    }

    // Store limit info for later use
    req.usageLimit = limitCheck;
    next();
  } catch (error) {
    console.error('Error checking usage limit:', error);
    next(); // Allow through on error
  }
};

// Get AI service status and user usage
// GET /api/ai/status
router.get('/status', optionalAuth, async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const apiKeyConfigured = apiKey && 
                          apiKey !== '' && 
                          apiKey !== 'your_openai_api_key_here';

  // Get user ID from authenticated request
  const userId = req.userId;
  let usageInfo = null;

  if (userId) {
    try {
      usageInfo = await getUserPlan(parseInt(userId));
    } catch (e) {
      console.error('Error getting user plan:', e);
    }
  }

  res.json({
    success: true,
    data: {
      available: apiKeyConfigured,
      status: apiKeyConfigured ? 'ready' : 'not_configured',
      message: apiKeyConfigured 
        ? (usageInfo?.isPro ? 'Pro member - Unlimited access' : 'AI service is ready') 
        : 'OpenAI API key is not configured. Contact administrator to enable AI features.',
      user: usageInfo || {
        plan: 'FREE',
        isPro: false,
        usage: {
          aiNotes: { used: 0, limit: PLAN_LIMITS.FREE.aiNotesPerDay },
          mockTests: { used: 0, limit: PLAN_LIMITS.FREE.mockTestsPerDay }
        }
      },
      features: {
        questions: apiKeyConfigured,
        notes: apiKeyConfigured,
        mockTest: apiKeyConfigured,
        assist: apiKeyConfigured,
        studyPlan: apiKeyConfigured
      }
    }
  });
});

// Generate practice questions
// POST /api/ai/questions
router.post('/questions', checkApiKey, checkUsageLimit, async (req, res) => {
  try {
    const { topic, classLevel, numQuestions, questionType, board } = req.body;

    if (!topic || !classLevel) {
      return res.status(400).json({
        success: false,
        error: 'Topic and class level are required'
      });
    }

    const questions = await aiService.generateQuestions(
      topic,
      classLevel,
      numQuestions || 10,
      questionType || 'multiple_choice',
      board || 'CBSE'
    );

    // Track usage for non-PRO users
    const userId = req.body.userId;
    if (userId && req.usageLimit && !req.usageLimit.isPro) {
      await incrementUsage(userId, 'aiNotesPerDay');
    }

    res.json({
      success: true,
      data: questions,
      usage: req.usageLimit ? {
        used: (req.usageLimit.used || 0) + 1,
        limit: req.usageLimit.limit,
        remaining: req.usageLimit.remaining - 1
      } : null
    });
  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Generate study notes
// POST /api/ai/notes
router.post('/notes', checkApiKey, async (req, res) => {
  try {
    const { topic, classLevel, board } = req.body;

    if (!topic || !classLevel) {
      return res.status(400).json({
        success: false,
        error: 'Topic and class level are required'
      });
    }

    const notes = await aiService.generateNotes(topic, classLevel, board || 'CBSE');

    res.json({
      success: true,
      data: notes
    });
  } catch (error) {
    console.error('Error generating notes:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Generate mock test
// POST /api/ai/mock-test
router.post('/mock-test', checkApiKey, async (req, res) => {
  try {
    const { subject, classLevel, numQuestions, board } = req.body;

    if (!subject || !classLevel) {
      return res.status(400).json({
        success: false,
        error: 'Subject and class level are required'
      });
    }

    const test = await aiService.generateMockTest(
      subject,
      classLevel,
      numQuestions || 20,
      board || 'CBSE'
    );

    res.json({
      success: true,
      data: test
    });
  } catch (error) {
    console.error('Error generating mock test:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get AI tutoring assistance
// POST /api/ai/assist
router.post('/assist', checkApiKey, async (req, res) => {
  try {
    const { question, context } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        error: 'Question is required'
      });
    }

    const assistance = await aiService.getAIAssistance(question, context);

    res.json({
      success: true,
      data: assistance
    });
  } catch (error) {
    console.error('Error getting AI assistance:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Generate study plan
// POST /api/ai/study-plan
router.post('/study-plan', checkApiKey, async (req, res) => {
  try {
    const { studentLevel, targetGoals, availableTime } = req.body;

    if (!studentLevel || !targetGoals || !availableTime) {
      return res.status(400).json({
        success: false,
        error: 'Student level, target goals, and available time are required'
      });
    }

    const studyPlan = await aiService.generateStudyPlan(
      studentLevel,
      targetGoals,
      availableTime
    );

    res.json({
      success: true,
      data: studyPlan
    });
  } catch (error) {
    console.error('Error generating study plan:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
