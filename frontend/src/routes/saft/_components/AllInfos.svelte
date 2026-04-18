<!-- mind consistency with mail template in backend! -->
<!-- info wall presented after successful registration -->

<script lang="ts">
	import InfoTravelBike from './InfoTravelBike.svelte';
	import InfoTravelIndependent from './InfoTravelIndependent.svelte';
	import InfoTravelTrain from './InfoTravelTrain.svelte';
</script>

<p>
	Wir freuen uns riesig, dass du bei unserem gemeinsamen SAFT-Wochenende dabei bist! Damit du dich
	schon gut & entspannt auf die SAFT vorbereiten kannst, findest du folgend die wichtigesten Punkte
	schnell zusammengefasst.
</p>

<h3>1) Allgemeines & Organisatorisches</h3>

<ul>
	<li>
		<strong>Datum:</strong>
		30.04 bis 03.05.2026
	</li>
	<li>
		<strong>Teilnahmebeitrag:</strong> 40 €; bitte bis <strong>28.4.</strong> überweisen an:<br />
		„Studentenmission in Deutschland“, IBAN: <code>DE26 5009 2100 0001 7549 39</code>,
		Verwendungszweck: Bitte vollen Namen angeben<br />
		Alternativ Barzahlung vor Ort, bitte passend.
		<ul>
			<li>
				Anmerkung zum Preis: Falls du weniger geben kannst, melde dich gerne bei uns, wir finden
				eine Lösung!
			</li>
		</ul>
	</li>
	<li>
		<InfoTravelTrain />
	</li>
	<li>
		<InfoTravelBike />
	</li>
	<li>
		<InfoTravelIndependent />
	</li>
</ul>

<p>
	Falls du für die SAFT Sportmaterialien mitnimmst trage dies bitte
	<a
		href="https://docs.google.com/spreadsheets/d/1elIUUx3LKdrvCmuGbXDzUgSeF2iMWq7bZRdVswGHLYM/edit?usp=sharing#gid=1249910745"
		>im Mastersheet unter "SAFT SS26"</a
	>
	ein.
</p>

<h3>2) Packliste</h3>

<ul>
	<li>Schlafsack und Isomatte/Luftmatratze</li>
	<li>Zelt</li>
	<li>Evtl. kleines Kissen oder Kopfkissenbezug</li>
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
	<li>Spiele (z.B. Wikingerschach, Bälle, Karten- & Brettspiele, …)</li>
	<li>Taschenlampe oder Stirnlampe (+ Ersatzbatterien)</li>
	<li>Taschenmesser</li>
	<li>Ohrstöpsel (für ruhigeren Schlaf)</li>
</ul>

<p>Bei Fragen melde dich gerne bei uns!</p>

<p>Wir freuen uns auf eine gesegnete, abenteuerliche und gemeinschaftliche Zeit mit euch!</p>
<p><strong>Euer SAFT-Orga-Team</strong></p>

<style>
	ul {
		@apply list-outside list-disc pl-6;
	}
</style>
