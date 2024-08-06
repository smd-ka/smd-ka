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

<!-- -mb-[72px] needed to accommodate the navbar  -->
<section id="header_section" class="{height} -mb-[72px]">
	<div
		id="header_image"
		class=" absolute top-0 {height} w-full bg-red-300 bg-cover {bgPosition}"
		style="background-image: url({imgSrc});"
	></div>
	<slot />
</section>
