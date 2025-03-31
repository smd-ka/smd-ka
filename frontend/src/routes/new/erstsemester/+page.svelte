<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faLocationDot, faCalendarDays, faLinkSlash } from '@fortawesome/free-solid-svg-icons';

	import type { PageData } from '../$types';
	import { getImageSrc } from '$lib/fetch_img';
	import dayjs from 'dayjs';

	export let data: PageData;
</script>

<main class="main">
	<section class="pad">
		<h1 class="text-center">Erstsemester - und nun?</h1>
		<p>
			Du bist neu in Karlsruhe oder planst hierher zu ziehen für dein Studium? Du bist auf der Suche
			nach christlicher Gemeinschaft? Was für ein Zufall (oder was für eine Fügung), denn dann bist
			du hier genau richtig! Wir haben es auf dem Herzen, unseren Glauben authentisch im
			Studienalltag zu leben. Bei uns hast du die Chance, schnell Anschluss zu finden, damit KA
			nicht nur KlausurenAnstalt heißt, sondern für eine Stadt steht, die du gerne dein neues (oder
			altes) Zuhause nennen kannst.
		</p>
		<p>
			Wir haben ein vielfältiges Angebot an Veranstaltungen und Aktionen, bei denen du uns und
			andere Erstsemester kennenlernen kannst. Wir freuen uns auf dich!
		</p>
	</section>

	<section>
		<div class="pad">
			<h1>Angebote für neue Studierende</h1>

			<p>
				Komm vorbei – noch bevor die Vorlesungen starten, haben wir ein paar coole Aktionen für dich
				geplant!<br />
				Im Semester bist du herzlich zu unseren SMD-Abenden und Hauskreisen eingeladen. Die Anmeldung
				für die Hauskreise gibt’s immer zum Start des Semesters.<br />
				Bei Fragen, schreib uns gerne eine Mail an
				<a class="whitespace-nowrap" href="mailto:erstsemester@smd-karlsruhe.de"
					>erstsemester@smd-karlsruhe.de</a
				>.<br />

				Um auf dem Laufenden zu bleiben kannst du gerne unserer Signalgruppe beitreten – schick uns
				dazu einfach deine Nummer per Mail, um nichts zu verpassen! (Oder frag bei einer der
				Aktionen einen SMDler :)<br />
				Wir freuen uns auf dich!
			</p>

			<h2 class="pt-12">Erstsemester-Aktionen</h2>

			{#if data.events.length === 0}
				<p>
					Zu Beginn vom Wintersemester planen wir coole Aktionen für dich! Die sind super, um uns
					als Gruppe, aber auch andere Erstsemester kennenzulernen. Die Aktionen sind immer
					entspannt und unverbindlich – schau einfach vorbei, wenn du Lust hast! <br />
					Schau am besten zwischen September und Oktober hier vorbei, um zu sehen, was wir für dich vorbereitet
					haben.
				</p>
			{/if}
		</div>
		<div
			class="grid gap-8 px-4 md:grid-cols-2 {data.events.length > 2
				? ' xl:grid-cols-3'
				: 'xl:px-52'}"
		>
			<!-- TODO: redesign to match front page (maybe component?) -->
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
						<span class="flex items-center gap-2 text-xl font-bold">
							<Fa icon={faCalendarDays} />
							{#if event.end_date_time && !dayjs(event.start_date_time).isSame(dayjs(event.end_date_time), 'day')}
								{dayjs(event.start_date_time).format('DD. MMMM')} - {dayjs(
									event.end_date_time
								).format('DD. MMMM')}
							{:else}
								{dayjs(event.start_date_time).format('DD. MMMM // HH:mm')}
							{/if}
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

		<div class="pad pt-16">
			<h2>Church Hopping</h2>

			<p class="py-4">
				Am Anfang jedes Wintersemesters bieten wir dir an, die Gemeinden kennen zu lernen, in die
				wir SMDler gehen. So kannst du ganz unkompliziert eine Gemeinde in Karlsruhe finden, ohne
				dass du alleine in der Bank sitzt 😉. Außerdem hast du direkt eine Person, der du Fragen zur
				und über die Gemeinde stellen kannst. Da sich die SMD bewusst <i>nicht</i> als eine Gemeinde
				sieht, ist es uns wichtig, dass du eine Gemeinde findest, in der du geistlich auftanken darfst!
			</p>
		</div>
	</section>
</main>
