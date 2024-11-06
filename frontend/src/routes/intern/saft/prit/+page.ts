import { pb } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		const records = await pb.collection('saft_registrations').getFullList({
			sort: 'name',
			fields: 'name,post_images'
		});

		return {
			list: records
		};
	} catch (error) {
		console.error(error);
		return { list: [] };
	}
};
