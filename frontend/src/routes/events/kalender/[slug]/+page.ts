import { pb } from '$lib/pocketbase';
import { calendarEvents } from '$lib/stores';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		let event;
		calendarEvents.subscribe((value) => {
			event = value.filter((item) => item.slug === params.slug)[0];
		});
		// Record not found in local store, fetch from server
		if (!event) {
			event = await pb.collection('calendar').getOne(params.slug);
		}
		return { event };
	} catch (error) {
		console.error(error);
		return { error };
	}
};

export const _categoryToDisplayName = (category: string) => {
	switch (category) {
		case 'smd_abend':
			return 'SMD-Abend';
		case 'lecture_talk':
			return 'Hörsaalvortrag';
		case 'kingscafe':
			return 'King’s Café';
		case 'MIT':
			return 'Mitarbeiter-Treffen';
		case 'erstsemesteraktion':
			return 'Erstsemesteraktion';
		case 'german_bible_study':
			return 'Deutschkurs mit der Bibel';
		default:
			return '';
	}
};
