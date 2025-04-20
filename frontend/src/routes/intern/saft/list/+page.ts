import { pb } from '$lib/pocketbase';
import { faBicycle, faCar, faPeopleGroup, faTrain } from '@fortawesome/free-solid-svg-icons';
import type { PageLoad } from './$types';

export type SaftRegistrationFilter = 'all' | 'paid' | 'unpaid' | 'bike' | 'train' | 'floor_sleeper';

export const load: PageLoad = async () => {
	try {
		const records = await pb.collection('saft_registrations').getFullList({
			sort: 'name'
		});
		const takesOwnCount = records.filter((x) => x.travel_option === 'takesOwn').length;
		const takesCarCount = records.filter((x) => x.travel_option === 'takesCar').length;
		const takesBikeCount = records.filter((x) => x.travel_option === 'takesBike').length;
		const takesTrainCount = records.filter((x) => x.travel_option === 'takesTrain').length;
		// SMD Landau Group
		const takesGroupCount = records.filter((x) => x.travel_option === 'takesGroup').length;
		const landauCount = records.filter((x) => x.group == 'Landau').length;

		const hasDTicketCount = records.filter(
			(x) => x.ticket === 'Deutschlandticket/Jugendticket BW'
		).length;
		const hasKVVCount = records.filter((x) => x.ticket === 'KVV-Bescheinigung').length;
		const hasKVVSemesterCount = records.filter((x) => x.ticket === 'KVV-Semesterticket').length;

		// SS25
		const pots = records.filter((x) => x.pot).length;
		const sleepingBagsMissing = records.filter((x) => !x.bag).length;
		const sleepingPadsMissing = records.filter((x) => !x.pad).length;
		const availableBags = records.reduce((sum, x) => sum + x.bag_count, 0);
		const availablePads = records.reduce((sum, x) => sum + x.pad_count, 0);

		return {
			list: records,
			takesBikeCount,
			takesOwnCount,
			takesTrainCount,
			takesGroupCount,
			takesCarCount,
			hasDTicketCount,
			hasKVVCount,
			hasKVVSemesterCount,
			landauCount,
			pots,
			sleepingBagsMissing,
			sleepingPadsMissing,
			availableBags,
			availablePads
		};
	} catch (error) {
		console.error(error);
		return { list: [] };
	}
};

export const _filterSaftRegistrations = (filter: SaftRegistrationFilter, list) => {
	switch (filter) {
		case 'all':
			return list;
		case 'paid':
			return list.filter((x) => x.paid);
		case 'unpaid':
			return list.filter((x) => !x.paid);
		case 'bike':
			return list.filter((x) => x.travel_option === 'takesBike');
		case 'train':
			return list.filter((x) => x.travel_option === 'takesTrain');
		case 'floor_sleeper':
			return list.filter((x) => x.would_sleep_on_floor);
	}
};

export const _exportToCsv = (list, filter) => {
	const rows = [
		[
			'Bezahlt',
			'Name',
			'Telefonnummer',
			'E-Mail-Adresse',
			'Gruppe',
			'An/Abreise',
			'An/Abreise Kommentar',
			'Ticket',
			'Bodenschläfer',
			'Bemerkung',
			'Kuchen',
			'Vegetarier',
			'Allergien',
			'Bildrechte',
			// SS25
			'Schlafsack',
			'Isomatte',
			'Gaskocher mit Topf',
			'Zelte',
			'Anzahl Schlafsäcke zu verleihen',
			'Anzahl Isomatten zu verleihen'
		],
		...list.map((x) => [
			x.paid ? 'Ja' : 'Nein',
			x.name,
			x.phonenumber,
			x.email,
			x.group === 'Landau' ? 'Landau' : 'Karlsruhe',
			_travelOption(x.travel_option),
			'"' + x.travel_comments + '"',
			x.ticket,
			x.would_sleep_on_floor ? 'Ja' : '',
			'"' + x.comments + '"',
			x.brings_cake ? 'Ja' : '',
			x.is_vegetarian ? 'Ja' : '',
			x.allergies,
			_postImages(x.post_images),
			// SS25
			x.bag ? 'Ja' : '',
			x.pad ? 'Ja' : '',
			x.pot ? 'Ja' : '',
			x.tents,
			x.bag_count,
			x.pad_count
		])
	];

	const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((x) => x.join(',')).join('\n');

	const encodedUri = encodeURI(csvContent);
	const link = document.createElement('a');
	link.setAttribute('href', encodedUri);
	link.setAttribute(
		'download',
		`SAFT_Anmeldungen_${list.length > 1 ? list[0].semester : ''}_${filter}.csv`
	);
	document.body.appendChild(link); // Required for FF

	link.click();
};

export const _travelOption = (travelOption: string) => {
	switch (travelOption) {
		case 'takesOwn':
			return 'selbstständig';
		case 'takesCar':
			return 'Auto';
		case 'takesBike':
			return 'Fahrrad';
		case 'takesTrain':
			return 'Bahn';
		case 'takesGroup':
			return 'Landau Gruppe';
	}
};

export const _travelOptionIcon = (travelOption: string) => {
	switch (travelOption) {
		case 'takesOwn':
			return undefined;
		case 'takesCar':
			return faCar;
		case 'takesBike':
			return faBicycle;
		case 'takesTrain':
			return faTrain;
		case 'takesGroup':
			return faPeopleGroup;
	}
};

export const _postImages = (postImages: string) => {
	switch (postImages) {
		case 'yes':
			return 'Erteilt';
		case 'no_instagram':
			return 'Kein Insta';
		case 'no_website':
			return 'Nicht Website';
		case 'never':
			return 'Abgelehnt';
	}
};
