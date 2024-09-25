<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import type { ClientResponseError } from 'pocketbase';
	import EmailInput from '$lib/components/forms/EmailInput.svelte';
	import PasswordInput from '$lib/components/forms/PasswordInput.svelte';
	import GenderInput from '$lib/components/forms/GenderInput.svelte';

	let loading = false;
	let emailError: 'invalid' | 'taken' | undefined;
	let passwordError: 'not matching' | 'too short' | undefined;
	let unknowError: boolean = false;

	const convert = (str: string) => str.toLocaleLowerCase().replace(/[^\w]/gi, '');

	const register = async (event: Event) => {
		const form = document.getElementById('form') as HTMLFormElement;
		let formData = new FormData(form);
		const email = formData.get('email')?.toString() || '';
		const password = formData.get('password')?.toString() || '';
		console.log(formData.get('passwordConfirm')?.toString(), password);
		if (password !== formData.get('passwordConfirm')?.toString()) {
			passwordError = 'not matching';
			return;
		} else if (password.length < 8) {
			passwordError = 'too short';
			return;
		}
		loading = true;

		console.log(formData);

		const username =
			convert(formData.get('name')?.toString() || '') +
			convert(formData.get('surname')?.toString() || '');

		formData.append('username', username);
		formData.append('emailVisibility', 'true');

		try {
			const record = await pb.collection('users').create(formData);
			await pb.collection('users').requestVerification(email);
			await pb.collection('users').authWithPassword(email, password);
		} catch (e) {
			const error = e as ClientResponseError;
			console.error(error.data);
			if (error.data?.data?.email?.message === 'Must be a valid email address.') {
				emailError = 'invalid';
			} else if (error.data?.data?.email?.message === 'The email is invalid or already in use.') {
				emailError = 'taken';
			} else {
				unknowError = true;
			}
			loading = false;
			return;
		}

		loading = false;
		goto('/intern/profile?new=true');
	};
</script>

<main class="flex justify-center py-12">
	<form
		id="form"
		class=" mt-8 grid w-full max-w-[28rem] gap-4 p-8 md:rounded-md md:border"
		on:submit|preventDefault={register}
	>
		<div class="flex justify-center text-7xl">
			<Fa icon={faRightToBracket} />
		</div>

		<div>
			<h2 class="pb-0 text-center">SMD-KA intern</h2>
			<h3 class="text-center">Registrierung</h3>
		</div>

		{#if unknowError}
			<div>
				Es ist ein unbekannter Fehler aufgetreten, falls dieser auch nach erneutem Veruschen besteht
				melde dich bitte beim Prit-Team
			</div>
		{/if}

		<TextInput label="Name" name="name" disabled={loading} required />
		<TextInput label="Nachname" name="surname" disabled={loading} required />
		<EmailInput
			label="E-Mail-Addresse"
			name="email"
			error={emailError ? true : false}
			disabled={loading}
			required
		/>

		{#if emailError === 'invalid'}
			<p class="px-3 text-sm text-red-500">Diese E-Mail-Adresse ist ungültig.</p>
		{:else if emailError === 'taken'}
			<p class="px-3 text-sm text-red-500">Diese E-Mail-Adresse ist bereits vergeben.</p>
		{/if}

		<GenderInput />

		<PasswordInput label="Passwort" name="password" disabled={loading} required />
		<PasswordInput label="Passwort bestätigen" name="passwordConfirm" disabled={loading} required />
		{#if passwordError === 'not matching'}
			<p class="px-3 text-sm text-red-500">Die Passwörter stimmen nicht überein</p>
		{:else if passwordError === 'too short'}
			<p class="px-3 text-sm text-red-500">Das Passwort muss mindestens acht Zeichen lang sein.</p>
		{/if}

		<button
			disabled={loading}
			class="relative mt-4 flex items-center justify-center bg-black py-2 text-white"
		>
			{#if loading}
				<img class="absolute left-16 h-8" src={loadingSpinner} alt="loading" />
			{/if}
			Registieren
		</button>
		<section class="text-center text-sm text-gray-400">
			Schon ein Konto?
			<a href="/account/login" class="text-primary hover:underline">Jetzt einloggen.</a>
		</section>
	</form>
</main>
