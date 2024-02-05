<script lang="ts">
	import type { FESDRegistration } from '$lib/models';
	import { pb } from '$lib/pocketbase';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

	let loading = true;
	let error = false;
	let result: FESDRegistration[] = [];

	onMount(async () => {
		try {
			result = await pb.collection('fesd_registrations').getFullList({
				sort: 'name'
			});
		} catch (e: any) {
			console.error(e);
			error = true;
		}
		loading = false;
	});

	function exportToCsv() {
		const rows = [
			['Name', 'Vegetarier', 'Allergien'],
			...result.map((x) => [x.name, x.vegetarian ? 'Ja' : '', x.allergies])
		];

		let csvContent = 'data:text/csv;charset=utf-8,' + rows.map((x) => x.join(',')).join('\n');

		const encodedUri = encodeURI(csvContent);
		const link = document.createElement('a');
		link.setAttribute('href', encodedUri);
		link.setAttribute('download', `FESD_Anmledungen_WS23-24.csv`);
		document.body.appendChild(link); // Required for FF

		link.click();
	}
</script>

<main class="container mx-auto">
	<div class="card mt-8 flex flex-col gap-4">
		<div>
			<h1 class="text-primary text-2xl md:text-4xl">FESD Anmeldungen</h1>
		</div>
		{#if loading}
			<div class="flex justify-center">
				<img src={loadingSpinner} class="h-32" alt="loading" />
			</div>
		{:else if error}
			<p>Es ist ein Fehler aufgetreten.</p>
		{:else}
			<div class=" rounded-md bg-gray-200 p-4">
				<div>
					Anmeldungen gesamt:
					<bold class="font-bold">{result.length}</bold>
				</div>
			</div>
			<button
				class="bg-lime flex w-fit gap-2 rounded-md px-4 py-2"
				on:click|preventDefault={exportToCsv}
			>
				<Fa icon={faArrowUpFromBracket} />
				Als CSV exportieren
			</button>

			<div class="flex flex-col overflow-auto">
				<div class="grid grid-cols-[repeat(11,1fr)] gap-x-4 whitespace-nowrap">
					<bold class="font-bold">Name</bold>
					<bold class="font-bold">Vegetarier</bold>
					<bold class="font-bold">Allergien</bold>

					{#each result as registration, i}
						<div class="col-span-11 h-0.5 bg-gray-300"></div>

						<div>{registration.name}</div>
						<div>{registration.vegetarian ? 'Ja' : ''}</div>
						<div>{registration.allergies}</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</main>
