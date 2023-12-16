// src/stores.js
import { writable } from 'svelte/store';

export const selectedUserStore = writable({ email: '', plan_id: '' });