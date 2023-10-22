<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';

	let data = {
		username: '',
		email: '',
		password: '',
		passwordConfirm: ''
	};

	let loading = false;
	let error: any = {};

	const register = async () => {
		loading = true;
		if (data.password !== data.passwordConfirm) {
			error.passwordConfirm = -1;
			return;
		}

		try {
			await pb.collection('users').create({
				username: data.username,
				email: data.email,
				password: data.password,
				passwordConfirm: data.passwordConfirm
			});
			await pb.collection('users').requestVerification(data.email);
		} catch (e: any) {
			loading = false;
			error = e.data.data;
			console.log(error);
			return;
		}

		await pb.collection('users').authWithPassword(data.email, data.password);
		goto('/');
	};
</script>

<main class="flex justify-center">
	<form
		class="mt-24 flex w-80 flex-col gap-4 rounded-md bg-white p-4 shadow-md"
		on:submit={register}
	>
		<h1 class="py-5 text-center text-2xl">SMD-KA Interner Bereich Registrierung</h1>

		<div class="relative">
			<input
				bind:value={data.username}
				class="peer w-full rounded-md border-2 p-3 {error.username ? 'border-red-500' : ''}"
				name="username"
				placeholder="Name"
				disabled={loading}
				required
			/>
			<label
				for="username"
				class="absolute -top-2.5 left-3 bg-white px-1 text-[#555555] opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
			>
				Name
			</label>
			{#if error.username}
				<p class="px-3 text-sm text-red-500">Dieser Benutzername ist schon vergeben</p>
			{/if}
		</div>

		<div class="relative">
			<input
				bind:value={data.email}
				class="peer w-full rounded-md border-2 p-3 {error.email ? 'border-red-500' : ''}"
				type="email"
				name="email"
				placeholder="E-Mail-Adresse"
				disabled={loading}
				required
			/>
			<label
				for="email"
				class="absolute -top-2.5 left-3 bg-white px-1 text-[#555555] opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
			>
				E-Mail-Adresse
			</label>
			{#if error.email}
				<p class="px-3 text-sm text-red-500">
					Diese E-Mail-Adresse ist ungültig oder bereits in Verwendung
				</p>
			{/if}
		</div>

		<div class="relative">
			<input
				bind:value={data.password}
				class="peer w-full rounded-md border-2 p-3 {error.password || error.passwordConfirm
					? 'border-red-500'
					: ''}"
				type="password"
				name="password"
				placeholder="Passwort"
				disabled={loading}
				required
			/>
			<label
				for="password"
				class="absolute -top-2.5 left-3 bg-white px-1 text-[#555555] opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
			>
				Passwort
			</label>
		</div>
		<div class="relative">
			<input
				bind:value={data.passwordConfirm}
				class="peer w-full rounded-md border-2 p-3 {error.passwordConfirm || error.password
					? 'border-red-500'
					: ''}"
				type="password"
				name="passwordConfirm"
				placeholder="Passwort wiederholen"
				disabled={loading}
				required
			/>
			{#if error?.passwordConfirm === -1}
				<p class="px-3 text-sm text-red-500">Die Passwörter stimmen nicht überein</p>
			{:else if error?.password}
				<p class="px-3 text-sm text-red-500">
					Das Passwort muss mindestens acht Zeichen lang sein.
				</p>
			{/if}
			<label
				for="passwordConfirm"
				class="absolute -top-2.5 left-3 bg-white px-1 text-[#555555] opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
			>
				Passwort wiederholen
			</label>
		</div>

		<button
			disabled={loading}
			class="bg-primary relative flex items-center justify-center rounded-md py-2 text-white"
		>
			{#if loading}
				<img class="absolute left-16 h-8" src={loadingSpinner} alt="loading" />
			{/if}
			Registieren</button
		>
	</form>
</main>
