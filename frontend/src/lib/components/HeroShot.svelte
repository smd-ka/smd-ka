<script lang="ts">
	import { onMount } from 'svelte';
	import { headerImageHeight } from '$lib/stores';

	export let imgSrc: string;
	export let bgPosition: string = 'bg-center';
	export let height: string = 'h-[100svh]';

	let resizeObserver: ResizeObserver;

	// Retrieve and update the height of the header image for the navbar background (transparent/grey)
	onMount(() => {
		resizeObserver = new ResizeObserver((entries) =>
			headerImageHeight.set(entries[0].target.clientHeight)
		);
		const header = document.getElementById('header_component');
		if (header) {
			resizeObserver.observe(header);
		}
	});
</script>

<section class="{height}  block" id="header_component">
	<div
		class="absolute top-0 {height} w-full bg-red-300 bg-cover {bgPosition}"
		style="background-image: url({imgSrc});"
	></div>
	<slot />
</section>
