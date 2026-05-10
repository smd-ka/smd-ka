<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

	import { getImageSrc } from '$lib/fetch_img';
	import dayjs from 'dayjs';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="main">
	<section class="pad">
		<h1 class="text-center">Erstsemester? - Let's Go!</h1>
		<p>
			Du bist neu in der Stadt und/oder ziehst für dein Studium nach Karlsruhe? Schön, dass du uns
			gefunden hast - wir haben da etwas für dich vorbereitet! Wir wünschen uns, dass dir der
			Studienstart gut gelingt und du dich bei allen Veränderungen schnell zurechtfindest. Durch
			verschiedene Formate geben wir dir die Möglichkeit, nette Menschen, die Stadt und die SMD
			kennenzulernen. Du bist herzlich eingeladen bei unseren Veranstaltungen vorbeizuschauen oder
			auch gerne mit uns Kontakt aufzunehmen - wir freuen uns auf dich!
		</p>
	</section>

	<section class="pad grid gap-4">
		<h2 class="text-center">Unser Erstsemesterprogramm</h2>

		<div>
			<p class="font-bold">
				Bis das KIT-Semester am 20.04.2026 wieder startet, (und unser "normales" Programm losgeht)
				bist du herzlich zu unseren "Springbreaks" eingeladen (zu finden im <a
					href="/events/kalender">Kalender</a
				>). Dort kannst du uns kennenzulernen, ins Studentenleben in KA einzutauchen und einfach ne
				gute Zeit genießen.
			</p>

			<br />

			<p>
				Mehr Infos zu den einzelnen Aktionen (fürs Wintersemester) findest du auch direkt hier unten
				sowie in unseren Signal-Gruppen und auch auf
				<a href="https://www.instagram.com/smd_karlsruhe/" class="text-primary">Instagram</a>. Den
				Link zu den Signal-Gruppen und weitere Kontaktmöglichkeiten findest du unter
				<a href="/about/kontakt" class="text-primary">Kontakt</a>.
			</p>

			<p></p>
		</div>

		{#if !data.erstsemester_events || data.erstsemester_events.length === 0}
			<p>
				Zu Beginn vom jedes Wintersemesters planen wir coole Ersti-Aktionen für dich! Die sind
				super, um uns als Gruppe, aber auch andere Erstsemester kennenzulernen. Herzliche Einladung
				– schau einfach vorbei!
				<br />
				Schau am besten zwischen September und Oktober hier vorbei, um zu sehen, welche Aktionen geplant
				sind. Die konkreten Daten und Fakten stehen dann anstelle dieses Textes hier :)
			</p>
		{:else}
			<div
				class="grid gap-8 px-4 pt-8 md:grid-cols-2 {data?.erstsemester_events?.length > 2
					? ' xl:grid-cols-3'
					: 'xl:px-52'}"
			>
				{#each data?.erstsemester_events as event}
					<div>
						<img
							src={getImageSrc(event.image, event.id, event.collectionId, event.collectionName)}
							alt={event.title}
						/>
						<div class="pt-8">
							<h3>{event.title}</h3>
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
								><Fa icon={faLocationDot} /><a href={event.location_url} class="hover:underline">
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
		{/if}
	</section>
</main>
