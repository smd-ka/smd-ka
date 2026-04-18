<script lang="ts">
	import header from '$lib/assets/pages/events/semesterprogramm/aufsWassergehen_21_9.jpg';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import dayjs from 'dayjs';
	import type { PageData } from './$types';
	import SemesterProgramSelector from './_components/SemesterProgramSelector.svelte';

	export let data: PageData;
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

	<section class="grid gap-x-24 gap-y-6 py-12 xl:grid-cols-2">
		{#each data.events as event}
			<div class="grid grid-cols-[6rem_1fr] gap-2">
				<h3>
					{dayjs(event.start_date_time).format('DD.MM.')}
				</h3>
				<div>
					<a href={`/events/kalender/${event.id}`} class="hover:underline">
						<h3>
							{event.title}
						</h3>
					</a>
					<div>
						{#if event.speaker}
							<span class="italic">
								{event.speaker}
							</span>
							|
						{/if}
						<a href={event.location_url} class="hover:underline">
							{event.location}
						</a>
					</div>
				</div>
			</div>
		{/each}
	</section>
</main>

<SemesterProgramSelector />
