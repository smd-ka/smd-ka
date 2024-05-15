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

				<a class="text-primary hover:text-white" href="/">Startseite</a>
				<div class="relative">
					<a href="/about" class="hover:text-primary peer flex items-center gap-2">
						Über uns
						<Fa class="text-primary text-lg" icon={faChevronDown}></Fa>
					</a>
					<div
						class=" bg-primary absolute hidden justify-center gap-4 px-8 py-2 hover:grid peer-hover:grid"
					>
						<a class="hover:text-primary-text" href="/about">Wer wir sind</a>
						<a class="hover:text-primary-text" href="/about#orga">Wie wir uns organisieren</a>
						<a class="hover:text-primary-text" href="/about#mitarbeiten">Mitarbeiten</a>
						<a class="hover:text-primary-text" href="/about#sup">Unterstützen</a>
					</div>
				</div>
				<div>
					<a href="/semesterprogramm" class="hover:text-primary peer flex items-center gap-2">
						Was läuft
						<Fa class="text-primary text-lg" icon={faChevronDown}></Fa>
					</a>
					<div
						class=" bg-primary absolute hidden w-64 justify-center gap-4 px-8 py-2 hover:grid peer-hover:grid"
					>
						<a class="hover:text-primary-text" href="/semesterprogramm">Semesterprogramm</a>
						<a class="hover:text-primary-text" href="/saft">SemesterAnfangsFreizeiT </a>
						<a class="hover:text-primary-text" href="/vortrag">
							Vortrag: Der Urknall und die Gottesfrage
						</a>
						<a class="hover:text-primary-text" href="/semesterprogramm#aktionen"
							>Wöchentliche Aktionen</a
						>
					</div>
				</div>
				<a class="hover:text-primary" href="/kontakt">Kontakt</a>
				<a class=" self-center" href="/intern">
					{#if isValid}
						<img
							class=" h-10 w-10 rounded-full border-2 border-gray-400 object-cover"
							{src}
							alt="user avatar"
						/>
					{:else}
						<Fa class="text-xl text-white" icon={faRightToBracket} />
					{/if}
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
								href="/about#mitarbeiten"
							>
								Mitarbeiten
							</a>
							<a on:click={() => (showMenu = false)} class="hover:underline" href="/about#sup">
								Unterstützen
							</a>
						</div>
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
							<a
								on:click={() => (showMenu = false)}
								class="hover:underline"
								href="/semesterprogramm#aktionen"
							>
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
		<div class="bg-primary">
			<div class="container mx-auto flex items-center justify-center gap-4 max-md:flex-col">
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
		<div class="bg-grey text-gray-200">
			<div class="container mx-auto px-4 py-20 xl:px-80">
				<div class="grid justify-center gap-8 md:grid-cols-2">
					<!-- <div class="col-span-2 pb-10">
						<img class="h-7" src={logo} alt="SMD Logo" />
						<p class="pt-4">
							Wir sind eine überkonfessionelle christliche Hochschulgruppe. In verschiedenen
							Formaten wollen wir zum Nach- und Weiterdenken über den christlichen Glauben anregen
							und Gemeinschaft erleben.
						</p>
					</div> -->

					<section class="flex flex-col gap-4">
						<h2 class="text-primary text-xl uppercase">Unser Netzwerk</h2>
						<p>
							Die Hochschul-SMD Karlsruhe gehört zur Hochschul-SMD, einem deutschlandweiten Netzwerk
							Christlicher Hochschulgruppen.
						</p>
						<p>
							We are part of IFES, a global movement of students sharing and living out the good
							news of Jesus Christ.
						</p>

						<div class="flex items-center gap-8">
							<a href="https://ifesworld.org">
								<img src={ifes} alt="IFES Logo" class="w-24" />
							</a>
							<a href="https://smd.org">
								<img src={smd_logo} alt="SMD Logo" class="w-24" />
							</a>
						</div>
					</section>

					<section class="underline-a flex flex-col gap-3">
						<h2 class="text-primary text-xl uppercase">Hochschulgruppen</h2>
						<a href="https://www.sfc-karlsruhe.de">SfC - Studierende für Christus</a>
						<a href="https://www.khg-karlsruhe.de/">KGH - Katholische Hochschulgemeinde</a>
						<a href="https://esg-karlsruhe.de/">ESG - Evangelische Studierendengemeinde</a>
					</section>

					<!-- <section class="flex flex-col gap-3">
						<h2 class="text-primary text-xl uppercase">Gemeinden</h2>
						<a href="https://feg-karlsruhe.de">FeG Karlsruhe</a>
						<a href="https://www.cg-karlsruhe.de/">CG Karlsruhe</a>
						<a href="https://www.efg-karlsruhe.de">EFG Karlsruhe</a>
						<a href="https://faecherkirche.de">Fächerkirche</a>
						<a href="https://lkg-karlsruhe.de">LkG Karlsruhe</a>
						<a href="https://www.icf-karlsruhe.de">ICF Karlsruhe</a>
						<a href="https://treffpunkt-leben.de/">Treffpunkt Leben</a>
						<a href="https://www.stadtkirche-karlsruhe.de/">Stadtkirche</a>
						<a href="https://www.czk.de/">Christliches Zentrum</a>
					</section> -->
				</div>
				<section class="mt-16 flex flex-wrap justify-between border-t-[1px] border-[#BEBEBE] py-3">
					<div class="underline-a flex flex-wrap gap-8 pt-1">
						<a href="/imprint">Impressum</a>
						<a href="/privacy">Datenschutz</a>
						<a href="/kontakt">Kontakt</a>
						<a href="/about#sup">Spenden</a>
						<a href="https://wiki.smd-karlsruhe.de">Wiki</a>
					</div>

					<div class="flex items-center gap-4">
						<a href="https://www.instagram.com/smd_karlsruhe/" class="flex items-center gap-4">
							<img src={insta} alt="Instagram Logo" class="w-10" />
						</a>
						<a class="text-3xl" href="mailto:leiter@smd-karlsruhe.de">
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
