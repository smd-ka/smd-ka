type LocationInfo = {
	name: string,
	url: string,
	isCafe: boolean,
	pros: string[],
};

export const Locations: LocationInfo[] = [
	{
		name: 'Oxford Pub',
		url: 'https://maps.app.goo.gl/ZAv8JF2UQCbBC7iNA',
		isCafe: false,
		pros: [
			'Lecker und günstig',
			'Super nah am KIT',
			'Bekannt für gute Burger',
			'Über 100 Biersorten',
			'So richtige pub vibes'
		]
	},
	{
		name: 'Café Wohnzimmer',
		url: 'https://maps.app.goo.gl/KGGCHYAdKRErAeEi9',
		isCafe: true,
		pros: [
			'In unmittelbarer KIT-Nähe',
			'Macht seinem Namen alle Ehre',
			'Explizit glutenfreie Kuchen',
			'Auch zum Mitnehmen'
		]
	},
	{
		name: 'Café Bleu',
		url: 'https://maps.app.goo.gl/piRfuJ7n3KyvZPwC8',
		isCafe: false,
		pros: [
			'Entgegen des Namens kein Café, sondern tatsächlich ein Restaurant',
			'Zentral am Mühlburger Tor',
			'Studentenfreundliche Preise und lecker',
			'Netter Biergarten'
		]
	},
	{
		name: 'Iaro',
		url: 'https://maps.app.goo.gl/kS7Aq1PcCemoYoEy9',
		isCafe: true,
		pros: [
			'KIT-Nähe; Karl-Wilhelm-Platz',
			'Minimalistische Ästhetik',
			'Hauseigene Produkte',
			'Bieten Workshops zu Latte Art und als Barista ein',
			'Gibts auch in der Weststadt (Sophienstraße)'
		]
	},
	{
		name: 'Kim Fat',
		url: 'https://maps.app.goo.gl/8mqb3caoun7Ggq2M9',
		isCafe: false,
		pros: [
			'Günstig',
			'Direkt am Zirkel',
			'Chinesische, thailändische und vietnamesische Gerichte',
			'Klein und fein, betrieben nur von einem Ehepaar'
		]
	},
	{
		name: 'Berry Su',
		url: 'https://maps.app.goo.gl/MzZo7Xs8q3iipk2x5',
		isCafe: true,
		pros: [
			'Coole Specials je nach Jahreszeit',
			'Super leckerer Kuchen',
			'Zentral, Kaiserstraße'
		]
	},
	{
		name: "L'Osteria",
		url: 'https://maps.app.goo.gl/9F7jtu93P8AcL5yeA',
		isCafe: false,
		pros: [
			'Günstig, Italienisch',
			'Sehr große Pizzen',
			'Zentral, direkt beim Marktplatz'
		]
	},
	{
		name: 'Yollie - The Popice Café',
		url: 'https://maps.app.goo.gl/yBLWhJtX4yeYAos76',
		isCafe: true,
		pros: [
			'Innenstadt: Waldstraße',
			'die Waffeln sind zu empfehlen',
			'Etwas teurer, aber lecker',
			'Boho Stil'
		]
	},
	{
		name: 'El Taquito',
		url: 'https://maps.app.goo.gl/oVWvYWyqUF8c3Nod9',
		isCafe: false,
		pros: [
			'Innenstadt; Passagenhof',
			'Verschiedene mexikanische Gerichte',
			'Super lecker'
		]
	},
	{
		name: 'Café Mats',
		url: 'https://maps.app.goo.gl/SpVfubUshfwnQ7fn6',
		isCafe: true,
		pros: [
			'Liebevoll gestaltete Produkte',
			'(Fast) alles hausgemacht',
			'Sehr gut für Teeliebhaber'
		]
	}
];
