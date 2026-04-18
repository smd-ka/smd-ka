<script lang="ts">
	import turmberg_img from '$lib/assets/pages/new/turmberg.jpg';
	import schlossgarten_img from '$lib/assets/pages/new/schlossgarten.jpg';
	import epplesee_img from '$lib/assets/pages/new/epplesee.jpg';
	import background from '$lib/assets/pages/events/semesterprogramm/bg.png';
	import { Locations } from './locations';
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
			{#each Locations as location}
				<a
					href={location.url}
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-lg p-4 shadow-lg transition-all duration-100 hover:scale-105 {location.isCafe
						? 'bg-background-orange'
						: 'bg-slate-300'} bg-opacity-50"
				>
					<h3 class="text-center">{location.name}</h3>
					<p>
						{#each location.pros as pro}
							+ {pro}<br />
						{/each}
					</p>
				</a>
			{/each}
		</div>

		<p class="px-4 py-6 text-center font-bold">
			Nur eine kleine Auswahl; du wirst lange genug studieren, um dich durch Karlsruhe
			durchzufuttern (und trinken). Es gibt noch so viel mehr Cafés und Restaurants! Pack dir ein
			paar Freunde oder (Lehr)Bücher ein und probier sie aus!
		</p>
	</div>
</section>
