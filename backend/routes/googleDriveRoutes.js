/**
 * ========================================
 * EduCracker - Google Drive Routes
 * API endpoints for Google Drive sync
 * ========================================
 */

const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const googleDriveService = require('../services/googleDriveService');

// ========================================
// GET /api/google/status
// Check if Google Drive is enabled
// ========================================
router.get('/status', authenticate, async (req, res) => {
    try {
        const isEnabled = googleDriveService.isDriveEnabled();
        
        res.json({
            success: true,
            enabled: isEnabled,
            message: isEnabled 
                ? 'Google Drive sync is available' 
                : 'Google Drive sync is not configured'
        });
    } catch (error) {
        console.error('[Google Drive] Status error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to check Google Drive status'
        });
    }
});

// ========================================
// GET /api/google/connect
// Get Google OAuth URL for Drive access
// ========================================
router.get('/connect', authenticate, async (req, res) => {
    try {
        if (!googleDriveService.isDriveEnabled()) {
            return res.status(400).json({
                success: false,
                message: 'Google Drive sync is not configured'
            });
        }

        const authUrl = googleDriveService.getAuthUrl(req.userId);
        
        res.json({
            success: true,
            authUrl
        });
    } catch (error) {
        console.error('[Google Drive] Connect error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get Google authorization URL'
        });
    }
});

// ========================================
// GET /api/google/callback
// Handle OAuth callback for Drive access
// ========================================
router.get('/callback', async (req, res) => {
    try {
        const { code, state: userId } = req.query;
        
        if (!code || !userId) {
            return res.redirect('/settings.html?error=missing_params');
        }

        const tokens = await googleDriveService.getTokensFromCode(code);
        await googleDriveService.saveUserTokens(parseInt(userId), tokens);
        
        res.redirect('/settings.html?google_connected=true');
    } catch (error) {
        console.error('[Google Drive] Callback error:', error);
        res.redirect('/settings.html?error=auth_failed');
    }
});

// ========================================
// POST /api/google/export/notes
// Export all notes to Google Drive
// ========================================
router.post('/export/notes', authenticate, async (req, res) => {
    try {
        const result = await googleDriveService.exportAllNotesToDrive(req.userId);
        
        res.json({
            success: true,
            message: `Successfully exported ${result.count} notes to Google Drive`,
            files: result.files
        });
    } catch (error) {
        console.error('[Google Drive] Export notes error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to export notes to Google Drive'
        });
    }
});

// ========================================
// POST /api/google/sync/achievements
// Sync achievements to Google Drive
// ========================================
router.post('/sync/achievements', authenticate, async (req, res) => {
    try {
        const { achievements } = req.body;
        
        if (!achievements || !Array.isArray(achievements)) {
            return res.status(400).json({
                success: false,
                message: 'Achievements array is required'
            });
        }
        
        const result = await googleDriveService.syncAchievementsToDrive(
            req.userId, 
            achievements
        );
        
        res.json({
            success: true,
            message: 'Achievements synced to Google Drive',
            file: result
        });
    } catch (error) {
        console.error('[Google Drive] Sync achievements error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to sync achievements to Google Drive'
        });
    }
});

// ========================================
// GET /api/google/files
// Get files from Google Drive
// ========================================
router.get('/files', authenticate, async (req, res) => {
    try {
        const files = await googleDriveService.getDriveFiles(req.userId);
        
        res.json({
            success: true,
            files
        });
    } catch (error) {
        console.error('[Google Drive] Get files error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get files from Google Drive'
        });
    }
});

module.exports = router;
