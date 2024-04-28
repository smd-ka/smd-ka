<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';

	interface saftKitchen {
		id: string;
		allergies: string;
		name: string;
		is_vegetarian: boolean;
		brings_cake: boolean;
	}

	let loading = true;
	let error = false;
	let records: saftKitchen[] = [];
	let count: number = 0;
	let vegies: number = 0;
	let cakes: number = 0;

	onMount(async () => {
		try {
			const result = await pb.collection('saft_kitchen').getFullList({
				sort: '-allergies'
			});
			count = result.length;
			vegies = result.filter((record) => record.is_vegetarian).length;
			records = result.filter(
				(record) => record.allergies || record.brings_cake
			) as unknown as saftKitchen[];
			cakes = records.filter((record) => record.brings_cake).length;
		} catch (e: any) {
			console.error(e);
			error = true;
		}

		loading = false;
	});
</script>

<main class="container mx-auto">
	<div class="card mt-8 flex flex-col gap-8">
		<div class="md:text-lg">
			<h2 class="text-primary text-lg md:text-4xl">Angaben für die SAFT Küche</h2>
			<div>Vielen lieben Dank liebes Küchen Team für eure Arbeit! Ihr seid die Besten!</div>
			{#if !loading && !error}
				<div>
					Es haben sich: <br />
					<bold class="text-primary font-bold">{count} Personen</bold> (inkl. Referenten und SAFT
					Orga) angemeldet. <br />
					<bold class="text-primary font-bold">{vegies} Vegetarier</bold> angemeldet. <br />
					<bold class="text-primary font-bold">{cakes} Kuchen oder Ähnliches</bold> angemeldet.
				</div>
			{/if}
			<div>
				Unten findet ihr die Allergien mit Vornamen :) Bei Fragen zum Datenbestand einfach melden :)
				LG Claus
			</div>
		</div>

		{#if error}
			<div>Es ist ein Fehler aufgetreten bitte versuche es erneut oder wende dich an Claus.</div>
		{/if}

		<section class=" grid grid-cols-3 gap-2">
			<bold class="font-bold">Name</bold>
			<bold class="font-bold">Allergie</bold>
			<bold class="font-bold">Bringt Kuchen mit</bold>
			{#if loading && !error}
				<div class="col-span-3 justify-self-center">
					<img class="h-32 w-32" src={loadingSpinner} alt="loading" />
				</div>
			{/if}
			{#each records as record}
				<div class="col-span-3 h-0.5 bg-gray-300"></div>

				<div>
					{record.name}
				</div>
				<div>
					{record.allergies}
				</div>
				<div>
					{record.brings_cake ? 'Ja' : ''}
				</div>
			{/each}
		</section>
	</div>
</main>
