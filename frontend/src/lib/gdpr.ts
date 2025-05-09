export type GDPR = 'yes' | 'no_instagram' | 'no_website' | 'never';

export const convertGDPRtoString = (gdpr: GDPR): string => {
	switch (gdpr) {
		case 'yes':
			return 'Ihr dürft Bilder von mir veröffentlichen. (Instagram, Webseite, Flyer, ...)';
		case 'no_instagram':
			return 'Ihr dürft Bilder von mir veröffentlichen, aber nicht auf Instagram.';
		case 'no_website':
			return 'Ihr dürft Bilder von mir veröffentlichen, aber nicht auf der Webseite.';
		case 'never':
			return 'Ihr dürft keine Bilder von mir veröffentlichen.';
	}
};
