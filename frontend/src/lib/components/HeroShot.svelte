<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { headerImageHeight } from '$lib/stores';

	interface Props {
		imgSrc: string;
		bgPosition?: string;
		height?: string;
		children?: import('svelte').Snippet;
	}

	let {
		imgSrc,
		bgPosition = 'bg-center',
		height = 'h-dvh',
		children
	}: Props = $props();

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
		headerImageHeight.set(0);
		if (resizeObserver) {
			resizeObserver.disconnect();
		}
	});
</script>

<!-- -mb-[72px] needed to accommodate the navbar  -->
<section id="header_section" class="{height} -mb-[72px]">
	<div
		id="header_image"
		class=" absolute top-0 {height} w-full bg-cover {bgPosition}"
		style="background-image: url({imgSrc});"
	></div>
	{@render children?.()}
</section>
