import { parsePhoneNumberFromString, type PhoneNumber } from 'libphonenumber-js';

/** Parsed phone number (DE as default country), or null if unparseable/unpossible. */
export function parsePhone(raw: string | undefined | null): PhoneNumber | null {
	if (!raw) return null;

	const parsed = parsePhoneNumberFromString(raw.trim(), { defaultCountry: 'DE', extract: false });
	// isPossible() over isValid(): length check only, tolerant to stale metadata
	return parsed && parsed.isPossible() ? parsed : null;
}

/** `tel:` href (RFC3966 via getURI()), or null for no link. */
export function telHref(raw: string | undefined | null): string | null {
	const parsed = parsePhone(raw);
	return parsed ? parsed.getURI() : null;
}
