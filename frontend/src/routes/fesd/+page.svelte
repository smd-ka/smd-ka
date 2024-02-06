<script lang="ts">
	import HeroShot from '$lib/components/HeroShot.svelte';
	import header from '$lib/assets/heroshots/fesd_heroshot.jpg';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import CheckboxInput from '$lib/components/forms/CheckboxInput.svelte';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	let loading = false;
	let error = false;
	let success = false;

	onMount(() => {
		if (pb.authStore.isValid) {
			console.log('redirecting');
			goto('/intern/fesd');
		}
	});

	async function signup() {
		loading = true;
		const form = document.getElementById('form') as HTMLFormElement;
		let formData = new FormData(form);
		formData.set('vegetarian', formData.get('vegetarian') === 'on' ? 'true' : 'false');
		try {
			const record = await pb.collection('fesd').create(formData);
			success = true;
		} catch (e) {
			error = true;
			console.error(e);
		}
		loading = false;
	}
</script>

<HeroShot imgSrc={header} title="FESD"></HeroShot>

<main class="container mx-auto flex flex-col gap-4">
	<div class="card mt-10">
		<h1 class="text-primary text-2xl lg:text-4xl">FESD WS23/24 Anmeldung</h1>
		Wir wollen feiern! Zum Ende des Semesters aus Dankbarkeit. Start ist um 18:30 Uhr, das Essen wird
		um 19 Uhr starten. Wir wollen uns in einer stimmungsvollen Atmosphäre bei euch allen bedanken für
		alles, was ihr in der SMD im letzten Semester in Bewegung gebracht habt. Und natürlich danken wir
		auch dem, der das alles möglich macht. Hierzu wird es an dem Abend ein gutes Essen geben. Zieht euch
		sehr gerne auch etwas gehobener an ;) Zwischen den Gängen gibt es ein buntes Programm.

		<div class="mt-2 text-lg">
			<div class="text-primary">Facts</div>
			<div>Wann? Am Dienstag, den 20.02.24 um 18:30 Uhr</div>
			<div>
				Wo? In der Laurenziusgemeinde
				<a class="underline" href="https://maps.app.goo.gl/YnzFavtQyqm9Qupt7">
					Schäferstraße 13, 76139 Karlsruhe
				</a>
			</div>
		</div>
	</div>

	<div class="card">
		<p>
			Alle die über Zugang zum internen Berech verfügen können sich gerne
			<a href="/intern/fesd" class="underline"> darüber anmelden.</a>
		</p>

		{#if success}
			<div class="my-2 rounded-md bg-green-700 p-4 text-white">
				Deine Anmeldung war erfolgreich. Wir freuen uns auf dich!
			</div>
		{:else}
			<form id="form" class="mt-4 grid gap-4" on:submit|preventDefault={signup}>
				{#if error}
					<div class="my-2 rounded-md bg-red-700 p-4 text-white">
						Beim Erstellen deiner Anmledung kam es zu einem Fehler.
					</div>
				{/if}

				<TextInput label="Name" required name="name" />
				<TextInput label="Allergien" name="allergies" />
				<CheckboxInput label="Ich bin Vegetarier" name="vegetarian" id="vegetarian" />
				<button
					disabled={loading}
					class="bg-primary flex w-fit items-center gap-4 place-self-end rounded-md p-2 px-4 text-white"
				>
					{#if loading}
						<img class="h-6" src={loadingSpinner} alt="loading" />
					{/if}
					Anmelden</button
				>
			</form>
		{/if}
	</div>
</main>
