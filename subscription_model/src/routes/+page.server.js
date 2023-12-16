// src/routes/+page.server.js
import { db } from '$lib/db.js';

export async function load() {
    let planDetails;
    try {
        planDetails = await db.select('*').from('plan_detail');
    } catch (error) {
        console.error('Database error:', error);
        planDetails = [];
    }
    return {
        planDetails,
    };
}