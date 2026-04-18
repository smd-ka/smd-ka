<script lang="ts">
	import background from '$lib/assets/pages/events/semesterprogramm/bg.png';
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import Fa from 'svelte-fa';
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import { onDestroy, onMount } from 'svelte';
	import { allPrograms } from '../data';

	let carousel;

	let mobileScreen = true;
	let programs: { title: string; subtitle: string; image: string; link: string }[] = [];

	onMount(() => {
		if (browser) {
			updateScreenWidth();
			window.addEventListener('resize', updateScreenWidth);
		}
		programs = allPrograms.filter((p) => p.link !== window.location.pathname);
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('resize', updateScreenWidth);
		}
	});

	function updateScreenWidth() {
		const md = 768;
		if (window.innerWidth >= md) {
			return (mobileScreen = false);
		}
		mobileScreen = true;
	}
</script>

<div style="background-image: url({background});">
	<section class="container mx-auto px-4 py-24">
		<h2 class="text-primary text-center">Weitere Semester</h2>

		{#if browser}
			<Carousel
				particlesToShow={mobileScreen ? 1 : 3}
				swiping={true}
				dots={true}
				arrows={true}
				bind:this={carousel}
			>
				<div slot="prev" class="text-grey grid items-center p-4 text-3xl lg:text-5xl">
					<button on:click={carousel.goToPrev}> <Fa icon={faChevronLeft} /></button>
				</div>
				{#each programs as { title, subtitle, image, link }}
					<a class="flex justify-center px-2" href={link}>
						<div class="max-w-96 rounded-md bg-white text-center shadow-md">
							<img alt="SOSE24" class="rounded-t-md object-cover" src={image} />
							<h3 class="text-center">{title}</h3>
							<h4>{subtitle}</h4>
						</div>
					</a>
				{/each}
				<div slot="next" class="text-grey grid items-center p-4 text-3xl lg:text-5xl">
					<button on:click={carousel.goToNext}> <Fa icon={faChevronRight} /></button>
				</div>
			</Carousel>
		{/if}
	</section>
</div>
