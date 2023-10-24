export type User = {
	id: number;
	name: string;
	email: string;
	created_at: string;
	updated_at: string;
	address: string;
	anniversary: Date;
	team: string;
	phonenumber: string;
};

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
