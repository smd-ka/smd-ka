<script>
	import HeroShot from '$lib/components/HeroShot.svelte';
	import Saos from 'saos';
	import header from '$lib/assets/saft/saft_flyer.png';
	import header_mobile from '$lib/assets/saft/saft_flyer_mobile.png';
	import promoVid from '$lib/assets/videos/saft.mp4';
	import saftFunny from '$lib/assets/saft/saft_funny.png';
	import saftGroup from '$lib/assets/heroshots/saft_heroshot.png';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faCalendarDays, faCoins, faLocationDot } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="relative">
	<img src={header} alt="Herzenssache" class="w-full max-md:hidden" />
	<img src={header_mobile} alt="Herzenssache" class="w-full md:hidden" />
	<h1
		class="absolute left-20 top-1/2 z-20 -translate-y-1/2 text-5xl font-bold uppercase max-md:hidden xl:text-6xl"
	>
		From <br /> the Inside <br /> out
	</h1>
	<h1
		class="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap text-2xl font-bold uppercase md:hidden"
	>
		From the Inside out
	</h1>
</div>

<main class="container mx-auto flex flex-col gap-24 py-24 text-lg">
	<div class="container flex flex-col gap-6 px-4 xl:px-80">
		<h1 class="text-5xl font-bold uppercase max-md:hidden max-md:text-center">
			SemesterAnfangsFreizeiT
		</h1>
		<h1 class="text-5xl font-bold uppercase max-md:text-center md:hidden">saft</h1>
	</div>

	<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
		<div class="grid gap-8 px-4 lg:grid-cols-2 xl:px-60">
			<img alt="Semesterprogramm" src={saftGroup} />

			<div class="flex flex-col gap-4">
				<h1 class="text-4xl font-bold uppercase">Worum gehts?</h1>
				<p>
					Die SAFT ist die <bold class="font-bold">S</bold>emester<bold class="font-bold">A</bold
					>nfangs<bold class="font-bold">F</bold>reizei<bold class="font-bold">T</bold> der SMD
					Karlsruhe. Sie findet immer am Anfang des Semesters statt und ist eine gute Möglichkeit,
					die SMD und andere Studierende kennenzulernen. Unser Motto für diese SAFT ist
					<bold class=" whitespace-nowrap font-bold uppercase">From the inside out</bold>. Um
					herauszufinden, was das mit dir und unserem Semesterthema "Herzenssache" zu tun hat, melde
					dich jetzt gleich an!
				</p>
				<a href="/saft" class="w-fit bg-black p-4 text-white">Jetzt anmelden</a>
			</div>
		</div>
	</Saos>

	<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
		<div class="grid gap-8 px-4 lg:grid-cols-2 xl:px-60">
			<div class="flex flex-col gap-4 text-right">
				<h1 class="text-4xl font-bold uppercase">Die Fakten</h1>
				<div class="mt-4 flex flex-col items-end gap-2 text-lg md:text-xl">
					<div class="flex items-center gap-2">
						<Fa class="text-primary" icon={faCalendarDays} />
						Datum: 3 - 5 Mai
					</div>
					<div class="flex items-center gap-2">
						<Fa class="text-primary" icon={faCoins} />
						Preis: 40€
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
			<h1 class="text-4xl font-bold uppercase">Wie siehts da aus?</h1>
			<p>
				Um einen Eindruck von der SAFT zu bekommen schau dir gerne einfach das Video an. Wir werden
				ein geniales Wochenende mit Andachten, Workshops, Sport, Spielen, Singen, Beten, Lobpreis
				und vielem mehr verbringen. Selbstverständlich wird auch genung Zeit zum relaxen, quatschen
				und chillen sein. Highlight-Empfehlung des Autors: Nachts Baden in der Enz!
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

		<h1 class="py-10 text-5xl font-bold uppercase">
			Du bist dabei? Dann nichts wie los melde dich an!
		</h1>
		<a href="/saft" class="w-fit bg-black p-4 text-white">Hier gehts zur Anmeldung</a>
	</div>
</main>
