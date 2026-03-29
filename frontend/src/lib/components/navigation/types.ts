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
    routes: NavTabRoute[];
}
