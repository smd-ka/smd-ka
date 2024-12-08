export const showPreview = (event: Event) => {
	const files = (event.target as HTMLInputElement).files;
	if (files && files.length > 0) {
		src = URL.createObjectURL(files[0]);
		image = files[0];
	}
	return { src, image };
};
