<script lang="ts">
	import header from '$lib/assets/pages/about/us/about_us_header.jpg';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import regions from '$lib/assets/pages/about/us/regions.png';
	import leitungsteam from '$lib/assets/pages/about/us/leitungsteam.jpg';
	import mitarbeiten from '$lib/assets/pages/about/us/mitarbeit_hands.jpg';

	import { pb } from '$lib/pocketbase';
	import type { PageData } from './$types';
	import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import Saos from 'saos';
	import Page from '../../+page.svelte';

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

<HeroShot height={'h-[70svh]'} imgSrc={header} bgPosition={'bg-[center_50%]'} />
<main class="main text-lg">
	<section class="pad">
		<h1>SMD - Wer ist das denn?</h1>
		<p>
			Wir als SMD Karlsruhe sind eine von ca. 80 über ganz Deutschland verteilte Gruppen, die alle
			zusammen die <a class="text-primary" href="https://www.smd.org/hochschul-smd/startseite"
				>Hochschul-SMD</a
			>
			(<b>S</b>tudenten<b>M</b>ission in <b>D</b>eutschland) bilden. Studenten aller Hochschulen und
			gelegentlich auch Azubis sorgen dafür, dass dieser bunte Haufen auch wirklich bunt ist. Die
			eine große Gemeinsamkeit, nach der wir streben, ist eine echte Beziehung zu Jesus Christus. Um
			in dieser Beziehung zu wachsen, tauschen wir uns untereinander über Glaubensfragen aus und
			sprechen mit unseren Kommilitonen über das, was uns bewegt. Denken, Glauben und Erleben
			gehören für uns dabei zusammen.
		</p>
	</section>
	<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
		<section>
			<div class="pb-12 text-center font-caveat text-4xl md:text-6xl">Was SMDler sagen...</div>
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
	</Saos>

	<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
		<section class="">
			<h1 class="text-center">Unser Leitungsteam</h1>
			<p class="text-center">
				Unser Leitungsteam repräsentiert die Hochschul-SMD Karlsruhe und ist sowohl intern als auch
				extern Ansprechpartner für alle Belange der Gruppe. Bei Fragen jeder Art sind unsere Leiter
				sind unter
				<a href="mailto:leiter@smd-karlsruhe.de">leiter@smd-karlsruhe.de</a> zu erreichen.
			</p>
			<div class="flex flex-col gap-4 py-12 md:gap-16 xl:flex-row xl:justify-center">
				<div class="flex justify-center">
					<img class="max-w-xl object-cover max-md:px-4" alt="Leitungsteam" src={leitungsteam} />
				</div>
				<div class="flex flex-col justify-center gap-8">
					<p class="text-center italic">
						Unser Wunsch ist es, dass wir als Gruppe die Gute Nachricht von Jesus Christus auf dem
						Campus und in der Stadt verbreiten und Studierenden dabei begleiten, eine lebendige
						Beziehung zu Jesus aufzubauen. In unserer Gruppe soll die Liebe Gottes spürbar sein, die
						Menschen verbindet und ihnen Hoffnung schenkt.
						<br />
						Als Leitungsteam wünschen wir uns sehr, dass sich jeder bei uns wohlfühlt. Wir haben stets
						ein offenes Ohr und freuen uns über Anregungen, Kritik und natürlich auch Lob. Wir sind dankbar
						für die Gemeinschaft, die wir in der SMD erleben dürfen, und freuen uns auf alles, was noch
						kommt. - Euer Leitungsteam
					</p>
					<p class="xl:pt-12">
						<b>Claus</b>, 23, geht gerne klettern und Radfahren und studiert im zweiten
						Master-Semester Informatik am KIT.
						<br />
						<b>Leah</b>, 26, liebt es zu backen und studiert im Master Grundschullehramt (English
						und Mathe) an der PH.
						<br />
						<b>Scharpfi</b> (Samuel Scharpf), 22, bereist gerne die Welt und studiert im Bachelor
						Wirtschafts-Ing am KIT.
						<br />
					</p>
				</div>
			</div>
		</section>
	</Saos>
	<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
		<section class="pad">
			<h1 class="text-center">Mitarbeiten</h1>
			<div class="grid gap-4 md:grid-cols-[1fr_fit-content(6rem)]">
				<p>
					Du hast Lust, dich mit einzubringen? Wir freuen uns immer über neue Gesichter! Wir sind
					uns sicher, dass du deinen Platz in einem unserer Teams finden wirst. Gerne kommen wir mit
					dir ins Gespräch und finden heraus, wo du dich am wohlsten fühlst.
					<br />

					Sprich gerne jemanden aus dem Leitungsteam an oder schreib uns eine Mail an
					<a href="mailto:leiter@smd-karlsruhe.de">leiter@smd-karlsruhe.de</a>.
				</p>
				<img
					class="object-cover max-md:max-h-80 max-md:w-full md:max-w-80 lg:max-w-[30rem]"
					alt="Symbolbild Mitarbeiten"
					src={mitarbeiten}
				/>
			</div>
		</section>
	</Saos>

	<Saos animation="slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both">
		<section class="flex flex-col gap-8 px-4 py-20">
			<h1 class="text-center">Unser Netzwerk</h1>
			<div>
				<img
					class="pb-6 max-sm:w-full sm:float-right sm:w-[40] sm:max-w-sm xl:max-w-lg"
					src={regions}
					alt="Regionen"
				/>
				<p class="pt-4">
					Die Hochschul-SMD ist ein deutschlandweites Netzwerk von ca. 80 christlichen
					Hochschulgruppen; man findet sie also in fast jeder Universitätsstadt. Hier in Karlsruhe
					sind wir eine am KIT (Karlsruher Institut für Technologie) und an der PH (Pädagogische
					Hochschule) eingetragene Hochschulgruppe. Wir bleiben aber nicht nur unter uns, sondern
					vernetzen uns überregional und wollen im Austausch miteinander voneinander lernen und uns
					weiterentwickeln. Dafür gibt es primär zwei jährliche Veranstaltungen: das SMD-Forum, bei
					dem sich ganz Deutschland trifft, und die RegioKon (RegionalKonferenz), bei der wir uns
					mit anderen SMD-Gruppen aus unserer Region Süd-West treffen (siehe Karte).

					<a
						class="flex items-center gap-2"
						href="https://www.smd.org/hochschul-smd/hochschulgruppen/gruppenliste"
					>
						Liste aller Hochschul-SMD Gruppen
						<Fa class="text-primary" icon={faArrowUpRightFromSquare} />
					</a>
				</p>
				<p class="pt-4">
					Neben der Hochschul-SMD gibt es auch noch die Schüler-SMD und Akademiker-SMD. Falls dich
					die SMD genauer interessiert, schau doch mal auf der
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
					(International Fellowship of Evangelical Students). Die IFES ist ein weltweiter Dachverband
					von christlichen Hochschulgruppen.
				</p>
			</div>
		</section>
	</Saos>
</main>
