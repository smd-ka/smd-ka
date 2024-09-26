<script>
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import SAFT from '$lib/assets/pages/about/angebote/SAFT.jpg';
	import Hoersaalvortrag from '$lib/assets/pages/about/angebote/Hoersaalvortrag.jpg';
	import Gebetsfruehstueck from '$lib/assets/pages/about/angebote/Gebetsfruehstueck.jpg';
	import SMDAbend from '$lib/assets/pages/about/angebote/SMDAbend.jpg';
	import Fa from 'svelte-fa';
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

	const images = [SAFT, Hoersaalvortrag, Gebetsfruehstueck, SMDAbend];
	let carousel;

	function prev() {
		carousel.goToPrev();
	}

	function next() {
		carousel.goToNext();
	}
</script>

{#if browser}
	<Carousel class="relative " bind:this={carousel}>
		<div slot="prev" class="absolute z-10 ml-4 flex h-full items-center text-3xl text-white">
			<button on:click={prev}> <Fa icon={faChevronLeft} /></button>
		</div>
		{#each images as image}
			<div class="relative h-[50svh] xl:h-[75svh]">
				<img src={image} class="h-full w-full object-cover object-center" alt="Angebote" />
				<div
					class="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 text-center text-white"
				>
					<h1 class="">Hörsaalvortrag</h1>
					<p class="">
						Einmal im Semester veranstalten wir, oft zusammen mit dem SfC (Studierende für
						Christus), einen Hörsaalvortrag, der - wie soll es auch anders sein - in einem Hörsaal
						direkt am Campus stattfindet. Für die spannenden Vortragsthemen laden wir kompetente
						Referenten ein, die für jedwede Fragen Rede und Antwort stehen.
					</p>
				</div>
			</div>
		{/each}
		<div
			slot="next"
			class="absolute right-0 z-10 mr-4 flex h-full items-center text-3xl text-white"
		>
			<button on:click={next}> <Fa icon={faChevronRight} /></button>
		</div>
	</Carousel>
{/if}
