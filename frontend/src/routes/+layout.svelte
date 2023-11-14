<script lang="ts">
	import '../app.css';
	import logo from '$lib/assets/logos/smd-ka_modified.svg';
	import { faBars, faRightFromBracket, faX } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { getAvatarUrl, pb } from '$lib/pocketbase';
	import { applyAction, enhance } from '$app/forms';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';
	import { click_outside } from '$lib/click_outside';

	let showMenu = false;
	let loading = false;
	let src = getAvatarUrl();
	let isValid = pb.authStore.isValid;
	let isSaftCoordinator = pb.authStore.model?.roles.includes('saftcoordinator');

	pb.authStore.onChange(() => {
		isSaftCoordinator = pb.authStore.model?.roles.includes('saftcoordinator');
		isValid = pb.authStore.isValid;
		src = getAvatarUrl();
	});
</script>

<main class="flex min-h-screen flex-col">
	<nav class="sticky top-0 z-50 flex flex-[0_1_auto] flex-col bg-white shadow-md">
		<div class="relative flex items-center justify-between gap-2 px-2 md:gap-4 md:px-4">
			<div></div>
			<a class=" py-2" href="/">
				<img class="max-h-10" src={logo} alt="SMD Logo" />
			</a>
			<div class="">
				<button
					class="justify-self-end! pb-1 text-2xl md:text-4xl"
					on:click|stopPropagation={() => (showMenu = !showMenu)}
				>
					<Fa class="w-6 md:hidden" icon={showMenu ? faX : faBars} />
					{#if isValid}
						<img
							class="h-10 w-10 rounded-full border-2 border-gray-400 object-cover max-md:hidden"
							{src}
							alt="user avatar"
						/>
					{/if}
				</button>
			</div>
		</div>

		<!-- Links below Logo (only visable for bigger screens) -->
		<div class="text-primary flex flex-wrap justify-center gap-2 pb-1 text-xl max-md:hidden">
			<a class="hover:text-corperate" href="/neu-hier">Neu Hier</a><span>-</span>
			<a class="hover:text-corperate" href="/#about-us">Über uns</a><span>-</span>
			<a class="hover:text-corperate" href="/kalender">Kalender</a><span>-</span>
			<a class="hover:text-corperate" href="/theater">Markustheater</a><span>-</span>
			<a class="hover:text-corperate" href="/intern">Intern</a>
		</div>

		<!-- Dropdown Navigatoin. Attentions this serves as well the mobiles as desktops! -->
		<div
			use:click_outside
			on:outsideclick={() => (showMenu = false)}
			class="menu absolute top-14 grid bg-white px-8 max-md:w-full md:right-0 md:rounded-md {showMenu
				? 'open md:border'
				: ''} "
		>
			<div class="overflow-hidden">
				<div
					class=" text-primary flex flex-col items-center justify-center gap-4 py-4 text-xl md:hidden"
				>
					<a on:click={() => (showMenu = false)} class="hover:text-corperate" href="/neu-hier">
						Neu Hier
					</a>
					<a on:click={() => (showMenu = false)} class="hover:text-corperate" href="/#about-us">
						Über uns
					</a>
					<a on:click={() => (showMenu = false)} class="hover:text-corperate" href="/kalender">
						Kalender
					</a>
					<a on:click={() => (showMenu = false)} class="hover:text-corperate" href="/theater"
						>Markustheater</a
					>
					<a on:click={() => (showMenu = false)} class="hover:text-corperate" href="/intern">
						Intern
					</a>
				</div>
				{#if isValid}
					<div class="h-0.5 bg-gray-200 md:hidden"></div>

					<div class=" text-primary flex flex-col items-center justify-center gap-4 py-4 text-xl">
						<a
							on:click={() => (showMenu = false)}
							class="hover:text-corperate max-md:hidden"
							href="/intern"
						>
							Interner Bereich
						</a>
						{#if isSaftCoordinator}
							<a
								on:click={() => (showMenu = false)}
								class="hover:text-corperate"
								href="/intern/saft/list"
							>
								Saft Anmeldungen verwalten
							</a>
						{/if}
						<a
							on:click={() => (showMenu = false)}
							class="hover:text-corperate"
							href="/intern/address-list"
						>
							Adressliste
						</a>
						<a
							on:click={() => (showMenu = false)}
							class="hover:text-corperate"
							href="/intern/profile">Dein Profil</a
						>
						<a on:click={() => (showMenu = false)} class="hover:text-corperate" href="/intern/saft"
							>Deine Saftanmeldungen</a
						>
					</div>
					<div class="h-0.5 bg-gray-200"></div>
					<form
						method="POST"
						action="/account/logout"
						use:enhance={() => {
							loading = true;
							return async ({ result }) => {
								pb.authStore.clear();
								await applyAction(result);
								showMenu = false;
								loading = false;
							};
						}}
						class=" text-primary flex flex-col items-center justify-center gap-4 py-4 text-xl"
					>
						<button class="hover:bg-curulean-dark flex gap-2 align-middle" type="submit">
							{#if loading}
								<img src={loadingSpinner} class="h-7" alt="loading" />
							{:else}
								<Fa class="self-center" icon={faRightFromBracket} />
							{/if}
							Logout
						</button>
					</form>
				{/if}
			</div>
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

<style>
	.menu {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 400ms;
	}

	.open {
		grid-template-rows: 1fr;
	}
</style>
