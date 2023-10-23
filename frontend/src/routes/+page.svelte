<script lang="ts">
	import header from '$lib/assets/header.png';
	import groupPicture from '$lib/assets/group-picture.png';
	import frame from '$lib/assets/frame.svg';
	import Instagram from '$lib/components/Instagram.svelte';
	import { faChildReaching, faCross, faLightbulb } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import CalendarList from '$lib/components/CalendarList.svelte';
	import HeroShot from '$lib/components/HeroShot.svelte';
</script>

<HeroShot imgSrc={header} />

<main class="container mx-auto flex flex-col gap-8">
	<div class="card mt-10">
		<h1 class="text-primary text-2xl lg:text-4xl">Schön, dass du hier bist!</h1>
		<div class="grid gap-4 md:grid-cols-[2fr_1fr]">
			<div class="flex lg:text-2xl">
				<div>
					<p class="py-4">
						Du startest demnächst mit deinem Studium in Karlsruhe und bist auf der Suche nach einer
						christlichen Hochschulgruppe? <bold class="font-bold">Genial! </bold>
					</p>
					<p class="">
						<a class="text-primary" href="/neu-hier">Hier</a> findest du alles Wichtige über die Hochschul-SMD
						Karlsruhe und spezielle Angebote zum Semesterstart.
					</p>
				</div>
			</div>

			<div class="relative max-md:my-16 max-sm:my-8">
				<img
					class="absolute -top-4 left-8 z-10 rotate-3 scale-110 md:scale-125 lg:left-10"
					alt="group"
					src={frame}
				/>
				<div class="px-8">
					<img class="" alt="group" src={groupPicture} />
				</div>
			</div>
		</div>
	</div>

	<div class="card">
		<h1 class="text-primary text-4xl">Was geht? - Nächste Events</h1>
		<div class="grid gap-8 md:grid-cols-[1fr_300px]">
			<CalendarList />
			<Instagram />
		</div>
	</div>

	<div id="about-us" class="card scroll-m-24">
		<h1 class="text-primary text-2xl lg:text-4xl">Über uns</h1>
		<p class="mt-2">
			Die Hochschul-SMD Karlsruhe ist eine überkonfessionelle, christliche Studentengruppe mit ca.
			60 Studenten von Erstsemestern bis Doktoranden - alles ist dabei. Dabei ist unser Motto stets:
			Denken. Glauben. Erleben. Wir wollen unsere Glaubensüberzeugungen mit dem Verstand erforschen
			und in unserem Alltag leben. Dabei ist uns die Gemeinschaft untereinander sehr wichtig.
			Deshalb treffen wir uns regelmäßig in in Hauskreisen oder alle zusammen als Großgruppe bei
			unserem Gruppentreff. Interesse geweckt? Dann schau doch mal bei einem unserer regelmäßigen
			Treffen vorbei!
		</p>
	</div>

	<div class="flex justify-center">
		<div
			class="relative mt-10 max-w-3xl flex-col gap-2 rounded-md bg-white p-8 max-sm:mx-10 md:rounded-full md:px-20 md:text-center"
		>
			<div
				class="bg-primary absolute right-0 top-0 -translate-y-1/3 translate-x-1/3 rounded-full px-10 py-8 sm:hidden"
			>
				<fa size="3x" icon={faCross} />
			</div>
			<h1 class="text-primary text-4xl">GLAUBEN.</h1>
			<p>Der Glaube an Jesus Christus und seine Auferstehung ist für uns die Mitte.</p>
			<p>
				Glauben heißt für uns Jesus Christus als Herrn und Heiland anzuerkennen und uns in Lebens-
				und Glaubensfragen an der Bibel zu orientieren. Dabei geht es nicht um blinden Gehorsam.
				Vielmehr wollen wir den wahren Fragen des Lebens mit Hilfe der Bibel auf den Grund gehen.
			</p>
			<p>
				Uns ist es wichtig unseren Glauben auch und gerade im Alltag lebendig werden zu lassen und
				anderen Menschen Gott nahezubringen. Unser erklärtes Ziel ist den Glauben verständlich und
				vor allem auf einladende, zeitgemäße Weise zu vermitteln.
			</p>
		</div>
	</div>

	<div class="relative flex h-[272px] max-sm:hidden">
		<div class="bg-primary absolute left-1/2 -translate-x-1/2 rounded-full">
			<div class="peer z-10 rounded-full px-12 py-10">
				<Fa size="3x" icon={faLightbulb} />
			</div>

			<div
				class="absolute bottom-0 z-0 hidden w-[600px] rounded-[64px] bg-white px-20 peer-hover:block"
			>
				<h1 class="text-primary text-4xl">GLAUBEN.</h1>
				<p>Der Glaube an Jesus Christus und seine Auferstehung ist für uns die Mitte.</p>
				<p>
					Glauben heißt für uns Jesus Christus als Herrn und Heiland anzuerkennen und uns in Lebens-
					und Glaubensfragen an der Bibel zu orientieren. Dabei geht es nicht um blinden Gehorsam.
					Vielmehr wollen wir den wahren Fragen des Lebens mit Hilfe der Bibel auf den Grund gehen.
				</p>
				<p>
					Uns ist es wichtig unseren Glauben auch und gerade im Alltag lebendig werden zu lassen und
					anderen Menschen Gott nahezubringen. Unser erklärtes Ziel ist den Glauben verständlich und
					vor allem auf einladende, zeitgemäße Weise zu vermitteln.
				</p>
			</div>
		</div>

		<div class="bg-primary absolute right-[52%] top-36 w-fit rounded-full px-12 py-10">
			<Fa size="3x" icon={faCross} />
		</div>

		<div class="bg-primary absolute left-[52%] top-36 rounded-full px-12 py-10">
			<Fa size="3x" icon={faChildReaching} />
		</div>
	</div>

	<div class="mt-10 grid justify-center gap-16 xl:grid-cols-2">
		<div
			class="relative flex max-w-4xl flex-col justify-center gap-2 rounded-md bg-white p-8 max-xl:mx-10 sm:px-16 sm:text-center md:rounded-full xl:px-20"
		>
			<div
				class="bg-primary absolute right-0 top-0 -translate-y-1/3 translate-x-1/3 rounded-full px-10 py-8 sm:hidden"
			>
				<Fa size="3x" icon={faLightbulb} />
			</div>
			<h1 class="text-primary text-4xl">DENKEN.</h1>
			<p>
				Denken heißt für uns sich dem Glauben auch interlektuell zu nähern. Wir begreifen unseren
				Verstand, unsere allgemeine Bildung und fachliche Ausbildung als gute Gaben Gottes, die es
				gilt sinnvoll und zweckmäßig einzusetzen.
			</p>
			<p>
				Wir wollen auch in schwierigen Glaubensthemen nicht einfach nur Antworten geben, sondern
				vielmehr gemeinsam mit anderen Studenten nach Antworten suchen. Wir wollen uns gegenseitig
				ermutigen und herausfordern, unsere Glaubensüberzeugungen mit dem Verstand zu erforschen und
				zu vertiefen.
			</p>
			<p>
				Dabei ist es uns wichtig, dass wir uns nicht nur mit uns selbst beschäftigen, sondern auch
				mit den Fragen und Problemen unserer Mitmenschen. Wir wollen uns mit den Fragen der Zeit
				auseinandersetzen und Antworten finden, die den Herausforderungen unserer Zeit gerecht
				werden.
			</p>
		</div>

		<div
			class="relative flex max-w-4xl flex-col justify-center gap-2 rounded-md bg-white p-8 max-xl:mx-10 sm:px-16 sm:text-center md:rounded-full xl:px-20"
		>
			<div
				class="bg-primary absolute right-0 top-0 -translate-y-1/3 translate-x-1/3 rounded-full px-10 py-8 sm:hidden"
			>
				<Fa size="3x" icon={faChildReaching} />
			</div>
			<h1 class="text-primary text-4xl">Erleben.</h1>
			<p>
				Erleben bedeutet für uns, einander begegnen und miteinander Gott begegnen - in Gruppen und
				Projektteams, bei Tagungen und Freizeiten, durch bloßes Dabeisein genso wie durch aktives
				Mitarbeiten.
			</p>
			<p>
				In regelmäßigen Abständen treffen wir uns als gesamte Gruppe, um gemeinsam zu essen, zu
				singen, zu beten und uns auszutauschen. Dabei ist uns die Gemeinschaft untereinander sehr
				wichtig. Deshalb treffen wir uns auch in kleineren Gruppen, den sogenannten Hauskreisen, um
				uns gegenseitig zu ermutigen und zu unterstützen.
			</p>
			<p>
				Diese Zeiten sollen gefüllt sein von lauter guten Erfahrungen, die uns in unserem Glauben
				stärken und uns ermutigen. Dies tun wir mit Gebet, Bibelgesprächen und Lobpreis, mit
				anspruchsvollen Vorträgen und vor allem mit viel Lachen und Spaß. Dabei begreifen wir die
				unterschiedliche Lebens- und Glaubenserfahrungen (Alter, Konfession, Nationalität ...) als
				große Bereicherung
			</p>
		</div>
	</div>
</main>
