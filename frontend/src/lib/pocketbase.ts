import PocketBase, { ClientResponseError } from 'pocketbase';
import { writable } from 'svelte/store';
import defaultAvatar from '$lib/assets/user_default.png';
const API_URL: string = import.meta.env.VITE_API_URL;

export const pb = new PocketBase(API_URL);

export const SAFT_COORDINATOR = 'saftcoordinator';
export const PRIT_RESPONSABLE = 'pritresponsable';
export const REGIOKON_COORDINATOR = 'regiokoncordina';

export const currentUser = writable(pb.authStore.model);

export function getErrorMessage(error: unknown) {
	const errorObj = error as ClientResponseError;
	return errorObj.message;
}

export function getAvatarUrl() {
	let src = defaultAvatar;
	if (pb.authStore.model?.avatar) {
		src = pb.files.getUrl(
			{
				collectionId: pb.authStore.model?.collectionId,
				collectionName: pb.authStore.model?.collectionName,
				id: pb.authStore.model?.id
			},
			pb.authStore.model?.avatar
		);
	}
	return src;
}

export type UserRecord = {
	address: string;
	allergies: string;
	avatar: string;
	birthday: string; // ISO date string
	collectionId: string;
	collectionName: string;
	created: string; // ISO date string
	email: string;
	emailVisibility: boolean;
	field_of_study: string;
	gender: 'male' | 'female' | 'other';
	hidden_in_addresslist: boolean;
	id: string;
	name: string;
	phonenumber: string;
	post_images: 'yes' | 'no';
	rili: boolean;
	roles: string[]; // Array of roles
	start_of_studies: string; // ISO date string
	surname: string;
	team: string;
	updated: string; // ISO date string
	username: string;
	vegetarian: boolean;
	verified: boolean;
	expand: Record<string, unknown>; // Expandable fields
};
