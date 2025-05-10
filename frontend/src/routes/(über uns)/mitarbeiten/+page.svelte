<script lang="ts">
	import { pb } from '$lib/pocketbase';

	import type { PageData } from './$types';

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

<main class="container mx-auto flex flex-col gap-24 py-24 text-lg">
	<div>
		<div class="flex flex-col gap-8 px-4 py-20 xl:px-80">
			<h1 class="text-4xl font-bold uppercase md:text-5xl">Mitarbeiten</h1>
			<p>
				Unsere geschätzten Leiter schmeißen den Laden natürlich nicht alleine (sowieso nicht, wir
				machen alles aus Gottes Kraft heraus). Es gibt viele verschiedene Ämter und Teams. In der
				Mitarbeit können wir unsere bereits bekannten Stärken einbringen und weiterentwickeln und
				uns auch in Neuem ausprobieren. Auch du möchtest mitarbeiten? Dann sprich einen der Leiter
				an oder schreib ihnen eine Mail. Wir freuen uns immer über Verstärkung!
			</p>

			<div class="grid gap-8 py-12 lg:grid-cols-2">
				{#each data.teams as team}
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
