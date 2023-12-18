// src/routes/plan/webhook/+server.js
import Stripe from 'stripe';
import 'dotenv/config';
import { json } from '@sveltejs/kit';
import { plan_id_by_stripe_id } from '$lib/stripe_plan_id_mapping';
import { db } from '$lib/db.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST({ request }) {
    const data = await request.json()
    // console.log(`data: ${JSON.stringify(data)}`)

    const eventType = data.type;
    const eventData = data.data.object;

    if (eventType != 'customer.subscription.created' && eventType != 'customer.subscription.updated') {
        return json({});
    }

    console.log(`Event type: ${eventType}`);
    console.log(`Event data: ${JSON.stringify(eventData)}`);

    let newStripeId = eventData.items.data[0].plan.id;
    let newStripeCustomerId = eventData.customer;

    const customer = await stripe.customers.retrieve(newStripeCustomerId);
    console.log(`customer: ${JSON.stringify(customer)}`);

    let newPlanId = plan_id_by_stripe_id[newStripeId];
    console.log(`newStripeId: ${newStripeId}`);
    console.log(`newStripeCustomerId: ${newStripeCustomerId}`);
    console.log(`newPlanId: ${newPlanId}`);

    await db('usr').where({ stripe_customer_id: newStripeCustomerId }).update({ plan_id: newPlanId });

    return json({});
}
