import type { RoleGuarded } from "$lib/pocketbase";

export interface NavTabRoute extends RoleGuarded {
    name: string;
    url: string;
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

function inferNavTabRoute(route: NavTabRoute): FullNavTabRoute {
    return {
        showMobile: true,
        extern: !route.url.startsWith('/'),
        ...route,  // order important
    }
}

export function inferNavTab(tab: NavTab): FullNavTab {
    return {
        ...tab,  // order important
        routes: tab.routes.map(inferNavTabRoute)
    };
}
