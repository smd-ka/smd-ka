// should only be used by admins for testing the SAFT signup form
// i.e. alerts on failures is good enough
export function fillSaftFormTest(isLoggedIn: boolean) {
	const form = document.querySelector('form#form');
	if (!form) return alert("saft form not found");

	const setValue = (name: string, value: string) => {
		const el = form.querySelector(`[name="${CSS.escape(name)}"]`) as HTMLInputElement;
		if (!el) return alert(`input ${name} not found`);

		el.value = value;
		return true;
	};

	const checkRadio = (name: string, value: string) => {
		const el = form.querySelector(
			`input[type="radio"][name="${CSS.escape(name)}"][value="${CSS.escape(value)}"]`
		) as HTMLInputElement;
		if (!el) return alert(`radio ${value} for ${name} not found`);

		el.click();
		return true;
	};

	const coinToss = Math.random() < 0.5

	// Only exists for logged-out users (conditional block in +page.svelte)
	if (!isLoggedIn) {
		setValue('name', 'Test');
		setValue('surname', 'User');
		// @example so that no MX record exists -> no mail can be sent
		setValue('email', 'test@example');
		// see https://www.bundesnetzagentur.de/DE/Fachthemen/Telekommunikation/Nummerierung/_DL/mittlg148_2021.pdf?__blob=publicationFile&v=1
		setValue('phonenumber', '+491729973185');
		checkRadio("gender", coinToss ? "male" : "female")
	}

	// Required: travel_option (also controls whether ticket radios render)
	setValue('travel_option', 'takesOwn');

	// Required: likes_cooking (1..5)
	checkRadio('likes_cooking', '3');

	// Required: post_images select
	setValue('post_images', 'no');

	// just in case
	setValue('comments', 'TEST-DATEN, bitte ignorieren & einfach löschen');
}
