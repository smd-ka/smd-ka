<script lang="ts">
	import '../app.css';
	import '@fontsource/anton';
	import '@fontsource-variable/merriweather-sans';
	import '@fontsource/bebas-neue';
	import '@fontsource/zcool-qingke-huangyou';
	import '@fontsource-variable/caveat';
	import '@fontsource/shippori-mincho-b1';

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
	import { getAvatarUrl, pb } from '$lib/pocketbase';
	import { applyAction, enhance } from '$app/forms';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';
	import { click_outside } from '$lib/click_outside';
	import ifes from '$lib/assets/logos/ifes.png';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { blur, fade } from 'svelte/transition';

	const eventPageUrlsRegEx = new RegExp('semesterprogramm|saft|weekly');

	let showMenu = false;
	let loading = false;
	let src = getAvatarUrl();
	let isValid = pb.authStore.isValid;

	pb.authStore.onChange(() => {
		isValid = pb.authStore.isValid;
		src = getAvatarUrl();
	});
	let scrollY: number;
	let innerHeight: number;
</script>

<svelte:window bind:scrollY bind:innerHeight />
<main class="flex min-h-screen flex-col">
	<nav
		class=" sticky top-0 z-50 flex flex-[0_1_auto] flex-col shadow-md transition-all duration-200"
	>
		<div
			class="flex items-center justify-between gap-4 px-4 py-3
			{scrollY < innerHeight - 70 ? 'bg-transparent backdrop-blur-lg backdrop-brightness-90' : 'bg-grey'}"
		>
			<a class=" py-2" href="/">
				<img class="max-h-7" src={logo} alt="SMD Logo" />
			</a>

			<div class="flex items-center gap-4 text-xl text-white max-lg:hidden">
				<!-- Links (only visable for bigger screens) -->

				<div>
					<a
						href="/about"
						class="{$page.url.pathname.match(eventPageUrlsRegEx)
							? 'text-primary hover:text-white'
							: 'hover:text-primary'} peer flex items-center gap-2"
					>
						Über uns
						<Fa class="text-lg" icon={faChevronDown}></Fa>
					</a>
					<div
						class=" bg-primary absolute hidden justify-center gap-4 px-4 py-2 hover:grid peer-hover:grid"
					>
						<a class="hover:text-primary-text" href="/semesterprogramm">Wer wir sind</a>
						<a class="hover:text-primary-text" href="/saft">Was wir machen</a>
						<a class="hover:text-primary-text" href="/weekly">Kontakt</a>
					</div>
				</div>

				<div>
					<a
						href="/semesterprogramm"
						class="{$page.url.pathname.match(eventPageUrlsRegEx)
							? 'text-primary hover:text-white'
							: 'hover:text-primary'} peer flex items-center gap-2"
					>
						Events
						<Fa class="text-lg" icon={faChevronDown}></Fa>
					</a>
					<div
						class=" bg-primary absolute hidden justify-center gap-4 px-4 py-2 hover:grid peer-hover:grid"
					>
						<a class="hover:text-primary-text" href="/semesterprogramm">Semesterprogramm</a>
						<a class="hover:text-primary-text" href="/saft">SemesterAnfangsFreizeiT </a>
						<a class="hover:text-primary-text" href="/weekly">Wöchentliche Aktionen</a>
					</div>
				</div>
				<div>
					<a
						href="/semesterprogramm"
						class="{$page.url.pathname.match(eventPageUrlsRegEx)
							? 'text-primary hover:text-white'
							: 'hover:text-primary'} peer flex items-center gap-2"
					>
						Neu hier?
						<Fa class="text-lg" icon={faChevronDown}></Fa>
					</a>
					<div
						class=" bg-primary absolute hidden justify-center gap-4 px-4 py-2 hover:grid peer-hover:grid"
					>
						<a class="hover:text-primary-text" href="/semesterprogramm">Semesterprogramm</a>
						<a class="hover:text-primary-text" href="/saft">SemesterAnfangsFreizeiT </a>
						<a class="hover:text-primary-text" href="/weekly">Wöchentliche Aktionen</a>
					</div>
				</div>
				<a href="https://kings-cafe.de">International</a>

				<a class=" self-center" href="/intern">
					{#if isValid}
						<img
							class="h-10 w-10 rounded-full border-2 border-gray-400 object-cover"
							{src}
							alt="user avatar"
						/>
					{:else}
						<Fa
							class={$page.url.pathname.match('account/login')
								? 'text-primary'
								: 'hover:text-primary'}
							icon={faRightToBracket}
						/>
					{/if}
				</a>
			</div>

			<div class="flex items-center gap-2 text-white lg:hidden">
				<button
					class="text-3xl md:text-4xl"
					on:click|stopPropagation={() => (showMenu = !showMenu)}
				>
					{#if showMenu}
						<div in:blur>
							<Fa class="w-6" icon={faX} />
						</div>
					{:else}
						<div in:blur>
							<Fa class="w-6" icon={faBars} />
						</div>
					{/if}
				</button>
			</div>
		</div>

		<!-- <div
			use:click_outside
			on:outsideclick={() => (showMenu = false)}
			class="menu absolute top-[4.5rem] grid w-full {showMenu ? 'open xl:border' : ''} "
		>
			<div class="flex justify-center overflow-hidden">
				<div
					class="text-primary flex h-screen flex-col justify-center gap-4 py-4 text-xl xl:hidden"
				>
					<a on:click={() => (showMenu = false)} class="!hover:no-underline !underline" href="/"
						>Startseite</a
					>
				</div>
			</div>
		</div> -->

		<!-- Dropdown Navigation. Attentions this serves as well the mobiles as desktops!
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
							<a on:click={() => (showMenu = false)} class="hover:underline" href="/weekly">
								Wöchentliche Aktionen
							</a>
						</div>
					</div>
					<a on:click={() => (showMenu = false)} class="!hover:no-underline !underline" href="/new">
						Neu hier?
					</a>
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
			</div>
		</div> -->
		<div class="bg-primary h-1"></div>

		{#if showMenu}
			<div transition:fade class="h-screen backdrop-blur-xl">Some Text in White</div>
		{/if}
	</nav>

	{#if isValid}
		<div class="fixed bottom-4 left-4 z-10 lg:hidden">
			<a href="/intern">
				<img class="h-14 w-14 rounded-full border object-cover" {src} alt="user avatar" />
			</a>
		</div>
	{/if}

	<!-- -------- begin content --------- -->

	<div class=" flex-[1_1_auto]">
		<slot />
	</div>

	<!-- -------- begin footer --------- -->

	<footer class="flex-[0_1_auto]">
		<div class="bg-grey text-gray-200">
			<div class="container mx-auto px-4 py-20 xl:px-40">
				<div class="grid justify-center gap-20 md:grid-cols-2">
					<section class="flex flex-col gap-4">
						<h2 class="text-primary text-xl uppercase">Unser Netzwerk</h2>
						<div class="grid grid-cols-[5rem_1fr] gap-4">
							<a href="https://smd.org" target="_blank">
								<img src={smd_logo} alt="SMD Logo" class="" />
							</a>
							<p>
								Die Hochschul-SMD Karlsruhe gehört zur Hochschul-SMD, einem deutschlandweiten
								Netzwerk Christlicher Hochschulgruppen.
							</p>

							<a href="https://ifesworld.org" target="_blank">
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
						<a href="https://www.khg-karlsruhe.de/">KHG - Katholische Hochschulgemeinde</a>
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
		backdrop-filter: blur(10px);
	}

	.underline-a > a:hover {
		text-decoration: underline;
	}
	.open {
		grid-template-rows: 1fr;
	}
</style>
