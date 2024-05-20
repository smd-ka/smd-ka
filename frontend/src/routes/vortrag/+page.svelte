<script>
	import header from '$lib/assets/ss24/backround_schimmel.jpg';
	import smd_ka_logo from '$lib/assets/logos/smd-ka_modified.svg';
	import sfc_logo from '$lib/assets/logos/sfc.png';

	let futureEvents = [
		{
			date: '06.06',
			title: 'Grill a Christian — Vortrag zum Wunschthema + Q&A',
			speaker: 'Prof. Dr. Matthias Clausen vom Institut für Glaube und Wissenschaft'
		},
		{
			date: '11.06',
			title:
				'Zwischen Gletscherzerstörung und Konfliktherden — Hoffnung finden auf einer gefährdeten Erde',
			speaker: 'Prof. Dr. Peter Imming'
		},
		{
			date: '20.06',
			title: 'Eine unerwartete Begegnung — Wie Gott DEIN Leben verändern kann',
			speaker: 'SfC Abend'
		}
	];
</script>

<div class="bg-cover bg-center" style="background-image: url({header}); ">
	<main class="container mx-auto">
		<div class="px-4 text-center text-white xl:px-80">
			<div class="text-whit grid gap-6 py-4">
				<h3 class="font-bebas e text-3xl uppercase tracking-[1rem]">Presented by</h3>
				<h2 class="font-zcool neonText text-4xl">Physiker Prof. Dr. Thomas Schimmel</h2>
				<h3 class="text-3xl tracking-wider">Universität Karlsruhe - KIT</h3>
			</div>

			<h1 class="font-mokoto neonText py-20 text-5xl uppercase lg:py-36 lg:text-7xl">
				Der Urknall und die Gottesfrage
			</h1>

			<div class="py-10">
				<h3 class="relative neonTextWhite mx-auto max-w-2xl text-3xl uppercase rounded-2xl bg-black bg-opacity-40 backdrop-filter">
					<span class="neonTextWhite text-4xl"> Mittwoch 29. Mai 18:30 </span> <br />
					GERTHSEN-HÖRSAAL KIT CAMPUS SÜD <br />
					EINTRITT FREI
				</h3>
			</div>

			<div class=" py-20">
				<div class="relative my-20 grid gap-6 p-4 text-lg rounded-2xl bg-black bg-opacity-40 backdrop-filter">
					<h3 class="text-3xl uppercase text-white mb-4 ">
						Ein Streifzug vom Inneren der Atome bis an die Grenzen des Universums
					</h3>
					<p>
						Der allgemein verständliche Vortrag gibt faszinierende Einblicke in die Natur – Von
						kleinsten Welten im inneren der Atome bis hin zu den weiten des Universums und der
						spannenden Frage nach seinem Ursprung. Beeindruckende Bilder und faszinierende Zahlen
						lassen uns staunen, und es stellt sich die Frage nach dem „woher“.
					</p>
					<p>
						Der Physiker Thomas Schimmel forscht und lehrt als Universitätsprofessor an der
						Universität Karlsruhe, Karlsruher Institut für Technologie (KIT). Er ist Direktor des
						Zentrums für Einzelatom-Technologien und Mitbegründer des Instituts für Nanotechnologie.
						Für seine forschungsergebnisse wurde er wiederholt mit renommierten Preisen
						ausgezeichnet.
					</p>
				</div>
			</div>
			<div class="py-20">
				<div class="relative my-20 grid gap-6 p-4 text-lg rounded-2xl bg-black bg-opacity-40 backdrop-filter">
					<div class="py-2">
						<h3 class="text-4xl uppercase">Weitere Veranstaltungen</h3>
						<span class="text-xl font-bold tracking-widest"
							>+++ immer 19:30 im Redtenbacher Hörsaal +++
						</span>
					</div>

					<div class="grid grid-cols-[5rem_1fr] gap-4 text-2xl">
						{#each futureEvents as event}
							<div class="font-bold">{event.date}</div>
							<div class="grid text-left">
								<span class="neonText">{event.title}</span>
								<span class="text-lg">{@html event.speaker}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div class="grid gap-6 pb-20">
				<h3 class="font-bebas e text-3xl uppercase tracking-[1rem]">Hosted by</h3>
				<div class="grid items-center justify-items-center gap-6">
					<a href="https://www.sfc-karlsruhe.de" target="_blank" rel="noopener">
						<img src={sfc_logo} alt="SfC Karlsruhe" />
					</a>
					<h3 class="font-bebas e text-3xl uppercase tracking-[1rem]">and</h3>
					<a href="/about">
						<img src={smd_ka_logo} alt="Hochschul-SMD Karlsruhe" />
					</a>
				</div>
			</div>
		</div>
	</main>
</div>

<style>
	.neonText {
		color: #fff;
		text-shadow:
			0 0 7px #ff5c00,
			0 0 10px #ff5c00,
			0 0 21px #ff5c00;
	}

	.neonTextWhite {
		color: #fff;
		text-shadow: 0 0 7px #fff;
	}
</style>
