<script lang="ts">
	import { dev } from '$app/environment';
	import { pb } from '$lib/pocketbase';
	import {
		faArrowUpFromBracket,
		faCopy,
		faEnvelope,
		faExclamationTriangle,
		faGhost
	} from '@fortawesome/free-solid-svg-icons';
	import { faSignalMessenger } from '@fortawesome/free-brands-svg-icons';
	import InstantCheckbox from '$lib/components/forms/InstantCheckbox.svelte';
	import {
		_exportToCsv,
		_filterSaftRegistrations,
		_postImages,
		_saftRegistrationFilters,
		_travelOption,
		_travelOptionIcon,
		type SaftRegistrationFilter
	} from './+page';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import 'dayjs/locale/de';
	import Fa from 'svelte-fa';
	import { telHref, signalHref } from '$lib/profile';

	dayjs.extend(relativeTime);
	dayjs.locale('de'); // TODO configure globally

	export let data;

	let filteredList = data.list;
	let filter: SaftRegistrationFilter = 'all';

	let paidError: string[] = [];
	/** flip the key to retrigger the error block */
	let paidErrorKey = false;
	function addPaidError(id: string) {
		paidError = [...paidError, id];
		paidErrorKey = !paidErrorKey; // flip retriggers key block
	}
	function resetPaidError(id: string) {
		paidError = paidError.filter((x) => x !== id);
		filteredList = _filterSaftRegistrations(filter, data.list);
	}

	$: filteredList = _filterSaftRegistrations(filter, data.list);

	console.log(data);

	/** determines debug mode of this page */
	enum ToggleMode {
		/** real update - persists to the backend */
		REAL = 'real',
		/** simulate a successful update - without changing anything in the backend */
		SUCCESS = 'success',
		/** simulate a failing update */
		ERROR = 'error'
	}
	let toggleMode = ToggleMode.REAL;

	async function togglePaid(id: string, paid: boolean) {
		// "if (dev)" can be optimized away by the compiler in production builds
		if (dev) {
			console.log(`togglePaid(${id}, ${paid}) in mode ${toggleMode}`);
			// sleep so that loading state is clearly visible
			await new Promise<void>((r) => setTimeout(() => r(), 1000));
			switch (toggleMode) {
				case ToggleMode.SUCCESS:
					return;
				case ToggleMode.ERROR:
					throw new Error('simulated error while toggling paid status');
				case ToggleMode.REAL:
					break;
			}
		}
		await pb.collection('saft').update(id, { paid });
	}

	$: recipientEmails = filteredList
		.map((x) => (typeof x.email === 'string' ? x.email.trim() : ''))
		.filter((x) => x !== '');
	$: mailAddressesString = recipientEmails.join(';');
	$: mailingList = (() => {
		// follow RFC 6068 strictly (commas and percent-encoding)
		const params = new URLSearchParams();
		// without "To", preferring "Bcc" only, to avoid exposing email addresses to each other
		params.set('bcc', recipientEmails.join(','));
		params.set('subject', 'SAFT');
		return `mailto:?${params.toString()}`;
	})();

	const columns = [
		'Angemeldet um',
		'Bezahlt',
		'Name',
		'Geschlecht',
		'An/Abreise Option',
		// SS25
		// 'Anreise Freitag',
		//
		'An/Abreise Kommentar',
		'Ticket',
		// 'Gruppe',
		'Bodenschläfer',
		'Bemerkung',
		'E-Mail-Adresse',
		'Telefonnummer',
		// summer semester outdoor
		/*
		'Schlafsack',
		'Isomatte',
		'Gaskocher mit Topf',
		'Zelte',
		'Anzahl Schlafsäcke zu verleihen',
		'Anzahl Isomatten zu verleihen',
		'Beilage zum Grillen',
		'Lichterkette',
		'Kochen (1-5)',
		*/
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
					Letzte Anmeldung:
					<b title={dayjs(data.lastSubmission).format('DD.MM.YYYY HH:mm')}>
						{dayjs(data.lastSubmission).fromNow()}
					</b>
				</div>
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
				<div>
					<b>{data.comesFridayCount}</b>
					reisen erst Freitag an
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
					{#each data.ticketCounts ?? [] as entry}
						<b>{entry.count}</b> mit {entry.ticket}<br />
					{/each}
				</div>
			</div>
			<div>
				<div>
					<b>{data.pots}</b> Gaskocher mit Topf <br />
					<b>{data.sleepingBagsMissing}</b> Personen, die keinen Schlafsack haben <br />
					<b>{data.availableBags}</b> verfügbare Schlafsäcke <br />
					<b>{data.sleepingPadsMissing}</b> Personen, die ne Iso brauchen <br />
					<b>{data.availablePads}</b> verfügbare Isomatten <br />
					<b>{data.fairyLightsCount}</b> Lichterketten <br />
				</div>
			</div>
			<div>
				<div>
					<bold class="font-bold">{data.isFemale}</bold>
					Anzahl Frauen
				</div>
				<div>
					<bold class="font-bold">{data.isMale}</bold>
					Anzahl Männer
				</div>
			</div>

			<!-- nochmal block mit Gender -->
		</div>

		<div class="flex gap-2 py-2 max-md:flex-col md:gap-4">
			{#if dev}
				{@const destructive = toggleMode === ToggleMode.REAL}
				<label
					class="flex w-fit items-center gap-2 rounded-md border px-3 py-1.5 text-sm testmode-{destructive
						? 'destructive'
						: 'normal'}"
				>
					<span class="font-bold">Testmodus für "Bezahlt":</span>
					<select bind:value={toggleMode} class="w-44 px-2 py-1">
						<option value={ToggleMode.REAL}>Anfrage an Backend</option>
						<option value={ToggleMode.SUCCESS}>simulierter Erfolg</option>
						<option value={ToggleMode.ERROR}>simulierter Fehler</option>
					</select>
					<Fa class="h-4 w-4" icon={destructive ? faExclamationTriangle : faGhost} />
				</label>
			{/if}

			<a
				class="flex items-center gap-2 rounded-md bg-orange-600 px-4 py-2 no-underline"
				href={mailingList}
			>
				<Fa icon={faEnvelope} />
				Email an den Verteiler senden</a
			>
			<button
				class="flex items-center gap-2 rounded-md bg-light-blue px-4 py-2"
				on:click={() => navigator.clipboard.writeText(mailAddressesString)}
			>
				<Fa icon={faCopy} />
				Email Verteiler Kopieren
			</button>

			<button
				class="flex items-center gap-2 rounded-md bg-lime px-4 py-2"
				on:click|preventDefault={() => _exportToCsv(filteredList, filter)}
			>
				<Fa icon={faArrowUpFromBracket} />
				Als CSV exportieren
			</button>

			<select bind:value={filter} class="rounded-md px-4 py-2">
				{#each Object.entries(_saftRegistrationFilters) as [key, { label }]}
					<option value={key}>{label}</option>
				{/each}
			</select>
		</div>

		<div class="flex overflow-auto">
			<div
				class="pad-childs grid divide-y-2 divide-y-reverse divide-x-reverse whitespace-nowrap"
				style={`grid-template-columns: repeat(${columns.length}, 1fr);`}
			>
				{#each columns as column}
					<div><b>{column}</b></div>
				{/each}

				{#each filteredList as registration}
					<div>
						{dayjs(registration.created).format('DD.MM.YYYY HH:mm')}
					</div>
					<div>
						<InstantCheckbox
							id={registration.id}
							bind:checked={registration.paid}
							update={togglePaid}
							on:error={(e) => addPaidError(e.detail.id)}
							on:resolved={(e) => resetPaidError(e.detail.id)}
						/>
					</div>
					<div>{registration.name}</div>
					<div>{registration.gender === 'male' ? 'm' : 'w'}</div>

					<div class="flex items-center gap-2">
						<Fa icon={_travelOptionIcon(registration.travel_option)} />
						{_travelOption(registration.travel_option)}
					</div>
					<!-- <div>{registration.comes_friday ? 'ja' : ''}</div> -->
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
					<div><a href={`mailto:${registration.email}`}>{registration.email}</a></div>
					<div>
						<a href={telHref(registration.phonenumber)}>{registration.phonenumber}</a>
						<a
							class="icon-link ml-2"
							href={signalHref(registration.phonenumber)}
							target="_blank"
							rel="noreferrer"
							title="Per Signal schreiben"
						>
							<Fa icon={faSignalMessenger} />
						</a>
					</div>

					<!-- summer semester outdoor -->

					<!--
					<div>{registration.bag ? 'ja' : ''}</div>
					<div>{registration.pad ? 'ja' : ''}</div>
					<div>{registration.pot ? 'ja' : ''}</div>
					<div>{registration.tents}</div>
					<div>{registration.bag_count}</div>
					<div>{registration.pad_count}</div>
					<div class="w-60 whitespace-pre-wrap">{registration.side_dish}</div>
					<div>{registration.fairy_lights ? 'Ja' : ''}</div>
					<div>{registration.likes_cooking ?? ''}</div>
					-->

					<div>{registration.brings_cake ? 'Ja' : ''}</div>
					<div>{registration.is_vegetarian ? 'Ja' : ''}</div>
					<div class="w-60 whitespace-pre-wrap">{registration.allergies}</div>
					<div>{_postImages(registration.post_images)}</div>
				{/each}
			</div>
		</div>

		{#key paidErrorKey}
			{#if paidError.length > 0}
				<div
					class="animate-flash sticky bottom-4 z-10 m-3 mt-6 flex flex-wrap items-center rounded-lg bg-red-300 px-4 py-2"
				>
					<Fa class="px-2 text-red-700" icon={faExclamationTriangle} />
					<b class="pr-2">Achtung!</b>
					Manche Änderungen konnten nicht gespeichert werden. Bitte überprüfe die markierten Einträge.
				</div>
			{/if}
		{/key}
	{/if}
</main>

<style>
	.pad-childs > div {
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}

	.animate-flash {
		animation: flash 0.5s linear 3;
	}

	@keyframes flash {
		0% {
			transform: rotate(0deg);
			filter: brightness(1);
		}
		25% {
			transform: rotate(1deg);
		}
		50% {
			transform: rotate(0deg);
			filter: brightness(1.5);
		}
		75% {
			transform: rotate(-1deg);
		}
		100% {
			transform: rotate(0deg);
			filter: brightness(1);
		}
	}

	.testmode-normal {
		@apply border-blue-400 bg-blue-50 text-blue-700;
	}

	.testmode-destructive {
		@apply border-red-400 bg-red-50 text-red-700;
	}
</style>
