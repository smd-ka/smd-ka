import { pb } from '$lib/pocketbase';
import { calendarEvents } from '$lib/stores';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		let record = undefined;
		calendarEvents.subscribe((value) => {
			record = value.filter((item) => item.slug === params.slug)[0];
		});
		// Record not found in local store, fetch from server
		if (!record) {
			record = await pb.collection('calendar').getOne(params.slug);
		}
		return { entry: record };
	} catch (error) {
		console.error(error);
		return null;
	}
};
