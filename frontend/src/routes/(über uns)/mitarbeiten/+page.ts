import { pb } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	try {
		return {
			teams: await pb.collection('teams').getFullList({}),
		};
	} catch (error) {
		console.error(error);
		return {
			teams: [],
		};
	}
};
