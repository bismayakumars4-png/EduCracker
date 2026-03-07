/**
 * ========================================
 * EduCracker Payment Service
 * Handles Stripe payment gateway integration
 * ========================================
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Plan pricing configuration (in INR - paise)
const PLANS = {
  MONTHLY: {
    name: 'Monthly Plan',
    priceId: process.env.STRIPE_MONTHLY_PRICE_ID,
    amount: 4900, // ₹49 in paise
    interval: 'month'
  },
  YEARLY: {
    name: 'Yearly Plan',
    priceId: process.env.STRIPE_YEARLY_PRICE_ID,
    amount: 39900, // ₹399 in paise (save 33%)
    interval: 'year'
  }
};

/**
 * Create a Stripe checkout session for payment
 */
async function createCheckoutSession(userId, planType = 'MONTHLY') {
  const plan = PLANS[planType];
  
  if (!plan) {
    throw new Error('Invalid plan type');
  }

  // Get user details
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Create Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: `EduCracker ${plan.name}`,
            description: `Premium subscription - ${plan.interval} access to all Pro features`,
            images: ['https://educracker.com/logo.png']
          },
          unit_amount: plan.amount,
          recurring: {
            interval: plan.interval
          }
        },
        quantity: 1
      }
    ],
    mode: 'subscription',
    success_url: `${process.env.FRONTEND_URL}/pricing.html?payment=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/pricing.html?payment=cancelled`,
    customer_email: user.email,
    metadata: {
      userId: userId.toString(),
      planType: planType
    }
  });

  return {
    sessionId: session.id,
    url: session.url
  };
}

/**
 * Create a Stripe customer for a user
 */
async function createCustomer(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Check if customer already exists
  if (user.stripeCustomerId) {
    return user.stripeCustomerId;
  }

  // Create new Stripe customer
  const customer = await stripe.customers.create({
    email: user.email,
    name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
    metadata: {
      userId: userId.toString()
    }
  });

  // Save customer ID to user record
  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id }
  });

  return customer.id;
}

/**
 * Retrieve subscription details from Stripe
 */
async function getSubscription(subscriptionId) {
  return await stripe.subscriptions.retrieve(subscriptionId);
}

/**
 * Cancel a Stripe subscription
 */
async function cancelSubscription(subscriptionId) {
  return await stripe.subscriptions.cancel(subscriptionId);
}

/**
 * Create a customer portal session for managing subscriptions
 */
async function createPortalSession(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user || !user.stripeCustomerId) {
    throw new Error('Customer not found');
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${process.env.FRONTEND_URL}/pricing.html`
  });

  return {
    url: session.url
  };
}

/**
 * Handle successful payment webhook
 */
async function handlePaymentSuccess(metadata, subscriptionId) {
  const userId = parseInt(metadata.userId);
  const planType = metadata.planType;

  // Calculate expiry based on plan type
  const duration = planType === 'YEARLY' ? 365 : 30;
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + duration);

  // Update user to PRO plan
  await prisma.user.update({
    where: { id: userId },
    data: {
      plan: 'PRO',
      planExpiresAt: expiresAt,
      stripeSubscriptionId: subscriptionId
    }
  });

  console.log(`[Payment] User ${userId} upgraded to PRO (${planType})`);
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionCancellation(userId) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      plan: 'FREE',
      planExpiresAt: null,
      stripeSubscriptionId: null
    }
  });

  console.log(`[Payment] User ${userId} downgraded to FREE`);
}

/**
 * Verify and process payment (called from webhook)
 */
async function verifyPayment(sessionId) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status === 'paid' && session.metadata) {
    await handlePaymentSuccess(
      session.metadata,
      session.subscription
    );
    return true;
  }

  return false;
}

/**
 * Get Stripe publishable key for frontend
 */
function getPublishableKey() {
  return process.env.STRIPE_PUBLISHABLE_KEY;
}

module.exports = {
  PLANS,
  createCheckoutSession,
  createCustomer,
  getSubscription,
  cancelSubscription,
  createPortalSession,
  handlePaymentSuccess,
  handleSubscriptionCancellation,
  verifyPayment,
  getPublishableKey
};
