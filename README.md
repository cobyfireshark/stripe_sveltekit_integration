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
Note: This must be running while testing Stripe checkout!

There are 10 events received when payment submitted.
This is [Stripe's Docs on their Webhooks](https://stripe.com/docs/webhooks) but I found it easier just to parse what I got.

Created my database using [PostgreSQL](https://www.postgresql.org/docs/current/)
database: "user_database"
Two tables in user_database:
usr:
|      Column        |          Type          |
+--------------------+------------------------+
| email              | character varying(255) |
| plan_id            | character varying(255) |
| stripe_customer_id | character varying(255) |
Foreign-key constraints:
    "usr_plan_id_fkey" FOREIGN KEY (plan_id) REFERENCES plan_detail(plan_id)
plan_detail:
    Column    |          Type          | Collation | Nullable | Default 
--------------+------------------------+-----------+----------+---------
 plan_id      | character varying(255) |           | not null | 
 change_text  | boolean                |           |          | 
 change_color | boolean                |           |          | 
Indexes:
    "plan_detail_pkey" PRIMARY KEY, btree (plan_id)
Referenced by:
    TABLE "usr" CONSTRAINT "usr_plan_id_fkey" FOREIGN KEY (plan_id) REFERENCES plan_detail(plan_id)