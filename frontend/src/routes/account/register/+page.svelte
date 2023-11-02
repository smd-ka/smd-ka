<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import type { SendableUser } from '$lib/models';
	import { faPencil } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import defaultAvatar from '$lib/assets/user_default.png';

	let src = defaultAvatar;

	let form: SendableUser = {
		name: '',
		email: '',
		surname: '',
		field_of_study: '',
		start_of_studies: '',
		birthday: '',
		phonenumber: '',
		team: '',
		password: '',
		passwordConfirm: '',
		address: '',
		username: '',
		avatar: undefined
	};

	const formData = new FormData();

	const showPreview = (event: Event) => {
		const files = (event.target as HTMLInputElement).files;
		if (files && files.length > 0) {
			src = URL.createObjectURL(files[0]);
			formData.append('avatar', files[0]);
		}
	};

	let loading = false;
	let error: any = {};

	const register = async (event: Event) => {
		event.preventDefault();
		loading = true;
		if (form.password !== form.passwordConfirm) {
			error.passwordConfirm = -1;
			return;
		}

		form.username =
			form.name.toLocaleLowerCase().replace(/[^\w]/gi, '') +
			form.surname.toLocaleLowerCase().replace(/[^\w]/gi, '');

		console.log(form.username);
		formData.append('username', form.username);
		formData.append('name', form.name);
		formData.append('surname', form.surname);
		formData.append('email', form.email);
		formData.append('password', form.password);
		formData.append('passwordConfirm', form.passwordConfirm);
		formData.append('field_of_study', form.field_of_study || '');
		formData.append('start_of_studies', form.start_of_studies?.toString() || '');
		formData.append('birthday', form.birthday?.toString() || '');
		formData.append('phonenumber', form.phonenumber || '');
		formData.append('team', form.team || '');
		formData.append('address', form.address || '');

		try {
			const record = await pb.collection('users').create(formData);
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
		class=" card mt-10 grid gap-8 shadow-md lg:mt-24 lg:grid-cols-[1fr_2px_1fr]"
		on:submit={register}
	>
		<div class="flex flex-col gap-4">
			<h1 class="text-primary py-5 text-center text-2xl">SMD-KA Interner Bereich Registrierung</h1>

			<div class="flex flex-col items-center gap-2 max-lg:hidden">
				<label for="avatar" class="w-32 rounded-full hover:cursor-pointer">
					<div class="relative">
						<div class="bg-primary absolute bottom-0 right-0 rounded-full p-2 text-white shadow-lg">
							<Fa icon={faPencil} />
						</div>
						<img
							class="h-32 w-32 rounded-full border object-cover"
							{src}
							alt="user avatar"
							id="avatar-preview"
						/>
					</div>
				</label>
				<span class="text-secondary-text">Optional: Profilbild</span>
			</div>

			<div class="relative">
				<input
					bind:value={form.name}
					class="peer w-full rounded-md border-2 p-3 {error.email ? 'border-red-500' : ''}"
					name="name"
					placeholder="Name"
					disabled={loading}
					required
				/>
				<label
					for="surname"
					class="absolute -top-2.5 left-3 bg-white px-1 text-[#555555] opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
				>
					Name
				</label>
			</div>

			<div class="relative">
				<input
					bind:value={form.surname}
					class="peer w-full rounded-md border-2 p-3 {error.email ? 'border-red-500' : ''}"
					name="surname"
					placeholder="Nachname"
					disabled={loading}
					required
				/>
				<label
					for="surname"
					class="absolute -top-2.5 left-3 bg-white px-1 text-[#555555] opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
				>
					Nachname
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
			</div>
		</div>

		<div class="relative my-4 bg-gray-300 max-lg:h-0.5 lg:w-0.5">
			<span
				class="text-secondary-text absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-white px-2 lg:hidden"
				>Optionale Angaben</span
			>
		</div>

		<div class="flex flex-col gap-4">
			<h1 class="text-secondary-text py-5 text-center text-2xl max-lg:hidden">Optionale Angaben</h1>
			<div class="flex justify-center lg:hidden">
				<label for="avatar" class="avatar w-32 rounded-full hover:cursor-pointer">
					<div class="relative">
						<div class="bg-primary absolute bottom-0 right-0 rounded-full p-2 text-white shadow-lg">
							<Fa icon={faPencil} />
						</div>
						<img
							class="h-32 w-32 rounded-full border object-cover"
							{src}
							alt="user avatar"
							id="avatar-preview"
						/>
					</div>
				</label>
				<input
					type="file"
					name="avatar"
					id="avatar"
					value=""
					accept="image/*"
					hidden
					bind:files={form.avatar}
					on:change={showPreview}
					disabled={loading}
				/>
			</div>

			<div class="relative">
				<input
					bind:value={form.birthday}
					class="peer w-full rounded-md border-2 p-3"
					name="birthday"
					placeholder="Geburtstag"
					disabled={loading}
					type="date"
				/>
				<label
					for="birthday"
					class="text-secondary-text absolute -top-2.5 left-3 bg-white px-1 opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
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
					bind:value={form.field_of_study}
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
					bind:value={form.start_of_studies}
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
				class="bg-primary relative mt-4 flex items-center justify-center rounded-md py-2 text-white"
			>
				{#if loading}
					<img class="absolute left-16 h-8" src={loadingSpinner} alt="loading" />
				{/if}
				Registieren</button
			>
		</div>
	</form>
</main>
