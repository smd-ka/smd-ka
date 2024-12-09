<script lang="ts">
	import DateTimeInput from '$lib/components/forms/DateTimeInput.svelte';
	import TextArea from '$lib/components/forms/TextArea.svelte';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import UrlInput from '$lib/components/forms/UrlInput.svelte';
	import Fa from 'svelte-fa';
	import type { PageData } from '../$types';
	import dayjs from 'dayjs';
	import {
		faChevronRight,
		faPen,
		faPencil,
		faPlus,
		faTrash
	} from '@fortawesome/free-solid-svg-icons';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import { pb } from '$lib/pocketbase';
	import { _handleDates } from './+page';
	import { onMount } from 'svelte';

	export let data: PageData;

	let src = '';
	let image: undefined | File = undefined;
	let loading = false;
	let dateError: string = '';
	let error = undefined;
	let shownEvent = undefined;

	onMount(() => {
		if (data.events.length > 0) {
			shownEvent = data.events[0];
		}
	});

	const getDateString = (startDateString: string, endDateString: string) => {
		if (!endDateString) {
			return dayjs(startDateString).format('DD.MM.YYYY HH:mm');
		}
		if (dayjs(startDateString).isSame(dayjs(endDateString), 'day')) {
			return `${dayjs(startDateString).format('DD.MM HH:mm')} - ${dayjs(endDateString).format('HH:mm')}`;
		}
		return `${dayjs(startDateString).format('DD.MM.YYYY HH:mm')} - ${dayjs(endDateString).format('DD.MM.YYYY HH:mm')}`;
	};

	const showPreview = (event: Event) => {
		const files = (event.target as HTMLInputElement).files;
		if (files && files.length > 0) {
			src = URL.createObjectURL(files[0]);
			image = files[0];
		}
	};

	$: {
		if (shownEvent?.image) {
			src = pb.files.getUrl(
				{
					collectionId: shownEvent.collectionId,
					collectionName: shownEvent.collectionName,
					id: shownEvent.id
				},
				shownEvent.image
			);
		} else {
			src = '';
		}
	}

	async function updateEvent() {
		loading = true;
		const form = document.getElementById('form') as HTMLFormElement;

		let formData = new FormData(form);

		const dates = _handleDates(formData.get('start_date_time'), formData.get('end_date_time'));

		if (dates?.startDateTime && dates?.endDateTime && dates.startDateTime > dates.endDateTime) {
			dateError = 'Das Startdatum muss vor dem Enddatum liegen.';
			loading = false;
			return;
		}

		formData.set('start_date_time', dates?.startDateTime || '');
		formData.set('end_date_time', dates?.endDateTime || '');

		formData.append('image', image || '');
		try {
			const record = await pb.collection('calendar').update(shownEvent.id, formData);
			goto(`/events/kalender/${record.id}`);
		} catch (err) {
			error = err;
		}
		loading = false;
	}

	async function deleteEvent() {
		loading = true;
		try {
			await pb.collection('calendar').delete(shownEvent.id);
			data.events = data.events.filter((event) => event.id !== shownEvent.id);
		} catch (err) {
			error = err;
		}
		loading = false;
	}
</script>

<nav class="container mx-auto px-4 py-4">
	<ol class="inline-flex list-none">
		<li class="flex items-center">
			<a class="!no-underline" href="/intern">Intern</a>
			<Fa icon={faChevronRight} class="mx-2" />
		</li>
		<li class="flex items-center">
			<a class="!no-underline" href="/intern/edit-event">Kalender Event bearbeiten</a>
		</li>
	</ol>
</nav>

<main class="container mx-auto px-4 pb-8">
	<h3 class="pl-4">Kalender Event bearbeiten</h3>

	{#if !shownEvent}
		<p class="pl-4">
			Es gibt keine Events du kannst <a href="/intern/add-event">hier</a> welche anlegen
		</p>
	{:else}
		<div class="grid gap-2 rounded-lg border p-4 md:grid-cols-[32rem_1fr]">
			<section class="h-[78svh] overflow-y-auto overflow-x-hidden text-ellipsis max-md:h-64">
				<div class="grid divide-y">
					{#each data.events as event}
						<button
							on:click={() => (shownEvent = event)}
							disabled={loading}
							class="overflow-hidden text-ellipsis py-2 text-left"
						>
							<b
								class="{shownEvent.id === event.id
									? 'text-primary underline'
									: ''} whitespace-nowrap">{event.title}</b
							>
							<div class="whitespace-pre-line">
								{getDateString(event.start_date_time, event.end_date_time)} +++
								{event.location}
							</div>
						</button>
					{/each}
				</div>
			</section>
			<div class="h-0.5 bg-black md:hidden"></div>
			<section class=" bg-gray-50 p-2">
				<form class="grid gap-4 md:grid-cols-2" id="form" on:submit|preventDefault={updateEvent}>
					<div class="col-span-full">
						<TextInput
							name="title"
							label="Titel*"
							value={shownEvent.title}
							disabled={loading}
							required
						/>
					</div>

					<div>
						<DateTimeInput
							value={shownEvent.start_date_time}
							required
							name="start_date_time"
							disabled={loading}
						>
							Datum und Uhrzeit (Start)*
						</DateTimeInput>
						<b class="text-red-500">
							{dateError}
						</b>
					</div>

					<DateTimeInput value={shownEvent.start_date_time} name="end_date_time" disabled={loading}
						>Datum und Uhrzeit (Ende)</DateTimeInput
					>
					<TextInput value={shownEvent.location} name="location" label="Ort" disabled={loading} />
					<UrlInput
						value={shownEvent.location_url}
						name="location_url"
						label="Google Maps Link zum Ort"
						disabled={loading}
					/>
					<TextInput value={shownEvent.speaker} name="speaker" label="Referent" />

					<select
						name="category"
						value={shownEvent.category}
						disabled={loading}
						class="w-full rounded-md border-2 py-3"
					>
						<option value="" disabled selected>Kategorie, falls vorhanden</option>
						<option value="smd_abend">SMD-Abend</option>
						<option value="erstsemesteraktion">Erstsemesteraktion</option>
						<option value="kingscafe">Kings-Café</option>
						<option value="MIT">MIT</option>
					</select>

					<div class="col-span-full">
						<TextArea
							value={shownEvent.description}
							name="description"
							label="Beschreibung"
							disabled={loading}
						/>

						<label for="image">
							<div class="relative">
								{#if src}
									<div class="relative">
										<div
											class="bg-primary absolute bottom-0 right-0 rounded-full p-2 text-xl text-white shadow-lg"
										>
											<Fa icon={faPencil} />
										</div>
										<img class="h-72 border object-cover" {src} alt="Bild zum Event" />
									</div>
								{:else}
									<div class="flex w-fit items-center gap-2 bg-black p-4 text-xl text-white">
										<Fa icon={faPlus} />
										Bild hochladen
									</div>
								{/if}
							</div>
							<input
								type="file"
								name="image"
								id="image"
								accept="image/*"
								hidden
								on:change={showPreview}
							/>
						</label>
						<b>Bitte achtet darauf, dass die Bilder nicht größer als 500 KB sind.</b><br />
						<a target="_blank" href="https://imagecompressor.11zon.com/de/image-compressor/"
							>Hier kann mann kostenlos Bilder komprimieren.
						</a>
					</div>

					<div class="col-span-full flex justify-end gap-8">
						<button
							type="button"
							on:click={deleteEvent}
							disabled={loading}
							class="col-span-full flex w-fit items-center justify-center gap-2 place-self-end bg-red-500 p-4 text-white"
						>
							<Fa icon={faTrash} />
							Event löschen
							{#if loading}
								<img class="absolute left-16 h-8" src={loadingSpinner} alt="loading" />
							{/if}
						</button>

						<button
							type="submit"
							disabled={loading}
							class="col-span-full flex w-fit items-center justify-center gap-2 place-self-end bg-black p-4 text-white"
						>
							<Fa icon={faPen} />
							Änderungen speichern
							{#if loading}
								<img class="absolute left-16 h-8" src={loadingSpinner} alt="loading" />
							{/if}
						</button>
					</div>
				</form>
			</section>
		</div>
	{/if}
</main>
