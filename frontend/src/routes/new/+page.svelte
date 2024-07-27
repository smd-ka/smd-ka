<script lang="ts">
	import kaheim from '$lib/assets/logos/kaheim.png';

	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		faChurch,
		faComments,
		faCalendar,
		faLocationDot,
		faCalendarDays
	} from '@fortawesome/free-solid-svg-icons';
	import HeroShot from '$lib/components/HeroShot.svelte';
	import header from '$lib/assets/heroshots/karlsruhe_luft.jpeg';
	import schloss_img from '$lib/assets/pages/new/schloss.jpg';
	import turmberg_img from '$lib/assets/pages/new/turmberg.jpg';
	import schlossgarten_img from '$lib/assets/pages/new/schlossgarten.jpg';
	import epplesee_img from '$lib/assets/pages/new/epplesee.jpg';
	import oxford_img from '$lib/assets/pages/new/oxford.png';
	import type { PageData } from './$types';
	import { getImageSrc } from '$lib/fetch_img';

	// TODO add Churchhopping for this year
	const churchHopping = [
		{
			date: '27. Oktober 10:00 Uhr',
			link: 'https://icf-karlsruhe.de',
			name: 'ICF Karlsruhe',
			responsible: 'Claus Hamman'
		},
		{
			date: '27. Oktober 10:00 Uhr',
			link: 'https://icf-karlsruhe.de',
			name: 'ICF Karlsruhe',
			responsible: 'Claus Hamman'
		}
	];

	export let data: PageData;

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
	const getDateTimeString = (dateString: string) => {
		date = new Date(dateString);
		// Substract 2 hours to get the correct time for the event as the date is in UTC
		date.setHours(date.getHours() - 2);
		return `${weekdays[date.getDay()]}, ${date.toLocaleDateString(
			'de-DE'
		)} ${date.toLocaleTimeString('de-DE', {
			hour: '2-digit',
			minute: '2-digit'
		})} Uhr`;
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
				<a class="whitespace-nowrap" href="mailto:inreach@smd-karlsruhe.de"
					>inreach@smd-karlsruhe.de
				</a>. <br />
				Schau doch mal bei uns vorbei!
			</p>

			<h2 class="pb-6 pt-12">Ersti Aktionen Wintersemester 2024/25</h2>

			{#if data.records.length === 0}
				<p>
					Die Aktionen befinden sich gerade noch in der Planung, werden aber bald hier
					veröffentlicht. Sie werden vermutlich vor allem in den letzten September und ersten
					Oktoberwochen stattfinden. Stay tuned :)
				</p>
			{/if}
		</div>
		<div
			class="} grid gap-8 px-4 md:grid-cols-2 {data.records.length > 2
				? ' xl:grid-cols-3'
				: 'px-52'}"
		>
			{#each data.records as action}
				<div>
					<div class="relative text-white">
						<img
							src={getImageSrc(
								action.background_image,
								action.id,
								action.collectionId,
								action.collectionName
							)}
							class="max-h-72 w-full brightness-50"
							alt={action.title}
						/>
						<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
							<h3 class="">{action.title}</h3>
						</div>
					</div>
					<div class="pt-8">
						<span class="flex items-center gap-2 text-xl font-bold"
							><Fa icon={faCalendarDays} />{getDateTimeString(action.date)}
						</span>
						<span class="flex items-center gap-2 text-xl font-bold"
							><Fa icon={faLocationDot} /><a href={action.google_maps_url}>
								{action.location}
							</a>
						</span>
					</div>
					<p class="py-4">
						{action.description}
					</p>
				</div>
			{/each}
		</div>

		<div class="pad pt-16">
			<h2>Church Hopping</h2>

			<p class="py-4">
				Am Anfang von jedem Wintersemester bieten wir dir an, die Gemeinden kennen zu lernen, in die
				wir SMDler gehen. So kannst du ganz unkompliziert eine Gemeinde in Karlsruhe finden, ohne
				dass du alleine in der Bank sitzt 😉. Außerdem hast du direkt eine Person, der du Fragen zur
				und über die Gemeinde stellen kannst. Als Studentenmission ist es uns wichtig, dass du eine
				Gemeinde findest in der du geistlich gestärkt wirst!
				<br />
				<!-- In der Tabelle findest du die Termine für dieses Jahr. Außerdem wird es eine Signal Gruppe geben
				in der nochmals der genaue Treffpunkt kommuniziert wird. Falls du darin aufgenommen werden möchtest,
				schreib einfach <a href="mailto:claus@chammann.dev">Claus</a> eine E-Mail. -->
			</p>
		</div>

		<table
			class="font-merriweather mt-8 grid grid-cols-[auto_auto_auto] gap-x-2 px-4 md:text-2xl xl:px-72"
		>
			<div class="font-bold">Datum</div>
			<div class="font-bold">Gemeinde</div>
			<div class="font-bold">Ansprechperson</div>

			{#each churchHopping as hop, i}
				<div class="col-span-full h-0.5 {i == 0 ? 'bg-gray-600' : 'bg-gray-300'}"></div>
				<div>{hop.date}</div>
				<a href={hop.link}>{hop.name}</a>
				<div>{hop.responsible}</div>
			{/each}
		</table>
	</section>
</main>

<img src={schloss_img} alt="Karlsruher Schloss" />

<main class="main">
	<section class="pad">
		<h1>Wohnen, Leben, Studieren</h1>

		<p>
			Hier findest du einige Tipps und Infos von SMDlern über Karlsruhe und das Studium. Egal ob du
			schon entschieden hast, dass du nach Karlsruhe ziehst oder noch am Überlegen bist, ob
			Karlsruhe der richtige Ort für dich ist, hier findest du einige Infos, die dir bei deiner
			Entscheidung helfen können. Außerdem haben wir einige Tipps für dich, falls du gerade neu in
			Karlsruhe bist.
		</p>

		<h2 class="pt-8">Wohnen</h2>
		<div class="flex">
			<p>
				<a class="float-right align-middle" href="https://kaheim.de">
					<img src={kaheim} class="h-12 self-center" alt="kaheim logo" />
				</a>
				Auf der Suche nach einer Wohnung? Dann schau doch mal bei
				<a href="https://kaheim.de">kaheim.de</a> vorbei! Hier findest du eine Zimmerbörse für
				christliche WGs in Karlsruhe. Wenn du ein Zimmer suchst oder in deiner WG Zimmer frei hast
				und Mitbewohner suchst, kannst die Einträge dort durchschauen und/oder selbst einen
				erstellen. Wir betreiben die Plattform selbst in Koorperation mit dem SfC (Studierende für
				Christus), daher findest du alle Zimmerangebote, von denen wir wissen, auf dieser Seite.
				<br />
				Darüber hinaus kannst du dich auch mal beim
				<a href="https://www.sw-ka.de/de/wohnen/"> Studierendenwerk</a> umschauen.
			</p>
		</div>

		<h2 class="pt-8">Leben</h2>
		<p>
			<b> Karlsruhe = Beschte. </b> Nicht nur sind wir die Residenz des Rechts, sondern auch die
			Fächerstadt. Mit dem Karlsruher Institut für Technologie (KIT), der Pädagogischen Hochschule
			(PH) und der Hochschule Karlsruhe (HKA) sowie vielen kleinen Hochschulen mehr ist Karlsruhe
			eine absolute Studentenstadt. UND Karlsruhe ist Fahrradstadt. Daher empfehlen wir, lege dir
			sobald wie möglich eins zu. Wenn du zudem ein wahrer SMDler werden willst: Helm auf! Wenn du
			diesen Insider verstehen willst, schau vorbei 😉.
			<br />
			Um dir einen kleinen Einblick in das Leben in Karlsruhe zu geben und dir eine Idee zu geben, welche
			Orte du unbedingt einmal besuchen solltest, haben wir dir hier eine Liste zusammengestellt:
		</p>

		<div class="grid grid-cols-2 gap-4 gap-y-16 py-20">
			<img alt="Schlossgarten" class="h-48 w-full object-cover" src={schlossgarten_img} />

			<div>
				<h3>Der Schlo(ssgarten)</h3>

				<p>
					Der ideale Treffpunkt zum abhängen, Sonne genießen, Spikeball spielen und vielem mehr.
					Egal ob unter der Woche nach der Uni oder am Wochenende der Schlossgarten ist Karlsruhes
					offenes Wohnzimmer. (Zumindest im Sommer :P)
				</p>
			</div>

			<div>
				<h3>Der Turmberg</h3>

				<p>
					Karlsruhe von oben sehen? Dann ab auf den Turmberg. Besonders zum Sonnenuntergang genießen
					ist dies der perfekte Ort. Außerdem befindet sich ein Hochseilgarten auf dem Turmberg.
				</p>
			</div>
			<img alt="Turmberg" class="h-48 w-full object-cover" src={turmberg_img} />

			<div class="flex justify-center">
				<img alt="Oxford" class="h-48 object-cover" src={oxford_img} />
			</div>
			<div>
				<h3>Das Oxford Pub</h3>

				<p>
					Lecker und günstig als Student essen gehen? Dann ab ins Oxford Pub. Hier gibt es leckere
					Burger und gutes Bier. Direkt neben dem KIT Campus ist das Oxford eine beliebte Adresse
					für einen gemütlichen Abend mit Freunden.
				</p>
			</div>

			<div>
				<h3>Der Epplesee</h3>
				<p>
					Erfrischung gefällig? Nur eine kleine Fahrradtour entfernt (ca. 10km) liegt im Süden von
					Karlsruhe der Epplesee. Der See überzeugt mit einer großen Liegewiese und einem schönen
					Strand. Tipp: Hier lohnt es sich besonders auszunutzen, dass du Student bist und unter der
					Woche bzw. Vormittags zu gehen.
				</p>
			</div>
			<img alt="Epplesee" class="h-48 w-full object-cover" src={epplesee_img} />
		</div>

		Frühstück beim Extrablatt Epplesee, Weingarten,

		<h2 class="pt-8">Studieren.</h2>
		<p>Auch wenn manche von uns behaupten würden, dass sie SMD mit Nebe</p>
	</section>
</main>
