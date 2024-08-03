<script lang="ts">
	import header from '$lib/assets/heroshots/karlsruhe_luft.jpeg';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

	import denken from '$lib/assets/about/denken.png';
	import glauben from '$lib/assets/about/glauben.png';
	import erleben from '$lib/assets/about/erleben.png';
	import leitung from '$lib/assets/about/leitungsteam.png';
	import { onMount } from 'svelte';
	import { pb } from '$lib/pocketbase';
	import type { Statement, Team } from '$lib/models';

	let showDenken = false;
	let showGlauben = false;
	let showErleben = false;
	let statements: Array<Statement> = [];
	let teams: Array<Team> = [];

	onMount(async () => {
		statements = await pb.collection('statements').getFullList({});
		teams = await pb.collection('teams').getFullList({});
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

<main class="container mx-auto flex flex-col gap-24 py-24 text-lg">
	<div>
		<div class="flex flex-col gap-8 px-4 py-20 xl:px-80">
			<h1 class="text-4xl font-bold uppercase md:text-5xl">Mitarbeiten</h1>
			<p>
				Neben den Leitern gibt es verschiedene Ämter und Teams. In der Mitarbeit können wir alle
				unsere Stärken einbringen und viel Neues dazulernen. Auch du möchstest mitarbeiten? Schreib
				eine Mail an das Leitungsteam, sie vermitteln dich dann an die zuständige Person.
			</p>

			<div class="grid gap-8 py-12 lg:grid-cols-2">
				{#each teams as team}
					<div class="bg-[#EDEDED]">
						<img
							src={src(team.image, team.id, team.collectionId, team.collectionName)}
							alt="Profilbild"
						/>
						<div class="flex flex-col gap-6 p-4">
							<h2 class="text-2xl font-bold uppercase">{team.name}</h2>
							<p>{@html team.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</main>

<style>
	.menu {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 400ms;
	}

	.open {
		grid-template-rows: 1fr;
	}
</style>
