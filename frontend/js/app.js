/**
 * EduCracker - Frontend Application
 * Client-side JavaScript for UI interactions
 * No backend calls yet - UI only
 */

(function() {
    'use strict';

    // ========================================
    // DOM Ready State
    // ========================================
    document.addEventListener('DOMContentLoaded', function() {
        try {
            initNavigation();
            initPasswordToggles();
            initForms();
            initPasswordStrength();
            initMobileSidebar();
            handleOAuthCallback();
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    });

    /**
     * Handle OAuth callback - process token from URL
     */
    function handleOAuthCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const googleAuth = urlParams.get('googleAuth');
        const error = urlParams.get('error');

        if (error) {
            showToast('Google authentication failed. Please try again.', 'error');
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
            return;
        }

        if (token) {
            // Store token
            localStorage.setItem('authToken', token);
            
            if (googleAuth === 'true') {
                showToast('Google login successful!', 'success');
            }

            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    // ========================================
    // Toast Notification System
    // ========================================
    
    /**
     * Create toast container if not exists
     */
    function getToastContainer() {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    /**
     * Show toast notification
     * @param {string} message - Toast message
     * @param {string} type - Toast type: 'success', 'error', 'info'
     * @param {string} title - Optional title
     */
    window.showToast = function(message, type = 'info', title = '') {
        const container = getToastContainer();
        
        // Set default titles based on type
        if (!title) {
            switch(type) {
                case 'success': title = 'Success'; break;
                case 'error': title = 'Error'; break;
                case 'info': title = 'Info'; break;
                default: title = 'Notification';
            }
        }

        // Icons for each type
        const icons = {
            success: '✓',
            error: '✕',
            info: 'ℹ'
        };

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${icons[type]}</span>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" aria-label="Close">&times;</button>
        `;

        container.appendChild(toast);

        // Close button handler
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', function() {
            removeToast(toast);
        });

        // Auto dismiss after 4 seconds
        setTimeout(function() {
            removeToast(toast);
        }, 4000);
    };

    /**
     * Remove toast with animation
     */
    function removeToast(toast) {
        if (toast.classList.contains('toast-removing')) return;
        
        toast.classList.add('toast-removing');
        setTimeout(function() {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    // ========================================
    // Navigation
    // ========================================
    function initNavigation() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
            });
        }

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.style.boxShadow = 'var(--shadow-md)';
                } else {
                    navbar.style.boxShadow = 'none';
                }
            }
        });
    }

    // ========================================
    // Mobile Sidebar
    // ========================================
    function initMobileSidebar() {
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        
        if (!sidebarToggle || !sidebar) return;
        
        // Prevent duplicate initialization
        if (sidebar.dataset.sidebarInitialized) return;
        sidebar.dataset.sidebarInitialized = 'true';

        // Create overlay element
        let overlay = document.querySelector('.sidebar-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);
        }

        // Toggle sidebar
        sidebarToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
        });

        // Close when clicking overlay
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close on nav item click (mobile)
        const navItems = sidebar.querySelectorAll('.nav-item');
        navItems.forEach(function(item) {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // Close when clicking outside (desktop)
        document.addEventListener('click', function(e) {
            if (window.innerWidth > 768) return;
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ========================================
    // Password Visibility Toggle
    // ========================================
    function initPasswordToggles() {
        const toggleButtons = document.querySelectorAll('.password-toggle');
        
        toggleButtons.forEach(function(button) {
            // Prevent duplicate event binding
            if (button.dataset.toggleInitialized) return;
            button.dataset.toggleInitialized = 'true';
            
            button.addEventListener('click', function() {
                // Add null check for wrapper
                const wrapper = this.closest('.password-input-wrapper');
                if (!wrapper) return;
                
                const input = wrapper.querySelector('input');
                if (!input) return;
                
                const isPassword = input.type === 'password';
                
                input.type = isPassword ? 'text' : 'password';
                this.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
            });
        });
    }

    // ========================================
    // Form Handling
    // ========================================
    function initForms() {
        // Login Form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleLogin(this);
            });
        }

        // Register Form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleRegister(this);
            });
        }

        // Google Login Button
        const googleLoginBtn = document.getElementById('googleLoginBtn');
        if (googleLoginBtn) {
            googleLoginBtn.addEventListener('click', function(e) {
                e.preventDefault();
                handleGoogleLogin();
            });
        }

        // Google Register Button
        const googleRegisterBtn = document.getElementById('googleRegisterBtn');
        if (googleRegisterBtn) {
            googleRegisterBtn.addEventListener('click', function(e) {
                e.preventDefault();
                handleGoogleLogin();
            });
        }
    }

    /**
     * Handle Google OAuth Login
     */
    function handleGoogleLogin() {
        // Redirect to backend Google OAuth endpoint
        window.location.href = '/api/user/auth/google';
    }

    /**
     * Handle login form submission
     */
    function handleLogin(form) {
        const formData = new FormData(form);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
            remember: formData.get('remember') === 'on'
        };

        // Basic validation
        if (!data.email || !data.password) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        setButtonLoading(submitBtn, true);

        // Make API call to backend
        fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            if (result.success || result.token) {
                // Store token
                if (result.token) {
                    localStorage.setItem('authToken', result.token);
                }
                if (result.user) {
                    localStorage.setItem('user', JSON.stringify(result.user));
                }
                showToast('Login successful! Redirecting...', 'success');
                setTimeout(function() {
                    window.location.href = 'dashboard.html';
                }, 800);
            } else {
                showToast(result.message || 'Login failed. Please try again.', 'error');
                setButtonLoading(submitBtn, false);
            }
        })
        .catch(function(error) {
            console.error('Login error:', error);
            showToast('An error occurred. Please try again.', 'error');
            setButtonLoading(submitBtn, false);
        });
    }

    /**
     * Handle register form submission
     */
    function handleRegister(form) {
        const formData = new FormData(form);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            role: formData.get('role'),
            terms: formData.get('terms') === 'on'
        };

        // Basic validation
        if (!data.firstName || !data.lastName || !data.email || !data.password) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        if (data.password !== data.confirmPassword) {
            showToast('Passwords do not match', 'error');
            // Restore button
            const submitBtn = form.querySelector('button[type="submit"]');
            setButtonLoading(submitBtn, false, 'Create Account');
            return;
        }

        if (data.password.length < 8) {
            showToast('Password must be at least 8 characters', 'error');
            // Restore button
            const submitBtn = form.querySelector('button[type="submit"]');
            setButtonLoading(submitBtn, false, 'Create Account');
            return;
        }

        if (!data.terms) {
            showToast('Please accept the Terms of Service', 'error');
            // Restore button
            const submitBtn = form.querySelector('button[type="submit"]');
            setButtonLoading(submitBtn, false, 'Create Account');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        setButtonLoading(submitBtn, true);

        // Make API call to backend
        fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            if (result.success || result.message) {
                showToast('Account created successfully! Please sign in.', 'success');
                setTimeout(function() {
                    window.location.href = 'login.html';
                }, 1000);
            } else {
                showToast(result.message || 'Registration failed. Please try again.', 'error');
                setButtonLoading(submitBtn, false, 'Create Account');
            }
        })
        .catch(function(error) {
            console.error('Registration error:', error);
            showToast('An error occurred. Please try again.', 'error');
            setButtonLoading(submitBtn, false, 'Create Account');
        });
    }

    /**
     * Set button loading state
     */
    function setButtonLoading(button, isLoading, originalText) {
        if (!button) return;
        
        if (isLoading) {
            // Store original text if not provided
            if (!button.dataset.originalText) {
                button.dataset.originalText = button.textContent.trim();
            }
            button.classList.add('btn-loading');
            button.disabled = true;
        } else {
            button.classList.remove('btn-loading');
            button.disabled = false;
            button.textContent = originalText || button.dataset.originalText || 'Submit';
        }
    }

    // ========================================
    // Password Strength Indicator
    // ========================================
    function initPasswordStrength() {
        const passwordInput = document.getElementById('password');
        if (!passwordInput) return;

        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');
        
        // Guard: elements may not exist on all pages
        if (!strengthFill || !strengthText) return;

        // Use a flag to prevent duplicate event listeners
        if (passwordInput.dataset.passwordStrengthInitialized) return;
        passwordInput.dataset.passwordStrengthInitialized = 'true';

        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            
            // Update strength bar
            strengthFill.className = 'strength-fill';
            if (strength === 0) {
                strengthFill.style.width = '0';
                strengthText.textContent = 'Password strength';
            } else if (strength < 30) {
                strengthFill.style.width = '33%';
                strengthText.textContent = 'Weak';
            } else if (strength < 60) {
                strengthFill.style.width = '66%';
                strengthFill.classList.add('medium');
                strengthText.textContent = 'Medium';
            } else {
                strengthFill.style.width = '100%';
                strengthFill.classList.add('strong');
                strengthText.textContent = 'Strong';
            }
        });
    }

    /**
     * Calculate password strength (0-100)
     */
    function calculatePasswordStrength(password) {
        if (!password) return 0;
        
        let score = 0;
        
        // Length checks
        if (password.length >= 8) score += 20;
        if (password.length >= 12) score += 10;
        if (password.length >= 16) score += 10;
        
        // Character variety
        if (/[a-z]/.test(password)) score += 15;
        if (/[A-Z]/.test(password)) score += 15;
        if (/[0-9]/.test(password)) score += 15;
        if (/[^a-zA-Z0-9]/.test(password)) score += 15;
        
        return Math.min(score, 100);
    }

    // ========================================
    // Legacy Alert System (backward compatibility)
    // ========================================
    /**
     * Show alert message to user (legacy - use showToast instead)
     */
    function showAlert(message, type) {
        showToast(message, type || 'info');
    }

    // Keep for backward compatibility
    window.showAlert = showAlert;

    // ========================================
    // Utility Functions
    // ========================================
    
    /**
     * Validate email format
     */
    window.validateEmail = function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    /**
     * Show loading spinner
     */
    window.showLoading = function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = '<span class="loading-spinner"></span> Loading...';
        }
    };

    /**
     * Hide loading spinner
     */
    window.hideLoading = function(elementId, originalContent) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = originalContent;
        }
    };

})();
