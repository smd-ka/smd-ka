<script lang="ts">
	import { getErrorMessage, pb } from '$lib/pocketbase';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';
	import { goto } from '$app/navigation';

	let email = '';
	export let loading = false;
	let errorMessage = '';

	const login = async () => {
		loading = true;
		try {
			await pb.collection('users').requestPasswordReset(email);
		} catch (e: any) {
			loading = false;
			errorMessage = getErrorMessage(e);
			return;
		}

		goto('/');
	};
</script>

<main class="flex justify-center">
	<div class="mt-24 w-80 rounded-md bg-white shadow-md">
		{#if loading}
			<div class="my-20 flex items-center justify-center">
				<img src={loadingSpinner} class=" h-32" alt="loading" />
			</div>
		{:else}
			<form class="flex w-80 flex-col gap-4 p-4" on:submit={login}>
				<h1 class="py-5 text-center text-2xl">SMD-KA Intern</h1>
				<div class="relative">
					<input
						bind:value={email}
						class="peer w-full rounded-md border-2 p-3"
						type="email"
						name="email"
						placeholder="E-Mail-Adresse"
						required
					/>
					<label
						for="email"
						class="absolute -top-2.5 left-3 bg-white px-1 text-[#555555] opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
					>
						E-Mail-Adresse
					</label>
				</div>

				<button class="bg-primary rounded-md py-2 text-white">Passwort zurücksetzen</button>
			</form>
		{/if}
	</div>
</main>
