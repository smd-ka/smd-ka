import { pb } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	try {
		return {
			statements: await pb.collection('statements').getFullList({}),
		};
	} catch (error) {
		console.error(error);
		return {
			statements: [],
		};
	}
};
