<script lang="ts">
	import header from '$lib/assets/header.png';
	import Calendar from '$lib/components/Calendar.svelte';
	import Insta from '$lib/components/Calendar.svelte';
</script>

<div
	class=" h-96 brightness-105 bg-cover bg-[center_top_58rem]"
	style="background-image: url({header});"
/>

<main class="container mx-auto flex flex-col gap-8">
	<div class="card mt-10">
		<h1 class="text-xl text-primary">SCHÖN, DASS DU HIER BIST!</h1>
		<p>
			Willkommen auf der Website der Studenten Mission Karlsruhe. Uns verbindet der Wunsch nach
			Gemeinschaft, Diskussion und gelebtem Glauben.
		</p>
	</div>

	<div class="card">
		<Calendar />
	</div>
</main>
