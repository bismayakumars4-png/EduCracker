/**
 * ========================================
 * EduCracker - Practice Routes
 * API endpoints for flashcards, questions, and quick practice
 * ========================================
 */

const express = require('express');
const router = express.Router();
const flashcardsData = require('../data/flashcards');
const questionBankData = require('../data/questionBank');

// ========================================
// GET /api/practice/flashcards
// Get flashcards for a subject
// Query params: board, class, subject
// ========================================
router.get('/flashcards', async (req, res) => {
  try {
    const { board, class: classLevel, subject } = req.query;
    
    if (!board || !classLevel || !subject) {
      return res.status(400).json({
        success: false,
        error: 'Board, class, and subject are required'
      });
    }
    
    const flashcards = flashcardsData.getFlashcards(board, parseInt(classLevel), subject);
    
    res.json({
      success: true,
      data: flashcards,
      count: flashcards.length
    });
  } catch (error) {
    console.error('[Practice] Error fetching flashcards:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch flashcards'
    });
  }
});

// ========================================
// GET /api/practice/flashcards/random
// Get random flashcards for quick practice
// ========================================
router.get('/flashcards/random', async (req, res) => {
  try {
    const { board, class: classLevel, subject, count = 10 } = req.query;
    
    if (!board || !classLevel || !subject) {
      return res.status(400).json({
        success: false,
        error: 'Board, class, and subject are required'
      });
    }
    
    const flashcards = flashcardsData.getRandomFlashcards(
      board, 
      parseInt(classLevel), 
      subject, 
      parseInt(count)
    );
    
    res.json({
      success: true,
      data: flashcards,
      count: flashcards.length
    });
  } catch (error) {
    console.error('[Practice] Error fetching random flashcards:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch flashcards'
    });
  }
});

// ========================================
// GET /api/practice/questions
// Get questions from question bank
// Query params: board, class, subject, chapter (optional)
// ========================================
router.get('/questions', async (req, res) => {
  try {
    const { board, class: classLevel, subject, chapter } = req.query;
    
    if (!board || !classLevel || !subject) {
      return res.status(400).json({
        success: false,
        error: 'Board, class, and subject are required'
      });
    }
    
    let questions;
    if (chapter) {
      questions = questionBankData.getQuestionsByChapter(
        board, 
        parseInt(classLevel), 
        subject, 
        parseInt(chapter)
      );
    } else {
      questions = questionBankData.getQuestions(board, parseInt(classLevel), subject);
    }
    
    res.json({
      success: true,
      data: questions,
      count: questions.length
    });
  } catch (error) {
    console.error('[Practice] Error fetching questions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch questions'
    });
  }
});

// ========================================
// GET /api/practice/questions/random
// Get random questions for practice
// ========================================
router.get('/questions/random', async (req, res) => {
  try {
    const { board, class: classLevel, subject, count = 10 } = req.query;
    
    if (!board || !classLevel || !subject) {
      return res.status(400).json({
        success: false,
        error: 'Board, class, and subject are required'
      });
    }
    
    const questions = questionBankData.getRandomQuestions(
      board,
      parseInt(classLevel),
      subject,
      parseInt(count)
    );
    
    res.json({
      success: true,
      data: questions,
      count: questions.length
    });
  } catch (error) {
    console.error('[Practice] Error fetching random questions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch questions'
    });
  }
});

// ========================================
// GET /api/practice/questions/mixed
// Get mixed difficulty questions
// ========================================
router.get('/questions/mixed', async (req, res) => {
  try {
    const { board, class: classLevel, subject, easy = 5, medium = 8, hard = 2 } = req.query;
    
    if (!board || !classLevel || !subject) {
      return res.status(400).json({
        success: false,
        error: 'Board, class, and subject are required'
      });
    }
    
    const questions = questionBankData.getMixedQuestions(
      board,
      parseInt(classLevel),
      subject,
      parseInt(easy),
      parseInt(medium),
      parseInt(hard)
    );
    
    res.json({
      success: true,
      data: questions,
      count: questions.length,
      breakdown: {
        easy: Math.min(parseInt(easy), questions.filter(q => q.difficulty === 'EASY').length),
        medium: Math.min(parseInt(medium), questions.filter(q => q.difficulty === 'MEDIUM').length),
        hard: Math.min(parseInt(hard), questions.filter(q => q.difficulty === 'HARD').length)
      }
    });
  } catch (error) {
    console.error('[Practice] Error fetching mixed questions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch questions'
    });
  }
});

// ========================================
// GET /api/practice/questions/chapter/:chapter
// Get questions for a specific chapter
// ========================================
router.get('/questions/chapter/:chapter', async (req, res) => {
  try {
    const { chapter } = req.params;
    const { board, class: classLevel, subject } = req.query;
    
    if (!board || !classLevel || !subject) {
      return res.status(400).json({
        success: false,
        error: 'Board, class, and subject are required'
      });
    }
    
    const questions = questionBankData.getQuestionsByChapter(
      board,
      parseInt(classLevel),
      subject,
      parseInt(chapter)
    );
    
    res.json({
      success: true,
      data: questions,
      count: questions.length,
      chapter: parseInt(chapter)
    });
  } catch (error) {
    console.error('[Practice] Error fetching chapter questions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch questions'
    });
  }
});

// ========================================
// POST /api/practice/submit-answer
// Submit answer for practice question
// ========================================
router.post('/submit-answer', async (req, res) => {
  try {
    const { questionId, userAnswer, timeSpent } = req.body;
    
    // In real app, this would validate against stored questions
    // For now, return mock response
    
    res.json({
      success: true,
      data: {
        questionId,
        correct: true, // Would be calculated
        explanation: "This is the explanation for the answer.",
        timeSpent: timeSpent || 0
      }
    });
  } catch (error) {
    console.error('[Practice] Error submitting answer:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit answer'
    });
  }
});

// ========================================
// GET /api/practice/stats/:userId
// Get practice statistics for a user
// ========================================
router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Mock data - would come from database
    res.json({
      success: true,
      data: {
        totalQuestionsAttempted: 0,
        correctAnswers: 0,
        accuracy: 0,
        streakDays: 0,
        weakAreas: [],
        strongAreas: [],
        practiceTime: 0
      }
    });
  } catch (error) {
    console.error('[Practice] Error fetching stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stats'
    });
  }
});

module.exports = router;
