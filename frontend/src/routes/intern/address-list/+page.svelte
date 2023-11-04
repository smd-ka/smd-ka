<script lang="ts">
	import type { User } from '$lib/models';
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import defaultAvatar from '$lib/assets/user_default.png';
	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		faBirthdayCake,
		faEnvelope,
		faGraduationCap,
		faHouse,
		faPhone,
		faSignature,
		faUser,
		faUserGroup
	} from '@fortawesome/free-solid-svg-icons';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';

	let records: User[];
	let error = false;
	let loading = true;

	onMount(async () => {
		try {
			records = await pb.collection('users').getFullList({
				sort: 'name'
			});
			loading = false;
		} catch (e) {
			console.log(e);
			error = true;
			loading = false;
		}
	});

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
				avatar
			);
		return defaultAvatar;
	};
</script>

<main class="container mx-auto flex flex-col gap-2">
	<div class="card mt-8">
		<h1 class="text-primary text-2xl md:text-4xl">SMD Adressliste</h1>
		<p>
			Na, beim letzten Gruppentreff jemanden getroffen, aber Namen vergessen oder nicht nach der
			Telefonnummer gefragt? Kein Problem! Hier findest du alle SMDler*innen, die sich in der
			Adressliste eingetragen haben (also hier im internen Bereich registriert sind). Die
			Adressliste ist nur für den internen Gebrauch gedacht. Bitte gehe verantwortungsvoll mit den
			Daten um.
		</p>
	</div>

	{#if loading}
		<div class="card">
			<div class="flex justify-center">
				<img class="h-32 w-32" src={loadingSpinner} alt="loading" />
			</div>
		</div>
	{/if}

	{#if !loading && !error}
		{#each records as record}
			<div class="card md:text-lg">
				<div class="grid grid-cols-[4rem_1fr] gap-4 md:grid-cols-[6rem_1fr_1fr]">
					<img
						src={src(record.avatar, record.id, record.collectionId, record.collectionName)}
						alt="avatar"
						class="border-primary h-16 w-16 rounded-full object-cover md:h-24 md:w-24"
					/>
					<div class="flex flex-col justify-center">
						<div class="flex items-center gap-2">
							<Fa icon={faUser} />
							<span>
								{record.name}
								{record.surname}
							</span>
						</div>
						<div class="flex items-center gap-2">
							<Fa icon={faEnvelope} />
							<a href={`mailto:${record.email}`}>
								{record.email}
							</a>
						</div>
						{#if record.phonenumber}
							<div class="flex items-center gap-2">
								<Fa icon={faPhone} />
								<a href={`tel:${record.phonenumber}`}>
									{record.phonenumber}
								</a>
							</div>
						{/if}
						{#if record.birthday}
							<div class="flex items-center gap-2">
								<Fa icon={faBirthdayCake} />
								{new Date(record.birthday).toLocaleDateString()}
							</div>
						{/if}
					</div>
					<div>
						{#if record.address}
							<div class="flex gap-2 md:items-center">
								<Fa class="max-md:mt-0.5" icon={faHouse} />
								{record.address}
							</div>
						{/if}
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
					</div>
				</div>
			</div>
		{/each}
	{/if}
</main>
