<script lang="ts">
	import header from '$lib/assets/header-calendar.png';
	import CalendarMonth from '$lib/components/CalendarMonth.svelte';
</script>

<div class="relative">
	<span
		class="bg-light-blue absolute right-0 top-64 z-10 bg-opacity-90 px-4 py-4 text-center text-2xl text-white md:top-48 lg:py-8 lg:text-4xl"
		>Denken. Glauben. Erleben.</span
	>
	<h1 class="absolute left-1/2 top-32 z-10 -translate-x-1/2 text-8xl text-white">Kalender</h1>
	<div
		class=" h-96 bg-cover bg-[center_top_34%] opacity-90 brightness-105"
		style="background-image: url({header});"
	/>
</div>

<main class="container mx-auto">
	<div class="card mt-10">
		<CalendarMonth />
	</div>
</main>
