<script lang="ts">
	import Saos from 'saos';
	import header from '$lib/assets/heroshots/karlsruhe.jpeg';
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
	import sloganBg from '$lib/assets/heroshots/slogan-bg.jpg';
	import sloganBgSm from '$lib/assets/heroshots/slogan-bg-sm.jpg';
	import placeholder from '$lib/assets/placeholder.jpg';
	import placeholder2 from '$lib/assets/placeholder1.jpg';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import TextArea from '$lib/components/forms/TextArea.svelte';
	import CheckboxInput from '$lib/components/forms/CheckboxInput.svelte';
	import saft_heroshot from '$lib/assets/heroshots/saft_heroshot.png';
</script>

<HeroShot imgSrc={header} />
<div class="bg-primary text-grey z-10 px-4 py-8 text-center text-4xl font-bold md:hidden md:py-4">
	Herzlich Willkommen bei der Hochschul-SMD <br class="md:hidden" />
	<span class="text-white">Karlsruhe</span>
</div>

<main class="container mx-auto flex flex-col gap-24 py-24 text-lg">
	<div class="container flex flex-col gap-6 px-4 xl:px-80">
		<h1 class="text-5xl font-bold uppercase">SCHÖN, DASS DU HIER BIST!</h1>
		<p>
			Zwischen Uni-Alltag und WG-Wahnsinn haben wir einen Treffpunkt, an dem Studierende aus allen
			Ecken der Hochschule zusammenkommen. Uns verbindet der Wunsch nach Gemeinschaft, Diskussion
			und gelebtem Glauben.
		</p>
		<p>
			In unserer Hochschulgruppe sind alle herzlich willkommen. Egal was dein Hintergrund ist und
			was du glaubst, wir freuen uns auf dich!
		</p>

		<p>
			Wir sind aktuell rund 60 Studierende aller Fachrichtungen, kommen aus verschiedenen Kirchen
			und Gemeinden und wünschen uns, dass jeder Student und jede Studentin von der guten Nachricht
			von Jesus hören kann.
		</p>
	</div>

	<Saos
		animation={'slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
		animation_out={'slide-out-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
	>
		<div class="relative py-20">
			<h1
				class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-4xl uppercase text-white lg:text-5xl"
			>
				Denken. Glauben. Erleben.
			</h1>
			<img class="z-0 max-lg:hidden" alt="Werte der Hochschul-SMD" src={sloganBg} />
			<img class="z-0 lg:hidden" alt="Werte der Hochschul-SMD" src={sloganBgSm} />
		</div>
	</Saos>

	<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
		<div class="grid gap-8 px-4 lg:grid-cols-2 xl:px-80">
			<img alt="Semesterprogramm" src={placeholder} />

			<div class="flex flex-col gap-4">
				<h1 class="text-5xl font-bold uppercase">Was wir machen</h1>
				<p>
					Im Semester treffen wir uns abwechselnd zum Gruppentreff und in Hauskreisen. Beide sind
					eine Mischung aus Input, Austausch und Gemeinschaft – wir wollen gemeinsam nachdenken und
					Spaß haben.
				</p>
				<a href="semesterprogramm" class="w-fit bg-black p-4 text-white">Semesterprogramm</a>
			</div>
		</div>
	</Saos>

	<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
		<div class="grid gap-8 px-4 lg:grid-cols-2 xl:px-80">
			<div class="flex flex-col gap-4 text-right">
				<h1 class="text-5xl font-bold uppercase">Wie du uns erreichst</h1>
				<p>
					Du möchtest regelmäßige Infos erhalten, hast eine Frage an uns oder ein anderes Anliegen?
					Schreib eine Mail an Felix aus unserem Leitungsteam.
				</p>
				<a href="leiter@smd-karlsruhe.de" class="w-fit self-end bg-black p-4 text-white"
					>Schreib uns ne mail</a
				>
			</div>
			<img alt="Semesterprogramm" src={placeholder} />
		</div>
	</Saos>

	<div class="relative my-20">
		<div
			class="h-[400px] bg-cover bg-[center_top_34%] opacity-80"
			style="background-image: url({saft_heroshot});"
		/>

		<div class="absolute left-14 top-14 text-white">
			<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
				<div class="flex flex-col gap-4">
					<h1 class="text-5xl">SemesterAnfangsFreizeiT</h1>
					<p>From the Inside out</p>
					<a href="/saft" class="w-fit bg-black p-4 text-white">Weitere Infos</a>
				</div>
			</Saos>
		</div>
	</div>

	<div class="flex flex-col gap-8 px-4 xl:px-80">
		<div class="flex flex-col">
			<h1 class="text-4xl font-bold uppercase lg:text-5xl">DU MÖCHTEST MEHR ERFAHREN?</h1>
			<h1 class="self-end text-4xl font-bold uppercase lg:text-5xl">SCHREIB UNS.</h1>
		</div>
		<h2 class="text-3xl lg:text-4xl">Kontakt aufnehmen</h2>
		<TextInput label="Name" />
		<TextInput label="Betreff" />
		<TextInput label="Deine E-Mail-Addresse" />
		<TextArea label="Deine Nachricht" />
		<CheckboxInput
			id="datenschutz"
			label="Ich bin damit einverstanden, dass meine Daten zur Bearbeitung meines Anliegens verwendet werden."
		/>
		<button class="bg-primary w-fit p-4 text-white">Abschicken</button>
	</div>

	<!-- <div class="card mt-8">
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
			Deshalb treffen wir uns regelmäßig in Hauskreisen oder alle zusammen als Großgruppe bei
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
				Projektteams, bei Tagungen und Freizeiten, durch bloßes Dabeisein genauso wie durch aktives
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
	</section> -->
</main>

<style>
	@keyframes -global-slide-in {
		0% {
			transform: translateY(200vh);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes -global-slide-in-bottom {
		0% {
			transform: translateY(30vh);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes -global-slide-out-bottom {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
