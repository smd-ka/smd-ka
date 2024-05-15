<script lang="ts">
	import type { Activity } from '$lib/models';
	import header from '$lib/assets/heroshots/karlsruhe_luft.jpeg';
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import HeroShot from '$lib/components/HeroShot.svelte';

	let activities: Array<Activity> = [];

	onMount(async () => {
		activities = await pb.collection('activities').getFullList({});
	});

	const src = (image: string, id: string, collectionId: string, collectionName: string) => {
		return pb.files.getUrl(
			{
				collectionId: collectionId,
				collectionName: collectionName,
				id: id
			},
			image
		);
	};
</script>

<HeroShot imgSrc={header} />

<div class="flex flex-col gap-8 px-4 py-20 xl:px-80">
	<h1 class="text-4xl font-bold uppercase md:text-5xl">Wöchentliche Aktionen</h1>

	<div class="grid gap-8 xl:grid-cols-2">
		{#each activities as activity}
			<div class="">
				<div
					class="relative h-52 bg-cover bg-center"
					style="background-image: url({src(
						activity.image,
						activity.id,
						activity.collectionId,
						activity.collectionName
					)})"
				>
					<div
						class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white backdrop-blur-sm"
					>
						<h2 class="text-3xl font-bold uppercase 2xl:whitespace-nowrap 2xl:text-4xl">
							{activity.title}
						</h2>
						<h3 class="text-lg font-bold">{activity.subtitle}</h3>
					</div>
				</div>
				<div class="flex flex-col gap-6 py-2">
					<p>{activity.description}</p>
				</div>
			</div>
		{/each}
		<div></div>
	</div>
</div>
