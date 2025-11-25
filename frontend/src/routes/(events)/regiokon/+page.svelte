<script lang="ts">
	import InputField from '$lib/components/forms/TextInput.svelte';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import InputCheckbox from '$lib/components/forms/CheckboxInput.svelte';
	import { getErrorMessage, pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import type { saftRegistration } from '$lib/models';
	import EmailInputField from '$lib/components/forms/EmailInput.svelte';
	import TelephoneInputField from '$lib/components/forms/TelephoneInputField.svelte';
	import GenderInput from '$lib/components/forms/GenderInput.svelte';
	import { PUBLIC_SEMESTER } from '$env/static/public';
	import { _post_regiokon_signup, _SMDGroups } from './+page';

	let loading = false;
	let success = false;
	let loggedIn = false;

	onMount(() => {
		if (pb.authStore.isValid) {
			loggedIn = true;
		}
	});
</script>

<main class="container mx-auto px-4 py-24 lg:px-40 xl:px-80">
	<h1 class="pb-0 text-5xl font-bold uppercase">Regiokon Anmeldung</h1>
	<span class="text-xl font-bold text-gray-600"
		>TOGETHER FOR THE KINGDOM // 09.-11. Januar 2026</span
	>
	{#if loggedIn}
		<p class="text-primary py-6 text-xl">
			Schön, dass du dabei bist {pb.authStore.model?.name}!
		</p>
	{/if}
	<form id="form" class="my-4 flex flex-col gap-4" on:submit|preventDefault={_post_regiokon_signup}>
		<!-- Section for users that are not logged in -->
		<!-- Fields: name surname email phone gender  -->
		{#if !loggedIn}
			<h3>Und du bist?</h3>
			<InputField id="name" name="name" label="Name" disabled={loading} required />
			<InputField id="surname" name="surname" label="Nachname" disabled={loading} required />
			<EmailInputField id="email" name="email" label="E-Mail-Adresse" disabled={loading} required />
			<TelephoneInputField
				name="phone"
				id="phone"
				label="Handynummer"
				disabled={loading}
				required
			/>
			<GenderInput />
		{/if}

		<!-- Fields: group travel_comments -->
		<h3>Das Logistische</h3>

		{#if !loggedIn}
			<div>
				<p>Meine SMD-Gruppe:</p>
				<select name="group" class="w-full rounded-md border-2 py-3" required>
					<option disabled selected value> -- Wähle eine Option -- </option>
					{#each _SMDGroups as group}
						<option value={group}>{group}</option>
					{/each}
				</select>
			</div>
		{/if}

		<div class="flex flex-col">
			<label for="travel_comments">
				<b>Anmerkungen zur Anreise oder Abreise.</b> (z.B. ich reise verspätet an oder ich reise früher
				wieder ab.)</label
			>
			<textarea class="rounded-md border-2" name="travel_comments" id="travel_comments" rows="2"
			></textarea>
		</div>

		<p>Weitere Infos zur Anreise und Packliste folgen per Mail.</p>

		<!-- Fields: is_vegetarian allergies -->
		<h3>Essen! Hat da jemand Essen gesagt?!</h3>
		<p>Wie passt es dir am besten?</p>

		{#if loggedIn}
			<b class="text-primary">Bitte gebe deine Essenspräferenzen in deinem Profil an!</b>
		{:else}
			<InputCheckbox name="is_vegetarian" label="Ich bin Vegetarier" />

			<InputField name="allergies" label="Allergien oder Unverträglichkeiten" disabled={loading} />
		{/if}

		<!-- TODO REQUIRED! -->
		<!-- Fields: question1 question2 -->
		<h3>Wir hätten da noch ne Frage... oder zwei?</h3>
		<InputField
			name="question1"
			label="Wo arbeitest du gerade in deiner Gruppe mit?"
			disabled={loading}
		/>
		<InputField
			name="question2"
			label="Wo siehst du dich im nächsten Semester?"
			disabled={loading}
		/>

		<!-- Fields: post_images comments -->
		<h3>Das Kleingedruckte</h3>

		<span><b>Rechtliches:</b> Und wie sieht's mit Bildern von dir aus? </span>
		<select class="rounded-md border-2 py-3" name="post_images" required>
			<option disabled selected value> -- Wähle eine Option -- </option>
			<option value="yes"
				>Ihr dürft Bilder von mir veröffentlichen. (Instagram, Webseite, Flyer, ...)</option
			>
			<option value="no_instagram"
				>Ihr dürft Bilder von mir veröffentlichen, aber nicht auf Instagram
			</option>
			<option value="no_website"
				>Ihr dürft Bilder von mir veröffentlichen, aber nicht auf der Webseite
			</option>
			<option value="never">Bitte veröffentlicht keine Bilder von mir</option>
		</select>
		<p class="text-sm font-bold">
			Anmerkung des Public Relations und IT-Teams: Es werden generell nur Bilder veröffentlicht, auf
			denen ihr gut ausseht, sollten Zweifel bestehen oder wir es als grenzwertig ansehen, fragen
			wir nochmal im Einzelfall nach. Bitte habt Verständnis, dass wir dies nicht für jedes
			Bild/Video machen wollen, da es unsere Arbeit dann ungemein erschwert. Danke schonmal und wir
			freuen uns auf fröhliche und lustige Bilder von der Regiokon :P
		</p>

		<div class="flex flex-col">
			<label for="comments">
				<b>Das solltet ihr noch wissen ... (sonstige Anmerkungen)</b>
			</label>
			<textarea class="rounded-md border-2" name="comments" id="comments" rows="5"></textarea>
		</div>

		<button
			disabled={loading}
			class="relative flex items-center justify-center bg-black px-12 py-4 text-white md:w-fit"
		>
			{#if loading}
				<img class="absolute left-2 h-8" src={loadingSpinner} alt="loading" />
			{/if}
			Anmelden
		</button>
	</form>
</main>
