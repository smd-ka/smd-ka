import { pb } from '$lib/pocketbase';
import type { CalendarEvent } from '$lib/models';
import type { PageLoad } from './$types';
import dayjs from 'dayjs';

export const prerender = true;

export const load: PageLoad = async () => {
	const now = new Date();
	const startOfToday = dayjs(now).startOf('day').toISOString();
	let erstsemester_events: CalendarEvent[] = [];

	try {
		erstsemester_events = await pb.collection('calendar').getFullList<CalendarEvent>({
			sort: '+start_date_time',
			filter: `end_date_time >= "${startOfToday}" && (category="erstsemesteraktion" || category="church_hopping")`
		});
	} catch (error) {
		console.error(error);
	}
	return {
		erstsemester_events
	};
};
