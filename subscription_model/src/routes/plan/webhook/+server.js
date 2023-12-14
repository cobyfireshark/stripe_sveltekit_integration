// src/routes/api/build_ping/+server.js

import 'dotenv/config';
import { json } from '@sveltejs/kit';


export async function POST({ request }) {
    console.log("POST():stripe");
    const data = await request.json()
    console.log(`data: ${JSON.stringify(data)}`)
    return json({})
}
