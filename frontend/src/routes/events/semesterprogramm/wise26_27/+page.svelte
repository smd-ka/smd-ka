<script lang="ts">
	import type { LayoutData } from '../$types';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import SemesterEventView from '../_components/SemesterEventView.svelte';
	import SemesterProgramSelector from '../_components/SemesterProgramSelector.svelte';

	export let data: LayoutData;
</script>

<HeroShot imgSrc={data.program.image} height="h-[80svh]" bgPosition="bg-[position:center] md:bg-center" title="{data.program.title} - {data.program.subtitle}" />

<main class="container mx-auto px-4 py-12">
	<section class="">
		<h2 class="pb-0 text-center">Unser Wintersemester 2026/27</h2>
		<h3 class="font-caveat text-primary text-center">jeden zweiten Dienstag 18:30</h3>

		<p class="center pad py-6 text-center">
		</p>
	</section>

	<SemesterEventView events={data.events} />
</main>

<SemesterProgramSelector />
