<script lang="ts">
	import type { PageData } from '../$types';

	export let data: PageData;

	let shownEvent = data.events[0];
</script>

<main class="container mx-auto px-4 py-12">
	<div class="grid grid-cols-[32rem_1fr] gap-2 rounded-lg border p-4">
		<section class="grid divide-y">
			{#each data.events as event}
				<div class="overflow-hidden text-ellipsis whitespace-nowrap">
					<b class={shownEvent.id === event.id ? 'underline' : ''}>{event.title}</b>
				</div>
				<div></div>
			{/each}
		</section>
		<div class="w-full bg-slate-200">Other section</div>
	</div>
</main>
