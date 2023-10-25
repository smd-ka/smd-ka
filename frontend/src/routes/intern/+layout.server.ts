import { pb } from '$lib/pocketbase';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../account/logout/$types';

// Should already be handled by hooks.server.ts, but this needs to be in place so
// that the client actually invokes the server hooks
export const load: PageServerLoad = async () => {
	if (!pb.authStore.isValid) {
		throw redirect(303, '/account/login');
	}
};
