<script lang="ts">
	import kaheim from '$lib/assets/logos/kaheim.png';
	import exampleImage from '$lib/assets/ss24/herzenssache_16_9.png';

	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		faChurch,
		faComments,
		faCalendar,
		faDroplet,
		faLocationDot,
		faCalendarDays
	} from '@fortawesome/free-solid-svg-icons';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import header from '$lib/assets/heroshots/karlsruhe_luft.jpeg';

	let date = new Date();

	const weekdays = [
		'Sonntag',
		'Montag',
		'Dienstag',
		'Mittwoch',
		'Donnerstag',
		'Freitag',
		'Samstag'
	];
	const getDateTimeString = (date: Date) => {
		return `${weekdays[date.getDay()]}, ${date.toLocaleDateString(
			'de-DE'
		)} ${date.toLocaleTimeString('de-DE', {
			hour: '2-digit',
			minute: '2-digit'
		})}`;
	};
</script>

<HeroShot imgSrc={header} />

<main class="main">
	<section class="pad">
		<h1>Neu hier?</h1>
		<p>
			Du bist neu in Karlsruhe oder planst hierher zu ziehen für dein Studium? Du bist auf der Suche
			nach christlicher Gemeinschaft? Dann bist du hier genau richtig! Wir sind eine
			überkonfessionelle Hochschulgruppe, die es auf dem Herzen hat unseren Glauben authentisch im
			Studienalltag zu leben.
		</p>
		<p>
			Wir haben ein vielfältiges Angebot an Veranstaltungen und Aktionen, bei denen du uns und
			andere Erstsemester kennen lernen kannst. Wir freuen uns auf dich!
		</p>
	</section>

	<section>
		<div class="pad">
			<h1>Angebote für neue Studenten</h1>

			<p>
				Noch vor Vorlesungsbeginn für PH und KIT haben wir einige richtig coole Aktionen für dich
				vorbereitet.<br />
				Im Semester bist du herzlich zu unseren SMD Abenden und Hauskreisen eingeladen. Die Hauskreisanmeldung
				findet immer zu Beginn des Semester statt. Wenn du Fragen hast, schreib uns gerne eine Mail an
				den
				<a href="mailto:inreach@smd-karlsruhe.de">Inreach</a>. <br />
				Schau doch mal bei uns vorbei!
			</p>

			<h2 class="pb-6 pt-12">Ersti Aktionen Wintersemester 2024/25</h2>
		</div>

		<div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
			<div>
				<div class="relative text-white">
					<img src={exampleImage} class="brightness-50" alt="TODO" />
					<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
						<h3 class="">Bibellesen im Schlossgarten</h3>
					</div>
				</div>
				<div class="pt-8">
					<span class="flex items-center gap-2 text-xl font-bold"
						><Fa icon={faCalendarDays} />{getDateTimeString(date)}
					</span>
					<span class="flex items-center gap-2 text-xl font-bold"
						><Fa icon={faLocationDot} /><a href="https://maps.google.com">
							Eine Ort mit Mapslink
						</a>
					</span>
				</div>
				<p class="py-4">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
			</div>

			<div>
				<div class="relative text-white">
					<img src={exampleImage} class="brightness-50" alt="TODO" />
					<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
						<h3 class="">Bibellesen im Schlossgarten</h3>
					</div>
				</div>
				<div class="pt-8">
					<span class="flex items-center gap-2 text-xl font-bold"
						><Fa icon={faCalendarDays} />{getDateTimeString(date)}
					</span>
					<span class="flex items-center gap-2 text-xl font-bold"
						><Fa icon={faLocationDot} /><a href="https://maps.google.com">
							Eine Ort mit Mapslink
						</a>
					</span>
				</div>
				<p class="py-4">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
			</div>

			<div>
				<div class="relative text-white">
					<img src={exampleImage} class="brightness-50" alt="TODO" />
					<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
						<h3 class="">Bibellesen im Schlossgarten</h3>
					</div>
				</div>
				<div class="pt-8">
					<span class="flex items-center gap-2 text-xl font-bold"
						><Fa icon={faCalendarDays} />{getDateTimeString(date)}
					</span>
					<span class="flex items-center gap-2 text-xl font-bold"
						><Fa icon={faLocationDot} /><a href="https://maps.google.com">
							Eine Ort mit Mapslink
						</a>
					</span>
				</div>
				<p class="py-4">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
			</div>
		</div>

		<div class="pad pt-16">
			<h2>Church Hopping</h2>
		</div>
	</section>

	<section></section>

	<section class="pad">
		<h1>Wohnen, Leben, Studieren</h1>
	</section>
</main>

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
