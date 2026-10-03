import { getImageSrc } from './fetch_img';
import placeholder from '$lib/assets/pages/events/kalender/placeholder.png';
import kingsCafePlaceholder from '$lib/assets/logos/kings-cafe.svg';
import type { CalendarEvent } from './models';

export const getEventImageSrc = (event: CalendarEvent) => {
	if (!event.image && event.category === 'kingscafe') {
		// Use a specific placeholder for Kings Cafe if no image is provided
		return kingsCafePlaceholder;
	}
	if (!event.image) {
		return placeholder;
	}
	return getImageSrc(event.image, event.id, event.collectionId, event.collectionName);
};
