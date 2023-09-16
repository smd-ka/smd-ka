<script lang="ts">
	import header from '$lib/assets/header.png';
	import groupPicture from '$lib/assets/group-picture.png';
	import frame from '$lib/assets/frame.svg';
	import Calendar from '$lib/components/Calendar.svelte';
	import Insta from '$lib/components/Calendar.svelte';
</script>

<div class="relative">
	<span
		class="bg-primary absolute right-0 top-64 z-10 bg-opacity-90 px-4 py-4 text-center text-2xl text-white md:top-48 lg:py-8 lg:text-4xl"
		>Denken. Glauben. Erleben.</span
	>
	<div
		class=" h-96 bg-cover bg-[center_top_60%] brightness-105"
		style="background-image: url({header});"
	/>
</div>

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
					class="absolute -top-4 left-8 z-10 rotate-3 scale-125 lg:left-10"
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
		<Calendar />
	</div>

	<div id="about-us" class="card">
		<h1 class="text-primary text-2xl lg:text-4xl">Über uns</h1>
		<p class="mt-2">
			Die Hochschul-SMD Karlsruhe ist eine überkonfessionelle, christliche Studentengruppe mit ca.
			60 Studenten von Erstsemestern bis Doktoranden - alles ist dabei. Wir treffen uns wöchentlich
			abwechselnd in Hauskreisen oder alle als Großgruppe bei unserem Gruppentreff. Interesse
			geweckt? Dann schau doch mal bei einem unserer regelmäßigen Treffen vorbei!
		</p>
	</div>
</main>
