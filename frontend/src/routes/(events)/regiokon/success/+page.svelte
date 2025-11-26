<script>
	import { _success_regiokon_record } from '../+page';
</script>

<main class="container mx-auto py-24">
	<h1 class="mb-6 text-center text-4xl font-bold">
		Du bist dabei! <br /> Deine Anmeldung war erfolgreich.
	</h1>
	<p class="mb-12 text-center">
		Wir freuen uns, dich bei der Regiokon 2026 dabei zu haben. Weitere Informationen werden dir in
		Kürze per E-Mail zugeschickt.
	</p>

	{#if $_success_regiokon_record}
		Hier nochmal deine angegeben Daten zur Kontrolle:
		<pre class="whitespace-pre-wrap rounded-md border-2 bg-gray-100 p-4">
			Name: {$_success_regiokon_record.name} {$_success_regiokon_record.surname}
			E-Mail: {$_success_regiokon_record.email}
			Telefon: {$_success_regiokon_record.phone}
			Geschlecht: {$_success_regiokon_record.gender === 'female' ? 'Weiblich' : 'Männlich'}
			SMD-Gruppe: {$_success_regiokon_record.smd_group}
			Anmerkungen zur Anreise: {$_success_regiokon_record.travel_comments}

			Wo arbeitest du gerade in deiner Gruppe mit?: {$_success_regiokon_record.question1}
			Welche Aufgabe/Erfahrung möchtest du im nächsten Semester machen?: {$_success_regiokon_record.question2}
			Dürfen wir Bilder von dir während der Veranstaltung machen und für
			Veröffentlichungen verwenden? {$_success_regiokon_record.image_publication_consent === 'yes'
				? 'Ja'
				: $_success_regiokon_record.image_publication_consent === 'no_website'
					? 'Ja, aber nicht auf der Webseite'
					: $_success_regiokon_record.image_publication_consent === 'no_instagram'
						? 'Ja, aber nicht auf Instagram'
						: 'Nein'}
			Vegetarier: {$_success_regiokon_record.is_vegetarian ? 'Ja' : 'Nein'}
			Allergien/Unverträglichkeiten: {$_success_regiokon_record.allergies}
			Anmerkungen: {$_success_regiokon_record.comments}
		</pre>

		Stimmt was nicht? Melde dich gerne bei uns unter
		<a class="text-blue-600 underline" href="mailto:webmaster@smd-karlsruhe.de">
			webmaster@smd-karlsruhe.de
		</a>.
	{/if}
</main>
