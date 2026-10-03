<script lang="ts">
	import type { PageData } from './$types';
	import CalendarListItem from './_components/CalendarListItem.svelte';

	export let data: PageData;
</script>

<main class="container mx-auto">
	<div class="pad py-24">
		<h1 class="text-center">Kalender</h1>

		<div class="grid grid-cols-[fit-content(6rem)_1fr] gap-2 gap-y-8">
			{#each data.events as event}
				<CalendarListItem {event} />
			{/each}
		</div>
	</div>
</main>
