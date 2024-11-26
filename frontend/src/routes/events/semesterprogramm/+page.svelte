<script lang="ts">
	import header_mobile from '$lib/assets/heroshots/herzenssache_heroshot_mobile.png';
	import header from '$lib/assets/pages/events/semesterprogramm/outsidethebox_21_9.jpg';
	import { onMount } from 'svelte';
	import heart from '$lib/assets/pages/events/semesterprogramm/ss24/herzenssache.png';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import type { PageData } from './$types';
	import SemesterProgramSelector from './SemesterProgramSelector.svelte';

	let yesterday: Date;

	export let data: PageData;

	let program = [
		{
			date: new Date('2024/4/16'),
			title: '🫀📲 ❤️ - Wie Social Media uns beeinflusst',
			lecturer: 'Rufina Kaehler, Regionalreferentin SMD',
			location: 'Reinhold-Frank-Str. 44A'
		},
		{
			date: new Date('2024/4/30'),
			title: 'HERZensthema Christenverfolgung',
			lecturer: 'Samuel Kaiser, OpenDoors',
			location: ' Veranstaltungsort: EFG Karlsruhe, Ohiostraße 17 '
		},
		{
			date: new Date('2024/5/14'),
			title: 'Geländespiel mit HERZhaftem Picknick',
			location: 'findet im Schlosspark statt'
		},
		{
			date: new Date('2024/5/28'),
			title: 'Mein HERZ? - Sein Geschenk',
			lecturer: 'Rebekka, Lehrerin im Tschad'
		},
		{
			date: new Date('2024/6/11'),
			title:
				'Zwischen GletscHERZerstörung und Konfliktherden - Hoffnung finden auf einer gefährdeten Welt',
			lecturer: 'Prof. Dr. Peter Imming, Chemiker',
			location: 'KIT Campus Süd'
		},
		{
			date: new Date('2024/6/25'),
			title: 'Follow your HEART - Mach einfach was dich glücklich macht? ',
			lecturer: 'Andreas Rennig , Pfarrer'
		},
		{
			date: new Date('2024/7/9'),
			title: 'Große Fragen persönlich erlebt - ein Philosoph teilt sein HERZ',
			lecturer: 'Heinzpeter Hempelmann, Philosoph/Theologe'
		},
		{
			date: new Date('2024/7/23'),
			title: 'Selbstfürsorge - HERZgesund leben in einer rastlosen Welt',
			lecturer: 'Susanne Stieler, Psychologin'
		}
	];

	const getDateString = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('de-DE', {
			month: '2-digit',
			day: '2-digit'
		});
	};
</script>

<HeroShot imgSrc={header} height={'h-[80svh]'} />

<main class="container mx-auto px-4 py-12">
	<section class="">
		<h1 class="font-gagalin text-primary text-center tracking-wide">Outside the Box</h1>
		<h2 class="pb-0 text-center">Unser Wintersemester 2024/25</h2>
		<h3 class=" text-primary font-caveat text-center">jeden zweiten Dienstag 18:30</h3>
	</section>

	<section class="grid gap-x-24 gap-y-6 py-12 md:grid-cols-2">
		{#each data.events as event}
			<div class="grid grid-cols-[6rem_1fr] gap-2">
				<h3>
					{getDateString(event.start_date_time)}
				</h3>
				<div>
					<h3>
						{event.title}
					</h3>
					<div>
						{#if event.speaker}
							<span class="italic">
								{event.speaker}
							</span>
							|
						{/if}
						{event.location}
					</div>
				</div>
			</div>
		{/each}
	</section>
</main>

<SemesterProgramSelector />

<style>
	.bordered-text {
		-webkit-text-stroke: 2px #e84c05; /* width and color */
	}
</style>
