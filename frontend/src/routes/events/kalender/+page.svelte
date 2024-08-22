<script lang="ts">
	import { getImageSrc } from '$lib/fetch_img';
	import type { PageData } from './$types';

	export let data: PageData;

	const getWeekday = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('de-DE', {
			weekday: 'short'
		});
	};

	const getDay = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('de-DE', {
			day: '2-digit'
		});
	};

	const getFullDate = (startDateString: string, endDateString?: string) => {
		const startDate = new Date(startDateString);
		if (!endDateString) {
			return (
				startDate.toLocaleDateString('de-DE', {
					day: '2-digit',
					month: 'long'
				}) +
				' // ' +
				startDate.toLocaleTimeString('de-DE', {
					hour: '2-digit',
					minute: '2-digit'
				})
			);
		}
		const endDate = new Date(endDateString);
		return (
			startDate.toLocaleDateString('de-DE', {
				day: '2-digit',
				month: 'long'
			}) +
			' - ' +
			endDate.toLocaleDateString('de-DE', {
				day: '2-digit',
				month: 'long'
			})
		);
	};
</script>

<main class="container mx-auto">
	<div class="pad py-24">
		<h1 class="text-center">Kalender</h1>

		<div class="grid grid-cols-[fit-content(6rem)_1fr] gap-2 gap-y-6">
			{#each data.events as event}
				<div class="flex flex-col items-center lg:px-8">
					<span class="text-xl uppercase">
						{getWeekday(event.start_date_time)}
					</span>
					<span class="text-3xl font-bold">
						{getDay(event.start_date_time)}
					</span>
				</div>

				<div class="grid gap-2 lg:grid-cols-2">
					<a class="lg:order-last" href={'/events/kalender/' + event.id}>
						<img
							src={getImageSrc(event.image, event.id, event.collectionId, event.collectionName)}
							class="max-h-36 w-full object-cover brightness-75 transition-all duration-200 hover:brightness-100"
							alt={event.title}
						/>
					</a>
					<div>
						<div class="py-2 text-sm text-gray-700">
							{getFullDate(event.start_date_time, event.end_date_time)}
						</div>
						<div class="lg:text-3xl">
							<a
								href={'/events/kalender/' + event.id}
								class="text-primary no-underline hover:underline max-md:text-lg">{event.title}</a
							>
						</div>
						<div class="font-bold">
							Ort:
							{#if event.maps_url}
								<a href={event.maps_url} target="_blank" rel="noopener">
									{event.location}
								</a>
							{:else if event.location_url}
								<a href={event.location_url} target="_blank" rel="noopener">
									{event.location}
								</a>
							{:else}
								{event.location}
							{/if}
						</div>
						<p class="line-clamp-3 max-lg:hidden">
							{event.description ? event.description : ''}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
