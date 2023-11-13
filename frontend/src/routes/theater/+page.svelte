<script>
	import HeroShot from '$lib/components/HeroShot.svelte';
	import srcImg from '$lib/assets/markustheater/theatre.png';
	import src from '$lib/assets/markustheater/markustheater_logo_10.png';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faCalendar, faLocationDot } from '@fortawesome/free-solid-svg-icons';
</script>

<HeroShot
	imgSrc="https://www.smd.org/fileadmin/5_AKADEMIKER/Markustheater/Header_Website_Titelbilder.jpg"
/>
<main class="card container mx-auto bg-cover" style="background-image: url({src})">
	<h1
		class="text-primary white text-center text-2xl tracking-[0.25em] md:tracking-[0.5em] lg:text-4xl"
	>
		DAS MARKUSTHEATER
	</h1>

	<div class="grid gap-4 md:text-lg lg:grid-cols-2 lg:gap-10 lg:p-10">
		<div class="flex flex-col gap-4">
			<p class="max-lg:mt-4">
				Das gesamte Markusevangelium in 90 Minuten – ohne Requisiten, ohne Kostüme und als
				Rundtheater.
			</p>
			<p>
				Die Bühne? Die Mitte! Der Zuschauer befindet sich mitten im Geschehen. 15 Studenten lassen
				den `alten` Text über das Leben von Jesus Christus lebendig werden. Mit dem Markusevangelium
				als Grundlage erwecken Karlsruher Studenten die Geschichte von Jesus ganz neu zum Leben:
				Stürme, Gelähmte, Zöllner, die Konfrontation mit dem religösen Etablissement und der Sieg
				über den Tod. Das ganze Evangelium in 90 Minuten. in einem Stück – ein einzigartiger und
				kreativer Theaterabend.
			</p>
		</div>

		<iframe
			width="100%"
			class="min-h-[20rem] rounded-md"
			src="https://www.youtube-nocookie.com/embed/mcs_i8uAkTA?si=wWwsELwKO6LmlefS"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen
		></iframe>

		<img class="rounded-md" src={srcImg} alt="Während des Theaters." />

		<div class="grid gap-4">
			<h3 class="text-primary text-xl md:text-3xl">Aufführungen</h3>

			<div class="bg-light-blue rounded-md p-4 text-white">
				<div class="flex items-center gap-2">
					<Fa icon={faCalendar} /> 27.11.23 um 20 Uhr
					<span class="max-md:hidden"> (Einlass ab 19:30 Uhr)</span>
				</div>
				<span class="md:hidden"> (Einlass ab 19:30 Uhr)</span>
				<div class="flex items-center gap-2">
					<Fa icon={faLocationDot} /> Erlöserkirche Karlsruhe
					<span class="max-md:hidden"> Hermann-Billing Straße 11</span>
				</div>
				<span class="md:hidden"> Hermann-Billing Straße 11</span>
			</div>

			<div class="bg-lime rounded-md p-4">
				<div class="flex items-center gap-2">
					<Fa icon={faCalendar} /> 28.11.23 um 20 Uhr
					<span class="max-md:hidden"> (Einlass ab 19:30 Uhr)</span>
				</div>
				<span class="md:hidden"> (Einlass ab 19:30 Uhr)</span>
				<div class="flex items-center gap-2">
					<Fa icon={faLocationDot} /> Foyer des KIT Audimax;
					<span class="max-md:hidden"> Straße am Forum 1</span>
				</div>
				<span class="md:hidden"> Straße am Forum 1</span>
			</div>

			<p>
				Wenn du noch mehr über das Projekt an sich erfahren willst, findest du weitere Informationen
				unter
				<a class="text-primary hover:underline" href="http://www.markustheater.de">
					www.markustheater.de.
				</a>
			</p>
		</div>

		<div></div>
	</div>
</main>
