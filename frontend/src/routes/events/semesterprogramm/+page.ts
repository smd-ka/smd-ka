import { allPrograms } from './data';
import { redirect } from '@sveltejs/kit';

export function load() {
	redirect(302, `/events/semesterprogramm/${allPrograms[0].slug}`);
}
