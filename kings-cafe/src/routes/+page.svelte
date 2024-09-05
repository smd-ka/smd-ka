<script lang="ts">
	import Saos from 'saos';
	import header from '$lib/assets/pages/home/background_kings_cafe.jpg';
	import { faArrowDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import type { PageData } from './$types';
	import trailer from '$lib/assets/pages/home/trailer_compressed.mp4';
	import logo from '$lib/assets/logos/kings-cafe_white.svg';
	import logo_black from '$lib/assets/logos/kings-cafe.svg';
	import { faTelegram } from '@fortawesome/free-brands-svg-icons';
	import * as Carousel from '$lib/components/ui/carousel/index.js';

	export let data: PageData;

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
	<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-grey">
		<img src={logo} alt="Kings Cafe Logo" class="" />
	</div>
</HeroShot>

<main class="container mx-auto flex flex-col gap-24 px-4 py-12 text-lg">
	<Saos
		animation={'slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
		animation_out={'slide-out-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
	>
		<div class="flex flex-col items-center">
			<h1 class="pb-3 text-center">Jeden Sonntag 19:00</h1>
			<a
				class="flex w-fit items-center gap-2 bg-primary px-4 py-2 text-2xl text-white no-underline hover:underline"
				href="https:lel.com"
			>
				<Fa icon={faChevronRight} />
				Join our Telegram
				<Fa icon={faTelegram} />
			</a>
		</div>
	</Saos>

	<section class="pad">
		<h3 class="pb-4 text-center text-5xl">Das King's Café</h3>
		<div class="grid gap-4 md:grid-cols-2">
			<div>
				<h3>Ein Angebot für internationale Studenten</h3>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
				ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
				dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
				sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
				invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
			</div>
			<img
				src="https://placehold.co/600x400"
				class="max-h-72 w-full object-cover max-md:order-first"
				alt="Erleben"
			/>
		</div>
		<div class="flex justify-center py-8">
			<a
				href="#trailer"
				class="flex items-center gap-2 bg-primary px-4 py-2 text-white no-underline hover:underline"
			>
				Sneak Peak (Trailer)
				<Fa icon={faArrowDown} />
			</a>
		</div>
	</section>
	{#if data.events}
		<section class="px-10 md:mx-10">
			<h1 class="text-center">Die nächsten Termine</h1>
			<Carousel.Root>
				<Carousel.Content>
					{#each data.events.items as event}
						<Carousel.Item class="md:basis-1/2 xl:basis-1/3 ">
							<div class="shadow-md">
								<div class="rounded-t-md bg-grey p-4 py-12">
									<h3 class="text-center text-primary">{event.title}</h3>
									<div class="py-2 text-base font-bold text-white">
										{getFullDate(event.start_date_time, event.end_date_time)}
									</div>
									<div class="text-white lg:text-3xl">
										<div class="text-base font-bold">
											Ort:
											{#if event.maps_url}
												<a href={event.maps_url} target="_blank" rel="noopener">
													{event.location}
												</a>
											{:else if event.location_url}
												<a href={event.location_url} target="_blank" rel="noopener">
													{event.location}
												</a>
											{:else}
												{event.location}
											{/if}
										</div>
									</div>
								</div>

								<div class="rounded-b-md border-b border-l border-r border-gray-400 p-4">
									<p>
										{event.description}
									</p>
								</div>
							</div></Carousel.Item
						>
					{/each}
				</Carousel.Content>
				<Carousel.Previous />
				<Carousel.Next />
			</Carousel.Root>
		</section>
	{/if}

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

	<section class="pad grid gap-4 md:grid-cols-2">
		<div>
			<h2 class="">Über uns</h2>
			<p>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
				invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
				et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
				Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
				diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua.
			</p>
		</div>
		<img
			class="max-h-72 w-full object-cover"
			alt="Gruppenfoto"
			src="https://placehold.co/600x400"
		/>
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
