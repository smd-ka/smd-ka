import { pb } from '$lib/pocketbase';
import { redirect } from '@sveltejs/kit';

export function load() {
	if (!pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
}
