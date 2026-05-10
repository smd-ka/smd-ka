<script lang="ts">
	// args
	export let tab: NavTab;

	import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { page } from '$app/stores';

	import { inferNavTab, type FullNavTab, type NavTab } from './types';
	import NavRouteItem from './NavRouteItem.svelte';

	// backend
	import { currentUser } from '$lib/pocketbase';

	let fTab;
	$: fTab = inferNavTab($currentUser, tab);

	let highlighted = false;
	$: highlighted = isActiveRoute(fTab, $page.url.pathname);

	// Intern area can have same routes as main page
	function isActiveRoute(fTab: FullNavTab | null, routeUrl: string | undefined): boolean {
		if (!fTab || !routeUrl) return false;
		const currentUrlcontainsCurrentTab = !!fTab.routes.find((r) => r.url === routeUrl);
		if (fTab.name !== 'Intern') return currentUrlcontainsCurrentTab;
		return currentUrlcontainsCurrentTab || routeUrl.startsWith('/intern/');
	}
</script>

{#if fTab !== null}
	<a href={fTab.defaultUrl ?? null}>
		<span class="CategoryTitle peer py-5 {highlighted ? 'text-primary' : ''}">
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
