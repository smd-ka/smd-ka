<script lang="ts">
	import InputField from '$lib/components/forms/TextInput.svelte';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import InputCheckbox from '$lib/components/forms/CheckboxInput.svelte';
	import { getErrorMessage, pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import type { saftRegistration } from '$lib/models';
	import EmailInputField from '$lib/components/forms/EmailInput.svelte';
	import TelephoneInputField from '$lib/components/forms/TelephoneInputField.svelte';

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
		semester: 'WS23/24'
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

<main class="container mx-auto">
	<div class="card mt-10">
		{#if success}
			<div>
				<h1 class="text-primary text-2xl">Du hast dich erfolgreich angemeldet!</h1>
				Wir haben folgende Daten von dir gespeichert:
				<div>Name: {record?.name ? record?.name : pb.authStore.model?.name}</div>
				<div>E-Mail: {record?.email ? record?.email : pb.authStore.model?.email}</div>
				<div>
					Handynummer: {record?.phonenumber ? record?.phonenumber : pb.authStore.model?.phonenumber}
				</div>
				{#if record?.takes_car}
					<div>Du kommst mit dem Auto und kannst Gepäck der Fahrradfahrer mitnehmen.</div>
				{/if}
				{#if record?.takes_bike}
					<div>Du nimmst an der Fahrradtour zur SAFT teil.</div>
				{/if}
				{#if record?.takes_train}
					<div>Du reist mit Bus und Bahn an.</div>
				{/if}
				<div>Du hast folgendes Ticket angegeben: {record?.ticket}</div>
				{#if record?.would_sleep_on_floor}
					<div>
						Du würdest Isomatte und Schlafsack mitzubringen und auf dem Boden schlafen falls nötig.
					</div>
				{/if}
				{#if record?.brings_cake}
					<div>Du bringst einen Kuchen, Muffins oder Ähnliches mit.</div>
				{/if}
				{#if record?.is_vegetarian}
					<div>Du isst vegetarisch.</div>
				{/if}
				<div>Du hast folgende Allergien/Unverträglichkeiten angegeben: {record?.allergies}</div>
				<div>Du hast folgende Anmerkungen angegeben: {record?.comments}</div>
			</div>
		{:else}
			<h1 class="text-primary text-2xl">SAFT Anmeldung WiSe 2023</h1>
			{#if loggedIn}
				Schön, dass du dabei bist {pb.authStore.model?.name}!
			{/if}

			<form class="my-4 flex flex-col gap-4" on:submit={signup}>
				{#if !loggedIn}
					<InputField id="name" bind:value={form.name} label="Name" disabled={loading} required />
					<EmailInputField
						id="email"
						bind:value={form.email}
						label="E-Mail-Adresse"
						disabled={loading}
						required
					/>
					<TelephoneInputField
						id="phonenumber"
						bind:value={form.phonenumber}
						label="Handynummer"
						disabled={loading}
						required
					/>
				{/if}
				<h3 class="text-primary text-lg">Wie möchtest du anreisen?</h3>

				<InputCheckbox
					id="takesCar"
					bind:checked={form.takes_car}
					label="Ich komme mit Auto und könnte Gepäck mitnehmen"
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
						label="Ich nehme an der organisieren Bahnfahrt teil."
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

				<h3 class="text-primary text-lg">Organisatorisches</h3>

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

				<button
					disabled={loading}
					class="bg-primary relative flex items-center justify-center rounded-md px-12 py-2 text-white md:w-fit"
				>
					{#if loading}
						<img class="absolute left-2 h-8" src={loadingSpinner} alt="loading" />
					{/if}
					Anmelden</button
				>
			</form>
		{/if}
	</div>
</main>
