/**
 * ========================================
 * EduCracker - Google Classroom Routes
 * API endpoints for Google Classroom integration
 * ========================================
 */

const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const googleClassroomService = require('../services/googleClassroomService');

// ========================================
// GET /api/classroom/status
// Check if Google Classroom is enabled
// ========================================
router.get('/status', authenticate, async (req, res) => {
    try {
        const isEnabled = googleClassroomService.isClassroomEnabled();
        
        res.json({
            success: true,
            enabled: isEnabled,
            message: isEnabled 
                ? 'Google Classroom integration is available' 
                : 'Google Classroom is not configured'
        });
    } catch (error) {
        console.error('[Google Classroom] Status error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to check Google Classroom status'
        });
    }
});

// ========================================
// GET /api/classroom/connect
// Get Google OAuth URL for Classroom access
// ========================================
router.get('/connect', authenticate, async (req, res) => {
    try {
        if (!googleClassroomService.isClassroomEnabled()) {
            return res.status(400).json({
                success: false,
                message: 'Google Classroom is not configured'
            });
        }

        const authUrl = googleClassroomService.getClassroomAuthUrl(req.userId);
        
        res.json({
            success: true,
            authUrl
        });
    } catch (error) {
        console.error('[Google Classroom] Connect error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get Google authorization URL'
        });
    }
});

// ========================================
// GET /api/classroom/courses
// Get user's courses from Google Classroom
// ========================================
router.get('/courses', authenticate, async (req, res) => {
    try {
        const courses = await googleClassroomService.getCourses(req.userId);
        
        res.json({
            success: true,
            courses
        });
    } catch (error) {
        console.error('[Google Classroom] Get courses error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get courses from Google Classroom'
        });
    }
});

// ========================================
// GET /api/classroom/courses/:courseId/coursework
// Get coursework for a specific course
// ========================================
router.get('/courses/:courseId/coursework', authenticate, async (req, res) => {
    try {
        const { courseId } = req.params;
        const coursework = await googleClassroomService.getCoursework(req.userId, courseId);
        
        res.json({
            success: true,
            coursework
        });
    } catch (error) {
        console.error('[Google Classroom] Get coursework error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get coursework from Google Classroom'
        });
    }
});

// ========================================
// GET /api/classroom/courses/:courseId/students
// Get students for a specific course
// ========================================
router.get('/courses/:courseId/students', authenticate, async (req, res) => {
    try {
        const { courseId } = req.params;
        const students = await googleClassroomService.getCourseStudents(req.userId, courseId);
        
        res.json({
            success: true,
            students
        });
    } catch (error) {
        console.error('[Google Classroom] Get students error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get students from Google Classroom'
        });
    }
});

// ========================================
// POST /api/classroom/courses/:courseId/import
// Import course topics as syllabus chapters
// ========================================
router.post('/courses/:courseId/import', authenticate, async (req, res) => {
    try {
        const { courseId } = req.params;
        const result = await googleClassroomService.importTopicsAsSyllabus(req.userId, courseId);
        
        res.json({
            success: true,
            message: `Successfully imported ${result.chapters.length} chapters from ${result.courseName}`,
            ...result
        });
    } catch (error) {
        console.error('[Google Classroom] Import error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to import course topics'
        });
    }
});

module.exports = router;
