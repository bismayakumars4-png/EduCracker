/**
 * ========================================
 * EduCracker - Syllabus Routes
 * API endpoints for syllabus, chapters, and exam preparation
 * ========================================
 */

const express = require('express');
const router = express.Router();
const syllabusData = require('../data/syllabus');

// ========================================
// GET /api/syllabus/boards
// Get all available boards
// ========================================
router.get('/boards', async (req, res) => {
  try {
    res.json({
      success: true,
      data: syllabusData.boards
    });
  } catch (error) {
    console.error('[Syllabus] Error fetching boards:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch boards'
    });
  }
});

// ========================================
// GET /api/syllabus/exams
// Get all target exams
// ========================================
router.get('/exams', async (req, res) => {
  try {
    res.json({
      success: true,
      data: syllabusData.targetExams
    });
  } catch (error) {
    console.error('[Syllabus] Error fetching exams:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch exams'
    });
  }
});

// ========================================
// GET /api/syllabus/subjects
// Get subjects for a board and class
// Query params: board, class
// ========================================
router.get('/subjects', async (req, res) => {
  try {
    const { board, class: classLevel } = req.query;
    
    if (!board || !classLevel) {
      return res.status(400).json({
        success: false,
        error: 'Board and class are required'
      });
    }
    
    const subjects = syllabusData.getSubjects(board, parseInt(classLevel));
    
    res.json({
      success: true,
      data: subjects
    });
  } catch (error) {
    console.error('[Syllabus] Error fetching subjects:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subjects'
    });
  }
});

// ========================================
// GET /api/syllabus/chapters
// Get chapters for a subject
// Query params: board, class, subject
// ========================================
router.get('/chapters', async (req, res) => {
  try {
    const { board, class: classLevel, subject } = req.query;
    
    if (!board || !classLevel || !subject) {
      return res.status(400).json({
        success: false,
        error: 'Board, class, and subject are required'
      });
    }
    
    const chapters = syllabusData.getChapters(board, parseInt(classLevel), subject);
    
    res.json({
      success: true,
      data: chapters
    });
  } catch (error) {
    console.error('[Syllabus] Error fetching chapters:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch chapters'
    });
  }
});

// ========================================
// GET /api/syllabus/formulas
// Get formulas for a subject
// Query params: board, class, subject
// ========================================
router.get('/formulas', async (req, res) => {
  try {
    const { board, class: classLevel, subject } = req.query;
    
    if (!board || !classLevel || !subject) {
      return res.status(400).json({
        success: false,
        error: 'Board, class, and subject are required'
      });
    }
    
    const formulas = syllabusData.getFormulas(board, parseInt(classLevel), subject);
    
    res.json({
      success: true,
      data: formulas
    });
  } catch (error) {
    console.error('[Syllabus] Error fetching formulas:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch formulas'
    });
  }
});

// ========================================
// GET /api/syllabus/full
// Get complete syllabus for a board and class
// ========================================
router.get('/full', async (req, res) => {
  try {
    const { board, class: classLevel } = req.query;
    
    if (!board || !classLevel) {
      return res.status(400).json({
        success: false,
        error: 'Board and class are required'
      });
    }
    
    const syllabus = syllabusData.getSyllabus(board, parseInt(classLevel));
    
    if (!syllabus) {
      return res.status(404).json({
        success: false,
        error: 'Syllabus not found for the specified board and class'
      });
    }
    
    // Get chapter count and total weightage for each subject
    const summary = {};
    for (const [subject, data] of Object.entries(syllabus)) {
      summary[subject] = {
        chapters: data.chapters.length,
        totalWeightage: data.chapters.reduce((sum, ch) => sum + (ch.weightage || 0), 0),
        formulas: data.formulas ? data.formulas.length : 0
      };
    }
    
    res.json({
      success: true,
      data: {
        board,
        classLevel,
        subjects: syllabus,
        summary
      }
    });
  } catch (error) {
    console.error('[Syllabus] Error fetching full syllabus:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch syllabus'
    });
  }
});

// ========================================
// GET /api/syllabus/important-topics
// Get important topics based on weightage
// Query params: board, class, subject
// ========================================
router.get('/important-topics', async (req, res) => {
  try {
    const { board, class: classLevel, subject } = req.query;
    
    if (!board || !classLevel || !subject) {
      return res.status(400).json({
        success: false,
        error: 'Board, class, and subject are required'
      });
    }
    
    const chapters = syllabusData.getChapters(board, parseInt(classLevel), subject);
    
    // Sort by weightage and return top topics
    const importantTopics = chapters
      .filter(ch => ch.weightage >= 5)
      .sort((a, b) => b.weightage - a.weightage)
      .map(ch => ({
        chapter: ch.number,
        name: ch.name,
        weightage: ch.weightage,
        difficulty: ch.difficulty
      }));
    
    res.json({
      success: true,
      data: importantTopics
    });
  } catch (error) {
    console.error('[Syllabus] Error fetching important topics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch important topics'
    });
  }
});

module.exports = router;
