<script lang="ts">
	import header from '$lib/assets/pages/events/semesterprogramm/voller_hoffnung_21_9.jpg';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import SemesterEventView from '../_components/SemesterEventView.svelte';
	import SemesterProgramSelector from '../_components/SemesterProgramSelector.svelte';
</script>

<HeroShot imgSrc={header} height={'h-[80svh]'} />

<main class="container mx-auto px-4 py-12">
	<section class="">
		<h2 class="pb-0 text-center">Unser Sommersemester 2025</h2>
		<h3 class=" text-primary font-caveat text-center">jeden zweiten Dienstag 18:30</h3>

		<p class="center pad py-6 text-center">
			Das aktuelle Weltgeschehen gibt viel Anlass zur Hoffnungslosigkeit. Vielleicht hast du es auch
			persönlich schon einmal erlebt. Wir sind davon überzeugt, dass es gute Gründe gibt zu Hoffen.
			Bei unseren Veranstaltungen in diesem Semester kannst du entdecken, was es bedeutet Hoffnung
			zu haben, worin sie liegt und wodurch sie begründet wird.

			<br />
			Du bist ganz herzlich eingeladen vorbeizuschauen. Wir freuen uns auf dich!
		</p>
	</section>

	<SemesterEventView start="2025-03-01" end="2025-09-01" />
</main>

<SemesterProgramSelector />
