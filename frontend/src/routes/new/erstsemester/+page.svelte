<script lang="ts">
	import ErstsemesterEventCard from './_components/ErstsemesterEventCard.svelte';
	import { INSTAGRAM_URL } from '$lib/links';

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
				Bis das KIT-Semester am 27.10.2026 wieder startet, (und unser "normales" Programm losgeht)
				bist du herzlich zu unseren Summerbreaks eingeladen (zu finden im <a href="/events/kalender"
					>Kalender</a
				>). Dort kannst du uns kennenzulernen, ins Studentenleben in KA einzutauchen und einfach ne
				gute Zeit genießen.
			</p>

			<br />

			<p>
				Mehr Infos zu den einzelnen Aktionen (fürs Wintersemester) findest du auch direkt hier unten
				sowie in unseren Signal-Gruppen und auch auf
				<a href={INSTAGRAM_URL} class="text-primary">Instagram</a>. Den Link zu den Signal-Gruppen
				und weitere Kontaktmöglichkeiten findest du unter
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
					<ErstsemesterEventCard {event} />
				{/each}
			</div>
		{/if}
	</section>
</main>
