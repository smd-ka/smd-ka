<script lang="ts">
	import turmberg_img from '$lib/assets/pages/new/turmberg.jpg';
	import schlossgarten_img from '$lib/assets/pages/new/schlossgarten.jpg';
	import epplesee_img from '$lib/assets/pages/new/epplesee.jpg';
	import background from '$lib/assets/pages/events/semesterprogramm/bg.png';
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
					<h3>Am Baggersee</h3>
					<p>
						Erfrischung gefällig? Um Karlsruhe herum gibt es einige Baggerseen. Diese sind nur eine
						kleine Fahrradtour entfernt (ca. 10-15km vom Schloss). Besonders gerne sind wir unter
						andrem in Grötzingen, Weingarten und am Epplesee. Tipp: Es lohnt sich besonders
						auszunutzen, dass du Student bist und entsprechend unter der Woche bzw. vormittags zu
						gehen.
					</p>
				</div>
			</div>
		</div>
	</section>
</main>

<section style="background-image: url({background});">
	<div class="container mx-auto px-4 py-12">
		<h2 class="text-center">
			Unsere
			<span class="text-[#f1af71]"> Lieblingscafés </span> und
			<span class="text-slate-400"> Restaurants </span>
		</h2>

		<div class="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
			<a
				href="https://maps.app.goo.gl/ZAv8JF2UQCbBC7iNA"
				target="_blank"
				class="rounded-lg bg-slate-300 bg-opacity-50 p-4 shadow-lg transition-all duration-100 hover:scale-105"
			>
				<h3 class="text-center">Oxford Pub</h3>

				<p>
					+ Lecker und günstig <br />
					+ Super nah am KIT <br />
					+ Bekannt für gute Burger <br />
					+ Über 100 Biersorten <br />
					+ So richtige pub vibes
				</p>
			</a>

			<a
				href="https://maps.app.goo.gl/KGGCHYAdKRErAeEi9"
				target="_blank"
				class="rounded-lg bg-background-orange bg-opacity-50 p-4 shadow-lg transition-all duration-100 hover:scale-105"
			>
				<h3 class="text-center">Café Wohnzimmer</h3>
				<p>
					+ In unmittelbarer KIT-Nähe <br />
					+ Macht seinem Namen alle Ehre<br />
					+ Explizit glutenfreie Kuchen <br />
					+ Auch zum Mitnehmen
				</p>
			</a>

			<a
				href="https://maps.app.goo.gl/piRfuJ7n3KyvZPwC8"
				target="_blank"
				class="rounded-lg bg-slate-300 bg-opacity-50 p-4 shadow-lg transition-all duration-100 hover:scale-105"
			>
				<h3 class="text-center">Café Bleu</h3>

				<p>
					+ Entgegen des Namens kein Café, sondern tatsächlich ein Restaurant<br />
					+ Zentral am Mühlburger Tor <br />
					+ Studentenfreundliche Preise und lecker <br />
					+ Netter Biergarten
				</p>
			</a>

			<a
				href="https://maps.app.goo.gl/kS7Aq1PcCemoYoEy9"
				target="_blank"
				class="rounded-lg bg-background-orange bg-opacity-50 p-4 shadow-lg transition-all duration-100 hover:scale-105"
			>
				<h3 class="text-center">Iaro</h3>
				<p>
					+ KIT-Nähe; Karl-Wilhelm-Platz<br />
					+ Minimalistische Ästhetik <br />
					+ Hauseigene Produkte <br />
					+ Bieten Workshops zu Latte Art und als Barista ein <br />
					+ Gibts auch in der Weststadt (Sophienstraße)
				</p>
			</a>

			<a
				href="https://maps.app.goo.gl/8mqb3caoun7Ggq2M9"
				target="_blank"
				class="ransition-all rounded-lg bg-slate-300 bg-opacity-50 p-4 shadow-lg duration-100 hover:scale-105"
			>
				<h3 class="text-center">Kim Fat</h3>

				<p>
					+ Günstig <br />
					+ Direkt am Zirkel <br />
					+ Chinesische, thailändische und vietnamesische Gerichte <br />
					+ Klein und fein, betrieben nur von einem Ehepaar <br />
				</p>
			</a>

			<a
				href="https://maps.app.goo.gl/MzZo7Xs8q3iipk2x5"
				target="_blank"
				class="ransition-all rounded-lg bg-background-orange bg-opacity-50 p-4 shadow-lg duration-100 hover:scale-105"
			>
				<h3 class="text-center">Berry Su</h3>
				<p>
					+ Coole Specials je nach Jahreszeit <br />
					+ Super leckerer Kuchen <br />
					+ Zentral, Kaiserstraße <br />
				</p>
			</a>

			<a
				href="https://maps.app.goo.gl/9F7jtu93P8AcL5yeA"
				target="_blank"
				class="rounded-lg bg-slate-300 bg-opacity-50 p-4 shadow-lg duration-100 hover:scale-105"
			>
				<h3 class="text-center">L'Osteria</h3>

				<p>
					+ Günstig, Italienisch <br />
					+ Sehr große Pizzen <br />
					+ Zentral, direkt beim Marktplatz <br />
				</p>
			</a>

			<a
				href="https://maps.app.goo.gl/yBLWhJtX4yeYAos76"
				target="_blank"
				class="rounded-lg bg-background-orange bg-opacity-50 p-4 shadow-lg duration-100 hover:scale-105"
			>
				<h3 class="text-center">Yollie - The Popice Café</h3>
				<p>
					+ Innenstadt: Waldstraße <br />
					+ die Waffeln sind zu empfehlen <br />
					+ Etwas teurer, aber lecker <br />
					+ Boho Stil <br />
				</p>
			</a>

			<a
				href="https://maps.app.goo.gl/oVWvYWyqUF8c3Nod9"
				target="_blank"
				class="rounded-lg bg-slate-300 bg-opacity-50 p-4 shadow-lg duration-100 hover:scale-105"
			>
				<h3 class="text-center">El Taquito</h3>
				<p>
					+ Innenstadt; Passagenhof <br />
					+ Verschiedene mexikanische Gerichte <br />
					+ Super lecker
				</p>
			</a>

			<a
				href="https://maps.app.goo.gl/SpVfubUshfwnQ7fn6"
				target="_blank"
				class="rounded-lg bg-background-orange bg-opacity-50 p-4 shadow-lg duration-100 hover:scale-105"
			>
				<h3 class="text-center">Café Mats</h3>
				<p>
					+ Liebevoll gestaltete Produkte <br />
					+ (Fast) alles hausgemacht <br />
					+ Sehr gut für Teeliebhaber <br />
				</p>
			</a>
		</div>

		<p class="px-4 py-6 text-center font-bold">
			Nur eine kleine Auswahl; du wirst lange genug studieren, um dich durch Karlsruhe
			durchzufuttern (und trinken). Es gibt noch so viel mehr Cafés und Restaurants! Pack dir ein
			paar Freunde oder (Lehr)Bücher ein und probier sie aus!
		</p>
	</div>
</section>
