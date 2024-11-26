<script lang="ts">
	import saft_group from '$lib/assets/saft/saft_group_ss24.jpg';
</script>

<main class="container mx-auto grid gap-4 px-4 py-20">
	<section class="text-center">
		<h1 class="">Spenden</h1>
		<p>
			Neben Engagement und Gebet lebt unsere Arbeit auch von finanzieller Unterstützung. Wir freuen
			uns, wenn du uns unterstützt. Deine Spende ermöglicht es uns Räume zu mieten, Vorträge zu
			organisieren, diese Webseite zu betreiben und vieles mehr. Mit einer Spende unterstützt du
			auch unsere internationale Arbeit: das King's Café.
		</p>
		<p class="font-bold">
			Wir danken dir für deine Spende; sie hilft uns dabei, auch in Zukunft diese wichtige Arbeit
			fortzuführen.
		</p>
		<div class=" grid gap-8 py-12 md:grid-cols-2">
			<div class="h-full w-full bg-gray-200">
				<div class="flex h-full items-center justify-center p-4">
					<ul class="text-left">
						<li>SMD e. V.</li>
						<li>Evangelische Bank, Kassel</li>
						<li>IBAN: DE75 5206 0410 0000 8004 57</li>
						<li>Verwendungzweck: H-SMD Gruppe Karlsruhe</li>
					</ul>
				</div>
			</div>
			<div class="relative">
				<img src={saft_group} class="" alt="Gruppenfoto" />
				<h3 class="absolute bottom-3 left-1/2 -translate-x-1/2 text-white">Wir sagen: Danke!</h3>
			</div>
		</div>
	</section>

	<section class="pad">
		<h1 class="text-center max-sm:text-4xl">Freundesbrief</h1>
		<p>
			Du fühlst dich mit der SMD-Karlsruhe verbunden und bekommst noch keinen Freundesbrief? Dann
			lass dich unbedingt auf den Verteiler setzten! Denn einmal im Semester verschicken wir an
			alle, die möchten, einen Freundesbrief. Darin berichten wir über die Arbeit der SMD-Karlsruhe
			und geben einen Einblick in unsere Gruppe. Dort teilen wir Dankes- und Gebetsanliegen sowie
			die neuesten Infos. Wenn du auch einen Freundesbrief bekommen möchtest, dann schreib gerne
			unseren Leitern eine kurze E-Mail an
			<a class="text-primary" href="mailto:leiter@smd-karlsruhe.de">leiter@smd-karlsruhe.de</a>.
		</p>
	</section>
</main>
