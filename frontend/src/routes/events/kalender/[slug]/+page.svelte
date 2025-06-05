<script lang="ts">
	import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import type { PageData } from '../$types';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { getImageSrc } from '$lib/fetch_img';
	import placeholder from '$lib/assets/pages/events/kalender/placeholder.png';
	import { _categoryToDisplayName } from './+page';
	import dayjs from 'dayjs';

	export let data: PageData;
	const startDateTime = new Date(data.event.start_date_time);
	const endDateTime = data.event.end_date_time ? new Date(data.event.end_date_time) : undefined;

	function imgSrc(image: string, id: string, collectionId: string, collectionName: string) {
		if (!image) {
			return placeholder;
		}
		return getImageSrc(image, id, collectionId, collectionName);
	}
</script>

{#if !data.event}
	<div class="grid justify-center gap-2 px-4 py-24">
		<div class="lg:5xl text-center font-bold uppercase md:text-3xl">
			Die Veranstaltung konnte nicht gefunden werden
		</div>
		<a
			class="bg-primary flex w-fit items-center gap-2 justify-self-center px-4 py-2 text-white no-underline hover:underline"
			href="/events/kalender"
		>
			<Fa icon={faChevronRight} />
			Zurück zum Kalender
		</a>
	</div>
{:else}
	<main class="container mx-auto px-8 py-12 xl:px-40">
		<a href="/events/kalender" class="text-primary text-sm no-underline hover:underline">
			Kalender > {_categoryToDisplayName(data.event.category) || data.event.title}
		</a>

		<h1 class="break-words pb-0">{data.event.title}</h1>
		<div class="pb-6 text-gray-500">
			{#if endDateTime && !dayjs(startDateTime).isSame(dayjs(endDateTime), 'day')}
				{dayjs(startDateTime).format('DD. MMMM YYYY')} -
				{dayjs(endDateTime).format('DD. MMMM YYYY')}
			{:else}
				{dayjs(startDateTime).format('DD. MMMM YYYY // HH:mm')}
			{/if}
		</div>

		<img
			alt="Foto für {data.event.title}"
			src={imgSrc(
				data.event.image,
				data.event.id,
				data.event.collectionId,
				data.event.collectionName
			)}
		/>

		<section class="grid gap-8 py-12 md:grid-cols-[3fr_fit-content(18rem)]">
			<div class="whitespace-pre-line">{@html data.event.description}</div>
			<div class="max-md:order-first">
				<h3 class="uppercase">Details</h3>
				{#if dayjs(startDateTime).isSame(dayjs(endDateTime), 'day')}
					<p>
						Datum: {dayjs(startDateTime).format('DD. MMMM YYYY')}
					</p>
					<p>
						Uhrzeit: {dayjs(startDateTime).format('HH:mm')} - {dayjs(endDateTime).format('HH:mm')}
					</p>
				{:else}
					<p>
						Start:
						{dayjs(startDateTime).format('DD. MMMM YYYY // HH:mm')}
					</p>
					<p>
						Ende:
						{dayjs(endDateTime).format('DD. MMMM YYYY // HH:mm')}
					</p>
				{/if}

				<p>
					Ort:
					{#if data.event.location_url}
						<a href={data.event.location_url} target="_blank" rel="noopener">
							{data.event.location}
						</a>
					{:else}
						{data.event.location ? data.event.location : 'folgt'}
					{/if}
				</p>
				{#if _categoryToDisplayName(data.event.category)}
					<div>Kategorie: {_categoryToDisplayName(data.event.category)}</div>
				{/if}

				{#if data.event.speaker}
					<div>Referent/Referentin: {data.event.speaker}</div>
				{/if}
			</div>
		</section>

		<div class="py-12">
			<a
				class="bg-primary flex w-fit items-center gap-2 justify-self-center px-4 py-2 text-white no-underline hover:underline"
				href="/events/kalender"
			>
				<Fa icon={faChevronRight} />
				Zurück zum Kalender
			</a>
		</div>
	</main>
{/if}
