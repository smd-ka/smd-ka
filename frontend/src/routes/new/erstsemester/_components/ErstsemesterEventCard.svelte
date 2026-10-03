<script lang="ts">
	import { faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

	import { getImageSrc } from '$lib/fetch_img';
	import dayjs from 'dayjs';
	import Fa from 'svelte-fa';

	export let event: any;
</script>

<div>
	<img
		src={getImageSrc(event.image, event.id, event.collectionId, event.collectionName)}
		alt={event.title}
	/>
	<div class="pt-8">
		<h3>{event.title}</h3>
		<span class="flex items-center gap-2 text-xl font-bold">
			<Fa icon={faCalendarDays} />
			{#if event.end_date_time && !dayjs(event.start_date_time).isSame(dayjs(event.end_date_time), 'day')}
				{dayjs(event.start_date_time).format('DD. MMMM')} - {dayjs(event.end_date_time).format(
					'DD. MMMM'
				)}
			{:else}
				{dayjs(event.start_date_time).format('DD. MMMM // HH:mm')}
			{/if}
		</span>
		<span class="flex items-center gap-2 text-xl font-bold">
			<Fa icon={faLocationDot} />
			<a href={event.location_url} class="hover:underline">
				{event.location}
			</a>
		</span>
	</div>
	<p class="py-4">
		{@html event.description}
	</p>
</div>
