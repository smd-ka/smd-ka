// See https://kit.svelte.dev/docs/types#app

import type { pb } from '$lib/pocketbase';

// for information about these interfaces

declare module '@fortawesome/pro-solid-svg-icons/index.es' {
	export * from '@fortawesome/pro-solid-svg-icons';
}

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: import('pocketbase').default;
			user: import('pocketbase').default['authStore']['model'];
		}

		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
