import type { PageLoad } from './$types';
import SAFT from '$lib/assets/pages/about/angebote/SAFT.jpg';
import Hoersaalvortrag from '$lib/assets/pages/about/angebote/Hoersaalvortrag.jpg';
import Gebetsfruehstueck from '$lib/assets/pages/about/angebote/Gebetsfruehstueck.jpg';
import SMDAbend from '$lib/assets/pages/about/angebote/SMDAbend.jpg';
import HSMD_Freizeiten from '$lib/assets/pages/about/angebote/H-SMD_Sommerfreizeiten.png';
import teachers from '$lib/assets/pages/about/angebote/lehramtler.jpg';
import mentoring from '$lib/assets/pages/about/angebote/mentoring.jpg';
import hauskreise from '$lib/assets/pages/about/angebote/Hauskreise.jpg';
import MIT from '$lib/assets/pages/about/angebote/MIT.jpg';

export const load: PageLoad = () => {
	const slidesKarlsruhe = [
		{
			id: 1,
			title: 'SMD-Abend',
			subtitle: 'Jeden zweiten Dienstag in großer Runde.',
			image: SMDAbend,
			description: `Alle zwei Wochen treffen wir uns dienstagabends alle zusammen, 
            um Gott zu ehren, bei gutem Essen oder Snacks Gemeinschaft zu haben und einen Vortrag zu hören,
             nach dem man die Möglichkeit hat, in weiteren Gesprächen tiefer zu gehen oder einfach den Abend 
             gemütlich ausklingen zu lassen. Die Vorträge zu verschiedenen Themen werden gehalten von ausgewählten 
             (oft externen) Referenten. Für zeitliche und örtliche Details sieh dir gerne den Kalender an.`
		},
		{
			id: 2,
			title: 'Hauskreise',
			subtitle: 'Gemeinsam über den Glauben reden.',
			image: hauskreise,
			description: `Alle anderen zwei Wochen, abwechselnd zu den SMD-Abenden, treffen wir uns in Kleingruppen = Hauskreisen. 
			Die bestehen meistens aus 5-8 Leuten und treffen sich immer bei einem der Teilnehmer Zuhause, 
			wo oft zusammen gegessen wird, bevor man ins Thema eintaucht. Die Themen werden von den Hauskreisen selbst ausgesucht. 
			Wenn du wissen möchtest, welche Hauskreise es gibt und wo du mal reinschnuppern oder einsteigen könntest, 
			dann melde dich gerne beim Inreach-Team.`
		},
		{
			id: 3,
			title: 'Hörsaalvortrag',
			subtitle: 'Glaube und Wissenschaft. Ein Widerspruch?',
			image: Hoersaalvortrag,
			description: `Ungefähr ein- bis zweimal im Jahr veranstalten wir, oft zusammen 
                mit dem SfC (Studierende für Christus), einen Hörsaalvortrag, 
                der - wie soll es auch anders sein - in einem Hörsaal direkt am Campus stattfindet. 
                Für die spannenden Vortragsthemen laden wir kompetente Referenten ein, 
                die für jedwede Fragen Rede und Antwort stehen.`
		},
		// TODO add Gebetsfrühstück to SlideShow
		// {
		// 	id: 3,
		// 	title: 'Gebetsfrühstück',
		// 	subtitle: 'Gemeinsam mit Gott in den Tag starten.',
		// 	image: Gebetsfruehstueck,
		// 	description: 'Dienstags und Donnerstags gibt es ein Gebetsfrühstück.	'
		// },
		{
			id: 4,
			title: 'Mitarbeitertreffen (MIT)',
			subtitle: 'Gemeinsam mit anderen Mitarbeitern die SMD gestalten.',
			image: MIT,
			description: `Einmal im Monat (außer zur vorlesungsfreien Zeit) treffen sich alle Mitarbeiter 
				und an Mitarbeit Interessierten, um in einem kleineren Rahmen als beim Gruppenabend durch 
				einen Input ermutigt zu werden, in einfachem Stil Gott musikalisch anzubeten, 
				sich gegenseitig zu ermutigen und alles zu besprechen, was in letzter Zeit war, 
				was gerade ansteht und was noch in Planung ist (quasi Offenbarung 1,19 😁). 
				Hier ist auch Raum, um Ideen zu entwickeln, Pläne umzusetzen und zu reflektieren.
`
		},
		{
			id: 5,
			title: 'SAFT',
			subtitle: 'Semesteranfangsfreizeit: Gemeinsam ins neue Semester starten.',
			image: SAFT,
			description: `Die SAFT (SemesterAnfangsFreizeiT - ja, SMD ist kreativ; wir könnten auch ZKM heißen 
                [Ziemlich Kreative Menschen; dies ist ein Karlsruher Wortwitz, Anm. d. Verf.]) 
                findet immer zu Beginn eines jeden Semesters statt und ist eine super Gelegenheit, 
                mal für mehr als nur 2-3 Stunden in einem intimeren Rahmen die Gruppe kennenzulernen. 
                Für ein Wochenende fahren wir an einen Ort, an dem wir nicht andauernd an die 
                nächste Klausur denken müssen, sondern die Gemeinschaft und fantastisches Essen genießen.
                 Auch hier wird uns ein Referent thematisch durch das Wochenende begleiten.`
		}
	];

	const slidesGermany = [
		{
			title: 'SMD Freizeiten',
			image: HSMD_Freizeiten,
			text: 'Die Hochschul-SMD bietet dir für deine Semesterferien etliche Freizeitangebote.'
		},
		{
			title: 'Refendare und junge Lehrkräfte',
			image: teachers,
			text: `Dieses Angebot der Arbeitsgemeinschaft christlicher Pädagogen bietet Vernetzung, 
            Unterstützung und Ermutigung für Lehramtsstudierende, Referendare und junge Lehrkräfte.`
		},
		{
			title: 'Mentoring',
			image: mentoring,
			text: `Das Studium ist kein Spaziergang. Besser passt wohl das Bild einer Bergtour mit Engstellen, 
            Geröllfeldern und so manchem Auf und Ab. Da ist es gut, mit erfahrenen Bergsteigern und guter 
            Ausrüstung in einer Seilschaft gemeinsam unterwegs zu sein.`
		}
	];

	return {
		slidesKarlsruhe: slidesKarlsruhe,
		slidesGermany: slidesGermany
	};
};
