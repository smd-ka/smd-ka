<script lang="ts">
	import Carousel from 'svelte-carousel';
	// Needed b/c of this issue: https://github.com/vadimkorr/svelte-carousel/issues/141
	// There is an open pull request https://github.com/vadimkorr/svelte-carousel/pull/142
	// that fixes this issue, but it is not merged yet.
	import { browser } from '$app/environment';

	import Fa from 'svelte-fa';
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import type { PageData } from '../$types';
	// Images for Carousel
	import biggroup from '$lib/assets/pages/about/angebote/SMDAbend.jpg';
	import smallgroup from '$lib/assets/pages/about/angebote/hauskreis.jpg';
	import breakfast from '$lib/assets/pages/about/angebote/breakfast.jpg';
	import staffmeeting from '$lib/assets/pages/about/angebote/MIT.jpg';
	import saft from '$lib/assets/pages/about/angebote/SAFT.jpg';
	import kingscafe from '$lib/assets/pages/about/angebote/kings_cafe.jpg';
	import lecture_talk from '$lib/assets/pages/about/angebote/Hoersaalvortrag.jpg';
	import camps from '$lib/assets/pages/about/angebote/H-SMD_Sommerfreizeiten.png';
	import teachers from '$lib/assets/pages/about/angebote/lehramtler.jpg';
	import mentoring from '$lib/assets/pages/about/angebote/mentoring.jpg';

	import CarouselSlide from './CarouselSlide.svelte';
	import { onDestroy, onMount } from 'svelte';
	import CarouselSlideGermany from './CarouselSlideGermany.svelte';

	let carouselKA;
	let carouselGermany;
	let mobileScreen = true;

	onMount(() => {
		if (browser) {
			updateScreenWidth();
			window.addEventListener('resize', updateScreenWidth);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('resize', updateScreenWidth);
		}
	});

	function updateScreenWidth() {
		const md = 768;
		if (window.innerWidth >= md) {
			return (mobileScreen = false);
		}
		mobileScreen = true;
	}
</script>

{#if browser}
	<Carousel bind:this={carouselKA}>
		<div
			slot="prev"
			class="absolute z-10 ml-4 flex h-[50svh] items-center text-3xl text-white lg:text-5xl xl:h-[76svh]"
		>
			<button on:click={carouselKA.goToPrev}> <Fa icon={faChevronLeft} /></button>
		</div>

		<CarouselSlide
			title="SMD-Abend"
			subtitle="Jeden zweiten Dienstag in großer Runde."
			src={biggroup}
		>
			<p>
				Alle zwei Wochen treffen wir uns dienstagabends alle zusammen, um Gott zu ehren, bei gutem
				Essen oder Snacks Gemeinschaft zu haben und einen Vortrag zu hören, nach dem man die
				Möglichkeit hat, in weiteren Gesprächen tiefer zu gehen oder einfach den Abend gemütlich
				ausklingen zu lassen. Die Vorträge zu verschiedenen Themen werden gehalten von ausgewählten
				(oft externen) Referenten. Für zeitliche und örtliche Details sieh dir gerne den Kalender
				an.
			</p>
		</CarouselSlide>

		<CarouselSlide title="Hauskreis" subtitle="Gemeinsam über den Glauben reden." src={smallgroup}>
			<p>
				Alle <i>anderen</i> zwei Wochen, abwechselnd zu den SMD-Abenden, treffen wir uns in Kleingruppen
				= Hauskreisen. Die bestehen meistens aus 5-8 Leuten und treffen sich immer bei einem der Teilnehmer
				zuhause, wo oft zusammen gegessen wird, bevor man ins Thema eintaucht. Die Themen werden von
				den Hauskreisen selbst ausgesucht. Wenn du wissen möchtest, welche Hauskreise es gibt und wo
				du mal reinschnuppern oder einsteigen könntest, dann melde dich gerne beim Inreach-Team.
			</p>
		</CarouselSlide>

		<CarouselSlide
			title="Hörsaalvortrag"
			subtitle="Glaube und Wissenschaft. Ein Widerspruch?"
			src={lecture_talk}
		>
			<p>
				Ungefähr ein- bis zweimal im Jahr veranstalten wir, oft zusammen mit dem SfC (Studierende
				für Christus), einen Hörsaalvortrag, der - wie soll es auch anders sein - in einem Hörsaal
				direkt am Campus stattfindet. Für die spannenden Vortragsthemen laden wir kompetente
				Referenten ein, die für jedwede Fragen Rede und Antwort stehen.
			</p>
		</CarouselSlide>

		<CarouselSlide
			title="SAFT"
			subtitle="Semesteranfangsfreizeit: Gemeinsam ins neue Semester starten."
			src={saft}
		>
			<p>
				Die SAFT (<b>S</b>emester<b>A</b>nfangs<b>F</b>reizei<b>T</b>) - ja, SMD ist kreativ; wir
				könnten auch ZKM heißen [<b>Z</b>iemlich <b>K</b>reative <b>M</b>enschen; dies ist ein
				Karlsruher Wortwitz, Anm. d. Verf.]) findet zu Beginn eines jeden Semesters statt und ist
				eine super Gelegenheit, mal für mehr als nur 2-3 Stunden in einem intimeren Rahmen die
				Gruppe kennenzulernen. Für ein Wochenende kommen wir mal ein bisschen raus aus Karlsruhe und
				genießen die Gemeinschaft bei guten Gesprächen und fantastischem Essen. Auch hier wird uns
				ein Referent thematisch durch das Wochenende begleiten.
			</p>
		</CarouselSlide>

		<CarouselSlide title="King's Café" subtitle="Unsere Internationalenarbeit." src={kingscafe}>
			<p>
				Das King's Café ist ein Angebot insbesondere für internationale Studenten, die miteinander
				connecten möchten, ggf. ihre Deutschkenntnisse üben wollen und einfach Lust auf bunte und
				entspannte Gemeinschaft haben. Die wöchentlichen Treffen am Sonntagabend werden begleitet
				von Snacks und einem Vortrag über einen Teil dessen, was Deutschland ausmacht.
			</p>
		</CarouselSlide>

		<CarouselSlide title="Gebetsfrühstück" subtitle="Gemeinsam in den Tag starten." src={breakfast}>
			<p>
				An zwei Morgenden in der Woche treffen sich ein paar frühe Vögel, um SMD-Anliegen wie auch
				persönliche Anliegen auszutauschen, gemeinsam dafür zu beten und anschließend entspannt zu
				frühstücken. Diese Art von Start in den Tag stärkt sowohl körperlich als auch geistlich!
				Gehostet wird das Gebetsfrühstück dienstags um 07:00 Uhr in der Oststadt und donnerstags um
				08:00 Uhr in der Südstadt. Für genaue Adressen wende dich bitte an uns:
				<a href="mailto:leiter@smd-karlsruhe.de">leiter@smd-karlsruhe.de.</a>
			</p>
		</CarouselSlide>

		<CarouselSlide
			title="Mitarbeitertreffen (MIT)"
			subtitle="Gemeinsam SMD gestalten."
			src={staffmeeting}
		>
			<p>
				Ungefähr einmal im Monat (außer zur vorlesungsfreien Zeit) treffen sich alle Mitarbeiter und
				an Mitarbeit Interessierten, um in einem kleineren Rahmen als beim SMD-Abend durch einen
				Input ermutigt zu werden, in einfachem Stil Gott musikalisch anzubeten, sich gegenseitig zu
				ermutigen und alles zu besprechen, was in letzter Zeit war, was gerade ansteht und was noch
				in Planung ist (quasi Offenbarung 1,19 😁). Hier ist auch Raum, um Ideen zu entwickeln,
				Pläne umzusetzen und zu reflektieren.
			</p>
		</CarouselSlide>

		<div
			slot="next"
			class="absolute right-0 z-10 mr-4 flex h-[50svh] items-center text-3xl text-white lg:text-5xl xl:h-[76svh]"
		>
			<button on:click={carouselKA.goToNext}> <Fa icon={faChevronRight} /></button>
		</div>
	</Carousel>
{/if}

<main class="container mx-auto grid gap-8 px-4">
	<section>
		<div class="grid justify-center justify-items-center p-8">
			<h3 class="text-center max-md:text-2xl">
				Neugierig? Was aktuell läuft, siehst du im
				<a href="/events/kalender" class="text-primary"> Kalender. </a>
			</h3>
		</div>
	</section>

	<section>
		<h3 class="text-primary pb-2">Es gibt vieles zu entdecken ...</h3>
		<p>
			... und wie findet man da jetzt <b>Anschluss?</b> Am besten einfach beim nächsten Treffen in Person
			vorbeischauen. Besonders empfehlen wir dir unsere SMD-Abende, die (unterm Semester) alle zwei Wochen
			stattfinden. Hier ist es am einfachsten, SMDler kennenzulernen und sich in die Gemeinschaft einzufinden.
			Selbstverständlich können wir auch alle anderen Veranstaltungen nur wärmstens empfehlen. Wir freuen
			uns auf dich!
		</p>
		<div class="mx-auto grid max-w-fit gap-4 py-4 text-2xl md:grid-cols-2 md:gap-16">
			<a
				class="bg-primary flex items-center gap-2 px-4 py-2 text-white no-underline hover:underline"
				href="/about/kontakt"
			>
				<Fa icon={faChevronRight} />
				Bleib in Kontakt</a
			>
			<a
				class="border-grey text-grey flex items-center gap-2 border-2 px-4 py-2 no-underline hover:underline"
				href="/about/us"
			>
				<Fa icon={faChevronRight} />

				Bring deine Ideen ein.</a
			>
		</div>
	</section>
</main>

<section class="py-24">
	<h1 class="text-center">Überregionales</h1>

	<div class="container mx-auto md:px-4">
		{#if browser}
			<Carousel
				particlesToShow={mobileScreen ? 1 : 3}
				swiping={!mobileScreen}
				dots={mobileScreen}
				arrows={mobileScreen}
				bind:this={carouselGermany}
			>
				<div slot="prev" class="text-grey grid items-center p-4 text-3xl lg:text-5xl">
					<button on:click={carouselGermany.goToPrev}> <Fa icon={faChevronLeft} /></button>
				</div>
				<CarouselSlideGermany image={mentoring} title="Mentoring" link="https://mentoring.smd.org/">
					Das Studium ist kein Spaziergang. Besser passt wohl das Bild einer Bergtour mit
					Engstellen, Geröllfeldern und so manchem Auf und Ab. Da ist es gut, mit erfahrenen
					Bergsteigern und guter Ausrüstung in einer Seilschaft gemeinsam unterwegs zu sein.
				</CarouselSlideGermany>
				<CarouselSlideGermany
					image={camps}
					title="SMD-Freizeiten"
					link="https://www.smd.org/hochschul-smd/veranstaltungen/sommerfreizeiten"
				>
					Die Hochschul-SMD bietet dir für deine Semesterferien etliche Freizeitangebote.
				</CarouselSlideGermany>
				<CarouselSlideGermany
					image={teachers}
					title="Referendare und junge Lehrkräfte"
					link="https://www.smd.org/akademiker-smd/junge-akademiker/referendare-und-junge-lehrkraefte"
				>
					Dieses Angebot der Arbeitsgemeinschaft christlicher Pädagogen bietet Vernetzung,
					Unterstützung und Ermutigung für Lehramtsstudierende, Referendare und junge Lehrkräfte.
				</CarouselSlideGermany>
				<div slot="next" class="text-grey grid items-center p-4 text-3xl lg:text-5xl">
					<button on:click={carouselGermany.goToNext}> <Fa icon={faChevronRight} /></button>
				</div>
			</Carousel>
		{/if}
	</div>
</section>
