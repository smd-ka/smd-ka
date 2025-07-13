<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const usersWithAllergies = data.records;
</script>

<main class="container mx-auto px-4 py-8">
	<h2 class="">Allergie-Liste</h2>

	{#if usersWithAllergies.length === 0}
		<div class="rounded-lg border border-gray-300 bg-gray-100 p-4">
			<p class="text-gray-600">Keine Nutzer mit Allergien gefunden.</p>
		</div>
	{:else}
		<div class="mb-4">
			<p class="text-gray-600">
				{usersWithAllergies.length} Nutzer mit Allergien gefunden (Alumni ausgeschlossen).
			</p>
		</div>

		<div class="grid grid-cols-2 divide-y-2 divide-y-reverse">
			{#each usersWithAllergies as user (user.id)}
				<p class="">
					{user.name}
					{user.surname}
				</p>
				<p>
					{user.allergies}
				</p>
			{/each}
		</div>
	{/if}
</main>
