import { pb } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		const now = new Date();
		const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
		const records = await pb.collection('calendar').getFullList({
			sort: '+start_date_time',
			filter: `start_date_time >= "${startOfToday}"`
		});
		return { events: records };
	} catch (error) {
		console.error(error);
		return { events: [] };
	}
};

export const _handleDates = (
	startDateTime: FormDataEntryValue | null,
	endDateTime: FormDataEntryValue | null
) => {
	if (!startDateTime) {
		return { error: 'Bitte gib ein Startdatum an' };
	}
	const startDate = new Date(startDateTime.toString());
	if (!endDateTime) {
		return { startDateTime: startDate.toISOString(), endDateTime: '' };
	}
	const endDate = new Date(endDateTime.toString());
	if (startDate > endDate) {
		return { error: 'Startpunkt liegt nach Endpunkt' };
	}
	return { startDateTime: startDate.toISOString(), endDateTime: endDate.toISOString() };
};
