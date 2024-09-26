<script>
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import SAFT from '$lib/assets/pages/about/angebote/SAFT.jpg';
	import Hoersaalvortrag from '$lib/assets/pages/about/angebote/Hoersaalvortrag.jpg';
	import Gebetsfruehstueck from '$lib/assets/pages/about/angebote/Gebetsfruehstueck.jpg';
	import SMDAbend from '$lib/assets/pages/about/angebote/SMDAbend.jpg';
	import Fa from 'svelte-fa';
	import { faChevronLeft, faChevronRight, faArrowDown } from '@fortawesome/free-solid-svg-icons';

	const slides = [
		{
			title: 'SMD Abend',
			subtitle: 'Jeden zweiten Dienstag in großer Runde.',
			image: SMDAbend
		},
		{
			title: 'Hörsaalvortrag',
			subtitle: 'Glaube und Wissenschaft. Ein Widerspruch?',
			image: Hoersaalvortrag
		},
		{
			title: 'Gebetsfrühstück',
			subtitle: 'Gemeinsam mit Gott in den Tag starten.',
			image: Gebetsfruehstueck
		},
		{
			title: 'SAFT',
			subtitle: 'Semesteranfangsfreizeit: Gemeinsam ins neue Semester starten.',
			image: SAFT
		}
	];
	let carousel;

	function prev() {
		carousel.goToPrev();
	}

	function next() {
		carousel.goToNext();
	}
</script>

<!-- autoplay autoplayDuration={3500} -->
{#if browser}
	<Carousel class="relative " bind:this={carousel}>
		<div
			slot="prev"
			class="absolute z-10 ml-4 flex h-full items-center text-3xl text-white lg:text-5xl"
		>
			<button on:click={prev}> <Fa icon={faChevronLeft} /></button>
		</div>
		{#each slides as slide}
			<div class="relative h-[50svh] xl:h-[75svh]">
				<img
					src={slide.image}
					class="h-full w-full object-cover object-center brightness-90"
					alt="Angebote"
				/>
				<div class="pad absolute top-1/3 grid w-full -translate-y-1/3 justify-center">
					<div class="w-fit text-center text-white backdrop-filter">
						<h1 class="pb-0">{slide.title}</h1>
						<p class="font-caveat text-xl md:text-3xl">{slide.subtitle}</p>
						<a class="flex items-center justify-center gap-2" href="hoersaalvortrag">
							Mehr erfahren <Fa icon={faArrowDown} />
						</a>
					</div>
				</div>
			</div>
		{/each}
		<div
			slot="next"
			class="absolute right-0 z-10 mr-4 flex h-full items-center text-3xl text-white lg:text-5xl"
		>
			<button on:click={next}> <Fa icon={faChevronRight} /></button>
		</div>
	</Carousel>
{/if}

<section>
	<div class="flex justify-center p-8">
		<a
			href="/events/kalender"
			class="bg-primary flex items-center gap-2 rounded-sm px-4 py-2 text-white no-underline"
		>
			<Fa icon={faChevronRight} />
			alle aktuellen Termine
		</a>
	</div>
</section>
