import { pb } from '$lib/pocketbase';
import type { CalendarEvent } from '$lib/models';
import { filterConcat, filterIn } from '$lib/pb_filters';
import type { PageLoad } from './$types';
import dayjs from 'dayjs';

// content too dynamic to be prerendered (events change, semester changes)
export const prerender = false;

const ERSTI_CATEGORIES = ['church_hopping', 'erstsemesteraktion'];

export const load: PageLoad = async () => {
	const now = new Date();
	const startOfToday = dayjs(now).startOf('day').toISOString();
	let erstsemester_events: CalendarEvent[] = [];

	try {
		erstsemester_events = await pb.collection('calendar').getFullList<CalendarEvent>({
			sort: '+start_date_time',
			filter: filterConcat('&&', [
				`end_date_time > "${startOfToday}"`,
				filterIn('category', ERSTI_CATEGORIES)
			])
		});
	} catch (error) {
		console.error(error);
	}
	return {
		erstsemester_events
	};
};
