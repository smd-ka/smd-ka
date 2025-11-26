import { pb } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		const records = await pb.collection('regiokon_prit').getFullList({
			sort: 'name',
			fields: 'name, surname, permission, revoked'
		});

		return {
			list: records
		};
	} catch (error) {
		console.error(error);
		return { list: [] };
	}
};
