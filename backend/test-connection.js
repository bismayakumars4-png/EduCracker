const mysql = require('mysql2/promise');

async function testConnection() {
    console.log('Testing MySQL connection...');
    
    try {
        const connection = await mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '',
            database: 'educracker_db'
        });
        
        console.log('Connected to MySQL!');
        await connection.end();
        return true;
    } catch (error) {
        console.error('MySQL connection error:', error.message);
        return false;
    }
}

testConnection();
