<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { headerImageHeight } from '$lib/stores';

	export let imgSrc: string;
	export let bgPosition: string = 'bg-center';
	export let height: string = 'h-dvh';

	let resizeObserver: ResizeObserver;

	// Retrieve and update the height of the header image for the navbar background (transparent/grey)
	onMount(() => {
		resizeObserver = new ResizeObserver((entries) =>
			headerImageHeight.set(entries[0].target.clientHeight)
		);
		const header = document.getElementById('header_image');
		if (header) {
			resizeObserver.observe(header);
		}
	});

	onDestroy(() => {
		if (resizeObserver) {
			resizeObserver.disconnect();
		}
	});
</script>

<!-- For now there is a slight problem with this solution: 
 the section is technically too big by the size of the navbar.
 This adds a spacing of 72px between the navbar and the content.
 Should be fixed in the future. -->
<section id="header_section" class={height}>
	<div
		id="header_image"
		class=" absolute top-0 {height} w-full bg-red-300 bg-cover {bgPosition}"
		style="background-image: url({imgSrc});"
	></div>
	<slot />
</section>
