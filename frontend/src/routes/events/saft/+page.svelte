<script>
	import HeroShot from '$lib/components/HeroShot.svelte';
	import Saos from 'saos';
	import header from '$lib/assets/saft/saft_group_ss24.jpg';
	import promoVid from '$lib/assets/videos/saft.mp4';
	import saftFunny from '$lib/assets/saft/saft_funny.png';
	import saftGroup from '$lib/assets/heroshots/saft_heroshot.png';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faCalendarDays, faCoins, faLocationDot } from '@fortawesome/free-solid-svg-icons';
</script>

<HeroShot imgSrc={header} height={'h-[70svh]'}></HeroShot>

<main class="container mx-auto flex flex-col text-lg max-md:gap-10 max-md:py-10 md:gap-24 md:py-24">
	<div class="container flex flex-col gap-6 px-4 xl:px-80">
		<h1 class="text-center text-5xl font-bold uppercase max-md:hidden">SemesterAnfangsFreizeiT</h1>
		<h1 class="text-5xl font-bold uppercase max-md:text-center md:hidden">saft</h1>
	</div>

	<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
		<div class="grid gap-8 px-4 lg:grid-cols-2 xl:px-60">
			<img class="max-lg:hidden" alt="Semesterprogramm" src={saftGroup} />

			<div class="flex flex-col gap-4">
				<h1 class="text-4xl font-bold uppercase">Worum gehts?</h1>
				<p>
					Die SAFT ist die <bold class="font-bold">S</bold>emester<bold class="font-bold">A</bold
					>nfangs<bold class="font-bold">F</bold>reizei<bold class="font-bold">T</bold> der SMD Karlsruhe.
					Sie findet immer am Anfang des Semesters statt und ist eine gute Möglichkeit, die SMD und andere
					Studierende kennenzulernen.
				</p>
				<a href="/saft/signup" class="pointer w-fit bg-black p-4 text-white">Jetzt anmelden</a>
				<!-- <div class="w-fit bg-gray-500 p-4 text-white">Anmeldung ab Mitte Oktober</div> -->
			</div>
			<img class="lg:hidden" alt="Semesterprogramm" src={saftGroup} />
		</div>
	</Saos>

	<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
		<div class="grid gap-8 px-4 lg:grid-cols-2 xl:px-60">
			<div class="flex flex-col gap-4 text-right">
				<h1 class="text-4xl font-bold uppercase">Die Fakten</h1>
				<div class="mt-4 flex flex-col items-end gap-2 text-lg md:text-xl">
					<div class="flex items-center gap-2">
						<Fa class="text-primary" icon={faCalendarDays} />
						Datum: 15. - 17. November 2024
					</div>
					<div class="flex items-center gap-2">
						<Fa class="text-primary" icon={faCoins} />
						Preis: 40 €
					</div>
					<div class="flex flex-col">
						<div class="flex justify-end gap-2">
							<Fa class="text-primary mt-1 justify-self-end" icon={faLocationDot} />
							Ort: Reichardtstraße 21,
						</div>
						<div>75417 Mühlacker (Mühlhausen)</div>
					</div>
					<a href="https://maps.app.goo.gl/gpNex3XSDMUVz4T46" class="w-fit bg-black p-4 text-white">
						Auf Google Maps anschauen
					</a>
				</div>
			</div>
			<img alt="Semesterprogramm" src={saftFunny} />
		</div>
	</Saos>

	<div class="px-4 xl:px-60">
		<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
			<h1 class="text-4xl font-bold uppercase">Wie sieht's da aus?</h1>
			<p>
				Um einen Eindruck von der SAFT zu bekommen, schau dir gerne einfach das Video an. Wir werden
				ein geniales Wochenende mit Andachten, Workshops, Sport, Spielen, Singen, Beten, Lobpreis
				und vielem mehr verbringen. Selbstverständlich wird auch genug Zeit zum Relaxen, Quatschen
				und Chillen sein. Highlight-Empfehlung des Autors: Nachts Baden in der Enz!
				<br />
				<br />
				<span class="font-bold">Wir freuen uns riesig, wenn du mit dabei bist!</span>
			</p>
		</Saos>

		<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
			<video class="py-16" controls>
				<source src={promoVid} type="video/mp4" />
				<track kind="captions" />
				Your browser does not support the video tag.
			</video>
		</Saos>
		<section class="py-12">
			<h1 class="pb-0">Du bist dabei?</h1>
			<h3 class="pb-6">Dann nichts wie los melde dich an!</h3>

			<a href="/saft/signup" class="bg-black p-4 text-white">Hier geht's zur Anmeldung</a>
		</section>
	</div>
</main>
