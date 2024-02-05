<script lang="ts">
	import { SAFT_COORDINATOR, pb } from '$lib/pocketbase';
	import {
		faAddressBook,
		faGlassWater,
		faRegistered,
		faUser
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';

	let isSaftCoordinator = pb.authStore.model?.roles.includes(SAFT_COORDINATOR);
</script>

<main class="container mx-auto mt-8 flex flex-col gap-8">
	<div class="grid gap-8 max-md:mx-6 lg:grid-cols-5">
		<div class="card md:col-span-2">
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
		<a class="card" href="/intern/address-list">
			<div class="flex justify-center">
				<Fa icon={faAddressBook} class="text-light-blue text-7xl" />
			</div>
			<h2 class="py-4 text-center text-lg md:text-2xl">Hier gehts zur Adressliste</h2>
		</a>
		<a class="card" href="/intern/profile">
			<div class="flex justify-center">
				<Fa icon={faUser} class="-blue text-7xl" />
			</div>
			<h2 class="py-4 text-center text-lg md:text-2xl">Hier gehts zu deinem Profil</h2>
		</a>
		<a class="card" href="/intern/saft">
			<div class="flex justify-center">
				<Fa icon={faGlassWater} class="text-corperate text-7xl" />
			</div>
			<h2 class="py-4 text-center text-lg md:text-2xl">Hier gehts zu deinen SAFT Anmeldungen</h2>
		</a>

		{#if isSaftCoordinator}
			<a href="/intern/saft/list" class="card">
				<div class="flex justify-center">
					<Fa icon={faGlassWater} class="text-secondary-text text-7xl" />
				</div>
				<h2 class="py-4 text-center text-lg md:text-2xl">SAFT Anmeldungen verwalten</h2>
			</a>
		{/if}
	</div>

	<div class="card">
		<h2 class="text-gray-600">Changelog</h2>
		<div class="h-0.5 bg-gray-200"></div>
		<div class=" text-gray-800">
			<p>Die SAFT Koordinatoren können nun die SAFT-Anmeldungen im interenen Bereich einsehen</p>
			<p>
				Die Registrierung wurde überarbeitet. Anstatt alles auf einmal anzugeben werden zunächst nur
				die erforderlichen Daten abgefragt und anschließend automatisch auf die Profilseite
				weitergeleitet, um die restlichen Informationen zu ergänzen.
			</p>
			<p>
				Die neue Addressliste ist da! Dort kannst du alle registrierten Nutzer des internen Bereichs
				finden.
			</p>
			<p>Du kannst nun deine SAFT Anmeldungen einsehen.</p>
			<p>
				Du kannst nun unter deinem Profil deine Allergien hinterlegen (für die nächste SAFT
				Anmeldung und perspektivisch für den GT). Außerdem kannst du angeben, ob du die Richtlinien
				unterschrieben hast.
			</p>
			<p>Es ist nun möglich sein Profil einzusehen und zu bearbeiten.</p>
			<p>Du kannst nun sperat angeben ob du vegetarisch ist oder nicht.</p>
			<p class="font-bold">
				Du kannst dich aus der Addressliste ausblenden lassen, falls du das aus Datenschutzgründen
				bspw. nicht möchtest
			</p>
			<p>
				Dein Profil wurde um ein Geschlechtsfeld erweitert. Dies erleichtert uns die Planung von
				Freizeiten. Außerdem ist das Geschlecht von nun an Pflichtfeld bei der Registrierung.
			</p>
		</div>
	</div>
</main>
