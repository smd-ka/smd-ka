import { allPrograms } from './data';
import { redirect } from '@sveltejs/kit';

export const prerender = true;

export function load() {
	redirect(302, allPrograms[0].link);
}
