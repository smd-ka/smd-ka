<script lang="ts">
	// args
	export let tab: NavTab;
	// bindables (becomes explicit in Svelte 5)
	export let showMenu: boolean;

	// types
	import type { NavTab } from './types';

	// UI elements
	import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';

	// backend
	import { currentUser, userHasRole } from '$lib/pocketbase';
</script>

<div>
	<h3 class="text-white">
		<!-- manual check because of on:click -->
		{#if tab.defaultUrl ?? false}
			<a href={tab.defaultUrl} on:click={() => (showMenu = false)}>
				{tab.name}
			</a>
		{:else}
			{tab.name}
		{/if}
	</h3>
	<button on:click={() => (showMenu = false)} class="flex flex-col text-left text-xl">
		{#each tab.routes as route}
			{@const showMobile = route.showMobile ?? true}
			{@const isAuthorized = userHasRole($currentUser, tab.permission)}
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

<style>
	h3 {
		@apply font-normal;
	}
</style>
