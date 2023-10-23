<script lang="ts">
	import header from '$lib/assets/header-newcomers.png';
	import kaheim from '$lib/assets/logos/kaheim.png';

	import Fa from 'svelte-fa/src/fa.svelte';
	import { faChurch, faComments, faCalendar } from '@fortawesome/free-solid-svg-icons';
	import HeroShot from '$lib/components/HeroShot.svelte';
</script>

<HeroShot imgSrc={header} title="Neu Hier" bgSlogan="bg-light-blue" />

<main class="container mx-auto flex flex-col gap-8">
	<div class="card mt-10 text-center">
		<h1 class="text-primary text-2xl lg:text-4xl">Angebote für neue Studenten</h1>
		<p class="mt-2">
			Um unsere Gruppe kennenzulernen und gut in Karlsruhe zu starten, haben wir mehrere Angebote
			für dich!
		</p>
		<div class="mt-10 grid gap-8 md:grid-cols-2">
			<div class="flex flex-col rounded-lg bg-gray-200 p-4">
				<Fa size="3x" icon={faCalendar} />
				<h2 class="my-2 text-2xl font-bold">Ersti Aktionen</h2>
				<p>
					An den letzten Dienstagen vor dem Vorlesungsbeginn in der Regel Abends wird es spezielle
					Aktionen für euch geben. Nähere Infos sind im <a
						class="text-primary hover:text-corperate whitespace-nowrap hover:underline"
						href="/kalender"
					>
						Kalender
					</a> und auf Instagram zu finden. Auch zum Semesterstart wird es noch weitere Angebote geben.
				</p>
			</div>

			<div class="flex flex-col rounded-lg bg-gray-200 p-4">
				<Fa size="3x" icon={faComments} />
				<h2 class="my-2 text-2xl font-bold">Mentoring</h2>
				<p>
					Du suchst jemanden zum quatschen, der dir bei Fragen rund ums Studium und das Leben in
					Karlsruhe weiterhelfen kann? Dann melde dich bei uns und wir vermitteln dir einen Mentor.
					Schreibe einfach eine Mail an <a
						class="text-primary hover:text-corperate whitespace-nowrap hover:underline"
						href="mailto:inreach@smd-karlsruhe.de"
					>
						inreach@smd-karlsruhe.de
					</a>
				</p>
			</div>

			<div class="flex flex-col rounded-lg bg-gray-200 p-4">
				<Fa size="3x" icon={faChurch} />
				<h2 class="my-2 text-2xl font-bold">Church Hopping</h2>
				<p>
					Vielleicht bist du neu in Karlsruhe oder suchst einfach eine neue Gemeinde. Um dir bei der
					Suche zu helfen, lädt zum Semesterstart jeden Sonntag ein SMDler dich ein, mit ihnen in
					seine Gemeinde zu kommen, um einen ersten Einblick zu bekommen. So hast du die
					Möglichkeit, bei dem riesigen/vielfältigen Angebot an Gemeinden in Karlsruhe dir einen
					Überblick zu verschaffen. Checke den <a
						class="text-primary hover:text-corperate whitespace-nowrap hover:underline"
						href="/kalender"
					>
						Kalender
					</a>
					oder
					<a
						class="text-primary hover:text-corperate whitespace-nowrap hover:underline"
						href="https://www.instagram.com/smd_karlsruhe/"
					>
						Instagram
					</a> für weitere Infos.
				</p>
			</div>

			<div class="flex flex-col rounded-lg bg-gray-200 p-4">
				<img src={kaheim} class="h-12 self-center" alt="kaheim logo" />
				<h2 class="my-2 text-2xl font-bold">Kaheim</h2>
				<p>
					Bist du auf der Suche nach einer christlichen WG in Karlsruhe? Auf
					<a
						class="text-primary hover:text-corperate whitespace-nowrap hover:underline"
						href="https://kaheim.de"
						>kaheim.de
					</a>
					betreiben wir zusammen mit dem SfC (Studierende für Christus) und anderen christlichen Gruppen
					eine Plattform als Zimmerbörse. Wenn du ein Zimmer suchst oder in deiner WG Zimmer frei hast
					und Mitbewohner suchst, kannst die Einträge dort durchschauen und/oder selbst einen erstellen.
				</p>
			</div>
		</div>
	</div>
</main>
