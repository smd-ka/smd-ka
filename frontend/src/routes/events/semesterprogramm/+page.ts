import { allPrograms } from './data';
import { redirect } from '@sveltejs/kit';

export function load() {
	redirect(302, allPrograms[0].link);
}
