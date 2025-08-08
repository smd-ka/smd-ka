<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import DateTimeInput from '$lib/components/forms/DateTimeInput.svelte';
	import TextArea from '$lib/components/forms/TextArea.svelte';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import UrlInput from '$lib/components/forms/UrlInput.svelte';
	import Fa from 'svelte-fa';
	import { _duplicateEvent, _handleDates, _shownEvent, type CalendarEvent } from './+page';
	import {
		faArrowUpRightFromSquare,
		faCheckCircle,
		faClone,
		faPen,
		faPencil,
		faPlus,
		faTrash
	} from '@fortawesome/free-solid-svg-icons';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import CalendarCategorySelect from './calendarCategorySelect.svelte';
	import { _eventStore } from './+page';
	export let shownEvent: CalendarEvent;
	export let loading = false;
	export let updated = false;

	let src = '';
	let image: undefined | File = undefined;
	let dateError: string = '';
	let error = undefined;

	// Change detection variables
	let hasChanges = false;
	let initialFormData = new Map();
	let formElement: HTMLFormElement;
	let initialImageSrc = '';

	const showPreview = (event: Event) => {
		const files = (event.target as HTMLInputElement).files;
		if (files && files.length > 0) {
			src = URL.createObjectURL(files[0]);
			image = files[0];
			hasChanges = true; // Mark as changed when image is selected
		}
	};

	// Initialize form data tracking
	const initializeFormTracking = () => {
		if (!formElement) return;

		const formData = new FormData(formElement);
		initialFormData.clear();

		// Store initial values
		for (const [key, value] of formData.entries()) {
			initialFormData.set(key, value);
		}

		// Store initial image state
		initialImageSrc = src;

		hasChanges = false;
	};

	// Check if form has changes
	const checkForChanges = () => {
		if (!formElement) return;

		const currentFormData = new FormData(formElement);

		// Check if image was changed
		if (image || src !== initialImageSrc) {
			hasChanges = true;
			return;
		}

		// Check form fields
		for (const [key, value] of currentFormData.entries()) {
			const initialValue = initialFormData.get(key) || '';
			if (value !== initialValue) {
				hasChanges = true;
				return;
			}
		}

		// Check if any initial fields are missing
		for (const [key, value] of initialFormData.entries()) {
			if (!currentFormData.has(key) && value !== '') {
				hasChanges = true;
				return;
			}
		}

		hasChanges = false;
	};

	// Handle form input changes
	const handleInputChange = () => {
		if (updated) {
			updated = false; // Reset updated state when user makes changes
		}
		checkForChanges();
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

	// Re-initialize tracking when shownEvent changes
	$: if (shownEvent && formElement) {
		setTimeout(() => initializeFormTracking(), 0);
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
			const record = await pb.collection('calendar').update<CalendarEvent>(shownEvent.id, formData);
			updated = true;
			hasChanges = false; // Reset changes after successful update
			shownEvent = record; // Update the shownEvent with the new data
			_eventStore.update((events) =>
				events.map((event) => (event.id === record.id ? record : event))
			);
			// Reset image state
			image = undefined;
			setTimeout(() => initializeFormTracking(), 0);
		} catch (err) {
			error = err;
		}

		loading = false;
	}

	async function deleteEvent() {
		loading = true;
		try {
			await pb.collection('calendar').delete(shownEvent.id);
			_eventStore.update((events) => events.filter((event) => event.id !== shownEvent.id));
		} catch (err) {
			error = err;
		}
		loading = false;
		_shownEvent.set(undefined);
	}
</script>

<h3>"{shownEvent.title}" bearbeiten:</h3>
<div class="flex justify-between">
	<div class="pb-4 text-gray-600">Mit * markierte Felder sind Pflichtfelder.</div>

	<div class="flex items-center gap-4">
		<button
			class="fa"
			on:click={() => {
				_duplicateEvent.set(shownEvent);
				_shownEvent.set(undefined);
			}}
		>
			<span class="max-md:hidden"> Event duplizieren </span>
			<Fa icon={faClone} />
		</button>

		<a class="fa" target="_blank" href={'/events/kalender/' + shownEvent.id}
			>anzeigen <Fa icon={faArrowUpRightFromSquare} /></a
		>
	</div>
</div>

<form
	class="grid gap-4 md:grid-cols-2"
	id="form"
	bind:this={formElement}
	on:submit|preventDefault={updateEvent}
	on:input={handleInputChange}
	on:change={handleInputChange}
	use:initializeFormTracking
>
	{#if error}
		<div class="col-span-full">
			<h3>Es ist ein Fehler aufgetreten:</h3>
			<pre>{error}</pre>
		</div>
	{/if}

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
			class="col-span-full flex w-fit items-center justify-center gap-2 place-self-end bg-red-500 p-4 text-white disabled:cursor-not-allowed disabled:opacity-50"
		>
			<Fa icon={faTrash} />
			Event löschen
			{#if loading}
				<img class="absolute left-16 h-8" src={loadingSpinner} alt="loading" />
			{/if}
		</button>

		<button
			type="submit"
			disabled={loading || (!hasChanges && !updated)}
			class="col-span-full flex w-fit items-center justify-center gap-2 place-self-end {updated
				? 'bg-green-700'
				: 'bg-black'} p-4 text-white disabled:cursor-not-allowed disabled:opacity-50"
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
