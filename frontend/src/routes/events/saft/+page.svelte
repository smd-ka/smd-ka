<script>
	import HeroShot from '$lib/components/HeroShot.svelte';
	import Saos from 'saos';
	import promoVid from '$lib/assets/videos/saft.mp4';
	import header from '$lib/assets/pages/events/saft/saft_group_WS24-25.jpg';
	import saftFunny from '$lib/assets/saft/saft_funny.png';
	import saftGroup from '$lib/assets/heroshots/saft_heroshot.png';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faCalendarDays, faCoins, faLocationDot } from '@fortawesome/free-solid-svg-icons';
</script>

<HeroShot imgSrc={header} height={'h-[70svh]'}></HeroShot>

<main class="container mx-auto flex flex-col gap-10 py-10 text-lg md:gap-24 md:py-24">
	<div class="container flex flex-col gap-6 px-4 xl:px-80">
		<h1 class="text-center max-md:hidden">SemesterAnfangsFreizeiT</h1>
		<h1 class="text-5xl font-bold uppercase max-md:text-center md:hidden">saft</h1>
	</div>

	<section class="grid gap-8 px-4 lg:grid-cols-2 xl:px-60">
		<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
			<img
				class="h-72 w-full object-cover object-top max-lg:order-last"
				alt="Bild von der SAFT"
				src={saftFunny}
			/>
		</Saos>

		<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
			<div class="grid">
				<h2>Worum gehts?</h2>
				<p>
					Die SAFT ist die
					<b>S</b>emester<b>A</b>nfangs<b>F</b>reizei<b>T</b>
					der SMD Karlsruhe. Sie findet immer am Anfang des Semesters statt und ist eine gute Möglichkeit,
					die SMD und andere Studierende kennenzulernen.
				</p>
				<!-- <a href="/saft/signup" class="pointer mt-4 w-fit bg-black p-4 text-white">Jetzt anmelden</a> -->
			</div>
			<b>
				Die Anmeldung für diese SAFT ist geschlossen. Falls du ganz spontan noch mit willst wende
				dich dich an <a href="mailto:inreach@smd-karlsruhe.de">Daniel.</a>.
			</b>

			<!-- <div class="mt-4 w-fit bg-gray-500 p-4 text-white">Anmeldung ab Mitte April</div> -->
		</Saos>

		<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
			<div class="grid justify-end text-right">
				<h2>Die Fakten</h2>
				<div class="flex items-center justify-end gap-2">
					<Fa class="text-primary" icon={faCalendarDays} />
					Datum: 1. - 4. Mai 2025
				</div>
				<div class="flex items-center justify-end gap-2">
					<Fa class="text-primary" icon={faCoins} />
					Preis: 40 € (35€ für Freitag bis Sonntag)
				</div>
				<p>
					Herzliche Einladung zu unserer SAFT im Sommersemester 2025. Diese SAFT ist etwas
					Besonderes, wir wollen gemeinsam campen und uns mit dem Thema “Zeuge sein” beschäftigen.
					Vieles vom Programm liegt dabei in eurer Hand, seid also gespannt, was euch erwartet! Wer
					mag, darf gerne an unserem Tech-Detox teilnehmen und das Handy daheim lassen. Ebenso
					wollen wir (wenn möglich) ganz in der Gegenwart ankommen und ebenfalls auf Uhren
					verzichten. Wir werden ca. 1,5 Stunden (mit der Bahn) von Karlsruhe entfernt sein.
				</p>
				<!-- <div class="flex justify-end gap-2">
					<Fa class="text-primary mt-1 justify-self-end" icon={faLocationDot} />
					Ort: Reichardtstraße 21,
				</div>
				<div>75417 Mühlacker (Mühlhausen)</div>
				<a href="https://maps.app.goo.gl/gpNex3XSDMUVz4T46" class="w-fit bg-black p-4 text-white">
					Auf Google Maps anschauen
				</a> -->
			</div>
		</Saos>
		<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
			<img alt="Semesterprogramm" src={saftGroup} />
		</Saos>
	</section>

	<div class="px-4 xl:px-60">
		<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
			<h2>Wie sieht's da aus?</h2>
			<p>
				Das Video zeigt dir einen kleinen Einblick einer vergangen SAFT, die nächste wird etwas
				anders, aber nicht weniger genial! Wir werden ein geniales Wochenende mit Andachten,
				Workshops, Sport, Spielen, Singen, Beten, Lobpreis und vielem mehr verbringen.
				Selbstverständlich wird auch genug Zeit zum Relaxen, Quatschen und Chillen sein.
				<!-- <br />
				<br />
				<span class="font-bold">Wir freuen uns riesig, wenn du mit dabei bist!</span> -->
			</p>
		</Saos>

		<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
			<video class="py-16" controls>
				<source src={promoVid} type="video/mp4" />
				<track kind="captions" />
				Your browser does not support the video tag.
			</video>
		</Saos>

		<!-- <section class="py-12">
			<h3 class="pb-6">Du bist dabei? Dann nichts wie los melde dich an!</h3>

			<a href="/saft/signup" class="bg-black p-4 text-white">Hier geht's zur Anmeldung</a>
		</section> -->
	</div>
</main>
