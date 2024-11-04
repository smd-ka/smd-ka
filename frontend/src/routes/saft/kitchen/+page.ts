import { pb } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	try {
		const records = await pb.collection('saft_kitchen').getFullList({
			sort: '-allergies'
		});
		const totalCount = records.length;
		const vegetarianCount = records.filter((record) => record.is_vegetarian).length;
		const cakeCount = records.filter((record) => record.brings_cake).length;
		const filteredRecords = records.filter((record) => record.allergies || record.brings_cake);

		return { list: filteredRecords, totalCount, cakeCount, vegetarianCount };
	} catch (error) {
		console.error(error);
		return { list: [], error };
	}
};
