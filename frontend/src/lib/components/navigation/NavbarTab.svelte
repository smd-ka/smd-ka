<script lang="ts">
	// args
	export let tab: NavTab;

	import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';

	import { inferNavTab, type NavTab } from './types';
	import NavRouteItem from './NavRouteItem.svelte';

	// backend
	import { currentUser } from '$lib/pocketbase';
	import Fa from 'svelte-fa';

	let fTab;
	$: fTab = inferNavTab($currentUser, tab);
</script>

{#if fTab !== null}
	<a href={fTab.defaultUrl ?? null}>
		<span
			class="CategoryTitle peer py-5 {$page.url.pathname.includes(fTab.baseUrl)
				? 'text-primary'
				: ''}"
		>
			{fTab.name}
			<Fa class="text-lg" icon={faChevronDown}></Fa>
		</span>
		<div class="CategoryLinkList">
			{#each fTab.routes.filter((r) => r.showDesktop) as route}
				<NavRouteItem {route} class="fa" />
			{/each}
		</div>
	</a>
{/if}

<style>
	a {
		@apply no-underline;
	}

	.CategoryLinkList {
		@apply absolute top-[4.25rem] hidden justify-center bg-primary  hover:grid peer-hover:grid;
	}

	.CategoryTitle {
		@apply flex cursor-default items-center gap-2 hover:text-primary;
	}
	[href] > .CategoryTitle {
		@apply cursor-pointer;
	}
</style>
