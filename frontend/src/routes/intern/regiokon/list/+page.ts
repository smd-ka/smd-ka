import { pb } from '$lib/pocketbase';
import { faBicycle, faCar, faPeopleGroup, faTrain } from '@fortawesome/free-solid-svg-icons';
import type { PageLoad } from './$types';

export type SaftRegistrationFilter =
	| 'all'
	| 'paid'
	| 'unpaid'
	| 'bike'
	| 'train'
	| 'landau'
	| 'floor_sleeper'
	| 'female'
	| 'male';

export const load: PageLoad = async () => {
	try {
		// 'saft_registrations' is a view, filtered by semester
		// (i.e. this filter needs to be updated in the backend)
		const records = await pb.collection('regiokon').getFullList({
			sort: 'name'
		});

		const isFemale = records.filter((x) => x.gender == 'female').length;
		const isMale = records.filter((x) => x.gender == 'male').length;

		return {
			list: records,
			isFemale,
			isMale
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
		case 'female':
			return list.filter((x) => x.gender === 'female');
		case 'male':
			return list.filter((x) => x.gender === 'male');
	}
};

function escapeCsv(text: string): string {
	// text escaping according to RFC 4180, section 2:
	// - 5. surround by double quotes
	// - 6. the same for CRLF inside text
	// - 7. escape double quote with extra double quote
	return '"' + text.replaceAll('"', '""') + '"';
}

export const _exportToCsv = (list, filter) => {
	const rows = [
		[
			'Vorname',
			'Nachname',
			'Gruppe',
			'Geschlecht',
			'Telefonnummer',
			'E-Mail-Adresse',
			'An/Abreise Kommentar',
			'Bemerkung',
			'Vegetarier',
			'Allergien',
			'Bildrechte'
		],
		...list.map((x) => [
			escapeCsv(x.name),
			escapeCsv(x.surname),
			escapeCsv(x.group),
			x.gender === 'female' ? 'w' : 'm',
			escapeCsv(x.phone),
			escapeCsv(x.email),
			escapeCsv(x.travel_comments),
			escapeCsv(x.comments),
			x.is_vegetarian ? 'Ja' : '',
			escapeCsv(x.allergies),
			_postImages(x.image_publication_consent)
		])
	];

	const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((x) => x.join(',')).join('\r\n'); // CRLF according to RFC 4180

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
		case 'no':
			return 'Abgelehnt';
	}
};
