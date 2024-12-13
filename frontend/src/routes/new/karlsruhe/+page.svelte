<script lang="ts">
	import turmberg_img from '$lib/assets/pages/new/turmberg.jpg';
	import schlossgarten_img from '$lib/assets/pages/new/schlossgarten.jpg';
	import epplesee_img from '$lib/assets/pages/new/epplesee.jpg';
	import { faCoins, faLocationDot } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import background from '$lib/assets/pages/events/semesterprogramm/bg.png';

	let carousel;
</script>

<main class="main">
	<section class="pad">
		<h1 class="text-center max-sm:text-4xl">Karlsruhe</h1>

		<p>
			Egal ob du schon entschieden hast, dass du nach Karlsruhe ziehst oder noch am Überlegen bist,
			ob Karlsruhe der richtige Ort für dich ist, hier findest du einige Infos, die dir bei deiner
			Entscheidung helfen können. Außerdem haben wir einige Tipps für dich, falls du gerade neu in
			Karlsruhe bist.
		</p>

		<h2 class="pt-8">Leben</h2>
		<p>
			<b> Karlsruhe = Beschte. </b> Nicht nur sind wir die Residenz des Rechts, sondern auch die
			Fächerstadt: schau dir KA auf Maps an, da stellt man fest, dass die Straßen vom Schloss aus
			<i>fächer</i>förmig gebaut sind. Mit dem Karlsruher Institut für Technologie (KIT), der
			Pädagogischen Hochschule (PH) und der Hochschule Karlsruhe (HKA) sowie vielen kleinen
			Hochschulen mehr ist Karlsruhe eine absolute Studentenstadt. UND Karlsruhe ist Fahrradstadt!
			Daher empfehlen wir, lege dir sobald wie möglich eins zu. Wenn du zudem ein wahrer SMDler
			werden willst: Helm auf! Wenn du diesen Insider verstehen willst, schau vorbei 😉.
		</p>
		<p class="p-4 text-center font-bold md:text-2xl">
			SMDler findet man auch in freier Wildbahn. Unter anderem gerne hier:
		</p>
		<div class="grid gap-4 md:grid-cols-3">
			<div class="rounded-lg bg-slate-200">
				<img alt="Turmberg" class="h-48 w-full rounded-t-lg object-cover" src={turmberg_img} />

				<div class="p-2">
					<h3>Auf dem Turmberg</h3>
					<p>
						Karlsruhe von oben sehen? Dann ab auf den Turmberg! Viel mehr Höhenmeter gibt es hier
						auch nicht (zum Glück für die Radler ;). Besonders, um den Sonnenuntergang zu genießen,
						ist dies der perfekte Ort. Außerdem befindet sich ein Hochseilgarten auf dem Turmberg.
					</p>
				</div>
			</div>

			<div class="rounded-lg bg-slate-200">
				<img
					alt="Schlossgarten"
					class="h-48 w-full rounded-t-lg object-cover"
					src={schlossgarten_img}
				/>

				<div class="p-2">
					<h3>Im Schlo(ssgarten)</h3>
					<p>
						Der ideale Treffpunkt zum Abhängen, Sonnegenießen, Spikeballspielen und vielem mehr.
						Egal ob unter der Woche nach der Uni oder am Wochenende; der Schlossgarten ist
						Karlsruhes offenes Wohnzimmer. (Zumindest im Sommer :P)
					</p>
				</div>
			</div>

			<div class="rounded-lg bg-slate-200">
				<img alt="Epplesee" class="h-48 w-full rounded-t-lg object-cover" src={epplesee_img} />
				<div class="p-2">
					<h3>Am Epplesee</h3>
					<p>
						Erfrischung gefällig? Nur eine kleine Fahrradtour entfernt (ca. 10km vom Schloss) liegt
						im Süden von Karlsruhe der Epplesee. Der See überzeugt mit einer großen Liegewiese und
						einem schönen Strand. Tipp: Hier lohnt es sich besonders auszunutzen, dass du Student
						bist und entsprechend unter der Woche bzw. vormittags zu gehen.
					</p>
				</div>
			</div>
		</div>
	</section>
</main>

<section style="background-image: url({background});">
	<div class="container mx-auto px-4 py-12">
		<h2 class="text-center">Unsere Lieblingscafés und Restaurants</h2>

		<div class="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
			<div class="rounded-lg bg-slate-300 bg-opacity-50 p-4 shadow-lg">
				<h3 class="text-center">Oxford Pub</h3>

				<div class="fa"><Fa icon={faCoins} /> günstig</div>
				<div class="fa"><Fa icon={faLocationDot} /> Direkt am KIT</div>

				<p>
					+ Lecker und günstig <br />
					+ Bekannt für gute Burger <br />
					+ Über 100 Biersorten <br />
					+ Super nah am KIT <br />
					+ So richtige pub vibes
				</p>
			</div>

			<div class="rounded-lg bg-[#fde9b1] bg-opacity-50 p-4 shadow-lg">
				<h3 class="text-center">Café Wohnzimmer</h3>
				<p>
					+ Macht seinem Namen alle Ehre<br />
					+ In unmittelbarer KIT-Nähe <br />
					+ Explizit glutenfreie Kuchen <br />
					+ Auch zum Mitnehmen
				</p>
			</div>

			<div class="rounded-lg bg-slate-300 bg-opacity-50 p-4 shadow-lg">
				<h3 class="text-center">Café Bleu</h3>

				<p>
					+ Entgegen des Namens kein Café, sondern tatsächlich ein Restaurant<br />
					+ Zentral am Mühlburger Tor <br />
					+ Studentenfreundliche Preise und lecker <br />
					+ Netter Biergarten
				</p>
			</div>

			<div class="rounded-lg bg-[#fde9b1] bg-opacity-50 p-4 shadow-lg">
				<h3 class="text-center">Iaro</h3>
				<p>
					+ KIT-Nähe <br />
					+ Minimalistische Ästhetik <br />
					+ Hauseigene Produkte <br />
					+ Bieten Workshops zu Latte Art und als Barista ein
				</p>
			</div>

			<div class="rounded-lg bg-slate-300 bg-opacity-50 p-4 shadow-lg">
				<h3 class="text-center">Kim Fat</h3>

				<p>
					+ Günstig <br />
					+ Restaurant<br />
					+ Chinesische, thailändische und vietnamesische Gerichte <br />
					+ Klein und fein, betrieben nur von einem Ehepaar <br />
					<!-- TODO Make sure this is correct  -->
					+ Zentral am Kronenplatz
				</p>
			</div>

			<div class="rounded-lg bg-[#fde9b1] bg-opacity-50 p-4 shadow-lg">
				<h3 class="text-center">Berry Su</h3>
				<!-- TODO -->
				<p>
					+ Minimalistische Ästhetik <br />
					+ Zentral, Kaiserstraße <br />
					+ Hauseigene Produkte <br />
					+ Bieten Workshops zu Latte Art und als Barista ein
				</p>
			</div>

			<div class="rounded-lg bg-slate-300 bg-opacity-50 p-4 shadow-lg">
				<h3 class="text-center">L'Osteria</h3>

				<p>
					+ Günstig <br />
					+ Restaurant<br />
					+ Chinesische, thailändische und vietnamesische Gerichte <br />
					+ Klein und fein, betrieben nur von einem Ehepaar <br />
					<!-- TODO Make sure this is correct  -->
					+ Zentral am Kronenplatz
				</p>
			</div>

			<div class="rounded-lg bg-[#fde9b1] bg-opacity-50 p-4 shadow-lg">
				<h3 class="text-center">Yollie - The Popice Café</h3>
				<p>
					+ Liebevoll gestaltete Produkte <br />
					+ (Fast) alles hausgemacht <br />
					+ Sehr gut für Teeliebhaber <br />
				</p>
			</div>

			<div class="rounded-lg bg-slate-300 bg-opacity-50 p-4 shadow-lg">
				<h3 class="text-center">El Taquito</h3>
				<!-- TODO Ort Ergänzen -->
				<p>
					+ Verschiedene mexikanische Gerichte <br />
					+ Super lecker
				</p>
			</div>

			<div class="rounded-lg bg-[#fde9b1] bg-opacity-50 p-4 shadow-lg">
				<h3 class="text-center">Café Mats</h3>
				<!-- TODO -->
				<p>
					+ Liebevoll gestaltete Produkte <br />
					+ (Fast) alles hausgemacht <br />
					+ Sehr gut für Teeliebhaber <br />
				</p>
			</div>
		</div>

		<p class="px-4 py-6 text-center font-bold">
			Nur eine kleine Auswahl; du wirst lange genug studieren, um dich durch Karlsruhe
			durchzufuttern (und trinken). Es es gibt noch so viel mehr Cafés und Restaurants! Pack dir ein
			paar Freunde oder (Lehr)Bücher ein und probier sie aus
		</p>
	</div>
</section>
