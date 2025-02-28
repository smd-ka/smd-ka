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

	const getDateTime = (startDateString: string, endDateString: string) => {
		if (!endDateString || sameDay(startDateString, endDateString)) {
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

	const getStartDate = (startDateString: string) => {
		const date = new Date(startDateString);
		return (
			date.toLocaleDateString('de-DE', {
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			}) +
			' // ' +
			date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
		);
	};

	const getEndDate = (endDateString: string) => {
		const date = new Date(endDateString);
		return (
			date.toLocaleDateString('de-DE', {
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			}) +
			' // ' +
			date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
		);
	};

	const getDate = (startDateString: string, endDateString: string) => {
		if (!endDateString || sameDay(startDateString, endDateString)) {
			const date = new Date(startDateString);
			return date.toLocaleDateString('de-DE', {
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			});
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

	const getHour = (startDateString: string, endDateString: string) => {
		if (!endDateString) {
			const date = new Date(startDateString);
			return date.toLocaleTimeString('de-DE', {
				hour: '2-digit',
				minute: '2-digit'
			});
		}
		const startDate = new Date(startDateString);
		const endDate = new Date(endDateString);
		return (
			startDate.toLocaleTimeString('de-DE', {
				hour: '2-digit',
				minute: '2-digit'
			}) +
			' - ' +
			endDate.toLocaleTimeString('de-DE', {
				hour: '2-digit',
				minute: '2-digit'
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
				{#if sameDay(data.event.start_date_time, data.event.end_date_time)}
					<p>
						Datum: {getDate(data.event.start_date_time, data.event.end_date_time)}
					</p>
					<p>
						Uhrzeit: {getHour(data.event.start_date_time, data.event.end_date_time)}
					</p>
				{:else}
					<p>
						Start: {getStartDate(data.event.start_date_time)}
					</p>
					<p>
						Ende: {getEndDate(data.event.end_date_time)}
					</p>
				{/if}

				<p>
					Ort:
					{#if data.event.maps_url}
						<a href={data.event.maps_url} target="_blank" rel="noopener">
							{data.event.location}
						</a>
					{:else if data.event.location_url}
						<a href={data.event.location_url} target="_blank" rel="noopener">
							{data.event.location}
						</a>
					{:else}
						{data.event.location}
					{/if}
				</p>
				{#if _categoryToDisplayName(data.event.category)}
					<div>Kategorie: {_categoryToDisplayName(data.event.category)}</div>
				{/if}

				{#if data.event.speaker}
					<div>Referent: {data.event.speaker}</div>
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
