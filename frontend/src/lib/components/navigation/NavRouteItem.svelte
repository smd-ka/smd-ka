<script lang="ts">
	import type { FullNavTabRoute } from './types';
	import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let route: FullNavTabRoute;
	let itemClass = '';
	export { itemClass as class };
	export let forMobile = false;
</script>

{#if route.action}
	<button
		class="{forMobile ? 'mobile' : 'desktop'} {itemClass}"
		on:click={route.action ? () => route.action?.() : undefined}
	>
		<slot>
			{route.name}
			{#if route.extern}
				<Fa class="text-lg" icon={faArrowUpRightFromSquare}></Fa>
			{/if}
		</slot>
	</button>
{:else if route.url}
	<a class="{forMobile ? 'mobile' : 'desktop'} {itemClass}" href={route.url}>
		<slot>
			{route.name}
			{#if route.extern}
				<Fa class="text-lg" icon={faArrowUpRightFromSquare}></Fa>
			{/if}
		</slot>
	</a>
{/if}

<style>
	.desktop {
		@apply px-4 py-2 hover:bg-gray-100 hover:text-black;
	}
	.mobile {
		/* nothing to apply yet */
	}
</style>
