import PocketBase, { ClientResponseError } from 'pocketbase';
import { writable } from 'svelte/store';
import defaultAvatar from '$lib/assets/user_default.png';

export const pb = new PocketBase('http://localhost:8090');

export const SAFT_COORDINATOR = 'saftcoordinator';

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
