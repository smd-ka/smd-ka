<script lang="ts">
	import InputField from '$lib/components/forms/TextInput.svelte';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import InputCheckbox from '$lib/components/forms/CheckboxInput.svelte';
	import { getErrorMessage, pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import type { saftRegistration } from '$lib/models';
	import EmailInputField from '$lib/components/forms/EmailInput.svelte';
	import TelephoneInputField from '$lib/components/forms/TelephoneInputField.svelte';
	import { PUBLIC_SEMESTER } from '$env/static/public';
	import GenderInput from '$lib/components/forms/GenderInput.svelte';

	const ticketValues = [
		'Deutschlandticket/Jugendticket BW',
		'KVV-Bescheinigung',
		'KVV-Semesterticket'
	];

	let record: saftRegistration;
	let loading = false;
	let success = false;
	let loggedIn = false;

	onMount(() => {
		if (pb.authStore.isValid) {
			loggedIn = true;
		}
	});

	let form: saftRegistration = {
		user: pb.authStore.model?.id,
		name: '',
		surname: '',
		email: '',
		phonenumber: '',
		takes_car: false,
		takes_bike: false,
		takes_train: false,
		ticket: '',
		would_sleep_on_floor: false,
		allergies: '',
		brings_cake: false,
		is_vegetarian: false,
		comments: '',
		post_images: 'never',
		semester: 'SS24'
	};

	const signup = async (event: Event) => {
		event.preventDefault();
		loading = true;
		try {
			record = await pb.collection('saft').create(form);
			success = true;
			console.log(record);
		} catch (e: any) {
			loading = false;
			console.error(getErrorMessage(e));
			return;
		}
		loading = false;
	};
</script>

<main class="container mx-auto py-24">
	<div class="px-4 lg:px-80">
		{#if success}
			<div class="grid gap-8">
				<h1 class=" text-3xl font-bold uppercase">Du hast dich erfolgreich angemeldet!</h1>
				<p>Wir haben dir eine Bestätigung per Email zukommen lassen ;).</p>
			</div>
		{:else}
			<h1 class="pb-0 text-5xl font-bold uppercase">SAFT Anmeldung</h1>
			<span class="text-xl font-bold text-gray-600">im {PUBLIC_SEMESTER}</span>
			{#if loggedIn}
				<p class="text-primary py-6 text-xl">
					Schön, dass du dabei bist {pb.authStore.model?.name}!
				</p>
			{/if}
			<form id="form" class="my-4 flex flex-col gap-4" on:submit|preventDefault={signup}>
				{#if !loggedIn}
					<h3>Und du bist?</h3>
					<InputField id="name" bind:value={form.name} label="Name" disabled={loading} required />
					<InputField id="surname" label="Nachname" disabled={loading} required />
					<EmailInputField id="email" label="E-Mail-Adresse" disabled={loading} required />
					<TelephoneInputField
						id="phonenumber"
						bind:value={form.phonenumber}
						label="Handynummer"
						disabled={loading}
						required
					/>
					<GenderInput />

					<select class="rounded-md border-2 py-3" required>
						<option disabled selected value="">Ich komme aus ...</option>
						<option value="Karlsruhe">Karlsruhe</option>
						<option value="Landau">Landau</option>
					</select>
				{/if}

				<h3>Wie möchtest du anreisen?</h3>

				<div>
					<p>
						Die <strong class="font-bold">Bahnanreise</strong> wird gegen 16:30 vom Hauptbahnhof starten.
					</p>

					<p>
						Die <strong class="font-bold">Fahrradanreise</strong> wird gegen 13:30 aus der Stadtmitte
						starten.
					</p>
				</div>
				<InputCheckbox
					id="takesCar"
					bind:checked={form.takes_car}
					label="Ich komme mit dem Auto und könnte Gepäck mitnehmen"
				/>

				<InputCheckbox
					id="takesBike"
					bind:checked={form.takes_bike}
					label="Ich nehme an der Fahrradtour zur Anreise (und Abreise) teil"
				/>

				<div>
					<InputCheckbox
						id="takesTrain"
						bind:checked={form.takes_train}
						label="Ich nehme an der Bahnfahrt teil."
					/>

					{#if form.takes_train}
						<fieldset class="ml-6 mt-1">
							<legend>Welches Ticket besitzt du am Anreise- und Abreisetag?</legend>

							{#each ticketValues as ticketVal}
								<div class="md:ml-4">
									<input
										bind:group={form.ticket}
										type="radio"
										id={ticketVal}
										name="ticket"
										value={ticketVal}
										required
									/>
									<label for={ticketVal}>{ticketVal}</label>
								</div>
							{/each}
						</fieldset>
					{/if}
				</div>

				<p class="font-bold">Weitere Infos zur Anreise folgen per Mail.</p>

				<h3 class="text-3xl font-bold uppercase">Organisatorisches</h3>

				<InputCheckbox
					id="wouldSleepOnFloor"
					bind:checked={form.would_sleep_on_floor}
					label="Ich könnte mir vorstellen ggf. auf den Boden zu schlafen und Schlafsack / Isomatte dazu mitzubringen"
				/>

				<InputCheckbox
					id="bringsCake"
					bind:checked={form.brings_cake}
					label="Ich bringe Kuchen, Muffins oder Ähnliches mit für Kaffee und Kuchen am Samstag"
				/>

				<InputCheckbox
					id="isVegetarian"
					bind:checked={form.is_vegetarian}
					label="Ich bin Vegetarier"
				/>

				<InputField
					bind:value={form.allergies}
					label="Allergien oder Unverträglichkeiten"
					disabled={loading}
				/>

				<div class="flex flex-col">
					<label for="comments">
						<bold class="font-bold">Sonstige Anmerkungen</bold> Wie z.B. verspätete Anreise oder Sondergepäck
						wie Instrumente, die Transportiert werden müssen.</label
					>
					<textarea bind:value={form.comments} class="rounded-md border-2" id="comments" rows="3"
					></textarea>
				</div>

				<span
					>Dürfen wir Bilder von dir machen und anschließend auf Instagram und der Website
					veröffentlichen?</span
				>
				<select bind:value={form.post_images} class="rounded-md border-2 py-3" required>
					<option value="yes">Ja</option>
					<option value="always ask"
						>Ja ihr dürft Bilder von mir machen, fragt mich bitte bevor ihr Bilder veröffentlicht.
					</option>
					<option value="never">Bitte macht keine Bilder von mir.</option>
				</select>

				<button
					disabled={loading}
					class="relative flex items-center justify-center bg-black px-12 py-4 text-white md:w-fit"
				>
					{#if loading}
						<img class="absolute left-2 h-8" src={loadingSpinner} alt="loading" />
					{/if}
					Anmelden
				</button>
			</form>
		{/if}
	</div>
</main>
