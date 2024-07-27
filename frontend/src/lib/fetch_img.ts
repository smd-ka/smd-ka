import { pb } from './pocketbase';

export const getImageSrc = (
	image: string,
	id: string,
	collectionId: string,
	collectionName: string,
	thumb?: string
) => {
	return pb.files.getUrl(
		{
			collectionId: collectionId,
			collectionName: collectionName,
			id: id
		},
		image,
		{ thumb: thumb }
	);
};
