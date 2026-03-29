export interface NavTabRoute {
    name: string;
    url: string;
    showMobile?: boolean;
    extern?: boolean;
    permission?: string;
}

export interface NavTab {
    name: string;
    baseUrl: string;
    defaultUrl?: string;
    routes: NavTabRoute[];
}
