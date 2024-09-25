<script lang="ts">
	import CheckboxInput from '$lib/components/forms/CheckboxInput.svelte';
	import EmailInput from '$lib/components/forms/EmailInput.svelte';
	import TextArea from '$lib/components/forms/TextArea.svelte';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import { pb } from '$lib/pocketbase';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import { faSignalMessenger, faInstagram } from '@fortawesome/free-brands-svg-icons';
	import Fa from 'svelte-fa';
	import { faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
	import rightArrow from '$lib/assets/pages/about/kontakt/right-arrow-handdrawn.svg';

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

<main class="container mx-auto pb-24 pt-12 text-lg">
	<div class="px-4 xl:px-60">
		<section class="text-center text-xl">
			<div class="flex items-center justify-center">
				<h1 class="pb-0">Verbinde dich</h1>
				<img alt="rechter Pfeil" class="mx-4 w-28" src={rightArrow} />
				<h1 class="pb-0">mit uns</h1>
			</div>

			<p>
				Egal, ob du mehr über uns wissen möchtest, Fragen zum christlichen Glauben hast, neu in
				Karlsruhe bist und Infos über Stadt, Gemeinden, etc. brauchst, du einen Hauskreis suchst
				oder Teil unserer Signal-Gruppe werden willst, wir sind für dich da!
			</p>
			<p class="my-4">Du darfst Dich gerne jederzeit bei uns melden!</p>
		</section>

		<section class="grid justify-center">
			<h2 class="text-center normal-case">Nichts mehr verpassen!</h2>

			<div class="grid grid-cols-[2rem_1fr] gap-x-8 gap-y-4 text-3xl">
				<Fa icon={faSignalMessenger} /> Signal Gruppen
				<Fa icon={faEnvelope} /> E-Mail-Verteiler
				<Fa icon={faInstagram} /> Instagram
				<Fa icon={faGlobe} /> Webseite
			</div>
		</section>

		<section class="pt-24">
			<h1 class="font-caveat text-center normal-case">Wir freuen uns von dir zu hören!</h1>

			<div class="grid grid-cols-[1r_2fr] gap-x-4 text-xl">
				<p class="justify-self-end">Egal ob du…</p>
				<p></p>
				<p class="col-start-2">...mehr über uns wissen möchtest.</p>
				<p class="col-start-2">...Fragen zum christlichen Glauben hast.</p>
				<p class="col-start-2">
					...neu in Karlsruhe bist und Infos über Stadt, Gemeinden, etc. brauchst
				</p>
				<p class="col-start-2">
					...du gerne in den E-Mail-Verteiler oder die Signal Gruppen aufgenommen werden möchtest.
				</p>
			</div>
		</section>

		<section class="pt-12">
			<h2 class="text-3xl font-bold">Kontaktformular</h2>
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
		</section>
	</div>
</main>
