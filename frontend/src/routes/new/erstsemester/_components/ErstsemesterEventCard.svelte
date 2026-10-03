<script lang="ts">
	import { faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

	import { getEventImageSrc, formatEventDateRange } from '$lib/calendar';
	import Fa from 'svelte-fa';
	import type { CalendarEvent } from '$lib/models';

	export let event: CalendarEvent;
</script>

<div>
	<img
		src={getEventImageSrc(event)}
		alt={event.title}
	/>
	<div class="pt-8">
		<h3>{event.title}</h3>
		<span class="flex items-center gap-2 text-xl font-bold">
			<Fa icon={faCalendarDays} />
			{formatEventDateRange(event)}
		</span>
		<span class="flex items-center gap-2 text-xl font-bold">
			<Fa icon={faLocationDot} />
			<a href={event.location_url || null} class="location-link">
				{event.location}
			</a>
		</span>
	</div>
	<p class="py-4">
		{@html event.description}
	</p>
</div>

<style>
	.location-link[href]:hover {
		@apply underline;
	}
</style>
