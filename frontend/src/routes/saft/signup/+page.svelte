<script lang="ts">
	import { getErrorMessage, pb } from '$lib/pocketbase';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let errorMessage = $state('');

	onMount(() => {
		if (pb.authStore.isValid) goto('/saft/signup/form');
	});

	const login = async (event: Event) => {
		event.preventDefault();
		loading = true;
		try {
			await pb.collection('users').authWithPassword(email, password);
		} catch (e: any) {
			loading = false;
			errorMessage = getErrorMessage(e);
			return;
		}

		await pb.authStore.loadFromCookie(document.cookie);
		goto('/saft/signup/form');
	};
</script>

<main class="container mx-auto grid px-4 py-24">
	<h1 class="text-center text-5xl font-bold uppercase">SAFT Anmeldung</h1>
	<div class="py-8">
		<div class="grid gap-10 lg:grid-cols-[1fr_1rem_1fr]">
			<div class="flex flex-col items-center justify-center text-center text-lg md:px-10">
				<p class="py-4">
					Du hast kein Konto für SMD-KA Intern? <br />
					Dann kannst du dich hier ohne Konto anmelden:
				</p>
				<a
					class=" bg-black p-4 text-center text-white no-underline hover:underline max-md:w-full"
					href="/saft/signup/form">Ohne Konto anmelden</a
				>
			</div>

			<div class="relative bg-gray-300 max-md:h-0.5 md:w-0.5">
				<span
					class="text-secondary-text absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white pl-4 tracking-[1rem] md:rotate-90"
				>
					ODER
				</span>
			</div>

			<div class="flex justify-center">
				<form class="flex w-80 flex-col gap-4" onsubmit={login}>
					<h2 class="text-center text-xl">Anmelden Intern</h2>
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
					<div class="relative">
						<input
							bind:value={password}
							class="peer w-full rounded-md border-2 p-3"
							type="password"
							name="password"
							placeholder="Passwort"
							required
						/>
						<label
							for="password"
							class="absolute -top-2.5 left-3 bg-white px-1 text-[#555555] opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
						>
							Passwort
						</label>
					</div>
					{#if errorMessage}
						<p class="text-red-500">Ungültige E-Mail-Adresse oder Passwort</p>
					{/if}
					<button
						disabled={loading}
						class="relative flex items-center justify-center bg-black p-3 text-white"
					>
						{#if loading}
							<img class="absolute left-16 h-8" src={loadingSpinner} alt="loading" />
						{/if}
						Login</button
					>
					<a href="/account/reset" class="text-center text-sm text-gray-400 hover:underline"
						>Passwort vergessen?</a
					>
					<section class="text-center text-sm text-gray-400">
						Noch kein Konto?
						<a href="/account/register" class="text-primary hover:underline">Jetzt eins anlegen.</a>
					</section>
				</form>
			</div>
		</div>
	</div>
</main>
