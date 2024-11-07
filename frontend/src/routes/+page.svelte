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
	import glauben from '$lib/assets/pages/home/glauben.jpg';
	import denken from '$lib/assets/pages/home/denken.jpg';
	import erleben from '$lib/assets/pages/home/erleben.jpg';
	import Motto from '$lib/components/Motto.svelte';
	import type { PageData } from './$types';
	import { getImageSrc } from '$lib/fetch_img';

	let success = false;
	let error = false;
	let loading = false;

	export let data: PageData;

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

	const getDate = (startDateString: string, endDateString?: string) => {
		const startDate = new Date(startDateString);
		if (!endDateString || sameDay(startDateString, endDateString)) {
			return (
				startDate.toLocaleDateString('de-DE', {
					weekday: 'long',
					day: '2-digit',
					month: '2-digit'
				}) +
				' // ' +
				startDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
			);
		}
		const endDate = new Date(endDateString);
		return (
			startDate.toLocaleDateString('de-DE', {
				day: '2-digit',
				month: 'long'
			}) +
			' - ' +
			endDate.toLocaleDateString('de-DE', {
				day: '2-digit',
				month: 'long'
			})
		);
	};

	const sameDay = (start_date_time: string, end_date_time?: string) => {
		if (!end_date_time) return true;
		const d1 = new Date(start_date_time);
		const d2 = new Date(end_date_time);
		return (
			d1.getFullYear() === d2.getFullYear() &&
			d1.getMonth() === d2.getMonth() &&
			d1.getDate() === d2.getDate()
		);
	};
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
	{#if data.events}
		<section class="px-4">
			<h1 class="text-center">Was läuft aktuell?</h1>

			<Saos
				animation={'slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
				animation_out={'slide-out-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
			>
				<div class="grid gap-8 md:grid-cols-2 xl:px-20">
					{#each data.events.items as event}
						<div class="group flex h-full flex-col">
							<a href="/events/kalender/{event.id}">
								<img
									src={getImageSrc(event.image, event.id, event.collectionId, event.collectionName)}
									class="max-h-40 w-full rounded-sm object-cover transition-all duration-300 hover:cursor-pointer group-hover:scale-[101%]"
									alt="Erstsemester Programm"
								/>
							</a>
							<div class="peer flex-1 border-x-2 border-b-2 px-4 py-2">
								<div class="flex justify-between text-gray-500">
									<div>
										{getDate(event.start_date_time, event.end_date_time)}
									</div>
									<a class="hover:text-primary hover:cursor-pointer" href={event.location_url}>
										<Fa icon={faLocationDot} />
									</a>
								</div>
								<div class="text-2xl font-bold">
									{event.title}
								</div>

								<p class="line-clamp-2">
									{event.description}
								</p>
								<a href="/events/kalender/{event.id}" class="text-primary">Mehr erfahren</a>
							</div>
						</div>
					{/each}
				</div>
			</Saos>
			<Saos
				animation={'slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
				animation_out={'slide-out-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}
			>
				<div class="flex justify-center p-8">
					<a
						href="/events/kalender"
						class="bg-primary flex items-center gap-2 rounded-sm px-4 py-2 text-white no-underline"
					>
						<Fa icon={faChevronRight} />
						Alle Events
					</a>
				</div>
			</Saos>
		</section>
	{/if}

	<section class="grid gap-4 px-4 pt-24 text-center text-2xl xl:px-40">
		<p>
			Die SMD ist ein Treffpunkt für Studierende aller Karlsruher Hochschulen und darüber hinaus.
			Uns verbindet der Wunsch nach Gemeinschaft, Diskussion und gelebtem Glauben.
		</p>
		<p>
			Wir sind Studierende aller Fachrichtungen, kommen aus verschiedenen Kirchen und Gemeinden und
			wünschen uns, dass jeder Student und jede Studentin von der guten Nachricht von Jesus hört.
		</p>
		<p>
			In unserer Hochschulgruppe sind alle herzlich willkommen. Egal, was dein Hintergrund ist und
			was du glaubst, wir freuen uns auf dich!
		</p>
	</section>

	<section>
		<h1 class="text-center">Unser Motto</h1>
		<div class="flex gap-6 px-4 pt-4 max-md:flex-col">
			<Motto imgSrc={denken} title="Denken">
				An Gott zu glauben heißt nicht, den Verstand auszuschalten. Deswegen wollen wir –
				Studierende aller Fachrichtungen und Konfessionen, die der Glaube an Jesus Christus
				verbindet – miteinander nachdenken, uns austauschen und dabei an wertvollen Erkenntnissen
				zunehmen.
			</Motto>

			<Motto imgSrc={glauben} title="Glauben">
				<div class="flex justify-center">
					<p class="">
						“Was ist nun also der Glaube? Er ist das <b>Vertrauen</b> darauf, dass das, was wir
						hoffen, sich erfüllen wird, und die <b>Überzeugung</b>, dass das, was man nicht sieht,
						existiert.” - Hebräer 11,1
					</p>
				</div>
			</Motto>

			<Motto imgSrc={erleben} title="Erleben">
				Wir können Gottes Wirken in jedem Lebensbereich erleben. Denn Gott verspricht, dass er in
				jeder Lebenslage bei uns ist (Matthäus 28,20) und jeden Menschen liebt (Johannes 3,16).
				Daran wollen wir uns erinnern und uns gegenseitig ermutigen, indem wir Zeugnis davon geben,
				was wir mit Gott erleben.
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
