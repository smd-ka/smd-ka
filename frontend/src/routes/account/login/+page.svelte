<script lang="ts">
	import { getErrorMessage, pb } from '$lib/pocketbase';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let loading = false;
	let errorMessage = '';

	const login = async () => {
		loading = true;
		try {
			await pb.collection('users').authWithPassword(email, password);
		} catch (e: any) {
			loading = false;
			errorMessage = getErrorMessage(e);
			return;
		}

		await pb.authStore.loadFromCookie(document.cookie);
		const urlParams = new URLSearchParams(window.location.search);
		const redirect = urlParams.get('redirect');
		if (redirect) {
			goto(redirect);
		}
		goto('/intern');
	};
</script>

<main class="flex flex-col items-center gap-4">
	<div class="card mt-24">
		{#if loading}
			<div class="my-20 flex w-80 items-center justify-center">
				<img src={loadingSpinner} class="h-32" alt="loading" />
			</div>
		{:else}
			<form method="post" class="flex w-80 flex-col gap-4 p-4" on:submit={login}>
				<h1 class="text-primary py-5 text-center text-2xl">SMD-KA INTERN</h1>
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
				<button class="bg-primary rounded-md py-2 text-white">Log in</button>
				<a href="/account/reset" class="text-center text-sm text-gray-400 hover:underline"
					>Passwort vergessen?</a
				>
			</form>
		{/if}
	</div>

	<div class="card w-96 text-center text-sm text-gray-400">
		Noch kein Konto?
		<a href="/account/register" class="text-primary hover:underline">Jetzt eins anlegen.</a>
	</div>
</main>
