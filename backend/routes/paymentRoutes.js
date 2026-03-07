/**
 * ========================================
 * EduCracker Payment Routes
 * API endpoints for Stripe payment processing
 * ========================================
 */

const express = require('express');
const router = express.Router();
const {
  createCheckoutSession,
  createCustomer,
  cancelSubscription,
  createPortalSession,
  verifyPayment,
  getPublishableKey,
  PLANS
} = require('../services/paymentService');

const { upgradeToPro } = require('../services/subscriptionService');

// Get Stripe publishable key
// GET /api/payment/config
router.get('/config', (req, res) => {
  try {
    const publishableKey = getPublishableKey();
    
    res.json({
      success: true,
      data: {
        publishableKey: publishableKey,
        plans: PLANS
      }
    });
  } catch (error) {
    console.error('Error getting payment config:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get payment configuration'
    });
  }
});

// Create checkout session
// POST /api/payment/create-checkout-session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { userId, planType = 'MONTHLY' } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    const session = await createCheckoutSession(parseInt(userId), planType);

    res.json({
      success: true,
      data: {
        sessionId: session.sessionId,
        url: session.url
      }
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create checkout session'
    });
  }
});

// Verify payment success
// GET /api/payment/verify/:sessionId
router.get('/verify/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    const verified = await verifyPayment(sessionId);

    res.json({
      success: true,
      data: {
        verified,
        message: verified ? 'Payment verified successfully' : 'Payment not verified'
      }
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify payment'
    });
  }
});

// Create customer
// POST /api/payment/create-customer
router.post('/create-customer', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    const customerId = await createCustomer(parseInt(userId));

    res.json({
      success: true,
      data: {
        customerId
      }
    });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create customer'
    });
  }
});

// Cancel subscription
// POST /api/payment/cancel
router.post('/cancel', async (req, res) => {
  try {
    const { subscriptionId } = req.body;

    if (!subscriptionId) {
      return res.status(400).json({
        success: false,
        error: 'Subscription ID is required'
      });
    }

    await cancelSubscription(subscriptionId);

    res.json({
      success: true,
      message: 'Subscription cancelled successfully'
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cancel subscription'
    });
  }
});

// Create billing portal session
// POST /api/payment/portal
router.post('/portal', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    const session = await createPortalSession(parseInt(userId));

    res.json({
      success: true,
      data: {
        url: session.url
      }
    });
  } catch (error) {
    console.error('Error creating portal session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create portal session'
    });
  }
});

// Stripe webhook handler
// POST /api/payment/webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (webhookSecret && webhookSecret !== 'your_stripe_webhook_secret_here') {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      // For testing without webhook signature
      event = req.body;
    }
  } catch (err) {
    console.error('[Webhook] Error verifying signature:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('[Webhook] Payment successful for session:', session.id);
      
      if (session.metadata) {
        await verifyPayment(session.id);
      }
      break;

    case 'customer.subscription.deleted':
      const subscription = event.data.object;
      console.log('[Webhook] Subscription cancelled:', subscription.id);
      // Handle subscription cancellation if needed
      break;

    case 'invoice.payment_failed':
      const invoice = event.data.object;
      console.log('[Webhook] Payment failed for invoice:', invoice.id);
      // Handle failed payment
      break;

    default:
      console.log('[Webhook] Unhandled event type:', event.type);
  }

  res.json({ received: true });
});

module.exports = router;
