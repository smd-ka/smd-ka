export type User = {
	name: string;
	surname: string;
	email: string;
	id: string;
	collectionName: string;
	collectionId: string;
	avatar?: string;
	phonenumber?: string;
	address?: string;
	birthday?: Date | string;
	team?: string;
	allergies?: string;
	field_of_study?: string;
	start_of_studies?: Date | string;
	rili?: boolean;
	vegetarian?: boolean;
	alumni?: boolean;
};

export type SendableUser = Omit<User, 'avatar'> & {
	username: string;
	password: string;
	passwordConfirm: string;
	avatar: FileList | undefined | null;
};

export type saftRegistration = {
	id?: string;
	paid?: boolean;
	user?: string;
	name: string;
	surname: string;
	email: string;
	phonenumber: string;
	takes_car: boolean;
	takes_bike: boolean;
	takes_train: boolean;
	ticket: string;
	would_sleep_on_floor: boolean;
	allergies: string;
	brings_cake: boolean;
	is_vegetarian: boolean;
	comments: string;
	semester: string;
	post_images: 'never' | 'always ask' | 'yes';
	group: string;
};

export type Statement = {
	id: string;
	collectionName: string;
	collectionId: string;
	name: string;
	subject: string;
	statement: string;
	picture: string;
};

export type Team = {
	id: string;
	collectionName: string;
	collectionId: string;
	name: string;
	description: string;
	image: string;
};

export type Activity = {
	id: string;
	collectionName: string;
	collectionId: string;
	title: string;
	subtitle: string;
	description: string;
	image: string;
};
