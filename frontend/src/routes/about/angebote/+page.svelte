<script>
	import Carousel from 'svelte-carousel';
	// Needed b/c of this issue: https://github.com/vadimkorr/svelte-carousel/issues/141
	// There is an open pull request https://github.com/vadimkorr/svelte-carousel/pull/142
	// that fixes this issue, but it is not merged yet.
	import { browser } from '$app/environment';
	import SAFT from '$lib/assets/pages/about/angebote/SAFT.jpg';
	import Hoersaalvortrag from '$lib/assets/pages/about/angebote/Hoersaalvortrag.jpg';
	import Gebetsfruehstueck from '$lib/assets/pages/about/angebote/Gebetsfruehstueck.jpg';
	import SMDAbend from '$lib/assets/pages/about/angebote/SMDAbend.jpg';
	import HSMD_Freizeiten from '$lib/assets/pages/about/angebote/H-SMD_Sommerfreizeiten.png';
	import lehramtler from '$lib/assets/pages/about/angebote/lehramtler.jpg';
	import mentoring from '$lib/assets/pages/about/angebote/mentoring.jpg';
	import Fa from 'svelte-fa';
	import {
		faChevronLeft,
		faChevronRight,
		faArrowDown,
		faArrowUpRightFromSquare
	} from '@fortawesome/free-solid-svg-icons';

	let carouselKarlsruhe;
	let carouselGermany;

	function prev(carousel) {
		carousel.goToPrev();
	}

	function next(carousel) {
		carousel.goToNext();
	}

	const slidesKarlsruhe = [
		{
			id: 'smd-abend',
			title: 'SMD-Abend',
			subtitle: 'Jeden zweiten Dienstag in großer Runde.',
			image: SMDAbend
		},
		{
			id: 'hoersaalvortrag',
			title: 'Hörsaalvortrag',
			subtitle: 'Glaube und Wissenschaft. Ein Widerspruch?',
			image: Hoersaalvortrag
		},
		{
			id: 'gebetsfruehstueck',
			title: 'Gebetsfrühstück',
			subtitle: 'Gemeinsam mit Gott in den Tag starten.',
			image: Gebetsfruehstueck
		},
		{
			id: 'saft',
			title: 'SAFT',
			subtitle: 'Semesteranfangsfreizeit: Gemeinsam ins neue Semester starten.',
			image: SAFT
		}
	];

	const slidesGermany = [
		{
			title: 'SMD Freizeiten',
			image: HSMD_Freizeiten,
			text: 'Die Hochschul-SMD bietet dir für deine Semesterferien etliche Freizeitangebote.'
		},
		{
			title: 'Refendare und junge Lehrkräfte',
			image: lehramtler,
			text: 'Dieses Angebot der Arbeits­gemeinschaft christlicher Pädagogen bietet Vernetzung, Unterstützung und Ermutigung für Lehramtsstudierende, Referendare und junge Lehrkräfte.'
		},
		{
			title: 'Mentoring',
			image: mentoring,
			text: 'Das Studium ist kein Spaziergang. Besser passt wohl das Bild einer Bergtour mit Engstellen, Geröllfeldern und so manchem Auf und Ab. Da ist es gut, mit erfahrenen Bergsteigern und guter Ausrüstung in einer Seilschaft gemeinsam unterwegs zu sein.'
		}
	];
</script>

<!-- autoplay autoplayDuration={3500} -->
{#if browser}
	<Carousel class="relative " bind:this={carouselKarlsruhe}>
		<div
			slot="prev"
			class="absolute z-10 ml-4 flex h-full items-center text-3xl text-white lg:text-5xl"
		>
			<button on:click={() => prev(carouselKarlsruhe)}> <Fa icon={faChevronLeft} /></button>
		</div>
		{#each slidesKarlsruhe as slide}
			<div class="relative h-[50svh] xl:h-[76svh]">
				<img
					src={slide.image}
					class="h-full w-full object-cover object-center brightness-90"
					alt="Angebote"
				/>
				<div class="pad absolute top-1/3 grid w-full -translate-y-1/3 justify-center">
					<div class="w-fit text-center text-white backdrop-filter">
						<h1 class="pb-0">{slide.title}</h1>
						<p class="font-caveat text-xl md:text-3xl">{slide.subtitle}</p>
						<a class="flex items-center justify-center gap-2" href="# + {slide.id}">
							Mehr erfahren <Fa icon={faArrowDown} />
						</a>
					</div>
				</div>
			</div>
		{/each}
		<div
			slot="next"
			class="absolute right-0 z-10 mr-4 flex h-full items-center text-3xl text-white lg:text-5xl"
		>
			<button on:click={() => next(carouselKarlsruhe)}> <Fa icon={faChevronRight} /></button>
		</div>
	</Carousel>
{/if}

<main class="container mx-auto grid gap-8 px-4">
	<section>
		<div class="grid justify-center justify-items-center p-8">
			<h3 class="text-center max-md:text-2xl">
				Neugierig? Was aktuell läuft siehst du im
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
				href="/about/mitarbeiten"
			>
				<Fa icon={faChevronRight} />

				Bring deine Ideen ein.</a
			>
		</div>
	</section>
</main>

<section class="py-24">
	<h1 class="text-center">Überregionales</h1>

	<!-- Carousel for mobile -->
	{#if browser}
		<div class="md:hidden">
			<Carousel bind:this={carouselGermany}>
				<div slot="prev" class="text-grey grid items-center p-4 text-3xl lg:text-5xl">
					<button on:click={() => prev(carouselGermany)}> <Fa icon={faChevronLeft} /></button>
				</div>
				{#each slidesGermany as slide}
					<div class="bg-background-gray">
						<img
							src={slide.image}
							class="h-48 w-full object-cover object-center"
							alt="Sommerfreizeiten"
						/>
						<a
							href="https://www.smd.org/hochschul-smd/veranstaltungen/sommerfreizeiten"
							class="text-primary px-2 py-1 no-underline hover:underline"
							target="_blank"
						>
							<h3 class="mx-4 flex flex-wrap items-center gap-2">
								{slide.title}
								<Fa class="text-xl" icon={faArrowUpRightFromSquare} />
							</h3>
						</a>
						<p class="px-4 py-2">
							{slide.text}
						</p>
					</div>
				{/each}
				<div slot="next" class="text-grey grid items-center p-4 text-3xl lg:text-5xl">
					<button on:click={() => next(carouselGermany)}> <Fa icon={faChevronRight} /></button>
				</div>
			</Carousel>
		</div>
	{/if}

	<div class="container mx-4 mx-auto grid grid-cols-3 gap-4 max-md:hidden">
		{#each slidesGermany as slide}
			<div class="bg-background-gray">
				<img
					src={slide.image}
					class="h-48 w-full object-cover object-center"
					alt="Sommerfreizeiten"
				/>
				<a
					href="https://www.smd.org/hochschul-smd/veranstaltungen/sommerfreizeiten"
					class="text-primary px-2 py-1 no-underline hover:underline"
					target="_blank"
				>
					<h3 class="mx-4 flex flex-wrap items-center gap-2">
						{slide.title}
						<Fa class="text-xl" icon={faArrowUpRightFromSquare} />
					</h3>
				</a>
				<p class="px-4 py-2">
					{slide.text}
				</p>
			</div>
		{/each}
	</div>
</section>
<!-- 
	<section class="grid gap-8">
		<div>
			<h2 class="pb-0">Weitere Infos</h2>
			<p class="text-gray-600">Unsere Angebote en Detail</p>
		</div>

		<div id="smd-abend" class="grid gap-2">
			<h3>SMD-Abend</h3>
			<p>
				Alle zwei Wochen treffen wir uns dienstagabends alle zusammen, um Gott zu ehren, bei gutem
				Essen oder Snacks Gemeinschaft zu haben und einen Vortrag zu hören, nach dem man die
				Möglichkeit hat, in weiteren Gesprächen tiefer zu gehen oder einfach den Abend gemütlich
				ausklingen zu lassen. Die Vorträge zu verschiedenen Themen werden gehalten von ausgewählten
				(oft externen) Referenten. Für zeitliche und örtliche Details sieh dir gerne den Kalender
				an.
			</p>
			<a
				class="bg-primary flex w-fit items-center gap-2 px-4 py-2 text-white"
				href="/events/kalender"
			>
				<Fa icon={faChevronRight} />
				Zum Kalender
			</a>
		</div>
		<div class="grid gap-2">
			<h3>Hörsaalvortrag</h3>
			<p>
				Ungefähr ein- bis zweimal im Jahr veranstalten wir, oft zusammen mit dem SfC (Studierende
				für Christus), einen Hörsaalvortrag, der - wie soll es auch anders sein - in einem Hörsaal
				direkt am Campus stattfindet. Für die spannenden Vortragsthemen laden wir kompetente
				Referenten ein, die für jedwede Fragen Rede und Antwort stehen.
			</p>
		</div>
		<div id="saft" class="grid gap-2">
			<h3>SAFT</h3>
			<p>
				Die SAFT (SemesterAnfangsFreizeiT - ja, SMD ist kreativ; wir könnten auch ZKM heißen
				[Ziemlich Kreative Menschen; dies ist ein Karlsruher Wortwitz, Anm. d. Verf.]) findet immer
				zu Beginn eines jeden Semesters statt und ist eine super Gelegenheit, mal für mehr als nur
				2-3 Stunden in einem intimeren Rahmen die Gruppe kennenzulernen. Für ein Wochenende fahren
				wir an einen Ort, an dem wir nicht andauernd an die nächste Klausur denken müssen, sondern
				die Gemeinschaft und fantastisches Essen genießen. Auch hier wird uns ein Referent
				thematisch durch das Wochenende begleiten.
			</p>
			<a class="bg-primary flex w-fit items-center gap-2 px-4 py-2 text-white" href="/events/saft">
				<Fa icon={faChevronRight} />
				Weitere Infos zur nächsten SAFT
			</a>
		</div>
	</section> -->
