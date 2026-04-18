import herzenssache from '$lib/assets/pages/events/semesterprogramm/herzenssache_21_9.jpg';
import outsidethebox from '$lib/assets/pages/events/semesterprogramm/outsidethebox_21_9.jpg';
import vollerhoffnung from '$lib/assets/pages/events/semesterprogramm/voller_hoffnung_21_9.jpg';
import weitergehen from '$lib/assets/pages/events/semesterprogramm/weitergehen_21_9.jpg';
import aufswassergehen from '$lib/assets/pages/events/semesterprogramm/aufsWassergehen_21_9.jpg';

export type SemesterProgram = {
	title: string,
	subtitle: string,
	image: string,
	link: string
}

// order important for carousel
// first used as redirect for general semesterprogram
export const allPrograms: SemesterProgram[] = [
	{
		title: 'Aufs Wasser gehen',
		subtitle: 'Unser Sommersemester 2026',
		image: aufswassergehen,
		link: '/events/semesterprogramm/sose26'
	},
	{
		title: 'WeiterGehen',
		subtitle: 'Unser Wintersemester 2025/26',
		image: weitergehen,
		link: '/events/semesterprogramm/wise25_26'
	},
	{
		title: 'Voller Hoffnung',
		subtitle: 'Unser Sommersemester 2025',
		image: vollerhoffnung,
		link: '/events/semesterprogramm/sose25'
	},
	{
		title: 'Outside the box',
		subtitle: 'Unser Wintersemester 2024/25',
		image: outsidethebox,
		link: '/events/semesterprogramm/wise24_25'
	},
	{
		title: 'Herzenssache',
		subtitle: 'Unser Sommersemester 2024',
		image: herzenssache,
		link: '/events/semesterprogramm/sose24'
	}
];
