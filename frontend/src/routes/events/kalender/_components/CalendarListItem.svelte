<script lang="ts">
	import dayjs from 'dayjs';
	import { formatEventDateRange, getEventImageSrc } from '$lib/calendar';
	import type { CalendarEvent } from '$lib/models';

	export let event: CalendarEvent;
</script>

<div class="flex flex-col items-center lg:px-8">
	<span class="text-xl uppercase">
		{dayjs(event.start_date_time).format('dd')}
	</span>
	<span class="text-3xl font-bold">
		{dayjs(event.start_date_time).format('DD')}
	</span>
</div>

<div class="grid gap-2 lg:grid-cols-2">
	<a class="lg:order-last" href={'/events/kalender/' + event.id}>
		<img
			src={getEventImageSrc(event)}
			class="w-full object-cover brightness-90 transition-all duration-200 hover:brightness-100"
			alt={event.title}
		/>
	</a>
	<div>
		<div class="py-2 text-sm text-gray-700">
			{formatEventDateRange(event)}
		</div>
		<div class="lg:text-3xl">
			<a
				href={'/events/kalender/' + event.id}
				class="text-primary no-underline hover:underline max-md:text-lg">{event.title}</a
			>
		</div>
		{#if event.location}
			<div class="font-bold">
				Ort:
				<a
					href={event.location_url || null}
					target="_blank"
					rel="noopener"
					class="location-link">
					{event.location}
				</a>
			</div>
		{/if}
		<p class="line-clamp-6 max-lg:hidden">
			{@html event.description ? event.description : ''}
		</p>
	</div>
</div>

<style>
	.location-link[href]:hover {
		@apply underline;
	}
</style>
