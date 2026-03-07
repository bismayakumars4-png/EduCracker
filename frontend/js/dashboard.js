/**
 * ========================================
 * EduCracker - Dashboard Module
 * Handles dashboard data loading, updates, and interactions
 * ========================================
 */

(function() {
    'use strict';

    // Store chart instance globally
    window.performanceChartInstance = null;

    // ========================================
    // API Configuration
    // ========================================
    const API_BASE = window.location.origin || 'http://localhost:5000';
    
    // API Endpoints
    const ENDPOINTS = {
        profile: '/api/user/profile',
        plan: '/api/user/plan',
        stats: '/api/dashboard/stats',
        recentTests: '/api/tests/recent',
        analyticsSummary: '/api/dashboard/analytics/summary'
    };

    // ========================================
    // Authentication Helper
    // ========================================
    
    /**
     * Get auth token from localStorage
     */
    function getAuthToken() {
        return localStorage.getItem('authToken');
    }

    /**
     * Get headers with authentication
     */
    function getAuthHeaders() {
        const token = getAuthToken();
        const headers = {
            'Content-Type': 'application/json'
        };
        if (token) {
            headers['Authorization'] = 'Bearer ' + token;
        }
        return headers;
    }

    /**
     * Make authenticated fetch request
     */
    async function authFetch(url, options = {}) {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...getAuthHeaders(),
                ...options.headers
            }
        });
        return response;
    }

    // ========================================
    // DOM Ready State
    // ========================================
    document.addEventListener('DOMContentLoaded', function() {
        // Check if this is the dashboard page
        if (!isDashboardPage()) return;
        
        // Initialize dashboard
        initDashboard();
    });

    /**
     * Check if current page is dashboard
     */
    function isDashboardPage() {
        return document.getElementById('welcomeCard') !== null;
    }

    /**
     * Initialize dashboard - load all data
     */
    async function initDashboard() {
        console.log('[Dashboard] Initializing dashboard...');
        
        // Show loading states
        showLoadingStates();

        try {
            // Load all dashboard data in parallel
            await Promise.all([
                loadUserProfile(),
                loadPlanStatus(),
                loadDashboardStats(),
                loadRecentTests(),
                loadAnalyticsSummary()
            ]);

            // Initialize chart after data is loaded
            setTimeout(function() {
                initPerformanceChart();
            }, 100);

            console.log('[Dashboard] All data loaded successfully');
        } catch (error) {
            console.error('[Dashboard] Error loading dashboard data:', error);
            showErrorState();
        }
    }

    // ========================================
    // Loading States
    // ========================================
    
    /**
     * Show skeleton loading states
     */
    function showLoadingStates() {
        // Add skeleton class to stat values
        const statValues = document.querySelectorAll('.welcome-stat-value');
        statValues.forEach(el => {
            if (!el.classList.contains('skeleton')) {
                el.classList.add('skeleton');
            }
        });

        // Add skeleton class to streak count
        const streakCount = document.getElementById('streakCount');
        if (streakCount) {
            streakCount.classList.add('skeleton');
        }
    }

    /**
     * Hide skeleton loading states
     */
    function hideLoadingStates() {
        // Remove skeleton class from stat values
        const statValues = document.querySelectorAll('.welcome-stat-value');
        statValues.forEach(el => {
            el.classList.remove('skeleton');
        });

        // Remove skeleton class from streak count
        const streakCount = document.getElementById('streakCount');
        if (streakCount) {
            streakCount.classList.remove('skeleton');
        }

        // Remove skeleton text from welcome
        const welcomeTitle = document.getElementById('welcomeTitle');
        if (welcomeTitle) {
            const skeletonText = welcomeTitle.querySelector('.skeleton-text');
            if (skeletonText) {
                skeletonText.remove();
            }
        }
    }

    /**
     * Show error state if data fails to load
     */
    function showErrorState() {
        // Show error toast
        if (window.showToast) {
            window.showToast('Failed to load some dashboard data. Please refresh the page.', 'error');
        }
    }

    // ========================================
    // API Calls
    // ========================================

    /**
     * Fetch user profile from API
     */
    async function loadUserProfile() {
        try {
            const response = await authFetch(API_BASE + ENDPOINTS.profile);
            if (!response.ok) throw new Error('Failed to fetch profile');
            
            const data = await response.json();
            // New format: { name: "John Doe", role: "Student", plan: "premium", avatarInitials: "JD" }
            updateUserProfile(data);
            return data;
        } catch (error) {
            console.error('[Dashboard] Error loading profile:', error);
            // Use mock data on error
            updateUserProfile({
                name: 'John Doe',
                role: 'Student',
                avatarInitials: 'JD'
            });
        }
    }

    /**
     * Fetch plan status from API
     */
    async function loadPlanStatus() {
        try {
            const response = await authFetch(API_BASE + ENDPOINTS.plan);
            if (!response.ok) throw new Error('Failed to fetch plan');
            
            const data = await response.json();
            // New format: { plan: "premium", expires: "2026-03-01" }
            updatePlanBadge(data);
            return data;
        } catch (error) {
            console.error('[Dashboard] Error loading plan:', error);
            // Use default free plan on error
            updatePlanBadge({ plan: 'free', expires: null });
        }
    }

    /**
     * Fetch dashboard statistics from API
     */
    async function loadDashboardStats() {
        try {
            const response = await authFetch(API_BASE + ENDPOINTS.stats);
            if (!response.ok) throw new Error('Failed to fetch stats');
            
            const data = await response.json();
            updateDashboardStats(data);
            return data;
        } catch (error) {
            console.error('[Dashboard] Error loading stats:', error);
            // Use mock data on error
            updateDashboardStats({
                avgScore: 82,
                testsCompleted: 14,
                studyTime: 11,
                rank: 52,
                streak: 7
            });
        }
    }

    /**
     * Fetch recent tests from API
     */
    async function loadRecentTests() {
        try {
            const response = await authFetch(API_BASE + ENDPOINTS.recentTests);
            if (!response.ok) throw new Error('Failed to fetch recent tests');
            
            const data = await response.json();
            updateRecentActivity(data);
            return data;
        } catch (error) {
            console.error('[Dashboard] Error loading recent tests:', error);
            // No mock data - just show empty state
            updateRecentActivity([]);
        }
    }

    /**
     * Fetch analytics summary from API
     */
    async function loadAnalyticsSummary() {
        try {
            const response = await authFetch(API_BASE + ENDPOINTS.analyticsSummary);
            if (!response.ok) throw new Error('Failed to fetch analytics');
            
            const data = await response.json();
            // New format: { subjectPerformance: [], weeklyProgress: { labels, scores }, weakTopics: [] }
            updateAnalyticsPreview(data);
            return data;
        } catch (error) {
            console.error('[Dashboard] Error loading analytics:', error);
            // Use mock data on error
            updateAnalyticsPreview({
                subjectPerformance: [
                    { name: 'Mathematics', score: 85 },
                    { name: 'Physics', score: 78 },
                    { name: 'Chemistry', score: 72 },
                    { name: 'English', score: 90 }
                ],
                weeklyProgress: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    scores: [75, 82, 78, 85, 88, 80, 90]
                },
                weakTopics: [
                    { name: 'Statistics', accuracy: 60 },
                    { name: 'Current Electricity', accuracy: 55 },
                    { name: 'Organic Chemistry', accuracy: 50 }
                ]
            });
        }
    }

    // ========================================
    // UI Update Functions
    // ========================================

    /**
     * Update user profile in sidebar
     */
    function updateUserProfile(data) {
        // New format: { name: "John Doe", role: "Student", plan: "premium", avatarInitials: "JD" }
        
        // Update user avatar initials
        const userAvatar = document.getElementById('userAvatar');
        if (userAvatar) {
            userAvatar.textContent = data.avatarInitials || 'JD';
        }

        // Update user name
        const userName = document.getElementById('userName');
        if (userName) {
            userName.textContent = data.name || 'John Doe';
        }

        // Update user role
        const userRole = document.getElementById('userRole');
        if (userRole) {
            userRole.textContent = data.role || 'Student';
        }

        // Update welcome message
        const welcomeTitle = document.getElementById('welcomeTitle');
        const welcomeText = document.getElementById('welcomeText');
        
        if (welcomeTitle) {
            // Extract first name from full name
            const firstName = data.name ? data.name.split(' ')[0] : 'User';
            welcomeTitle.innerHTML = `Welcome back, ${firstName}! 👋`;
        }
        
        if (welcomeText) {
            welcomeText.textContent = 'Ready to continue your learning journey?';
        }
    }

    /**
     * Update plan badge in navbar
     */
    function updatePlanBadge(data) {
        const container = document.getElementById('planBadgeContainer');
        if (!container) return;

        let badgeHTML = '';

        // New format: { plan: "premium", expires: "2026-03-01" }
        if (data.plan === 'premium') {
            // Premium active badge
            badgeHTML = `
                <span class="plan-badge plan-badge-premium">
                    <span class="premium-icon">💎</span>
                    Premium Active
                </span>
            `;
        } else {
            // Free plan badge with upgrade button
            badgeHTML = `
                <span class="plan-badge plan-badge-free">Free Plan</span>
                <a href="pricing.html" class="upgrade-link">Upgrade</a>
            `;
        }

        container.innerHTML = badgeHTML;
    }

    /**
     * Update dashboard statistics
     */
    function updateDashboardStats(data) {
        // Update average score
        const avgScoreEl = document.getElementById('avgScoreValue');
        if (avgScoreEl) {
            avgScoreEl.textContent = (data.avgScore || 0) + '%';
        }

        // Update tests completed
        const testsCompletedEl = document.getElementById('testsCompletedValue');
        if (testsCompletedEl) {
            testsCompletedEl.textContent = data.testsCompleted || 0;
        }

        // Update study time
        const studyTimeEl = document.getElementById('studyTimeValue');
        if (studyTimeEl) {
            const studyTime = data.studyTime || 0;
            studyTimeEl.textContent = studyTime >= 1 ? studyTime + 'h' : studyTime + 'm';
        }

        // Update rank
        const rankEl = document.getElementById('rankValue');
        if (rankEl) {
            rankEl.textContent = '#' + (data.rank || 0);
        }

        // Update streak
        const streakEl = document.getElementById('streakCount');
        if (streakEl) {
            streakEl.textContent = data.streak || 0;
        }

        // Update welcome text with streak info
        const welcomeText = document.getElementById('welcomeText');
        if (welcomeText && data.streak > 0) {
            welcomeText.textContent = `You're on a ${data.streak}-day streak! Keep it up!`;
        }

        // Hide loading states
        hideLoadingStates();
    }

    /**
     * Update recent activity list
     */
    function updateRecentActivity(tests) {
        const container = document.getElementById('recentActivityList');
        if (!container) return;

        // New format: [{ subject, score, date, accuracy }]
        if (!tests || tests.length === 0) {
            container.innerHTML = `
                <div class="empty-activity">
                    <p>No recent activity yet. Start a test to see your progress!</p>
                </div>
            `;
            return;
        }

        // Generate activity items
        let html = '';
        
        tests.slice(0, 5).forEach((test, index) => {
            const timeAgo = getTimeAgo(new Date(test.date));
            const iconClass = getTestIconClass(index);
            
            html += `
                <div class="activity-item">
                    <div class="activity-icon ${iconClass}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14,2 14,8 20,8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                        </svg>
                    </div>
                    <div class="activity-content">
                        <div class="activity-text">Completed ${test.subject}</div>
                        <div class="activity-meta">
                            <span class="activity-time">${timeAgo}</span>
                            <span class="activity-score ${test.accuracy >= 70 ? 'success' : ''}">Score: ${test.score}%</span>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    /**
     * Update analytics preview (chart)
     */
    function updateAnalyticsPreview(data) {
        // New format: { subjectPerformance: [], weeklyProgress: { labels, scores }, weakTopics: [] }
        
        // Update chart summary values
        const chartAvgScore = document.getElementById('chartAvgScore');
        if (chartAvgScore) {
            const avgScoreEl = document.getElementById('avgScoreValue');
            const avgScore = avgScoreEl ? avgScoreEl.textContent : '0%';
            chartAvgScore.textContent = avgScore;
        }

        // Calculate improvement from subject performance
        const chartImprovement = document.getElementById('chartImprovement');
        if (chartImprovement && data.subjectPerformance) {
            const avgSubjectScore = data.subjectPerformance.reduce((sum, s) => sum + s.score, 0) / data.subjectPerformance.length;
            const sign = avgSubjectScore >= 70 ? '+' : '';
            chartImprovement.textContent = sign + Math.round(avgSubjectScore - 70) + '%';
            chartImprovement.className = 'summary-value ' + (avgSubjectScore >= 70 ? 'positive' : 'negative');
        }

        // Update chart data
        if (data.weeklyProgress) {
            updateChartData(data.weeklyProgress);
        }
    }

    /**
     * Update chart with new data
     */
    function updateChartData(chartData) {
        if (!window.performanceChartInstance) return;

        try {
            // Handle both object format { labels, scores } and array format
            if (chartData.labels && chartData.scores) {
                window.performanceChartInstance.data.labels = chartData.labels;
                window.performanceChartInstance.data.datasets[0].data = chartData.scores;
            } else if (Array.isArray(chartData)) {
                window.performanceChartInstance.data.datasets[0].data = chartData;
            }
            window.performanceChartInstance.update();
        } catch (error) {
            console.error('[Dashboard] Error updating chart:', error);
        }
    }

    // ========================================
    // Performance Chart
    // ========================================

    /**
     * Initialize performance chart
     */
    function initPerformanceChart() {
        try {
            const ctx = document.getElementById('performanceChart');
            if (!ctx) {
                console.warn('[Dashboard] Performance chart canvas not found');
                return;
            }
            
            // Check if Chart.js is loaded
            if (typeof Chart === 'undefined') {
                console.warn('[Dashboard] Chart.js not loaded yet');
                return;
            }
            
            // Destroy existing chart instance if it exists
            if (window.performanceChartInstance) {
                window.performanceChartInstance.destroy();
                window.performanceChartInstance = null;
            }
            
            // Chart.js gradient
            const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');
            
            window.performanceChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Score %',
                        data: [null, null, null, null, null, null, null], // Start empty, will be updated
                        backgroundColor: gradient,
                        borderColor: '#3B82F6',
                        borderWidth: 1,
                        borderRadius: 6,
                        borderSkipped: false,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: '#1E293B',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            padding: 12,
                            cornerRadius: 8,
                            displayColors: false,
                            callbacks: {
                                label: function(context) {
                                    return context.raw ? 'Score: ' + context.raw + '%' : 'No data';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)',
                                drawBorder: false
                            },
                            ticks: {
                                font: {
                                    family: 'Inter',
                                    size: 12
                                },
                                color: '#64748B',
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                font: {
                                    family: 'Inter',
                                    size: 12
                                },
                                color: '#64748B'
                            }
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeOutQuart'
                    }
                }
            });

            // Load analytics data to populate chart
            loadAnalyticsForChart();
        } catch (error) {
            console.error('[Dashboard] Error initializing chart:', error);
        }
    }

    /**
     * Load analytics data specifically for chart
     */
    async function loadAnalyticsForChart() {
        try {
            const response = await authFetch(API_BASE + ENDPOINTS.analyticsSummary);
            if (!response.ok) throw new Error('Failed to fetch analytics');
            
            const data = await response.json();
            if (data.chartData) {
                updateChartData(data.chartData);
            }
        } catch (error) {
            console.error('[Dashboard] Error loading chart data:', error);
        }
    }

    // ========================================
    // Utility Functions
    // ========================================

    /**
     * Get time ago string from date
     */
    function getTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) {
            return diffMins <= 1 ? 'Just now' : `${diffMins} minutes ago`;
        } else if (diffHours < 24) {
            return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    }

    /**
     * Get icon class based on index
     */
    function getTestIconClass(index) {
        const classes = ['exam', 'quiz', 'note', 'streak', 'bookmark'];
        return classes[index % classes.length];
    }

    // ========================================
    // Export for global access
    // ========================================
    window.Dashboard = {
        loadUserProfile,
        loadPlanStatus,
        loadDashboardStats,
        loadRecentTests,
        loadAnalyticsSummary,
        initDashboard
    };

})();
