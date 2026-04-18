<script lang="ts">
	import header from '$lib/assets/pages/events/semesterprogramm/weitergehen_21_9.jpg';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import SemesterEventView from '../_components/SemesterEventView.svelte';
	import SemesterProgramSelector from '../_components/SemesterProgramSelector.svelte';

	export const prerender = true;
</script>

<HeroShot imgSrc={header} height={'h-[80svh]'} />

<main class="container mx-auto px-4 py-12">
	<section class="">
		<h2 class="pb-0 text-center">Unser Wintersemester 2025/26</h2>
		<h3 class="font-caveat text-primary text-center">jeden zweiten Dienstag 18:30</h3>

		<p class="center pad py-6 text-center">
			Unser Semesterthema WeiterGehen lädt dich dazu ein im Glauben einen Schritt weiter zu gehen.
			Was heißt das? Das kann bedeuten sich mal kritisch mit dem christlichen Glauben und dem, was
			er zu bieten hat, auseinanderzusetzen, es kann aber auch bedeuten sich zu fragen, wie man ein
			Leben im Glauben denn jetzt genau gestaltet.

			<br />
			Du bist ganz herzlich eingeladen - Wir freuen uns auf dich!
		</p>
	</section>

	<SemesterEventView start="2025-10-01" end="2026-03-01" />
</main>

<SemesterProgramSelector />
