// routes/plan/+page_server.js
import Stripe from 'stripe';
import 'dotenv/config';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const plans = {
  free: process.env.STRIPE_FREE_PLAN_PRICE,
  basic: process.env.STRIPE_BASIC_PLAN_PRICE,
  premium: process.env.STRIPE_PREMIUM_PLAN_PRICE,
}

export const actions = {
  default: async ({ request, locals, params }) => {
    const formData = await request.formData();
    const plan = formData.get('plan');

    console.log(`plan: ${plan}`);
    console.log(`plans[plan]: ${plans[plan]}`);

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price: plans[plan],
          quantity: 1,
        }],
        mode: 'subscription',
        success_url: 'http://localhost:5173/plan', // replace with your actual URL
        cancel_url: 'http://localhost:5173/plan', // replace with your actual URL
      });
      return { url: session.url };
    } catch (error) {
      console.error(error);
      return fail(500, { message: error.message });
    }
  }
}