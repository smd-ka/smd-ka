import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new PocketBase('https://smd-ka.pockethost.io');

export const currentUser = writable(pb.authStore.model);
