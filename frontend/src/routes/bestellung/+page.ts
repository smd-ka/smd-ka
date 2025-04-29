import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(
		302,
		'https://docs.google.com/forms/d/e/1FAIpQLSfV-Om4_X3cjtviOysHkj7ObWc31fE3FwMpFFzj19v2y-hVyA/viewform?usp=dialog'
	);
}
