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

<HeroShot height={'h-[70svh]'} imgSrc={header} bgPosition={'bg-[center_50%]'}>
	<div class="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 text-center text-white">
		<span class="font-mincho whitespace-nowrap text-4xl sm:text-5xl xl:text-7xl">
			Wer wir sind
		</span>
	</div>
</HeroShot>

<main class="container mx-auto flex flex-col gap-24 py-24 text-lg">
	<div class="flex flex-col gap-6 px-4 xl:px-80">
		<h1 class="text-5xl font-bold uppercase">Über uns</h1>

		<p>
			Die <a class="text-primary" href="https://www.smd.org/hochschul-smd/startseite"
				>Hochschul-SMD</a
			> ist ein Netzwerk christlicher Hochschulgruppen. Wir sind eine von ca. 80 anderen SMD-Gruppen
			in ganz Deutschland. Ein wesentlicher Teil des christlichen Glaubens ist nach unserem Verständnis
			Kommunikation: Gott teilt sich uns durch die Bibel und andere Menschen mit. Deshalb tauschen wir
			uns untereinander über Glaubensfragen aus und sprechen mit unseren Kommilitonen über das, was uns
			bewegt. Denken, Glauben und Erleben gehören für uns dabei zusammen.
		</p>
	</div>

	<div class="flex flex-col gap-8 px-4 xl:px-40">
		<h1 class="text-4xl font-bold uppercase md:text-5xl">Warum wir bei der SMD sind.</h1>

		<div class="grid gap-4 md:grid-cols-2">
			{#each statements as statement}
				<div class="bg-[#EDEDED]">
					<img
						src={src(
							statement.picture,
							statement.id,
							statement.collectionId,
							statement.collectionName
						)}
						alt="Profilbild"
					/>
					<div class="flex flex-col gap-6 p-4">
						<h3 class="text-base font-bold">{statement.subject}</h3>
						<h2 class="text-2xl font-bold uppercase">{statement.name}</h2>
						<p>{statement.statement}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="flex flex-col gap-8 px-4 py-20 xl:px-80">
		<h1 class="break-words text-4xl font-bold uppercase md:text-5xl">
			Hochschul-SMD <br /> Ein deutschlandweites Netzwerk
		</h1>
		<div>
			Als Hochschulgruppe der SMD sind wir eine ehrenamtliche Initiative. Unterstützt werden wir von
			einer hauptamtlichen Regionalreferentin und ehrenamtlichen Gruppenbegleitern (SMDler, die ihr
			Studium schon hinter sich gebracht haben.) Wenn du wissen möchtest, wie die Hochschul-SMD
			überregional aufgebaut ist, schau dir <a
				class="text-primary"
				href="https://www.smd.org/hochschul-smd/hochschul-smd/herzlich-willkommen/"
			>
				diese Seite
			</a> an.
		</div>
	</div>

	<div class="flex flex-col gap-8 px-4 xl:px-80">
		<h1 class="text-4xl font-bold uppercase md:text-5xl">Leitungsteam</h1>

		<div class="grid gap-8 lg:grid-cols-2 lg:gap-16">
			<div class="flex flex-col items-center">
				<img src={leitung} class="rounded-full" alt="Leitungsteam" />
				<p class="pt-2">Felix R., Maike, Felix M. (von links nach rechts)</p>
			</div>
			<div>
				Unsere Leitung wird jedes Semester von der Gruppe gewählt. Momentan leiten Felix M., Felix
				R. und Maike unsere Gruppe. Felix M. ist 23 und studiert Physik, Felix R. ist 21 und
				studiert Umweltingenieurwesen (Bau) und Maike ist 24 und studiert Grundschullehramt.
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
