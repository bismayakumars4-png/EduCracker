/**
 * ========================================
 * EduCracker - Syllabus & Learning Module
 * Handles board selection, syllabus, formulas, and exam prep
 * ========================================
 */

const Syllabus = (function() {
    'use strict';

    // Configuration
    const API_BASE = '/api';

    // ========================================
    // Board & Exam Selection
    // ========================================

    /**
     * Fetch all available boards
     */
    async function getBoards() {
        try {
            const response = await fetch(`${API_BASE}/syllabus/boards`);
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.error('[Syllabus] Error fetching boards:', error);
            return [];
        }
    }

    /**
     * Fetch all target exams
     */
    async function getExams() {
        try {
            const response = await fetch(`${API_BASE}/syllabus/exams`);
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.error('[Syllabus] Error fetching exams:', error);
            return [];
        }
    }

    /**
     * Fetch subjects for a board and class
     */
    async function getSubjects(board, classLevel) {
        try {
            const response = await fetch(
                `${API_BASE}/syllabus/subjects?board=${board}&class=${classLevel}`
            );
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.error('[Syllabus] Error fetching subjects:', error);
            return [];
        }
    }

    // ========================================
    // Chapters & Topics
    // ========================================

    /**
     * Fetch chapters for a subject
     */
    async function getChapters(board, classLevel, subject) {
        try {
            const response = await fetch(
                `${API_BASE}/syllabus/chapters?board=${board}&class=${classLevel}&subject=${encodeURIComponent(subject)}`
            );
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.error('[Syllabus] Error fetching chapters:', error);
            return [];
        }
    }

    /**
     * Fetch complete syllabus for a board and class
     */
    async function getFullSyllabus(board, classLevel) {
        try {
            const response = await fetch(
                `${API_BASE}/syllabus/full?board=${board}&class=${classLevel}`
            );
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.error('[Syllabus] Error fetching full syllabus:', error);
            return null;
        }
    }

    /**
     * Fetch important topics based on weightage
     */
    async function getImportantTopics(board, classLevel, subject) {
        try {
            const response = await fetch(
                `${API_BASE}/syllabus/important-topics?board=${board}&class=${classLevel}&subject=${encodeURIComponent(subject)}`
            );
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.error('[Syllabus] Error fetching important topics:', error);
            return [];
        }
    }

    // ========================================
    // Formulas
    // ========================================

    /**
     * Fetch formulas for a subject
     */
    async function getFormulas(board, classLevel, subject) {
        try {
            const response = await fetch(
                `${API_BASE}/syllabus/formulas?board=${board}&class=${classLevel}&subject=${encodeURIComponent(subject)}`
            );
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.error('[Syllabus] Error fetching formulas:', error);
            return [];
        }
    }

    // ========================================
    // Learning Progress
    // ========================================

    /**
     * Fetch user learning progress
     */
    async function getProgress(userId) {
        try {
            const response = await fetch(`${API_BASE}/learning/progress/${userId}`);
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.error('[Learning] Error fetching progress:', error);
            return null;
        }
    }

    /**
     * Fetch weak areas for a user
     */
    async function getWeakAreas(userId, subject) {
        try {
            let url = `${API_BASE}/learning/weak-areas/${userId}`;
            if (subject) url += `?subject=${encodeURIComponent(subject)}`;
            
            const response = await fetch(url);
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.error('[Learning] Error fetching weak areas:', error);
            return [];
        }
    }

    /**
     * Fetch personalized recommendations
     */
    async function getRecommendations(userId) {
        try {
            const response = await fetch(`${API_BASE}/learning/recommendations/${userId}`);
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.error('[Learning] Error fetching recommendations:', error);
            return null;
        }
    }

    /**
     * Fetch chapter progress
     */
    async function getChapterProgress(userId, chapterId) {
        try {
            const response = await fetch(
                `${API_BASE}/learning/chapter-progress/${userId}/${chapterId}`
            );
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.error('[Learning] Error fetching chapter progress:', error);
            return null;
        }
    }

    /**
     * Update chapter progress
     */
    async function updateChapterProgress(userId, chapterId, questionsAttempted, correct, timeSpent) {
        try {
            const response = await fetch(`${API_BASE}/learning/chapter-progress`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    chapterId,
                    questionsAttempted,
                    correct,
                    timeSpent
                })
            });
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.error('[Learning] Error updating chapter progress:', error);
            return null;
        }
    }

    // ========================================
    // Analytics
    // ========================================

    /**
     * Fetch learning analytics
     */
    async function getAnalytics(userId, period = 30) {
        try {
            const response = await fetch(
                `${API_BASE}/learning/analytics/${userId}?period=${period}`
            );
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.error('[Learning] Error fetching analytics:', error);
            return null;
        }
    }

    /**
     * Fetch spaced repetition topics
     */
    async function getSpacedRepetition(userId) {
        try {
            const response = await fetch(`${API_BASE}/learning/spaced-repetition/${userId}`);
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.error('[Learning] Error fetching spaced repetition:', error);
            return null;
        }
    }

    // ========================================
    // UI Helpers
    // ========================================

    /**
     * Initialize board selector dropdown
     */
    function initBoardSelector(selectElement, onChange) {
        if (!selectElement) return;
        
        getBoards().then(boards => {
            selectElement.innerHTML = '<option value="">Select Board</option>';
            boards.forEach(board => {
                const option = document.createElement('option');
                option.value = board.code;
                option.textContent = board.name;
                selectElement.appendChild(option);
            });
            
            if (onChange) {
                selectElement.addEventListener('change', onChange);
            }
        });
    }

    /**
     * Initialize class selector dropdown
     */
    function initClassSelector(selectElement, onChange) {
        if (!selectElement) return;
        
        selectElement.innerHTML = '<option value="">Select Class</option>';
        for (let i = 6; i <= 12; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Class ${i}`;
            selectElement.appendChild(option);
        }
        
        if (onChange) {
            selectElement.addEventListener('change', onChange);
        }
    }

    /**
     * Render chapter list with progress
     */
    function renderChapterList(chapters, container, options = {}) {
        if (!container) return;
        
        const {
            showWeightage = true,
            showDifficulty = true,
            onChapterClick = null
        } = options;
        
        container.innerHTML = chapters.map(chapter => `
            <div class="chapter-item" data-chapter-id="${chapter.number}">
                <div class="chapter-number">${chapter.number}</div>
                <div class="chapter-info">
                    <h4 class="chapter-name">${chapter.name}</h4>
                    ${showWeightage ? `<span class="chapter-weightage">Weightage: ${chapter.weightage}%</span>` : ''}
                </div>
                ${showDifficulty ? `
                    <span class="chapter-difficulty difficulty-${chapter.difficulty.toLowerCase()}">
                        ${chapter.difficulty}
                    </span>
                ` : ''}
            </div>
        `).join('');
        
        if (onChapterClick) {
            container.querySelectorAll('.chapter-item').forEach(item => {
                item.addEventListener('click', () => {
                    const chapterId = item.dataset.chapterId;
                    const chapter = chapters.find(c => c.number === parseInt(chapterId));
                    onChapterClick(chapter);
                });
            });
        }
    }

    /**
     * Render formulas list
     */
    function renderFormulas(formulas, container) {
        if (!container) return;
        
        container.innerHTML = formulas.map(formula => `
            <div class="formula-card">
                <h4 class="formula-title">${formula.title}</h4>
                <div class="formula-text">${formula.formula}</div>
            </div>
        `).join('');
    }

    /**
     * Show difficulty badge color
     */
    function getDifficultyColor(difficulty) {
        const colors = {
            'EASY': '#10B981',
            'MEDIUM': '#F59E0B',
            'HARD': '#EF4444'
        };
        return colors[difficulty] || '#6B7280';
    }

    // Public API
    return {
        // Board & Exam
        getBoards,
        getExams,
        getSubjects,
        
        // Chapters & Topics
        getChapters,
        getFullSyllabus,
        getImportantTopics,
        
        // Formulas
        getFormulas,
        
        // Learning Progress
        getProgress,
        getWeakAreas,
        getRecommendations,
        getChapterProgress,
        updateChapterProgress,
        
        // Analytics
        getAnalytics,
        getSpacedRepetition,
        
        // UI Helpers
        initBoardSelector,
        initClassSelector,
        renderChapterList,
        renderFormulas,
        getDifficultyColor
    };
})();

// Make globally available
window.Syllabus = Syllabus;
