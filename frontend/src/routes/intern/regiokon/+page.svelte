<script lang="ts">
	import TextArea from '$lib/components/forms/TextArea.svelte';
	import loadingSpinnerWhite from '$lib/assets/loading_spinner_white.gif';
	import { onMount } from 'svelte';
	import { pb } from '$lib/pocketbase';
	import type { RegiokonRegistration } from '$lib/models';
	import NumerInput from '$lib/components/forms/NumberInput.svelte';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';

	let initialLoad = true;
	let loading = false;
	let error = false;
	let record: Partial<RegiokonRegistration>;
	let justSignedUp = false;

	onMount(async () => {
		try {
			record = await pb
				.collection('regiokon')
				.getFirstListItem(`user="${pb.authStore.model?.id}"`, {});
		} catch (e) {}
		initialLoad = false;
	});

	async function signup() {
		loading = true;
		const form = document.getElementById('form') as HTMLFormElement;
		let formData = new FormData(form);
		formData.set('user', pb.authStore.model?.id ? pb.authStore.model?.id : '');
		formData.set('group', 'Karlsruhe');
		formData.set('email', pb.authStore.model?.email ? pb.authStore.model?.email : '');
		try {
			record = await pb.collection('regiokon').create(formData);
			justSignedUp = true;
		} catch (e) {
			error = true;
			console.error(e);
		}
		loading = false;
	}
</script>

<main class="card container mx-auto mt-8 grid gap-4">
	<div class="grid md:grid-cols-2">
		<h1 class="text-2xl md:text-4xl">Regiokon 2024 Anmeldung</h1>

		<h2 class="text-secondary-text place-self-end text-lg md:text-2xl">Intern für die SMD-KA</h2>
	</div>

	<div class="grid gap-2 rounded-md bg-red-700 bg-opacity-80 p-4 text-white">
		<p class="text-lg font-bold">
			Bevor du dich zur Regiokon anmeldest, bitte dein Profil aktualisieren! Deine Essenspräferenzen
			werden für die Anmeldung benötigt! (Vegetarisch, Allergien, etc.)
		</p>
		<a class="w-fit rounded-md bg-white px-4 py-2 text-black" href="/intern/profile"
			>Jetzt Daten aktualisieren</a
		>
	</div>

	{#if record && !initialLoad}
		{#if justSignedUp}
			<div class="rounded-md bg-green-200 p-4">
				<h1 class="text-xl">Anmeldung erfolgreich!</h1>
				<div>
					Deine Anmeldung wurde erfolgreich übermittelt. Du erhälst in Kürze eine Bestätigungsmail.
				</div>
			</div>
		{/if}

		<div>
			<h2 class=" text-lg md:text-2xl">Du bist zur Regiokon 2024 angemeldet</h2>
			Wir haben folgende Daten von dir gespeichert:<br />
			Simmt etwas nicht? Dann aktualisiere bitte dein Profil!
			<ul class="">
				<li>
					<strong>Name:</strong>
					{pb.authStore.model?.name}
				</li>
				<li>
					<strong>E-Mail:</strong>
					{pb.authStore.model?.email}
				</li>
				<li>
					<strong>Telefonnummer:</strong>
					{pb.authStore.model?.phonenumber}
				</li>
				<li>
					<strong>Geschlecht:</strong>
					{pb.authStore.model?.gender === 'male' ? 'Männlich' : 'Weiblich'}
				</li>
				<li>
					<strong>Du isst vegetarisch:</strong>
					{pb.authStore.model?.vegetarian ? 'Ja' : 'Nein'}
				</li>
				<li>
					<strong>Allergien:</strong>
					{pb.authStore.model?.allergies}
				</li>
				<li>
					<strong>Du hast folgende Schlafplätze:</strong>
					Frauen: {record.lodging_female}, Männer: {record.lodging_male}, Beide: {record.lodging_both}
				</li>
				<li>
					<strong>Sonstige Anmerkungen:</strong>
					{record.comments}
				</li>
			</ul>
		</div>
	{:else if !initialLoad}
		{#if error}
			<div class="rounded-md bg-red-700 p-4 text-white">
				Beim Erstellen deiner Anmledung kam es zu einem Fehler. Bitte versuche es erneut.
			</div>
		{/if}

		<div>
			<h2 class=" text-lg md:text-2xl">Anmeldeformular</h2>
			<p class="text-secondary-text text-sm">
				Die restlichen benötigten Daten, wie Name, Email, Telefonnummer, Allergien und ob du
				vegetarisch isst werden deinem Profil entnommen! Bitte aktualisiere dies, falls noch nicht
				geschehen.
			</p>
		</div>

		<form id="form" class="grid gap-2" on:submit|preventDefault={signup}>
			<p>
				So viele SMDler kann ich bei mir unterbringen (bitte nur 1x pro WG, da sonst unsere Zahlen
				nicht stimmen):
			</p>

			<div class="grid gap-2 md:grid-cols-3">
				<NumerInput id="lodging-female" label="Anzahl Frauen" required name="lodging_female" />
				<NumerInput id="lodging-male" label="Anzahl Männer" required name="lodging_male" />
				<NumerInput id="lodging-both" label="Anzahl Beide" required name="lodging_both" />
			</div>

			<TextArea label="Sonstige Anmerkungen" name="comments" />

			<button
				disabled={loading}
				class="bg-primary flex w-fit items-center gap-4 place-self-end rounded-md p-4 px-8 text-white"
			>
				{#if loading}
					<img class="h-6" src={loadingSpinnerWhite} alt="loading" />
				{/if}
				Anmelden</button
			>
		</form>
	{:else}
		<div class="flex justify-center">
			<img class="w-32" src={loadingSpinner} alt="loading" />
		</div>
	{/if}
</main>
