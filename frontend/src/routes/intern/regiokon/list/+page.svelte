<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { faArrowUpFromBracket, faCopy, faEnvelope } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		_exportToCsv,
		_filterSaftRegistrations,
		_postImages,
		_travelOption,
		_travelOptionIcon,
		type SaftRegistrationFilter
	} from './+page';

	export let data;

	let filteredList = data.list;
	let filter: SaftRegistrationFilter = 'all';

	const mailingList = (list) => {
		return `mailto:webmaster@smd-karlsruhe?bcc=:${list
			.filter((x) => x.email)
			.map((x) => x.email)
			.join(';')}`;
	};

	const columns = [
		'Name',
		'Gruppe',
		'An/Abreise Kommentar',
		'Bemerkung',
		'E-Mail-Adresse',
		'Telefonnummer',
		'Vegetarier',
		'Allergien',
		'Geschlecht',
		'Bildrechte'
	];
</script>

<main class="mx-auto px-4 py-12 xl:px-10">
	<h1>Regiokon Anmeldungen</h1>

	{#if data.list}
		<div class="card grid lg:grid-cols-3">
			<h3 class="col-span-full">Übersicht über alle Anmeldungen</h3>
			<div>
				<div>
					<b>{data.list.length}</b>
					Anmeldungen gesamt
				</div>
				<div>
					<bold class="font-bold">{data.isFemale}</bold>
					Anzahl Frauen
				</div>
				<div>
					<bold class="font-bold">{data.isMale}</bold>
					Anzahl Männer
				</div>
			</div>
		</div>

		<div class="flex gap-2 py-2 max-md:flex-col md:gap-4">
			<a
				class="flex items-center gap-2 rounded-md bg-orange-600 px-4 py-2 no-underline"
				href={mailingList(filteredList)}
			>
				<Fa icon={faEnvelope} />
				Email an den Verteiler senden</a
			>
			<button
				class="bg-light-blue flex items-center gap-2 rounded-md px-4 py-2"
				on:click={() =>
					navigator.clipboard.writeText(
						filteredList
							.filter((x) => x.email)
							.map((x) => x.email)
							.join(';')
					)}
			>
				<Fa icon={faCopy} />
				Email Verteiler Kopieren
			</button>

			<button
				class="bg-lime flex items-center gap-2 rounded-md px-4 py-2"
				on:click|preventDefault={() => _exportToCsv(filteredList, filter)}
			>
				<Fa icon={faArrowUpFromBracket} />
				Als CSV exportieren
			</button>

			<select
				bind:value={filter}
				on:change={() => (filteredList = _filterSaftRegistrations(filter, data.list))}
				class="rounded-md px-4 py-2"
			>
				<option value="all">Alle</option>
				<option value="female">Frauen</option>
				<option value="male">Männer</option>
			</select>
		</div>

		<div class="flex overflow-auto">
			<div
				class="pad-childs grid grid-cols-[repeat(10,1fr)] divide-y-2 divide-y-reverse divide-x-reverse whitespace-nowrap"
			>
				{#each columns as column}
					<div><b>{column}</b></div>
				{/each}

				{#each filteredList as registration}
					<div>{registration.name} {registration.surname}</div>
					<div>{registration.smd_group}</div>

					<div class="w-72 whitespace-pre-wrap">
						{registration.travel_comments || ''}
					</div>

					<div class="w-72 whitespace-pre-wrap">
						{registration.comments || ''}
					</div>
					<div>{registration.email}</div>
					<div>{registration.phone}</div>

					<div>{registration.is_vegetarian ? 'Ja' : ''}</div>
					<div class="w-60 whitespace-pre-wrap">{registration.allergies}</div>
					<div>{registration.gender === 'male' ? 'm' : 'w'}</div>
					<div>{_postImages(registration.image_publication_consent)}</div>
				{/each}
			</div>
		</div>
	{/if}
</main>

<style>
	.pad-childs > div {
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}
</style>
