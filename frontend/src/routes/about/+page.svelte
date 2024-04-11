<script lang="ts">
	import header from '$lib/assets/heroshots/karlsruhe.jpeg';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

	import denken from '$lib/assets/about/denken.png';
	import glauben from '$lib/assets/about/glauben.png';
	import erleben from '$lib/assets/about/erleben.png';
	import felix from '$lib/assets/about/Felix.jpeg';
	import leitung from '$lib/assets/about/leitungsteam.png';

	let showDenken = false;
	let showGlauben = false;
	let showErleben = false;

	let statements = [
		{
			image: felix,
			name: 'Felix',
			subject: 'Physik',
			statement:
				'Die SMD ist ein super Ort, um unglaublich viel für das Leben mitzunehmen. Man kann im Glauben gestärkt werden oder auch überhaupt erst mal was darüber erfahren, aber auch Verantwortung übernehmen. Und man lernt Leute kennen, die etwas komplett anderes studieren und denken als man selber. '
		},
		{
			image: felix,
			name: 'Felix',
			subject: 'Physik',
			statement:
				'Die SMD ist ein super Ort, um unglaublich viel für das Leben mitzunehmen. Man kann im Glauben gestärkt werden oder auch überhaupt erst mal was darüber erfahren, aber auch Verantwortung übernehmen. Und man lernt Leute kennen, die etwas komplett anderes studieren und denken als man selber. '
		},
		{
			image: felix,
			name: 'Felix',
			subject: 'Physik',
			statement:
				'Die SMD ist ein super Ort, um unglaublich viel für das Leben mitzunehmen. Man kann im Glauben gestärkt werden oder auch überhaupt erst mal was darüber erfahren, aber auch Verantwortung übernehmen. Und man lernt Leute kennen, die etwas komplett anderes studieren und denken als man selber. '
		},
		{
			image: felix,
			name: 'Felix',
			subject: 'Physik',
			statement:
				'Die SMD ist ein super Ort, um unglaublich viel für das Leben mitzunehmen. Man kann im Glauben gestärkt werden oder auch überhaupt erst mal was darüber erfahren, aber auch Verantwortung übernehmen. Und man lernt Leute kennen, die etwas komplett anderes studieren und denken als man selber. '
		}
	];
</script>

<HeroShot imgSrc={header} />
<main class="container mx-auto flex flex-col gap-24 py-24 text-lg">
	<div class="container flex flex-col gap-6 px-4 xl:px-80">
		<h1 class="text-5xl font-bold uppercase">Über uns</h1>

		<p>
			Die <a class="text-primary" href="https://www.smd.org/hochschul-smd/startseite"
				>Hochschul-SMD</a
			> ist ein Netzwerk christlicher Hochschulgruppen. Wir sind eine von ca. 80 anderen SMD-Gruppen
			in ganz Deutschland. Ein wesentlicher Teil des christlichen Glaubens ist nach unserem Verständnis
			Kommunikation: Gott teilt sich uns durch die Bibel und andere Menschen mit. Deshalb tauschen wir
			uns untereinander über Glaubensfragen aus und sprechen mit unseren Kommilitonen über das, was uns
			bewegt. Denken, glauben und erleben gehören für uns dabei zusammen.
		</p>
	</div>

	<div class="grid lg:grid-cols-3">
		<button class="flex flex-col items-center" on:click={() => (showDenken = !showDenken)}>
			<img src={glauben} alt="Kopf mit Glühbrine" />
			<h3 class="text-3xl font-bold uppercase">Denken</h3>

			<div class="menu grid justify-center px-8 {showDenken ? 'open' : ''} ">
				<div class="overflow-hidden">
					<p>
						Wir finden, dass Denken und Glauben nicht im Widerspruch stehen. Deshalb greifen wir
						immer wieder wissenschaftliche Themen auf, um sie vom Glauben her zu denken. Dazu laden
						wir Experten ein und veranstalten auch gelegentlich größere Vorträge an der Uni.
					</p>
				</div>

				<div
					class="flex w-full justify-center py-2 transition-transform delay-[400ms] duration-200
                {showDenken ? 'rotate-180' : ''}"
				>
					<Fa icon={faChevronDown} />
				</div>
			</div>
		</button>

		<button class="flex flex-col items-center" on:click={() => (showGlauben = !showGlauben)}>
			<img src={erleben} alt="Kopf mit Glühbrine" />
			<h3 class="text-3xl font-bold uppercase">Denken</h3>

			<div class="menu grid justify-center px-8 {showGlauben ? 'open' : ''} ">
				<div class="overflow-hidden">
					<p>
						Wir sind Christen unterschiedlicher Konfessionen, Wege und Erfahrungen. Die
						Hochschulgruppe ist ein Raum, sich auszutauschen, im Glauben zu wachsen und voneinander
						zu lernen. Wir treffen uns regelmäßig zum gemeinsamen Bibellesen und Beten.
					</p>
				</div>

				<div
					class="flex w-full justify-center py-2 transition-transform delay-[400ms] duration-200
                {showGlauben ? 'rotate-180' : ''}"
				>
					<Fa icon={faChevronDown} />
				</div>
			</div>
		</button>

		<button class="flex flex-col items-center" on:click={() => (showErleben = !showErleben)}>
			<img src={denken} alt="Kopf mit Glühbrine" />
			<h3 class="text-3xl font-bold uppercase">Denken</h3>

			<div class="menu grid justify-center px-8 {showErleben ? 'open' : ''} ">
				<div class="overflow-hidden">
					<p>
						Erleben ist für uns Gemeinschaft leben: gemeinsam Sport machen, Ausflüge, Spieleabende…
						Aber auch: unseren Glauben leben und für andere erlebbar machen. Zum Beispiel mit
						Theateraufführungen oder Aktionen auf dem Campus.
					</p>
				</div>

				<div
					class="flex w-full justify-center py-2 transition-transform delay-[400ms] duration-200
                {showErleben ? 'rotate-180' : ''}"
				>
					<Fa icon={faChevronDown} />
				</div>
			</div>
		</button>
	</div>

	<div class="flex flex-col gap-8 px-4 xl:px-80">
		<h1 class="text-4xl font-bold uppercase md:text-5xl">Warum wir bei der SMD sind.</h1>

		<div class="grid gap-4 md:grid-cols-2">
			{#each statements as statement}
				<div class="bg-[#EDEDED]">
					<img src={statement.image} alt="Profilbild" />
					<div class="flex flex-col gap-6 p-4">
						<h3 class="font-bold">{statement.subject}</h3>
						<h2 class="text-2xl font-bold uppercase">{statement.name}</h2>
						<p>{statement.statement}</p>
					</div>
				</div>
			{/each}
		</div>
		<div id="orga"></div>
	</div>

	<div class="flex flex-col gap-8 px-4 xl:px-80">
		<h1 class="break-words text-4xl font-bold uppercase md:text-5xl">
			Hochschul-SMD <br /> Ein deutschlandweites Netzwerk
		</h1>
		<div>
			Als Hochschulgruppe der SMD sind wir eine ehrenamtliche Initiative. Unterstützt werden wir von
			einer hauptamtlichen Regionalreferentin und ehrenamtlichen Gruppenbegleitern (SMDler, die ihr
			Studium schon hinter sich gebracht haben.) Wenn du wissen möchtest, wie die Hochschul-SMD
			überregional aufgebaut ist, schau dir <a
				class="text-primary"
				href="https://www.smd.org/hochschul-smd/hochschul-smd/herzlich-willkommen/"
			>
				diese Seite
			</a> an.
		</div>
	</div>

	<div class="flex flex-col gap-8 px-4 xl:px-80">
		<h1 class="text-4xl font-bold uppercase md:text-5xl">Leitungsteam</h1>

		<div class="grid gap-8 lg:grid-cols-2 lg:gap-16">
			<div class="flex flex-col items-center">
				<img src={leitung} class="rounded-full" alt="Leitungsteam" />
				<p class="pt-2">Felix R., Maike, Felix M. (von links nach rechts)</p>
			</div>
			<div>
				Unsere Leitung wird jedes Semester von der Gruppe gewählt. Momentan leiten Felix M., Felix
				R. und Maike unsere Gruppe. Felix ist 21 und studiert Umweltingenieurwesen (Bau), Felix M.
				ist 23 und studiert Physik und Maike ist 24 und studiert Grundschullehramt.
			</div>
		</div>
	</div>

	<div id="mitarbeit">
		<h1 class="text-4xl font-bold uppercase md:text-5xl">Mitarbeit</h1>
		TODO Mitarbeit
		<div id="sup"></div>
	</div>

	<div class="flex flex-col gap-8 px-4 xl:px-80">
		<h1 class="text-4xl font-bold uppercase md:text-5xl">Unterstützung</h1>

		<div class="grid gap-8 md:grid-cols-[1fr_3fr]">
			<h2 class="text-3xl font-bold uppercase">Gebet</h2>
			<p>
				Bete, dass Gottes Liebe an unserer Hochschule sichtbar wird, Gott uns als Hochschulgruppe
				gebraucht und Studierende Jesus kennen lernen können.
			</p>

			<h2 class="text-3xl font-bold uppercase">Mitarbeit</h2>
			<p>
				Du hast Interresse bei uns in der Gruppe mitzuarbeiten? Du bist herzlich willkommen!
				Kontaktiere uns, schau bei einem unserer Gruppenabende vorbei und steig mit ein. Wir freuen
				uns auf dich.
			</p>

			<h2 class="text-3xl font-bold uppercase">Spenden</h2>

			<div class="grid gap-8">
				<p>
					Neben Engagement und Gebet lebt unsere Arbeit auch von finanzieller Unterstützung. Wir
					freuen uns, wenn du uns unterstützt. Weitere Infos zur Finanzierung der SMD findest du
					hier.
				</p>

				<ul class="font-bold">
					<li>SMD e. V.</li>
					<li>Evangelische Bank, Kassel</li>
					<li>IBAN: DE75 5206 0410 0000 8004 57</li>
					<li>Verwendungzweck: H-SMD Gruppe Karlsruhe</li>
				</ul>

				<p class="font-bold">
					Wir danken dir für deine Spende, sie hilft uns dabei auch in Zukunft diese wichtige Arbeit
					fortzuführen.
				</p>
			</div>
		</div>
		<div>
			Wenn du über die aktuelle Aktionen und Anliegen der Gruppe informiert werden möchtest, kannst
			du uns gerne unter dieser Email Adresse <a href="mailto:leiter@smd-karlsruhe.de"
				>leiter@smd-karlsruhe.de</a
			> nach unserem Freundesbrief nachfragen. Im Freundesbrief stehen alle aktuellen und wichtigen Informationen
			sowie unsere Gebetsanliegen der Gruppe.
		</div>
	</div>
</main>

<style>
	.menu {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 400ms;
	}

	.open {
		grid-template-rows: 1fr;
	}
</style>
