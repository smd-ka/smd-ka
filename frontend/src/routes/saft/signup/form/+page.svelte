<script lang="ts">
	import InputField from '$lib/components/forms/TextInput.svelte';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';
	import loadingSpinnerWhite from '$lib/assets/loading_spinner_white.gif';
	import InputCheckbox from '$lib/components/forms/CheckboxInput.svelte';
	import { getErrorMessage, pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import type { saftRegistration } from '$lib/models';
	import EmailInputField from '$lib/components/forms/EmailInput.svelte';
	import TelephoneInputField from '$lib/components/forms/TelephoneInputField.svelte';
	import GenderInput from '$lib/components/forms/GenderInput.svelte';
	import { PUBLIC_SEMESTER } from '$env/static/public';
	import NumberInput from '$lib/components/forms/NumberInput.svelte';

	import PritPublicImageDisclaimer from '../../../_components/PritPublicImageDisclaimer.svelte';
	// textblocks reused for SAFT signup
	import AllInfos from '../../_components/AllInfos.svelte';
	import InfoTravelBike from '../../_components/InfoTravelBike.svelte';
	import InfoTravelIndependent from '../../_components/InfoTravelIndependent.svelte';
	import InfoTravelTrain from '../../_components/InfoTravelTrain.svelte';
	import MessageAfterwards from '../../_components/MessageAfterwards.svelte';
	import MessageClosed from '../../_components/MessageClosed.svelte';

	import { RegistrationStatus, requestRegStatus } from '$lib/saftRegistrationApi';

	const ticketValues = [
		'Deutschlandticket/Jugendticket BW',
		'KVV-Bescheinigung',
		'KVV-Semesterticket'
	];

	enum FormStatus {
		Preparing, // loading regStatus & preparing other values
		Presenting, // where regStatus matters
		Submitting, // same as presenting, but with loading hint
		ErrorOnSubmit, // same as presenting, with error hint
		SuccessfullySubmit // show success message
	}

	// form status (affecting rendering)
	let status: FormStatus = FormStatus.Preparing;
	let regStatus: RegistrationStatus = RegistrationStatus.Unknown;
	$: loading = status == FormStatus.Submitting;
	$: success = status == FormStatus.SuccessfullySubmit;

	let record: saftRegistration;
	let loggedIn = false;
	let travelOption = '';
	let group = '';

	onMount(async () => {
		if (pb.authStore.isValid) {
			loggedIn = true;
		}
		group = 'Karlsruhe';
		regStatus = await requestRegStatus();
		status = FormStatus.Presenting;
	});

	const signup = async () => {
		status = FormStatus.Submitting;
		const form = document.getElementById('form') as HTMLFormElement;
		let formData = new FormData(form);
		formData.set(
			'would_sleep_on_floor',
			formData.get('would_sleep_on_floor') === 'on' ? 'true' : 'false'
		);
		formData.set('brings_cake', formData.get('brings_cake') === 'on' ? 'true' : 'false');
		formData.set('is_vegetarian', formData.get('is_vegetarian') === 'on' ? 'true' : 'false');
		// ZELT-SAFT
		formData.set('comes_friday', formData.get('comes_friday') === 'on' ? 'true' : 'false');
		formData.set('pot', formData.get('pot') === 'on' ? 'true' : 'false');
		formData.set('bag', formData.get('bag') === 'on' ? 'true' : 'false');
		formData.set('pad', formData.get('pad') === 'on' ? 'true' : 'false');
		formData.set('fairy_lights', formData.get('fairy_lights') === 'on' ? 'true' : 'false');

		formData.set('semester', PUBLIC_SEMESTER);
		if (pb.authStore.isValid && pb.authStore.model?.id) {
			formData.set('user', pb.authStore.model?.id);
			formData.set('group', 'Karlsruhe');
		}

		try {
			record = await pb.collection('saft').create(formData);
			status = FormStatus.SuccessfullySubmit;
		} catch (e: any) {
			status = FormStatus.ErrorOnSubmit;
			console.error(getErrorMessage(e));
			return;
		}
	};
</script>

<main class="container mx-auto py-24">
	<div class="px-4 lg:px-80">
		{#if success}
			<div class="grid gap-8">
				<h1 class="text-3xl font-bold uppercase">Du hast dich erfolgreich angemeldet!</h1>
				<p>
					Wir haben dir eine Bestätigung (wo auch das folgende drin steht) per Email zukommen lassen
					;).
				</p>
				<AllInfos />
			</div>
		{:else}
			<h1 class="pb-0 text-5xl font-bold uppercase">SAFT Anmeldung</h1>
			<span class="text-xl font-bold text-gray-600">im {PUBLIC_SEMESTER}</span>
			{#if regStatus == RegistrationStatus.Unknown}
				<div class="my-4 flex gap-4">
					<img class="h-8" src={loadingSpinner} alt="loading" />
					<p class="text-gray-500">Anmeldestatus wird geladen…</p>
				</div>
			{:else if regStatus === RegistrationStatus.Closed}
				<MessageClosed />
			{:else if regStatus == RegistrationStatus.Afterwards}
				<MessageAfterwards />
			{:else if regStatus == RegistrationStatus.Failed}
				<p class="my-6 text-xl font-bold text-red-600">
					Irgendetwas ging schief. Bitte überprüfe deine Internetverbindung oder probiere es später
					noch einmal.
				</p>
			{:else}
				{#if loggedIn}
					<p class="py-6 text-xl text-primary">
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

						<!-- <div class="flex w-full items-center gap-4">
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
					</div> -->
					{/if}

					<h3>Wie möchtest du anreisen?</h3>

					<div class="grid gap-4">
						<p>
							<InfoTravelTrain />
						</p>

						<p>
							<InfoTravelBike />
						</p>

						<!-- <p>Landauer bitte selbständig angeben :)</p> -->
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
						<option value="takesCar">Ich reise mit dem Auto an und kann Gepäck mitnehmen.</option>
						<option value="takesOwn">Ich reise selbständig an. </option>
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

					<div class="flex flex-col">
						<!-- +++ ZELT-SAFT +++
					<InputCheckbox name="comes_friday" label="Anreise am Freitag"></InputCheckbox>
					-->
						<label for="travel_comments">
							<bold class="font-bold">Anmerkungen zur Anreise oder Abreise.</bold> (z.B. ich reise verspätet
							an oder ich reise früher wieder ab.)</label
						>
						<textarea
							class="rounded-md border-2"
							name="travel_comments"
							id="travel_comments"
							rows="2"
						></textarea>
					</div>

					<p class="font-bold">Weitere Infos zur Anreise folgen per Mail.</p>

					<h3>Essenspräferenzen</h3>

					<!--<InputCheckbox
					name="would_sleep_on_floor"
					label="Ich könnte mir vorstellen ggf. auf den Boden zu schlafen und Schlafsack / Isomatte dazu mitzubringen"
				/>-->

					<InputCheckbox
						name="brings_cake"
						label="Ich bringe Kuchen, Muffins oder Ähnliches mit für Kaffee und Kuchen am Samstag"
					/>
					<div>
						<p>
							Wir wollen am Donnerstagabend Grillen, dafür kann ich folgende Beilage mitbringen:
						</p>
						<InputField name="side_dish" label="" disabled={loading} />
					</div>
					<fieldset class="mt-1">
						<legend>Ich koche gerne (1 = ungerne, 5 = gerne)</legend>

						<div class="flex flex-row gap-4 md:ml-4">
							{#each [1, 2, 3, 4, 5] as num (num)}
								<label for="likes_cooking_radio_{num}">
									<input
										type="radio"
										name="likes_cooking"
										id="likes_cooking_radio_{num}"
										value={num}
										required
										disabled={loading}
									/>
									{num}
								</label>
							{/each}
						</div>
					</fieldset>

					{#if loggedIn}
						<b class="text-primary">Bitte gebe deine Essenspräferenzen in deinem Profil an!</b>
					{:else}
						<InputCheckbox name="is_vegetarian" label="Ich bin Vegetarier" />

						<InputField
							name="allergies"
							label="Allergien oder Unverträglichkeiten"
							disabled={loading}
						/>
					{/if}

					<!-- +++ ZELT-SAFT +++ -->

					<div>
						<p>Ich kann folgend(e) Zelte mitbringen: Bitte die Personenanzahl pro Zelt angeben.</p>
						<InputField name="tents" label="" disabled={loading} />
					</div>

					<!-- <InputCheckbox name="pot" label="Ich kann einen Gas/ Spirituskocher mit Topf mitbringen" /> -->

					<InputCheckbox
						name="bag"
						label="Ich habe einen Schlafsack mit mindestens Komforttemperatur 7 Grad"
					/>

					<InputCheckbox name="pad" label="Ich habe eine Isomatte" />

					<NumberInput
						name="bag_count"
						label="Anzahl Schlafsäcke mit Komforttemperatur mind. 7 Grad., die ich verleihen könnte:"
					></NumberInput>

					<NumberInput name="pad_count" label="Anzahl Isomatten, die ich verleihen könnte:"
					></NumberInput>
					<InputCheckbox
						name="fairy_lights"
						label="Ich kann eine/mehrer batteriebetriebene(n) Lichterketten mitbringen"
					/>

					<!-- +++ ZELT-SAFT +++ -->

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
						<option value="no">Bitte veröffentlicht keine Bilder von mir</option>
					</select>
					<p class="text-sm font-bold">
						<PritPublicImageDisclaimer location="von der SAFT" />
					</p>

					<div class="flex flex-col">
						<label for="comments">
							<b>Sonstige Anmerkungen </b>
							<p>
								Falls du ein Instrument hast und es mitbringen möchstest, lass es uns hier wissen.
								Falls du angegeben hast, dass du mit dem Auto anreist und Gepäck mitnehmen kannst,
								lass uns auch hier wissen wie viel Platz du hast.
							</p>
							<p>
								Auch sonstige Anmerkungen zur Anmeldung zur SAFT kannst du hier gerne vermerken.
							</p>
							<p>
								Falls du Anmerkungen zu deinem Outdoormaterial hast, lass es uns gerne auch hier
								Wissen.
							</p>
						</label>
						<textarea class="rounded-md border-2" name="comments" id="comments" rows="5"></textarea>
					</div>

					<button
						disabled={loading}
						class="relative flex items-center justify-center bg-black px-12 py-4 text-white md:w-fit"
					>
						{#if loading}
							<img class="absolute left-2 h-8" src={loadingSpinnerWhite} alt="loading" />
						{/if}
						Anmelden
					</button>
				</form>
			{/if}
		{/if}
	</div>
</main>
