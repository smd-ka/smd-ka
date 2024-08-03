import { pb } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	try {
		const records = await pb.collection('ersti_actions').getFullList({
			sort: '+date'
		});
		return { records: records };
	} catch (error) {
		console.error(error);
		return { records: [] };
	}
};
