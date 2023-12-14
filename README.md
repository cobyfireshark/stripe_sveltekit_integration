# stripe_sveltekit_integration
Sveltekit web with stripe integration for payments
Subscription Model
    Products created using product catelogue (test and real are seperated)
    Product Price IDs are stored in .env

    Stripe has a way to use webhooks while testing
    stripe listen --forward-to [location route]
    So I set mine to localhost:5173/plan/webhook where my related +server.js is
    
    There are 10 events received when 