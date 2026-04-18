<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import LoginForm from '$lib/components/LoginForm.svelte';

	const FormUrl = '/saft/signup/form';

	onMount(() => {
		if (pb.authStore.isValid) goto(FormUrl);
	});
</script>

<main class="container mx-auto grid px-4 py-24">
	<h1 class="text-center text-5xl font-bold uppercase">SAFT Anmeldung</h1>
	<div class="py-8">
		<div class="grid gap-10 lg:grid-cols-[1fr_1rem_1fr]">
			<div class="flex flex-col items-center justify-center text-center text-lg md:px-10">
				<p class="py-4">
					Du hast kein Konto für SMD-KA Intern? <br />
					Dann kannst du dich hier ohne Konto anmelden:
				</p>
				<a
					class=" bg-black p-4 text-center text-white no-underline hover:underline max-md:w-full"
					href={FormUrl}>Ohne Konto anmelden</a
				>
			</div>

			<div class="relative bg-gray-300 max-md:h-0.5 md:w-0.5">
				<span
					class="text-secondary-text absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white pl-4 tracking-[1rem] md:rotate-90"
				>
					ODER
				</span>
			</div>

			<div class="flex justify-center">
				<!-- hide account creation because it may make time until that account is accepted -->
				<LoginForm title="Anmeldung" redirectTo={FormUrl} showAccountCreation={false} />
			</div>
		</div>
	</div>
</main>
