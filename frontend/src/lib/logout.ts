import { pb } from './pocketbase';
import { applyAction } from '$app/forms';

/**
 * Performs a logout by making a direct POST request to the logout endpoint.
 * Then applies an redirect if the logout endpoint does send one.
 *
 * @param action - The form action URL (default: "/account/logout")
 * @returns The response from the logout endpoint
 */
export async function logout(action: string = '/account/logout'): Promise<Response> {
    // Make a direct POST request to the logout endpoint
    const response = await fetch(action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    const result = await response.json().catch(() => ({}));

    // After confirm, also apply logout locally
    pb.authStore.clear();

    // Apply the action result to handle any redirects or special responses
    await applyAction(result);

    return response;
}
