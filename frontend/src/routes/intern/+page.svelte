<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import {
		faAddressBook,
		faGlassWater,
		faRegistered,
		faUser
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';

	let isSaftCoordinator = pb.authStore.model?.roles.includes('saftcoordinator');
</script>

<main class="container mx-auto mt-8 flex flex-col gap-8">
	<div class="grid gap-8 md:grid-cols-5">
		<div class="card md:col-span-2">
			<h2 class="text-primary text-2xl md:text-4xl">
				Willkommen {pb.authStore.model?.name ?? ''}
			</h2>
			<div>
				Der interne Bereich ist noch immer ein bisschen am entstehen. Solltest du während deiner
				Nutzung auf Bugs stoßen melde dich gerne bei Claus. Du hast eine Idee was man hier noch so
				treiben kann? Schreib mir gerne, dann schauen wir mal ob wir das nicht auch umsetzen können!
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
	</div>

	{#if isSaftCoordinator}
		<div class="card flex flex-wrap md:gap-8">
			<div class="pb-0.5">
				<span class="text-primary text-lg md:text-2xl">Danke</span>, dass du an der SAFT
				mitorganisierst!
			</div>
			<a
				class="bg-primary hover:bg-corperate rounded-lg px-4 py-2 text-white max-md:text-sm"
				href="/intern/saft/list"
			>
				Jetzt SAFT-Anmeldungen verwalten
			</a>
		</div>
	{/if}

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
		</div>
	</div>
</main>
