import { pb } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	try {
		const now = new Date();
		const records = await pb.collection('calendar').getFullList({
			sort: '+date_time',
			filter: `date_time >= "${now.toISOString()}"`
		});
		return { events: records };
	} catch (error) {
		console.error(error);
		return { events: [] };
	}
};
