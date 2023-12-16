import { db } from '$lib/db.js';

export async function load() {
    let users;
    try {
        users = await db.select('*').from('usr');
    } catch (error) {
        console.error('Database error:', error);
        users = [];
    }
    return {
        users
    };
}