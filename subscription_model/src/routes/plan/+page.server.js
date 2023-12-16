// routes/plan/+page_server.js
import Stripe from 'stripe';
import 'dotenv/config';
import { fail, redirect } from '@sveltejs/kit';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripe_id_by_plan_id = {
  p_0: process.env.STRIPE_FREE_PLAN_PRICE,
  p_1: process.env.STRIPE_BASIC_PLAN_PRICE,
  p_2: process.env.STRIPE_PREMIUM_PLAN_PRICE,
}

export const actions = {
  plan: async ({ request, locals, params }) => {
    const formData = await request.formData();
    const plan_id = formData.get('plan_id');

    console.log(`plan: ${plan_id}`);
    console.log(`stripe_id_by_plan_id[plan]: ${stripe_id_by_plan_id[plan_id]}`);

    let url;
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price: stripe_id_by_plan_id[plan_id],
          quantity: 1,
        }],
        mode: 'subscription',
        success_url: 'http://localhost:5173/plan', // replace with your actual URL
        cancel_url: 'http://localhost:5173/plan', // replace with your actual URL
      });
      url = session.url;
    } catch (error) {
      console.error(error);
      return fail(500, { message: error.message });
    }
    throw redirect(301, url);
  }
}