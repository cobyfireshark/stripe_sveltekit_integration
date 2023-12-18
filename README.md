Read Me File for Integration of Stripe and SvelteKit:

Created this as a template for my commercial / live implementations.
Encouraged to use this project as a template for your own implementations.

Loosely adapted from this official Stripe tutorial with NodeJS codeblocks. Often went my own direction that I felt was better.
[Stripe Docs: Developer Build Subscriptions](https://stripe.com/docs/billing/subscriptions/build-subscriptions?ui=stripe-hosted)

Prerequisite(s):
 -Functional Stripe account setup: Secret Test Key and Publishable Key (.env)
 -SvelteKit skeleton web application, I follow these steps official from SvelteKit: [SvelteKit: Create New Project](https://kit.svelte.dev/docs/creating-a-project)

Developed Subscription Model with Stripe-hosted checkout page:
Important elements in demo SvelteKit application:
 -Home Page: Can test the features based on user permissions
 -Plan Page: Where you can change the plan of a given user
 -Footer: Set the user and see the permissions

Create test products at Stripe's site in product catalogue:
 -Free plan
 -Basic plan
 -Premium plan
The three test ids that start with price_... go in the .env

Need to make a .env file in subscription model directory with:
 -STRIPE_SECRET_KEY
 -STRIPE_PUBLISHABLE_KEY
 -STRIPE_FREE_PLAN_PRICE
 -STRIPE_BASIC_PLAN_PRICE
 -STRIPE_PREMIUM_PLAN_PRICE

Stripe has a way to use webhooks while testing:
stripe listen --forward-to [location route]
So I set mine to localhost:5173/plan/webhook where my related +server.js is
All you have to do is run the script start_stripe_hooks.sh

There are 10 events received when payment submitted

Going to save data from customer.subscription.created Stripe endpoint into postgresql database
