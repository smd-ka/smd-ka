<script lang="ts">
	import Saos from 'saos';
	import header from '$lib/assets/pages/home/schloss.jpg';
	import {
		faArrowDown,
		faCalendarDays,
		faClock,
		faLocationDot,
		faChevronRight
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import TextArea from '$lib/components/forms/TextArea.svelte';
	import CheckboxInput from '$lib/components/forms/CheckboxInput.svelte';
	import EmailInput from '$lib/components/forms/EmailInput.svelte';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import { pb } from '$lib/pocketbase';
	import ice_cream from '$lib/assets/pages/home/ice_cream.jpg';
	import erstsemester_programm from '$lib/assets/pages/home/erstsemester_programm.jpg';
	import schlosslichtspiele from '$lib/assets/pages/home/schlosslichtspiele.jpg';
	import offener_hauskreis from '$lib/assets/pages/home/offener_hauskreis.jpg';
	import glauben from '$lib/assets/pages/home/glauben.jpg';
	import denken from '$lib/assets/pages/home/denken.jpg';
	import erleben from '$lib/assets/pages/home/erleben.jpg';
	import Motto from '$lib/components/Motto.svelte';

	let success = false;
	let error = false;
	let loading = false;

	async function sendMail(event: Event) {
		loading = true;
		error = false;
		const form = document.getElementById('form') as HTMLFormElement;
		let formData = new FormData(form);

		try {
			const record = await pb.collection('contact').create(formData);
			form.reset();
			success = true;
		} catch (e) {
			console.error(e);
			error = true;
		}
	}
</script>

<HeroShot imgSrc={header} bgPosition={'bg-[center_left_60%]'}>
	<div class="text-grey absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 text-center">
		<span class="font-mincho whitespace-nowrap text-4xl sm:text-5xl xl:text-7xl">
			Hier bist du richtig!
		</span><br />
		<br />
		<span class="font-caveat text-xl sm:text-2xl xl:text-3xl">
			Herzlich Willkommen bei der Hochschul-SMD Karlsruhe
		</span>
	</div>
</HeroShot>

<main class="container mx-auto flex flex-col gap-24 py-12 text-lg">
	<section class="px-4 text-center">
		<h1>Was läuft aktuell?</h1>

		<div class="grid gap-8 xl:grid-cols-2">
			<Saos
				animation={'slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
				animation_out={'slide-out-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
			>
				<a href="/new/erstsemester">
					<div class="relative text-white">
						<img
							src={erstsemester_programm}
							class=" max-h-72 w-full rounded-sm bg-[top_30%] object-cover brightness-[30%] transition-all duration-300 hover:scale-[101%] hover:cursor-pointer hover:brightness-50"
							alt="Erstsemester Programm"
						/>
						<div class="absolute top-1/2 w-full -translate-y-1/2 text-center">
							<h3 class="flex justify-center gap-2">Erstsemester Programm</h3>
						</div>
					</div>
				</a>
			</Saos>

			<Saos
				animation={'slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
				animation_out={'slide-out-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
			>
				<div class="relative text-white">
					<img
						src={schlosslichtspiele}
						class="max-h-72 w-full rounded-sm bg-[top_30%] object-cover brightness-[30%] transition-all duration-300 hover:scale-[101%] hover:cursor-pointer hover:brightness-50"
						alt="Schlosslichtspiele"
					/>
					<div class="absolute top-1/2 w-full -translate-y-1/2 text-center">
						<h3 class="flex items-center justify-center gap-2 px-4">
							Summer Break // Picknick & Schlosslichtspiele
						</h3>
						<div class="flex flex-wrap justify-center gap-4">
							<div class="flex items-center gap-2">
								<Fa icon={faCalendarDays} />
								<p class="whitespace-nowrap">Dienstag 03.09</p>
							</div>
							<div class="flex items-center gap-2">
								<Fa icon={faClock} />
								<p class="whitespace-nowrap">19:00</p>
							</div>
							<div class="flex items-center gap-2">
								<Fa icon={faLocationDot} />
								<p class="whitespace-nowrap">
									<a href="https://maps.app.goo.gl/6GKR4efPtFraG8fV8">Schlosspark</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</Saos>

			<Saos
				animation={'slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
				animation_out={'slide-out-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
			>
				<div class="relative text-white">
					<a href="/new/erstsemester">
						<img
							src={offener_hauskreis}
							class="max-h-72 w-full rounded-sm bg-[top_30%] object-cover brightness-[30%] transition-all duration-300 hover:scale-[101%] hover:cursor-pointer hover:brightness-50"
							alt="Offener Hauskreis"
						/>
						<div class="absolute top-1/2 w-full -translate-y-1/2 text-center">
							<h3 class="flex items-center justify-center gap-2 px-4">
								Erstsemester Aktion // Offener Hauskreis
							</h3>
							<div class="flex flex-wrap justify-center gap-4">
								<div class="flex items-center gap-2">
									<Fa icon={faCalendarDays} />
									<p class="whitespace-nowrap">ab 18.09 mittwochs</p>
								</div>
								<!-- <div class="flex items-center gap-2">
									<Fa icon={faClock} />
									<p class="whitespace-nowrap">Abends (TBA)</p>
								</div>
								<div class="flex items-center gap-2">
									<Fa icon={faLocationDot} />
									<p class="whitespace-nowrap">TBA</p>
								</div> -->
							</div>
						</div>
					</a>
				</div>
			</Saos>
		</div>
	</section>

	<section class="pt-24">
		<p class="px-4 pb-12 text-center text-xl xl:px-40">
			Wir sind eine überkonfessionelle christliche Hochschulgruppe. Unter anderem in Groß- und
			Kleingruppen wollen wir zum Nach- und Weiterdenken über den christlichen Glauben anregen und
			Gemeinschaft erleben.
		</p>
		<div class="flex gap-6 px-4 max-md:flex-col">
			<Motto imgSrc={denken} title="Denken">
				Gott denkt mit. An Gott glauben ist nicht immer problemlos. Deswegen wollen wir –
				Studierende aller Fachrichtungen und Konfessionen, die der Glaube an Jesus Christus
				verbindet – miteinander nachdenken, diskutieren, uns austauschen und dabei den Verstand
				nicht ausschalten.
			</Motto>

			<Motto imgSrc={glauben} title="Glauben">
				<div class="flex justify-center">
					<p class="">
						Wir glauben, dass Gott wirkt. An Gott glauben ist für uns nicht nur ein Weg, sondern der
						Weg. Deswegen wollen wir von unseren Erlebnissen mit Gott reden, damit jeder diesen Gott
						kennen lernen kann.
					</p>
				</div>
			</Motto>

			<Motto imgSrc={erleben} title="Erleben">
				Wir erleben, dass Gott lebt. An Gott glauben prägt das ganze Leben. Denn Gott verspricht,
				dass er in jeder Lebenslage bei uns ist und jeden Menschen liebt. Darauf dürfen wir uns
				verlassen!
			</Motto>
		</div>
		<div class="flex justify-center p-8">
			<a
				href="/about/us"
				class="bg-primary flex items-center gap-2 rounded-sm px-4 py-2 text-white no-underline"
			>
				<Fa icon={faChevronRight} />
				Lerne mehr über uns
			</a>
		</div>
	</section>

	<div class="flex flex-col gap-8 px-4 xl:px-80">
		<h1 class="pb-0">schreib uns</h1>
		<h2 class="flex items-center justify-end gap-2">Hier <Fa icon={faArrowDown}></Fa></h2>
		<form id="form" class="flex flex-col gap-6" on:submit|preventDefault={sendMail}>
			<TextInput name="name" label="Name" required />
			<TextInput name="subject" label="Betreff" required />
			<EmailInput name="email" label="Deine E-Mail-Addresse" required />
			<TextArea name="message" label="Deine Nachricht" />
			<CheckboxInput
				id="datenschutz"
				label="Ich bin damit einverstanden, dass meine Daten zur Bearbeitung meines Anliegens verwendet werden."
				required
			/>

			{#if error}
				<p class="text-red-500">Es ist ein Fehler aufgetreten. Bitte versuche es erneut.</p>
			{/if}

			<button disabled={loading} type="submit" class="w-fit bg-black p-4 text-white">
				{#if loading}
					<img class="absolute left-2 h-8" src={loadingSpinner} alt="loading" />
				{/if}
				Abschicken</button
			>
		</form>
		{#if success}
			<p class="font-bold">Vielen Dank für deine Kontaktaufnahme. Wir melden uns!</p>
		{/if}
	</div>
</main>

<style>
	@keyframes -global-slide-in {
		0% {
			transform: translateY(200vh);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes -global-slide-in-bottom {
		0% {
			transform: translateY(30vh);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes -global-slide-out-bottom {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
