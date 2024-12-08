<script lang="ts">
	import DateTimeInput from '$lib/components/forms/DateTimeInput.svelte';
	import TextArea from '$lib/components/forms/TextArea.svelte';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import UrlInput from '$lib/components/forms/UrlInput.svelte';
	import Fa from 'svelte-fa';
	import type { PageData } from '../$types';
	import dayjs from 'dayjs';
	import { faPen, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import { pb } from '$lib/pocketbase';

	export let data: PageData;

	let src = '';
	let image: undefined | File = undefined;
	let loading = false;
	let dateError: string = '';
	let error = undefined;

	let shownEvent = data.events[0];

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
		if (shownEvent.image) {
			src = pb.files.getUrl(
				{
					collectionId: shownEvent.collectionId,
					collectionName: shownEvent.collectionName,
					id: shownEvent.id
				},
				shownEvent.image
			);
		}
	}
</script>

<main class="container mx-auto px-4 py-12">
	<h3 class="pl-4">Kalender Event bearbeiten</h3>

	<div class="grid gap-2 rounded-lg border p-4 md:grid-cols-[32rem_1fr]">
		<section class="flex flex-col divide-y">
			{#each data.events as event}
				<button
					on:click={() => (shownEvent = event)}
					class="overflow-hidden text-ellipsis whitespace-nowrap py-2 text-left"
				>
					<b class={shownEvent.id === event.id ? 'text-primary underline' : ''}>{event.title}</b>
					<div>
						{getDateString(event.start_date_time, event.end_date_time)} +++
						<a href={event.location_url}>{event.location}</a>
					</div>
				</button>
			{/each}
		</section>
		<section class=" bg-gray-50 p-2">
			<div class="grid grid-cols-2 gap-4 py-4">
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
		</section>
	</div>
</main>
