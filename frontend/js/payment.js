/**
 * ========================================
 * EduCracker Payment Module
 * Handles Stripe payment integration on frontend
 * ========================================
 */

const PaymentAPI = {
  // Get payment configuration
  async getConfig() {
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = 'Bearer ' + token;
      }
      
      const response = await fetch('/api/payment/config', { headers });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching payment config:', error);
      return { success: false, error: error.message };
    }
  },

  // Create checkout session
  async createCheckoutSession(userId, planType) {
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = 'Bearer ' + token;
      }
      
      const response = await fetch('/api/payment/create-checkout-session', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ userId, planType })
      });
      
      const data = await response.json();
      
      if (data.success && data.data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  },

  // Verify payment after redirect
  async verifyPayment(sessionId) {
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = 'Bearer ' + token;
      }
      
      const response = await fetch(`/api/payment/verify/${sessionId}`, { headers });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Verification error:', error);
      return { success: false, error: error.message };
    }
  },

  // Manual upgrade (for testing without payment)
  async manualUpgrade(userId, planType) {
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = 'Bearer ' + token;
      }
      
      const response = await fetch('/api/payment/manual-upgrade', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ userId, planType })
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Manual upgrade error:', error);
      return { success: false, error: error.message };
    }
  },

  // Open billing portal
  async openBillingPortal(userId) {
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = 'Bearer ' + token;
      }
      
      const response = await fetch('/api/payment/portal', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ userId })
      });
      
      const data = await response.json();
      
      if (data.success && data.data.url) {
        window.location.href = data.data.url;
      } else {
        throw new Error(data.error || 'Failed to open billing portal');
      }
    } catch (error) {
      console.error('Billing portal error:', error);
      alert('Failed to open billing portal. Please try again.');
    }
  }
};

// Initialize payment on pricing page
function initPaymentHandlers() {
  // Check for payment status in URL
  const urlParams = new URLSearchParams(window.location.search);
  const paymentStatus = urlParams.get('payment');
  const sessionId = urlParams.get('session_id');

  if (paymentStatus === 'success' && sessionId) {
    handlePaymentSuccess(sessionId);
  } else if (paymentStatus === 'cancelled') {
    showPaymentMessage('Payment was cancelled. Please try again.', 'warning');
  }

  // Setup upgrade buttons
  setupUpgradeButtons();
}

// Handle successful payment
async function handlePaymentSuccess(sessionId) {
  showPaymentMessage('Processing your payment...', 'info');
  
  const result = await PaymentAPI.verifyPayment(sessionId);
  
  if (result.success && result.data.verified) {
    showPaymentMessage('Payment successful! You are now a Pro member.', 'success');
    
    // Reload page after short delay to update UI
    setTimeout(() => {
      window.location.href = '/dashboard.html';
    }, 2000);
  } else {
    showPaymentMessage('Payment verification pending. Please refresh the page.', 'warning');
  }
}

// Show payment message
function showPaymentMessage(message, type) {
  // Remove existing message if any
  const existing = document.querySelector('.payment-message');
  if (existing) existing.remove();

  const messageDiv = document.createElement('div');
  messageDiv.className = `payment-message alert alert-${type}`;
  messageDiv.style.cssText = 'position: fixed; top: 100px; right: 20px; z-index: 9999; max-width: 400px;';
  messageDiv.textContent = message;

  // Add alert styles based on type
  if (type === 'success') {
    messageDiv.style.background = '#10b981';
    messageDiv.style.color = 'white';
  } else if (type === 'warning') {
    messageDiv.style.background = '#f59e0b';
    messageDiv.style.color = 'white';
  } else if (type === 'info') {
    messageDiv.style.background = '#3b82f6';
    messageDiv.style.color = 'white';
  }

  document.body.appendChild(messageDiv);

  // Auto remove after 5 seconds
  setTimeout(() => {
    messageDiv.remove();
  }, 5000);
}

// Setup upgrade buttons
function setupUpgradeButtons() {
  const upgradeButtons = document.querySelectorAll('.btn-upgrade');
  
  upgradeButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      
      // Get user ID from localStorage (assumes user is logged in)
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        // Redirect to login if not logged in
        window.location.href = '/login.html?redirect=/pricing.html';
        return;
      }

      const planType = button.dataset.plan || 'MONTHLY';
      
      // Show loading state
      const originalText = button.textContent;
      button.textContent = 'Processing...';
      button.disabled = true;

      try {
        await PaymentAPI.createCheckoutSession(userId, planType);
      } catch (error) {
        button.textContent = originalText;
        button.disabled = false;
      }
    });
  });
}

// Check user authentication and subscription status
async function checkUserSubscription() {
  const userId = localStorage.getItem('userId');
  if (!userId) return null;

  try {
    const response = await fetch(`/api/subscription/status?userId=${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking subscription:', error);
    return null;
  }
}

// Update UI based on subscription status
async function updateSubscriptionUI() {
  const status = await checkUserSubscription();
  
  if (status && status.success && status.data) {
    const { plan, isPro, expiresAt } = status.data;
    
    // Update pricing cards
    const freeCard = document.querySelector('.pricing-card-free');
    const premiumCard = document.querySelector('.pricing-card-premium');
    
    if (isPro) {
      // User is Pro - update button states
      if (freeCard) {
        const freeButton = freeCard.querySelector('button');
        if (freeButton) {
          freeButton.textContent = 'Downgrade';
          freeButton.classList.add('btn-outline');
        }
      }
      
      if (premiumCard) {
        const premiumButton = premiumCard.querySelector('button');
        if (premiumButton) {
          premiumButton.textContent = 'Manage Subscription';
          premiumButton.onclick = () => {
            const userId = localStorage.getItem('userId');
            PaymentAPI.openBillingPortal(userId);
          };
        }
      }
    }
    
    // Update usage counter
    if (status.data.usage) {
      updateUsageDisplay(status.data.usage);
    }
  }
}

// Update usage display
function updateUsageDisplay(usage) {
  if (!usage) return;
  
  // AI Notes usage
  if (usage.aiNotes) {
    const aiNotesUsed = document.querySelector('.usage-text strong');
    if (aiNotesUsed && aiNotesUsed.textContent.includes('AI Notes')) {
      const parent = aiNotesUsed.closest('.usage-text');
      if (parent) {
        const limit = usage.aiNotes.limit === -1 ? '∞' : usage.aiNotes.limit;
        parent.innerHTML = `AI Notes: <strong>${usage.aiNotes.used}/${limit}</strong> used today`;
      }
    }
    
    // Update progress bar
    const usageBarFill = document.querySelector('.usage-bar-fill');
    if (usageBarFill && usage.aiNotes.limit !== -1) {
      const percentage = (usage.aiNotes.used / usage.aiNotes.limit) * 100;
      usageBarFill.style.width = `${Math.min(percentage, 100)}%`;
      
      // Add warning/danger classes
      if (percentage >= 80) {
        usageBarFill.classList.add('warning');
      }
      if (percentage >= 100) {
        usageBarFill.classList.add('danger');
      }
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.pricing-page, .pricing-main, #pricing')) {
    initPaymentHandlers();
    updateSubscriptionUI();
  }
});

// Export for use in other modules
window.PaymentAPI = PaymentAPI;
window.initPaymentHandlers = initPaymentHandlers;
window.checkUserSubscription = checkUserSubscription;
