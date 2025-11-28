<script lang="ts">
	import InputField from '$lib/components/forms/TextInput.svelte';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import InputCheckbox from '$lib/components/forms/CheckboxInput.svelte';
	import { onMount } from 'svelte';
	import EmailInputField from '$lib/components/forms/EmailInput.svelte';
	import TelephoneInputField from '$lib/components/forms/TelephoneInputField.svelte';
	import GenderInput from '$lib/components/forms/GenderInput.svelte';
	import { _loading, _post_regiokon_signup, _SMDGroups } from './+page';
	import flyer from '$lib/assets/pages/events/regiokon/regiokon_flyer.jpg';
	import { pb } from '$lib/pocketbase';

	let loggedIn = false;

	onMount(() => {
		if (pb.authStore.isValid) {
			loggedIn = true;
		}
	});
</script>

<main class="container mx-auto px-4 pb-24 pt-8 lg:px-40 xl:px-80">
	<img class="mb-6" src={flyer} alt="Regiokon Flyer" />
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
			<InputField id="name" name="name" label="Name" disabled={$_loading} required />
			<InputField id="surname" name="surname" label="Nachname" disabled={$_loading} required />
			<EmailInputField
				id="email"
				name="email"
				label="E-Mail-Adresse"
				disabled={$_loading}
				required
			/>
			<TelephoneInputField
				name="phone"
				id="phone"
				label="Handynummer"
				disabled={$_loading}
				required
			/>
			<GenderInput />
		{/if}

		<!-- Fields: group travel_comments -->
		<h3>Das Logistische</h3>

		{#if !loggedIn}
			<div>
				<p>Meine SMD-Gruppe:</p>
				<select name="smd_group" class="w-full rounded-md border-2 py-3" required>
					<option disabled selected value> -- Wähle eine Option -- </option>
					{#each _SMDGroups as group}
						<option value={group}>SMD {group}</option>
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

		{#if loggedIn}
			<b class="text-primary"
				>Bitte aktualisieren deine Essenspräferenzen in deinem Profil bevor du dich anmeldest!</b
			>
		{:else}
			<p>Wie passt es dir am besten?</p>
			<InputCheckbox name="is_vegetarian" label="Ich bin Vegetarier" />

			<InputField
				name="allergies"
				label="Allergien oder Unverträglichkeiten"
				disabled={$_loading}
			/>
		{/if}

		<!-- Fields: question1 question2 -->
		<h3>Wir hätten da noch ne Frage... oder zwei?</h3>

		<div>
			<label for="question1">Wo arbeitest du gerade in deiner Gruppe mit?</label>
			<input
				class="w-full rounded-md border-2 p-3"
				id="question1"
				name="question1"
				placeholder="Wo arbeitest du gerade in deiner Gruppe mit?"
				disabled={$_loading}
				required
			/>
		</div>

		<div>
			<label for="question2"
				>Welche Aufgabe/Erfahrung möchtest du im nächsten Semester machen?</label
			>
			<input
				class="w-full rounded-md border-2 p-3"
				id="question2"
				name="question2"
				placeholder="Welche Aufgabe/Erfahrung möchtest du im nächsten Semester machen?"
				disabled={$_loading}
				required
			/>
		</div>
		<!-- Fields: post_images comments -->
		<h3>Das Kleingedruckte - Rechtliches</h3>

		<div>
			<div class="flex gap-2">
				<input required disabled={$_loading} name="gdpr_consent" type="checkbox" />
				<label for="gdpr_consent"
					>Ich stimme zu, dass meine Daten für die Organisation der Regiokon 2026 gespeichert und
					verarbeitet werden.
				</label>
			</div>
			Weitere Informationen findest du in unserer
			<a href="/regiokon/datenschutz" class="text-blue-600 underline">
				Datenschutzerklärung für die Regiokon
			</a>.
		</div>

		<span>Und wie sieht's mit Bildern von dir aus? </span>
		<select class="rounded-md border-2 py-3" name="image_publication_consent" required>
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
			<option value="no">Bitte veröffentlicht keine Bilder von mir</option>
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
			disabled={$_loading}
			class="relative flex items-center justify-center bg-black px-12 py-4 text-white md:w-fit"
		>
			{#if $_loading}
				<img class="absolute left-2 h-8" src={loadingSpinner} alt="loading" />
			{/if}
			Anmelden
		</button>
	</form>
</main>
