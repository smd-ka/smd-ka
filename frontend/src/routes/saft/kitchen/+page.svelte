<script lang="ts">
	let { data } = $props();
</script>

<main class="container mx-auto my-12 px-4">
	<div class="md:text-lg">
		<h1>Angaben für die SAFT-Küche</h1>
		<div>Vielen lieben Dank liebes Küchen Team für eure Arbeit! Ihr seid die Besten!</div>
		<div class="mt-2 rounded-md bg-gray-200 p-4">
			Es haben sich: <br />
			<bold class="text-primary font-bold">{data.totalCount} Personen</bold> (inkl. Referenten und
			SAFT Orga) angemeldet. <br />
			<bold class="text-primary font-bold">{data.vegetarianCount} Vegetarier</bold> angemeldet.
			<br />
			<bold class="text-primary font-bold">{data.cakeCount} Kuchen oder Ähnliches</bold> angemeldet.
		</div>
	</div>

	{#if data.error}
		<div>Es ist ein Fehler aufgetreten bitte versuche es erneut oder wende dich an Claus.</div>
	{/if}

	<section class=" grid grid-cols-4 gap-1 pt-4">
		<bold class="font-bold">Name</bold>
		<bold class="font-bold">Allergie</bold>
		<b>Vegetarier</b>
		<bold class="font-bold">Bringt Kuchen mit</bold>

		{#each data.list as record}
			<div class="col-span-4 h-0.5 bg-gray-300"></div>

			<div>
				{record.name}
			</div>
			<div>
				{record.allergies}
			</div>
			<div>
				{record.is_vegetarian ? 'Ja' : ''}
			</div>
			<div>
				{record.brings_cake ? 'Ja' : ''}
			</div>
		{/each}
	</section>
</main>
