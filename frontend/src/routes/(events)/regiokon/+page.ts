import { goto } from '$app/navigation';
import type { User } from '$lib/models';
import { getErrorMessage, pb } from '$lib/pocketbase';
import { writable } from 'svelte/store';

export const _success_regiokon_record = writable<RegiokonRecord | null>(null);
export const _loading = writable(false);

export const _SMDGroups = [
	'Darmstadt',
	'Esslingen',
	'Freiburg',
	'Germersheim',
	'Heidelberg',
	'Hohenheim',
	'Kaiserslautern',
	'Karlsruhe',
	'Konstanz',
	'Landau',
	'Ludwigsburg',
	'Main',
	'Mannheim',
	'Nürtingen',
	'Stuttgart',
	'Trier',
	'Tübingen',
	'Weingarten',
	'Wiesbaden',
	'Weitere'
];

export type RegiokonRecord = {
	id: string;
	name: string;
	surname: string;
	email: string;
	phone: string;
	gender: 'female' | 'male';
	allergies: string;
	is_vegetarian: boolean;
	smd_group: string;
	travel_comments: string;
	user: string;
	group: (typeof _SMDGroups)[number];
	created: string;
	updated: string;
	image_publication_consent: 'yes' | 'no_instagram' | 'no_website' | 'no';
	comments: string;
	question1: string;
	question2: string;
};

export async function _post_regiokon_signup() {
	_loading.set(true);

	const form = document.getElementById('form') as HTMLFormElement;
	const formData = new FormData(form);

	// Pre-fill user data if logged in
	fillFromLocalUser(formData);

	formData.set('is_vegetarian', formData.get('is_vegetarian') === 'on' ? 'true' : 'false');

	if (pb.authStore.isValid && pb.authStore.model?.id) {
		formData.set('user', pb.authStore.model?.id);
		formData.set('group', 'Karlsruhe');
	}

	try {
		const record = await pb.collection('regiokon').create<RegiokonRecord>(formData);
		_success_regiokon_record.set(record);
	} catch (e: any) {
		_loading.set(false);
		console.error(getErrorMessage(e));
		return;
	}
	_loading.set(false);
	goto('/regiokon/success');
}

const fillFromLocalUser = (formData: FormData) => {
	if (pb.authStore.isValid && pb.authStore.model) {
		const user = pb.authStore.model as unknown as User;
		formData.set('name', user.name || '');
		formData.set('surname', user.surname || '');
		formData.set('email', user.email || '');
		formData.set('phone', user.phonenumber || '');
		formData.set('smd_group', 'Karlsruhe');
		formData.set('gender', user.gender || '');
		formData.set('allergies', user.allergies || '');
	}
};
