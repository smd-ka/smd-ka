import { getImageSrc } from './fetch_img';
import placeholder from '$lib/assets/pages/events/kalender/placeholder.png';
import kingsCafePlaceholder from '$lib/assets/logos/kings-cafe.svg';
import type { CalendarEvent } from './models';
import dayjs from 'dayjs';

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

export const formatEventDateRange = (
	event: CalendarEvent,
	sameDayFormat = 'DD. MMMM // HH:mm',
	rangeFormat = 'DD. MMMM'
) => {
	const start = dayjs(event.start_date_time);
	const end = event.end_date_time ? dayjs(event.end_date_time) : undefined;
	if (end && !start.isSame(end, 'day')) {
		return `${start.format(rangeFormat)} - ${end.format(rangeFormat)}`;
	}
	return start.format(sameDayFormat);
};
