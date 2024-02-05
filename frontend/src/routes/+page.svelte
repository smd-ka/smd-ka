<script lang="ts">
	import header from '$lib/assets/header.png';
	import Instagram from '$lib/components/Instagram.svelte';
	import {
		faCalendarDays,
		faChildReaching,
		faClock,
		faCross,
		faLightbulb,
		faLocationDot
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import CalendarList from '$lib/components/CalendarList.svelte';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import ifesLogo from '$lib/assets/logos/ifes.png';
	import smdLogo from '$lib/assets/logos/smd.png';
</script>

<HeroShot imgSrc={header} />

<main class="container mx-auto flex flex-col gap-8">
	<div class="card mt-8">
		<h1 class=" text-2xl lg:text-3xl">
			<span class="text-primary">FESD</span> - <bold class="text-primary font-bold">F</bold>est am
			<bold class="text-primary font-bold">E</bold>nde des
			<bold class="text-primary font-bold">S</bold>emesters aus
			<bold class="text-primary font-bold">D</bold>ankbarkeit
		</h1>
		<p class="mt-2">
			Wir wollen feiern! Zum Ende des Semesters aus Dankbarkeit.
			<br />Und dazu geht es am Dienstag, den 20.02.24, in die Laurenziusgemeinde
			<a class="underline" href="https://maps.app.goo.gl/YnzFavtQyqm9Qupt7"
				>(Schäferstraße 13, 76139 Karlsruhe)</a
			>
			in Hagsfeld. Start ist um 18:30 Uhr, das Essen wird um 19 Uhr starten. Wir wollen uns in einer
			stimmungsvollen Atmosphäre bei euch allen bedanken für alles, was ihr in der SMD im letzten Semester
			in Bewegung gebracht habt. Und natürlich danken wir auch dem, der das alles möglich macht. Hierzu
			wird es an dem Abend ein gutes Essen geben. Zieht euch sehr gerne auch etwas gehobener an ;) Zwischen
			den Gängen gibt es ein buntes Programm.
			<br />
			<br />
		</p>
		<div>
			<a class="bg-primary w-fit rounded-md px-4 py-2" href="/fesd">Jetzt Anmelden</a>
		</div>
	</div>

	<div class="card">
		<h1 class="text-primary text-2xl lg:text-3xl">Was geht? - Nächste Events</h1>
		<div class="grid gap-8 md:grid-cols-[1fr_300px]">
			<CalendarList />
			<Instagram />
		</div>
	</div>

	<div id="about-us" class="card scroll-m-24">
		<h1 class="text-primary text-2xl lg:text-3xl">Über uns</h1>
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

	<div class="grid gap-14 lg:grid-cols-2">
		<div class="relative mt-10 flex-col gap-2 rounded-md bg-white p-8 max-sm:mx-10">
			<div
				class="bg-primary absolute right-0 top-0 -translate-y-1/3 translate-x-1/3 rounded-full px-10 py-8"
			>
				<Fa size="3x" icon={faCross} />
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

		<div class="relative mt-10 flex flex-col gap-2 rounded-md bg-white p-8 max-sm:mx-10">
			<div
				class="bg-primary absolute right-0 top-0 -translate-y-1/3 translate-x-1/3 rounded-full px-10 py-8"
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

		<div class="relative col-span-full flex flex-col gap-2 rounded-md bg-white p-8 max-sm:mx-10">
			<div
				class="bg-primary absolute right-0 top-0 -translate-y-1/3 translate-x-1/3 rounded-full px-10 py-8"
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

	<section class="grid gap-8 md:grid-cols-2">
		<div class="card grid gap-2">
			<h1 class="text-primary text-2xl lg:text-3xl">Netzwerk</h1>
			Die Hochschul-SMD Karlsruhe gehört zur Hochschul-SMD, einem deutschlandweiten Netzwerk Christlicher
			Hochschulgruppen. Die Hochschul-SMD ihrerseits ist teil des International Fellowship of Evangelical
			Students. Somit sind wir also auch Teil von IFES. Ein großes interantionales Netzwerk von Christlichen
			Studenten, die die gute Nachricht ausleben.
			<div class="grid grid-cols-2 gap-10">
				<a class="text-primary justify-self-end p-4 underline" href="https://www.smd.org/">
					<img alt="Logo der SMD" class="w-36" src={smdLogo} />
					www.smd.org
				</a>
				<a href="https://www.ifesworld.org/" class="text-primary p-4 underline">
					<img alt="Logo der IFES" class="w-36" src={ifesLogo} />
					www.ifesworld.org
				</a>
			</div>
		</div>

		<div class="card grid h-fit gap-2">
			<h1 class="text-primary text-2xl lg:text-3xl">Spenden</h1>

			<p>
				Du möchtest unsere Arbeit in Karlsruhe unterstützen? Dann freuen wir uns über dein Gebet und
				deine Spende! Die Spenden werden von unserer Zentralstelle in Marburg verwaltet und an uns
				weitergeleitet. Unter der Angabe einer Adresse im Verwendungzweck kann so auch eine
				Spendenbescheingung ausgestellt werden. Dazu einfach den Verwendungzweck beachten. Vielen
				Dank!
			</p>
			<ul class="bg-light-blue mt-2 rounded p-8 text-white">
				<li>SMD e. V.</li>
				<li>Evangelische Bank, Kassel</li>
				<li>IBAN: DE75 5206 0410 0000 8004 57</li>
				<li>BIC: GENODEF1EK1</li>
				<li>Verwendungzweck: H-SMD Gruppe Karlsruhe</li>
			</ul>
		</div>
	</section>
</main>
