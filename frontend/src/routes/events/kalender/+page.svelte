<script lang="ts">
	import { getImageSrc } from '$lib/fetch_img';
	import type { PageData } from './$types';
	import placeholder from '$lib/assets/pages/events/kalender/placeholder.png';

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
		if (!endDateString || sameDay(startDateString, endDateString)) {
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

	const sameDay = (start_date_time: string, end_date_time?: string) => {
		if (!end_date_time) return true;
		const d1 = new Date(start_date_time);
		const d2 = new Date(end_date_time);
		return (
			d1.getFullYear() === d2.getFullYear() &&
			d1.getMonth() === d2.getMonth() &&
			d1.getDate() === d2.getDate()
		);
	};

	function imgSrc(image: string, id: string, collectionId: string, collectionName: string) {
		if (!image) {
			return placeholder;
		}
		return getImageSrc(image, id, collectionId, collectionName);
	}
</script>

<main class="container mx-auto">
	<div class="pad py-24">
		<h1 class="text-center">Kalender</h1>

		<div class="grid grid-cols-[fit-content(6rem)_1fr] gap-2 gap-y-8">
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
							src={imgSrc(event.image, event.id, event.collectionId, event.collectionName)}
							class="w-full object-cover brightness-90 transition-all duration-200 hover:brightness-100"
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
						{#if event.location}
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
						{/if}
						<p class="line-clamp-3 max-lg:hidden">
							{event.description ? event.description : ''}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
