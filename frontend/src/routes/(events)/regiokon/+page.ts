import { writable } from 'svelte/store';

export const _success_record = writable(null);

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
	'Wiesbaden'
];

export function _post_regiokon_signup() {
	console.log('Regiokon signup post-processing');
}
