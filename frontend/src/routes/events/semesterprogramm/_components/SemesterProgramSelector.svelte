<script lang="ts">
	import background from '$lib/assets/pages/events/semesterprogramm/bg.png';
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import { allPrograms } from '../data';

	const PREFIX = '/events/semesterprogramm/';

	let carousel: any;

	$: mobileScreen = browser ? window.innerWidth < 768 : true;
	$: currentPath = $page.url.pathname;
	$: programs = allPrograms.filter((p) => `${PREFIX}${p.slug}` !== currentPath);
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
				{#each programs as { title, subtitle, image, slug }}
					<a class="flex justify-center px-2" href={`${PREFIX}${slug}`}>
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
