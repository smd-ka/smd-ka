import PocketBase, { ClientResponseError } from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new PocketBase('https://api.smd-karlsruhe.de');

export const currentUser = writable(pb.authStore.model);

export function getErrorMessage(error: unknown) {
	const errorObj = error as ClientResponseError;
	return errorObj.message;
}
