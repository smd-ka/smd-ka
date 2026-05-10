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
	import { RecommendedChurches } from './data';
</script>

<HeroShot height={'h-[70svh]'} imgSrc={church} bgPosition={'bg-[center_50%]'}></HeroShot>
<main class="container mx-auto px-4 py-12">
	<h1 class="font-caveat text-primary text-center normal-case">
		"Die SMD ist das Bindeglied zwischen Campus und Gemeinde"
	</h1>

	<p>
		Die SMD-Karlsruhe ist eine übergemeindliche und überkonfessionelle Hochschulgruppe. Uns ist es
		wichtig, dass du auch eine Gemeinde vor Ort findest, in der du dich geistlich zu Hause fühlst.
		Wir sind der Überzeugung, dass die SMD nicht die Gemeinde ersetzt. Die SMD ist viel mehr das
		Bindeglied zwischen Campus und Gemeinde. Gernot Spies, der SMD-Generalsekretär, drückt es
		folgendermaßen aus: "Wenn SMD-Arbeit nicht in die Gemeinde hineinführt, dann hat sie ihr Ziel
		verfehlt." Aus unserer Gruppe soll missionarisches, lebendiges Christsein hervorgehen, das im
		Horizont des Reiches Gottes steht - eingebunden in den Leib Christi, verbunden mit
		Ortsgemeinden, angewiesen auf deren Gebet und Unterstützung.
		<br />

		<a class="text-primary fa" href="https://www.smd.org/smd/ueber-uns/smd-und-gemeinde">
			<Fa icon={faArrowRight} />
			Lies mehr, was die Zusammenarbeit von SMD und Gemeinden ausmacht.
		</a>
		<br />

		Als SMD-Karlsruhe sind wir Teil der evangelischen Allianz Karlsruhe und stehen somit im regen
		Austausch mit den verschiedenen lokalen Gemeinden. (Eine Auflistung der evangelischen Allianz
		findest du <a class="text-primary" href="https://evalka.de/lerne-uns-kennen"> hier</a>). Wir
		schätzen es, dass unsere SMDler aus so vielen verschiedenen Gemeinden und Hintergründen in
		unserer Gruppe zusammenkommen. Um dir die Suche nach einer passenden Gemeinde etwas zu
		erleichtern findest du unten eine kleine Auswahl. Sprich gerne SMDler an und frage sie, was sie
		an ihrer Gemeinde schätzen. Vielleicht ist das ja auch eine gute Möglichkeit, um neue Leute
		kennenzulernen.
		<br />
		Am Anfang jedes Wintersemesters bieten wir das sogenannte "Church Hopping" an. So hast du die Möglichkeit
		in kurzer Zeit mehrere Gemeinden kennenzulernen. Mehr dazu erfährst du auf unserer
		<a class="text-primary" href="/new/erstsemester">Erstsemester-Seite</a>.
	</p>
</main>

<section style="background-image: url({background});">
	<div class="container mx-auto px-4 py-12">
		<h2 class="text-center">Finde dein geistliches Zuhause</h2>

		<div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each RecommendedChurches as church}
				<div class="church-tile">
					<h3 class="mb-2 text-xl font-semibold">
						<a class="fa" href={church.url} target="_blank" rel="noopener noreferrer">
							{church.name}
							<Fa icon={faArrowUpRightFromSquare} />
						</a>
					</h3>
					<div class="grid grid-cols-[1.5rem_1fr] items-center">
						<Fa icon={faClock} />
						<p>{church.timings}</p>
						<Fa icon={faLocationDot} />
						<p>{church.location}</p>
					</div>
					<p><strong>Besucher:</strong> {church.attenderNumber}</p>
					{#if church.comment}
						<p>{church.comment}</p>
					{/if}
				</div>
			{/each}
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
