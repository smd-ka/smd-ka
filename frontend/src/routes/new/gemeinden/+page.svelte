<script lang="ts">
	import church from '$lib/assets/pages/new/church_21_9.jpg';
	import background from '$lib/assets/pages/events/semesterprogramm/bg.png';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import Fa from 'svelte-fa';
	import {
		faArrowRight,
		faArrowUpRightFromSquare,
		faClock,
		faLocationDot
	} from '@fortawesome/free-solid-svg-icons';
</script>

<HeroShot height={'h-[70svh]'} imgSrc={church} bgPosition={'bg-[center_50%]'}></HeroShot>
<main class="container mx-auto px-4 py-12">
	<h1 class="font-caveat text-primary text-center normal-case">
		"Die SMD ist das Bindeglied zwischen Campus und Gemeinde"
	</h1>

	<p>
		Die SMD-Karlsruhe ist eine übergemeindliche und überkonfessionelle Hochschulgruppe. Obwohl wir
		unser Angebot sich mit dem einer Gemeinde an der ein oder anderen Stelle überschneidet, ist es
		uns wichtig, dass du auch eine Gemeinde vor Ort findest, in der du dich geistlich zu Hause
		fühlst. Wir sind der Überzeugung, dass die SMD nicht die Gemeinde ersetzen kann und soll. Die
		SMD ist viel mehr das Bindeglied zwischen Campus und Gemeinde. Gernot Spies, der
		SMD-Generalsekretär, drückt es folgendermaßen aus: "Wenn SMD-Arbeit nicht in die Gemeinde
		hineinführt, dann hat sie ihr Ziel verfehlt." Aus unserer Gruppe soll missionarisches,
		lebendiges Christsein hervorgehen, das im Horizont des Reiches Gottes steht - eingebunden in den
		Leib Christi, verbunden mit Ortsgemeinden, angewiesen auf deren Gebet und Unterstützung.
		<br />

		<a class="text-primary fa" href="https://www.smd.org/smd/ueber-uns/smd-und-gemeinde">
			<Fa icon={faArrowRight} />
			Mehr zum Thema SMD und Gemeinde
		</a>
		<br />

		Als SMD-Karlsruhe sind wir Teil der evangelischen Allianz Karlsruhe und stehen somit im regen
		Austausch mit den verschiedenen lokalen Gemeinden. (Eine Auflistung der evangelischen Allianz
		findest du <a class="text-primary" href="https://evalka.de/lerne-uns-kennen"> hier</a>). Wir
		schätzen es, dass unsere SMDler aus so vielen verschiedenen Gemeinden und Hintergründen in
		unserer Gruppe zusammenkommen. Um dir die Suche nach einer Gemeinde etwas zu erleichtern, falls
		du noch keine hast, findest du unten eine kleine Auswahl. Sprich gerne SMDler an und frage sie,
		wo sie in Karlsruhe zu Hause sind. Vielleicht ist das ja auch eine gute Möglichkeit, um neue
		Leute kennenzulernen.
		<br />
		Am Anfang von jedem Wintersemester bieten wir das sogenannte Church Hopping an, bei dem du die Möglichkeit
		hast, verschiedene Gemeinden in Karlsruhe kennenzulernen. Mehr dazu erfährtst du auf unserer
		<a class="text-primary" href="/new/erstsemester">Erstsemester-Seite</a>.
	</p>
</main>

<section style="background-image: url({background});">
	<div class="container mx-auto px-4 py-12">
		<h2 class="text-center">Finde dein geistliches Zuhause</h2>

		<div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			<!-- Christliche Gemeinde -->
			<div class="church-tile">
				<h3 class="mb-2 text-xl font-semibold">
					<a
						class="fa"
						href="https://www.cg-karlsruhe.de/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Christliche Gemeinde (CG)
						<Fa icon={faArrowUpRightFromSquare} />
					</a>
				</h3>
				<div class="grid grid-cols-[1.5rem_1fr] items-center">
					<Fa icon={faClock} />
					<p>Sonntag, 10:45 Uhr</p>
					<Fa icon={faLocationDot} />
					<p>Innenstadt-West; Reinhold-Frank-Straße 44A</p>
				</div>
				<p><strong>Besucher:</strong> ca. 120 Personen</p>
				<p>Davor gibt es um 10:00 Uhr immer gemeinsames Gebet und Lobpreis, sowie Abendmahl.</p>
			</div>

			<!-- Freie evangelische Gemeinde (FeG) -->
			<div class="church-tile">
				<h3 class="mb-2 text-xl font-semibold">
					<a class="fa" href="https://karlsruhe.feg.de/" target="_blank" rel="noopener noreferrer"
						>Freie evangelische Gemeinde (FeG)

						<Fa icon={faArrowUpRightFromSquare} />
					</a>
				</h3>
				<div class="grid grid-cols-[1.5rem_1fr] items-center">
					<Fa icon={faClock} />
					<p>Sonntag, 9:30 Uhr und 11:15 Uhr</p>
					<Fa icon={faLocationDot} />
					<p>Nordstadt; Am Wald 2</p>
				</div>
				<p><strong>Besucher:</strong> ca. 150 Personen je Gottesdienst</p>
				<p>In den Ferien findet nur ein Gottesdienst um 10:00 Uhr statt.</p>
			</div>

			<!-- Fächerkirche -->
			<div class="church-tile">
				<h3 class="mb-2 text-xl font-semibold">
					<a class="fa" href="https://faecherkirche.de/" target="_blank" rel="noopener noreferrer">
						Fächerkirche
						<Fa icon={faArrowUpRightFromSquare} />
					</a>
				</h3>
				<div class="grid grid-cols-[1.5rem_1fr] items-center">
					<Fa icon={faClock} />
					<p>Sonntag, 11:00 Uhr</p>
					<Fa icon={faLocationDot} />
					<p>Innenstadt-West; Amalienstraße 77</p>
				</div>
				<p class="fa"></p>
				<p><strong>Besucher:</strong> ca. 50 Personen</p>
				<p>
					Zwei Formate, jeweils im Wechsel: Storytelling (in Kleingruppen) und Kirchengottesdienst
				</p>
			</div>

			<!-- International Christian Fellowship (ICF) -->
			<div class="church-tile">
				<h3 class="mb-2 text-xl font-semibold">
					<a
						class="fa"
						href="https://www.icf-karlsruhe.de/"
						target="_blank"
						rel="noopener noreferrer"
					>
						International Christian Fellowship (ICF)
						<Fa icon={faArrowUpRightFromSquare} />
					</a>
				</h3>
				<div class="grid grid-cols-[1.5rem_1fr] items-center">
					<Fa icon={faClock} />
					<p>Sonntag, 9:30 Uhr, 11:15 Uhr und 18:30 Uhr</p>
					<Fa icon={faLocationDot} />
					<p>Grünwinkel; Griesbachstraße 10b</p>
				</div>
				<p><strong>Besucher:</strong> ca. 300 Personen je Gottesdienst</p>
				<p>
					Nach dem etwas jugendlicher gestalteten Abendgottesdienst trifft sich immer die
					Young-Adults-Community.
				</p>
			</div>

			<!-- Landeskirchliche Gemeinschaft -->
			<div class="church-tile">
				<h3 class="mb-2 text-xl font-semibold">
					<a
						class="fa"
						href="https://www.lkg-karlsruhe.de/"
						target="_blank"
						rel="noopener noreferrer"
						>Landeskirchliche Gemeinschaft (LkG)
						<Fa icon={faArrowUpRightFromSquare} />
					</a>
				</h3>
				<div class="grid grid-cols-[1.5rem_1fr] items-center">
					<Fa icon={faClock} />
					<p>Sonntag, 10:00 Uhr</p>
					<Fa icon={faLocationDot} />
					<p>Südweststadt; Gartenstraße 6</p>
				</div>
				<p><strong>Besucher:</strong> ca. 50 Personen</p>
			</div>

			<!-- Treffpunkt Leben -->
			<div class="church-tile">
				<h3 class="mb-2 text-xl font-semibold">
					<a
						class="fa"
						href="https://treffpunkt-leben.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Treffpunkt Leben (TL)
						<Fa icon={faArrowUpRightFromSquare} />
					</a>
				</h3>
				<div class="grid grid-cols-[1.5rem_1fr] items-center">
					<Fa icon={faClock} />
					<p>Sonntag, 9:30 Uhr und 11:45 Uhr</p>
					<Fa icon={faLocationDot} />
					<p>Grünwinkel; Herrmann-Leichtlin-Straße 15</p>
				</div>
				<p><strong>Besucher:</strong> ca. 200 Personen</p>
			</div>
		</div>
	</div>
</section>

<style>
	.church-tile {
		@apply flex flex-col rounded-lg bg-white p-6 shadow hover:scale-[101%];
	}

	a {
		@apply hover:text-primary hover:underline;
	}
</style>
