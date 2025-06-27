import { pb } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		const records = await pb.collection('prit').getFullList({
			sort: 'name'
		});

		return {
			list: records
		};
	} catch (error) {
		console.error(error);
		return { list: [] };
	}
};
