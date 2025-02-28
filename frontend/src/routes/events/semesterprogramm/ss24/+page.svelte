<script lang="ts">
	import header from '$lib/assets/pages/events/semesterprogramm/herzenssache_21_9.jpg';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import SemesterProgramSelector from '../SemesterProgramSelector.svelte';
	import dayjs from 'dayjs';

	// TODO: move this to backend and fetch it
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
			lecturer: 'Rebekka, Lehrerin im Tschad',
			location: 'Reinhold-Frank-Str. 44A'
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
			lecturer: 'Andreas Rennig , Pfarrer',
			location: 'Reinhold-Frank-Str. 44A'
		},
		{
			date: new Date('2024/7/9'),
			title: 'Große Fragen persönlich erlebt - ein Philosoph teilt sein HERZ',
			lecturer: 'Heinzpeter Hempelmann, Philosoph/Theologe',
			location: 'Reinhold-Frank-Str. 44A'
		},
		{
			date: new Date('2024/7/23'),
			title: 'Selbstfürsorge - HERZgesund leben in einer rastlosen Welt',
			lecturer: 'Susanne Stieler, Psychologin',
			location: 'Reinhold-Frank-Str. 44A'
		}
	];
</script>

<HeroShot imgSrc={header} height={'h-[80svh]'} />

<main class="container mx-auto px-4 py-12">
	<section class="">
		<h1 class="font-anton text-primary text-center font-bold tracking-wide">
			Herzens<span class="bordered-text text-white">sache</span>
		</h1>
		<h2 class="pb-0 text-center">Unser Sommersemester 2024</h2>
		<h3 class=" text-primary font-caveat text-center">jeden zweiten Dienstag 18:30</h3>
	</section>

	<section class="grid gap-x-24 gap-y-6 py-12 md:grid-cols-2">
		{#each program as event}
			<div class="flex gap-2">
				<h3>
					{dayjs(event.date).format('DD.M.')}
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
