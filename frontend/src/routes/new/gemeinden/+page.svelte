<script lang="ts">
	import church from '$lib/assets/pages/new/church_21_9.jpg';
	import background from '$lib/assets/pages/events/semesterprogramm/bg.png';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import Fa from 'svelte-fa';
	import {
		faArrowRight,
		faArrowUpRightFromSquare,
		faCalendar,
		faCalendarDays,
		faClock,
		faClockFour,
		faLocationDot,
		faTimeline
	} from '@fortawesome/free-solid-svg-icons';
</script>

<HeroShot height={'h-[70svh]'} imgSrc={church} bgPosition={'bg-[center_50%]'}></HeroShot>
<main class="container mx-auto px-4 py-12">
	<h1 class="font-caveat text-primary text-center normal-case">
		Die SMD ist das Bindeglied zwischen Campus und Gemeinde
	</h1>

	<p>
		Die SMD-Karlsruhe ist überkonfessionell. Wir sind und wollen bewusst in Gemeinden verwurzelt
		sein. Unser SMD-Generalsekretär, Genort Spies drückt es folgendermaßen aus: "Wenn SMD-Arbeit
		nicht in die Gemeinde hineinführt, dann hat sie ihr Ziel verfehlt." Die SMD kann und will keine
		Gemeinde und auch kein Gemeinde-Ersatz sein. Gemeinde ist immer mehr als etwa eine
		Hochschulgruppe. Unsere Gruppe nimmt nur ausschnitthaft und zeitweise einige gemeindliche
		Aufgaben wahr. Aus unserer Gruppe soll missionarisches, lebendiges Christsein hervorgehen, das
		im Horizont des Reiches Gottes steht - eingebunden in den Leib Christi, verbunden mit
		Ortsgemeinden, angewiesen auf deren Gebet und Unterstützung.
		<br />

		<a class="text-primary fa" href="https://www.smd.org/smd/ueber-uns/smd-und-gemeinde">
			<Fa icon={faArrowRight} />
			Mehr zum Thema SMD und Gemeinde
		</a>
		<br />

		Als SMD-Karlsruhe sind wir Teil der evangelischen Allianz und stehen im regen Austausch mit den
		Gemeinden. Wir genießen es, dass unsere SMDler aus so vielen verschiedenen Gemeinden und
		Hintergründen in unserer Gruppe zusammenkommen. Um dir die Suche nach einer Gemeinde etwas zu
		erleichtern, falls du noch keine hast, haben wir für dich unten eine kleine Auflistung von
		Gemeinden in die SMDler regelmäßig gehen. Die evangelische Allianz ist groß;
		<a class="text-primary" href="https://evalka.de/lerne-uns-kennen">
			eine volle Liste aller Gemeinden und Mitglieder findest du hier.
		</a>
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
				<p class="fa"><Fa icon={faClock} /> Sonntag, 10:45 Uhr</p>
				<p class="fa">
					<Fa icon={faLocationDot} /> Innenstadt-West; Reinhold-Frank-Straße 44A
				</p>
				<p><strong>Teilnehmer:</strong> ca. 120 Personen</p>
				<p>Davor gibt es um 10 Uhr immer gemeinsames Gebets und Lobpreis, sowie Abendmahl.</p>
			</div>
			<!-- Freie evangelische Gemeinde (FeG) -->
			<div class="church-tile">
				<h3 class="mb-2 text-xl font-semibold">
					<a class="fa" href="https://karlsruhe.feg.de/" target="_blank" rel="noopener noreferrer"
						>Freie evangelische Gemeinde (FeG)

						<Fa icon={faArrowUpRightFromSquare} />
					</a>
				</h3>
				<p class="fa"><Fa icon={faClock} /> Sonntag, 9:30 und 11:15 Uhr</p>
				<p class="fa">
					<Fa icon={faLocationDot} /> Nordstadt; Am Wald 2
				</p>
				<p><strong>Teilnehmer:</strong> ca. 150 Personen</p>
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
				<p class="fa"><Fa icon={faClock} /> Sonntag, 11:00 Uhr</p>
				<p class="fa">
					<Fa icon={faLocationDot} /> Innenstadt-West; Amalienstraße 77
				</p>
				<p><strong>Teilnehmer:</strong> ca. 50 Personen</p>
				<p>Alle zwei Wochen Kirchengottesdienst, in den anderen finden Kirchengruppen statt.</p>
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
				<p class="fa"><Fa icon={faClock} /> Sonntag, 9:30, 11:15 und 18:30 Uhr</p>
				<p class="fa">
					<Fa icon={faLocationDot} /> Grünwinkel; Amalienstraße 77
				</p>
				<p><strong>Teilnehmer:</strong> ca. 300 Personen</p>
				<p>Nach dem Abendgottesdienst trifft sich immer die Young-Adults-Community</p>
			</div>

			<!-- Landeskirchliche Gemeinschaft -->
			<div class="church-tile">
				<h3 class="mb-2 text-xl font-semibold">
					<a
						class="fa"
						href="https://www.lkg-karlsruhe.de/"
						target="_blank"
						rel="noopener noreferrer"
						>Landeskirchliche Gemeinschaft (LKG)
						<Fa icon={faArrowUpRightFromSquare} />
					</a>
				</h3>
				<p class="fa"><Fa icon={faClock} /> Sonntag, 10 Uhr</p>
				<p class="fa">
					<Fa icon={faLocationDot} /> Südweststadt; Gartenstraße 6
				</p>
				<p><strong>Teilnehmer:</strong> ca. 50 Personen</p>
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
						Treffpunkt Leben
						<Fa icon={faArrowUpRightFromSquare} />
					</a>
				</h3>
				<p class="fa"><Fa icon={faClock} /> Sonntag, 9:30 und 11:45 Uhr</p>
				<p class="fa">
					<Fa icon={faLocationDot} /> Grünwinkel; Herrmann-Leichtlin-Straße 15
				</p>
				<p><strong>Teilnehmer:</strong> ca. 200 Personen</p>
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
