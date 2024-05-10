<script lang="ts">
	import Saos from 'saos';
	import header from '$lib/assets/heroshots/karlsruhe_luft.jpeg';
	import {
		faCalendarDays,
		faChildReaching,
		faClock,
		faCross,
		faLightbulb,
		faLocationDot
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import CalendarList from '$lib/components/CalendarList.svelte';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import ifesLogo from '$lib/assets/logos/ifes.png';
	import smdLogo from '$lib/assets/logos/smd.png';
	import sloganBg from '$lib/assets/heroshots/slogan-bg.jpg';
	import sloganBgSm from '$lib/assets/heroshots/slogan-bg-sm.jpg';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import TextArea from '$lib/components/forms/TextArea.svelte';
	import CheckboxInput from '$lib/components/forms/CheckboxInput.svelte';
	import saft_heroshot from '$lib/assets/heroshots/SAFT_compressed.jpg';
	import herzenssache_16_9 from '$lib/assets/ss24/herzenssache_16_9.png';
	import vortrag_teaser from '$lib/assets/ss24/vortrag_teaser.jpg';
	import EmailInput from '$lib/components/forms/EmailInput.svelte';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';

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

<HeroShot imgSrc={header} />
<div class="bg-primary text-grey z-10 px-4 py-8 text-center text-4xl font-bold md:hidden md:py-4">
	Herzlich Willkommen bei der Hochschul-SMD <br class="md:hidden" />
	<span class="text-white">Karlsruhe</span>
</div>

<main class="container mx-auto flex flex-col gap-24 py-24 text-lg">
	<div class="container flex flex-col gap-6 px-4 xl:px-80">
		<h1 class="text-5xl font-bold uppercase">SCHÖN, DASS DU HIER BIST!</h1>
		<p>
			Zwischen Uni-Alltag und WG-Wahnsinn haben wir einen Treffpunkt, an dem Studierende aus allen
			Ecken der Hochschule zusammenkommen. Uns verbindet der Wunsch nach Gemeinschaft, Diskussion
			und gelebtem Glauben.
		</p>
		<p>
			In unserer Hochschulgruppe sind alle herzlich willkommen. Egal was dein Hintergrund ist und
			was du glaubst, wir freuen uns auf dich!
		</p>

		<p>
			Wir sind aktuell rund 60 Studierende aller Fachrichtungen, kommen aus verschiedenen Kirchen
			und Gemeinden und wünschen uns, dass jeder Student und jede Studentin von der guten Nachricht
			von Jesus hören kann.
		</p>
	</div>

	<Saos
		animation={'slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
		animation_out={'slide-out-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
	>
		<div class="relative py-20">
			<h1
				class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-4xl uppercase text-white lg:text-5xl"
			>
				Denken. Glauben. Erleben.
			</h1>
			<img class="z-0 max-lg:hidden" alt="Werte der Hochschul-SMD" src={sloganBg} />
			<img class="z-0 lg:hidden" alt="Werte der Hochschul-SMD" src={sloganBgSm} />
		</div>
	</Saos>

	<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
		<div class="grid gap-8 px-4 lg:grid-cols-2 xl:px-80">
			<img alt="Semesterprogramm" src={herzenssache_16_9} />

			<div class="flex flex-col gap-4">
				<h1 class="text-5xl font-bold uppercase">Was wir machen</h1>
				<p>
					Im Semester treffen wir uns abwechselnd zum Gruppentreff und in Hauskreisen. Beide sind
					eine Mischung aus Input, Austausch und Gemeinschaft – wir wollen gemeinsam nachdenken und
					Spaß haben.
				</p>
				<a href="semesterprogramm" class="w-fit bg-black p-4 text-white">Semesterprogramm</a>
			</div>
		</div>
	</Saos>

	<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
		<div class="grid gap-8 px-4 lg:grid-cols-2 xl:px-80">
			<div class="flex flex-col gap-4 text-right">
				<h1 class="text-5xl font-bold uppercase">Vortrag</h1>
				<p>
					Am 29. Mai hält Prof. Dr. Thomas Schimmel einen Vortrag zum Thema „Der Urknall und die
					Gottesfrage“. Der allgemein verständliche Vortrag gibt faszinierende Einblicke in die
					Natur – Von kleinsten Welten im inneren der Atome bis hin zu den weiten des Universums und
					der spannenden Frage nach seinem Ursprung.
					<br /> Sei dabei <span class="font-bold">18:30 im Gerthsen-Höhrsaal</span> am KIT Campus Süd
				</p>
				<a href="/vortrag" class="w-fit self-end bg-black p-4 text-white"> Mehr erfahren </a>
			</div>
			<img alt="vortrag" src={vortrag_teaser} />
		</div>
	</Saos>

	<div class="relative my-20">
		<div
			class="h-[400px] bg-cover bg-[center_top_75%]"
			style="background-image: url({saft_heroshot});"
		/>
		<div class="absolute left-8 top-14 text-white md:left-14">
			<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
				<div class="flex flex-col gap-4">
					<!-- <h1 class="text-4xl md:hidden">SemesterAnfangs- <br />FreizeiT</h1> -->
					<!-- <h1 class="text-5xl max-md:hidden">SemesterAnfangsFreizeiT</h1> -->
					<!-- <p>From the Inside out</p> -->
					<!-- <a href="/saft" class="w-fit bg-black p-4 text-white">Weitere Infos</a> -->
				</div>
			</Saos>
		</div>
	</div>

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
