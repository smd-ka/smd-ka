<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import DateTimeInput from '$lib/components/forms/DateTimeInput.svelte';
	import TextArea from '$lib/components/forms/TextArea.svelte';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import UrlInput from '$lib/components/forms/UrlInput.svelte';
	import Fa from 'svelte-fa';
	import { _handleDates } from './+page';
	import {
		faCheckCircle,
		faPen,
		faPencil,
		faPlus,
		faTrash
	} from '@fortawesome/free-solid-svg-icons';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import CalendarCategorySelect from './calendarCategorySelect.svelte';
	export let shownEvent;
	export let loading = false;
	export let updated = false;

	let src = '';
	let image: undefined | File = undefined;
	let dateError: string = '';
	let error = undefined;

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

		formData.append('image', image || shownEvent?.image);
		try {
			const record = await pb.collection('calendar').update(shownEvent.id, formData);
			updated = true;
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

<h3>"{shownEvent.title}" bearbeiten:</h3>
<div class="pb-4 text-gray-600">Mit * markierte Felder sind Pflichtfelder.</div>

<form class="grid gap-4 md:grid-cols-2" id="form" on:submit|preventDefault={updateEvent}>
	<div class="col-span-full">
		<TextInput name="title" label="Titel*" value={shownEvent.title} disabled={loading} required />
	</div>
	<div class="col-span-full">
		<TextInput
			name="title_en"
			label="Titel (Englisch)"
			value={shownEvent.title_en}
			disabled={loading}
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

	<DateTimeInput value={shownEvent.end_date_time} required name="end_date_time" disabled={loading}>
		Datum und Uhrzeit (Ende)*
	</DateTimeInput>
	<TextInput value={shownEvent.location} name="location" label="Ort" disabled={loading} />
	<UrlInput
		value={shownEvent.location_url}
		name="location_url"
		label="Google Maps Link zum Ort"
		disabled={loading}
	/>
	<TextInput value={shownEvent.speaker} name="speaker" label="Referent" />

	<CalendarCategorySelect {loading} category={shownEvent.category} />

	<div class="col-span-full grid gap-4">
		<TextArea
			value={shownEvent.description}
			name="description"
			label="Beschreibung"
			rows={6}
			disabled={loading}
		/>

		<TextArea
			value={shownEvent.description_en}
			name="description_en"
			label="Beschreibung (Englisch)"
			rows={6}
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
			<input type="file" name="image" id="image" accept="image/*" hidden on:change={showPreview} />
		</label>
		<b>Bitte achtet darauf, dass die Bilder nicht größer als 500 KB sind.</b><br />
		<a
			target="_blank"
			class="underline"
			href="https://imagecompressor.11zon.com/de/image-compressor/"
		>
			Hier kann mann kostenlos Bilder komprimieren.
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
			class="col-span-full flex w-fit items-center justify-center gap-2 place-self-end {updated
				? 'bg-green-700'
				: 'bg-black'}  p-4 text-white"
		>
			{#if updated}
				<Fa icon={faCheckCircle} />
				Änderungen gespeichert
			{:else}
				{#if loading}
					<img class="absolute left-16 h-8" src={loadingSpinner} alt="loading" />
				{:else}
					<Fa icon={faPen} />
				{/if}
				Änderungen speichern
			{/if}
		</button>
	</div>
</form>
