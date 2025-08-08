import { pb } from '$lib/pocketbase';
import type { PageLoad } from './$types';
import { writable } from 'svelte/store';

export type CalendarEvent = Record<string, unknown> & {
	id: string;
	collectionId: string;
	collectionName: string;
	created: string;
	updated: string;
	category: string;
	title: string;
	title_en: string;
	description: string;
	description_en: string;
	start_date_time: string;
	end_date_time: string;
	location: string;
	location_url: string;
	speaker: string;
	image: string;
	expand: Record<string, unknown>;
};

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
