<script lang="ts">
	import DateTimeInput from '$lib/components/forms/DateTimeInput.svelte';
	import TextArea from '$lib/components/forms/TextArea.svelte';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import { pb } from '$lib/pocketbase';
	import { faChevronRight, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import Fa from 'svelte-fa';
	import UrlInput from '$lib/components/forms/UrlInput.svelte';
	import { goto } from '$app/navigation';
	import { _handleDates } from './+page';

	let src = '';
	let image: undefined | File = undefined;
	let loading = false;
	let dateError: string = '';
	let error = undefined;

	const showPreview = (event: Event) => {
		const files = (event.target as HTMLInputElement).files;
		if (files && files.length > 0) {
			src = URL.createObjectURL(files[0]);
			image = files[0];
		}
	};

	async function createEvent() {
		loading = true;
		const form = document.getElementById('form') as HTMLFormElement;

		let formData = new FormData(form);

		const dates = _handleDates(formData.get('start_date_time'), formData.get('end_date_time'));

		if (dates?.error) {
			dateError = dates.error;
			loading = false;
			return;
		}

		formData.set('start_date_time', dates?.startDateTime || '');
		formData.set('end_date_time', dates?.endDateTime || '');

		formData.append('image', image || '');
		try {
			const record = await pb.collection('calendar').create(formData);
			goto(`/events/kalender/${record.id}`);
		} catch (err) {
			error = err;
		}
		loading = false;
	}
</script>

<main class="container mx-auto px-4 pb-12">
	<h3 class="pb-2">Kalender Event hinzufügen</h3>
	<form class="grid gap-4 md:grid-cols-2" id="form" on:submit|preventDefault={createEvent}>
		{#if error}
			<div class="col-span-full">
				<h3>Es ist ein Fehler aufgetreten:</h3>
				<pre>{error}</pre>
			</div>
		{/if}
		<TextInput name="title" label="Titel*" disabled={loading} required />

		<select name="category" disabled={loading} class="w-full rounded-md border-2 py-3">
			<option value="" disabled selected>Kategorie, falls vorhanden</option>
			<option value="smd_abend">SMD-Abend</option>
			<option value="erstsemesteraktion">Erstsemesteraktion</option>
			<option value="kingscafe">Kings-Café</option>
			<option value="MIT">MIT</option>
		</select>
		<div>
			<DateTimeInput required name="start_date_time" disabled={loading}>
				Datum und Uhrzeit (Start)*
			</DateTimeInput>
			<b class="text-red-500">
				{dateError}
			</b>
		</div>
		<DateTimeInput name="end_date_time" disabled={loading}>Datum und Uhrzeit (Ende)</DateTimeInput>
		<TextInput name="location" label="Ort" disabled={loading} />
		<UrlInput name="location_url" label="Google Maps Link zum Ort" disabled={loading} />
		<TextInput name="speaker" label="Referent" />

		<div class="col-span-full">
			<TextArea name="description" label="Beschreibung" disabled={loading} />

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
			<a
				class="underline hover:no-underline"
				target="_blank"
				href="https://imagecompressor.11zon.com/de/image-compressor/"
				>Hier kann mann kostenlos Bilder komprimieren.
			</a>
		</div>

		<button
			type="submit"
			disabled={loading}
			class="col-span-full flex w-fit items-center justify-center gap-2 place-self-end bg-black p-4 text-white"
		>
			<Fa icon={faPlus} />
			Event zum Kalender hinzufügen
			{#if loading}
				<img class="absolute left-16 h-8" src={loadingSpinner} alt="loading" />
			{/if}
		</button>
	</form>
</main>
