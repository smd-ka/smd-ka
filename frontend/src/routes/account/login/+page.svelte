<script lang="ts">
	import { getErrorMessage, pb, type UserRecord } from '$lib/pocketbase';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { checkIfUserExistsInAuthentik, createUserInAuthentik } from './authentik';
	import type { RecordAuthResponse } from 'pocketbase';

	let email = '';
	let password = '';
	let loading = false;
	let errorMessage = '';

	onMount(() => {
		if (pb.authStore.isValid) goto('/intern');
	});

	const login = async () => {
		loading = true;
		try {
			const res: RecordAuthResponse<UserRecord> = await pb
				.collection('users')
				.authWithPassword(email, password);
			console.log('success', res.record.email);
			if (res.record.verified) {
				createUserInAuthentik(res);
			}

			handleRedirect();
		} catch (e: any) {
			loading = false;
			errorMessage = getErrorMessage(e);
			return;
		}
	};

	// For testing purposes for now
	const loginOAuth = async () => {
		loading = true;
		try {
			await pb.collection('users').authWithOAuth2({
				provider: 'oidc'
			});
			handleRedirect();
		} catch (e: any) {
			loading = false;
			errorMessage = 'Der Login mit authentik hat nicht geklappt.';
		}
	};

	const handleRedirect = () => {
		const urlParams = new URLSearchParams(window.location.search);
		const redirect = urlParams.get('redirect');
		if (redirect) {
			goto(redirect);
		}
		goto('/intern');
	};
</script>

<main class="flex justify-center gap-4 md:py-24">
	<div class="flex w-96 flex-col items-center gap-4 py-6 md:rounded-md md:border">
		<section>
			{#if loading}
				<div class="my-20 flex items-center justify-center">
					<img src={loadingSpinner} class="h-32" alt="loading" />
				</div>
			{:else}
				<form method="post" class="flex w-80 flex-col gap-4 p-4" on:submit={login}>
					<h2>SMD-KA intern</h2>
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
					<button class="bg-black py-2 text-white">Log in</button>
					<button on:click={loginOAuth} class="border-2 border-black py-1.5"
						>Log in with OAuth</button
					>
					<a href="/account/reset" class="text-center text-sm text-gray-400 hover:underline"
						>Passwort vergessen?</a
					>
				</form>
			{/if}
		</section>

		<section class="text-center text-sm text-gray-400">
			Noch kein Konto?
			<a href="/account/register" class="text-primary hover:underline">Jetzt eins anlegen.</a>
		</section>
	</div>
</main>
