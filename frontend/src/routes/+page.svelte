<script lang="ts">
	import Saos from 'saos';
	import header from '$lib/assets/pages/schloss.jpg';
	import {
		faCalendarDay,
		faCalendarDays,
		faChildReaching,
		faClock,
		faCross,
		faLightbulb,
		faLocationDot,
		faVolleyballBall
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import CalendarList from '$lib/components/CalendarList.svelte';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import TextArea from '$lib/components/forms/TextArea.svelte';
	import CheckboxInput from '$lib/components/forms/CheckboxInput.svelte';
	import EmailInput from '$lib/components/forms/EmailInput.svelte';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import { pb } from '$lib/pocketbase';
	import volleyball from '$lib/assets/pages/home/volleyball.jpg';
	import erstsemester_programm from '$lib/assets/pages/home/erstsemester_programm.jpg';
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

<HeroShot imgSrc={header} height={'h-[100svh]'} bgPosition={'bg-[center_left_60%]'}>
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
				<div class="relative text-white 2xl:mx-20">
					<img
						src={volleyball}
						class="max-h-72 w-full bg-[top_30%] object-cover brightness-[30%] transition-all duration-300 hover:cursor-pointer hover:brightness-50"
						alt="VolleyBall"
					/>
					<div class="absolute top-1/2 w-full -translate-y-1/2 text-center">
						<h3 class="flex justify-center gap-2">
							<Fa icon={faVolleyballBall} /> Summer Break // Volleyball Spielen
						</h3>
						<div class="flex flex-wrap justify-center gap-4">
							<div class="flex items-center gap-2">
								<Fa icon={faCalendarDays} />
								<p class="whitespace-nowrap">Dienstag 06.08</p>
							</div>
							<div class="flex items-center gap-2">
								<Fa icon={faClock} />
								<p class="whitespace-nowrap">ab 18:00 Uhr</p>
							</div>
							<div class="flex items-center gap-2">
								<Fa icon={faLocationDot} />
								<p class="whitespace-nowrap">
									<a href="https://maps.app.goo.gl/rFi8yPtiibS6uGUg9">Fasanengarten</a>
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
				<a href="/new">
					<div class="relative text-white 2xl:mx-20">
						<img
							src={erstsemester_programm}
							class="max-h-72 w-full bg-[top_30%] object-cover brightness-[30%] transition-all duration-300 hover:cursor-pointer hover:brightness-50"
							alt="Erstsemester Programm"
						/>
						<div class="absolute top-1/2 w-full -translate-y-1/2 text-center">
							<h3 class="flex justify-center gap-2">Erstsemester Programm</h3>
						</div>
					</div>
				</a>
			</Saos>
		</div>
	</section>

	<section class="pt-52">
		<div class="grid grid-flow-dense gap-4 px-4 md:grid-cols-3 md:gap-x-12">
			<Motto imgSrc={denken} title="Denken">
				Gott denkt mit. An Gott glauben ist nicht immer problemlos. Deswegen wollen wir –
				Studierende aller Fachrichtungen und Konfessionen, die der Glaube an Jesus Christus
				verbindet – miteinander nachdenken, diskutieren, uns austauschen und dabei den Verstand
				nicht ausschalten.
			</Motto>
			<Motto imgSrc={glauben} title="Glauben"
				>Wir glauben, dass Gott wirkt. An Gott glauben ist für uns nicht nur ein Weg, sondern der
				Weg. Deswegen wollen wir von unseren Erlebnissen mit Gott reden, damit jeder diesen Gott
				kennen lernen kann.</Motto
			>
			<Motto imgSrc={erleben} title="Erleben"
				>Wir erleben, dass Gott lebt. An Gott glauben prägt das ganze Leben. Denn Gott verspricht,
				dass er in jeder Lebenslage bei uns ist und jeden Menschen liebt. Darauf dürfen wir uns
				verlassen!
			</Motto>
		</div>
	</section>

	<div class="flex flex-col gap-8 px-4 xl:px-80">
		<div class="flex flex-col">
			<h1 class="text-4xl font-bold uppercase lg:text-5xl">DU MÖCHTEST MEHR ERFAHREN?</h1>
			<h1 class="self-end text-4xl font-bold uppercase lg:text-5xl">SCHREIB UNS.</h1>
		</div>
		<h2 class="text-3xl lg:text-4xl">Kontakt aufnehmen</h2>
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
