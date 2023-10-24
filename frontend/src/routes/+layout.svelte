<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import logo from '$lib/assets/logos/smd-ka_modified.svg';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';
	import '../app.css';
	import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { pb } from '$lib/pocketbase';

	let loading = false;
</script>

<main class="flex min-h-screen flex-col">
	<nav class="sticky top-0 z-50 flex flex-[0_1_auto] flex-col bg-white shadow-md">
		<a class="flex justify-center" href="/">
			<img class="h-14 px-4 py-2" src={logo} alt="SMD Logo" />
		</a>
		<div class="text-primary flex justify-center gap-2 pb-1 text-xl">
			<a class="hover:text-corperate" href="/neu-hier">Neu Hier</a><span>-</span>
			<a class="hover:text-corperate" href="/#about-us">Über uns</a><span>-</span>
			<a class="hover:text-corperate" href="/kalender">Kalender</a><span>-</span>
			<a class="hover:text-corperate" href="/saft">SAFT</a><span>-</span>
			<a class="hover:text-corperate" href="/intern">Intern</a><span>-</span>

			<form
				class="self-center"
				method="POST"
				action="account/logout"
				use:enhance={() => {
					loading = true;
					return async ({ result }) => {
						pb.authStore.clear();
						await applyAction(result);
						loading = false;
					};
				}}
			>
				<button class="hover:bg-curulean-dark flex gap-1 p-4 align-middle" type="submit">
					{#if loading}
						<img src={loadingSpinner} class="h-7" alt="loading" />
					{:else}
						<Fa class="self-center" icon={faRightFromBracket} />
					{/if}
					Logout</button
				>
			</form>
			<!-- <span>-</span> -->
			<!-- <a class="hover:text-corperate" href="/newcomers">Intern</a> -->
		</div>
	</nav>

	<div class=" flex-[1_1_auto]">
		<slot />
	</div>

	<footer class="flex-[0_1_auto]">
		<div class="bg-light-blue mt-10 flex justify-center gap-8 py-1 text-white">
			<a href="/imprint"> Impressum </a>
			<a class="" href="https://wiki.smd-karlsruhe.de"> Hier gehts zum Wiki </a>
		</div>
	</footer>
</main>
