/*
 * provides short aliases for shorter links and smaller QR codes
 *
 * current variants:
 * - permanent references
 * - dynamic calendar event references, when ref looks like a PocketBase collection ID
 */

import { error, redirect } from '@sveltejs/kit';

/**
 * Map of permanent short aliases to target URL.
 *
 * Permanent shortlinks are intended for printed material like flyers or posters.
 * Those should never be changed, except to shortcut redirects.
 *
 * When assigning a new one, make sure it does not conflict with potential future routes & shortlinks.
 * Recommended to add time info into ref, e.g. semester, year, etc.
 */
const permanentReferences: Record<string, string> = {
	sose26: '/events/semesterprogramm/sose26',
};

/**
 * Regex for PocketBase IDs, which are 15-character alphanumeric strings.
 */
const POCKETBASE_ID_REGEX = /^[a-z0-9]{15}$/;

// prerender static entries, while allowing dynamic entries
export const prerender = "auto"; // auto -> mix of static and dynamic
export const entries = () => Object.keys(permanentReferences).map((ref) => ({ ref }));

export const load = ({ params }) => {
	const ref = params.ref;

	// permanent aliases, using 301 Moved Permanently
	const target = permanentReferences[ref];
	if (target) return redirect(301, target);

	// calendar event references, using 302 Found
	if (POCKETBASE_ID_REGEX.test(ref)) return redirect(302, `/events/kalender/${ref}`);

	// fallback to 404 page
	return error(404);
};
