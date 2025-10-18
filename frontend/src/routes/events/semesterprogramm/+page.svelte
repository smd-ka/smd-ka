<script lang="ts">
	import header from '$lib/assets/pages/events/semesterprogramm/weitergehen_21_9.jpg';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import dayjs from 'dayjs';
	import type { PageData } from './$types';
	import SemesterProgramSelector from './SemesterProgramSelector.svelte';

	export let data: PageData;
</script>

<HeroShot imgSrc={header} height={'h-[80svh]'} />

<main class="container mx-auto px-4 py-12">
	<section class="">
		<h2 class="pb-0 text-center">Unser Wintersemester 2025/26</h2>
		<h3 class=" text-primary font-caveat text-center">jeden zweiten Dienstag 18:30</h3>

		<p class="center pad py-6 text-center">
			Unser Semesterthema WeiterGehen lädt dich dazu ein im Glauben einen Schritt weiter zu gehen.
			Was heißt das? Das kann bedeuten sich mal kritisch mit dem christlichen Glauben und dem, was
			er zu bieten hat, auseinanderzusetzen, es kann aber auch bedeuten sich zu fragen, wie man ein
			Leben im Glauben denn jetzt genau gestaltet.

			<br />
			Du bist ganz herzlich eingeladen - Wir freuen uns auf dich!
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
