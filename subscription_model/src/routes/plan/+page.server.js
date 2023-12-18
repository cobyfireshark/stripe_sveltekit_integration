// routes/plan/+page_server.js
import Stripe from 'stripe';
import 'dotenv/config';
import { fail, redirect } from '@sveltejs/kit';
import { stripe_id_by_plan_id } from '$lib/stripe_plan_id_mapping';
import { db } from '$lib/db.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const actions = {
  plan: async ({ request, locals, params }) => {
    const formData = await request.formData();
    console.log([...formData]); // Log all form data entries
    const email = formData.get('email');
    const plan_id = formData.get('plan_id');


    console.log(`plan: ${plan_id}`);
    console.log(`stripe_id_by_plan_id[plan]: ${stripe_id_by_plan_id[plan_id]}`);
    console.log(`email: ${email}`);

    let url;
    try {
      const usr = await db('usr').where({ email: email }).select('stripe_customer_id').first();
      let usr_stripe_customer_id;
      console.log(`usr: ${JSON.stringify(usr)}`);
      console.log(`email: ${email}`);
      if (usr.stripe_customer_id) {
        usr_stripe_customer_id = usr.stripe_customer_id;
      } else {
        const customer = await stripe.customers.create({
          email: email,
          name: '',
        });
        usr_stripe_customer_id = customer.id;
        await db('usr').where({ email: email }).update({ stripe_customer_id: usr_stripe_customer_id });
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price: stripe_id_by_plan_id[plan_id],
          quantity: 1,
        }],
        customer: usr_stripe_customer_id,
        mode: 'subscription',
        success_url: 'http://localhost:5173/plan', // replace with your actual URL
        cancel_url: 'http://localhost:5173/plan', // replace with your actual URL
      });
      console.log(`session: ${JSON.stringify(session)}`)
      url = session.url;
    } catch (error) {
      console.error(error);
      return fail(500, { message: error.message });
    }
    throw redirect(301, url);
  }
}