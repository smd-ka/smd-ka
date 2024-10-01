import type { PageLoad } from './$types';
import SAFT from '$lib/assets/pages/about/angebote/SAFT.jpg';
import Hoersaalvortrag from '$lib/assets/pages/about/angebote/Hoersaalvortrag.jpg';
import Gebetsfruehstueck from '$lib/assets/pages/about/angebote/Gebetsfruehstueck.jpg';
import SMDAbend from '$lib/assets/pages/about/angebote/SMDAbend.jpg';
import HSMD_Freizeiten from '$lib/assets/pages/about/angebote/H-SMD_Sommerfreizeiten.png';
import teachers from '$lib/assets/pages/about/angebote/lehramtler.jpg';
import mentoring from '$lib/assets/pages/about/angebote/mentoring.jpg';

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
			title: 'Hörsaalvortrag',
			subtitle: 'Glaube und Wissenschaft. Ein Widerspruch?',
			image: Hoersaalvortrag,
			description: `Ungefähr ein- bis zweimal im Jahr veranstalten wir, oft zusammen 
                mit dem SfC (Studierende für Christus), einen Hörsaalvortrag, 
                der - wie soll es auch anders sein - in einem Hörsaal direkt am Campus stattfindet. 
                Für die spannenden Vortragsthemen laden wir kompetente Referenten ein, 
                die für jedwede Fragen Rede und Antwort stehen.`
		},
		{
			id: 3,
			title: 'Gebetsfrühstück',
			subtitle: 'Gemeinsam mit Gott in den Tag starten.',
			image: Gebetsfruehstueck,
			description: 'Dienstags und Donnerstags gibt es ein Gebetsfrühstück.	'
		},
		{
			id: 4,
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
            Geröllfeldern und so manchem Auf und Ab. Da ist es gut, mit erfahrenen Bergsteigern und guter Ausrüstung in einer Seilschaft gemeinsam unterwegs zu sein.`
		}
	];

	return {
		slidesKarlsruhe: slidesKarlsruhe,
		slidesGermany: slidesGermany
	};
};
