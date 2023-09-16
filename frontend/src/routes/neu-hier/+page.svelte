<script lang="ts">
	import header from '$lib/assets/header-newcomers.png';
</script>

<div class="relative">
	<span
		class="bg-light-blue absolute right-0 top-64 z-10 bg-opacity-90 px-4 py-4 text-center text-2xl text-white md:top-48 lg:py-8 lg:text-4xl"
		>Denken. Glauben. Erleben.</span
	>
	<h1
		class="absolute left-1/2 top-32 z-10 -translate-x-1/2 whitespace-nowrap text-6xl text-white md:text-8xl"
	>
		Neu Hier?
	</h1>
	<div
		class=" h-96 bg-cover bg-[center_top_34%] opacity-90 brightness-105"
		style="background-image: url({header});"
	/>
</div>

<main class="container mx-auto flex flex-col gap-8">
	<div class="card mt-10 text-center">
		<h1 class="text-primary text-2xl lg:text-4xl">Angebote für neue Studenten</h1>
		<p class="mt-2">
			Um unsere Gruppe kennenzulernen und gut in Karlsruhe zu starten, haben wir mehrere Angebote
			für dich!
		</p>
		<div class="mt-10 grid gap-8 md:grid-cols-2">
			<div class="rounded-lg bg-gray-200 p-4">
				<h2 class="text-2xl font-bold">Ersti Aktionen</h2>
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

			<div class="rounded-lg bg-gray-200 p-4">
				<h2 class="text-2xl font-bold">Mentoring</h2>
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

			<div class="rounded-lg bg-gray-200 p-4">
				<h2 class="text-2xl font-bold">Church Hopping</h2>
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

			<div class="rounded-lg bg-gray-200 p-4">
				<h2 class="text-2xl font-bold">KA-Heim</h2>
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
