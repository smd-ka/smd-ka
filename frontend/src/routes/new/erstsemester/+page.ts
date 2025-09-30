import { pb } from '$lib/pocketbase';
import type { CalendarEvent } from '../../intern/kalender/+page';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	try {
		const now = new Date();
		const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();

		const erstsemester_events = await pb.collection('calendar').getFullList<CalendarEvent>({
			sort: '+start_date_time',
			filter: `end_date_time >= "${startOfToday}" && (category="erstsemesteraktion" || category="church_hopping")`
		});
		return { erstsemester_events };
	} catch (error) {
		console.error(error);
		return { erstsemester_events: [] };
	}
};
