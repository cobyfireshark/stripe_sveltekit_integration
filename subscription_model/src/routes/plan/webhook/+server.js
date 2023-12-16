// src/routes/plan/webhook/+server.js

import 'dotenv/config';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const data = await request.json()
    // console.log(`data: ${JSON.stringify(data)}`)

    const eventType = data.type;
    const eventData = data.data.object;

    // Depending on the event type, you might extract different information
    switch (eventType) {
        case 'checkout.session.completed':
            // Payment is successful and the subscription is created.
            // You should provision the subscription and save the customer ID to your database.
            break;
        case 'invoice.paid':
            // Continue to provision the subscription as payments continue to be made.
            // Store the status in your database and check when a user accesses your service.
            // This approach helps you avoid hitting rate limits.
            break;
        case 'invoice.payment_failed':
            // The payment failed or the customer does not have a valid payment method.
            // The subscription becomes past_due. Notify your customer and send them to the
            // customer portal to update their payment information.
            break;
        default:
        // Unhandled event type
    }

    return json({})
}
