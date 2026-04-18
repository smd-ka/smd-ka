type ChurchInfo = {
	name: string,
	url: string,
	timings: string,
	location: string,
	attenderNumber: string,
	comment?: string,
};

export const RecommendedChurches: ChurchInfo[] = [
	{
		name: 'Christliche Gemeinde (CG)',
		url: 'https://www.cg-karlsruhe.de/',
		timings: 'Sonntag, 10:45 Uhr',
		location: 'Innenstadt-West; Reinhold-Frank-Straße 44A',
		attenderNumber: 'ca. 120 Personen',
		comment: 'Davor gibt es um 9:45 Uhr immer gemeinsames Gebet und Lobpreis, sowie Abendmahl.'
	},
	{
		name: 'Freie evangelische Gemeinde (FeG)',
		url: 'https://karlsruhe.feg.de/',
		timings: 'Sonntag, 9:30 Uhr und 11:15 Uhr',
		location: 'Nordstadt; Am Wald 2',
		attenderNumber: 'ca. 150 Personen je Gottesdienst',
		comment: 'In den Ferien findet nur ein Gottesdienst um 10:00 Uhr statt.'
	},
	{
		name: 'Fächerkirche',
		url: 'https://faecherkirche.de/',
		timings: 'Sonntag, 11:00 Uhr',
		location: 'Innenstadt-West; Amalienstraße 77',
		attenderNumber: 'ca. 50 Personen',
		comment: 'Zwei Formate, jeweils im Wechsel: Storytelling (in Kleingruppen) und Kirchengottesdienst'
	},
	{
		name: 'International Christian Fellowship (ICF)',
		url: 'https://www.icf-karlsruhe.de/',
		timings: 'Sonntag, 9:30 Uhr, 11:15 Uhr und 18:30 Uhr',
		location: 'Grünwinkel; Griesbachstraße 10b',
		attenderNumber: 'ca. 300 Personen je Gottesdienst',
		comment: 'Nach dem etwas jugendlicher gestalteten Abendgottesdienst trifft sich immer die Young-Adults-Community.'
	},
	{
		name: 'Landeskirchliche Gemeinschaft (LkG)',
		url: 'https://www.lkg-karlsruhe.de/',
		timings: 'Sonntag, 10:00 Uhr',
		location: 'Südweststadt; Gartenstraße 6',
		attenderNumber: 'ca. 50 Personen'
	},
	{
		name: 'Treffpunkt Leben (TL)',
		url: 'https://treffpunkt-leben.de/',
		timings: 'Sonntag, 9:30 Uhr und 11:45 Uhr',
		location: 'Grünwinkel; Herrmann-Leichtlin-Straße 15',
		attenderNumber: 'ca. 200 Personen'
	}
];
