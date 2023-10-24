export type User = {
	id?: number;
	name: string;
	surname: string;
	email: string;
	phonenumber: string;
	address: string;
	birthday: Date | string;
	team: string;
	field_of_study: string;
	start_of_studies: Date | string;
};

export interface SendableUser extends User {
	username: string;
	password: string;
	passwordConfirm: string;
	avatar: FileList | undefined | null;
}

export type saftRegistration = {
	user?: string;
	name: string;
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
};
