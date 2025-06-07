import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(307, '/events/kalender/0l2923v5694n6oo');
}
