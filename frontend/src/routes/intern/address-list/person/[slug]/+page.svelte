<script lang="ts">
	import { page } from '$app/stores';
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import defaultAvatar from '$lib/assets/user_default.png';
	import {
		faBirthdayCake,
		faChevronRight,
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
	<div class="container mx-auto flex justify-center gap-2 py-8">
		<div class="border-4 border-black bg-white p-4">
			<img
				src={src(record.avatar, record.id, record.collectionId, record.collectionName)}
				alt="avatar"
				class="border-primary mx-auto flex h-32 w-32 rounded-full object-cover"
			/>
			<h1 class="py-4 text-center text-2xl">{record.name} {record.surname}</h1>
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
{/if}
