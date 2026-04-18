import herzenssache from '$lib/assets/pages/events/semesterprogramm/herzenssache_21_9.jpg';
import outsidethebox from '$lib/assets/pages/events/semesterprogramm/outsidethebox_21_9.jpg';
import vollerhoffnung from '$lib/assets/pages/events/semesterprogramm/voller_hoffnung_21_9.jpg';
import weitergehen from '$lib/assets/pages/events/semesterprogramm/weitergehen_21_9.jpg';
import aufswassergehen from '$lib/assets/pages/events/semesterprogramm/aufsWassergehen_21_9.jpg';

export type SemesterProgram = {
	slug: string;
	title: string;
	subtitle: string;
	image: string;
	// for event loading
	start: string;
	end: string;
};

// order important for carousel
// first used as redirect for general semesterprogram
export const allPrograms: SemesterProgram[] = [
	{
		slug: 'sose26',
		title: 'Aufs Wasser gehen',
		subtitle: 'Unser Sommersemester 2026',
		image: aufswassergehen,
		start: '2026-04-01',
		end: '2026-10-01',
	},
	{
		slug: 'wise25_26',
		title: 'WeiterGehen',
		subtitle: 'Unser Wintersemester 2025/26',
		image: weitergehen,
		start: '2025-10-01',
		end: '2026-04-01',
	},
	{
		slug: 'sose25',
		title: 'Voller Hoffnung',
		subtitle: 'Unser Sommersemester 2025',
		image: vollerhoffnung,
		start: '2025-04-01',
		end: '2025-10-01',
	},
	{
		slug: 'wise24_25',
		title: 'Outside the box',
		subtitle: 'Unser Wintersemester 2024/25',
		image: outsidethebox,
		start: '2024-10-01',
		end: '2025-04-01',
	},
	{
		slug: 'sose24',
		title: 'Herzenssache',
		subtitle: 'Unser Sommersemester 2024',
		image: herzenssache,
		start: '2024-04-01',
		end: '2024-10-01',
	}
];
