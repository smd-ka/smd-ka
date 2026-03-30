<script lang="ts">
	import type { NavTab } from '$lib/components/navigation/types';
	import NavbarTab from '$lib/components/navigation/NavbarTab.svelte';
	import NavlistGroup from '$lib/components/navigation/NavlistGroup.svelte';
	import { logout } from '$lib/logout';

	import '../app.css';
	import '@fontsource/anton';
	import '@fontsource-variable/merriweather-sans';
	import '@fontsource/bebas-neue';
	import '@fontsource/zcool-qingke-huangyou';
	import '@fontsource-variable/caveat';
	import '@fontsource/shippori-mincho-b1';

	import logo from '$lib/assets/logos/smd-ka_modified.svg';
	import smd_logo from '$lib/assets/logos/smd_invers.png';
	import {
		faArrowUpRightFromSquare,
		faBars,
		faChevronDown,
		faEnvelope,
		faRightToBracket,
		faX
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		ANY_LOGGED_IN,
		getAvatarUrl,
		pb,
		PRIT_RESPONSABLE,
		REGIOKON_COORDINATOR,
		SAFT_COORDINATOR
	} from '$lib/pocketbase';
	import ifes from '$lib/assets/logos/ifes.png';
	import { page } from '$app/stores';
	import { blur, slide } from 'svelte/transition';
	import { headerImageHeight } from '$lib/stores';
	import { sineInOut } from 'svelte/easing';
	import { faInstagram } from '@fortawesome/free-brands-svg-icons';
	import { onMount } from 'svelte';
	import NavbarProfile from '$lib/components/NavbarProfile.svelte';
	import { click_outside } from '$lib/click_outside';
	import dayjs from 'dayjs';
	import 'dayjs/locale/de';

	dayjs.locale('de');

	let showMenu = false;
	let src = getAvatarUrl();
	let isValid = pb.authStore.isValid;

	pb.authStore.onChange(() => {
		isValid = pb.authStore.isValid;
		src = getAvatarUrl();
	});
	let scrollY: number;
	const navbarHeight = 72;
	let loading = false;

	onMount(() => {
		window.addEventListener('scroll', () => {
			scrollY = window.scrollY;
		});
	});

	const tabs: NavTab[] = [
		{
			name: 'Über uns',
			baseUrl: '/about',
			defaultUrl: '/about/us',
			routes: [
				{
					name: 'Wer wir sind',
					url: '/about/us'
				},
				{
					name: 'Was wir machen',
					url: '/about/angebote'
				},
				{
					name: 'Kontakt',
					url: '/about/kontakt'
				},
				{
					name: 'Spenden',
					url: '/about/spenden'
				}
			]
		},
		{
			name: 'Events',
			baseUrl: '/events',
			defaultUrl: '/events/kalender',
			routes: [
				{
					name: 'Kalender',
					url: '/events/kalender'
				},
				{
					name: 'Semesterprogramm',
					url: '/events/semesterprogramm'
				},
				{
					name: 'SAFT',
					url: '/events/saft'
				}
			]
		},
		{
			name: 'Neu hier?',
			baseUrl: '/new',
			defaultUrl: '/new/erstsemester',
			routes: [
				{
					name: 'Erstsemester',
					url: '/new/erstsemester'
				},
				{
					name: 'Über Karlsruhe',
					url: '/new/karlsruhe'
				},
				{
					name: 'Wohnen',
					url: '/new/wohnen'
				},
				{
					name: 'Gemeinden',
					url: '/new/gemeinden'
				}
			]
		}
	];

	const tabsIntern: NavTab = {
		name: 'Intern',
		baseUrl: '/intern',
		defaultUrl: '/intern',
		permission: ANY_LOGGED_IN,
		routes: [
			{
				name: 'Adressliste',
				url: '/intern/address-list',
				showMobile: true
			},
			{
				name: 'Kalender bearbeiten',
				url: '/intern/kalender',
				showMobile: true
			},
			{
				name: 'Wiki',
				url: 'https://wiki.smd-karlsruhe.de',
				extern: true,
				showMobile: true
			},
			{
				name: 'Cloud',
				url: 'https://cloud.smd-karlsruhe.de/apps/user_oidc/login/1',
				extern: true,
				showMobile: true
			},
			{
				name: 'Mastersheet',
				url: 'https://docs.google.com/spreadsheets/d/1elIUUx3LKdrvCmuGbXDzUgSeF2iMWq7bZRdVswGHLYM/edit?usp=sharing',
				extern: true,
				showMobile: false
			},
			{
				name: 'Mitarbeiter Portal',
				url: 'https://portal.smd.org/start',
				extern: true,
				showMobile: false
			},
			{
				name: 'Allergie-Liste',
				url: '/intern/allergy-list',
				showMobile: false
			},
			{
				name: 'Gebetsbox',
				url: '/intern/gebetsbox',
				showMobile: false
			},
			{
				name: 'SAFT Anmeldungen',
				url: '/intern/saft/list',
				showMobile: false,
				permission: SAFT_COORDINATOR
			},
			{
				name: 'SAFT PRIT',
				url: '/intern/saft/prit',
				showMobile: false,
				permission: PRIT_RESPONSABLE
			},
			{
				name: 'Regiokon Anmeldungen',
				url: '/intern/regiokon/list',
				showMobile: false,
				permission: REGIOKON_COORDINATOR
			},
			{
				name: 'Ausloggen',
				action: logout,
				showDesktop: false,
				showMobile: true
			}
		]
	};
</script>

<svelte:window bind:scrollY />
<main class="flex min-h-screen flex-col">
	<nav class="border-primary sticky top-0 z-50 flex flex-[0_1_auto] flex-col border-b-4 shadow-md">
		<div
			class="{scrollY > $headerImageHeight - navbarHeight
				? 'bg-grey'
				: 'bg-transparent backdrop-blur-lg backdrop-brightness-90'} flex items-center justify-between gap-4 px-4 transition-all
				duration-200 max-lg:py-3
				"
		>
			<div class="flex items-center gap-2 text-white lg:hidden">
				<button
					class="text-3xl md:text-4xl"
					on:click|stopPropagation={() => (showMenu = !showMenu)}
				>
					{#if showMenu}
						<div in:blur>
							<Fa class="w-6" icon={faX} />
						</div>
					{:else}
						<div in:blur>
							<Fa class="w-6" icon={faBars} />
						</div>
					{/if}
				</button>
			</div>

			<a class=" py-2" on:click={() => (showMenu = false)} href="/">
				<img class="max-h-7" src={logo} alt="SMD Logo" />
			</a>
			<!-- Pseudo Element to center logo -->
			<div></div>

			<div class="flex items-center gap-4 text-xl text-white max-lg:hidden">
				{#each tabs as tab}
					<NavbarTab {tab} />
				{/each}
				<NavbarTab tab={tabsIntern} />

				<a class="hover:text-primary" href="https://kings-cafe.de">International</a>

				<div>
					<NavbarProfile />
				</div>
			</div>
		</div>

		{#if showMenu}
			<nav
				use:click_outside
				on:outsideclick={() => (showMenu = false)}
				transition:slide={{ duration: 200, easing: sineInOut }}
				class="mobile-nav-height bg-grey absolute top-0 z-0 mt-[4.5rem] w-fit max-w-full overflow-scroll p-4 pb-8 text-gray-300 lg:hidden"
			>
				{#if isValid}
					<NavlistGroup tab={tabsIntern} bind:showMenu />
					<div class="bg-primary my-2 h-0.5"></div>
				{/if}

				{#each tabs as tab}
					<NavlistGroup {tab} bind:showMenu />
				{/each}
				<div class="bg-primary my-2 h-0.5"></div>

				<h3 class=" text-white">
					<a class="flex items-center gap-2" href="https://kings-cafe.de">
						International
						<Fa class="text-xl" icon={faArrowUpRightFromSquare} />
					</a>
				</h3>
				{#if !isValid}
					<button on:click={() => (showMenu = false)}>
						<h3 class="text-white">
							<a class="flex items-center gap-2" href="/intern">
								Anmelden
								<Fa icon={faRightToBracket} />
							</a>
						</h3>
					</button>
				{/if}
			</nav>
		{/if}
	</nav>

	<!-- -------- begin content --------- -->

	<div class=" flex-[1_1_auto]">
		<slot />
	</div>

	<!-- -------- begin footer --------- -->

	<footer class="flex-[0_1_auto]">
		<div class="bg-grey text-gray-200">
			<div class="container mx-auto px-4 py-20 xl:px-40">
				<div class="grid justify-center gap-20 md:grid-cols-2">
					<section class="flex flex-col gap-4">
						<h2 class="text-primary text-xl uppercase">Unser Netzwerk</h2>
						<div class="grid grid-cols-[5rem_1fr] gap-4">
							<a href="https://smd.org" target="_blank">
								<img src={smd_logo} alt="SMD Logo" class="" />
							</a>
							<p>
								Die Hochschul-SMD Karlsruhe gehört zur Hochschul-SMD, einem deutschlandweiten
								Netzwerk christlicher Hochschulgruppen.
							</p>

							<a href="https://ifesworld.org" target="_blank">
								<img src={ifes} alt="IFES Logo" class="w-32" />
							</a>
							<p>
								We are part of IFES, a global movement of students sharing and living out the good
								news of Jesus Christ.
							</p>
						</div>
					</section>

					<section class="underline-a flex flex-col gap-3">
						<h2 class="text-primary text-xl uppercase">Andere Gruppen</h2>
						<a href="https://www.sfc-karlsruhe.de">SfC - Studierende für Christus</a>
						<a href="https://esg-karlsruhe.de/">ESG - Evangelische Studierendengemeinde</a>
						<a href="https://www.khg-karlsruhe.de/">KHG - Katholische Hochschulgemeinde</a>
						<a href="https://feg-karlsruhe.de/de/erwachsene/mittendrin/">FeG - Mittendrin</a>
					</section>
				</div>

				<section
					class="mt-16 grid grid-cols-[1fr_6rem] border-t-[1px] border-[#BEBEBE] py-3 max-md:flex-col"
				>
					<div class="underline-a flex flex-wrap pt-1 max-md:flex-col md:gap-8">
						<a href="/imprint">Impressum</a>
						<a href="/privacy">Datenschutz</a>
						<a href="/about/kontakt">Kontakt</a>
						<a href="/about/spenden">Spenden</a>
						<a href="https://wiki.smd-karlsruhe.de">Wiki</a>
					</div>

					<div class="flex gap-4 max-md:flex-col max-md:items-end md:items-center md:justify-end">
						<a
							href="https://www.instagram.com/smd_karlsruhe/"
							class="flex items-center gap-4 text-3xl"
						>
							<Fa icon={faInstagram} />
						</a>
						<a class="pr-1 text-3xl" href="mailto:leiter@smd-karlsruhe.de">
							<Fa icon={faEnvelope} />
						</a>
					</div>
				</section>
			</div>
		</div>
	</footer>
</main>

<style>
	a {
		@apply no-underline;
	}

	h3 {
		@apply font-normal;
	}

	.underline-a > a:hover {
		text-decoration: underline;
	}

	.mobile-nav-height {
		height: calc(100vh - 4.5rem);
	}
</style>
