<script lang="ts">
	import type { LayoutData } from '../$types';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import SemesterEventView from '../_components/SemesterEventView.svelte';
	import SemesterProgramSelector from '../_components/SemesterProgramSelector.svelte';

	export let data: LayoutData;
</script>

<HeroShot
	imgSrc={data.program.image}
	height={'h-[80svh]'}
	title="{data.program.title} - {data.program.subtitle}"
/>

<main class="container mx-auto px-4 py-12">
	<section class="">
		<h1 class="text-center font-anton font-bold tracking-wide text-primary">
			Herzens<span class="bordered-text text-white">sache</span>
		</h1>
		<h2 class="pb-0 text-center">Unser Sommersemester 2024</h2>
		<h3 class="text-center font-caveat text-primary">jeden zweiten Dienstag 18:30</h3>
	</section>

	<SemesterEventView events={data.events} />
</main>

<SemesterProgramSelector />

<style>
	.bordered-text {
		-webkit-text-stroke: 2px #e84c05; /* width and color */
	}
</style>
