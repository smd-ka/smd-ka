import type { Role } from "$lib/pocketbase";

export interface NavTabRoute {
    name: string;
    url: string;
    showMobile?: boolean;
    extern?: boolean;
    permission?: Role;
}

export interface NavTab {
    name: string;
    baseUrl: string;
    defaultUrl?: string;
    permission?: Role;
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
