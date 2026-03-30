import { getErrorMessage, pb } from "./pocketbase";

// WARNING: keep in sync with backend/saft/regStatus.go as used in API
export const RegistrationStatus = {
    // before status was fetched or if any other issue occurs
    Unknown: 0,
    // fetching status was impossible (& present error to user)
    Failed: 1,
    // registration is normally open
    Open: 2,
    // registration is closed (but still before event, i.e. maybe show "contact us" hint)
    Closed: 3,
    // event ended (i.e. makes no sense to show "contact us" hint anymore)
    Afterwards: 4,
} as const;

export type RegistrationStatus = typeof RegistrationStatus[keyof typeof RegistrationStatus];

async function rawRequestRegStatus(): Promise<RegistrationStatus> {
    try {
        const resp = await pb.send('/api/saft/registration-status', { method: 'GET' });
        return resp.status;
    } catch (e: Any) {
        console.error(getErrorMessage(e));
        return RegistrationStatus.Failed;
    }
}

let registrationStatus: RegistrationStatus = RegistrationStatus.Unknown;
let pendingRequest: Promise<RegistrationStatus> | null = null;

export async function requestRegStatus(): Promise<RegistrationStatus> {
    if (registrationStatus !== RegistrationStatus.Unknown) {
        return registrationStatus;
    }
    // prevent multiple parallel requests from multiple concurrent calls
    if (pendingRequest) {
        return await pendingRequest;
    }
    pendingRequest = rawRequestRegStatus();
    try {
        registrationStatus = await pendingRequest;
        return registrationStatus;
    } finally {
        pendingRequest = null;
    }
}
