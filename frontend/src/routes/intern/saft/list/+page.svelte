<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import {
		faArrowUpFromBracket,
		faCopy,
		faExclamationTriangle,
		faEnvelope
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';
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
	let paidLoading: number[] = [];
	let paidError: number[] = [];

	console.log(data);

	const mailingList = (list) => {
		return `mailto:webmaster@smd-karlsruhe?bcc=:${list
			.filter((x) => x.email)
			.map((x) => x.email)
			.join(';')}`;
	};

	async function togglePaid(
		id: number,
		registrationId: string | undefined,
		paid: boolean | undefined
	) {
		if (!registrationId) return;
		try {
			paidLoading = [...paidLoading, id];
			paidError = paidError.filter((x) => x !== id);
			const result = await pb.collection('saft').update(registrationId, { paid: paid });
		} catch (e: any) {
			console.error(e);
			paidError = [...paidError, id];
		}
		paidLoading = paidLoading.filter((x) => x !== id);
		filteredList = _filterSaftRegistrations(filter, data.list);
	}

	const columns = [
		'Bezahlt',
		'Name',
		'Geschlecht',
		'An/Abreise Option',
		'An/Abreise Kommentar',
		'Ticket',
		// 'Gruppe',
		'Bodenschläfer',
		'Bemerkung',
		'E-Mail-Adresse',
		'Telefonnummer',
		// SS25
		'Schlafsack',
		'Isomatte',
		'Gaskocher mit Topf',
		'Zelte',
		'Anzahl Schlafsäcke zu verleihen',
		'Anzahl Isomatten zu verleihen',
		//
		'Kuchen',
		'Vegetarier',
		'Allergien',
		'Bildrechte'
	];
</script>

<main class="mx-auto px-4 py-12 xl:px-10">
	<h1>SAFT Anmeldungen</h1>

	{#if data.list}
		<div class="card grid lg:grid-cols-3">
			<h3 class="col-span-full">Übersicht über alle Anmeldungen</h3>
			<div>
				<div>
					<b>{data.list.length}</b>
					Anmeldungen gesamt
				</div>
				<div>
					<b>{data.takesBikeCount}</b>
					Fahrradfahrer
				</div>
				<div>
					<b>{data.takesOwnCount}</b>
					reisen selbständig an
				</div>
				<!-- <div>
					<b>{data.takesCarCount}</b>
					Autofahrer (die Gepäck mitnehmen können)
				</div> -->
				<!-- <div>
					<b>{data.landauCount}</b>
					Landauer
				</div> -->
				<div>
					<b>{data.takesTrainCount}</b>
					Bahnfahrer, davon
				</div>
				<div class="pl-8">
					<b>{data.hasDTicketCount}</b>
					mit D-Ticket<br />
					<b>{data.hasKVVCount}</b>
					mit KVV-Bescheinigung<br />
					<b>{data.hasKVVSemesterCount}</b>
					mit KVV-Semesterticket
				</div>
			</div>
			<div>
				<div>
					<b>{data.pots}</b> Gaskocher mit Topf <br />
					<b>{data.sleepingBagsMissing}</b> Personen, die keinen Schlafsack haben <br />
					<b>{data.availableBags}</b> verfügbare Schlafsäcke <br />
					<b>{data.sleepingPadsMissing}</b> Personen, die ne Iso brauchen <br />
					<b>{data.availablePads}</b> verfügbare Isomatten <br />
				</div>
			</div>
			<div>
				<div>
					<bold class="font-bold">{data.isfemale}</bold>
					Anzahl Frauen
				</div>
				<div>
					<bold class="font-bold">{data.ismale}</bold>
					Anzahl Männer
				</div>
			</div>

			<!-- nochmal block mit Gender -->
		</div>

		<div class="flex flex-wrap items-center pt-6">
			<b class="pr-2">Achtung!</b>
			Sollte dieses Symbol <Fa class="px-2 text-red-700" icon={faExclamationTriangle} /> neben dem Haken
			angezeigt werden, dann wurde die Änderung nicht gespeichert!
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
				<option value="paid">Bezahlt</option>
				<option value="unpaid">Unbezahlt</option>
				<option value="bike">Fahrradfahrer</option>
				<option value="train">Bahnfahrer</option>
				<option value="floor_sleeper">Bodenschläfer</option>
				<option value="female">Frauen</option>
				<option value="male">Männer</option>
			</select>
		</div>

		<div class="flex overflow-auto">
			<div
				class="pad-childs grid grid-cols-[repeat(20,1fr)] divide-y-2 divide-y-reverse divide-x-reverse whitespace-nowrap"
			>
				{#each columns as column}
					<div><b>{column}</b></div>
				{/each}

				{#each filteredList as registration, i}
					<div class="flex items-start gap-4 py-1">
						<input
							disabled={paidLoading.includes(i)}
							bind:checked={registration.paid}
							on:change={() => togglePaid(i, registration.id, registration.paid)}
							type="checkbox"
						/>
						{#if paidLoading.includes(i)}
							<img class="h-4 w-4" src={loadingSpinner} alt="loading" />
						{/if}
						{#if paidError.includes(i)}
							<Fa class="text-red-700" icon={faExclamationTriangle} />
						{/if}
					</div>
					<div>{registration.name}</div>
					<div>{registration.gender === 'male' ? 'm' : 'w'}</div>

					<div class="flex items-center gap-2">
						<Fa icon={_travelOptionIcon(registration.travel_option)} />
						{_travelOption(registration.travel_option)}
					</div>
					<div class="w-72 whitespace-pre-wrap">
						{registration.travel_comments || ''}
					</div>
					<div>
						{registration.ticket || ''}
					</div>
					<!-- <div>{registration.group === 'Landau' ? 'Landau' : 'Karlsruhe'}</div> -->
					<div>{registration.would_sleep_on_floor ? 'Ja' : ''}</div>

					<div class="w-72 whitespace-pre-wrap">
						{registration.comments || ''}
					</div>
					<div>{registration.email}</div>
					<div>{registration.phonenumber}</div>

					<!-- SS25 -->

					<div>{registration.bag ? 'ja' : ''}</div>
					<div>{registration.pad ? 'ja' : ''}</div>
					<div>{registration.pot ? 'ja' : ''}</div>
					<div>{registration.tents}</div>
					<div>{registration.bag_count}</div>
					<div>{registration.pad_count}</div>

					<div>{registration.brings_cake ? 'Ja' : ''}</div>
					<div>{registration.is_vegetarian ? 'Ja' : ''}</div>
					<div class="w-60 whitespace-pre-wrap">{registration.allergies}</div>
					<div>{_postImages(registration.post_images)}</div>
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
