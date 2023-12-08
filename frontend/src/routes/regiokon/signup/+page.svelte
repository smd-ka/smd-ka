<script lang="ts">
	import HeroShot from '$lib/components/HeroShot.svelte';
	import header from '$lib/assets/heroshots/regiokon_heroshot.png';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import { RegiokonGroup, type RegiokonRegistration } from '$lib/models';
	import EmailInput from '$lib/components/forms/EmailInput.svelte';
	import TelephoneInputField from '$lib/components/forms/TelephoneInputField.svelte';
	import CheckboxInput from '$lib/components/forms/CheckboxInput.svelte';
	import TextArea from '$lib/components/forms/TextArea.svelte';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import { pb } from '$lib/pocketbase';

	const options = Object.keys(RegiokonGroup).filter((key) => isNaN(Number(key)));
	let loading = false;
	let error = false;
	let record: RegiokonRegistration;

	async function signup() {
		loading = true;
		const form = document.getElementById('form') as HTMLFormElement;
		let formData = new FormData(form);
		formData.set('needs_lodging', formData.get('needs_lodging') === 'on' ? 'true' : 'false');
		formData.set('vegetarian', formData.get('vegetarian') === 'on' ? 'true' : 'false');
		try {
			record = await pb.collection('regiokon').create(formData);
		} catch (e) {
			error = true;
			console.error(e);
		}
		loading = false;
	}
</script>

<HeroShot imgSrc={header} bgPosition="bg-bottom" title="Regiokon" />

<main class="card container mx-auto mt-10 flex flex-col gap-4">
	<h1 class="md:text-4xl">Regiokon 2024 Anmeldung</h1>
	<div>
		Wir freuen uns, dich auf der Regiokon vom 12. bis 14. Januar begrüßen zu dürfen! Genauere
		Informationen folgen in einer Einladungsmail vor der Regiokon. Bitte meldet euch spätestens bis
		zum 7. Januar an.
	</div>

	{#if record}
		<div class="rounded-md bg-green-200 p-4">
			<h1 class="text-xl">Anmeldung erfolgreich!</h1>
			<div>
				Deine Anmeldung wurde erfolgreich übermittelt. Du erhälst in Kürze eine Bestätigungsmail.
			</div>
		</div>
	{:else}
		{#if error}
			<div class="rounded-md bg-red-700 p-4 text-white">
				Beim Erstellen deiner Anmledung kam es zu einem Fehler. Bitte überprüfe insbesondere deine
				E-Mail-Adresse nochmals und versuche es erneut.
			</div>
		{/if}

		<form id="form" class="grid gap-2" on:submit|preventDefault={signup}>
			<TextInput label="Name" required name="name" />
			<EmailInput label="E-Mail" required name="email" />
			<TelephoneInputField label="Telefonnummer" name="phonenumber" required />

			<select value="" id="gender" name="gender" class="rounded-md p-4" required>
				<option value="" disabled>Bitte wähle ein Geschlecht aus</option>
				<option value="female">weiblich</option>
				<option value="male">männlich</option>
			</select>

			<select value="" id="group" name="group" class="rounded-md p-4" required>
				<option value="" disabled>Bitte wähle deine Gruppe aus</option>
				{#each options as option}
					<option value={option}>Ich komme aus der SMD {option}</option>
				{/each}
			</select>
			<CheckboxInput
				label="Ich benötige einen Schlafplatz"
				name="needs_lodging"
				id="needs-lodging"
			/>
			<CheckboxInput label="Ich bin Vegetarier" name="vegetarian" id="vegetarian" />
			<TextInput label="Allergien" name="allergies" />
			<TextArea label="Sonstige Anmerkungen" name="comments" />

			<button
				disabled={loading}
				class="bg-primary flex w-fit items-center gap-4 place-self-end rounded-md p-4 px-8 text-white"
			>
				{#if loading}
					<img class="h-6" src={loadingSpinner} alt="loading" />
				{/if}
				Anmelden</button
			>
		</form>
	{/if}
</main>
