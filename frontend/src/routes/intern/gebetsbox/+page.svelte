<script lang="ts">
	import TextArea from '$lib/components/forms/TextArea.svelte';
	import { pb } from '$lib/pocketbase';
	import loadingSpinner from '$lib/assets/loading_spinner_white.gif';
	import rightArrow from '$lib/assets/icons/right-arrow-handdrawn.svg';

	let success = false;
	let error = false;
	let loading = false;

	async function issueForm(event: Event) {
		loading = true;
		error = false;
		const form = document.getElementById('form') as HTMLFormElement;
		let formData = new FormData(form);

		try {
			const result = await pb.send('/api/intern/prayer-box', {
				method: 'POST',
				body: formData
			});
			loading = false;
			if (result.success) {
				form.reset();
				success = true;
			} else {
				console.error(result);
				error = true;
			}
		} catch (e) {
			console.error(e);
			loading = false;
			error = true;
		}
	}
</script>

<main class="container mx-auto grid px-4 pb-24 pt-12 text-lg">
	<section class="text-center text-xl xl:px-60">
		<div class="flex flex-wrap items-center justify-center">
			<h1 class="pb-0 max-sm:text-4xl">Schicke dein Anliegen</h1>
			<div class="flex items-center">
				<img alt="rechter Pfeil" class="mx-4 w-28" src={rightArrow} />
				<h1 class="pb-0 max-sm:text-4xl">zum Seelsorgeteam</h1>
			</div>
		</div>

		<p>
			Hier kannst du deine Gebetsanliegen gerne an dein Seelsorgeteam übermitteln. Wir beten gerne
			für deine persönlichen Anliegen.
		</p>
		<p class="my-4">
			Deine Anfrage wird grundsätzlich ohne deinen Namen übermittelt und wird selbstverständlich
			vertraulich behandelt. Falls du möchtest, darfst du auch deinen Namen selbst dazuschreiben.
		</p>
	</section>

	<section class="xl:pt-24">
		<h1 class="font-caveat text-center normal-case">Wir freuen uns, für dich zu beten!</h1>
	</section>

	<section id="form-section" class="pt-24 xl:px-80">
		<form id="form" class="flex flex-col gap-6" on:submit|preventDefault={issueForm}>
			<TextArea name="message" label="Deine Nachricht" required />
			{#if error}
				<p class="text-red-500">Es ist ein Fehler aufgetreten. Bitte versuche es erneut.</p>
			{/if}

			<button disabled={loading} type="submit" class="flex w-fit gap-4 bg-black p-4 text-white">
				Abschicken
				{#if loading}
					<img class="left-2 h-8" src={loadingSpinner} alt="loading" />
				{/if}
			</button>
		</form>
		{#if success}
			<p class="pt-4 font-bold">
				Dein Gebetsanliegen ist erfolgreich bei uns angekommen. Wir beten gerne für dich.
			</p>
		{/if}
	</section>
</main>
