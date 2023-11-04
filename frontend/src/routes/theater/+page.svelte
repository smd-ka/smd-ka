<script>
	import HeroShot from '$lib/components/HeroShot.svelte';
	import imgSrc from '$lib/assets/heroshots/theatre_heroshot.png';
	import src from '$lib/assets/theatre.png';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faCalendar, faLocationDot } from '@fortawesome/free-solid-svg-icons';
</script>

<HeroShot {imgSrc} title="Markustheater" />

<main class="card container mx-auto mt-10">
	<h1
		class="text-primary white text-center text-2xl tracking-[0.25em] md:tracking-[0.5em] lg:text-4xl"
	>
		DAS MARKUSTHEATER
	</h1>

	<div class="grid gap-4 md:grid-cols-2 md:gap-10 md:p-10 md:text-lg">
		<div class="flex flex-col gap-4">
			<div>
				Das gesamte Markusevangelium in 90 Minuten – ohne Requisiten, ohne Kostüme und als
				Rundtheater. Die Bühne? Die Mitte! Und Alles drum herum. Das bedeutet bist mittendrin und
				erlebst die Geschichte hautnah. Sei dabei!
			</div>

			<h3 class="text-primary text-xl md:text-2xl">Aufführungen</h3>

			<div class="bg-light-blue rounded-md p-4 text-white">
				<div class="flex items-center gap-2">
					<Fa icon={faCalendar} /> 27.11.23 um 20 Uhr
					<span class="max-md:hidden"> (Einlass ab 19:30 Uhr)</span>
				</div>
				<span class="md:hidden"> (Einlass ab 19:30 Uhr)</span>
				<div class="flex items-center gap-2">
					<Fa icon={faLocationDot} /> Erlöserkirche Karlsruhe
					<span class="max-md:hidden"> Hermann-Billing Straße 11</span>
				</div>
				<span class="md:hidden"> Hermann-Billing Straße 11</span>
			</div>

			<div class="bg-lime rounded-md p-4">
				<div class="flex items-center gap-2">
					<Fa icon={faCalendar} /> 27.11.23 um 20 Uhr
					<span class="max-md:hidden"> (Einlass ab 19:30 Uhr)</span>
				</div>
				<span class="md:hidden"> (Einlass ab 19:30 Uhr)</span>
				<div class="flex items-center gap-2">
					<Fa icon={faLocationDot} /> Foyer des KIT Audimax;
					<span class="max-md:hidden"> Straße am Forum 1</span>
				</div>
				<span class="md:hidden"> Straße am Forum 1</span>
			</div>
		</div>

		<img class="rounded-md" {src} alt="Lustige Person, die Apfelschlangen isst" />
	</div>
</main>
