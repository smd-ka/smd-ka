<script lang="ts">
	import type { PageData } from './$types';
	import dayjs from 'dayjs';
	import { _imgSrc } from './+page';

	export let data: PageData;
</script>

<main class="container mx-auto">
	<div class="pad py-24">
		<h1 class="text-center">Kalender</h1>

		<div class="grid grid-cols-[fit-content(6rem)_1fr] gap-2 gap-y-8">
			{#each data.events as event}
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
							src={_imgSrc(
								event.image,
								event.id,
								event.collectionId,
								event.collectionName,
								event.category
							)}
							class="w-full object-cover brightness-90 transition-all duration-200 hover:brightness-100"
							alt={event.title}
						/>
					</a>
					<div>
						<div class="py-2 text-sm text-gray-700">
							{#if event.end_date_time && !dayjs(event.start_date_time).isSame(dayjs(event.end_date_time), 'day')}
								{dayjs(event.start_date_time).format('DD. MMMM')} - {dayjs(
									event.end_date_time
								).format('DD. MMMM')}
							{:else}
								{dayjs(event.start_date_time).format('DD. MMMM // HH:mm')}
							{/if}
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
