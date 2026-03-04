/**
 * ========================================
 * EduCracker Subscription Service
 * Handles user plan management and usage tracking
 * ========================================
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Plan limits configuration
const PLAN_LIMITS = {
  FREE: {
    aiNotesPerDay: 2,
    mockTestsPerDay: 1,
    importantQuestions: false,
    examBooster: false,
    advancedAnalytics: false,
    priorityAI: false
  },
  PRO: {
    aiNotesPerDay: -1, // unlimited
    mockTestsPerDay: -1, // unlimited
    importantQuestions: true,
    examBooster: true,
    advancedAnalytics: true,
    priorityAI: true
  }
};

/**
 * Check if user has reached their daily limit for AI notes
 */
async function checkAILimit(userId, feature) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    return { allowed: false, reason: 'User not found' };
  }

  // Check if user has PRO plan
  if (user.plan === 'PRO') {
    const limits = PLAN_LIMITS.PRO;
    return {
      allowed: true,
      isPro: true,
      limit: limits[feature],
      remaining: -1
    };
  }

  // Check if daily reset is needed
  const now = new Date();
  const resetTime = user.aiNotesResetAt || now;
  
  // Reset if it's a new day
  if (now.toDateString() !== resetTime.toDateString()) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        aiNotesUsedToday: 0,
        aiNotesResetAt: now,
        mockTestsUsedToday: 0,
        mockTestsResetAt: now
      }
    });
    user.aiNotesUsedToday = 0;
    user.mockTestsUsedToday = 0;
  }

  const limits = PLAN_LIMITS.FREE;
  const limit = limits[feature];
  
  let used = 0;
  if (feature === 'aiNotesPerDay') {
    used = user.aiNotesUsedToday || 0;
  } else if (feature === 'mockTestsPerDay') {
    used = user.mockTestsUsedToday || 0;
  }

  const remaining = limit - used;
  const allowed = remaining > 0;

  return {
    allowed,
    isPro: false,
    limit,
    used,
    remaining: Math.max(0, remaining)
  };
}

/**
 * Increment usage count for a feature
 */
async function incrementUsage(userId, feature) {
  const updateData = {};
  
  if (feature === 'aiNotesPerDay') {
    updateData.aiNotesUsedToday = { increment: 1 };
  } else if (feature === 'mockTestsPerDay') {
    updateData.mockTestsUsedToday = { increment: 1 };
  }

  await prisma.user.update({
    where: { id: userId },
    data: updateData
  });
}

/**
 * Get user's current plan status
 */
async function getUserPlan(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    return null;
  }

  const plan = user.plan || 'FREE';
  const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.FREE;
  
  return {
    plan,
    isPro: plan === 'PRO',
    expiresAt: user.planExpiresAt,
    usage: {
      aiNotes: {
        used: user.aiNotesUsedToday || 0,
        limit: limits.aiNotesPerDay,
        resetAt: user.aiNotesResetAt
      },
      mockTests: {
        used: user.mockTestsUsedToday || 0,
        limit: limits.mockTestsPerDay,
        resetAt: user.mockTestsResetAt
      }
    },
    features: {
      importantQuestions: limits.importantQuestions,
      examBooster: limits.examBooster,
      advancedAnalytics: limits.advancedAnalytics,
      priorityAI: limits.priorityAI
    }
  };
}

/**
 * Upgrade user to PRO plan
 */
async function upgradeToPro(userId, expiresAt = null) {
  const expiryDate = expiresAt || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year default
  
  return await prisma.user.update({
    where: { id: userId },
    data: {
      plan: 'PRO',
      planExpiresAt: expiryDate
    }
  });
}

/**
 * Downgrade user to FREE plan
 */
async function downgradeToFree(userId) {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      plan: 'FREE',
      planExpiresAt: null
    }
  });
}

/**
 * Check if user can access a premium feature
 */
async function checkFeatureAccess(userId, feature) {
  const planStatus = await getUserPlan(userId);
  
  if (!planStatus) {
    return { allowed: false, reason: 'User not found' };
  }

  if (planStatus.isPro) {
    return { allowed: true, isPro: true };
  }

  // For free users, check feature availability
  const features = PLAN_LIMITS.FREE;
  const allowed = features[feature] === true;

  return {
    allowed,
    isPro: false,
    reason: allowed ? null : 'Premium feature - Upgrade to Pro'
  };
}

module.exports = {
  PLAN_LIMITS,
  checkAILimit,
  incrementUsage,
  getUserPlan,
  upgradeToPro,
  downgradeToFree,
  checkFeatureAccess
};
