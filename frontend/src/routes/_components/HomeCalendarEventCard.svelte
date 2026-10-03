<script lang="ts">
	import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { formatEventDateRange, getEventImageSrc } from '$lib/calendar';
	import type { CalendarEvent } from '$lib/models';

	export let event: CalendarEvent;
</script>

<div class="group flex h-full flex-col">
	<a href="/events/kalender/{event.id}">
		<img
			src={getEventImageSrc(event)}
			class="w-full rounded-sm object-cover transition-all duration-300 hover:cursor-pointer group-hover:scale-[101%]"
			alt={event.title}
		/>
	</a>
	<div class="peer flex-1 border-x-2 border-b-2 px-4 py-2">
		<div class="flex justify-between text-gray-500 max-xl:flex-col">
			<div>
				{formatEventDateRange(event, 'dddd, DD.MM // HH:mm')}
			</div>
			{#if event.location}
				<a class="location-link fa" href={event.location_url || null}>
					<Fa icon={faLocationDot} />
					{event.location}
				</a>
			{/if}
		</div>
		<div class="text-2xl font-bold">
			{event.title}
		</div>

		<p class="line-clamp-2">
			{@html event.description ?? ''}
		</p>
		<a href="/events/kalender/{event.id}" class="text-primary">Mehr erfahren</a>
	</div>
</div>

<style>
	.location-link[href]:hover {
		@apply text-primary cursor-pointer;
	}
</style>
