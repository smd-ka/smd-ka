<script lang="ts">
	import HeroShot from '$lib/components/HeroShot.svelte';
	import header from '$lib/assets/heroshots/regiokon_heroshot.png';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import { RegiokonGroup } from '$lib/models';
	import EmailInput from '$lib/components/forms/EmailInput.svelte';
	import TelephoneInputField from '$lib/components/forms/TelephoneInputField.svelte';
	import CheckboxInput from '$lib/components/forms/CheckboxInput.svelte';
	import TextArea from '$lib/components/forms/TextArea.svelte';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';
	import { pb } from '$lib/pocketbase';

	const options = Object.keys(RegiokonGroup).filter((key) => isNaN(Number(key)));
	let loading = false;

	async function signup() {
		loading = true;
		const form = document.getElementById('form') as HTMLFormElement;
		let formData = new FormData(form);
		formData.set('needs_lodging', formData.get('needs_lodging') === 'on' ? 'true' : 'false');
		formData.set('vegetarian', formData.get('vegetarian') === 'on' ? 'true' : 'false');
		console.log(formData);
		try {
			const response = await pb.collection('regiokon').create(formData);
			console.log(response);
		} catch (e) {
			console.error(e);
		}
		loading = false;
	}
</script>

<HeroShot imgSrc={header} bgPosition="bottom" title="Regiokon" />

<main class="card container mx-auto mt-10 flex flex-col gap-4">
	<h1 class="md:text-4xl">Regiokon 2024 Anmeldung</h1>
	<div>
		Wir freuen uns, dich auf der Regiokon vom 12. bis 14. Januar begrüßen zu dürfen! Genauere
		Informationen folgen in einer Einladungsmail vor der Regiokon. Bitte meldet euch spätestens bis
		zum 7. Januar an.
	</div>

	<form id="form" class="grid gap-2" on:submit|preventDefault={signup}>
		<TextInput label="Name" required name="name" />
		<EmailInput label="E-Mail" required name="email" />
		<TelephoneInputField label="Telefonnummer" name="phonenumber" required />

		<select id="group" name="group" class="rounded-md p-4" required>
			<option disabled>Bitte wähle deine Gruppe aus</option>
			{#each options as option}
				<option value={option}>Ich komme aus der SMD {option}</option>
			{/each}
		</select>
		<CheckboxInput label="Ich benötige einen Schlafplatz" name="needs_lodging" id="needs-lodging" />
		<CheckboxInput label="Ich bin Vegetarier" name="vegetarian" id="vegetarian" />
		<TextInput label="Allergien" name="allergies" />
		<TextArea label="Sonstige Anmerkungen" name="comments" />

		<button class="bg-primary w-fit place-self-end rounded-md p-4 text-white">
			{#if loading}
				<img class="absolute left-2 h-8" src={loadingSpinner} alt="loading" />
			{/if}
			Anmelden</button
		>
	</form>
</main>
