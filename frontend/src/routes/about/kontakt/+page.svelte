<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import CheckboxInput from '$lib/components/forms/CheckboxInput.svelte';
	import EmailInput from '$lib/components/forms/EmailInput.svelte';
	import TextArea from '$lib/components/forms/TextArea.svelte';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import { pb } from '$lib/pocketbase';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import { faSignalMessenger, faInstagram } from '@fortawesome/free-brands-svg-icons';
	import Fa from 'svelte-fa';
	import {
		faEnvelope,
		faGlobe,
		faChevronRight,
		faArrowUpRightFromSquare
	} from '@fortawesome/free-solid-svg-icons';
	import rightArrow from '$lib/assets/icons/right-arrow-handdrawn.svg';
	import iphoneInstagram from '$lib/assets/pages/about/kontakt/Iphone_Instagram.png';

	let success = $state(false);
	let error = $state(false);
	let loading = $state(false);

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

<main class="container mx-auto grid px-4 pb-24 pt-12 text-lg">
	<section class="text-center text-xl xl:px-60">
		<div class="flex flex-wrap items-center justify-center">
			<h1 class="pb-0 max-sm:text-4xl">Verbinde dich</h1>
			<div class="flex items-center">
				<img alt="rechter Pfeil" class="mx-4 w-28" src={rightArrow} />
				<h1 class="pb-0 max-sm:text-4xl">mit uns</h1>
			</div>
		</div>

		<p>
			Egal, ob du mehr über uns wissen möchtest, Fragen zum christlichen Glauben hast, neu in
			Karlsruhe bist und Infos über Stadt, Gemeinden, etc. brauchst, du einen Hauskreis suchst oder
			Teil unserer Signal-Gruppe werden willst, wir sind für dich da!
		</p>
		<p class="my-4">Du darfst dich gerne jederzeit bei uns <a href="#form-section">melden!</a></p>
	</section>

	<section class="grid items-center justify-center xl:grid-cols-2">
		<img
			alt="Instagram Screenshot"
			class="mx-4 h-[50rem] rotate-6 max-xl:hidden"
			src={iphoneInstagram}
		/>

		<div>
			<h2 class="normal-case max-xl:text-center">Nichts mehr verpassen!</h2>

			<div class="grid grid-cols-[3rem_1fr] items-center gap-x-8 gap-y-4 text-3xl">
				<Fa class="text-5xl" icon={faSignalMessenger} />
				<div>
					<div class="text-3xl italic">Messenger</div>
					<a
						href="https://signal.group/#CjQKILxV0vWmZBW7kvIbxe4V3RoXfcjBBYOhUr8ezW78a75EEhCe2qNDAZ0IGRWzryk6GpfC"
						class="flex items-center gap-2 text-xl no-underline hover:underline"
					>
						Signal-Gruppe
						<Fa icon={faArrowUpRightFromSquare} />
					</a>
				</div>
				<Fa class="text-5xl" icon={faInstagram} />
				<div>
					<div class="text-3xl italic">Instagram</div>
					<a
						href="https://www.instagram.com/smd_karlsruhe/"
						class="flex items-center gap-2 text-xl no-underline hover:underline"
					>
						@smd_karlsruhe
						<Fa icon={faArrowUpRightFromSquare} />
					</a>
				</div>
				<Fa class="text-5xl" icon={faEnvelope} />
				<div>
					<div class="text-3xl italic">E-Mail-Verteiler</div>
					<div class="text-xl"></div>
				</div>
				<Fa class="text-5xl" icon={faGlobe} />
				<div>
					<div class="text-3xl italic">Webseite</div>
					<a
						href="/events/kalender"
						class="flex items-center gap-2 text-xl no-underline hover:underline"
					>
						<Fa icon={faChevronRight} />Kalender</a
					>
				</div>
			</div>
		</div>
	</section>
	<section class="flex justify-center py-12 xl:hidden">
		<img alt="Instagram Screenshot" class=" h-[25rem] rotate-6" src={iphoneInstagram} />
	</section>

	<section class="xl:pt-24">
		<h1 class="font-caveat text-center normal-case">Wir freuen uns von dir zu hören!</h1>

		<div class="grid gap-x-4 text-xl xl:grid-cols-[1r_2fr]">
			<p class="xl:justify-self-end">Egal ob du…</p>
			<p></p>
			<p class="xl:col-start-2">...mehr über uns wissen möchtest.</p>
			<p class="xl:col-start-2">...Fragen zum christlichen Glauben hast.</p>
			<p class="xl:col-start-2">
				...neu in Karlsruhe bist und Infos über Stadt, Gemeinden, etc. brauchst
			</p>
			<p class="xl:col-start-2">
				...du gerne in den E-Mail-Verteiler oder die Signal-Gruppen aufgenommen werden möchtest.
			</p>
		</div>
	</section>

	<section id="form-section" class="pt-24 xl:px-80">
		<h2 class="text-center max-sm:text-3xl">Kontaktformular</h2>
		<form id="form" class="flex flex-col gap-6" onsubmit={preventDefault(sendMail)}>
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

			<button disabled={loading} type="submit" class="flex w-fit gap-4 bg-black p-4 text-white">
				Abschicken
				{#if loading}
					<img class="h-8" src={loadingSpinner} alt="loading" />
				{/if}
			</button>
		</form>
		{#if success}
			<p class="font-bold">Vielen Dank für deine Kontaktaufnahme. Wir melden uns!</p>
		{/if}
	</section>
</main>
