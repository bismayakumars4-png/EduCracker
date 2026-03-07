/**
 * ========================================
 * EduCracker - Passport Google OAuth Strategy
 * Configures Google OAuth 2.0 authentication
 * ========================================
 */

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { prisma } = require('../db');

/**
 * Configure and export Google OAuth Strategy
 */
module.exports = function(passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/user/auth/google/callback'
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    console.log('[Google OAuth] Profile received:', profile.emails?.[0]?.value);

                    // Extract user information from Google profile
                    const googleId = profile.id;
                    const email = profile.emails?.[0]?.value;
                    const firstName = profile.name?.givenName || 'Google';
                    const lastName = profile.name?.familyName || 'User';

                    if (!email) {
                        console.error('[Google OAuth] No email found in profile');
                        return done(null, false, { message: 'No email found in Google profile' });
                    }

                    // Check if user already exists with this Google ID
                    let user = await prisma.user.findUnique({
                        where: { googleId }
                    });

                    if (user) {
                        console.log('[Google OAuth] Existing user found:', user.email);
                        return done(null, user);
                    }

                    // Check if user exists with this email (email login user)
                    user = await prisma.user.findUnique({
                        where: { email }
                    });

                    if (user) {
                        // Link Google account to existing user
                        console.log('[Google OAuth] Linking Google account to existing user:', email);
                        user = await prisma.user.update({
                            where: { id: user.id },
                            data: { googleId }
                        });
                        return done(null, user);
                    }

                    // Create new user with Google account
                    console.log('[Google OAuth] Creating new user with Google account');
                    user = await prisma.user.create({
                        data: {
                            email,
                            googleId,
                            firstName,
                            lastName,
                            role: 'STUDENT',
                            plan: 'FREE'
                        }
                    });

                    return done(null, user);
                } catch (error) {
                    console.error('[Google OAuth] Error:', error);
                    return done(error, null);
                }
            }
        )
    );

    // Serialize user for session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialize user from session
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { id }
            });
            done(null, user);
        } catch (error) {
            console.error('[Google OAuth] Deserialize error:', error);
            done(error, null);
        }
    });
};
