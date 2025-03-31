import type { UserRecord } from '$lib/pocketbase';
import type { RecordAuthResponse } from 'pocketbase';

const BASE_URL = 'https://auth.smd-karlsruhe.de';

export const checkIfUserExistsInAuthentik = (email: string) => {
	const TOKEN: string = import.meta.env.AUTHENTIK_BEARER;

	const myHeaders = new Headers({
		Accept: 'application/json',
		Authorization: 'Bearer ' + TOKEN
	});

	const requestOptions = {
		method: 'GET',
		headers: myHeaders
	};

	const config = {
		method: 'get',
		maxBodyLength: Infinity,
		url: `${BASE_URL}/api/v3/core/users/?email=${email}`,
		headers: {
			Accept: 'application/json',
			Authorization: 'Bearer ' + TOKEN
		}
	};

	fetch(`${BASE_URL}/api/v3/core/users/?email=${email}`, requestOptions)
		.then((response) => response.text())
		.then((result) => console.log(result))
		.catch((error) => console.error(error));
	return false;
};

export const createUserInAuthentik = (record: RecordAuthResponse<UserRecord>) => {
	const TOKEN: string = import.meta.env.AUTHENTIK_BEARER;

	const rec = record.record;

	const data = JSON.stringify({
		username: rec.username,
		name: rec.name + ' ' + rec.surname,
		is_active: true,
		// ReadOnly Group
		groups: ['fa1f5b31-e9b6-43c4-8cd1-a1e67e4a8e25'],
		email: rec.email,
		type: 'internal'
	});

	const myHeaders = new Headers({
		'Content-Type': 'application/json',
		Accept: 'application/json',
		Authorization: 'Bearer ' + TOKEN
	});

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: data
	};

	fetch(`${BASE_URL}/api/v3/core/users/`, requestOptions)
		.then((response) => response.text())
		.then((result) => console.log(result))
		.catch((error) => console.error(error));
};
