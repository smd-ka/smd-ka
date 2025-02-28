import { pb } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	try {
		const records = await pb.collection('calendar').getFullList({
			sort: '+start_date_time',
			filter: `category='smd_abend' && start_date_time >= "2024-09-01 00:00:00" && end_date_time <= "2025-03-01 00:00:00"`
		});
		return { events: records };
	} catch (error) {
		console.error(error);
		return { events: [] };
	}
};
