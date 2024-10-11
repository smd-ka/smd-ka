<script lang="ts">
	import Carousel from 'svelte-carousel';
	// Needed b/c of this issue: https://github.com/vadimkorr/svelte-carousel/issues/141
	// There is an open pull request https://github.com/vadimkorr/svelte-carousel/pull/142
	// that fixes this issue, but it is not merged yet.
	import { browser } from '$app/environment';

	import Fa from 'svelte-fa';
	import {
		faChevronLeft,
		faChevronRight,
		faArrowDown,
		faArrowUpRightFromSquare,
		faArrowUp
	} from '@fortawesome/free-solid-svg-icons';
	import { sineInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import type { PageData } from '../$types';

	let carouselKarlsruhe;
	let carouselGermany;
	let showCarouselId = 0;

	const toggleShowCarousel = (id: number) => {
		console.log(id);
		if (showCarouselId === id) {
			showCarouselId = 0;
			return;
		}
		showCarouselId = id;
	};

	function prev(carousel) {
		showCarouselId = 0;
		carousel.goToPrev();
	}

	function next(carousel) {
		showCarouselId = 0;
		carousel.goToNext();
	}

	export let data: PageData;
</script>

<!-- autoplay autoplayDuration={3500} -->
{#if browser}
	<Carousel bind:this={carouselKarlsruhe}>
		<div
			slot="prev"
			class="absolute z-10 ml-4 flex h-[50svh] items-center text-3xl text-white lg:text-5xl xl:h-[76svh]"
		>
			<button on:click={() => prev(carouselKarlsruhe)}> <Fa icon={faChevronLeft} /></button>
		</div>
		{#each data.slidesKarlsruhe as carouselSlide}
			<div>
				<div class="relative h-[50svh] xl:h-[76svh]">
					<img
						src={carouselSlide.image}
						class="h-full w-full object-cover object-center brightness-90"
						alt="Angebote"
					/>
					<div class="pad absolute top-1/3 grid w-full justify-center">
						<div class=" grid justify-items-center text-center text-white backdrop-filter">
							<h1 class="pb-0">{carouselSlide.title}</h1>
							<p class="font-caveat text-xl md:text-3xl">{carouselSlide.subtitle}</p>
							<button
								on:click={() => toggleShowCarousel(carouselSlide.id)}
								class="flex items-center gap-2 self-center"
							>
								{#if showCarouselId === carouselSlide.id}
									<div>Beschreibung ausblenden</div>
									<Fa icon={faArrowUp} />
								{:else}
									<div>Mehr erfahren</div>
									<Fa icon={faArrowDown} />
								{/if}
							</button>
						</div>
						<div>
							{#if showCarouselId === carouselSlide.id}
								<div
									id={'slide' + carouselSlide.id}
									transition:fade={{ duration: 200, easing: sineInOut }}
									class="rounded-md bg-black bg-opacity-80 p-4 text-white backdrop-filter max-md:hidden xl:mx-60"
								>
									<p>{carouselSlide.description}</p>
								</div>
							{/if}
						</div>
					</div>
				</div>
				{#if showCarouselId === carouselSlide.id}
					<div
						id={'slide' + carouselSlide.id}
						transition:fade={{ duration: 200, easing: sineInOut }}
						class="pad bg-grey p-4 text-white md:hidden"
					>
						<p>
							{carouselSlide.description}
						</p>
					</div>
				{/if}
			</div>
		{/each}
		<div
			slot="next"
			class="absolute right-0 z-10 mr-4 flex h-[50svh] items-center text-3xl text-white lg:text-5xl xl:h-[76svh]"
		>
			<button on:click={() => next(carouselKarlsruhe)}> <Fa icon={faChevronRight} /></button>
		</div>
	</Carousel>
{/if}

<main class="container mx-auto grid gap-8 px-4">
	<section>
		<div class="grid justify-center justify-items-center p-8">
			<h3 class="text-center max-md:text-2xl">
				Neugierig? Was aktuell läuft siehst du im
				<a href="/events/kalender" class="text-primary"> Kalender. </a>
			</h3>
		</div>
	</section>

	<section>
		<h3 class="text-primary pb-2">Es gibt vieles zu entdecken ...</h3>
		<p>
			... und wie findet man da jetzt <b>Anschluss?</b> Am besten einfach beim nächsten Treffen in Person
			vorbeischauen. Besonders empfehlen wir dir unsere SMD-Abende, die (unterm Semester) alle zwei Wochen
			stattfinden. Hier ist es am einfachsten, SMDler kennenzulernen und sich in die Gemeinschaft einzufinden.
			Selbstverständlich können wir auch alle anderen Veranstaltungen nur wärmstens empfehlen. Wir freuen
			uns auf dich!
		</p>
		<div class="mx-auto grid max-w-fit gap-4 py-4 text-2xl md:grid-cols-2 md:gap-16">
			<a
				class="bg-primary flex items-center gap-2 px-4 py-2 text-white no-underline hover:underline"
				href="/about/kontakt"
			>
				<Fa icon={faChevronRight} />
				Bleib in Kontakt</a
			>
			<a
				class="border-grey text-grey flex items-center gap-2 border-2 px-4 py-2 no-underline hover:underline"
				href="/about/mitarbeiten"
			>
				<Fa icon={faChevronRight} />

				Bring deine Ideen ein.</a
			>
		</div>
	</section>
</main>

<section class="py-24">
	<h1 class="text-center">Überregionales</h1>

	<!-- Carousel for screens smaller than md -->
	{#if browser}
		<div class="md:hidden">
			<Carousel bind:this={carouselGermany}>
				<div slot="prev" class="text-grey grid items-center p-4 text-3xl lg:text-5xl">
					<button on:click={() => prev(carouselGermany)}> <Fa icon={faChevronLeft} /></button>
				</div>
				{#each data.slidesGermany as slide}
					<div class="bg-background-gray">
						<img
							src={slide.image}
							class="h-48 w-full object-cover object-center"
							alt="Sommerfreizeiten"
						/>
						<a
							href="https://www.smd.org/hochschul-smd/veranstaltungen/sommerfreizeiten"
							class="text-primary px-2 py-1 no-underline hover:underline"
							target="_blank"
						>
							<h3 class="mx-4 flex flex-wrap items-center gap-2">
								{slide.title}
								<Fa class="text-xl" icon={faArrowUpRightFromSquare} />
							</h3>
						</a>
						<p class="px-4 py-2">
							{slide.text}
						</p>
					</div>
				{/each}
				<div slot="next" class="text-grey grid items-center p-4 text-3xl lg:text-5xl">
					<button on:click={() => next(carouselGermany)}> <Fa icon={faChevronRight} /></button>
				</div>
			</Carousel>
		</div>
	{/if}

	<!-- for screens lager than md -->
	<div class="container mx-auto grid grid-cols-3 gap-4 max-md:hidden">
		{#each data.slidesGermany as slide}
			<div class="bg-background-gray">
				<img
					src={slide.image}
					class="h-48 w-full object-cover object-center"
					alt="Sommerfreizeiten"
				/>
				<a
					href="https://www.smd.org/hochschul-smd/veranstaltungen/sommerfreizeiten"
					class="text-primary px-2 py-1 no-underline hover:underline"
					target="_blank"
				>
					<h3 class="mx-4 flex flex-wrap items-center gap-2">
						{slide.title}
						<Fa class="text-xl" icon={faArrowUpRightFromSquare} />
					</h3>
				</a>
				<p class="px-4 py-2">
					{slide.text}
				</p>
			</div>
		{/each}
	</div>
</section>
