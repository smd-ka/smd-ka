<script lang="ts">
	import header_mobile from '$lib/assets/heroshots/herzenssache_heroshot_mobile.png';
	import header from '$lib/assets/heroshots/herzenssache_heroshot.png';
	import { onMount } from 'svelte';
	import background from '$lib/assets/ss24/background_ss24.png';
	import heart from '$lib/assets/ss24/herzenssache.png';
	import Saos from 'saos';
	import promoVid from '$lib/assets/videos/saft.mp4';
	import { pb } from '$lib/pocketbase';
	import type { Activity } from '$lib/models';

	let activities: Array<Activity> = [];
	let yesterday: Date;

	let program = [
		{
			date: new Date('2024/4/16'),
			title: '🫀📲 ❤️ - Wie Social Media uns beeinflusst',
			lecturer: 'Rufina Kaehler, Regionalreferentin SMD'
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

	onMount(async () => {
		yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		activities = await pb.collection('activities').getFullList({});
		console.log(activities);
	});

	const src = (image: string, id: string, collectionId: string, collectionName: string) => {
		return pb.files.getUrl(
			{
				collectionId: collectionId,
				collectionName: collectionName,
				id: id
			},
			image
		);
	};
</script>

<img src={header_mobile} alt="Herzenssache" class="w-full md:hidden" />
<img src={header} alt="Herzenssache" class="w-full max-md:hidden" />
<main class="grid gap-12">
	<div class="relative bg-cover bg-right" style="background-image: url({background});">
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
						<div class={event.date > yesterday ? '' : 'text-gray-500'}>
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

	<div id="saft" class="text-primary py-4 text-center text-5xl tracking-widest">+++</div>

	<div class="relative">
		<video class="h-96" autoplay muted loop playsinline>
			<source src={promoVid} type="video/mp4" />
			<track kind="captions" />
			Your browser does not support the video tag.
		</video>

		<div class="absolute left-14 top-14 text-white">
			<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
				<div class="flex flex-col gap-4">
					<h1 class="text-3xl md:hidden">SemesterAnfangs- <br /> FreizeiT</h1>
					<h1 class="text-5xl max-md:hidden">SemesterAnfangsFreizeiT</h1>
					<p>From the Inside out</p>
					<a href="/saft" class="w-fit bg-black p-4 text-white">Weitere Infos</a>
				</div>
			</Saos>
		</div>
	</div>

	<div id="aktionen" class="flex flex-col gap-8 px-4 py-20 xl:px-80">
		<h1 class="text-4xl font-bold uppercase md:text-5xl">Wöchentliche Aktionen</h1>

		<div class="grid gap-8 xl:grid-cols-2">
			{#each activities as activity}
				<div class="">
					<div
						class="relative h-52 bg-cover bg-center"
						style="background-image: url({src(
							activity.image,
							activity.id,
							activity.collectionId,
							activity.collectionName
						)})"
					>
						<div
							class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white backdrop-blur-sm"
						>
							<h2 class="text-3xl font-bold uppercase 2xl:whitespace-nowrap 2xl:text-4xl">
								{activity.title}
							</h2>
							<h3 class="text-lg font-bold">{activity.subtitle}</h3>
						</div>
					</div>
					<div class="flex flex-col gap-6 py-2">
						<p>{activity.description}</p>
					</div>
				</div>
			{/each}
			<div></div>
		</div>
	</div>
</main>

<style>
	video {
		width: 100%;
		height: 500px;
		object-fit: cover;
	}

	@media (max-width: 700px) {
		video {
			height: 300px;
		}
	}

	.bordered-text {
		-webkit-text-stroke: 2px #e84c05; /* width and color */
	}
</style>
