<script lang="ts">
	import type { User } from '$lib/models';
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import defaultAvatar from '$lib/assets/user_default.png';
	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		faChevronRight,
		faEnvelope,
		faFileExport,
		faHouse,
		faPhone,
		faSearch
	} from '@fortawesome/free-solid-svg-icons';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';

	export let data;
	let records: User[];
	let filteredRecords: User[];
	let error = false;
	let loading = true;

	// Search and filter state
	let search = '';
	let showAlumni = false;
	let showRili = false;
	let excludeAlumni = true;

	onMount(() => {
		records = data.list;
		// Apply initial filter (hide alumni by default)
		handleSearch(search);
		loading = false;
	});

	function handleSearch(searchTerm: string) {
		if (!records) return;
		searchTerm = searchTerm.toLocaleLowerCase();

		// First filter by alumni status
		let baseRecords = showRili ? records.filter((record) => record.rili) : records;

		if (!showAlumni && excludeAlumni) {
			baseRecords = baseRecords.filter((record) => !record.alumni);
		}
		if (showAlumni && !excludeAlumni) {
			baseRecords = baseRecords.filter((record) => record.alumni);
		}

		// Then filter by search term
		filteredRecords = baseRecords.filter((record) => {
			if (searchTerm === '') return true;
			return (
				record.name.toLowerCase().includes(searchTerm) ||
				record.surname.toLowerCase().includes(searchTerm) ||
				record.email.toLowerCase().includes(searchTerm) ||
				(record.phonenumber && record.phonenumber.toLowerCase().includes(searchTerm)) ||
				(record.address && record.address.toLowerCase().includes(searchTerm)) ||
				(record.field_of_study && record.field_of_study.toLowerCase().includes(searchTerm)) ||
				(record.team && record.team.toLowerCase().includes(searchTerm))
			);
		});
	}

	$: {
		handleSearch(search);
	}

	$: showAlumni, handleSearch(search);
	$: showRili, handleSearch(search);
	$: excludeAlumni, handleSearch(search);

	// Function to generate contact vCard data
	// TODO: Move to util file
	// Maybe only export shown contacts?
	function generateVCF(records) {
		return records
			.map((record: User) => {
				const notes = [];
				if (record.field_of_study) {
					notes.push(
						`${record.field_of_study} seit ${record.start_of_studies ? new Date(record.start_of_studies).toLocaleDateString() : ''}`
					);
				}
				if (record.team) {
					notes.push(`SMD-Bereiche: ${record.team}`);
				}
				// Building vCard with essential fields
				return [
					'BEGIN:VCARD',
					'VERSION:3.0',
					`FN:${record.name} ${record.surname}`,
					`EMAIL:${record.email}`,
					record.phonenumber ? `TEL:${record.phonenumber}` : '',
					record.birthday ? `BDAY:${new Date(record.birthday).toISOString().split('T')[0]}` : '',
					record.address ? `ADR:${record.address}` : '',
					`NOTE:${notes.join(', ')}`,
					'END:VCARD'
				]
					.filter(Boolean)
					.join('\n'); // Remove empty lines
			})
			.join('\n');
	}

	function downloadVCF() {
		const vcfData = generateVCF(records);
		const blob = new Blob([vcfData], { type: 'text/vcard;charset=utf-8' }); // Ensure UTF-8 encoding
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'SMDKontakte.vcf';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	const src = (
		avatar: string | undefined,
		id: string,
		collectionId: string,
		collectionName: string
	) => {
		if (avatar && id)
			return pb.files.getUrl(
				{
					collectionId: collectionId,
					collectionName: collectionName,
					id: id
				},
				avatar,
				{ thumb: '100x100' }
			);
		return defaultAvatar;
	};
</script>

<nav class="container mx-auto px-4 py-4">
	<ol class="inline-flex list-none">
		<li class="flex items-center">
			<a class="!no-underline" href="/intern">Intern</a>
			<Fa icon={faChevronRight} class="mx-2" />
		</li>
		<li class="flex items-center">
			<a class="!no-underline" href="/intern/address-list">Address List</a>
		</li>
	</ol>
</nav>

<main class="container mx-auto flex flex-col gap-2 pb-12">
	<div class="p-8">
		<h1 class=" text-3xl md:text-4xl">SMD Adressliste</h1>
		<p>
			Hier findest du alle SMDler*innen, die sich in der Adressliste eingetragen haben (also hier im
			internen Bereich registriert sind). Die Adressliste ist nur für den internen Gebrauch gedacht.
			Bitte gehe verantwortungsvoll mit den Daten um.
		</p>
		<button
			class="mt-4 flex items-center gap-2 bg-black px-4 py-2 text-white"
			on:click={downloadVCF}
		>
			Alle Kontakte herunterladen
			<Fa class="text-xl" icon={faFileExport} />
		</button>
	</div>
	<div class="relative flex gap-2 px-4 pb-4">
		<Fa class="absolute left-8 top-5 text-2xl" icon={faSearch} />
		<input
			bind:value={search}
			class="backdrop: w-full rounded-full border-2 border-black p-4 pl-14"
			placeholder="Suche"
			type="text"
		/>
	</div>
	<div class="px-4">
		<div class="mb-4 flex flex-wrap gap-2">
			<button
				class="rounded-full border-2 px-4 py-2 transition-colors duration-150
					{search === '' && !showAlumni && !showRili && !excludeAlumni
					? 'border-sky-500 bg-sky-500 text-white '
					: 'border-sky-500 bg-white text-sky-500 hover:bg-sky-100'}"
				on:click={() => {
					search = '';
					showAlumni = false;
					showRili = false;
					excludeAlumni = false;
				}}
			>
				Alle
			</button>
			<button
				class="rounded-full border-2 px-4 py-2 transition-colors duration-150
					{excludeAlumni
					? 'border-	-500 bg-orange-500 text-white'
					: 'bg-orange border-orange-500 text-orange-500 hover:bg-slate-100'}"
				on:click={() => {
					excludeAlumni = !excludeAlumni;
				}}
			>
				SMDler und SMDlerinnen
			</button>
			<button
				class="rounded-full border-2 px-4 py-2 transition-colors duration-150
					{showAlumni
					? 'border-slate-500 bg-slate-500 text-white'
					: 'border-slate-500 bg-white text-slate-500 hover:bg-slate-100'}"
				on:click={() => {
					showAlumni = !showAlumni;
				}}
			>
				Alumni
			</button>
			<button
				class="rounded-full border-2 px-4 py-2 transition-colors duration-150
					{showRili
					? 'border-emerald-500 bg-emerald-500 text-white'
					: 'border-emerald-500 bg-white text-emerald-500 hover:bg-purple-100'}"
				on:click={() => {
					showRili = !showRili;
				}}
			>
				RiLi
			</button>
		</div>
	</div>

	{#if loading}
		<img class="flex h-32 w-32 self-center" src={loadingSpinner} alt="loading" />
	{/if}

	{#if !loading && !error}
		{#each filteredRecords as record}
			<a class="!no-underline" href={`/intern/address-list/person/${record.id}`}>
				<div
					class=" grid grid-cols-[3rem_1fr_1rem] items-center gap-4 rounded-md bg-slate-100 px-4 py-2 md:grid-cols-[3rem_2fr_3fr_1rem] md:text-lg"
				>
					<img
						src={src(record.avatar, record.id, record.collectionId, record.collectionName)}
						alt="avatar"
						class="border-primary h-12 w-12 items-center rounded-full object-cover"
					/>
					<div>
						<span class="text-xl">
							{record.name}
							{record.surname}
						</span>

						{#if record.phonenumber}
							<div class="flex items-center gap-2">
								<Fa icon={faPhone} />
								<a href={`tel:${record.phonenumber}`}>
									{record.phonenumber}
								</a>
							</div>
						{/if}
					</div>
					<div class="max-md:hidden">
						<div class="flex items-center gap-2 self-start">
							<Fa icon={faEnvelope} />
							<a href={`mailto:${record.email}`}>
								{record.email}
							</a>
						</div>
						{#if record.address}
							<div class="flex gap-2">
								<Fa class="max-md:mt-0.5" icon={faHouse} />
								{record.address}
							</div>
						{/if}
					</div>

					<Fa icon={faChevronRight} />

					<!-- <div class="max-xl:hidden">
						{#if record.field_of_study}
							<div class="flex gap-2 md:items-center">
								<Fa class="max-md:mt-0.5" icon={faGraduationCap} />
								{record.field_of_study}
								{#if record.start_of_studies}
									seit
									{new Date(record.start_of_studies).toLocaleDateString()}
								{/if}
							</div>
						{/if}
						{#if record.birthday}
							<div class="flex items-center gap-2">
								<Fa icon={faBirthdayCake} />
								{new Date(record.birthday).toLocaleDateString()}
							</div>
						{/if}
					</div>

					<div class="max-xl:hidden">
						{#if record.team}
							<div class="flex gap-2 md:items-center">
								<Fa class="max-md:mt-0.5" icon={faUserGroup} />
								SMD-Bereich: {record.team}
							</div>
						{/if}
						{#if record.rili}
							<div class="flex gap-2 md:items-center">
								<Fa class="max-md:mt-0.5" icon={faSignature} />
								Rili
							</div>
						{/if}
					</div> -->
				</div>
			</a>
		{/each}
	{/if}
</main>
