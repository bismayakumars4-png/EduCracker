/**
 * EduCracker Test Engine
 * Handles all test-taking functionality including timer, navigation, and scoring
 */

(function() {
    'use strict';

    // ========================================
    // API Configuration
    // ========================================
    const API_BASE = window.location.origin || 'http://localhost:5000';

    // ========================================
    // Test Data - Sample Questions
    // ========================================
    window.testData = {
        testId: 1,
        testName: 'Mathematics - Algebra Complete',
        testType: 'JEE Main',
        duration: 60, // minutes
        totalQuestions: 30,
        questions: [
            {
                id: 1,
                type: 'mcq',
                question: 'If x² + 5x + 6 = 0, then find the value of x² + 1/x².',
                options: [
                    { id: 'A', text: '14' },
                    { id: 'B', text: '17' },
                    { id: 'C', text: '19' },
                    { id: 'D', text: '21' }
                ],
                correctAnswer: 'A',
                marks: 4,
                negativeMarks: 1,
                topic: 'Quadratic Equations'
            },
            {
                id: 2,
                type: 'mcq',
                question: 'If (x + 1/x) = 3, find the value of (x² + 1/x²).',
                options: [
                    { id: 'A', text: '5' },
                    { id: 'B', text: '7' },
                    { id: 'C', text: '9' },
                    { id: 'D', text: '11' }
                ],
                correctAnswer: 'B',
                marks: 4,
                negativeMarks: 1,
                topic: 'Algebra'
            },
            {
                id: 3,
                type: 'mcq',
                question: 'Solve: x² - 7x + 12 = 0',
                options: [
                    { id: 'A', text: 'x = 3, 4' },
                    { id: 'B', text: 'x = 2, 5' },
                    { id: 'C', text: 'x = 1, 12' },
                    { id: 'D', text: 'x = -3, -4' }
                ],
                correctAnswer: 'A',
                marks: 4,
                negativeMarks: 1,
                topic: 'Quadratic Equations'
            },
            {
                id: 4,
                type: 'mcq',
                question: 'Find the roots of 2x² - 5x + 3 = 0',
                options: [
                    { id: 'A', text: '1, 1.5' },
                    { id: 'B', text: '1.5, 1' },
                    { id: 'C', text: '-1, -1.5' },
                    { id: 'D', text: '2, 1.5' }
                ],
                correctAnswer: 'A',
                marks: 4,
                negativeMarks: 1,
                topic: 'Quadratic Equations'
            },
            {
                id: 5,
                type: 'numerical',
                question: 'If the sum of roots of x² - 6x + k = 0 is 10, find the value of k.',
                correctAnswer: '16',
                marks: 4,
                negativeMarks: 0,
                topic: 'Quadratic Equations'
            },
            {
                id: 6,
                type: 'mcq',
                question: 'The product of roots of 3x² - 4x + 2 = 0 is:',
                options: [
                    { id: 'A', text: '2/3' },
                    { id: 'B', text: '-2/3' },
                    { id: 'C', text: '4/3' },
                    { id: 'D', text: '-4/3' }
                ],
                correctAnswer: 'A',
                marks: 4,
                negativeMarks: 1,
                topic: 'Quadratic Equations'
            },
            {
                id: 7,
                type: 'mcq',
                question: 'If one root of x² - kx + 8 = 0 is 4, find k.',
                options: [
                    { id: 'A', text: '6' },
                    { id: 'B', text: '8' },
                    { id: 'C', text: '10' },
                    { id: 'D', text: '12' }
                ],
                correctAnswer: 'A',
                marks: 4,
                negativeMarks: 1,
                topic: 'Quadratic Equations'
            },
            {
                id: 8,
                type: 'mcq',
                question: 'Find the discriminant of 4x² - 5x + 1 = 0',
                options: [
                    { id: 'A', text: '9' },
                    { id: 'B', text: '25' },
                    { id: 'C', text: '41' },
                    { id: 'D', text: '16' }
                ],
                correctAnswer: 'A',
                marks: 4,
                negativeMarks: 1,
                topic: 'Quadratic Equations'
            },
            {
                id: 9,
                type: 'mcq',
                question: 'The nature of roots of x² + 4x + 5 = 0 is:',
                options: [
                    { id: 'A', text: 'Real and equal' },
                    { id: 'B', text: 'Real and unequal' },
                    { id: 'C', text: 'Imaginary' },
                    { id: 'D', text: 'Equal' }
                ],
                correctAnswer: 'C',
                marks: 4,
                negativeMarks: 1,
                topic: 'Quadratic Equations'
            },
            {
                id: 10,
                type: 'mcq',
                question: 'If α and β are roots of x² - 3x + 2 = 0, find α² + β²',
                options: [
                    { id: 'A', text: '5' },
                    { id: 'B', text: '7' },
                    { id: 'C', text: '9' },
                    { id: 'D', text: '13' }
                ],
                correctAnswer: 'A',
                marks: 4,
                negativeMarks: 1,
                topic: 'Quadratic Equations'
            },
            // Additional questions for the full test
            {
                id: 11,
                type: 'mcq',
                question: 'Factorize: x² - 9x + 20',
                options: [
                    { id: 'A', text: '(x-4)(x-5)' },
                    { id: 'B', text: '(x-2)(x-10)' },
                    { id: 'C', text: '(x+4)(x+5)' },
                    { id: 'D', text: '(x+2)(x+10)' }
                ],
                correctAnswer: 'A',
                marks: 4,
                negativeMarks: 1,
                topic: 'Polynomials'
            },
            {
                id: 12,
                type: 'mcq',
                question: 'Find the LCM of x² - 4 and x² - x - 2',
                options: [
                    { id: 'A', text: '(x-2)(x+2)' },
                    { id: 'B', text: '(x-2)(x+1)' },
                    { id: 'C', text: '(x-2)²(x+2)' },
                    { id: 'D', text: '(x+2)(x-1)' }
                ],
                correctAnswer: 'C',
                marks: 4,
                negativeMarks: 1,
                topic: 'Polynomials'
            },
            {
                id: 13,
                type: 'mcq',
                question: 'Solve the inequality: 2x - 3 > 7',
                options: [
                    { id: 'A', text: 'x > 5' },
                    { id: 'B', text: 'x < 5' },
                    { id: 'C', text: 'x ≥ 5' },
                    { id: 'D', text: 'x ≤ 5' }
                ],
                correctAnswer: 'A',
                marks: 4,
                negativeMarks: 1,
                topic: 'Inequalities'
            },
            {
                id: 14,
                type: 'mcq',
                question: 'If |x - 3| = 7, find the possible values of x',
                options: [
                    { id: 'A', text: '10 or -4' },
                    { id: 'B', text: '10 or 4' },
                    { id: 'C', text: '-10 or 4' },
                    { id: 'D', text: '-10 or -4' }
                ],
                correctAnswer: 'A',
                marks: 4,
                negativeMarks: 1,
                topic: 'Inequalities'
            },
            {
                id: 15,
                type: 'mcq',
                question: 'Solve: |2x + 1| ≤ 5',
                options: [
                    { id: 'A', text: '-3 ≤ x ≤ 2' },
                    { id: 'B', text: '-2 ≤ x ≤ 3' },
                    { id: 'C', text: '-1 ≤ x ≤ 2' },
                    { id: 'D', text: '-2 ≤ x ≤ 2' }
                ],
                correctAnswer: 'A',
                marks: 4,
                negativeMarks: 1,
                topic: 'Inequalities'
            },
            {
                id: 16,
                type: 'mcq',
                question: 'Find the value of x if 3^x = 81',
                options: [
                    { id: 'A', text: '2' },
                    { id: 'B', text: '3' },
                    { id: 'C', text: '4' },
                    { id: 'D', text: '5' }
                ],
                correctAnswer: 'C',
                marks: 4,
                negativeMarks: 1,
                topic: 'Exponents'
            },
            {
                id: 17,
                type: 'mcq',
                question: 'Simplify: (x²)^3 × (x³)^2',
                options: [
                    { id: 'A', text: 'x¹²' },
                    { id: 'B', text: 'x¹⁰' },
                    { id: 'C', text: 'x⁸' },
                    { id: 'D', text: 'x⁶' }
                ],
                correctAnswer: 'A',
                marks: 4,
                negativeMarks: 1,
                topic: 'Exponents'
            },
            {
                id: 18,
                type: 'mcq',
                question: 'If log₂(x) = 5, find x',
                options: [
                    { id: 'A', text: '10' },
                    { id: 'B', text: '25' },
                    { id: 'C', text: '32' },
                    { id: 'D', text: '64' }
                ],
                correctAnswer: 'C',
                marks: 4,
                negativeMarks: 1,
                topic: 'Logarithms'
            },
            {
                id: 19,
                type: 'mcq',
                question: 'Simplify: log₃(27) + log₃(9)',
                options: [
                    { id: 'A', text: '5' },
                    { id: 'B', text: '4' },
                    { id: 'C', text: '3' },
                    { id: 'D', text: '2' }
                ],
                correctAnswer: 'A',
                marks: 4,
                negativeMarks: 1,
                topic: 'Logarithms'
            },
            {
                id: 20,
                type: 'mcq',
                question: 'Find the 5th term of AP: 2, 5, 8, ...',
                options: [
                    { id: 'A', text: '11' },
                    { id: 'B', text: '14' },
                    { id: 'C', text: '17' },
                    { id: 'D', text: '20' }
                ],
                correctAnswer: 'B',
                marks: 4,
                negativeMarks: 1,
                topic: 'Sequence & Series'
            },
            {
                id: 21,
                type: 'mcq',
                question: 'Find sum of first 10 natural numbers',
                options: [
                    { id: 'A', text: '45' },
                    { id: 'B', text: '50' },
                    { id: 'C', text: '55' },
                    { id: 'D', text: '60' }
                ],
                correctAnswer: 'C',
                marks: 4,
                negativeMarks: 1,
                topic: 'Sequence & Series'
            },
            {
                id: 22,
                type: 'mcq',
                question: 'If the 3rd term of GP is 12 and 6th term is 96, find the common ratio',
                options: [
                    { id: 'A', text: '1' },
                    { id: 'B', text: '2' },
                    { id: 'C', text: '3' },
                    { id: 'D', text: '4' }
                ],
                correctAnswer: 'B',
                marks: 4,
                negativeMarks: 1,
                topic: 'Sequence & Series'
            },
            {
                id: 23,
                type: 'mcq',
                question: 'Expand: (x + y)²',
                options: [
                    { id: 'A', text: 'x² + y²' },
                    { id: 'B', text: 'x² + 2xy + y²' },
                    { id: 'C', text: 'x² - 2xy + y²' },
                    { id: 'D', text: 'x² + xy + y²' }
                ],
                correctAnswer: 'B',
                marks: 4,
                negativeMarks: 1,
                topic: 'Algebra'
            },
            {
                id: 24,
                type: 'mcq',
                question: 'Factorize: 4x² - 9y²',
                options: [
                    { id: 'A', text: '(2x - 3y)(2x + 3y)' },
                    { id: 'B', text: '(4x - 3y)(x + 3y)' },
                    { id: 'C', text: '(2x - y)(2x + 9y)' },
                    { id: 'D', text: '(x - 3y)(4x + 3y)' }
                ],
                correctAnswer: 'A',
                marks: 4,
                negativeMarks: 1,
                topic: 'Algebra'
            },
            {
                id: 25,
                type: 'mcq',
                question: 'Find the value of (a+b)³ when a+b = 5',
                options: [
                    { id: 'A', text: '125' },
                    { id: 'B', text: '75' },
                    { id: 'C', text: '100' },
                    { id: 'D', text: '150' }
                ],
                correctAnswer: 'A',
                marks: 4,
                negativeMarks: 1,
                topic: 'Algebra'
            },
            {
                id: 26,
                type: 'mcq',
                question: 'Simplify: √(50) + √(18)',
                options: [
                    { id: 'A', text: '8√2' },
                    { id: 'B', text: '4√2' },
                    { id: 'C', text: '2√2' },
                    { id: 'D', text: '6√2' }
                ],
                correctAnswer: 'A',
                marks: 4,
                negativeMarks: 1,
                topic: 'Algebra'
            },
            {
                id: 27,
                type: 'mcq',
                question: 'If x : y = 3 : 4, find (2x + 3y) : (3x + 4y)',
                options: [
                    { id: 'A', text: '18 : 25' },
                    { id: 'B', text: '17 : 24' },
                    { id: 'C', text: '15 : 22' },
                    { id: 'D', text: '16 : 23' }
                ],
                correctAnswer: 'A',
                marks: 4,
                negativeMarks: 1,
                topic: 'Ratio & Proportion'
            },
            {
                id: 28,
                type: 'mcq',
                question: 'A mixture contains milk and water in ratio 5:3. If 8 liters of water added, ratio becomes 5:4. Find initial quantity.',
                options: [
                    { id: 'A', text: '40 L' },
                    { id: 'B', text: '50 L' },
                    { id: 'C', text: '60 L' },
                    { id: 'D', text: '70 L' }
                ],
                correctAnswer: 'A',
                marks: 4,
                negativeMarks: 1,
                topic: 'Ratio & Proportion'
            },
            {
                id: 29,
                type: 'mcq',
                question: 'Solve: x/3 + x/4 = 7',
                options: [
                    { id: 'A', text: '12' },
                    { id: 'B', text: '10' },
                    { id: 'C', text: '14' },
                    { id: 'D', text: '8' }
                ],
                correctAnswer: 'A',
                marks: 4,
                negativeMarks: 1,
                topic: 'Linear Equations'
            },
            {
                id: 30,
                type: 'mcq',
                question: 'Find x: 2(x + 3) - 3(x - 1) = 5',
                options: [
                    { id: 'A', text: '2' },
                    { id: 'B', text: '0' },
                    { id: 'C', text: '4' },
                    { id: 'D', text: '-2' }
                ],
                correctAnswer: 'A',
                marks: 4,
                negativeMarks: 1,
                topic: 'Linear Equations'
            }
        ]
    };

    // ========================================
    // Test State
    // ========================================
    window.testState = {
        currentQuestion: 1,
        answers: {},
        markedForReview: {},
        timeRemaining: 60 * 60, // seconds
        timerInterval: null,
        testStarted: false
    };

    // ========================================
    // DOM Ready
    // ========================================
    document.addEventListener('DOMContentLoaded', function() {
        try {
            // Check if we're on test page
            if (document.getElementById('timerDisplay')) {
                initTest();
            }
            
            // Check if we're on result page
            if (document.getElementById('resultContainer')) {
                initResultPage();
            }
            
            // Filter tabs on tests page
            initFilterTabs();
            
            // Category cards
            initCategoryCards();
            
            // Bookmark buttons
            initBookmarkButtons();
        } catch (error) {
            console.error('Error initializing test engine:', error);
        }
    });

    // ========================================
    // Initialize Test
    // ========================================
    function initTest() {
        // Get test ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const testId = urlParams.get('testId');
        
        if (testId && window.testData) {
            // Initialize state
            window.testState.currentQuestion = 1;
            window.testState.answers = {};
            window.testState.markedForReview = {};
            window.testState.timeRemaining = window.testData.duration * 60;
            window.testState.testStarted = true;
            
            // Update UI
            document.getElementById('totalQuestions').textContent = window.testData.totalQuestions;
            
            // Render first question
            renderQuestion(1);
            
            // Initialize question palette
            initQuestionPalette();
            
            // Start timer
            startTimer();
            
            // Load saved state if exists
            loadTestState();
        }
    }

    // ========================================
    // Timer Functions
    // ========================================
    function startTimer() {
        const timerDisplay = document.getElementById('timerValue');
        const timerRing = document.querySelector('.timer-ring-progress');
        
        if (!timerDisplay) return;
        
        const totalSeconds = window.testData.duration * 60;
        
        window.testState.timerInterval = setInterval(function() {
            if (window.testState.timeRemaining <= 0) {
                clearInterval(window.testState.timerInterval);
                showTimeUpModal();
                return;
            }
            
            window.testState.timeRemaining--;
            
            // Update display
            const minutes = Math.floor(window.testState.timeRemaining / 60);
            const seconds = window.testState.timeRemaining % 60;
            timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            // Update ring progress
            if (timerRing) {
                const progress = (window.testState.timeRemaining / totalSeconds) * 163.36;
                timerRing.style.strokeDashoffset = 163.36 - progress;
                
                // Change color based on time remaining
                if (window.testState.timeRemaining < 300) { // Less than 5 minutes
                    timerRing.style.stroke = '#EF4444';
                } else if (window.testState.timeRemaining < 600) { // Less than 10 minutes
                    timerRing.style.stroke = '#F59E0B';
                }
            }
            
            // Save state periodically
            if (window.testState.timeRemaining % 30 === 0) {
                saveTestState();
            }
        }, 1000);
    }

    function stopTimer() {
        if (window.testState.timerInterval) {
            clearInterval(window.testState.timerInterval);
        }
    }

    // ========================================
    // Question Rendering
    // ========================================
    function renderQuestion(questionNum) {
        const question = window.testData.questions.find(q => q.id === questionNum);
        if (!question) return;
        
        // Update question number display
        document.getElementById('currentQuestionNum').textContent = questionNum;
        
        // Update question type badge
        const typeBadge = document.getElementById('questionType');
        typeBadge.textContent = question.type === 'mcq' ? 'Multiple Choice' : 'Numerical';
        
        // Update question text
        document.getElementById('questionText').innerHTML = `<p>${question.question}</p>`;
        
        // Update options or numerical input
        const optionsContainer = document.getElementById('optionsContainer');
        const numericalContainer = document.getElementById('numericalContainer');
        
        if (question.type === 'mcq') {
            optionsContainer.style.display = 'block';
            numericalContainer.style.display = 'none';
            
            optionsContainer.innerHTML = question.options.map(option => {
                const isSelected = window.testState.answers[questionNum] === option.id;
                return `
                    <div class="option-item ${isSelected ? 'selected' : ''}" data-option="${option.id}" onclick="selectOption('${option.id}')">
                        <span class="option-letter">${option.id}</span>
                        <span class="option-text">${option.text}</span>
                    </div>
                `;
            }).join('');
        } else {
            optionsContainer.style.display = 'none';
            numericalContainer.style.display = 'block';
            
            const numericalInput = document.getElementById('numericalAnswer');
            numericalInput.value = window.testState.answers[questionNum] || '';
            numericalInput.addEventListener('input', function() {
                window.testState.answers[questionNum] = this.value;
                updatePaletteStats();
                saveTestState();
            });
        }
        
        // Update mark for review button
        updateMarkReviewButton(questionNum);
        
        // Update navigation buttons
        updateNavButtons(questionNum);
        
        // Update palette current indicator
        updatePaletteCurrent(questionNum);
        
        window.testState.currentQuestion = questionNum;
    }

    // ========================================
    // Option Selection
    // ========================================
    window.selectOption = function(optionId) {
        const questionNum = window.testState.currentQuestion;
        
        // Clear previous selection
        const options = document.querySelectorAll('.option-item');
        options.forEach(opt => opt.classList.remove('selected'));
        
        // Select new option
        const selectedOption = document.querySelector(`[data-option="${optionId}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }
        
        // Save answer
        window.testState.answers[questionNum] = optionId;
        
        // Update palette
        updatePaletteStats();
        saveTestState();
        
        // Show toast
        window.showToast('Answer selected', 'success');
    };

    // ========================================
    // Navigation
    // ========================================
    window.prevQuestion = function() {
        if (window.testState.currentQuestion > 1) {
            renderQuestion(window.testState.currentQuestion - 1);
        }
    };

    window.nextQuestion = function() {
        if (window.testState.currentQuestion < window.testData.totalQuestions) {
            renderQuestion(window.testState.currentQuestion + 1);
        }
    };

    window.goToQuestion = function(questionNum) {
        renderQuestion(questionNum);
    };

    function updateNavButtons(questionNum) {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.disabled = questionNum === 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = questionNum === window.testData.totalQuestions;
        }
    }

    // ========================================
    // Mark for Review
    // ========================================
    window.toggleMarkReview = function() {
        const questionNum = window.testState.currentQuestion;
        
        if (window.testState.markedForReview[questionNum]) {
            delete window.testState.markedForReview[questionNum];
        } else {
            window.testState.markedForReview[questionNum] = true;
        }
        
        updateMarkReviewButton(questionNum);
        updatePaletteStats();
        saveTestState();
    };

    function updateMarkReviewButton(questionNum) {
        const btn = document.getElementById('markReviewBtn');
        if (!btn) return;
        
        if (window.testState.markedForReview[questionNum]) {
            btn.classList.add('active');
            btn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
                <span>Marked</span>
            `;
        } else {
            btn.classList.remove('active');
            btn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
                <span>Mark for Review</span>
            `;
        }
    }

    // ========================================
    // Clear Response
    // ========================================
    window.clearResponse = function() {
        const questionNum = window.testState.currentQuestion;
        const question = window.testData.questions.find(q => q.id === questionNum);
        
        if (question.type === 'mcq') {
            const options = document.querySelectorAll('.option-item');
            options.forEach(opt => opt.classList.remove('selected'));
        } else {
            document.getElementById('numericalAnswer').value = '';
        }
        
        delete window.testState.answers[questionNum];
        updatePaletteStats();
        saveTestState();
        
        window.showToast('Response cleared', 'info');
    };

    // ========================================
    // Question Palette
    // ========================================
    function initQuestionPalette() {
        const paletteGrid = document.getElementById('paletteGrid');
        if (!paletteGrid) return;
        
        paletteGrid.innerHTML = '';
        
        for (let i = 1; i <= window.testData.totalQuestions; i++) {
            const questionBtn = document.createElement('button');
            questionBtn.className = 'palette-btn';
            questionBtn.dataset.question = i;
            questionBtn.textContent = i;
            questionBtn.onclick = function() {
                goToQuestion(i);
            };
            paletteGrid.appendChild(questionBtn);
        }
        
        updatePaletteStats();
    }

    function updatePaletteStats() {
        const paletteBtns = document.querySelectorAll('.palette-btn');
        
        paletteBtns.forEach(btn => {
            const questionNum = parseInt(btn.dataset.question);
            btn.className = 'palette-btn';
            
            if (questionNum === window.testState.currentQuestion) {
                btn.classList.add('current');
            } else if (window.testState.markedForReview[questionNum]) {
                btn.classList.add('review');
            } else if (window.testState.answers[questionNum]) {
                btn.classList.add('answered');
            } else {
                btn.classList.add('unanswered');
            }
        });
        
        // Update stats
        const answered = Object.keys(window.testState.answers).length;
        const review = Object.keys(window.testState.markedForReview).length;
        const notAnswered = window.testData.totalQuestions - answered;
        
        document.getElementById('answeredCount').textContent = answered;
        document.getElementById('notAnsweredCount').textContent = notAnswered;
        document.getElementById('reviewCount').textContent = review;
    }

    function updatePaletteCurrent(questionNum) {
        updatePaletteStats();
    }

    // ========================================
    // Submit Test
    // ========================================
    window.showSubmitModal = function() {
        const answered = Object.keys(window.testState.answers).length;
        const review = Object.keys(window.testState.markedForReview).length;
        const notAnswered = window.testData.totalQuestions - answered;
        
        document.getElementById('summaryAnswered').textContent = answered;
        document.getElementById('summaryNotAnswered').textContent = notAnswered;
        document.getElementById('summaryReview').textContent = review;
        
        const minutes = Math.floor(window.testState.timeRemaining / 60);
        const seconds = window.testState.timeRemaining % 60;
        document.getElementById('summaryTime').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('submitModal').classList.add('active');
    };

    window.closeSubmitModal = function() {
        document.getElementById('submitModal').classList.remove('active');
    };

    window.submitTest = async function() {
        stopTimer();
        saveTestState();
        
        // Calculate score
        const score = calculateScore();
        const timeTaken = window.testData.duration * 60 - window.testState.timeRemaining;
        
        // Prepare result data
        const resultData = {
            testId: window.testData.testId,
            testName: window.testData.testName,
            score: score,
            answers: window.testState.answers,
            timeTaken: timeTaken
        };
        
        // Try to save to backend first
        let savedToBackend = false;
        try {
            const response = await fetch(`${API_BASE}/api/tests/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    testId: String(window.testData.testId),
                    score: score.marksObtained,
                    totalQuestions: window.testData.totalQuestions,
                    percentage: score.percentage,
                    timeTaken: timeTaken
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('[TestEngine] Result saved to backend:', data);
                savedToBackend = true;
                
                // Store save status for result page
                sessionStorage.setItem('resultSavedToBackend', 'true');
            } else {
                console.warn('[TestEngine] Backend save failed, status:', response.status);
            }
        } catch (error) {
            console.warn('[TestEngine] Backend not available, falling back to localStorage:', error.message);
        }
        
        // Always store in localStorage as backup
        localStorage.setItem('testResult', JSON.stringify(resultData));
        
        // Set fallback flag if backend failed
        if (!savedToBackend) {
            sessionStorage.setItem('resultSavedToBackend', 'false');
        }
        
        // Redirect to results
        window.location.href = 'test-result.html';
    };

    function calculateScore() {
        let correct = 0;
        let incorrect = 0;
        let skipped = 0;
        
        window.testData.questions.forEach(question => {
            const userAnswer = window.testState.answers[question.id];
            
            if (!userAnswer) {
                skipped++;
            } else if (userAnswer === question.correctAnswer) {
                correct++;
            } else {
                incorrect++;
            }
        });
        
        const marksObtained = (correct * 4) - (incorrect * 1);
        const totalMarks = window.testData.totalQuestions * 4;
        const percentage = Math.round((marksObtained / totalMarks) * 100);
        
        return {
            correct,
            incorrect,
            skipped,
            marksObtained,
            totalMarks,
            percentage
        };
    }

    // ========================================
    // Time's Up
    // ========================================
    window.showTimeUpModal = function() {
        document.getElementById('timeUpModal').classList.add('active');
    };

    window.viewResults = function() {
        submitTest();
    };

    // ========================================
    // State Persistence
    // ========================================
    function saveTestState() {
        const state = {
            currentQuestion: window.testState.currentQuestion,
            answers: window.testState.answers,
            markedForReview: window.testState.markedForReview,
            timeRemaining: window.testState.timeRemaining,
            testId: window.testData.testId
        };
        
        localStorage.setItem('testState', JSON.stringify(state));
    }

    function loadTestState() {
        const savedState = localStorage.getItem('testState');
        
        if (savedState) {
            const state = JSON.parse(savedState);
            
            if (state.testId === window.testData.testId) {
                window.testState.currentQuestion = state.currentQuestion || 1;
                window.testState.answers = state.answers || {};
                window.testState.markedForReview = state.markedForReview || {};
                window.testState.timeRemaining = state.timeRemaining || window.testData.duration * 60;
                
                renderQuestion(window.testState.currentQuestion);
                updatePaletteStats();
            }
        }
    }

    // ========================================
    // Filter Tabs (Tests Page)
    // ========================================
    function initFilterTabs() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active tab
                filterTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Filter test cards
                filterTestCards(filter);
            });
        });
    }

    function filterTestCards(filter) {
        const testCards = document.querySelectorAll('.test-card');
        
        testCards.forEach(card => {
            const status = card.dataset.status;
            
            if (filter === 'all') {
                card.style.display = 'block';
            } else if (filter === 'completed') {
                card.style.display = status === 'completed' ? 'block' : 'none';
            } else if (filter === 'available') {
                card.style.display = status === 'available' ? 'block' : 'none';
            } else if (filter === 'bookmarked') {
                const isBookmarked = card.querySelector('.bookmark-btn.bookmarked');
                card.style.display = isBookmarked ? 'block' : 'none';
            }
        });
    }

    // ========================================
    // Category Cards
    // ========================================
    function initCategoryCards() {
        const categoryCards = document.querySelectorAll('.category-card');
        
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                const category = this.dataset.category;
                
                // Update active card
                categoryCards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                
                // Filter by category
                filterByCategory(category);
            });
        });
    }

    function filterByCategory(category) {
        const testCards = document.querySelectorAll('.test-card');
        
        testCards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
            } else {
                card.style.display = card.dataset.category === category ? 'block' : 'none';
            }
        });
    }

    // ========================================
    // Bookmark Buttons
    // ========================================
    function initBookmarkButtons() {
        const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
        
        bookmarkBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                this.classList.toggle('bookmarked');
                
                if (this.classList.contains('bookmarked')) {
                    this.innerHTML = `
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                        </svg>
                    `;
                    window.showToast('Test bookmarked', 'success');
                } else {
                    this.innerHTML = `
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                        </svg>
                    `;
                    window.showToast('Bookmark removed', 'info');
                }
            });
        });
    }

    // ========================================
    // Result Page Loading
    // ========================================
    function initResultPage() {
        const resultContainer = document.getElementById('resultContainer');
        if (!resultContainer) return;
        
        // Load result from localStorage
        const savedResult = localStorage.getItem('testResult');
        
        if (!savedResult) {
            // No result found, redirect to tests
            window.location.href = 'tests.html';
            return;
        }
        
        const result = JSON.parse(savedResult);
        
        // Update test info
        document.getElementById('resultTestName').textContent = result.testName || 'Test';
        document.getElementById('resultTestType').textContent = window.testData.testType || 'JEE Main';
        
        // Update score
        const score = result.score;
        document.getElementById('scorePercentage').textContent = score.percentage + '%';
        document.getElementById('scoreGrade').textContent = getGrade(score.percentage);
        document.getElementById('scoreGradeText').textContent = getGradeText(score.percentage);
        
        // Update score ring
        const scoreRing = document.querySelector('.score-ring-fill');
        if (scoreRing) {
            const circumference = 339.29;
            const offset = circumference - (score.percentage / 100) * circumference;
            scoreRing.style.strokeDashoffset = offset;
            
            // Change color based on score
            if (score.percentage >= 80) {
                scoreRing.style.stroke = '#10B981'; // Green
            } else if (score.percentage >= 60) {
                scoreRing.style.stroke = '#3B82F6'; // Blue
            } else if (score.percentage >= 40) {
                scoreRing.style.stroke = '#F59E0B'; // Orange
            } else {
                scoreRing.style.stroke = '#EF4444'; // Red
            }
        }
        
        // Update stats
        document.getElementById('correctCount').textContent = score.correct;
        document.getElementById('incorrectCount').textContent = score.incorrect;
        document.getElementById('skippedCount').textContent = score.skipped;
        
        // Format time taken
        const timeTaken = result.timeTaken || 0;
        const minutes = Math.floor(timeTaken / 60);
        const seconds = timeTaken % 60;
        document.getElementById('timeTaken').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Render question analysis
        renderQuestionAnalysis(result.answers);
        
        // Render topic breakdown
        renderTopicBreakdown(result.answers);
    }
    
    function getGrade(percentage) {
        if (percentage >= 90) return 'A+';
        if (percentage >= 80) return 'A';
        if (percentage >= 70) return 'B+';
        if (percentage >= 60) return 'B';
        if (percentage >= 50) return 'C';
        if (percentage >= 40) return 'D';
        return 'F';
    }
    
    function getGradeText(percentage) {
        if (percentage >= 90) return 'Outstanding!';
        if (percentage >= 80) return 'Excellent!';
        if (percentage >= 70) return 'Great Job!';
        if (percentage >= 60) return 'Good Work!';
        if (percentage >= 50) return 'Keep Trying!';
        if (percentage >= 40) return 'Needs Improvement';
        return 'Keep Practicing';
    }
    
    function renderQuestionAnalysis(userAnswers) {
        const questionsList = document.getElementById('questionsList');
        if (!questionsList) return;
        
        questionsList.innerHTML = window.testData.questions.map(question => {
            const userAnswer = userAnswers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            const isSkipped = !userAnswer;
            
            let statusClass = 'skipped';
            let statusText = '− Not Attempted';
            
            if (isSkipped) {
                statusClass = 'skipped';
                statusText = '− Not Attempted';
            } else if (isCorrect) {
                statusClass = 'correct';
                statusText = '✓ Correct';
            } else {
                statusClass = 'incorrect';
                statusText = '✕ Incorrect';
            }
            
            const userAnswerText = isSkipped ? '-' : (question.type === 'mcq' ? 
                (question.options.find(o => o.id === userAnswer)?.text || userAnswer) : userAnswer);
            const correctAnswerText = question.type === 'mcq' ? 
                (question.options.find(o => o.id === question.correctAnswer)?.text || question.correctAnswer) : 
                question.correctAnswer;
            const correctOptionId = question.type === 'mcq' ? question.correctAnswer : '';
            
            return `
                <div class="question-review ${statusClass}">
                    <div class="review-header">
                        <span class="question-num">Q${question.id}</span>
                        <span class="question-status ${statusClass}">${statusText}</span>
                    </div>
                    <p class="review-question">${question.question}</p>
                    <div class="review-answer">
                        <div class="your-answer">
                            <span class="answer-label">Your Answer:</span>
                            <span class="answer-value">${userAnswerText}${question.type === 'mcq' && !isSkipped ? ' (' + userAnswer + ')' : ''}</span>
                        </div>
                        <div class="correct-answer">
                            <span class="answer-label">Correct Answer:</span>
                            <span class="answer-value">${correctAnswerText}${question.type === 'mcq' ? ' (' + correctOptionId + ')' : ''}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    function renderTopicBreakdown(userAnswers) {
        const breakdownContainer = document.getElementById('topicBreakdown');
        if (!breakdownContainer) return;
        
        // Group questions by topic
        const topicStats = {};
        
        window.testData.questions.forEach(question => {
            const topic = question.topic || 'General';
            
            if (!topicStats[topic]) {
                topicStats[topic] = { total: 0, correct: 0, incorrect: 0, skipped: 0 };
            }
            
            topicStats[topic].total++;
            const userAnswer = userAnswers[question.id];
            
            if (!userAnswer) {
                topicStats[topic].skipped++;
            } else if (userAnswer === question.correctAnswer) {
                topicStats[topic].correct++;
            } else {
                topicStats[topic].incorrect++;
            }
        });
        
        // Render topic breakdown
        breakdownContainer.innerHTML = Object.entries(topicStats).map(([topic, stats]) => {
            const percentage = Math.round((stats.correct / stats.total) * 100);
            
            return `
                <div class="topic-item">
                    <div class="topic-header">
                        <span class="topic-name">${topic}</span>
                        <span class="topic-score">${stats.correct}/${stats.total} (${percentage}%)</span>
                    </div>
                    <div class="topic-progress">
                        <div class="progress-bar" style="width: ${percentage}%"></div>
                    </div>
                    <div class="topic-stats">
                        <span class="topic-stat correct">✓ ${stats.correct}</span>
                        <span class="topic-stat incorrect">✕ ${stats.incorrect}</span>
                        <span class="topic-stat skipped">− ${stats.skipped}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    // ========================================
    // Search Functionality
    // ========================================
    const searchInput = document.getElementById('testSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const testCards = document.querySelectorAll('.test-card');
            
            testCards.forEach(card => {
                const title = card.querySelector('.test-title').textContent.toLowerCase();
                const description = card.querySelector('.test-description').textContent.toLowerCase();
                
                if (title.includes(query) || description.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

})();
