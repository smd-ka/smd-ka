import { pb, PRIT_RESPONSABLE } from '$lib/pocketbase';
import { redirect, type Handle } from '@sveltejs/kit';
import { SAFT_COORDINATOR } from '$lib/pocketbase';

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
		redirect(303, `/account/login?redirect=${event.url.pathname}`);
	}

	if (
		!pb.authStore.model?.roles.includes(SAFT_COORDINATOR) &&
		event.url.pathname.startsWith('/intern/saft/list')
	) {
		redirect(303, '/intern');
	}

	if (
		!pb.authStore.model?.roles.includes(PRIT_RESPONSABLE) &&
		event.url.pathname.startsWith('/intern/prit')
	) {
		redirect(303, '/intern');
	}

	if (
		pb.authStore.isValid &&
		!pb.authStore.model?.verified &&
		event.url.pathname.startsWith('/intern')
	) {
		redirect(303, '/account/verify');
	}

	const response = await resolve(event);

	response.headers.set('set-cookie', pb.authStore.exportToCookie({ httpOnly: false }));

	return response;
};
