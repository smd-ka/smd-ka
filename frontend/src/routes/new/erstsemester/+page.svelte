<script lang="ts">
	import { dev } from '$app/environment';

	import { faChevronRight, faMessage } from '@fortawesome/free-solid-svg-icons';
	import ErstsemesterEventCard from './_components/ErstsemesterEventCard.svelte';
	import { SIGNAL_GROUP_URL, INSTAGRAM_URL } from '$lib/links';
	import Button from '$lib/components/Button.svelte';
	import { SemesterKind } from './semesters';
	import type { SemesterKindTexts } from './semesters';
	import type { PageData } from './$types';
	import dayjs from 'dayjs';
	import Fa from 'svelte-fa';

	export let data: PageData;
	const { now, semester, erstsemester_events } = data;
	const lectureStart = dayjs(semester.lectureStart).format('DD.MM.YYYY');

	/**
	 * states that that semester has a special Erstsemester program
	 * and guards against accidental usage of CURRENT in following semesters
	 */
	const isCurrent = semester.key === '2026-WS';

	/**
	 * - only applies to the ERSTI mode
	 * - SHOULD be updated each semester
	 * - its values SHOULD be guarded with isCurrent with sane defaults for future semesters
	 */
	const CURRENT = {
		churchHopping: isCurrent ? true : false,
		offenerHauskreis: isCurrent ? true : false,
		sBreak: isCurrent ? true : true,
		/** renders button for "offener Hauskreis" Signal group */
		offenerHauskreisSignal: isCurrent
			? 'https://signal.group/#CjQKIHzsD0gmrwb4VfpykwLdfYIun1uqG3cbmclIFR5jBFU7EhAronUKBUzQrB-4Bnq9ZRPx'
			: null
	};

	const KIND_TEXTS: Record<SemesterKind, SemesterKindTexts> = {
		[SemesterKind.Winter]: {
			breakName: 'Summerbreak',
			semesterNoun: 'Wintersemester',
			planningMonths: 'September und Oktober'
		},
		[SemesterKind.Summer]: {
			breakName: 'Springbreak',
			semesterNoun: 'Sommersemester',
			planningMonths: 'März und April'
		}
	};
	const { breakName, planningMonths, semesterNoun } = KIND_TEXTS[semester.kind];

	/**
	 * determines mode of this page
	 * (when extending, update all template usages!)
	 * (must be string enum so that Object.entries(Mode) only lists each once)
	 */
	enum Mode {
		/** before or at start of lecture period, we have special ersti events */
		ERSTI = 'ersti',
		/** during lecture period, link to main program */
		MAIN = 'main',
		/** in between semesters, we promise to have an ersti program */
		PROMISED = 'promised',
		/** in between semesters, we only have our usual break program */
		BREAKS = 'breaks'
	}
	// Svelte-reactive for debugging
	let programMode: Mode =
		erstsemester_events.length > 0
			? Mode.ERSTI
			: semester.lectureStart <= now
				? Mode.MAIN
				: isCurrent
					? Mode.PROMISED
					: Mode.BREAKS;

	// Svelte-reactive for debugging
	$: eventsShown = programMode === Mode.ERSTI && erstsemester_events.length > 0;
</script>

<main class="main">
	{#if dev}
		<label class="mx-auto block w-fit">
			programMode=
			<select bind:value={programMode}>
				{#each Object.entries(Mode) as [name, value]}
					<option {value}>{name}</option>
				{/each}
			</select>
		</label>
	{/if}

	<section class="pad">
		<h1>Erstsemester? - Let's Go!</h1>
		<p>
			Du bist neu in der Stadt oder ziehst für dein Studium nach Karlsruhe? Schön, dass du uns
			gefunden hast - wir haben etwas für dich vorbereitet! Wir wünschen uns, dass dir der
			Studienstart gut gelingt und du dich bei allen Veränderungen schnell zurechtfindest. Durch
			verschiedene Formate geben wir dir die Möglichkeit, nette Menschen, die Stadt und die SMD
			kennenzulernen. Du bist herzlich eingeladen bei unseren Veranstaltungen vorbeizuschauen oder
			auch gerne mit uns Kontakt aufzunehmen - wir freuen uns auf dich!
		</p>
	</section>

	<section class="pad grid gap-4">
		<h2>Unser Erstsemesterprogramm</h2>

		<p class="font-bold">
			{#if programMode === Mode.ERSTI}
				Komm vorbei - noch bevor am {lectureStart} die Vorlesungen am KIT starten, haben wir ein paar
				coole Aktionen speziell für Erstis geplant!
			{:else if programMode === Mode.MAIN}
				Du hast uns erst mitten im Semester gefunden? Macht nichts, du darfst gerne auch bei unserem
				Hauptprogramm einfach unverbindlich vorbeischauen.
			{:else if programMode === Mode.PROMISED}
				Zu Beginn jedes {semesterNoun}s planen wir coole Ersti-Aktionen für dich! Die sind super, um
				unsere Gruppe, aber auch andere Erstsemester kennenzulernen. Herzliche Einladung – schau
				einfach vorbei!
			{:else}
				Bis das KIT-Semester am {lectureStart} wieder startet und unser "normales" Programm losgeht,
				bist du herzlich zu unseren {breakName}s eingeladen. Dort kannst du uns kennenzulernen, ins
				Studentenleben in KA einzutauchen und einfach ne gute Zeit genießen.
			{/if}
		</p>

		{#if programMode === Mode.ERSTI}
			<div class="grid gap-2">
				{#if CURRENT.sBreak}
					<p>
						Bei den <b>{breakName}s</b> bist du natürlich auch herzlich eingeladen, uns kennenzulernen
						und ins Studentenleben einzutauchen.
					</p>
				{/if}
				{#if CURRENT.offenerHauskreis}
					<div class="grid gap-1">
						<p>
							Der <b>Offene Hauskreis</b> bietet dir eine zusätzliche Möglichkeit, bei gemeinsamen
							Essen in einer kleinen Gruppe ins Gespräch zu kommen.
							{#if CURRENT.offenerHauskreisSignal !== null}
								<br />
								Weitere Infos zum offenen Hauskreis findest du in unserer Signal-Gruppe:
							{/if}
						</p>
						{#if CURRENT.offenerHauskreisSignal !== null}
							<div class="button-bar">
								<Button href={CURRENT.offenerHauskreisSignal} external={true}>
									<Fa icon={faMessage} />
									Zur Signal-Gruppe für den Offenen Hauskreis
								</Button>
							</div>
						{/if}
					</div>
				{/if}
				{#if CURRENT.churchHopping}
					<p>
						Beim <b>Church Hopping</b> bietet sich dir die Gelegenheit, sonntags mit SMD'lern in den
						Gottesdienst zu gehen, um einen Überblick über die vielen Karlsruher Gemeinden zu
						bekommen. Wenn du dir schon so einen Überblick verschaffen willst, schau doch mal auf
						die
						<a href="/new/gemeinden">Liste der Gemeinden</a>, die wir besuchen.
					</p>
				{/if}
			</div>
		{:else if programMode === Mode.MAIN}
			<!-- text above already hints at main program -> hide this section -->
		{:else if programMode === Mode.PROMISED}
			<p>
				Unsere Ersti-Aktionen finden im {planningMonths} statt. Dann stehen die konkreten Fakten anstelle
				dieses Textes hier :)
			</p>
		{:else}
			<p>
				{breakName}s sind unsere Treffen zwischen den Semestern - Brettspiele, gemeinsames Kochen
				oder Backen, Lobpreis, Sport oder Wandern. Also eine gute Möglichkeit, uns kennenzulernen.
				Die nächsten {breakName}s findest du auch in unserem
				<a href="/events/kalender">Kalender</a>.
			</p>
		{/if}

		{#if eventsShown}
			<hr />
			<div
				class="grid gap-8 px-4 md:grid-cols-2 {erstsemester_events?.length > 2
					? ' xl:grid-cols-3'
					: 'xl:px-52'}"
			>
				{#each erstsemester_events as event}
					<ErstsemesterEventCard {event} />
				{/each}
			</div>
			<hr />
		{/if}

		<p>
			{#if programMode === Mode.ERSTI}
				Mehr Infos zu den einzelnen Aktionen findest du direkt hier unten sowie
			{:else if programMode === Mode.MAIN}
				Was aktuell bei uns läuft, findest du
			{:else if programMode === Mode.PROMISED}
				Was bereits bei uns läuft, findest du
			{:else}
				Sonst kannst du auch
			{/if}
			in unserer
			<a href={SIGNAL_GROUP_URL} target="_blank" rel="noopener noreferrer">Signal-Gruppe</a>
			und auf
			<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a
			>{#if programMode === Mode.BREAKS}
				vorbeischauen{/if}.
			<br />
			Weitere Möglichkeiten, uns deine Fragen zu stellen, findest du auf unserer
			<a href="/about/kontakt">Kontaktseite</a>.
		</p>

		<div class="button-bar p-4">
			<Button href="/events/kalender">
				<Fa icon={faChevronRight} />
				Zum Kalender mit
				{#if eventsShown}
					weiteren
				{:else}
					allen
				{/if}
				Events
			</Button>
		</div>
	</section>
</main>

<style>
	h1,
	h2,
	.main p {
		@apply text-center;
	}

	a[href] {
		@apply text-primary;
	}

	hr {
		@apply my-4 border-t-2;
	}

	.button-bar {
		@apply flex flex-wrap justify-center gap-4;
	}
</style>
