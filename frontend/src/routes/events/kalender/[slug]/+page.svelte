<script lang="ts">
	import { faArrowLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import type { PageData } from '../$types';
	import Fa from 'svelte-fa/src/fa.svelte';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import { getImageSrc } from '$lib/fetch_img';
	import placeholder from '$lib/assets/pages/events/kalender/placeholder.jpg';

	export let data: PageData;

	const getDate = (startDateString: string, endDateString: string) => {
		if (!endDateString) {
			const date = new Date(startDateString);
			return (
				date.toLocaleDateString('de-DE', {
					day: '2-digit',
					month: 'long',
					year: 'numeric'
				}) +
				' // ' +
				date.toLocaleTimeString('de-DE', {
					hour: '2-digit',
					minute: '2-digit'
				})
			);
		}
		const startDate = new Date(startDateString);
		const endDate = new Date(endDateString);
		return (
			startDate.toLocaleDateString('de-DE', {
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			}) +
			' - ' +
			endDate.toLocaleDateString('de-DE', {
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			})
		);
	};

	function imgSrc(image: string, id: string, collectionId: string, collectionName: string) {
		if (!image) {
			return placeholder;
		}
		return getImageSrc(image, id, collectionId, collectionName);
	}
</script>

{#if !data.entry}
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
	<HeroShot
		imgSrc={imgSrc(
			data.entry.image,
			data.entry.id,
			data.entry.collectionId,
			data.entry.collectionName
		)}
		height="h-[80svh]"
	/>
	<main class="container relative mx-auto px-4 py-12">
		<a
			href="/events/kalender"
			class="text-primary absolute -left-6 top-14 text-3xl hover:brightness-110"
			><Fa icon={faArrowLeft} /></a
		>
		<h1 class="pb-0">{data.entry.title}</h1>
		<div class="pb-6 text-gray-500">
			{getDate(data.entry.start_date_time, data.entry.end_date_time)}
		</div>

		<section class="grid md:grid-cols-[1fr_fit-content(12rem)]">
			<div>
				{data.entry.description}
			</div>
			<div class="grid whitespace-nowrap max-md:order-first">
				<h3 class="uppercase">Details</h3>
				<p>
					Datum: {getDate(data.entry.start_date_time, data.entry.end_date_time)}
				</p>
				<p>
					Ort:
					{#if data.entry.maps_url}
						<a href={data.entry.maps_url} target="_blank" rel="noopener">
							{data.entry.location}
						</a>
					{:else if data.entry.location_url}
						<a href={data.entry.location_url} target="_blank" rel="noopener">
							{data.entry.location}
						</a>
					{:else}
						{data.entry.location}
					{/if}
				</p>
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
