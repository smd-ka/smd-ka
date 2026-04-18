<script lang="ts">
	import header from '$lib/assets/pages/events/semesterprogramm/aufsWassergehen_21_9.jpg';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import SemesterEventView from '../_components/SemesterEventView.svelte';
	import SemesterProgramSelector from '../_components/SemesterProgramSelector.svelte';

	export const prerender = true;
</script>

<HeroShot imgSrc={header} height="h-[80svh]" bgPosition="bg-[position:28%_center] md:bg-center" />

<main class="container mx-auto px-4 py-12">
	<section class="">
		<h2 class="pb-0 text-center">Unser Sommersemester 2026</h2>
		<h3 class="font-caveat text-primary text-center">jeden zweiten Dienstag 18:30</h3>

		<p class="center pad py-6 text-center">
			Bist du schon mal auf dem Wasser gelaufen? Nein? Wir auch nicht. Aber das ist Petrus auch
			nicht, bevor er es getan hat. Und genau darum soll es in diesem Semester gehen:
			<b> Aufs Wasser gehen – Gott vertrauen </b>
			<br />
			Inspiriert von Matthäus 14, 22-33, wo Jesus (und auch Petrus) auf dem Wasser wandelt, beschäftigen
			wir uns an unseren SMD-Abenden in diesem Semester mit dem Thema Vertrauen. Wie auch Petrus wollen
			wir lernen, auf Jesus zu schauen und ihm zu vertrauen, auch wenn die Umstände um uns herum stürmisch
			sind. Was das genau bedeutet? Das wollen wir gemeinsam herausfinden, und du bist herzlich eingeladen,
			dabei zu sein!
			<br />
			Wir freuen uns auf dich!
		</p>
	</section>

	<SemesterEventView start="2026-03-01" end="2026-10-01" />
</main>

<SemesterProgramSelector />
