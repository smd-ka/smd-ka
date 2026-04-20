<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import LoginForm from '$lib/components/LoginForm.svelte';

	onMount(() => {
		if (pb.authStore.isValid) goto('/intern');
	});
</script>

<main class="flex justify-center gap-4 md:py-24">
	<div class="md:rounded-md md:border">
		<LoginForm />
	</div>
</main>
