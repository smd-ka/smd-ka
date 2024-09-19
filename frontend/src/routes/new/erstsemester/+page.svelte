<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

	import type { PageData } from '../$types';
	import { getImageSrc } from '$lib/fetch_img';

	// TODO add Churchhopping for this year
	const churchHopping = [
		{
			date: '22. September 10:00 Uhr',
			link: 'https://lkg-karlsruhe.de/',
			name: 'LKG',
			responsible: 'Claus'
		},
		{
			date: '29. Oktober 10:00 Uhr',
			link: 'https://faecherkirche.de/',
			name: 'Fächerkirche',
			responsible: 'Frederik'
		}
	];

	export let data: PageData;

	const getDateTimeString = (startDateString: string, endDateString) => {
		const startDate = new Date(startDateString);
		if (!endDateString) {
			return (
				startDate.toLocaleDateString('de-DE', {
					weekday: 'long',
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
	};
</script>

<main class="main">
	<section class="pad">
		<h1 class="text-center">endlich Student</h1>
		<p>
			Du bist neu in Karlsruhe oder planst hierher zu ziehen für dein Studium? Du bist auf der Suche
			nach christlicher Gemeinschaft? Dann bist du hier genau richtig! Wir sind eine
			überkonfessionelle Hochschulgruppe, die es auf dem Herzen hat unseren Glauben authentisch im
			Studienalltag zu leben.
		</p>
		<p>
			Wir haben ein vielfältiges Angebot an Veranstaltungen und Aktionen, bei denen du uns und
			andere Erstsemester kennen lernen kannst. Wir freuen uns auf dich!
		</p>
	</section>

	<section>
		<div class="pad">
			<h1>Angebote für neue Studierende</h1>

			<p>
				Noch vor Vorlesungsbeginn für PH und KIT haben wir einige richtig coole Aktionen für dich
				vorbereitet.<br />
				Im Semester bist du herzlich zu unseren SMD Abenden und Hauskreisen eingeladen. Die Hauskreisanmeldung
				findet immer zu Beginn des Semester statt. Wenn du Fragen hast, schreib uns gerne eine Mail an
				<a class="whitespace-nowrap" href="mailto:erstsemester@smd-karlsruhe.de"
					>erstsemester@smd-karlsruhe.de
				</a>. <br />
				Schau doch mal bei uns vorbei!
			</p>

			<h2 class="pb-6 pt-12">Ersti Aktionen Wintersemester 2024/25</h2>

			<p>
				Wir haben für dich einige coole Aktionen geplant, bei denen du uns und andere Erstsemester
				kennen lernen kannst. Wir freuen uns auf dich!
			</p>

			{#if data.events.length === 0}
				<p>
					Die Aktionen befinden sich gerade noch in der Planung, werden aber bald hier
					veröffentlicht. Sie werden vermutlich vor allem in den letzten September und ersten
					Oktoberwochen stattfinden. Stay tuned :)
				</p>
			{/if}
		</div>
		<div
			class="grid gap-8 px-4 md:grid-cols-2 {data.events.length > 2
				? ' xl:grid-cols-3'
				: 'xl:px-52'}"
		>
			{#each data.events as event}
				<div>
					<div class="relative text-white">
						<img
							src={getImageSrc(event.image, event.id, event.collectionId, event.collectionName)}
							class="h-72 w-full object-cover brightness-50"
							alt={event.title}
						/>
						<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
							<h3 class="">{event.title}</h3>
						</div>
					</div>
					<div class="pt-8">
						<span class="flex items-center gap-2 text-xl font-bold"
							><Fa icon={faCalendarDays} />{getDateTimeString(
								event.start_date_time,
								event.end_date_time
							)}
						</span>
						<span class="flex items-center gap-2 text-xl font-bold"
							><Fa icon={faLocationDot} /><a href={event.google_maps_url}>
								{event.location}
							</a>
						</span>
					</div>
					<p class="py-4">
						{@html event.description}
					</p>
				</div>
			{/each}
		</div>

		<p class="pad text-sm">
			Erklärung Summerbreaks: Diese sind unsere Großgruppenevents über den Sommer, also die ideale
			Möglichkeit nicht nur Erstsemester sondern auch alle anderen aus der Gruppe kennen zu lernen.
			Sobald das Semester beginnt, treffen wir uns zu SMD-Abenden alle zwei Wochen dienstagabends
		</p>

		<div class="pad pt-16">
			<h2>Church Hopping</h2>

			<p class="py-4">
				Am Anfang von jedem Wintersemester bieten wir dir an, die Gemeinden kennen zu lernen, in die
				wir SMDler gehen. So kannst du ganz unkompliziert eine Gemeinde in Karlsruhe finden, ohne
				dass du alleine in der Bank sitzt 😉. Außerdem hast du direkt eine Person, der du Fragen zur
				und über die Gemeinde stellen kannst. Als Studentenmission ist es uns wichtig, dass du eine
				Gemeinde findest in der du geistlich gestärkt wirst!
				<br />
				In der Tabelle findest du die Termine für dieses Jahr.
			</p>
		</div>

		<table
			class="font-merriweather mt-8 grid grid-cols-[auto_auto_auto] gap-x-2 px-4 md:text-2xl xl:px-72"
		>
			<!-- <div class="font-bold">Datum</div>
			<div class="font-bold">Gemeinde</div>
			<div class="font-bold">Ansprechperson</div> -->

			{#each churchHopping as hop, i}
				<div class="col-span-full h-0.5 {i == 0 ? 'bg-gray-600' : 'bg-gray-300'}"></div>
				<div>{hop.date}</div>
				<a href={hop.link}>{hop.name}</a>
				<div>{hop.responsible}</div>
			{/each}
		</table>
	</section>
</main>
