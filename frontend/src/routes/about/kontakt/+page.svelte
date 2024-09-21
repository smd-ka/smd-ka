<script lang="ts">
	import CheckboxInput from '$lib/components/forms/CheckboxInput.svelte';
	import EmailInput from '$lib/components/forms/EmailInput.svelte';
	import TextArea from '$lib/components/forms/TextArea.svelte';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import { pb } from '$lib/pocketbase';
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

<main class="container mx-auto flex flex-col gap-24 py-24 text-lg">
	<div class="flex flex-col gap-6 px-4 xl:px-80">
		<h1 class="text-5xl font-bold uppercase">Kontakt aufnehmen</h1>

		<div>
			<h2 class="text-3xl font-bold">Gerne kannst du dich bei uns melden wenn du...</h2>
			<p>… Genaueres zu unserem nächsten Treffen wissen möchtest.</p>
			<p>… regelmäßige Updates über unseren E-Mail-Verteiler erhalten möchtest.</p>
			<p>… ein ganz anderes Anliegen hast.</p>
			<p>
				Nutze dazu einfach das unten stehende Kontaktformular oder schreib uns eine E-Mail
				<a class="text-primary" href="mailto:leiter@smd-karlsruhe.de">leiter@smd-karlsruhe.de</a>.
			</p>
		</div>

		<p>
			Solltest du auf der Suche nach einer Wohnung bzw. einem WG-Zimmer in Karlsruhe sein, dann
			schau doch mal auf
			<a class="text-primary whitespace-nowrap" href="https://kaheim.de">KA-Heim</a> vorbei.
		</p>

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
	</div>

	<div class="flex flex-col gap-6 px-4 xl:px-80">
		<h1 class="text-5xl font-bold uppercase">Unsere Adresse</h1>
		<p>Meistens treffen wir uns in der Christlichen Gemeinde (CG). Die Adresse lautet:</p>
		<p>Reinhold-Frank-Straße 44A<br /> 76133 Karlsruhe</p>

		<iframe
			title="Karte mit Standort der Christlichen Gemeinde Karlsruhe"
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1165.7704409863782!2d8.386977565885125!3d49.00932776250289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479706582b62df3b%3A0x68be4b2492cb5f0f!2sReinhold-Frank-Stra%C3%9Fe%2044A%2C%2076133%20Karlsruhe!5e0!3m2!1sen!2sde!4v1713252458894!5m2!1sen!2sde"
			height="450"
			style="border:0;"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		></iframe>
	</div>
</main>
