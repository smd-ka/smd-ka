<script lang="ts">
	import { REGIOKON_COORDINATOR, SAFT_COORDINATOR, pb } from '$lib/pocketbase';
	import {
		faAddressBook,
		faGlassWater,
		faRegistered,
		faUser
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';

	let isSaftCoordinator = pb.authStore.model?.roles.includes(SAFT_COORDINATOR);
	let isRegiokonCoordinator = pb.authStore.model?.roles.includes(REGIOKON_COORDINATOR);
</script>

<main class="container mx-auto mt-8 flex flex-col gap-8">
	<div class="grid gap-8 max-md:mx-6 lg:grid-cols-5">
		<div class="card md:col-span-2">
			<h2 class="text-primary text-2xl md:text-4xl">
				Willkommen {pb.authStore.model?.name ?? ''}
			</h2>
			<div>
				Du kannst dich nun zur Regiokon anmelden. Bitte vergesse nicht vorher dein Profil zu
				aktualisieren, da die Daten für die Anmeldung benötigt werden.
				<br />
				Der interne Bereich entwickelt sich so langsam. Solltest du während deiner Nutzung auf Bugs stoßen
				melde dich gerne bei Claus. Du hast eine Idee was man hier noch so treiben kann? Schreib mir
				gerne, dann schauen wir mal ob wir das nicht auch umsetzen können!
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

		<a class="card" href="/intern/regiokon">
			<div class="flex justify-center">
				<Fa icon={faRegistered} class="text-7xl text-green-500" />
			</div>
			<h2 class="py-4 text-center text-lg md:text-2xl">Hier gehts zur Regiokon Anmeldung</h2>
		</a>

		{#if isRegiokonCoordinator}
			<a href="/intern/regiokon/list" class="card">
				<div class="flex justify-center">
					<Fa icon={faRegistered} class="text-secondary-text text-7xl" />
				</div>
				<h2 class="py-4 text-center text-lg md:text-2xl">Regiokon Anmeldungen verwalten</h2>
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
