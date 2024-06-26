<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { SAFT_COORDINATOR, pb } from '$lib/pocketbase';
	import {
		faAddressBook,
		faGlassWater,
		faUser,
		faRightFromBracket,
		faTable
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import address_list from '$lib/assets/intern/address_list.jpg';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';
	import { faWikipediaW } from '@fortawesome/free-brands-svg-icons';

	let isSaftCoordinator = pb.authStore.model?.roles.includes(SAFT_COORDINATOR);

	let loading = false;
</script>

<main class="container mx-auto flex flex-col gap-8 py-20 pt-8">
	<div class="grid gap-8 max-md:mx-6 lg:grid-cols-5">
		<div class="tile !font-sans md:col-span-2">
			<h2 class="text-primary text-2xl md:text-4xl">
				Willkommen {pb.authStore.model?.name ?? ''}
			</h2>
			<div>
				<p>
					Du befindest dich im internen Bereich der SMD Karlsruhe. Hier findest du alle wichtigen
					Informationen und Funktionen, die für dich als Mitglied der SMD Karlsruhe relevant sind.
				</p>
				<p>
					Bitte beachte, dass du vertrauliche Informationen nicht weitergeben darfst. Falls du
					Fragen hast, wende dich bitte an das Public Relations and IT (PRIT) Team.
				</p>
			</div>
		</div>
		<a class="tile bg-[url({address_list})]" href="/intern/address-list">
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

		<a
			class="tile"
			href="https://portal.smd.org/start?tx_felogin_login%5Baction%5D=login&tx_felogin_login%5Bcontroller%5D=Login&cHash=729d251e5641b3e3ca9a2a5b2a063e05"
		>
			<Fa icon={faWikipediaW} />
			<h2 class="py-4 text-center text-lg md:text-2xl">Mitarbeiterportal</h2>
		</a>

		<a class="tile" href="/intern/profile">
			<div class="flex justify-center">
				<Fa icon={faUser} class="-blue text-7xl" />
			</div>
			<h2 class="py-4 text-center text-lg md:text-2xl">Dein Profil</h2>
		</a>
		<a class="tile" href="/intern/saft">
			<div class="flex justify-center">
				<Fa icon={faGlassWater} class="text-corperate text-7xl" />
			</div>
			<h2 class="py-4 text-center text-lg md:text-2xl">SAFT Anmeldungen</h2>
		</a>

		{#if isSaftCoordinator}
			<a href="/intern/saft/list" class="tile">
				<div class="flex justify-center">
					<Fa icon={faGlassWater} class="text-secondary-text text-7xl" />
				</div>
				<h2 class="py-4 text-center text-lg md:text-2xl">SAFT Anmeldungen verwalten</h2>
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
		@apply font-mokoto flex flex-col items-center justify-center border-4 border-black bg-white p-8 shadow-md;
	}

	div > a {
		@apply no-underline;
	}

	div > a:hover {
		@apply text-primary;
	}
</style>
