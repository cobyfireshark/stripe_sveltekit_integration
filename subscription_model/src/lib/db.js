// src/lib/db.js
import knex from 'knex';
import knexConfig from '/opt/stripe_sveltekit_integration/subscription_model/knexfile.js';

const db = knex(knexConfig);

export { db };