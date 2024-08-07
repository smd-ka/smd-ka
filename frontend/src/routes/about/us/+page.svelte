<script lang="ts">
	import header from '$lib/assets/pages/about/us/about_us_header.jpg';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import regions from '$lib/assets/pages/about/us/regions.png';

	import { pb } from '$lib/pocketbase';
	import type { PageData } from './$types';
	import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';

	export let data: PageData;

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

<main class="main text-lg">
	<section class="pad">
		<p>
			Die <a class="text-primary" href="https://www.smd.org/hochschul-smd/startseite"
				>Hochschul-SMD</a
			> ist ein Netzwerk christlicher Hochschulgruppen. Wir sind eine von ca. 80 anderen SMD-Gruppen
			in ganz Deutschland. Ein wesentlicher Teil des christlichen Glaubens ist nach unserem Verständnis
			Kommunikation: Gott teilt sich uns durch die Bibel und andere Menschen mit. Deshalb tauschen wir
			uns untereinander über Glaubensfragen aus und sprechen mit unseren Kommilitonen über das, was uns
			bewegt. Denken, Glauben und Erleben gehören für uns dabei zusammen.
		</p>
	</section>

	<section>
		<div class="font-caveat pb-12 text-center text-4xl md:text-6xl">Was SMDler sagen...</div>
		<div class="grid gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each data.statements as statement}
				<div class="rounded-xl bg-gray-200">
					<img
						class="h-60 w-full rounded-t-xl object-cover"
						src={src(
							statement.picture,
							statement.id,
							statement.collectionId,
							statement.collectionName
						)}
						alt="Profilbild"
					/>
					<div class="flex flex-col gap-2 p-4 sm:gap-8">
						<b class="h-4">{statement.subject}</b>
						<h2>{statement.name}</h2>
						<p>{statement.statement}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- TODO add Leiter Block -->

	<div class="flex flex-col gap-8 px-4 py-20">
		<h1 class="text-center">Unser Netzwerk</h1>
		<div>
			<img
				class="pb-6 max-sm:w-full sm:float-right sm:w-[40] sm:max-w-sm xl:max-w-lg"
				src={regions}
				alt="Regionen"
			/>
			<p class="pt-4">
				Die SMD ist ein deutschlandweites Netzwerk christlicher Hochschulgruppen. Wir sind eine von
				ca. 80 anderen SMD-Gruppen in ganz Deutschland. Uns gibt es in fast jeder Univeristätsstadt.
				Wir lieben es auch, uns überregional zu vernetzen und auszutauschen. Dafür gibt es zwei im
				Jahr Veranstaltungen wie das SMD-Forum. Außerdem treffen wir uns auch zu Regionalkonferenzen
				(RegioKon) innerhalb unserer Region Süd-West (siehe Karte).

				<a
					class="flex items-center gap-2"
					href="https://www.smd.org/hochschul-smd/hochschulgruppen/gruppenliste"
				>
					Liste aller Hochschul-SMD Gruppen
					<Fa class="text-primary" icon={faArrowUpRightFromSquare} />
				</a>
			</p>
			<p class="pt-4">
				Neben der Hochschul-SMD gibt es auch noch die Schüler-SMD und Akademiker-SMD. Falls dich die
				SMD genauer interessiert, schau doch mal auf der
				<a class="flex items-center gap-2" href="https://www.smd.org">
					Homepage der SMD
					<Fa class="text-primary" icon={faArrowUpRightFromSquare} />
				</a>
			</p>
			<p class="pt-4">
				International sind wir auch vernetzt. Die SMD ist Teil der
				<a href="https://ifesworld.org" class="flex items-center gap-2">
					IFES
					<Fa class="text-primary" icon={faArrowUpRightFromSquare} />
				</a>
				(International Fellowship of Evangelical Students). Die IFES ist ein weltweiter Dachverband von
				christlichen Hochschulgruppen.
			</p>
		</div>
	</div>
</main>
