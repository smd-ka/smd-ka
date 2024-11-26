import { pb } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	try {
		const records = await pb.collection('calendar').getFullList({
			sort: '+start_date_time',
			filter: `category='smd_abend'`
		});
		return { events: records };
	} catch (error) {
		console.error(error);
		return { events: [] };
	}
};
