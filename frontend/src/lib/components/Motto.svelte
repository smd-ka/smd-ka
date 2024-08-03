<script lang="ts">
	import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { sineInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let imgSrc: string;
	export let title: string;

	let showDescription = false;

	function toggleDescription() {
		showDescription = !showDescription;
	}
</script>

<div class="h-full md:flex-1">
	<button on:click={toggleDescription} class="relative h-full w-full">
		<img
			src={imgSrc}
			alt="erleben"
			class=" h-full w-full border-4 {showDescription
				? 'border-primary '
				: 'border-black '} object-cover brightness-90 hover:cursor-pointer hover:brightness-105 max-md:h-44"
		/>
		<div class="absolute top-1/2 flex w-full -translate-y-1/2 flex-col text-center">
			<h2 class="pb-0 text-white">{title}</h2>
			<Fa
				icon={faChevronDown}
				class="text-4xl  {showDescription
					? 'text-primary rotate-180'
					: 'rotate-0 text-white'} transition-all duration-300"
			/>
		</div>
	</button>

	{#if showDescription}
		<div
			transition:slide={{ duration: 200, easing: sineInOut }}
			class="relative col-span-full mt-5 flex justify-center bg-gray-200 p-4"
		>
			<div class="absolute -top-3 h-6 w-6 rotate-45 bg-gray-200"></div>
			<slot />
		</div>
	{/if}
</div>
