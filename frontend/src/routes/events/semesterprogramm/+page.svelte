<script lang="ts">
	import header from '$lib/assets/pages/events/semesterprogramm/outsidethebox_21_9.jpg';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import dayjs from 'dayjs';
	import type { PageData } from './$types';
	import SemesterProgramSelector from './SemesterProgramSelector.svelte';

	export let data: PageData;
</script>

<HeroShot imgSrc={header} height={'h-[80svh]'} />

<main class="container mx-auto px-4 py-12">
	<section class="">
		<h1 class="font-gagalin text-primary text-center tracking-wide">Outside the Box</h1>
		<h2 class="pb-0 text-center">Unser Wintersemester 2024/25</h2>
		<h3 class=" text-primary font-caveat text-center">jeden zweiten Dienstag 18:30</h3>
	</section>

	<section class="grid gap-x-24 gap-y-6 py-12 md:grid-cols-2">
		{#each data.events as event}
			<div class="grid grid-cols-[6rem_1fr] gap-2">
				<h3>
					{dayjs(event.start_date_time).format('DD.MM.')}
				</h3>
				<div>
					<h3>
						{event.title}
					</h3>
					<div>
						{#if event.speaker}
							<span class="italic">
								{event.speaker}
							</span>
							|
						{/if}
						{event.location}
					</div>
				</div>
			</div>
		{/each}
	</section>
</main>

<SemesterProgramSelector />
