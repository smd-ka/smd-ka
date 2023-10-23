import { pb } from '$lib/pocketbase';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (pb.authStore.isValid) {
		try {
			await pb.collection('users').authRefresh();
		} catch (_) {
			pb.authStore.clear();
		}
	}

	event.locals.pb = pb;
	event.locals.user = pb.authStore.model;

	if (!pb.authStore.isValid && event.url.pathname.startsWith('/intern')) {
		throw redirect(303, '/account/login');
	}

	const response = await resolve(event);

	response.headers.set('set-cookie', pb.authStore.exportToCookie({ httpOnly: false }));

	return response;
};
