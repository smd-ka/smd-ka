<script lang="ts">
	import '../app.css';
	import '@fontsource/anton';
	// Supports weights 300-800
	import '@fontsource-variable/merriweather-sans';
	import logo from '$lib/assets/logos/smd-ka_modified.svg';
	import {
		faBars,
		faChevronDown,
		faRightFromBracket,
		faX
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { FESD_COORDINATOR, SAFT_COORDINATOR, getAvatarUrl, pb } from '$lib/pocketbase';
	import { applyAction, enhance } from '$app/forms';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';
	import { click_outside } from '$lib/click_outside';
	import ifes from '$lib/assets/logos/ifes.png';

	let showMenu = true;
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
		<div
			class="container mx-auto flex items-center justify-between gap-4 py-3
		"
		>
			<a class=" py-2" href="/">
				<img class="max-h-7 pl-4" src={logo} alt="SMD Logo" />
			</a>

			<div class="flex gap-4 text-xl text-white max-xl:hidden">
				<!-- Links (only visable for bigger screens) -->
				<a class="text-primary hover:text-white" href="/">Startseite</a>
				<a href="/about" class="hover:text-primary flex items-center gap-2">
					Über uns
					<Fa class="text-primary text-lg" icon={faChevronDown}></Fa>
				</a>
				<!-- <a class="hover:text-primary" href="/neu-hier">Neu Hier</a> -->
				<a href="/semesterprogramm" class="hover:text-primary flex items-center gap-2">
					Was läuft
					<Fa class="text-primary text-lg" icon={faChevronDown}></Fa>
				</a>
				<a class="hover:text-primary" href="/kalender">Kontakt</a>
			</div>

			<div class="text-white xl:hidden">
				<button
					class="justify-self-end! pb-1 text-2xl md:text-4xl"
					on:click|stopPropagation={() => (showMenu = !showMenu)}
				>
					<Fa class="mr-4 w-6" icon={showMenu ? faX : faBars} />
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
					<a on:click={() => (showMenu = false)} class="hover:text-corperate" href="/">Startseite</a
					>

					<div>
						<a on:click={() => (showMenu = false)} class="!underline" href="/about"> Über uns </a>

						<div class="text-primary-text grid pl-8">
							<a on:click={() => (showMenu = false)} class="hover:underline" href="/about">
								Wer wir sind
							</a>
							<a on:click={() => (showMenu = false)} class="hover:underline" href="/about#orga">
								Wie wir uns organisieren
							</a>
							<a
								on:click={() => (showMenu = false)}
								class="hover:underline"
								href="/about#mitarbeit"
							>
								Mitarbeit
							</a>
							<a on:click={() => (showMenu = false)} class="hover:underline" href="/about#sup">
								Unterstützen
							</a>
						</div>
					</div>
					<a
						on:click={() => (showMenu = false)}
						class="hover:text-corperate"
						href="/semesterprogramm"
					>
						Was läuft
					</a>

					<a on:click={() => (showMenu = false)} class="hover:text-corperate" href="/kalender">
						Kontakt
					</a>

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
				{/if}
			</div>
		</div>
		<div class="bg-primary h-1"></div>
	</nav>

	<div class=" flex-[1_1_auto]">
		<slot />
	</div>

	<footer class="flex-[0_1_auto]">
		<div class="bg-primary">
			<div class="container mx-auto flex items-center justify-center gap-4 max-lg:flex-col">
				<a href="https://www.smd.org/hochschul-smd/startseite" class="p-8"
					><img
						class="w-36"
						src="https://hochschul-smd.org/wp-content/uploads/2022/04/Hochschul-SMD_weiss_web.png"
						alt="Hochschul-SMD"
					/></a
				>
				<a href="https://international.smd.org/start" class="p-8">
					<img
						class="w-36"
						src="https://hochschul-smd.org/wp-content/uploads/2022/04/hochschul_smd_weiss_web-e1649667168460.png"
						alt="International SMD"
					/>
				</a>
				<a href="https://uncover.smd.org/willkommen" class="p-8"
					><img
						class="w-36"
						src="https://hochschul-smd.org/wp-content/uploads/2022/04/uncover_weiss.png"
						alt="Uncover"
					/></a
				>
				<a href="https://www.begruendet-glauben.org/" class="p-8"
					><img
						class="w-36"
						src="https://hochschul-smd.org/wp-content/uploads/2022/04/begruendet_logo_weiss_web.png"
						alt="Begruendet-Glauben"
					/></a
				>
			</div>
		</div>
		<div class="bg-grey text-white">
			<div class="container mx-auto grid justify-center gap-8 px-4 py-20 md:grid-cols-3 md:px-80">
				<section class="flex flex-col gap-4">
					<h2 class="text-primary text-xl uppercase">Unser Netzwerk</h2>
					<p>
						Die Hochschul-SMD Musterstadt gehört zur Hochschul-SMD, einem deutschlandweiten Netzwerk
						Christlicher Hochschulgruppen.
					</p>
					<p>
						We are part of IFES, a global movement of students sharing and living out the good news
						of Jesus Christ.
					</p>
					<p>
						<img src={ifes} alt="IFES Logo" class="w-24" />
					</p>
				</section>

				<section class="flex flex-col gap-4">
					<h2 class="text-primary text-xl uppercase">Quick Links</h2>
					<div>
						<a href="about">Über uns</a><br />
						<a href="#TODO">Kontakt</a><br />
						<a href="#TODO">Impressum</a><br />
						<a href="$TODO">Datenschutzerklärung</a>
					</div>
				</section>

				<section>
					<ul class="wp-block-social-links has-huge-icon-size has-icon-color is-style-logos-only">
						<li class="wp-social-link wp-social-link-facebook wp-block-social-link">
							<a
								href="https://www.facebook.com/smd.muenchen/?locale=de_DE"
								aria-label="Facebook: https://www.facebook.com/smd.muenchen/?locale=de_DE"
								class="wp-block-social-link-anchor"
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									version="1.1"
									xmlns="http://www.w3.org/2000/svg"
									role="img"
									aria-hidden="true"
									focusable="false"
									><path
										d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7C18.3 21.1 22 17 22 12c0-5.5-4.5-10-10-10z"
									></path></svg
								></a
							>
						</li>
						<li class="wp-social-link wp-social-link-instagram wp-block-social-link">
							<a
								href="https://www.instagram.com/smd_muenchen/"
								aria-label="Instagram: https://www.instagram.com/smd_muenchen/"
								class="wp-block-social-link-anchor"
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									version="1.1"
									xmlns="http://www.w3.org/2000/svg"
									role="img"
									aria-hidden="true"
									focusable="false"
									><path
										d="M12,4.622c2.403,0,2.688,0.009,3.637,0.052c0.877,0.04,1.354,0.187,1.671,0.31c0.42,0.163,0.72,0.358,1.035,0.673 c0.315,0.315,0.51,0.615,0.673,1.035c0.123,0.317,0.27,0.794,0.31,1.671c0.043,0.949,0.052,1.234,0.052,3.637 s-0.009,2.688-0.052,3.637c-0.04,0.877-0.187,1.354-0.31,1.671c-0.163,0.42-0.358,0.72-0.673,1.035 c-0.315,0.315-0.615,0.51-1.035,0.673c-0.317,0.123-0.794,0.27-1.671,0.31c-0.949,0.043-1.233,0.052-3.637,0.052 s-2.688-0.009-3.637-0.052c-0.877-0.04-1.354-0.187-1.671-0.31c-0.42-0.163-0.72-0.358-1.035-0.673 c-0.315-0.315-0.51-0.615-0.673-1.035c-0.123-0.317-0.27-0.794-0.31-1.671C4.631,14.688,4.622,14.403,4.622,12 s0.009-2.688,0.052-3.637c0.04-0.877,0.187-1.354,0.31-1.671c0.163-0.42,0.358-0.72,0.673-1.035 c0.315-0.315,0.615-0.51,1.035-0.673c0.317-0.123,0.794-0.27,1.671-0.31C9.312,4.631,9.597,4.622,12,4.622 M12,3 C9.556,3,9.249,3.01,8.289,3.054C7.331,3.098,6.677,3.25,6.105,3.472C5.513,3.702,5.011,4.01,4.511,4.511 c-0.5,0.5-0.808,1.002-1.038,1.594C3.25,6.677,3.098,7.331,3.054,8.289C3.01,9.249,3,9.556,3,12c0,2.444,0.01,2.751,0.054,3.711 c0.044,0.958,0.196,1.612,0.418,2.185c0.23,0.592,0.538,1.094,1.038,1.594c0.5,0.5,1.002,0.808,1.594,1.038 c0.572,0.222,1.227,0.375,2.185,0.418C9.249,20.99,9.556,21,12,21s2.751-0.01,3.711-0.054c0.958-0.044,1.612-0.196,2.185-0.418 c0.592-0.23,1.094-0.538,1.594-1.038c0.5-0.5,0.808-1.002,1.038-1.594c0.222-0.572,0.375-1.227,0.418-2.185 C20.99,14.751,21,14.444,21,12s-0.01-2.751-0.054-3.711c-0.044-0.958-0.196-1.612-0.418-2.185c-0.23-0.592-0.538-1.094-1.038-1.594 c-0.5-0.5-1.002-0.808-1.594-1.038c-0.572-0.222-1.227-0.375-2.185-0.418C14.751,3.01,14.444,3,12,3L12,3z M12,7.378 c-2.552,0-4.622,2.069-4.622,4.622S9.448,16.622,12,16.622s4.622-2.069,4.622-4.622S14.552,7.378,12,7.378z M12,15 c-1.657,0-3-1.343-3-3s1.343-3,3-3s3,1.343,3,3S13.657,15,12,15z M16.804,6.116c-0.596,0-1.08,0.484-1.08,1.08 s0.484,1.08,1.08,1.08c0.596,0,1.08-0.484,1.08-1.08S17.401,6.116,16.804,6.116z"
									></path></svg
								></a
							>
						</li>
					</ul>
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

	.open {
		grid-template-rows: 1fr;
	}
</style>
