/**
 * ========================================
 * EduCracker Subscription Routes
 * API endpoints for user subscription management
 * ========================================
 */

const express = require('express');
const router = express.Router();
const { 
  getUserPlan, 
  upgradeToPro, 
  downgradeToFree,
  checkFeatureAccess,
  PLAN_LIMITS
} = require('../services/subscriptionService');

// Get current user's subscription status
// GET /api/subscription/status?userId=1
router.get('/status', async (req, res) => {
  try {
    const userId = req.query.userId;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    const planStatus = await getUserPlan(parseInt(userId));

    res.json({
      success: true,
      data: planStatus
    });
  } catch (error) {
    console.error('Error getting subscription status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get subscription status'
    });
  }
});

// Upgrade user to Pro plan
// POST /api/subscription/upgrade
router.post('/upgrade', async (req, res) => {
  try {
    const { userId, planType = 'PRO', duration = 365 } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    // Calculate expiry date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + duration);

    const updatedUser = await upgradeToPro(parseInt(userId), expiresAt);

    res.json({
      success: true,
      message: 'Successfully upgraded to Pro plan',
      data: {
        userId: updatedUser.id,
        plan: updatedUser.plan,
        expiresAt: updatedUser.planExpiresAt
      }
    });
  } catch (error) {
    console.error('Error upgrading subscription:', error(500).json);
    res.status({
      success: false,
      error: 'Failed to upgrade subscription'
    });
  }
});

// Downgrade user to Free plan
// POST /api/subscription/downgrade
router.post('/downgrade', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    const updatedUser = await downgradeToFree(parseInt(userId));

    res.json({
      success: true,
      message: 'Successfully downgraded to Free plan',
      data: {
        userId: updatedUser.id,
        plan: updatedUser.plan
      }
    });
  } catch (error) {
    console.error('Error downgrading subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to downgrade subscription'
    });
  }
});

// Check feature access
// GET /api/subscription/feature?userId=1&feature=examBooster
router.get('/feature', async (req, res) => {
  try {
    const { userId, feature } = req.query;

    if (!userId || !feature) {
      return res.status(400).json({
        success: false,
        error: 'User ID and feature are required'
      });
    }

    const access = await checkFeatureAccess(parseInt(userId), feature);

    res.json({
      success: true,
      data: access
    });
  } catch (error) {
    console.error('Error checking feature access:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check feature access'
    });
  }
});

// Get plan limits (public endpoint)
// GET /api/subscription/limits
router.get('/limits', (req, res) => {
  res.json({
    success: true,
    data: PLAN_LIMITS
  });
});

module.exports = router;
