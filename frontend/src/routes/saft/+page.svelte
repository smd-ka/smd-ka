<script>
	import HeroShot from '$lib/components/HeroShot.svelte';
	import header from '$lib/assets/heroshots/saft_heroshot.jpg';
	import promoVid from '$lib/assets/videos/saft.mp4';
	import saftFunny from '$lib/assets/saft/saft_funny.jpg';
	import saftBike from '$lib/assets/saft/saft_bike.jpg';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faCalendarDays, faCoins, faLocationDot } from '@fortawesome/free-solid-svg-icons';
</script>

<HeroShot imgSrc={header} title="SAFT" />

<main class="card container mx-auto mt-10">
	<h1 class="text-primary text-center text-2xl lg:text-4xl">SAFT Wintersemester 2022/23</h1>

	<div class="grid gap-4 md:grid-cols-2 md:gap-10 md:p-10 md:text-lg">
		<div class="flex flex-col gap-4">
			<div>
				Die SAFT ist die <bold class="font-bold">S</bold>emester<bold class="font-bold">A</bold
				>nfangs<bold class="font-bold">F</bold>reizei<bold class="font-bold">T</bold> der SMD
				Karlsruhe. Sie findet immer am Anfang des Semesters statt und ist eine gute Möglichkeit, die
				SMD und andere Studierende kennenzulernen. Unser Motto für diese SAFT
				<bold class=" whitespace-nowrap font-bold">- Vitamin B -</bold>
				Unter dem Semesterthema "Gemeinsam wachsen" wollen wir zusammen auftanken und unsere Beziehung
				zu Gott und untereinander stärken.
				<div class="mt-2 flex justify-center">
					<a href="/saft/signup" class="bg-primary rounded-md px-4 py-2"> Jetzt anmelden </a>
				</div>
			</div>
		</div>

		<video class="rounded-md" controls>
			<source src={promoVid} type="video/mp4" />
			<track kind="captions" />
			Your browser does not support the video tag.
		</video>

		<img
			class="rounded-md max-md:hidden"
			src={saftFunny}
			alt="Lustige Person, die Apfelschlangen isst"
		/>

		<div class="flex flex-col gap-10 max-md:flex-col">
			<div class="mt-4 flex flex-col gap-2 text-lg md:text-xl">
				<div class="flex items-center gap-2">
					<Fa class="text-primary" icon={faCalendarDays} />
					Datum: 10 - 12 November
				</div>
				<div class="flex items-center gap-2">
					<Fa class="text-primary" icon={faCoins} />
					Preis: 40€
				</div>
				<div class="flex gap-2">
					<Fa class="text-primary mt-1" icon={faLocationDot} />
					Ort:
					<div>
						Mühlhausen <br />
						<a class="underline" href="https://maps.app.goo.gl/gpNex3XSDMUVz4T46">
							Reichardtstraße 21, 75417 Mühlacker</a
						>
					</div>
				</div>
			</div>

			<p>
				Die SAFT findet in Mühlhausen in der Nähe von Mühlacker statt. Dort gibt es ein
				abwechslungsreiches Programm mit Andachten, Workshops, Sport, Spielen, Singen, Beten,
				Lobpreis und vielem mehr. Außerdem wird auch genung Zeit zum relaxen, quatschen und chillen
				sein. Highlight-Empfehlung des Autors: Nachts Baden in der Enz!
			</p>
		</div>

		<img
			class="rounded-md md:hidden"
			src={saftFunny}
			alt="Lustige Person, die Apfelschlangen isst"
		/>

		<div class="flex flex-col gap-2">
			<p>
				Du fragst dich wie du zur SAFT kommst? Kein Problem, wir organisieren eine Fahrradtour bei
				der du vorher dein Gepäck abgeben kannst. Diese beginnt bereits Freitag Mittag, da ca. 50km
				zurückzulegen sind. Oder alternativ, falls du es lieber entspannt angehen lässt mit Bus und
				Bahn. Die genauen Infos dazu bekommst du nach der Anmeldung per E-Mail.
			</p>
			<p class="text-lg md:font-bold">Interesse geweckt? Dann nichts wie los melde dich an!</p>
			<button class="bg-primary w-fit rounded-md px-4 py-2"> Jetzt anmelden </button>
		</div>

		<img class="rounded-md" src={saftBike} alt="Lustige Person, die Apfelschlangen isst" />
	</div>
</main>
