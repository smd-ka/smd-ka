import { pb } from '$lib/pocketbase';
import type { PageLoad } from './$types';
import { writable } from 'svelte/store';
import type { CalendarEvent } from '$lib/models';

export const _eventStore = writable<CalendarEvent[]>([]);
export const _shownEvent = writable<CalendarEvent | undefined>(undefined);
export const _duplicateEvent = writable<CalendarEvent | undefined>(undefined);

export const load: PageLoad = async () => {
	try {
		const now = new Date();
		const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
		const records = await pb.collection('calendar').getFullList<CalendarEvent>({
			sort: '+start_date_time',
			filter: `start_date_time >= "${startOfToday}"`
		});
		// Update the store with the fetched records
		_eventStore.set(records);
	} catch (error) {
		console.error(error);
		_eventStore.set([]);
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
