<script lang="ts">
	import { RegiokonGroup, type RegiokonRegistration } from '$lib/models';
	import { pb } from '$lib/pocketbase';
	import {
		faArrowUpFromBracket,
		faCopy,
		faExclamationTriangle,
		faMars,
		faVenus,
		faVenusMars
	} from '@fortawesome/free-solid-svg-icons';
	import type { Record } from 'pocketbase';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';

	let loading = true;
	let error = false;
	let currentList: RegiokonRegistration[] = [];
	let result: RegiokonRegistration[] = [];

	let paidLoading: number[] = [];
	let paidError: number[] = [];
	const groups = Object.keys(RegiokonGroup).filter((key) => isNaN(Number(key)));
	let filter: 'all' | 'paid' | 'unpaid' | 'needs_lodging' | RegiokonGroup = 'all';
	let groupStatsHeights: { name: string; height: number }[] = [];

	onMount(async () => {
		try {
			result = await pb.collection('regiokon_registrations').getFullList({
				sort: 'name'
			});
		} catch (e: any) {
			console.error(e);
			error = true;
		}
		loading = false;
		filterRegistrations();

		groupStatsHeights = groups.map((group) => ({
			name: group,
			height: calcHeight(group)
		}));
		groupStatsHeights.sort((a, b) => b.height - a.height);
	});

	function calcHeight(group: string) {
		const count = result.filter((x) => x.group.toString() === group).length;
		return (count / result.length) * 150;
	}

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
			case 'needs_lodging':
				currentList = result.filter((x) => x.needs_lodging);
				break;
			default:
				currentList = result.filter((x) => x.group === filter);
				break;
		}
	}

	const countLodgingNeeded = (gender: 'female' | 'male') =>
		currentList.filter((x) => x.gender === gender && x.needs_lodging).length;
	const countVegetarians = () => currentList.filter((x) => x.vegetarian).length;
	const countGroup = (group: RegiokonGroup) => currentList.filter((x) => x.group === group).length;

	const countLodgingOffered = (gender: 'female' | 'male' | 'both') => {
		let count = 0;
		switch (gender) {
			case 'female':
				currentList.forEach((x) => (count += x.lodging_female));
				break;
			case 'male':
				currentList.forEach((x) => (count += x.lodging_male));
				break;
			case 'both':
				currentList.forEach((x) => (count += x.lodging_both));
				break;
		}
		return count;
	};

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
			const result = await pb.collection('regiokon').update(registrationId, { paid: paid });
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
				'Gruppe',
				'Braucht einen Schlafplatz',
				'Hat folgende Schlafplätze',
				'Bemerkung',
				'Vegetarier',
				'Allergien',
				'Geschlecht'
			],
			...result.map((x) => [
				x.paid ? 'Ja' : 'Nein',
				x.name,
				x.email,
				x.phonenumber,
				x.group,
				x.needs_lodging ? 'Ja' : '',
				`"M: ${x.lodging_male}, F: ${x.lodging_female}, B: ${x.lodging_both}"`,
				'"' + x.comments + '"',
				x.vegetarian ? 'Ja' : '',
				x.allergies,
				x.gender === 'female' ? 'Weiblich' : 'Männlich'
			])
		];

		let csvContent = 'data:text/csv;charset=utf-8,' + rows.map((x) => x.join(',')).join('\n');

		const encodedUri = encodeURI(csvContent);
		const link = document.createElement('a');
		link.setAttribute('href', encodedUri);
		link.setAttribute('download', `Regiokon_Anmeldungen_${filter}.csv`);
		document.body.appendChild(link); // Required for FF

		link.click();
	}
</script>

<main class="container mx-auto">
	<div class="card mt-8 flex flex-col gap-4">
		<div>
			<h1 class="text-primary text-2xl md:text-4xl">Regiokon Anmeldungen</h1>
			<div class="flex flex-wrap">
				<bold class="pr-2 font-bold">Achtung!</bold>
				Sollte dieses Symbol <Fa class="px-2 text-red-700" icon={faExclamationTriangle} /> neben dem
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
				<div class="grid gap-8 md:grid-cols-2">
					<div>
						<div>
							Anmeldungen gesamt:
							<bold class="font-bold">{currentList.length}</bold>
						</div>

						<div>
							Anzahl Vegetarier: {countVegetarians()}
						</div>
						<div class="flex h-min">
							<div class="grid grid-cols-[1fr_2px_repeat(3,minmax(0,1fr))] gap-x-2">
								<div>Schlafplätze</div>
								<div class="bg-slate-600"></div>
								<div class="font-bold">Männer</div>
								<div class="font-bold">Frauen</div>
								<div class="font-bold">Beide</div>
								<div class="col-span-full h-0.5 bg-slate-600"></div>
								<div class="font-bold">Vorhanden</div>
								<div class="bg-slate-600"></div>
								<div>{countLodgingOffered('male')}</div>
								<div>{countLodgingOffered('female')}</div>
								<div>{countLodgingOffered('both')}</div>
								<div class="font-bold">Benötigt</div>
								<div class="bg-slate-600"></div>
								<div>{countLodgingNeeded('male')}</div>
								<div>{countLodgingNeeded('female')}</div>
							</div>
						</div>
					</div>

					<div class="flex flex-col items-center gap-2">
						<h2 class="text-lg">Gruppenzusammensetzung</h2>
						<div class="grid h-[174px] grid-cols-10 items-end justify-center gap-2">
							{#each groupStatsHeights as { name, height }}
								<div class="flex h-full flex-col">
									<div class="relative flex h-full items-end rounded bg-white">
										<div class="bg-lilac w-6 rounded" style="height: {height}px;"></div>
										<div class="absolute bottom-[50px] left-3 -translate-x-1/2 rotate-90">
											{name}
										</div>
									</div>
									<div class="flex h-6 w-6 justify-center text-gray-700">{countGroup(name)}</div>
								</div>
							{/each}
						</div>
					</div>
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
					<option value="needs_lodging">Braucht einen Schlafplatz</option>
					{#each groups as group}
						<option value={group}>{group}</option>
					{/each}
				</select>
			</div>
			<div class="flex flex-col overflow-auto">
				<div class="grid grid-cols-[repeat(11,1fr)] gap-x-4 whitespace-nowrap">
					<bold class="font-bold">Bezahlt</bold>
					<bold class="font-bold">Name</bold>
					<bold class="font-bold">E-Mail-Adresse</bold>
					<bold class="font-bold">Telefonnummer</bold>
					<bold class="font-bold">Gruppe</bold>
					<bold class="font-bold">Benötigt einen <br /> Schlafplatz</bold>
					<bold class="font-bold">Hat folgende <br />Schlafplätze</bold>
					<bold class="font-bold">Bemerkungen</bold>
					<bold class="font-bold">Vegetarier</bold>
					<bold class="font-bold">Allergien</bold>
					<bold class="font-bold">Geschlecht</bold>

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
						<a href="mailto:{registration.email}" class="hover:cursor-pointer hover:underline"
							>{registration.email}</a
						>
						<a href="tel:{registration.phonenumber}">{registration.phonenumber}</a>

						<div>
							{registration.group}
						</div>
						<div>
							{registration.needs_lodging ? 'Ja' : ''}
						</div>

						<div class="flex items-start gap-3">
							<div class="flex items-center gap-1">
								<Fa icon={faVenus} class="text-pink-500" />
								{registration.lodging_female}
							</div>
							<div class="flex items-center gap-1">
								<Fa icon={faMars} class="text-blue-800" />
								{registration.lodging_male}
							</div>
							<div class="flex items-center gap-1">
								<Fa icon={faVenusMars} />
								{registration.lodging_both}
							</div>
						</div>
						<div class="w-72 whitespace-pre-wrap">
							{registration.comments || ''}
						</div>

						<div>{registration.vegetarian ? 'Ja' : ''}</div>
						<div class="w-60 whitespace-pre-wrap">{registration.allergies}</div>
						<div>{registration.gender === 'female' ? 'Weiblich' : 'Männlich'}</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</main>
