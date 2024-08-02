<script lang="ts">
	import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { elasticInOut, sineInOut } from 'svelte/easing';
	import { fly, slide } from 'svelte/transition';

	export let imgSrc: string;
	export let title: string;

	let showDescription = false;

	function toggleDescription() {
		showDescription = !showDescription;
	}
</script>

<button on:click={toggleDescription} class="relative">
	<img
		src={imgSrc}
		alt="erleben"
		class="h-full w-full border-4 {showDescription
			? 'border-primary '
			: 'border-black '} object-cover brightness-90 hover:cursor-pointer hover:brightness-105 max-md:h-44"
	/>
	<div class="absolute top-1/2 flex w-full -translate-y-1/2 flex-col text-center">
		<h2 class="pb-0 text-white">{title}</h2>
		<Fa icon={faChevronDown} class="text-primary justify-self-center text-2xl" />
	</div>
</button>
{#if showDescription}
	<div
		transition:slide={{ duration: 200, easing: sineInOut }}
		class="col-span-full bg-gray-200 p-4 lg:mx-20 xl:mx-60"
	>
		<slot />
	</div>
{/if}
