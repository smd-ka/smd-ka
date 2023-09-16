<script lang="ts">
	import header from '$lib/assets/header.jpg';
	import Calendar from '$lib/components/Calendar.svelte';
	import Insta from '$lib/components/Calendar.svelte';
</script>

<div
	class=" h-96 bg-cover bg-[center_top_60%] brightness-105"
	style="background-image: url({header});"
/>

<main class="container mx-auto flex flex-col gap-8">
	<div class="card mt-10">
		<h1 class="text-primary text-xl">SCHÖN, DASS DU HIER BIST!</h1>
		<p>
			Willkommen auf der Website der Studenten Mission Karlsruhe. Uns verbindet der Wunsch nach
			Gemeinschaft, Diskussion und gelebtem Glauben.
		</p>
	</div>

	<div class="card">
		<Calendar />
	</div>
</main>
