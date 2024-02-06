<script lang="ts">
	import HeroShot from '$lib/components/HeroShot.svelte';
	import header from '$lib/assets/heroshots/fesd_heroshot.jpg';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	let loading = true;
	let error = false;
	let success = false;

	onMount(async () => {
		try {
			const record = await pb
				.collection('fesd')
				.getFirstListItem(`user="${pb.authStore.model?.id}"`);
			success = true;
		} finally {
			loading = false;
		}
	});

	async function signup() {
		loading = true;
		try {
			const record = await pb.collection('fesd').create({ user: pb.authStore?.model?.id });
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
		Wir wollen feiern! Zum Ende des Semesters aus Dankbarkeit. Und dazu geht es am Dienstag, den 20.04.24,
		in die Laurenziusgemeinde (Schäferstraße 13, 76139 Karlsruhe) in Hagsfeld. Start ist um 18:30 Uhr,
		das Essen wird um 19 Uhr starten. Wir wollen uns in einer stimmungsvollen Atmosphäre bei euch allen
		bedanken für alles, was ihr in der SMD im letzten Semester in Bewegung gebracht habt. Und natürlich
		danken wir auch dem, der das alles möglich macht. Hierzu wird es an dem Abend ein gutes Essen geben.
		Zieht euch sehr gerne auch etwas gehobener an ;) Zwischen den Gängen gibt es ein buntes Programm
		und jeder von euch darf sich gerne hierzu bei unserem Mastersheed für einen Programmpunkt eintragen.
		<br />
		<a
			class="underline"
			href="https://docs.google.com/spreadsheets/d/1elIUUx3LKdrvCmuGbXDzUgSeF2iMWq7bZRdVswGHLYM/edit?usp=sharing#gid=1692427051"
		>
			Hier
		</a>
		gehts zum Sheet.

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

		{#if success}
			<div class="my-2 rounded-md bg-green-700 p-4 text-white">
				Deine Anmeldung war erfolgreich. Wir freuen uns auf dich!
			</div>
		{:else}
			<div class="grid gap-2">
				{#if error}
					<div class="my-2 rounded-md bg-red-700 p-4 text-white">
						Beim Erstellen deiner Anmledung kam es zu einem Fehler.
					</div>
				{/if}

				<button
					on:click={signup}
					disabled={loading}
					class="bg-primary flex w-fit items-center gap-4 rounded-md p-2 px-4 text-white"
				>
					{#if loading}
						<img class="h-6" src={loadingSpinner} alt="loading" />
					{/if}
					Anmelden</button
				>
			</div>
		{/if}
	</div>
</main>
