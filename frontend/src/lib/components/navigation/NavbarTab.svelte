<script lang="ts">
	// args
	export let tab: NavTab;

	import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { page } from '$app/stores';

	import type { NavTab } from './types';

	// backend
	import { currentUser, userHasRole } from '$lib/pocketbase';
</script>

<a href={tab.defaultUrl ?? null}>
	<span
		class="CategoryTitle peer py-5 {$page.url.pathname.includes(tab.baseUrl) ? 'text-primary' : ''}"
	>
		{tab.name}
		<Fa class="text-lg" icon={faChevronDown}></Fa>
	</span>
	<div class="CategoryLinkList">
		{#each tab.routes as route}
			{#if userHasRole($currentUser, route.permission)}
				<a class="fa" href={route.url}>
					{route.name}
				</a>
			{/if}
		{/each}
	</div>
</a>

<style>
	a {
		@apply no-underline;
	}

	.CategoryLinkList {
		@apply bg-primary absolute top-[4.25rem] hidden justify-center  hover:grid peer-hover:grid;
	}
	.CategoryLinkList > a {
		@apply px-4 py-2 hover:bg-gray-100 hover:text-black;
	}

	.CategoryTitle {
		@apply hover:text-primary flex cursor-default items-center gap-2;
	}
	[href] > .CategoryTitle {
		@apply cursor-pointer;
	}
</style>
