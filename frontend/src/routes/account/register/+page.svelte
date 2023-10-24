<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';

	let form = {
		name: '',
		email: '',
		fieldOfStudy: '',
		startOfStudy: '',
		anniversary: '',
		phonenumber: '',
		team: '',
		password: '',
		passwordConfirm: '',
		address: '',
		profilePicture: ''
	};

	const formData = new FormData();

	let loading = false;
	let error: any = {};

	const register = async (event: Event) => {
		event.preventDefault();
		loading = true;
		if (form.password !== form.passwordConfirm) {
			error.passwordConfirm = -1;
			return;
		}

		formData.append('documents', form.profilePicture);

		try {
			await pb.collection('users').create({
				name: form.name,
				username: form.name.toLocaleLowerCase().replace(/\s/g, ''),
				email: form.email,
				password: form.password,
				passwordConfirm: form.passwordConfirm,
				field_of_study: form.fieldOfStudy,
				start_of_study: form.startOfStudy,
				anniversary: form.anniversary,
				phonenumber: form.phonenumber,
				team: form.team,
				address: form.address,
				avatar: (document.getElementById('avatar') as HTMLInputElement).files?.item(0)
			});
			await pb.collection('users').requestVerification(form.email);
		} catch (e: any) {
			loading = false;
			error = e.data.data;
			console.log(error);
			return;
		}

		await pb.collection('users').authWithPassword(form.email, form.password);
		goto('/intern');
	};
</script>

<main class="flex justify-center">
	<form
		class=" mt-24 flex w-80 flex-col gap-4 rounded-md bg-white p-4 shadow-md"
		on:submit={register}
	>
		<h1 class="py-5 text-center text-2xl">SMD-KA Interner Bereich Registrierung</h1>

		<div class="relative">
			<input
				bind:value={form.name}
				class="peer w-full rounded-md border-2 p-3"
				name="name"
				placeholder="Name"
				disabled={loading}
				required
			/>
			<label
				for="name"
				class="absolute -top-2.5 left-3 bg-white px-1 text-[#555555] opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
			>
				Name
			</label>
		</div>

		<div class="relative">
			<input
				bind:value={form.email}
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
				bind:value={form.password}
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
				bind:value={form.passwordConfirm}
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

		<div class="relative my-4 h-0.5 bg-gray-300">
			<span
				class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-white px-2 text-[#555555]"
				>Optionale Angaben</span
			>
		</div>

		<div class="relative">
			<input
				bind:value={form.profilePicture}
				class="peer w-full rounded-md border-2 p-3"
				name="avatar"
				placeholder="SMD Bereich"
				disabled={loading}
				type="file"
			/>
			<label
				for="avatar"
				class="absolute -top-2.5 left-3 bg-white px-1 text-[#555555] opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
			>
				Profile Picture
			</label>
		</div>

		<div class="relative">
			<input
				bind:value={form.anniversary}
				class="peer w-full rounded-md border-2 p-3"
				name="anniversary"
				placeholder="Geburtstag"
				disabled={loading}
				type="date"
			/>
			<label
				for="anniversary"
				class="absolute -top-2.5 left-3 bg-white px-1 text-[#555555] opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
			>
				Geburtstag
			</label>
		</div>

		<div class="relative">
			<input
				bind:value={form.phonenumber}
				class="peer w-full rounded-md border-2 p-3"
				name="phonenumber"
				placeholder="Telefonnummer"
				inputmode="tel"
				type="tel"
				disabled={loading}
			/>
			<label
				for="phonenumber"
				class="absolute -top-2.5 left-3 bg-white px-1 text-[#555555] opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
			>
				Telefonnummer
			</label>
		</div>

		<div class="relative">
			<input
				bind:value={form.address}
				class="peer w-full rounded-md border-2 p-3"
				name="address"
				placeholder="Adresse"
				disabled={loading}
			/>
			<label
				for="address"
				class="absolute -top-2.5 left-3 bg-white px-1 text-[#555555] opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
			>
				Adresse
			</label>
		</div>

		<div class="relative">
			<input
				bind:value={form.team}
				class="peer w-full rounded-md border-2 p-3"
				name="team"
				placeholder="SMD Bereich"
				disabled={loading}
			/>
			<label
				for="team"
				class="absolute -top-2.5 left-3 bg-white px-1 text-[#555555] opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
			>
				SMD Bereich
			</label>
		</div>

		<div class="relative">
			<input
				bind:value={form.fieldOfStudy}
				class="peer w-full rounded-md border-2 p-3"
				name="fieldOfStudy"
				placeholder="Studienfach"
				disabled={loading}
			/>
			<label
				for="fieldOfStudy"
				class="absolute -top-2.5 left-3 bg-white px-1 text-[#555555] opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
			>
				Studienfach
			</label>
		</div>

		<div class="relative">
			<input
				bind:value={form.startOfStudy}
				class="peer w-full rounded-md border-2 p-3"
				name="startOfStudy"
				placeholder="Studienbeginn"
				disabled={loading}
				type="date"
			/>
			<label
				for="startOfStudy"
				class="absolute -top-2.5 left-3 bg-white px-1 text-[#555555] opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
			>
				Studienbeginn
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
