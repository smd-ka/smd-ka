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
		let result =
			startDate.toLocaleDateString('de-DE', {
				day: '2-digit',
				month: 'long'
			}) +
			' // ' +
			startDate.toLocaleTimeString('de-DE', {
				hour: '2-digit',
				minute: '2-digit'
			});
		if (!endDateString) return result;

		const endDate = new Date(endDateString);
		if (startDate.toDateString() === endDate.toDateString()) {
			return (
				result + ' - ' + endDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
			);
		} else
			return (
				result +
				' - ' +
				endDate.toLocaleDateString('de-DE', {
					day: '2-digit',
					month: 'long'
				}) +
				' // ' +
				endDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
			);
	};
</script>

<HeroShot imgSrc={header} bgPosition={'bg-[center_left_60%]'}>
	<div class="text-grey absolute top-1/2 flex w-full -translate-y-1/2 justify-center text-center">
		<img src={logo} alt="Kings Cafe Logo" class="" />
	</div>
</HeroShot>

<main class="container mx-auto flex flex-col gap-24 px-4 py-12 text-lg">
	<Saos
		animation={'slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
		animation_out={'slide-out-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
	>
		<div class="flex flex-col items-center">
			<h1 class="font-caveat text-center">Every Sunday 7 PM</h1>
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
		<h3 class="pb-4 text-center text-5xl">The King's Café</h3>
		<div class="grid gap-4 py-4 md:grid-cols-2">
			<div>
				<h3>For you. For international students.</h3>
				<p>
					The King's Café is a meeting place for German and international students every Sunday from <b
						>7 PM</b
					>
					at <b>Amalienstraße 77</b>. Here you can get in touch with Germans and improve your
					German, no matter how good your German is – we can also speak English.
				</p>
			</div>
			<img
				src={evening}
				class="max-h-72 w-full object-cover max-md:order-first"
				alt="Kings Cafe vor Ort"
			/>
		</div>
		<p>
			In short presentations, you can learn about various topics such as German history, culture and
			traditions, life skills for everyday life, and the Christian faith. We offer fellowship with
			free snacks and drinks in a cozy atmosphere. We also organize activities such as hikes in the
			Black Forest and game nights. We love to learn about other cultures and look forward to
			meeting you!
			<br />
			<b>Bonus:</b> Beforehand, every Sunday from 6 PM, there is a "German course with the Bible" for
			anyone who wants to learn more intensively about German and the Christian faith. You are warmly
			welcome – no matter how good your German is.
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
		<h1 class="text-center">Upcoming Events</h1>

		{#if browser && data.events}
			<Carousel infinite={false} particlesToShow={mobileScreen ? 1 : 3} bind:this={carousel}>
				<div slot="prev" class="text-grey grid items-center p-2 text-3xl lg:text-5xl">
					<button on:click={carousel.goToPrev}> <Fa icon={faChevronLeft} /></button>
				</div>

				{#each data.events.items as event}
					<div class="md:p-4">
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

							<div class="whitespace-pre-line p-4">
								<p>
									{@html event.description}
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
		<h2 class="">About Us</h2>
		<p>
			The KingsCafe has been organized by the university group SMD-Karlsruhe since 2018. We are a
			team of German students who have a heart for supporting international students in Karlsruhe
			and introducing them to German culture and language.
			<br />
			Do you have questions or would you like to support us? Then feel free to contact us at
			<a href="mailto:info@kings-cafe.de">info@kings-cafe.de</a> – we will get back to you!
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
