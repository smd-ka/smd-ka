<script lang="ts">
	import kaheim from '$lib/assets/logos/kaheim.png';
	import rightArrow from '$lib/assets/icons/right-arrow-handdrawn.svg';
	import turnRightArrow from '$lib/assets/icons/turn-right-arrow.svg';
</script>

<main class="main">
	<section class="pad">
		<h1 class="text-center">Auf Wohnungssuche?</h1>
		<p>
			Du planst nach Karlsruhe zu ziehen und bist auf der Suche nach einer Wohnung? Wir wissen, dass
			das nicht immer einfach ist. Hier haben wir dir ein paar Anlaufstellen zusammengestellt, die
			dir bei deiner Suche helfen können: <br />
			Unter <a href="https://kaheim.de">kaheim.de</a>
			findest du eine Zimmerbörse für christliche WGs in Karlsruhe. Viele von uns haben gute Erfahrungen
			mit den
			<a href="https://abhrsh.de/">Wohnheimen der Katholischen Hochschulgemeinde</a> gemacht.
			Darüber hinaus empfehlen wir dir auch beim
			<a href="https://www.sw-ka.de/de/wohnen/">Studierendenwerk Karlsruhe</a> vorbei zu schauen. Auf
			deren Webseite findest du auch noch einige Tipps und Tricks, wie man am besten eine Wohnung findet.
			In Karlsruhe kommt man super mit dem Fahrrad oder den öffentlichen Verkehrsmitteln von A nach B.
			Es lohnt sich also auch mal ein Blick über den Tellerrand hinauszuwerfen und sich in den umliegenden
			Stadtteilen umzuschauen.
		</p>
	</section>

	<section class="flex items-center justify-center gap-4 max-md:flex-col-reverse md:gap-12">
		<p class="font-caveat text-4xl">Jetzt christliche WG finden</p>

		<div>
			<img src={rightArrow} class="mb-8 h-40 self-center max-md:hidden" alt="right arrow" />
		</div>
		<div class="flex gap-4">
			<img src={turnRightArrow} class="h-14 self-center md:hidden" alt="right arrow" />
			<a class="flex h-fit rounded-md bg-gray-200 p-4 shadow-md" href="https://kaheim.de">
				<img src={kaheim} class="h-14 self-center md:h-16" alt="kaheim logo" />
			</a>
		</div>
	</section>
</main>
