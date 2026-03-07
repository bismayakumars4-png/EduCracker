/**
 * ========================================
 * EduCracker - Google Classroom Service
 * Service for importing courses from Google Classroom
 * ========================================
 */

const { google } = require('googleapis');

// Google Classroom scopes
const CLASSROOM_SCOPES = [
    'https://www.googleapis.com/auth/classroom.courses.readonly',
    'https://www.googleapis.com/auth/classroom.coursework.students.readonly',
    'https://www.googleapis.com/auth/classroom.rosters.readonly'
];

/**
 * Get authorization URL for Google Classroom access
 */
function getClassroomAuthUrl(userId) {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_CALLBACK_URL
    );
    
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: CLASSROOM_SCOPES,
        state: `classroom_${userId}`,
        prompt: 'consent'
    });
}

/**
 * Exchange authorization code for tokens
 */
async function getTokensFromCode(code) {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_CALLBACK_URL
    );
    
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
}

/**
 * Get authenticated Classroom client for user
 */
async function getClassroomClient(userId) {
    const { prisma } = require('../db');
    
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });
    
    if (!user || !user.googleAccessToken) {
        throw new Error('User has not connected Google account');
    }
    
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_CALLBACK_URL
    );
    
    oauth2Client.setCredentials({
        access_token: user.googleAccessToken,
        refresh_token: user.googleRefreshToken
    });
    
    return google.classroom({ version: 'v1', auth: oauth2Client });
}

/**
 * Get user's courses from Google Classroom
 */
async function getCourses(userId) {
    try {
        const classroom = await getClassroomClient(userId);
        
        const response = await classroom.courses.list({
            teacherId: 'me',
            courseStates: ['ACTIVE']
        });
        
        const courses = response.data.courses || [];
        
        return courses.map(course => ({
            id: course.id,
            name: course.name,
            section: course.section,
            description: course.descriptionHeading,
            room: course.room,
            ownerId: course.ownerId
        }));
    } catch (error) {
        console.error('[Google Classroom] Error getting courses:', error);
        throw error;
    }
}

/**
 * Get coursework for a specific course
 */
async function getCoursework(userId, courseId) {
    try {
        const classroom = await getClassroomClient(userId);
        
        const response = await classroom.courses.courseWork.list({
            courseId: courseId
        });
        
        const coursework = response.data.courseWork || [];
        
        return coursework.map(work => ({
            id: work.id,
            title: work.title,
            description: work.description,
            dueDate: work.dueDate,
            maxPoints: work.maxPoints,
            workType: work.workType
        }));
    } catch (error) {
        console.error('[Google Classroom] Error getting coursework:', error);
        throw error;
    }
}

/**
 * Get course students/roster
 */
async function getCourseStudents(userId, courseId) {
    try {
        const classroom = await getClassroomClient(userId);
        
        const response = await classroom.courses.students.list({
            courseId: courseId
        });
        
        const students = response.data.students || [];
        
        return students.map(student => ({
            id: student.userId,
            name: student.profile.name.fullName,
            email: student.profile.emailAddress
        }));
    } catch (error) {
        console.error('[Google Classroom] Error getting students:', error);
        throw error;
    }
}

/**
 * Import course topics as syllabus chapters
 */
async function importTopicsAsSyllabus(userId, courseId) {
    try {
        const classroom = await getClassroomClient(userId);
        const { prisma } = require('../db');
        
        // Get course details
        const course = await classroom.courses.get({ id: courseId });
        const courseData = course.data;
        
        // Get topics
        const topicsResponse = await classroom.courses.topics.list({
            courseId: courseId
        });
        
        const topics = topicsResponse.data.topic || [];
        
        // Create chapters for each topic
        const createdChapters = [];
        
        for (let i = 0; i < topics.length; i++) {
            const topic = topics[i];
            
            // Note: This would need proper board/class setup
            // For now, we just return the topics to be manually imported
            createdChapters.push({
                name: topic.name,
                topicId: topic.topicId,
                courseId: courseId
            });
        }
        
        return {
            success: true,
            courseName: courseData.name,
            chapters: createdChapters
        };
    } catch (error) {
        console.error('[Google Classroom] Error importing topics:', error);
        throw error;
    }
}

/**
 * Check if Google Classroom is enabled
 */
function isClassroomEnabled() {
    return process.env.GOOGLE_CLIENT_ID && 
           process.env.GOOGLE_CLIENT_ID !== 'your_google_client_id';
}

module.exports = {
    getClassroomAuthUrl,
    getTokensFromCode,
    getCourses,
    getCoursework,
    getCourseStudents,
    importTopicsAsSyllabus,
    isClassroomEnabled
};
