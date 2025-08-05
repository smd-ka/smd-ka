import type { User } from '$lib/models';
import { pb } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		const records = await pb.collection('users').getFullList<User>({
			sort: '-created',
			filter: 'verified = true'
		});
		return { list: records };
	} catch (error) {
		console.error('Error fetching user list:', error);
		throw new Error('Failed to fetch user list');
	}
};
