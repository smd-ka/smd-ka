<script lang="ts">
	// args
	export let tab: NavTab;
	// bindables (becomes explicit in Svelte 5)
	export let showMenu: boolean;

	import { inferNavTab, type NavTab } from './types';

	// UI elements
	import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';

	// backend
	import { currentUser, userHasRole } from '$lib/pocketbase';

	let fTab = inferNavTab(tab);
</script>

{#if userHasRole($currentUser, fTab.permission)}
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
			{#each fTab.routes as route}
				{@const showMobile = route.showMobile ?? true}
				{@const isAuthorized = userHasRole($currentUser, fTab.permission)}
				{#if showMobile && isAuthorized}
					<a class="fa ml-4" href={route.url}>
						{route.name}
						{#if route.extern}
							<Fa class="text-lg" icon={faArrowUpRightFromSquare}></Fa>
						{/if}
					</a>
				{/if}
			{/each}
		</button>
	</div>
{/if}

<style>
	h3 {
		@apply font-normal;
	}
</style>
