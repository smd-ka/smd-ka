<script lang="ts">
	import '../app.css';
	import '@fontsource/anton';
	// Supports weights 300-800
	import '@fontsource-variable/merriweather-sans';
	import '@fontsource/bebas-neue';
	import '@fontsource/zcool-qingke-huangyou';
	import logo from '$lib/assets/logos/smd-ka_modified.svg';
	import smd_logo from '$lib/assets/logos/smd_invers.png';
	import insta from '$lib/assets/logos/insta.svg';
	import {
		faBars,
		faChevronDown,
		faEnvelope,
		faRightFromBracket,
		faRightToBracket,
		faX
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { FESD_COORDINATOR, SAFT_COORDINATOR, getAvatarUrl, pb } from '$lib/pocketbase';
	import { applyAction, enhance } from '$app/forms';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';
	import { click_outside } from '$lib/click_outside';
	import ifes from '$lib/assets/logos/ifes.png';
	import {page} from "$app/stores";

	const semesterprogrammPaths = ["/semesterprogramm", "/saft", "/vortrag", "/weekly"];

	let isHighlighted = semesterprogrammPaths.includes($page.url.pathname);
	let showMenu = false;
	let loading = false;
	let src = getAvatarUrl();
	let isValid = pb.authStore.isValid;
	let isSaftCoordinator = pb.authStore.model?.roles.includes(SAFT_COORDINATOR);
	let isFesdCoordinator = pb.authStore.model?.roles.includes(FESD_COORDINATOR);

	pb.authStore.onChange(() => {
		isSaftCoordinator = pb.authStore.model?.roles.includes(SAFT_COORDINATOR);
		isFesdCoordinator = pb.authStore.model?.roles.includes(FESD_COORDINATOR);
		isValid = pb.authStore.isValid;
		src = getAvatarUrl();
	});
</script>

<main class="flex min-h-screen flex-col">
	<nav class="bg-grey sticky top-0 z-50 flex flex-[0_1_auto] flex-col shadow-md">
		<div class="container mx-auto flex items-center justify-between gap-4 py-3">
			<a class=" py-2" href="/">
				<img class="max-h-7 pl-4" src={logo} alt="SMD Logo" />
			</a>

			<div class="flex items-center gap-4 text-xl text-white max-lg:hidden">
				<!-- Links (only visable for bigger screens) -->
				<a class={$page.url.pathname==="/" ? "text-primary" : "hover:text-primary"} href="/">Startseite</a>
				<a class={$page.url.pathname.match(/^\/about\/?$/) ? "text-primary" : "hover:text-primary"} href="/about/">Über uns</a>				<div>
					{#if semesterprogrammPaths.some(path => $page.url.pathname === path || $page.url.pathname === path + '/')}							<a href="/semesterprogramm" class="text-primary peer flex items-center gap-2">
							Was läuft
							<Fa class="text-primary text-lg" icon={faChevronDown}></Fa>
						</a>
					{:else}
						<a href="/semesterprogramm" class="hover:text-primary peer flex items-center gap-2">
							Was läuft
							<Fa class="hover:text-primary text-lg" icon={faChevronDown}></Fa>
						</a>
					{/if}
					<div
						class=" bg-primary absolute hidden w-64 justify-center gap-4 px-8 py-2 hover:grid peer-hover:grid"
					>
						<a class="hover:text-primary-text" href="/semesterprogramm">Semesterprogramm</a>
						<a class="hover:text-primary-text" href="/saft">SemesterAnfangsFreizeiT </a>
						<a class="hover:text-primary-text" href="/vortrag">
							Vortrag: Der Urknall und die Gottesfrage
						</a>
						<a class="hover:text-primary-text" href="/weekly">Wöchentliche Aktionen</a>
					</div>
				</div>
			<a class={$page.url.pathname.match(/^\/kontakt\/?$/) ? "text-primary" : "hover:text-primary"} href="/kontakt/">Kontakt</a>
				<a class=" self-center" href="/intern">
					{#if isValid}
						<img
							class=" h-10 w-10 rounded-full border-2 border-gray-400 object-cover"
							{src}
							alt="user avatar"
						/>
					{:else}
						<Fa class={$page.url.pathname.match(/^\/account\/login/) ? "text-primary" : "hover:text-primary"} icon={faRightToBracket} />					{/if}
				</a>
			</div>

			<div class="flex items-center gap-2 text-white lg:hidden">
				<button
					class="justify-self-end! pb-1 text-2xl md:text-4xl"
					on:click|stopPropagation={() => (showMenu = !showMenu)}
				>
					<Fa class="mr-4 w-6" icon={showMenu ? faX : faBars} />
				</button>

				{#if isValid}
					<a href="/intern">
						<img
							class="h-10 w-10 rounded-full border-2 border-gray-400 object-cover max-md:hidden"
							{src}
							alt="user avatar"
						/>
					</a>
				{/if}
			</div>
		</div>

		<!-- Dropdown Navigation. Attentions this serves as well the mobiles as desktops! -->
		<div
			use:click_outside
			on:outsideclick={() => (showMenu = false)}
			class="menu absolute top-[4.5rem] grid bg-white px-8 max-xl:w-full md:right-0 md:rounded-md {showMenu
				? 'open xl:border'
				: ''} "
		>
			<div class="flex justify-center overflow-hidden">
				<div class="text-primary flex flex-col justify-center gap-4 py-4 text-xl xl:hidden">
					<a on:click={() => (showMenu = false)} class="!hover:no-underline !underline" href="/"
						>Startseite</a
					>

					<div>
						<a
							on:click={() => (showMenu = false)}
							class="!hover:no-underline !underline"
							href="/about"
						>
							Über uns
						</a>
					</div>
					<div>
						<a
							on:click={() => (showMenu = false)}
							class="!hover:underline !underline"
							href="/semesterprogramm"
						>
							Was läuft
						</a>
						<div class="text-primary-text grid pl-8">
							<a
								on:click={() => (showMenu = false)}
								class="hover:underline"
								href="/semesterprogramm"
							>
								Semesterprogramm
							</a>
							<a on:click={() => (showMenu = false)} class="hover:underline" href="/saft">
								SemesterAnfangsFreizeiT
							</a>
							<a on:click={() => (showMenu = false)} class="hover:underline" href="/vortrag">
								Vortrag: Der Urknall und die Gottesfrage
							</a>
							<a on:click={() => (showMenu = false)} class="hover:underline" href="/weekly">
								Wöchentliche Aktionen
							</a>
						</div>
					</div>
					<a
						on:click={() => (showMenu = false)}
						class="!hover:no-underline !underline"
						href="/kontakt"
					>
						Kontakt
					</a>

					<a
						on:click={() => (showMenu = false)}
						class="!hover:no-underline !underline"
						href="/intern"
					>
						Interner Bereich
					</a>
					{#if isValid}
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

				<!-- {#if isValid}
					<div class="h-0.5 bg-gray-200 md:hidden"></div>

					<div class=" text-primary flex flex-col items-center justify-center gap-4 py-4 text-xl">
						<a
							on:click={() => (showMenu = false)}
							class="hover:text-corperate max-md:hidden"
							href="/intern"
						>
							Interner Bereich
						</a>

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
						{#if isSaftCoordinator}
							<a
								on:click={() => (showMenu = false)}
								class="hover:text-corperate"
								href="/intern/saft/list"
							>
								Saft Anmeldungen verwalten
							</a>
						{/if}

						<a on:click={() => (showMenu = false)} class="hover:text-corperate" href="/intern/fesd"
							>FESD Anmeldung</a
						>

						{#if isFesdCoordinator}
							<a
								on:click={() => (showMenu = false)}
								class="hover:text-corperate"
								href="/intern/fesd/list"
							>
								FESD Anmeldungen verwalten
							</a>
						{/if}
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
				{/if} -->
			</div>
		</div>
		<div class="bg-primary h-1"></div>
	</nav>

	<div class=" flex-[1_1_auto]">
		<slot />
	</div>

	<footer class="flex-[0_1_auto]">
		<div class="bg-grey text-gray-200">
			<div class="container mx-auto px-4 py-20 xl:px-40">
				<div class="grid justify-center gap-20 md:grid-cols-2">
					<section class="flex flex-col gap-4">
						<h2 class="text-primary text-xl uppercase">Unser Netzwerk</h2>
						<div class="grid grid-cols-[5rem_1fr] gap-4">
							<a href="https://ifesworld.org">
								<img src={smd_logo} alt="SMD Logo" class="" />
							</a>
							<p>
								Die Hochschul-SMD Karlsruhe gehört zur Hochschul-SMD, einem deutschlandweiten
								Netzwerk Christlicher Hochschulgruppen.
							</p>

							<a href="https://smd.org">
								<img src={ifes} alt="IFES Logo" class="w-32" />
							</a>
							<p>
								We are part of IFES, a global movement of students sharing and living out the good
								news of Jesus Christ.
							</p>
						</div>
					</section>

					<section class="underline-a flex flex-col gap-3">
						<h2 class="text-primary text-xl uppercase">Andere Gruppen</h2>
						<a href="https://www.sfc-karlsruhe.de">SfC - Studierende für Christus</a>
						<a href="https://esg-karlsruhe.de/">ESG - Evangelische Studierendengemeinde</a>
						<a href="https://www.khg-karlsruhe.de/">KGH - Katholische Hochschulgemeinde</a>
						<a href="https://feg-karlsruhe.de/de/erwachsene/mittendrin/">FeG - Mittendrin</a>
					</section>
				</div>

				<section
					class="mt-16 grid grid-cols-[1fr_6rem] border-t-[1px] border-[#BEBEBE] py-3 max-md:flex-col"
				>
					<div class="underline-a flex flex-wrap pt-1 max-md:flex-col md:gap-8">
						<a href="/imprint">Impressum</a>
						<a href="/privacy">Datenschutz</a>
						<a href="/kontakt">Kontakt</a>
						<a href="/spenden">Spenden</a>
						<a href="https://wiki.smd-karlsruhe.de">Wiki</a>
					</div>

					<div class="flex gap-4 max-md:flex-col max-md:items-end md:items-center md:justify-end">
						<a href="https://www.instagram.com/smd_karlsruhe/" class="flex items-center gap-4">
							<img src={insta} alt="Instagram Logo" class="w-10" />
						</a>
						<a class="pr-1 text-3xl" href="mailto:leiter@smd-karlsruhe.de">
							<Fa icon={faEnvelope} />
						</a>
					</div>
				</section>
			</div>
		</div>
	</footer>
</main>

<style>
	a {
		@apply no-underline;
	}

	.menu {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 400ms;
	}

	.underline-a > a:hover {
		text-decoration: underline;
	}
	.open {
		grid-template-rows: 1fr;
	}
</style>
