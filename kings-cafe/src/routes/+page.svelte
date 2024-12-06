<script lang="ts">
	import Saos from 'saos';
	import header from '$lib/assets/pages/home/background_kings_cafe.jpg';
	import {
		faArrowDown,
		faArrowUpRightFromSquare,
		faChevronLeft,
		faChevronRight,
		faMap
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import type { PageData } from './$types';
	import trailer from '$lib/assets/pages/home/trailer_compressed.mp4';
	import logo from '$lib/assets/logos/kings-cafe_white.svg';
	import logo_black from '$lib/assets/logos/kings-cafe.svg';
	import evening from '$lib/assets/pages/home/evening.jpg';
	import { faTelegram } from '@fortawesome/free-brands-svg-icons';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Carousel from 'svelte-carousel';

	export let data: PageData;

	let mobileScreen = true;
	let carousel;

	onMount(() => {
		if (browser) {
			updateScreenWidth();
			window.addEventListener('resize', updateScreenWidth);
		}
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

	const getFullDate = (startDateString: string, endDateString?: string) => {
		const startDate = new Date(startDateString);
		if (!endDateString) {
			return (
				startDate.toLocaleDateString('de-DE', {
					day: '2-digit',
					month: 'long'
				}) +
				' // ' +
				startDate.toLocaleTimeString('de-DE', {
					hour: '2-digit',
					minute: '2-digit'
				})
			);
		}
		const endDate = new Date(endDateString);
		return (
			startDate.toLocaleDateString('de-DE', {
				day: '2-digit',
				month: 'long'
			}) +
			' - ' +
			endDate.toLocaleDateString('de-DE', {
				day: '2-digit',
				month: 'long'
			})
		);
	};
</script>

<HeroShot imgSrc={header} bgPosition={'bg-[center_left_60%]'}>
	<div class="text-grey absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
		<img src={logo} alt="Kings Cafe Logo" class="" />
	</div>
</HeroShot>

<main class="container mx-auto flex flex-col gap-24 px-4 py-12 text-lg">
	<Saos
		animation={'slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
		animation_out={'slide-out-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
	>
		<div class="flex flex-col items-center">
			<h1 class="font-caveat text-center">Jeden Sonntag 19:00</h1>
			<div class="flex gap-4 max-md:flex-col">
				<a
					class="bg-primary fa px-4 py-2 text-2xl text-white no-underline hover:underline"
					href="https://t.me/+Oj9DUv42zaE4NmNi"
				>
					<Fa icon={faChevronRight} />
					Join our Telegram
					<Fa icon={faTelegram} />
				</a>

				<a
					class="fa bg-black px-4 py-2 text-lg text-white no-underline hover:underline md:text-2xl"
					href="https://maps.app.goo.gl/enSfgfvXdX6LBd7F6"
				>
					<Fa icon={faChevronRight} />
					Location: Amalienstraße 77
					<Fa icon={faMap} />
				</a>
			</div>
		</div>
	</Saos>

	<section class="pad">
		<h3 class="pb-4 text-center text-5xl">Das King's Café</h3>
		<div class="grid gap-4 py-4 md:grid-cols-2">
			<div>
				<h3>Ein Angebot für internationale Studenten</h3>
				<p>
					Das King's Café ist ein Treffpunkt für deutsche und internationale Studenten immer
					sonntags ab <b>19 Uhr</b> in der <b>Amalienstraße 77</b>. Hier kannst du mit Deutschen in
					Kontakt kommen und dein Deutsch verbessern, egal, wie gut dein Deutsch ist – wir können
					auch Englisch.
				</p>
			</div>
			<img
				src={evening}
				class="max-h-72 w-full object-cover max-md:order-first"
				alt="Kings Cafe vor Ort"
			/>
		</div>
		<p>
			In kurzen Vorträgen kannst du etwas über verschiedene Themen wie, deutsche Geschichte, Kultur
			und Tradition, Lifeskills für das Alltagsleben und den christlichen Glauben erfahren. Wir
			bieten Gemeinschaft bei kostenlosen Snacks und Getränken in gemütlicher Atmosphäre an. Auch
			organisieren wir Aktivitäten wie Wanderungen im Schwarzwald und Spieleabende Wir lernen gerne
			andere Kulturen kennenlernen und freuen uns auf dich!
			<br />
			<b>Bonus:</b> Davor, immer Sonntags ab 18 Uhr gibt es einen „Deutschkurs mit der Bibel“ für alle,
			die intensiver etwas Deutsch und den christlichen Glauben lernen wollen. Du bist herzlich willkommen
			– egal, wie gut dein Deutsch ist.
		</p>
		<div class="flex justify-center py-8">
			<a
				href="#trailer"
				class="bg-primary flex items-center gap-2 px-4 py-2 text-white no-underline hover:underline"
			>
				Sneak Peak (Trailer)
				<Fa icon={faArrowDown} />
			</a>
		</div>
	</section>

	<section>
		<h1 class="text-center">Die nächsten Termine</h1>

		{#if browser && data.events}
			<Carousel infinite={false} particlesToShow={mobileScreen ? 1 : 3} bind:this={carousel}>
				<div slot="prev" class="text-grey grid items-center p-2 text-3xl lg:text-5xl">
					<button on:click={carousel.goToPrev}> <Fa icon={faChevronLeft} /></button>
				</div>

				{#each data.events.items as event}
					<div class="p-4">
						<div class="h-full border border-gray-400 shadow-md">
							<div class="bg-grey rounded-t-md p-4 py-12">
								<h3 class="text-primary text-center">{event.title}</h3>
								<div class="py-2 text-base font-bold text-white">
									{getFullDate(event.start_date_time, event.end_date_time)}
								</div>
								<div class="text-white lg:text-3xl">
									<div class="flex gap-1 text-base font-bold">
										Ort:
										{#if event.location_url}
											<a class="fa" href={event.location_url} target="_blank" rel="noopener">
												{event.location}
												<Fa icon={faArrowUpRightFromSquare} />
											</a>
										{:else}
											{event.location}
										{/if}
									</div>
								</div>
							</div>

							<div class="p-4">
								<p>
									{event.description}
								</p>
							</div>
						</div>
					</div>
				{/each}

				<div slot="next" class="text-grey grid items-center p-2 text-3xl lg:text-5xl">
					<button on:click={carousel.goToNext}> <Fa icon={faChevronRight} /></button>
				</div>
			</Carousel>
		{/if}
	</section>

	<section>
		<p></p>
	</section>

	<section id="trailer">
		<h1 class="pb-0 text-center">Sneak Peak</h1>
		<Saos
			animation={'slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
			animation_out={'slide-out-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
		>
			<div class="flex justify-center">
				<video class="py-16" poster={logo_black} controls>
					<source src={trailer} type="video/mp4" />
					<track kind="captions" />
					Your browser does not support the video tag.
				</video>
			</div>
		</Saos>
	</section>

	<section class="pad">
		<h2 class="">Über uns</h2>
		<p>
			Das KingsCafe wird seit 2018 von der Hochschulgruppe SMD-Karlsruhe organisiert. Wir sind ein
			Team aus deutschen Studenten, die es auf dem Herzen haben internationale Studenten in
			Karlsruhe zu unterstützen und ihnen die deutsche Kultur und Sprache näher zu bringen.
			<br />
			Du hast Fragen oder möchtest uns unterstützen? Dann kannst du dich gerne an info@kings-cafe.de
			wenden – wir melden uns!
		</p>
	</section>
</main>

<style>
	@keyframes -global-slide-in {
		0% {
			transform: translateY(200vh);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes -global-slide-in-bottom {
		0% {
			transform: translateY(30vh);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes -global-slide-out-bottom {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
