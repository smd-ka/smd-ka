<script lang="ts">
	import header from '$lib/assets/pages/events/semesterprogramm/herzenssache_21_9.jpg';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import SemesterEventView from '../_components/SemesterEventView.svelte';
	import SemesterProgramSelector from '../_components/SemesterProgramSelector.svelte';

	export const prerender = true;
</script>

<HeroShot imgSrc={header} height={'h-[80svh]'} />

<main class="container mx-auto px-4 py-12">
	<section class="">
		<h1 class="font-anton text-primary text-center font-bold tracking-wide">
			Herzens<span class="bordered-text text-white">sache</span>
		</h1>
		<h2 class="pb-0 text-center">Unser Sommersemester 2024</h2>
		<h3 class=" text-primary font-caveat text-center">jeden zweiten Dienstag 18:30</h3>
	</section>

	<SemesterEventView start="2024-03-01" end="2024-09-01" />
</main>

<SemesterProgramSelector />

<style>
	.bordered-text {
		-webkit-text-stroke: 2px #e84c05; /* width and color */
	}
</style>
