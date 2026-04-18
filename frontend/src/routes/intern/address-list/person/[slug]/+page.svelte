<script lang="ts">
	import { page } from '$app/stores';
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import defaultAvatar from '$lib/assets/user_default.png';
	import {
		faBirthdayCake,
		faChevronRight,
		faChurch,
		faEnvelope,
		faGraduationCap,
		faHouse,
		faPhone,
		faSignature,
		faUserGroup
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';

	let record: any;

	onMount(async () => {
		page.subscribe((value) => {
			if (!value) return;
			pb.collection('users')
				.getOne(value.params.slug)
				.then((res) => (record = res));
		});
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
				avatar,
				{ thumb: '200x200' }
			);
		return defaultAvatar;
	};
</script>

{#if record}
	<nav class="container mx-auto px-4 py-4">
		<ol class="inline-flex list-none">
			<li class="flex items-center">
				<a class="!no-underline" href="/intern">Intern</a>
				<Fa icon={faChevronRight} class="mx-2" />
			</li>
			<li class="flex items-center">
				<a class="!no-underline" href="/intern/address-list">Address List</a>
				<Fa icon={faChevronRight} class="mx-2" />
			</li>
			<li class="flex items-center">
				<a class="!no-underline" href={`/intern/address-list/person/${record.id}`}
					>{record.name} {record.surname}</a
				>
			</li>
		</ol>
	</nav>

	<div class="container mx-auto flex justify-center gap-2 py-8">
		<div class="person-card">
			<img
				src={src(record.avatar, record.id, record.collectionId, record.collectionName)}
				alt="avatar"
			/>
			<h2>{record.name} {record.surname}</h2>

			<div class="details">
				<h3>Kontakt Details</h3>
				<div>
					<Fa icon={faEnvelope} />
					<a href={`mailto:${record.email}`}>
						{record.email}
					</a>
				</div>
				{#if record.phonenumber}
					<div>
						<Fa icon={faPhone} />
						<a href={`tel:${record.phonenumber}`}>
							{record.phonenumber}
						</a>
					</div>
				{/if}
				{#if record.birthday}
					<div>
						<Fa icon={faBirthdayCake} />
						{new Date(record.birthday).toLocaleDateString()}
					</div>
				{/if}
				{#if record.address}
					<div>
						<Fa icon={faHouse} />
						{record.address}
					</div>
				{/if}
				{#if record.field_of_study}
					<div>
						<Fa icon={faGraduationCap} />
						{record.field_of_study}
						{#if record.start_of_studies}
							seit
							{new Date(record.start_of_studies).toLocaleDateString()}
						{/if}
					</div>
				{/if}
				{#if record.church}
					<div>
						<Fa icon={faChurch} />
						{record.church}
					</div>
				{/if}
				{#if record.team}
					<div>
						<Fa icon={faUserGroup} />
						SMD-Bereich: {record.team}
					</div>
				{/if}
				{#if record.rili}
					<div>
						<Fa icon={faSignature} />
						Rili
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.person-card {
		@apply p-4 max-sm:w-full;
	}
	.person-card > img {
		@apply border-primary mx-auto flex h-32 w-32 rounded-full object-cover;
	}
	.person-card > h2 {
		@apply py-4 text-center uppercase;
	}
	.person-card > .details {
		@apply rounded-md bg-slate-100 p-4;
	}
	.person-card > .details > div {
		@apply flex gap-2 md:items-center;
	}
</style>
