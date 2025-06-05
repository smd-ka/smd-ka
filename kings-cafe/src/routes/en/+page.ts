import { pb } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	try {
		const now = new Date();
		const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
		const records = await pb.collection('calendar').getList(1, 6, {
			sort: '+start_date_time',
			filter: `start_date_time >= "${startOfToday}" && (category='kingscafe' || category='german_bible_study')`
		});
		return { events: records };
	} catch (error) {
		console.error(error);
		return {};
	}
};
