/**
 * EduCracker - Premium System
 * Handles premium plan logic, upgrades, and feature gating
 * Frontend-only simulation (no real payment integration yet)
 */

(function() {
    'use strict';

    // ========================================
    // Constants
    // ========================================
    const PLAN_KEYS = {
        USER_PLAN: 'userPlan',
        PLAN_EXPIRY: 'planExpiry',
        PLAN_TYPE: 'planType'
    };

    const PLAN_TYPES = {
        FREE: 'free',
        PREMIUM: 'premium'
    };

    // ========================================
    // DOM Ready
    // ========================================
    document.addEventListener('DOMContentLoaded', function() {
        try {
            initPremiumSystem();
        } catch (error) {
            console.error('Error initializing premium system:', error);
        }
    });

    /**
     * Initialize premium system on page load
     */
    function initPremiumSystem() {
        try {
            // Initialize modals
            initModals();

            // Initialize upgrade button
            initUpgradeButton();

            // Initialize plan badge (for dashboard)
            initPlanBadge();

            // Initialize premium feature locks
            initFeatureLocks();

            // Initialize usage counters
            initUsageCounters();

            // Update UI based on current plan
            updatePlanUI();
        } catch (error) {
            console.error('Error initializing premium system:', error);
        }
    }

    // ========================================
    // Plan Helper Functions
    // ========================================

    /**
     * Get current user plan from localStorage
     * @returns {string} 'free' or 'premium'
     */
    window.getUserPlan = function() {
        return localStorage.getItem(PLAN_KEYS.USER_PLAN) || PLAN_TYPES.FREE;
    };

    /**
     * Check if current user is premium
     * @returns {boolean}
     */
    window.isPremium = function() {
        var plan = localStorage.getItem(PLAN_KEYS.USER_PLAN);
        
        // If not premium, return false
        if (plan !== PLAN_TYPES.PREMIUM) {
            return false;
        }

        // Check if premium has expired
        var expiry = localStorage.getItem(PLAN_KEYS.PLAN_EXPIRY);
        if (expiry) {
            var expiryDate = new Date(expiry);
            var now = new Date();
            
            // If expired, revert to free
            if (expiryDate < now) {
                localStorage.setItem(PLAN_KEYS.USER_PLAN, PLAN_TYPES.FREE);
                localStorage.removeItem(PLAN_KEYS.PLAN_EXPIRY);
                return false;
            }
        }

        return true;
    };

    /**
     * Get plan expiry date
     * @returns {Date|null}
     */
    window.getPlanExpiry = function() {
        var expiry = localStorage.getItem(PLAN_KEYS.PLAN_EXPIRY);
        return expiry ? new Date(expiry) : null;
    };

    /**
     * Upgrade user to premium (simulation)
     * @param {function} callback - Callback function after upgrade
     * @param {string} planType - Optional plan type: 'monthly', 'lunch', or default 'pro'
     */
    window.upgradeToPremium = function(callback, planType) {
        var today = new Date();
        var expiry = new Date(today);
        
        // Determine expiry based on plan type
        // Default: monthly plans (30 days), lunch offer (30 days)
        var planDuration = 30; // Default 30 days for monthly plans
        
        if (planType === 'monthly') {
            expiry.setDate(expiry.getDate() + 30); // 30 days for monthly
        } else if (planType === 'lunch') {
            expiry.setDate(expiry.getDate() + 30); // 30 days for lunch offer
        } else {
            expiry.setFullYear(expiry.getFullYear() + 1); // Default 1 year
        }

        // Store in localStorage
        localStorage.setItem(PLAN_KEYS.USER_PLAN, PLAN_TYPES.PREMIUM);
        localStorage.setItem(PLAN_KEYS.PLAN_EXPIRY, expiry.toISOString());
        localStorage.setItem(PLAN_KEYS.PLAN_TYPE, planType || 'pro');

        // Update UI
        updatePlanUI();

        // Show success toast
        var planName = planType === 'lunch' ? 'Lunch Offer' : (planType === 'monthly' ? 'Monthly Plan' : 'Pro');
        if (typeof showToast === 'function') {
            showToast('🎉 ' + planName + ' Activated! Enjoy unlimited access.', 'success', 'Welcome to Premium');
        }

        // Execute callback if provided
        if (typeof callback === 'function') {
            callback();
        }

        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('planUpgraded', {
            detail: { plan: PLAN_TYPES.PREMIUM, planType: planType || 'pro', expiry: expiry }
        }));
    };

    /**
     * Reset to free plan (for testing)
     */
    window.resetToFree = function() {
        localStorage.setItem(PLAN_KEYS.USER_PLAN, PLAN_TYPES.FREE);
        localStorage.removeItem(PLAN_KEYS.PLAN_EXPIRY);
        localStorage.removeItem(PLAN_KEYS.PLAN_TYPE);
        updatePlanUI();

        if (typeof showToast === 'function') {
            showToast('Plan reset to Free', 'info');
        }

        window.dispatchEvent(new CustomEvent('planReset', {
            detail: { plan: PLAN_TYPES.FREE }
        }));
    };

    // ========================================
    // UI Update Functions
    // ========================================

    /**
     * Update all premium-related UI elements
     */
    function updatePlanUI() {
        updatePlanBadges();
        updateUpgradeButtons();
        updatePremiumFeatures();
    }

    /**
     * Update plan badges throughout the app
     */
    function updatePlanBadges() {
        var badges = document.querySelectorAll('.plan-badge');
        
        // Guard: no badges on this page
        if (!badges || badges.length === 0) return;
        
        // Prevent multiple rapid updates
        if (document.body.dataset.badgesUpdating) return;
        document.body.dataset.badgesUpdating = 'true';
        setTimeout(function() {
            document.body.dataset.badgesUpdating = '';
        }, 100);
        
        var isPremiumUser = window.isPremium();

        badges.forEach(function(badge) {
            if (isPremiumUser) {
                badge.className = 'plan-badge plan-badge-premium';
                badge.textContent = 'Premium Active';
            } else {
                badge.className = 'plan-badge plan-badge-free';
                badge.textContent = 'Free Plan';
            }
        });
    }

    /**
     * Update upgrade buttons based on current plan
     */
    function updateUpgradeButtons() {
        const upgradeButtons = document.querySelectorAll('.btn-upgrade');
        
        // Guard: no upgrade buttons on this page
        if (!upgradeButtons || upgradeButtons.length === 0) return;
        
        const isPremiumUser = window.isPremium();

        upgradeButtons.forEach(function(btn) {
            if (isPremiumUser) {
                btn.textContent = 'Current Plan';
                btn.classList.add('disabled');
                btn.disabled = true;
            } else {
                btn.textContent = 'Upgrade Now';
                btn.classList.remove('disabled');
                btn.disabled = false;
            }
        });
    }

    /**
     * Update premium-locked features
     */
    function updatePremiumFeatures() {
        const lockedFeatures = document.querySelectorAll('.premium-locked');
        
        // Guard: no locked features on this page
        if (!lockedFeatures || lockedFeatures.length === 0) return;
        
        const isPremiumUser = window.isPremium();

        lockedFeatures.forEach(function(feature) {
            if (isPremiumUser) {
                feature.classList.remove('premium-locked');
                feature.classList.add('premium-unlocked');
                
                // Remove lock icon if present
                const lockIcon = feature.querySelector('.lock-icon');
                if (lockIcon) {
                    lockIcon.remove();
                }
            }
        });
    }

    // ========================================
    // Modal Functions
    // ========================================

    /**
     * Initialize modal functionality
     */
    function initModals() {
        // Prevent duplicate initialization
        if (document.body.dataset.modalsInitialized) return;
        document.body.dataset.modalsInitialized = 'true';

        // Upgrade Modal
        const upgradeModal = document.getElementById('upgradeModal');
        if (upgradeModal) {
            const closeBtn = upgradeModal.querySelector('.modal-close');
            const overlay = upgradeModal.querySelector('.modal-overlay');
            const cancelBtn = document.getElementById('cancelUpgrade');
            const confirmBtn = document.getElementById('confirmUpgrade');

            // Close handlers
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    closeModal(upgradeModal);
                });
            }
            if (overlay) {
                overlay.addEventListener('click', function() {
                    closeModal(upgradeModal);
                });
            }
            if (cancelBtn) {
                cancelBtn.addEventListener('click', function() {
                    closeModal(upgradeModal);
                });
            }
            // Confirm upgrade
            if (confirmBtn) {
                confirmBtn.addEventListener('click', function() {
                    handleUpgradeConfirm(upgradeModal);
                });
            }
        }

        // Feature Lock Modal
        const featureLockModal = document.getElementById('featureLockModal');
        if (featureLockModal) {
            const closeBtn = featureLockModal.querySelector('.modal-close');
            const overlay = featureLockModal.querySelector('.modal-overlay');
            const closeBtn2 = document.getElementById('closeFeatureLock');

            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    closeModal(featureLockModal);
                });
            }
            if (overlay) {
                overlay.addEventListener('click', function() {
                    closeModal(featureLockModal);
                });
            }
            if (closeBtn2) {
                closeBtn2.addEventListener('click', function() {
                    closeModal(featureLockModal);
                });
            }
        }
    }

    /**
     * Open a modal
     * @param {HTMLElement} modal - The modal element
     */
    function openModal(modal) {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Close a modal
     * @param {HTMLElement} modal - The modal element
     */
    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ========================================
    // Upgrade Flow
    // ========================================

    /**
     * Initialize upgrade button click handler
     */
    function initUpgradeButton() {
        var upgradeButtons = document.querySelectorAll('.btn-upgrade');
        
        // Guard: no upgrade buttons on this page
        if (!upgradeButtons || upgradeButtons.length === 0) return;
        
        upgradeButtons.forEach(function(upgradeBtn) {
            // Prevent duplicate event binding
            if (upgradeBtn.dataset.upgradeInitialized) return;
            upgradeBtn.dataset.upgradeInitialized = 'true';
            
            upgradeBtn.addEventListener('click', function(e) {
                // If already premium, don't do anything
                if (window.isPremium()) {
                    return;
                }
                
                e.preventDefault();
                
                // Get plan type from data attribute
                var planType = upgradeBtn.dataset.plan || 'pro';
                
                // Store selected plan type for later use
                window.selectedPlanType = planType;
                
                var modal = document.getElementById('upgradeModal');
                openModal(modal);
            });
        });
    }

    /**
     * Handle upgrade confirmation
     * @param {HTMLElement} modal - The modal element
     */
    function handleUpgradeConfirm(modal) {
        // Simulate processing delay
        const confirmBtn = document.getElementById('confirmUpgrade');
        if (confirmBtn) {
            confirmBtn.textContent = 'Processing...';
            confirmBtn.disabled = true;
        }

        // Get the selected plan type
        var planType = window.selectedPlanType || 'pro';

        // Simulate API call delay
        setTimeout(function() {
            // Perform upgrade with plan type
            window.upgradeToPremium(function() {
                // Close modal
                closeModal(modal);
                
                // Reset button text
                if (confirmBtn) {
                    confirmBtn.textContent = 'Confirm Upgrade';
                    confirmBtn.disabled = false;
                }
                
                // Clear selected plan type
                window.selectedPlanType = null;
            }, planType);
        }, 1000);
    }

    // ========================================
    // Feature Lock System
    // ========================================

    /**
     * Initialize premium feature locks
     */
    function initFeatureLocks() {
        // Find all premium-locked elements
        const lockedElements = document.querySelectorAll('[data-premium-lock="true"]');
        
        // Guard: no locked elements on this page
        if (!lockedElements || lockedElements.length === 0) return;

        lockedElements.forEach(function(element) {
            // Prevent duplicate event binding
            if (element.dataset.premiumLockInitialized) return;
            element.dataset.premiumLockInitialized = 'true';
            
            element.addEventListener('click', function(e) {
                // If already premium, allow click
                if (window.isPremium()) {
                    return true;
                }

                // Otherwise show upgrade modal
                e.preventDefault();
                e.stopPropagation();
                
                const modal = document.getElementById('featureLockModal');
                openModal(modal);
                
                return false;
            });
        });

        // Add lock icons to premium-locked nav items in sidebar
        const premiumNavItems = document.querySelectorAll('.nav-item.premium-locked');
        premiumNavItems.forEach(function(item) {
            if (!item.querySelector('.lock-icon')) {
                const lockIcon = document.createElement('span');
                lockIcon.className = 'lock-icon';
                lockIcon.textContent = '🔒';
                lockIcon.style.marginLeft = 'auto';
                item.appendChild(lockIcon);
            }
        });
    }

    /**
     * Show feature lock modal (for manual triggering)
     * @param {string} featureName - Optional feature name
     */
    window.showFeatureLockModal = function(featureName) {
        const modal = document.getElementById('featureLockModal');
        if (modal) {
            openModal(modal);
        }
    };

    // ========================================
    // Usage Tracking
    // ========================================

    /**
     * Get daily usage from localStorage
     * @returns {object}
     */
    window.getDailyUsage = function() {
        var usageData = localStorage.getItem('dailyUsage');
        var today = new Date().toDateString();
        
        if (usageData) {
            var parsed = JSON.parse(usageData);
            if (parsed.date === today) {
                return parsed;
            }
        }
        
        // Reset for new day
        return {
            date: today,
            aiNotesUsed: 0,
            mockTestsUsed: 0
        };
    };

    /**
     * Save daily usage to localStorage
     * @param {object} usage - Usage data
     */
    window.saveDailyUsage = function(usage) {
        localStorage.setItem('dailyUsage', JSON.stringify(usage));
    };

    /**
     * Increment AI notes usage
     * @returns {object} Updated usage
     */
    window.incrementAINotesUsage = function() {
        var usage = window.getDailyUsage();
        usage.aiNotesUsed++;
        window.saveDailyUsage(usage);
        return usage;
    };

    /**
     * Increment mock tests usage
     * @returns {object} Updated usage
     */
    window.incrementMockTestsUsage = function() {
        var usage = window.getDailyUsage();
        usage.mockTestsUsed++;
        window.saveDailyUsage(usage);
        return usage;
    };

    /**
     * Check if user can use AI feature
     * @param {string} featureType - 'aiNotes' or 'mockTests'
     * @returns {object} {allowed: boolean, remaining: number}
     */
    window.canUseFeature = function(featureType) {
        // Premium users have unlimited access
        if (window.isPremium()) {
            return { allowed: true, remaining: -1, isPro: true };
        }

        var usage = window.getDailyUsage();
        var limits = {
            aiNotes: 2,
            mockTests: 1
        };

        var limit = limits[featureType] || 0;
        var used = featureType === 'aiNotes' ? usage.aiNotesUsed : usage.mockTestsUsed;
        var remaining = Math.max(0, limit - used);

        return {
            allowed: remaining > 0,
            remaining: remaining,
            limit: limit,
            used: used,
            isPro: false
        };
    };

    /**
     * Show limit reached modal
     * @param {string} featureType - Type of feature that reached limit
     */
    window.showLimitReachedModal = function(featureType) {
        var modal = document.getElementById('limitReachedModal');
        if (modal) {
            openModal(modal);
        } else {
            // Fallback to feature lock modal
            window.showFeatureLockModal();
        }
    };

    /**
     * Initialize usage counters on dashboard
     */
    function initUsageCounters() {
        var counters = document.querySelectorAll('.usage-counter');
        if (!counters || counters.length === 0) return;

        var usage = window.getDailyUsage();
        var isPro = window.isPremium();

        counters.forEach(function(counter) {
            var featureType = counter.dataset.feature;
            if (!featureType) return;

            var limit = isPro ? -1 : (featureType === 'aiNotes' ? 2 : 1);
            var used = featureType === 'aiNotes' ? usage.aiNotesUsed : usage.mockTestsUsed;
            var percentage = limit > 0 ? (used / limit) * 100 : 0;

            // Update progress bar
            var bar = counter.querySelector('.usage-bar-fill');
            if (bar) {
                bar.style.width = Math.min(percentage, 100) + '%';
                if (percentage >= 80) {
                    bar.classList.add('warning');
                }
                if (percentage >= 100) {
                    bar.classList.add('danger');
                }
            }

            // Update text
            var text = counter.querySelector('.usage-text');
            if (text) {
                if (isPro) {
                    text.innerHTML = '<strong>Unlimited</strong> ' + featureType + ' available';
                } else {
                    text.innerHTML = '<strong>' + used + '/' + limit + '</strong> ' + featureType + ' used today';
                }
            }
        });
    }

    // ========================================
    // Plan Badge (Dashboard)
    // ========================================

    /**
     * Initialize plan badge in dashboard header
     */
    function initPlanBadge() {
        // Check if we're on a page with a plan badge container
        var badgeContainer = document.getElementById('planBadgeContainer');
        
        if (badgeContainer) {
            // Check if badge already exists in container - if so, just update it
            var existingBadge = badgeContainer.querySelector('.plan-badge');
            if (existingBadge) {
                // Badge exists, just update its content (prevents flicker)
                updateExistingBadge(existingBadge);
            } else {
                // No badge exists, create one
                renderPlanBadge(badgeContainer);
            }
        }
    }

    /**
     * Update existing badge without replacing DOM element (prevents flicker)
     * @param {HTMLElement} badge - Existing badge element
     */
    function updateExistingBadge(badge) {
        try {
            var isPremiumUser = window.isPremium();
            var plan = window.getUserPlan();
            
            if (isPremiumUser || plan === PLAN_TYPES.PREMIUM) {
                badge.className = 'plan-badge plan-badge-premium';
                badge.textContent = 'Premium Active';
                
                // Show expiry if available
                var expiry = window.getPlanExpiry();
                if (expiry) {
                    badge.title = 'Expires: ' + expiry.toLocaleDateString();
                }
            } else {
                badge.className = 'plan-badge plan-badge-free';
                badge.textContent = 'Free Plan';
                badge.title = '';
            }
        } catch (error) {
            console.error('Error updating badge:', error);
        }
    }

    /**
     * Render plan badge in container (fallback for when no badge exists)
     * @param {HTMLElement} container - Container element
     */
    function renderPlanBadge(container) {
        try {
            var isPremiumUser = window.isPremium();
            var plan = window.getUserPlan();
            
            var badge = document.createElement('span');
            
            if (isPremiumUser || plan === PLAN_TYPES.PREMIUM) {
                badge.className = 'plan-badge plan-badge-premium';
                badge.textContent = 'Premium Active';
                
                // Show expiry if available
                var expiry = window.getPlanExpiry();
                if (expiry) {
                    badge.title = 'Expires: ' + expiry.toLocaleDateString();
                }
            } else {
                badge.className = 'plan-badge plan-badge-free';
                badge.textContent = 'Free Plan';
            }

            // Clear container and add badge
            container.innerHTML = '';
            container.appendChild(badge);
        } catch (error) {
            console.error('Error rendering badge:', error);
        }
    }

    // Expose functions globally for external use
    window.PremiumSystem = {
        getUserPlan: window.getUserPlan,
        isPremium: window.isPremium,
        upgradeToPremium: window.upgradeToPremium,
        resetToFree: window.resetToFree,
        getPlanExpiry: window.getPlanExpiry,
        showFeatureLockModal: window.showFeatureLockModal,
        openModal: openModal,
        closeModal: closeModal
    };

})();
