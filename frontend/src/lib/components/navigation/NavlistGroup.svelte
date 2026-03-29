<script lang="ts">
	// args
	export let tab: NavTab;
	// bindables (becomes explicit in Svelte 5)
	export let showMenu: boolean;

	import type { NavTab } from './types';
</script>

<div>
	<h3 class="text-white">
		{tab.name}
	</h3>
	<button on:click={() => (showMenu = false)} class="flex flex-col text-left text-xl">
		{#each tab.routes as route}
			<a class="ml-4" href={route.url}>{route.name}</a>
		{/each}
	</button>
</div>

<style>
	h3 {
		@apply font-normal;
	}
</style>
