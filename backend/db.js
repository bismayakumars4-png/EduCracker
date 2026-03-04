/**
 * ========================================
 * EduCracker - Prisma Client Manager
 * Singleton Pattern Implementation
 * ========================================
 * 
 * This module provides a singleton instance of the Prisma Client
 * to prevent multiple instances during development (hot reload)
 * and ensures proper connection handling.
 */

const { PrismaClient } = require('@prisma/client');

// ========================================
// Global Prisma Client Instance
// ========================================
// Store the Prisma client in global to prevent multiple instances
// during development with hot reloading

const globalForPrisma = globalThis;

// Clear any existing Prisma client to ensure fresh instance
if (globalForPrisma.prisma) {
    delete globalForPrisma.prisma;
}

let prisma;

if (process.env.NODE_ENV === 'production') {
    // Production: create new instance
    prisma = new PrismaClient();
} else {
    // Development: reuse existing instance to prevent 
    // "PrismaClient is not connected to the database" errors
    if (!globalForPrisma.prisma) {
        console.log('[DB] Creating new Prisma Client instance...');
        globalForPrisma.prisma = new PrismaClient({
            log: ['query', 'info', 'warn', 'error'],
        });
    }
    prisma = globalForPrisma.prisma;
    console.log('[DB] Reusing existing Prisma Client instance');
}

// ========================================
// Database Connection Test
// ========================================
async function testConnection() {
    try {
        console.log('[DB] Testing database connection...');
        await prisma.$connect();
        console.log('[DB] ✓ Database connected successfully');
        return true;
    } catch (error) {
        console.error('[DB] ✗ Database connection failed:', error.message);
        return false;
    }
}

// ========================================
// Graceful Shutdown Handler
// ========================================
// Handle process termination gracefully
// Close database connections to prevent hanging

async function disconnect() {
    try {
        console.log('[DB] Disconnecting from database...');
        await prisma.$disconnect();
        console.log('[DB] ✓ Database disconnected successfully');
    } catch (error) {
        console.error('[DB] Error during disconnect:', error.message);
    }
}

// Register shutdown handlers
process.on('beforeExit', async () => {
    await disconnect();
});

process.on('SIGINT', async () => {
    await disconnect();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await disconnect();
    process.exit(0);
});

// ========================================
// Export Prisma Client
// ========================================
module.exports = {
    prisma,
    testConnection,
    disconnect,
};

// Also expose prisma directly for easy importing
module.exports.prisma = prisma;
