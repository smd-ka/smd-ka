<script lang="ts">
	import { getAvatarUrl, pb } from '$lib/pocketbase';
	import defaultAvatar from '$lib/assets/user_default.png';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faChevronRight, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import InputCheckbox from '$lib/components/forms/CheckboxInput.svelte';
	import { onMount } from 'svelte';

	enum church {
		CG = 'Christliche Gemeinde (CG)',
		LKG = 'Landeskirchliche Gemeinschaft LkG)',
		EMK = 'Evangelisch-methodistischen Kirche (EmK)',
		ICF = 'International Christian Fellowship (ICF)',
		FEG = 'Freie evangelische Gemeinde (FeG)',
		EFG = 'Evangelisch-Freikirchliche Gemeinde (EFG)',
		TL = 'Treffpunkt Leben (TL)',
		FK = 'Fächerkirche'
	}

	const churchOptions = Object.entries(church).map(([key, label]) => ({ label, value: key }));

	// Ensure church is an iterable array for Svelte {#each}
	let src = getAvatarUrl();

	let loading = false;
	let removingProfilePicture = false;
	let profilePicture: undefined | File = undefined;

	let afterRegistration = false;

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		afterRegistration = urlParams.get('new') === 'true';
	});

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
		formData.set(
			'hidden_in_addresslist',
			formData.get('hidden_in_addresslist') === 'on' ? 'true' : 'false'
		);
		formData.set('alumni', formData.get('alumni') === 'on' ? 'true' : 'false');
		formData.set('vegetarian', formData.get('vegetarian') === 'on' ? 'true' : 'false');
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

<main class="container mx-auto py-4">
	<nav class="container mx-auto px-4 py-4">
		<ol class="inline-flex list-none">
			<li class="flex items-center">
				<a class="!no-underline" href="/intern">Intern</a>
				<Fa icon={faChevronRight} class="mx-2" />
			</li>
			<li class="flex items-center">
				<a class="!no-underline" href="/intern/profile">Profil</a>
			</li>
		</ol>
	</nav>

	<h1>Profil Bearbeiten</h1>

	{#if afterRegistration}
		<div class="bg-primary rounded-md bg-opacity-40 p-4">
			Hi, schön, dass du dich für den internen Bereich registriert hast. Gibt doch gerne deine
			restlichen Daten hier an, damit man dich in der Adressliste auch wiederfindet :)
		</div>
	{/if}

	<form id="form" on:submit|preventDefault={updateProfile} class="grid gap-4">
		<section class="grid gap-12 md:grid-cols-2">
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

			<div>
				<p class="text-secondary-text">
					Hier kannst du deine Profildaten bearbeiten. Diese werden in der internen Adressliste
					angezeigt. Bei Problemen oder Fragen melde dich gerne beim <a
						href="mailto:webmaster@smd-karlsruhe.de">PRIT-Team</a
					>.
				</p>

				<div class="flex justify-center gap-4">
					<button
						type="submit"
						disabled={loading}
						class="relative mt-4 flex items-center justify-self-end bg-black px-4 py-2 text-white"
					>
						{#if loading}
							<img class="absolute left-16 h-8" src={loadingSpinner} alt="loading" />
						{/if}
						Profil aktualisieren
					</button>
				</div>
			</div>
		</section>

		<div class="grid gap-4 md:grid-cols-2">
			<div class="field">
				<label class="text-secondary-text" for="name">Name</label>
				<input id="name" name="name" disabled={loading} value={pb.authStore.model?.name} required />
			</div>

			<div class="field">
				<label class="text-secondary-text" for="surname">Nachname</label>
				<input
					id="surname"
					name="surname"
					disabled={loading}
					value={pb.authStore.model?.surname}
					required
				/>
			</div>

			<div class="field">
				<label class="text-secondary-text" for="email">E-Mail-Adresse</label>
				<input
					type="email"
					id="email"
					name="email"
					value={pb.authStore.model?.email}
					disabled
					required
				/>
				<p class="text-secondary-text">
					Aktuell kannst du deine E-Mail-Adresse nicht ändern. Falls du dies wünscht, wende dich
					vorübergehend ans <a href="mailto:webmaster@smd-karlsruhe.de">PRIT-Team</a>.
				</p>
			</div>

			<div class="flex gap-4 self-start rounded-md border-2 p-3 md:mt-7">
				<span class="text-secondary-text px-1">Geschlecht:</span>
				<label for="male">
					<input
						id="male"
						checked={pb.authStore.model?.gender === 'male'}
						name="gender"
						type="radio"
						value="male"
						required
					/>
					Männlich
				</label>
				<label for="female">
					<input
						checked={pb.authStore.model?.gender === 'female'}
						id="female"
						name="gender"
						type="radio"
						value="female"
						required
					/>
					Weiblich
				</label>
			</div>

			<div class="field self-start">
				<label class="text-secondary-text" for="birthday">Geburtsdatum</label>
				<input
					type="date"
					id="birthday"
					name="birthday"
					disabled={loading}
					value={getDateValue(pb.authStore.model?.birthday)}
					required
				/>
			</div>

			<div class="field">
				<label class="text-secondary-text" for="phonenumber">Telefonnummer</label>
				<input
					type="tel"
					id="phonenumber"
					name="phonenumber"
					disabled={loading}
					value={pb.authStore.model?.phonenumber}
					required
				/>
			</div>

			<div class="field">
				<label class="text-secondary-text" for="address">Adresse</label>
				<input id="address" name="address" disabled={loading} value={pb.authStore.model?.address} />
			</div>

			<div class="field">
				<label class="text-secondary-text" for="team">SMD Bereich</label>
				<input id="team" name="team" disabled={loading} value={pb.authStore.model?.team} />
			</div>

			<div class="field">
				<label for="post_images">Dürfen wir Bilder von dir veröffentlichen?</label>
				<select
					value={pb.authStore.model?.post_images}
					name="post_images"
					class="rounded-md border-2 py-3"
					disabled={loading}
					required
				>
					<option value="yes">Ja</option>
					<option value="no_instagram">Ja, aber nicht auf Instagram</option>
					<option value="no_website">Ja, aber nicht auf der Webseite</option>
					<option value="never">Nein</option>
				</select>
				<p></p>
				<p class="py-2 text-sm font-bold">
					Anmerkung des Public Relations und IT-Teams: Es werden generell nur Bilder veröffentlicht,
					auf denen ihr gut ausseht, sollten Zweifel bestehen oder wir es als grenzwertig ansehen,
					fragen wir nochmal im Einzelfall nach. Bitte habt Verständnis, dass wir dies nicht für
					jedes Bild/Video machen wollen, da es unsere Arbeit dann ungemein erschwert. Danke
					schonmal und wir freuen uns auf fröhliche und lustige Bilder :P
				</p>
			</div>

			<div>
				<InputCheckbox
					id="rili"
					name="rili"
					checked={pb.authStore.model?.rili}
					label="Ich bin Richtlininenmitarbeiter (Rili)"
					disabled={loading}
				/>

				<InputCheckbox
					id="hidden-in-addresslist"
					name="hidden_in_addresslist"
					checked={pb.authStore.model?.hidden_in_addresslist}
					label="Ich möchte nicht in der Adressliste auftauchen"
					disabled={loading}
				/>

				<InputCheckbox
					id="alumni"
					name="alumni"
					checked={pb.authStore.model?.alumni}
					label="Ich bin ehemaliger SMDler/in (Alumni)"
					disabled={loading}
				/>

				<InputCheckbox
					id="vegetarian"
					name="vegetarian"
					checked={pb.authStore.model?.vegetarian}
					label="Ich esse vegetarisch"
					disabled={loading}
				/>
			</div>

			<div class="field">
				<label for="allergies">Allergien oder Unverträglichkeiten</label>
				<input
					id="allergies"
					name="allergies"
					disabled={loading}
					value={pb.authStore.model?.allergies}
				/>
			</div>

			<div class="field">
				<label for="church">Gemeinde</label>
				<select
					class="rounded-md border-2 py-3"
					name="church"
					disabled={loading}
					value={pb.authStore.model?.church}
				>
					{#each churchOptions as c}
						{#if c.value === pb.authStore.model?.church}
							<option selected value={c.value}>{c.label}</option>
						{:else}
							<option value={c.value}>{c.label}</option>
						{/if}
					{/each}
				</select>
			</div>

			<div class="field">
				<label for="study">Studiengang</label>
				<input
					id="study"
					name="field_of_study"
					disabled={loading}
					value={pb.authStore.model?.field_of_study}
				/>
			</div>

			<div class="field">
				<label for="start-of-studies">Studienbeginn</label>
				<input
					type="date"
					id="start-of-studies"
					name="start_of_studies"
					disabled={loading}
					value={getDateValue(pb.authStore.model?.start_of_studies)}
				/>
			</div>

			<div></div>

			<button
				type="submit"
				disabled={loading}
				class="relative mt-4 flex items-center justify-center bg-black py-2 text-white"
			>
				{#if loading}
					<img class="absolute left-16 h-8" src={loadingSpinner} alt="loading" />
				{/if}
				Profil aktualisieren
			</button>
		</div>
	</form>
</main>

<style>
	input {
		@apply rounded-md border-2 px-4 py-3;
	}

	.field {
		@apply grid;
	}

	.field label {
		@apply text-secondary-text ml-2;
	}
</style>
