import { allPrograms } from './data';
import type { LayoutServerLoad } from './$types';
import { pb } from '$lib/pocketbase';

export const prerender = true;

export const load: LayoutServerLoad = async ({ url }) => {
	const slug = url.pathname.split('/').pop() ?? '';
	if (slug === 'semesterprogramm') {
		return { events: [] };
	}

	const program = allPrograms.find((p) => p.slug === slug);
	if (!program) {
		throw new Error(`Unknown semester program: ${slug}`);
	}

	const records = await pb.collection('calendar').getFullList({
		sort: '+start_date_time',
		filter: `category='smd_abend' && start_date_time >= "${program.start} 00:00:00" && end_date_time < "${program.end} 00:00:00"`
	});

	const events = records.map((record) => ({
		id: record.id,
		title: record.title,
		start_date_time: record.start_date_time,
		speaker: record.speaker,
		location: record.location,
		location_url: record.location_url,
	}));

	return { events };
};
