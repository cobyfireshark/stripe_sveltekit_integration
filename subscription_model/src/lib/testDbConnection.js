// src/lib/testDbConnection.js
import { db } from './db.js'

async function testConnection() {
    try {
        const result = await db.raw('SELECT 1+1 AS result');
        console.log('Connection successful, Result:', result.rows);
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}

testConnection();