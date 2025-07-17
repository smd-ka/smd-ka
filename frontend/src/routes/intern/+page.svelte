<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { PRIT_RESPONSABLE, SAFT_COORDINATOR, pb } from '$lib/pocketbase';
	import {
		faAddressBook,
		faGlassWater,
		faUser,
		faRightFromBracket,
		faTable,
		faTShirt,
		faCamera,
		faCalendar,
		faCloud,
		faBurger
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';
	import { faWikipediaW } from '@fortawesome/free-brands-svg-icons';

	let isSaftCoordinator = pb.authStore.model?.roles.includes(SAFT_COORDINATOR);
	let isPritTeam = pb.authStore.model?.roles.includes(PRIT_RESPONSABLE);

	let loading = false;
</script>

<main class="container mx-auto flex flex-col gap-8 py-20 pt-8">
	<div class="grid gap-8 max-md:mx-6 lg:grid-cols-5">
		<div class="tile !font-sans md:col-span-3 md:row-span-2">
			<h2 class="text-primary text-2xl md:text-4xl">
				Willkommen {pb.authStore.model?.name ?? ''}
			</h2>
			<div class="grid gap-2">
				<p>
					Du befindest dich im internen Bereich der SMD Karlsruhe. Hier findest du alle wichtigen
					Informationen und Funktionen, die für dich als Mitglied der SMD Karlsruhe relevant sind.
				</p>

				<p>
					<b>Die SMD Cloud ist da!</b>
					Damit du dafür kein weiteres Konto benötigst, kannst du dich mit deiner E-Mail und Passwort
					des internen Bereichs anmelden bei unserem Single Sign-On (SSO) System anmelden. (Dafür ist
					auch der Login with OAuth Button hier gedacht.)
					<br />
					Also nix wie los! Die Cloud findest du
					<a class="text-primary" href="https://cloud.smd-karlsruhe.de/apps/user_oidc/login/1">hier</a>. <br />
					Klicke dann auf "Login with Authentik" und verwende deine E-Mail und Passwort des internen
					Bereichs, um dich anzumelden.
				</p>

				<!-- <p>
						Neu in der SMD? Dann schau doch mal bei unserem Onboarding vorbei. Dort findest du alle
					Infos, die du brauchst, um bei uns durchzustarten.
					<br />
					<a
						class="bg-primary flex w-fit items-center gap-2 rounded-sm px-4 py-2 text-white"
						href="/intern/onboarding"
						>
						<Fa icon={faArrowRight} />
						Hier geht's zum Onboarding
					</a>
				</p> -->
				<p class="text-red-500">
					Bitte beachte, dass du vertrauliche Informationen nicht weitergeben darfst. Falls du
					Fragen hast, wende dich bitte an das Public Relations and IT (PRIT) Team.
				</p>
			</div>
		</div>
		<a class="tile bg-cover" href="/intern/address-list">
			<Fa icon={faAddressBook} class="text-light-blue text-7xl" />
			<h2 class="py-4 text-center text-lg md:text-2xl">Adressliste</h2>
		</a>

		<a
			class="tile"
			href="https://docs.google.com/spreadsheets/d/1elIUUx3LKdrvCmuGbXDzUgSeF2iMWq7bZRdVswGHLYM/edit?usp=sharing"
		>
			<Fa icon={faTable} class="text-7xl text-[#34A853]" />
			<h2 class="py-4 text-center text-lg md:text-2xl">Mastersheet</h2>
		</a>

		<a class="tile" href="https://wiki.smd-karlsruhe.de">
			<Fa icon={faWikipediaW} class="text-7xl text-[#DB7444]" />
			<h2 class="py-4 text-center text-lg md:text-2xl">Wiki</h2>
		</a>

		<a class="tile" href="https://cloud.smd-karlsruhe.de/apps/user_oidc/login/1">
			<Fa icon={faCloud} class="text-7xl text-[#0078D4]" />
			<h2 class="py-4 text-center text-lg md:text-2xl">Cloud</h2>
		</a>

		<a class="tile" href="https://portal.smd.org/">
			<Fa icon={faTShirt} />
			<h2 class="py-4 text-center text-lg md:text-2xl">SMD Mitarbeiterportal</h2>
		</a>

		<a class="tile" href="/intern/profile">
			<div class="flex justify-center">
				<Fa icon={faUser} class="text-7xl " />
			</div>
			<h2 class="py-4 text-center text-lg md:text-2xl">Dein Profil</h2>
		</a>

		<a class="tile" href="/intern/allergy-list">
			<div class="flex justify-center">
				<Fa icon={faBurger} class="text-7xl text-red-400" />
			</div>
			<h2 class="py-4 text-center text-lg md:text-2xl">Allergie-Liste</h2>
		</a>

		<!-- <a class="tile" href="/saft/signup">
			<div class="flex justify-center">
				<Fa icon={faGlassWater} class="text-corperate text-7xl" />
			</div>
			<h2 class="py-4 text-center text-lg md:text-2xl">SAFT Anmeldung</h2>
		</a> -->

		<a class="tile" href="/intern/kalender">
			<div class="flex justify-center text-orange-400">
				<Fa icon={faCalendar} class="text-corperate text-7xl" />
			</div>
			<h2 class="py-4 text-center text-lg md:text-2xl">Kalender bearbeiten</h2>
		</a>

		{#if isSaftCoordinator}
			<a href="/intern/saft/list" class="tile">
				<div class="flex justify-center">
					<Fa icon={faGlassWater} class="text-secondary-text text-7xl" />
				</div>
				<h2 class="py-4 text-center text-lg md:text-2xl">SAFT Anmeldungen verwalten</h2>
			</a>
		{/if}

		{#if isPritTeam}
			<a href="/intern/saft/prit" class="tile">
				<div class="flex justify-center">
					<Fa icon={faCamera} class="text-secondary-text text-7xl" />
				</div>
				<h2 class="py-4 text-center text-lg md:text-2xl">PRIT SAFT</h2>
			</a>
		{/if}

		<div class="tile">
			<form
				method="POST"
				action="/account/logout"
				use:enhance={() => {
					loading = true;
					return async ({ result }) => {
						pb.authStore.clear();
						await applyAction(result);
						loading = false;
					};
				}}
				class=" text-primary flex flex-col items-center justify-center gap-4 py-4 text-xl"
			>
				<button class="hover:bg-curulean-dark flex gap-2 align-middle" type="submit">
					{#if loading}
						<img src={loadingSpinner} class="h-7" alt="loading" />
					{:else}
						<div class="flex flex-col items-center text-lg md:text-2xl">
							<Fa class="self-center text-7xl" icon={faRightFromBracket} />
							Logout
						</div>
					{/if}
				</button>
			</form>
		</div>
	</div>
</main>

<style>
	.tile {
		@apply flex flex-col items-center justify-center border-4 border-black bg-white p-8 shadow-md;
	}

	div > a {
		@apply no-underline;
	}

	div > a:hover {
		@apply text-primary;
	}
</style>
