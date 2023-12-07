<script>
	import header from '$lib/assets/heroshots/regiokon_heroshot.png';
	import HeroShot from '$lib/components/HeroShot.svelte';
</script>

<HeroShot imgSrc={header} bgPosition="bg-bottom" title="Regiokon" />

<main class="card container mx-auto mt-10 flex flex-col gap-4">
	<div>
		<div class="text-secondary-text grid grid-cols-2 text-3xl uppercase md:text-7xl">
			<div>Jeder <br /> ein</div>
			<div class="text-right">Christ <br /> Optimist</div>
		</div>
		<div class="text-secondary-text text-right text-4xl tracking-widest max-md:text-lg">
			Erschreckend Ermutigt 2024
		</div>
	</div>

	<div class="grid gap-10 lg:mx-10 lg:grid-cols-2">
		<div class="md:text-xl">
			Regiokon, kann man das Essen? Auch! Aber nicht nur! Sie ist die Freizeit mit den SMD Gruppen
			aus deiner Region. Es gibt Input, Gemeinschaft, Spiele und Austausch. Und natürlich auch
			Essen. Und das alles in einer entspannten Atmosphäre. <br />
			Unser Leben zeichnet sich durch viele gesellschaftliche Herausforderungen der Gegenwart - was bedeutet
			das für unseren Glauben? Dazu wird Jonathan Mylius aus Heidelberg referieren. Mit seinen Denkanstößen
			laden wir aus der SMD-Karlsruhe euch ein dabei zu sein und in guter Gemeinschaft über die wichtigen
			aktuellen Fragen nachzudenken und zu diskutieren.
		</div>
		<div class="bg-light-blue h-fit rounded-md p-10 text-white md:text-2xl">
			<h1 class=" text-xl lg:text-5xl">Hard Facts</h1>
			<ul>
				<li>Wann: 12.-14. Januar 2024</li>
				<li>Wo: Karlsruhe</li>
				<li>Preis: 35€</li>
				<li>Anmeldeschluss: 7. Januar</li>
				<li>
					Fragen? Meld dich bei uns! <br />
					<a class="underline" href="mailto:regiokon24@smd-karlsruhe.de"
						>regiokon24@smd-karlsruhe.de</a
					>
				</li>
			</ul>
		</div>
	</div>

	<div class="mt-10 flex flex-col items-center gap-1">
		<div class="flex items-center rounded-md bg-slate-300 p-4 text-2xl max-md:flex-col md:gap-24">
			<div class="text-center">Du willst dabei sein? <br /> Dann melde dich jetzt an!</div>
			<a class="bg-primary rounded-md px-2 py-2" href="/regiokon/signup"> Jetzt anmelden </a>
		</div>
		<span>Alle Karlsruher melden sich bitte über den interen Bereich an!</span>
	</div>
</main>
