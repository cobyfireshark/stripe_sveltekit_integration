import 'dotenv/config';

export const stripe_id_by_plan_id = {
    p_0: process.env.STRIPE_FREE_PLAN_PRICE,
    p_1: process.env.STRIPE_BASIC_PLAN_PRICE,
    p_2: process.env.STRIPE_PREMIUM_PLAN_PRICE,
}

let plan_id_by_stripe_id = {};

for (const [planId, stripeId] of Object.entries(stripe_id_by_plan_id)) {
    plan_id_by_stripe_id[stripeId] = planId;
}

export { plan_id_by_stripe_id };