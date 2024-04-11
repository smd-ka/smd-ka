<script lang="ts">
	import header_mobile from '$lib/assets/heroshots/herzenssache_heroshot_mobile.png';
	import header from '$lib/assets/heroshots/herzenssache_heroshot.png';
	import { onMount } from 'svelte';
	import background from '$lib/assets/ss24/background_ss24.png';
	import heart from '$lib/assets/ss24/herzenssache.png';

	let program = [
		{
			date: new Date('2024-4-16'),
			title: '🫀📲 ❤️ - Wie Social Media uns beeinflusst',
			lecturer: 'Rufina Kaehler, Regionalreferentin SMD'
		},
		{
			date: new Date('2024-4-30'),
			title: 'HERZensthema Christenverfolgung¹',
			lecturer: 'Samuel Kaiser, OpenDoors',
			location: ' Veranstaltungsort: EFG Karlsruhe, Ohiostraße 17 '
		},
		{
			date: new Date('2024-5-14'),
			title: 'Geländespiel mit HERZhaftem Picknick',
			location: 'findet im Schlosspark statt'
		},
		{
			date: new Date('2024-5-28'),
			title: 'Mein HERZ? - Sein Geschenk',
			lecturer: 'Rebekka, Lehrerin im Tschad'
		},
		{
			date: new Date('2024-6-11'),
			title:
				'Zwischen GletscHERZerstörung und Konfliktherden - Hoffnung finden auf einer gefährdeten Welt',
			lecturer: 'Prof. Dr. Peter Imming, Chemiker',
			location: 'KIT Campus Süd'
		},
		{
			date: new Date('2024-6-25'),
			title: 'Follow your HEART - Mach einfach was dich glücklich macht? ',
			lecturer: 'Andreas Rennig , Pfarrer'
		},
		{
			date: new Date('2024-7-9'),
			title: 'Große Fragen persönlich erlebt - ein Philosoph teilt sein HERZ',
			lecturer: 'Heinzpeter Hempelmann, Philosoph/Theologe'
		},
		{
			date: new Date('2024-7-23'),
			title: 'Selbstfürsorge - HERZgesund leben in einer rastlosen Welt',
			lecturer: 'Susanne Stieler, Psychologin'
		}
	];

	onMount(() => {
		program = program.filter((event) => event.date > new Date());
	});
</script>

<img src={header_mobile} alt="Herzenssache" class="w-full md:hidden" />
<img src={header} alt="Herzenssache" class="w-full max-md:hidden" />
<div class="relative bg-cover" style="background-image: url({background});">
	<main class="container mx-auto flex flex-col gap-24 py-24 text-lg">
		<div class="container flex flex-col gap-6 px-4 xl:px-80">
			<div class="grid grid-cols-[1fr_3.2rem]">
				<div>
					<h1 class="font-anton text-primary text-5xl font-bold uppercase tracking-wide">
						Semester
						<span class=" bordered-text text-white">Termine</span>
					</h1>
					<div class="text-xl md:text-2xl">
						Dienstags +++ gemeinsames Essen: 18:30 Uhr <br /> Programmbeginn: 19:30 Uhr +++ Reinhold-Frank-Straße
						44A
					</div>
				</div>
				<div class="flex justify-end">
					<h2 class="font-anton text-primary text-5xl font-bold uppercase tracking-wide">
						<div class=" bordered-text text-white">
							SO<br />
							SE<br />
						</div>
						24
					</h2>
				</div>
			</div>

			{#each program as event}
				<div class="font-merriweather grid grid-cols-[6rem_1fr]">
					<h3 class="text-3xl font-bold">
						{event.date.toLocaleDateString('de-DE', {
							month: 'numeric',
							day: 'numeric'
						})}
					</h3>
					<div>
						<h3 class="text-xl font-bold md:text-3xl">{event.title}</h3>
						{#if event.lecturer}
							<p class="text-sm italic">{event.lecturer}</p>
						{/if}
						{#if event.location}
							<p class="text-primary">{event.location}</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</main>
	<div class="flex justify-center">
		<img src={heart} alt="Herzenssache" class="bottom-4 left-4 w-60 xl:absolute" />
	</div>
</div>

<div class="mt-20">Wöchentliche Aktionen</div>

<style>
	.bordered-text {
		-webkit-text-stroke: 2px #e84c05; /* width and color */
	}
</style>
