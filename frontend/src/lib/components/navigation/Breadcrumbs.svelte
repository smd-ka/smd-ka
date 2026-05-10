<script lang="ts">
	import Fa from 'svelte-fa';
	import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

	export let crumbs: Array<[string, string]> = [];
</script>

<nav class="container mx-auto flex justify-between px-4 py-4">
	<ol class="inline-flex list-none">
		{#each crumbs as [name, url], i}
			<li class="flex items-center">
				<a class="!no-underline" href={url}>{name}</a>
				{#if i < crumbs.length - 1}
					<Fa icon={faChevronRight} class="mx-2" />
				{/if}
			</li>
		{/each}
	</ol>
	<slot />
</nav>
