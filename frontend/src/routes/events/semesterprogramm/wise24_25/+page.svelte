<script lang="ts">
	import type { LayoutData } from '../$types';
	import header from '$lib/assets/pages/events/semesterprogramm/outsidethebox_21_9.jpg';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import SemesterEventView from '../_components/SemesterEventView.svelte';
	import SemesterProgramSelector from '../_components/SemesterProgramSelector.svelte';

	export let data: LayoutData;
</script>

<HeroShot imgSrc={header} height={'h-[80svh]'} />

<main class="container mx-auto px-4 py-12">
	<section class="">
		<h1 class="font-gagalin text-primary text-center tracking-wide">Outside the Box</h1>
		<h2 class="pb-0 text-center">Unser Wintersemester 2024/25</h2>
		<h3 class=" text-primary font-caveat text-center">jeden zweiten Dienstag 18:30</h3>
	</section>

	<SemesterEventView events={data.events} />
</main>

<SemesterProgramSelector />
