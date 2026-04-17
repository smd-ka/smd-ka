<script lang="ts">
	// args
	export let tab: NavTab;
	// bindables (becomes explicit in Svelte 5)
	export let showMenu: boolean;

	import { inferNavTab, type NavTab } from './types';
	import NavRouteItem from './NavRouteItem.svelte';

	// backend
	import { currentUser } from '$lib/pocketbase';

	let fTab;
	$: fTab = inferNavTab($currentUser, tab);
</script>

{#if fTab !== null}
	<div>
		<h3 class="text-white">
			<!-- manual check because of on:click -->
			{#if fTab.defaultUrl ?? false}
				<a href={fTab.defaultUrl} on:click={() => (showMenu = false)}>
					{fTab.name}
				</a>
			{:else}
				{fTab.name}
			{/if}
		</h3>
		<button on:click={() => (showMenu = false)} class="flex flex-col text-left text-xl">
			{#each fTab.routes.filter((r) => r.showMobile) as route}
				<NavRouteItem {route} class="fa ml-4" forMobile={true} />
			{/each}
		</button>
	</div>
{/if}

<style>
	h3 {
		@apply font-normal;
	}
</style>
