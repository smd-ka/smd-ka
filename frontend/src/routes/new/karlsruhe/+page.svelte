<script lang="ts">
	import turmberg_img from '$lib/assets/pages/new/turmberg.jpg';
	import schlossgarten_img from '$lib/assets/pages/new/schlossgarten.jpg';
	import epplesee_img from '$lib/assets/pages/new/epplesee.jpg';
	import oxford_img from '$lib/assets/pages/new/oxford.png';
</script>

<main class="main">
	<section class="pad">
		<h1 class="text-center max-sm:text-4xl">Empfehlungen</h1>

		<p>
			Hier findest du einige Tipps und Infos von SMDlern über Karlsruhe und das Studium. Egal ob du
			schon entschieden hast, dass du nach Karlsruhe ziehst oder noch am Überlegen bist, ob
			Karlsruhe der richtige Ort für dich ist, hier findest du einige Infos, die dir bei deiner
			Entscheidung helfen können. Außerdem haben wir einige Tipps für dich, falls du gerade neu in
			Karlsruhe bist.
		</p>

		<h2 class="pt-8">Leben</h2>
		<p>
			<b> Karlsruhe = Beschte. </b> Nicht nur sind wir die Residenz des Rechts, sondern auch die
			Fächerstadt. Mit dem Karlsruher Institut für Technologie (KIT), der Pädagogischen Hochschule
			(PH) und der Hochschule Karlsruhe (HKA) sowie vielen kleinen Hochschulen mehr ist Karlsruhe
			eine absolute Studentenstadt. UND Karlsruhe ist Fahrradstadt. Daher empfehlen wir, lege dir
			sobald wie möglich eins zu. Wenn du zudem ein wahrer SMDler werden willst: Helm auf! Wenn du
			diesen Insider verstehen willst, schau vorbei 😉.
			<br />
			Um dir einen kleinen Einblick in das Leben in Karlsruhe zu geben und dir eine Idee zu geben, welche
			Orte du unbedingt einmal besuchen solltest, haben wir dir hier eine Liste zusammengestellt:
		</p>

		<div class="grid gap-4 py-20 md:grid-cols-2 md:gap-y-16">
			<img alt="Schlossgarten" class="h-48 w-full object-cover" src={schlossgarten_img} />

			<div>
				<h3>Der Schlo(ssgarten)</h3>

				<p>
					Der ideale Treffpunkt zum abhängen, Sonne genießen, Spikeball spielen und vielem mehr.
					Egal ob unter der Woche nach der Uni oder am Wochenende der Schlossgarten ist Karlsruhes
					offenes Wohnzimmer. (Zumindest im Sommer :P)
				</p>
			</div>

			<div>
				<h3>Der Turmberg</h3>

				<p>
					Karlsruhe von oben sehen? Dann ab auf den Turmberg. Besonders zum Sonnenuntergang genießen
					ist dies der perfekte Ort. Außerdem befindet sich ein Hochseilgarten auf dem Turmberg.
				</p>
			</div>
			<img alt="Turmberg" class="h-48 w-full object-cover" src={turmberg_img} />

			<div class="flex justify-center">
				<img alt="Oxford" class="h-48 object-cover" src={oxford_img} />
			</div>
			<div>
				<h3>Das Oxford Pub</h3>

				<p>
					Lecker und günstig als Student essen gehen? Dann ab ins Oxford Pub. Hier gibt es leckere
					Burger und gutes Bier. Direkt neben dem KIT Campus ist das Oxford eine beliebte Adresse
					für einen gemütlichen Abend mit Freunden.
				</p>
			</div>

			<div>
				<h3>Der Epplesee</h3>
				<p>
					Erfrischung gefällig? Nur eine kleine Fahrradtour entfernt (ca. 10km) liegt im Süden von
					Karlsruhe der Epplesee. Der See überzeugt mit einer großen Liegewiese und einem schönen
					Strand. Tipp: Hier lohnt es sich besonders auszunutzen, dass du Student bist und unter der
					Woche bzw. Vormittags zu gehen.
				</p>
			</div>
			<img alt="Epplesee" class="h-48 w-full object-cover" src={epplesee_img} />
		</div>

		<!-- Frühstück beim Extrablatt Epplesee, Weingarten,

		<h2 class="pt-8">Studieren.</h2>
		<p>Auch wenn manche von uns behaupten würden, dass sie SMD mit Nebe</p> -->
	</section>
</main>
