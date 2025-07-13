import type { User } from '$lib/models';
import { pb } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		const records: Partial<User>[] = await pb.collection('users').getFullList({
			fields: 'id,name,surname,allergies',
			filter: 'allergies != "" && alumni != true',
			sort: '+name'
		});
		console.log(records);
		return { records };
	} catch (error) {
		console.error(error);
		return { records: [] };
	}
};
