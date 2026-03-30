import { userMayAccess, type MaybeModel, type RoleGuarded } from "$lib/pocketbase";

export type NavRouteAction = () => Promise<unknown> | unknown;

export interface NavTabRoute extends RoleGuarded {
    name: string;
    url?: string;
    action?: NavRouteAction;
    showMobile?: boolean;
    extern?: boolean;
}

export interface NavTab extends RoleGuarded {
    name: string;
    baseUrl: string;
    defaultUrl?: string;
    routes: NavTabRoute[];
}

// full variants have most attributes defined
// should only be used for actually rendering those

export interface FullNavTabRoute extends NavTabRoute {
    showMobile: boolean;
    extern: boolean;
}

export interface FullNavTab extends NavTab {
    routes: FullNavTabRoute[];
}

function inferNavTabRoute(user: MaybeModel, route: NavTabRoute): FullNavTabRoute | null {
    if (!userMayAccess(user, route))
        return null;
    return {
        showMobile: true,
        extern: route.url ? !route.url.startsWith('/') : false,
        ...route,  // order important
    }
}

/**
 * @returns null if the user may not access this tab
 */
export function inferNavTab(user: MaybeModel, tab: NavTab): FullNavTab | null {
    if (!userMayAccess(user, tab))
        return null;
    return {
        ...tab,  // order important
        routes: tab.routes.map((r) => inferNavTabRoute(user, r)).filter((r) => r !== null)
    };
}
