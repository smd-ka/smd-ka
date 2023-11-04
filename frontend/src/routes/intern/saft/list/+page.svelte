<script lang="ts">
	import type { saftRegistration } from '$lib/models';
	import { pb } from '$lib/pocketbase';
	import {
		faArrowUpFromBracket,
		faBicycle,
		faCar,
		faCopy,
		faExclamationTriangle,
		faTrain
	} from '@fortawesome/free-solid-svg-icons';
	import type { Record } from 'pocketbase';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';

	let loading = true;
	let error = false;
	let currentList: saftRegistration[] = [];
	let result: saftRegistration[] = [];

	let paidLoading: number[] = [];
	let paidError: number[] = [];
	let filter: 'all' | 'paid' | 'unpaid' | 'bike' | 'train' = 'all';

	onMount(async () => {
		try {
			result = await pb.collection('saft_registrations').getFullList({
				sort: 'name'
			});
		} catch (e: any) {
			console.error(e);
			error = true;
		}
		loading = false;
		filterRegistrations();
	});

	function filterRegistrations() {
		switch (filter) {
			case 'all':
				currentList = result;
				break;
			case 'paid':
				currentList = result.filter((x) => x.paid);
				break;
			case 'unpaid':
				currentList = result.filter((x) => !x.paid);
				break;
			case 'bike':
				currentList = result.filter((x) => x.takes_bike);
				break;
			case 'train':
				currentList = result.filter((x) => x.takes_train);
				break;
		}
	}

	const countTakesBike = () => currentList.filter((x) => x.takes_bike).length;
	const countTakesTrain = () => currentList.filter((x) => x.takes_train).length;
	const countHasDTicket = () =>
		currentList.filter((x) => x.ticket === 'Deutschlandticket/Jugendticket BW').length;
	const countHasKVVSemester = () =>
		currentList.filter((x) => x.ticket === 'KVV-Semesterticket').length;
	const countHasKVV = () => currentList.filter((x) => x.ticket === 'KVV-Bescheinigung').length;

	const mailingList = () => {
		const list = currentList
			.filter((x) => x.email)
			.map((x) => x.email)
			.join(';');
		return `mailto:${list}`;
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
		filterRegistrations();
	}

	function exportToCsv() {
		const rows = [
			[
				'Bezahlt',
				'Name',
				'E-Mail-Adresse',
				'Telefonnummer',
				'An/Abreise',
				'Ticket',
				'Bodenschläfer',
				'Kuchen',
				'Vegetarier',
				'Allergien',
				'Bemerkung'
			],
			...result.map((x) => [
				x.paid ? 'Ja' : 'Nein',
				x.name,
				x.email,
				x.phonenumber,
				`${x.takes_car ? 'Auto ' : ''}${x.takes_bike ? 'Fahrrad ' : ''}${
					x.takes_train ? 'Bus & Bahn ' : ''
				}`,
				x.ticket,
				x.would_sleep_on_floor ? 'Ja' : '',
				x.brings_cake ? 'Ja' : '',
				x.is_vegetarian ? 'Ja' : '',
				x.allergies,
				'"' + x.comments + '"'
			])
		];

		let csvContent = 'data:text/csv;charset=utf-8,' + rows.map((x) => x.join(',')).join('\n');

		const encodedUri = encodeURI(csvContent);
		const link = document.createElement('a');
		link.setAttribute('href', encodedUri);
		link.setAttribute(
			'download',
			`SAFT_Anmeldungen_${result.length > 1 ? result[0].semester : ''}_${filter}.csv`
		);
		document.body.appendChild(link); // Required for FF

		link.click();
	}
</script>

<main class="container mx-auto">
	<div class="card mt-8 flex flex-col gap-4">
		<div>
			<h1 class="text-primary text-2xl md:text-4xl">SAFT Anmeldungen</h1>
			<div class="flex flex-wrap">
				<bold class="pr-2 font-bold">Achtung!</bold>
				Sollte dieses Symobol <Fa class="px-2 text-red-700" icon={faExclamationTriangle} /> neben dem
				Haken angezeigt werden, dann wurde die Änderung nicht gespeichert!
			</div>
		</div>
		{#if loading}
			<div class="flex justify-center">
				<img src={loadingSpinner} class="h-32" alt="loading" />
			</div>
		{:else if error}
			<p>Es ist ein Fehler aufgetreten.</p>
		{:else}
			<div class=" rounded-md bg-gray-200 p-4">
				<div>
					Anmeldungen gesamt:
					<bold class="font-bold">{currentList.length}</bold>
				</div>
				<div>
					Anzahl Fahrradfahrer:
					<bold class="font-bold">{countTakesBike()}</bold>
				</div>
				<div>
					Anzahl Bahnfahrer:
					<bold class="font-bold">{countTakesTrain()}</bold>
				</div>
				<div>
					Anzahl Bahnfahrer mit D-Ticket:
					<bold class="font-bold">{countHasDTicket()}</bold>
				</div>
				<div>
					Anzahl Bahnfahrer mit KVV-Bescheinigung:
					<bold class="font-bold">{countHasKVV()}</bold>
				</div>
				<div>
					Bahnfahrer mit KVV-Semesterticket:
					<bold class="font-bold">{countHasKVVSemester()}</bold>
				</div>
			</div>
			<div class="flex gap-2 max-md:flex-col md:gap-4">
				<a class="bg-primary rounded-md px-4 py-2" href={mailingList()}
					>Email an den Verteiler senden</a
				>
				<button
					class="bg-light-blue flex gap-2 rounded-md px-4 py-2"
					on:click={() => navigator.clipboard.writeText(mailingList())}
				>
					<Fa icon={faCopy} />
					Email Verteiler Kopieren
				</button>

				<button
					class="bg-lime flex gap-2 rounded-md px-4 py-2"
					on:click|preventDefault={exportToCsv}
				>
					<Fa icon={faArrowUpFromBracket} />
					Als CSV exportieren
				</button>

				<select bind:value={filter} on:change={filterRegistrations} class="rounded-md px-4 py-2">
					<option value="all">Alle</option>
					<option value="paid">Bezahlt</option>
					<option value="unpaid">Unbezahlt</option>
					<option value="bike">Fahrradfahrer</option>
					<option value="train">Bahnfahrer</option>
				</select>
			</div>

			<div class="flex flex-col overflow-auto">
				<div class="grid grid-cols-[repeat(11,1fr)] gap-x-4 whitespace-nowrap">
					<bold class="font-bold">Bezahlt</bold>
					<bold class="font-bold">Name</bold>
					<bold class="font-bold">E-Mail-Adresse</bold>
					<bold class="font-bold">Telefonnummer</bold>
					<bold class="font-bold">An/Abreise</bold>
					<bold class="font-bold">Ticket</bold>
					<bold class="font-bold">Bemerkung</bold>
					<bold class="font-bold">Bodenschläfer</bold>
					<bold class="font-bold">Kuchen</bold>
					<bold class="font-bold">Vegetarier</bold>
					<bold class="font-bold">Allergien</bold>

					{#each currentList as registration, i}
						<div class="col-span-11 h-0.5 bg-gray-300"></div>
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
						<div>{registration.email}</div>
						<div>{registration.phonenumber}</div>

						<div>
							{#if registration.takes_car}
								<div class="flex items-center gap-2">
									<Fa icon={faCar} />
									Auto
								</div>
							{/if}
							{#if registration.takes_bike}
								<div class="flex items-center gap-2">
									<Fa icon={faBicycle} />
									Fahrrad
								</div>
							{/if}
							{#if registration.takes_train}
								<div class="flex items-center gap-2">
									<Fa icon={faTrain} />
									Bus & Bahn
								</div>
							{/if}
						</div>
						<div>
							{registration.ticket || ''}
						</div>
						<div class="w-72 whitespace-pre-wrap">
							{registration.comments || ''}
						</div>

						<div>{registration.would_sleep_on_floor ? 'Ja' : ''}</div>
						<div>{registration.brings_cake ? 'Ja' : ''}</div>
						<div>{registration.is_vegetarian ? 'Ja' : ''}</div>
						<div class="w-60 whitespace-pre-wrap">{registration.allergies}</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</main>
