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
	import CheckboxInput from '$lib/components/forms/CheckboxInput.svelte';

	// textblocks reused for SAFT signup
	import MessageAfterwards from '$lib/components/saft/MessageAfterwards.svelte';
	import MessageClosed from '$lib/components/saft/MessageClosed.svelte';

	import { RegistrationStatus, type RegistrationStatus, requestRegStatus } from '$lib/saftRegistrationApi.ts';

	const ticketValues = [
		'Deutschlandticket/Jugendticket BW',
		'KVV-Bescheinigung',
		'KVV-Semesterticket'
	];

	enum FormStatus {
		Preparing,  // loading regStatus & preparing other values
		Presenting,  // where regStatus matters
		Submitting,  // same as presenting, but with loading hint
		ErrorOnSubmit,  // same as presenting, with error hint
		SuccessfullySubmit,  // show success message
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
	let likes_cooking = null;

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
		// SS25
		formData.set('comes_friday', formData.get('comes_friday') === 'on' ? 'true' : 'false');
		formData.set('pot', formData.get('pot') === 'on' ? 'true' : 'false');
		formData.set('bag', formData.get('bag') === 'on' ? 'true' : 'false');
		formData.set('pad', formData.get('pad') === 'on' ? 'true' : 'false');

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
				<h1 class=" text-3xl font-bold uppercase">Du hast dich erfolgreich angemeldet!</h1>
				<p>
					Wir haben dir eine Bestätigung (wo auch das folgende drin steht) per Email zukommen lassen
					;).
				</p>
				<p>
					Wir freuen uns riesig, dass du bei unserem gemeinsamen SAFT-Wochenende dabei bist! Damit
					du dich schon gut & entspannt auf die SAFT vorbereiten kannst, findest du in dieser Mail
					die wichtigesten Punkte schnell zusammengefasst.
				</p>

				<h3>1) Allgemeines & Organisatorisches</h3>

        <ul>
          <li>
            <strong>Datum:</strong>
            30.04 bis 03.05.2026
          </li>
          <li>
            <strong>Teilnahmebeitrag:</strong> 40 €;
            bitte bis <strong>28.4.</strong> überweisen an:<br />
            „Studentenmission in Deutschland“, IBAN: <code>DE26 5009 2100 0001 7549 39</code>, Verwendungszweck: Bitte vollen Namen angeben<br/>
            Alternativ Barzahlung vor Ort, bitte passend.
            <ul>
              <li>
                Anmerkung zum Preis: Falls du weniger geben kannst, melde dich gerne bei uns, wir finden eine Lösung!
              </li>
            </ul>
          </li>
          <li>
            <strong>Anreise per Bahn:</strong>
            Die Bahnanreise wird am Donnerstag gegen 15:00 Uh vom Hauptbahnhof in Karlsruhe starten.
            Am Sonntag sind wir gegen 15:00 Uhr wieder zurück in Karlsruhe
            Genauere Infos folgen.
          </li>
          <li>
            <strong>Anreise per Fahrrad:</strong>
            Die Fahrradanreise wird am Donnerstag gegen 12:30 Uhr aus der Stadtmitte von Karlsruhe starten.
            Am Sonntag sind wir gegen 17:00 Uhr wieder zurück in Karlsruhe.
            Fahrradfahrer können ihr Gepäck vor der Fahrt abgeben.
            Genauere Infos folgen.
          </li>
          <li>
            <strong>Selbstständige Anreise:</strong>
            Ab ca. 17:00 Uhr solltest du ankommen im<br />
            Mönchszellerweg 39
            69257 Wiesenbach (Kühlberghütte).
            <a href="https://maps.app.goo.gl/wVvywftginHZcXUV8">
              Ort auf Google Maps
            </a>
          </li>
        </ul>

        <p> 
          Falls du für die SAFT Sportmaterialien mitnimmst trage dies bitte
          <a href="https://docs.google.com/spreadsheets/d/1elIUUx3LKdrvCmuGbXDzUgSeF2iMWq7bZRdVswGHLYM/edit?usp=sharing#gid=1249910745">im Mastersheet unter "SAFT SS26"</a>
          ein.
        </p>

        <h3>2) Packliste</h3>

        <ul>
          <li>Schlafsack und Isomatte/Luftmatratze </li>
          <li>Zelt </li>
          <li>Evtl. kleines Kissen oder Kopfkissenbezug </li>
          <li>(wiedererkennbares) Geschirrhandtuch</li>
          <li>für das gemeinsame Frühstück: dein Lieblings-Brotaufstrich</li>
          <li>Evtl. Hängematte</li>
          <li>Evtl. Campingstuhl</li>
          <li>Evtl. Picknickdecke</li>
          <li>Evtl. Lichterketten (Batteriebetrieben)</li>
          <li>Kuchen (falls angekreuzt, oder als Überraschung)</li>
          <li>Beilage zum Grillen für Donnerstagabend (falls angekreuzt, oder als Überraschung)</li>
        </ul>

        <ul>
          <li>Wetterfeste Kleidung (Regenjacke, warme Pullis, ggfs. Regenhose)</li>
          <li>festes Schuhwerk und Sport-/Outdoorschuhe (die auch dreckig werden dürfen)</li>
          <li>Wechselsachen (alles, was du für ein Wochenende brauchst)</li>
          <li>Hausschuhe (Für in der Hütte bei schlechtem Wetter)</li>
          <li>Handtuch</li>
        </ul>

        <ul>
          <li>Bibel</li>
          <li>ein kleines Notizheft oder Tagebuch (für Gebete & Gedanken)</li>
          <li>
            Spiele (z.B. Wikingerschach, Bälle, Karten- & Brettspiele, …)
          </li>
          <li>Taschenlampe oder Stirnlampe (+ Ersatzbatterien)</li>
          <li>Taschenmesser</li>
          <li>Ohrstöpsel (für ruhigeren Schlaf)</li>
        </ul>

        <p>
          Bei Fragen melde dich gerne bei uns!
        </p>

        <p>
          Wir freuen uns auf eine gesegnete, abenteuerliche und
          gemeinschaftliche Zeit mit euch!
        </p>
        <p><strong>Euer SAFT-Orga-Team</strong></p>
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
					Irgendetwas ging schief.
					Bitte überprüfe deine Internetverbindung
					oder probiere es später noch einmal.
				</p>
			{:else}
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
						Die <strong class="font-bold">Bahnanreise</strong> wird am Freitag gegen 16:00 vom
						Hauptbahnhof in Karlsruhe starten.
						<br />Am Sonntag sind wir gegen 16:00 wieder zurück in Karlsruhe
					</p>

					<p>
						Die <strong class="font-bold">Fahrradanreise</strong> wird am Freitag gegen 13:00 aus
						der Stadtmitte von Karlsruhe starten.
						<br /> Am Sonntag sind wir gegen 17:00 wieder zurück in Karlsruhe.
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
					<!-- +++ SS25 +++
					<CheckboxInput name="comes_friday" label="Anreise am Freitag"></CheckboxInput>
					-->
					<label for="travel_comments">
						<bold class="font-bold">Anmerkungen zur Anreise oder Abreise.</bold> (z.B. ich reise verspätet
						an oder ich reise früher wieder ab.)</label
					>
					<textarea class="rounded-md border-2" name="travel_comments" id="travel_comments" rows="2"
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
					<p>Wir wollen am Donnerstagabend Grillen, dafür kann ich folgende Beilage mitbringen:</p>
					<InputField name="side_dish" label="" disabled={loading} />
				</div>
				<div>
				<p>Ich koche gerne (1 = ungerne, 5 = gerne)</p>

				{#each [1, 2, 3, 4, 5] as num (num)}
					<label>
					<input
						type="radio"
						name="likes_cooking"
						value={num}
						bind:group={likes_cooking}
						disabled={loading}
					/>
					{num}
					</label>
				{/each}
				</div>
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
				<InputCheckbox name="fairy_lights" label="Ich kann eine/mehrer batteriebetriebene(n) Lichterketten mitbringen"/>


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
					<option value="never">Bitte veröffentlicht keine Bilder von mir</option>
				</select>
				<p class="text-sm font-bold">
					Anmerkung des Public Relations und IT-Teams: Es werden generell nur Bilder veröffentlicht,
					auf denen ihr gut ausseht, sollten Zweifel bestehen oder wir es als grenzwertig ansehen,
					fragen wir nochmal im Einzelfall nach. Bitte habt Verständnis, dass wir dies nicht für
					jedes Bild/Video machen wollen, da es unsere Arbeit dann ungemein erschwert. Danke
					schonmal und wir freuen uns auf fröhliche und lustige Bilder von der SAFT :P
				</p>

				<div class="flex flex-col">
					<label for="comments">
						<b>Sonstige Anmerkungen </b>
						<p>
							Falls du ein Instrument hast und es mitbringen möchstest, lass es uns hier wissen.
							Falls du angegeben hast, dass du mit dem Auto anreist und Gepäck mitnehmen kannst,
							lass uns auch hier wissen wie viel Platz du hast.
						</p>
						<p>Auch sonstige Anmerkungen zur Anmeldung zur SAFT kannst du hier gerne vermerken.</p>
						<!-- <p>
							Schreib uns hier auch gerne, falls du ein <b>Instrument mitbringen</b>
							könntest oder du ein <b>Auto hast</b>, was wir nutzen könnten. Für die Instrumente
							organisieren wir gerne einen Transport mit dem Auto.
						</p>
						<p>
							Falls du Anmerkungen zu deinem Outdoormaterial hast, lass es uns gerne auch hier
							Wissen.
						</p> -->
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
