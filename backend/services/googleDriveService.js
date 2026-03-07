/**
 * ========================================
 * EduCracker - Google Drive Service
 * Service for syncing notes and achievements to Google Drive
 * ========================================
 */

const { google } = require('googleapis');

// Google Drive scopes
const SCOPES = [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.metadata.readonly'
];

/**
 * Create OAuth2 client with credentials
 */
function getOAuth2Client() {
    return new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_CALLBACK_URL
    );
}

/**
 * Get authorization URL for Google Drive access
 */
function getAuthUrl(userId) {
    const oauth2Client = getOAuth2Client();
    
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        state: userId.toString(),
        prompt: 'consent'
    });
}

/**
 * Exchange authorization code for tokens
 */
async function getTokensFromCode(code) {
    const oauth2Client = getOAuth2Client();
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
}

/**
 * Save user tokens to database
 */
async function saveUserTokens(userId, tokens) {
    const { prisma } = require('../db');
    
    await prisma.user.update({
        where: { id: userId },
        data: {
            googleAccessToken: tokens.access_token,
            googleRefreshToken: tokens.refresh_token
        }
    });
}

/**
 * Get authenticated Drive client for user
 */
async function getDriveClient(userId) {
    const { prisma } = require('../db');
    
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });
    
    if (!user || !user.googleAccessToken) {
        throw new Error('User has not connected Google Drive');
    }
    
    const oauth2Client = getOAuth2Client();
    oauth2Client.setCredentials({
        access_token: user.googleAccessToken,
        refresh_token: user.googleRefreshToken
    });
    
    return google.drive({ version: 'v3', auth: oauth2Client });
}

/**
 * Upload note to Google Drive
 */
async function uploadNoteToDrive(userId, note) {
    try {
        const drive = await getDriveClient(userId);
        
        const fileMetadata = {
            name: `${note.title}.txt`,
            parents: [process.env.GOOGLE_DRIVE_FOLDER_ID || 'root'],
            description: `Subject: ${note.subject}, Category: ${note.category || 'General'}`
        };
        
        const media = {
            mimeType: 'text/plain',
            body: note.content
        };
        
        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, name, webViewLink'
        });
        
        console.log('[Google Drive] Note uploaded:', response.data.name);
        return response.data;
    } catch (error) {
        console.error('[Google Drive] Error uploading note:', error);
        throw error;
    }
}

/**
 * Export all user notes to Google Drive
 */
async function exportAllNotesToDrive(userId) {
    try {
        const { prisma } = require('../db');
        
        const notes = await prisma.note.findMany({
            where: { userId }
        });
        
        const uploadedFiles = [];
        
        for (const note of notes) {
            const file = await uploadNoteToDrive(userId, note);
            uploadedFiles.push(file);
        }
        
        return {
            success: true,
            count: uploadedFiles.length,
            files: uploadedFiles
        };
    } catch (error) {
        console.error('[Google Drive] Error exporting notes:', error);
        throw error;
    }
}

/**
 * Sync achievements to Google Drive
 */
async function syncAchievementsToDrive(userId, achievements) {
    try {
        const drive = await getDriveClient(userId);
        
        const achievementsText = achievements.map(a => 
            `🏆 ${a.title}\\n${a.description}\\nEarned: ${new Date(a.earnedAt).toLocaleDateString()}\\n`
        ).join('\\n---\\n\\n');
        
        const fileMetadata = {
            name: `EduCracker_Achievements_${new Date().toISOString().split('T')[0]}.txt`,
            parents: [process.env.GOOGLE_DRIVE_FOLDER_ID || 'root'],
            description: 'Your EduCracker achievements backup'
        };
        
        const media = {
            mimeType: 'text/plain',
            body: achievementsText
        };
        
        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, name, webViewLink'
        });
        
        console.log('[Google Drive] Achievements synced:', response.data.name);
        return response.data;
    } catch (error) {
        console.error('[Google Drive] Error syncing achievements:', error);
        throw error;
    }
}

/**
 * Get files from EduCracker folder in Google Drive
 */
async function getDriveFiles(userId) {
    try {
        const drive = await getDriveClient(userId);
        
        const response = await drive.files.list({
            q: `'${process.env.GOOGLE_DRIVE_FOLDER_ID || 'root'}' in parents`,
            fields: 'files(id, name, mimeType, createdTime, modifiedTime)'
        });
        
        return response.data.files || [];
    } catch (error) {
        console.error('[Google Drive] Error getting files:', error);
        throw error;
    }
}

/**
 * Check if Google Drive is enabled
 */
function isDriveEnabled() {
    return process.env.GOOGLE_DRIVE_ENABLED === 'true' && 
           process.env.GOOGLE_CLIENT_ID && 
           process.env.GOOGLE_CLIENT_ID !== 'your_google_client_id';
}

module.exports = {
    getAuthUrl,
    getTokensFromCode,
    saveUserTokens,
    uploadNoteToDrive,
    exportAllNotesToDrive,
    syncAchievementsToDrive,
    getDriveFiles,
    isDriveEnabled
};
