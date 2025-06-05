import { pb } from '$lib/pocketbase';
import { calendarEvents } from '$lib/stores';
import type { PageLoad } from './$types';
import placeholder from '$lib/assets/pages/events/kalender/placeholder.png';
import kingsCafePlaceholder from '$lib/assets/logos/kings-cafe.svg';
import { getImageSrc } from '$lib/fetch_img';

export const load: PageLoad = async () => {
	try {
		const now = new Date();
		const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
		const records = await pb.collection('calendar').getFullList({
			sort: '+start_date_time',
			filter: `start_date_time >= "${startOfToday}" && category!='german_bible_study'`
		});
		calendarEvents.set(records);
		return { events: records };
	} catch (error) {
		console.error(error);
		return { events: [] };
	}
};

export const _imgSrc = (
	image: string,
	id: string,
	collectionId: string,
	collectionName: string,
	category: string
) => {
	if (!image && category === 'kingscafe') {
		// Use a specific placeholder for Kings Cafe if no image is provided
		return kingsCafePlaceholder;
	}
	if (!image) {
		return placeholder;
	}
	return getImageSrc(image, id, collectionId, collectionName);
};
