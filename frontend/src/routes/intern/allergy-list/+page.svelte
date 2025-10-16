<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const usersWithAllergies = data.records;
</script>

<main class="container mx-auto px-4 py-8">
	<h2 class="">Allergie-Liste</h2>

	<p>
		Es gibt <b> {data.vegetarians} vegetarische</b>, registrierte und aktive SMDler.
		<span class="text-gray-600"> (Ehemalige SMDler sind nicht in dieser Liste enthalten.) </span>
	</p>

	{#if usersWithAllergies.length === 0}
		<div class="rounded-lg border border-gray-300 bg-gray-100 p-4">
			<p class="text-gray-600">Keine SMDler mit Allergien gefunden.</p>
		</div>
	{:else}
		<div class="mb-4">
			<p class="text-gray-600">
				Es gibt {usersWithAllergies.length} registrierte SMDler mit Allergien und/oder Unverträglichkeiten.
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
