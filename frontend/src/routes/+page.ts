import { pb } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	try {
		const now = new Date();
		const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
		const records = await pb.collection('calendar').getList(1, 4, {
			sort: '+start_date_time',
			filter: `start_date_time >= "${startOfToday}" && category!='kingscafe' && category!='german_bible_study'`
		});
		const nextSMDEvening = await pb.collection('calendar').getList(1, 1, {
			sort: '+start_date_time',
			filter: `start_date_time >= "${startOfToday}" && category='smd_abend'`
		});
		return { events: records, nextSMDEvening: nextSMDEvening.items[0] };
	} catch (error) {
		console.error(error);
		return {};
	}
};
