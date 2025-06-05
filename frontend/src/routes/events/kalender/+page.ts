import { pb } from '$lib/pocketbase';
import { calendarEvents } from '$lib/stores';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		const now = new Date();
		const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
		const records = await pb.collection('calendar').getFullList({
			sort: '+start_date_time',
			filter: `start_date_time >= "${startOfToday}" && category!='german_bible_study'`
		});
		calendarEvents.set(records);
		return { events: records };
	} catch (error) {
		console.error(error);
		return { events: [] };
	}
};
