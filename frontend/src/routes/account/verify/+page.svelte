<script>
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/intern');
	});
</script>

<main class="container mx-auto py-24 text-center">
	<h3 class="font-caveat text-5xl">Schön, dass du da bist {pb.authStore.model?.name}</h3>
	<div class="mt-4">
		<b class="uppercase">Dein Acount wird gerade verifiziert</b>
	</div>

	<div class="mt-8 flex justify-center">
		<p class="max-w-xs">
			Das bedeutet, dass wir deine Angaben überprüfen und dich dann freischalten. Das kann ein
			bisschen Zeit brauchen. Solltest du es eilig haben, schreib einfach dem PRIT-Team.
		</p>
	</div>
</main>
