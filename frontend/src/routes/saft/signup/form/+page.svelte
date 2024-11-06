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

	const ticketValues = [
		'Deutschlandticket/Jugendticket BW',
		'KVV-Bescheinigung',
		'KVV-Semesterticket'
	];

	let record: saftRegistration;
	let loading = false;
	let success = false;
	let loggedIn = false;
	let travelOption = '';
	let group = '';

	onMount(() => {
		if (pb.authStore.isValid) {
			loggedIn = true;
		}
		group = 'Karlsruhe';
	});

	const signup = async () => {
		loading = true;
		const form = document.getElementById('form') as HTMLFormElement;
		let formData = new FormData(form);
		formData.set(
			'would_sleep_on_floor',
			formData.get('would_sleep_on_floor') === 'on' ? 'true' : 'false'
		);
		formData.set('brings_cake', formData.get('brings_cake') === 'on' ? 'true' : 'false');
		formData.set('is_vegetarian', formData.get('is_vegetarian') === 'on' ? 'true' : 'false');
		formData.set('semester', PUBLIC_SEMESTER);
		if (pb.authStore.isValid && pb.authStore.model?.id) {
			formData.set('user', pb.authStore.model?.id);
			formData.set('group', 'Karlsruhe');
		}

		try {
			record = await pb.collection('saft').create(formData);
			success = true;
		} catch (e: any) {
			loading = false;
			console.error(getErrorMessage(e));
			return;
		}
		loading = false;
	};
</script>

<main class="container mx-auto py-24">
	<div class="px-4 lg:px-80">
		{#if success}
			<div class="grid gap-8">
				<h1 class=" text-3xl font-bold uppercase">Du hast dich erfolgreich angemeldet!</h1>
				<p>Wir haben dir eine Bestätigung per Email zukommen lassen ;).</p>
			</div>
		{:else}
			<h1 class="pb-0 text-5xl font-bold uppercase">SAFT Anmeldung</h1>
			<span class="text-xl font-bold text-gray-600">im {PUBLIC_SEMESTER}</span>
			{#if loggedIn}
				<p class="text-primary py-6 text-xl">
					Schön, dass du dabei bist {pb.authStore.model?.name}!
				</p>
			{/if}
			<form id="form" class="my-4 flex flex-col gap-4" on:submit|preventDefault={signup}>
				<!-- Section for users that are not logged in -->
				{#if !loggedIn}
					<h3>Und du bist?</h3>
					<InputField id="name" name="name" label="Name" disabled={loading} required />
					<InputField id="surname" name="surname" label="Nachname" disabled={loading} required />
					<EmailInputField
						id="email"
						name="email"
						label="E-Mail-Adresse"
						disabled={loading}
						required
					/>
					<TelephoneInputField
						name="phonenumber"
						id="phonenumber"
						label="Handynummer"
						disabled={loading}
						required
					/>
					<GenderInput />

					<div class="flex w-full items-center gap-4">
						<label class="whitespace-nowrap" for="group">Ich komme aus...</label>
						<select
							bind:value={group}
							name="group"
							id="group"
							class="w-full rounded-md border-2 py-3"
							required
						>
							<option disabled selected value> -- Wähle eine Option -- </option>
							<option value="Karlsruhe">Karlsruhe</option>
							<option value="Landau">Landau</option>
						</select>
					</div>
				{/if}

				<h3>Wie möchtest du anreisen?</h3>

				{#if group == ''}
					<b>Bitte wähle erst aus, woher du kommst.</b>
				{:else if group == 'Karlsruhe'}
					<div>
						<p>
							Die <strong class="font-bold">Bahnanreise</strong> wird am Freitag gegen 16:30 vom
							Hauptbahnhof in Karlsruhe starten.
							<br />Am Sonntag sind wir gegen 16:00 wieder zurück in Karlsruhe
						</p>

						<p class="mt-4">
							Die <strong class="font-bold">Fahrradanreise</strong> wird am Freitag gegen 13:00 aus
							der Stadtmitte von Karlsruhe starten.
							<br /> Am Sonntag sind wir gegen 17:00 wieder zurück in Karlsruhe.
						</p>
					</div>

					<select
						bind:value={travelOption}
						name="travel_option"
						class="w-full rounded-md border-2 py-3"
						required
					>
						<option disabled selected value> -- Wähle eine Option -- </option>
						<option value="takesBike"
							>Ich nehme an der Fahrradtour zur Anreise (und Abreise) teil.</option
						>
						<option value="takesTrain">Ich nehme an der Bahnfahrt teil.</option>
						<option value="takesCar">Ich reise mit dem Auto an und könnte Gepäck mitnehmen.</option>
						<option value="takesOwn">Ich reise selbständig an.</option>
					</select>

					{#if travelOption === 'takesTrain'}
						<fieldset class="mt-1">
							<legend>Welches Ticket besitzt du am Anreise- und Abreisetag?</legend>

							{#each ticketValues as ticketVal}
								<div class="md:ml-4">
									<input type="radio" id={ticketVal} name="ticket" value={ticketVal} required />
									<label for={ticketVal}>{ticketVal}</label>
								</div>
							{/each}
						</fieldset>
					{/if}
				{:else}
					<select
						name="travel_option"
						bind:value={travelOption}
						class="w-full rounded-md border-2 py-3"
						required
					>
						<option disabled selected value> -- Wähle eine Option -- </option>
						<option value="takesGroup">Ich reise mit der Gruppe an.</option>
						<option value="takesOwn">Ich reise selbständig an.</option>
					</select>
				{/if}

				<div class="flex flex-col">
					<label for="travel_comments">
						<bold class="font-bold">Anmerkungen zur Anreise oder Abreise.</bold> (z.B. ich reise verspätet
						an oder ich reise früher wieder ab.)</label
					>
					<textarea class="rounded-md border-2" name="travel_comments" id="travel_comments" rows="2"
					></textarea>
				</div>

				<p class="font-bold">Weitere Infos zur Anreise folgen per Mail.</p>

				<h3>Essens- und Schlafpräferenzen</h3>

				<InputCheckbox
					name="would_sleep_on_floor"
					label="Ich könnte mir vorstellen ggf. auf den Boden zu schlafen und Schlafsack / Isomatte dazu mitzubringen"
				/>

				<InputCheckbox
					name="brings_cake"
					label="Ich bringe Kuchen, Muffins oder Ähnliches mit für Kaffee und Kuchen am Samstag"
				/>

				<InputCheckbox name="is_vegetarian" label="Ich bin Vegetarier" />

				<InputField
					name="allergies"
					label="Allergien oder Unverträglichkeiten"
					disabled={loading}
				/>

				<span><b>Rechtliches:</b> Und wie sieht's mit Bildern von dir aus? </span>
				<select class="rounded-md border-2 py-3" name="post_images" required>
					<option disabled selected value> -- Wähle eine Option -- </option>
					<option value="yes"
						>Ihr dürft Bilder von mir veröffentlichen. (Instagram, Website, Flyer, ...)</option
					>
					<option value="no_instagram"
						>Ihr dürft Bilder von mir veröffentlichen, aber nicht auf Instagram
					</option>
					<option value="no_website"
						>Ihr dürft Bilder von mir veröffentlichen, aber nicht auf der Website
					</option>
					<option value="never">Bitte veröffentlicht keine Bilder von mir</option>
				</select>
				<p class="text-sm font-bold">
					Anmerkung des Public Relations und IT-Teams: Es werden generell nur Bilder veröffentlicht,
					auf denen ihr gut ausseht, sollten Zweifel bestehen oder wir es als grenzwertig ansehen,
					fragen wir nochmal im Einzelfall nach. Bitte habt Verständnis, dass wir dies nicht für
					jedes Bild/Video machen wollen, da es unsere Arbeit dann ungemein erschwert. Danke
					schonmal und ich freue mich auf fröhliche und lustige Bilder von der SAFT :P
				</p>

				<div class="flex flex-col">
					<label for="comments"> <b>Sonstige Anmerkungen</b></label>
					<textarea class="rounded-md border-2" name="comments" id="comments" rows="3"></textarea>
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
		{/if}
	</div>
</main>
