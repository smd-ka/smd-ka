import { pb } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	try {
		const now = new Date();
		const records = await pb.collection('calendar').getList(1, 4, {
			sort: '+start_date_time',
			filter: `start_date_time >= "${now.toISOString()}" && category!='kingscafe'`
		});
		console.log(records);
		return { events: records };
	} catch (error) {
		console.error(error);
		return {};
	}
};
