<script lang="ts">
	import { getAvatarUrl, pb } from '$lib/pocketbase';
	import defaultAvatar from '$lib/assets/user_default.png';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faCross, faDeleteLeft, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import InputField from '$lib/components/forms/TextInput.svelte';
	import EmailInputField from '$lib/components/forms/EmailInput.svelte';
	import DateInput from '$lib/components/forms/DateInput.svelte';
	import InputCheckbox from '$lib/components/forms/CheckboxInput.svelte';
	import { onMount } from 'svelte';

	// assign default avatar if no avatar is set

	let src = getAvatarUrl();

	let loading = false;
	let removingProfilePicture = false;
	let profilePicture: undefined | File = undefined;

	const showPreview = (event: Event) => {
		const files = (event.target as HTMLInputElement).files;
		if (files && files.length > 0) {
			src = URL.createObjectURL(files[0]);
			profilePicture = files[0];
		}
	};

	async function updateProfile() {
		loading = true;
		const form = document.getElementById('form') as HTMLFormElement;
		let formData = new FormData(form);
		formData.append('avatar', profilePicture ? profilePicture : pb.authStore.model?.avatar);
		formData.set('rili', formData.get('rili') === 'on' ? 'true' : 'false');
		if (!pb.authStore.model?.id) return (loading = false);
		await pb.collection('users').update(pb.authStore.model.id, formData);
		await pb.collection('users').authRefresh();
		loading = false;
	}

	async function deleteProfilePicture() {
		if (pb.authStore.model?.avatar && pb.authStore.model?.id) {
			removingProfilePicture = true;
			const record = await pb.collection('users').update(pb.authStore.model.id, { avatar: null });
			removingProfilePicture = false;
		}
		profilePicture = undefined;
		src = defaultAvatar;
	}

	function getDateValue(toDate: string) {
		if (!toDate) return '';
		return new Date(toDate).toISOString().split('T')[0];
	}
</script>

<main class="container mx-auto">
	<form
		id="form"
		on:submit|preventDefault={updateProfile}
		class="card mt-8 grid justify-center gap-4 md:grid-cols-2 md:gap-12"
	>
		<div class="flex flex-col gap-4">
			<div class="flex flex-col items-center">
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
					<input
						type="file"
						name="avatar"
						id="avatar"
						accept="image/*"
						hidden
						on:change={showPreview}
						disabled={loading}
					/>
				</label>
				{#if src !== defaultAvatar}
					<button
						type="button"
						on:click={deleteProfilePicture}
						class="text-secondary-text mt-4 flex items-center gap-2"
					>
						Profilbild löschen
						<Fa icon={faTrash} class="mr-2" />
					</button>
				{/if}
			</div>

			<InputField
				id="name"
				name="name"
				label="Name"
				value={pb.authStore.model?.name}
				disabled={loading}
				required
			/>

			<InputField
				id="surname"
				name="surname"
				label="Nachname"
				value={pb.authStore.model?.surname}
				disabled={loading}
				required
			/>

			<div>
				<EmailInputField
					id="email"
					name="email"
					label="E-Mail-Adresse"
					value={pb.authStore.model?.email}
					disabled
					required
				/>
				<div class="text-sm text-gray-400">
					Aktuell kannst du deine E-Mail-Adresse nicht ändern falls du dies wünscht wende dich
					vorübergehend an Claus.
				</div>
			</div>

			<DateInput
				id="birthday"
				name="birthday"
				label="Geburtstag"
				value={getDateValue(pb.authStore.model?.birthday)}
				disabled={loading}
			/>

			<InputField
				id="phonenumber"
				name="phonenumber"
				label="Handynummer"
				value={pb.authStore.model?.phonenumber}
				disabled={loading}
			/>

			<InputField
				id="address"
				name="address"
				label="Adresse"
				value={pb.authStore.model?.address}
				disabled={loading}
			/>
		</div>

		<div class="flex flex-col gap-4">
			<div class="h-[10.5rem] max-md:hidden"></div>
			<InputField
				id="team"
				name="team"
				label="SMD Bereich"
				value={pb.authStore.model?.team}
				disabled={loading}
			/>

			<InputCheckbox
				id="rili"
				name="rili"
				checked={pb.authStore.model?.rili}
				label="Ich bin Richtlininenmitarbeiter (Rili)"
				disabled={loading}
			/>

			<InputField
				id="allergies"
				name="allergies"
				label="Allergien oder Unverträglichkeiten"
				value={pb.authStore.model?.allergies}
				disabled={loading}
			/>

			<InputField
				id="study"
				name="study"
				label="Studiengang"
				value={pb.authStore.model?.field_of_study}
				disabled={loading}
			/>

			<DateInput
				id="start-of-studies"
				name="start_of_studies"
				label="Studienbeginn"
				value={getDateValue(pb.authStore.model?.start_of_studies)}
				disabled={loading}
			/>

			<button
				type="submit"
				disabled={loading}
				class="bg-primary relative mt-4 flex items-center justify-center rounded-md py-2 text-white"
			>
				{#if loading}
					<img class="absolute left-16 h-8" src={loadingSpinner} alt="loading" />
				{/if}
				Profil aktualisieren
			</button>
		</div>
	</form>
</main>
