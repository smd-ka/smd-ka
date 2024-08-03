<script lang="ts">
	import '../app.css';
	import '@fontsource/anton';
	import '@fontsource-variable/merriweather-sans';
	import '@fontsource/bebas-neue';
	import '@fontsource/zcool-qingke-huangyou';
	import '@fontsource-variable/caveat';
	import '@fontsource/shippori-mincho-b1';

	import logo from '$lib/assets/logos/smd-ka_modified.svg';
	import smd_logo from '$lib/assets/logos/smd_invers.png';
	import insta from '$lib/assets/logos/insta.svg';
	import {
		faArrowRight,
		faArrowUpRightFromSquare,
		faBars,
		faChevronDown,
		faEnvelope,
		faRightToBracket,
		faX
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { getAvatarUrl, pb } from '$lib/pocketbase';
	import ifes from '$lib/assets/logos/ifes.png';
	import { page } from '$app/stores';
	import { blur, slide } from 'svelte/transition';
	import { headerImageHeight } from '$lib/stores';
	import { sineInOut } from 'svelte/easing';

	let showMenu = false;
	let src = getAvatarUrl();
	let isValid = pb.authStore.isValid;

	pb.authStore.onChange(() => {
		isValid = pb.authStore.isValid;
		src = getAvatarUrl();
	});
	let scrollY: number;
	const navbarHeight = 70;

	const tabs = [
		{
			name: 'Über uns',
			routes: [
				{
					name: 'Wer wir sind',
					url: '/about/us'
				},
				// {
				// 	name: 'Was wir machen',
				// 	url: '/about/angebote'
				// },
				{
					name: 'Mitarbeiten',
					url: '/about/mitarbeiten'
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
			routes: [
				// {
				// 	name: 'Kalender',
				// 	url: '/events'
				// },
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
				}
			]
		}
	];
</script>

<svelte:window bind:scrollY />
<main class="flex min-h-screen flex-col">
	<nav class=" sticky top-0 z-50 flex flex-[0_1_auto] flex-col shadow-md">
		<div
			class="{scrollY > $headerImageHeight - navbarHeight
				? 'bg-grey'
				: 'bg-transparent backdrop-blur-lg backdrop-brightness-90'} flex items-center justify-between gap-4 px-4 py-3 transition-all
				duration-200
				"
		>
			<a class=" py-2" href="/">
				<img class="max-h-7" src={logo} alt="SMD Logo" />
			</a>

			<div class="flex items-center gap-4 text-xl text-white max-lg:hidden">
				{#each tabs as tab}
					<div>
						<span class="CategoryTitle peer">
							{tab.name}
							<Fa class="text-lg" icon={faChevronDown}></Fa>
						</span>
						<div class="CategoryLinkList">
							{#each tab.routes as route}
								<a href={route.url}>{route.name}</a>
							{/each}
						</div>
					</div>
				{/each}

				<a href="https://kings-cafe.de">International</a>

				<a class=" self-center" href="/intern">
					{#if isValid}
						<img
							class="h-10 w-10 rounded-full border-2 border-gray-400 object-cover"
							{src}
							alt="user avatar"
						/>
					{:else}
						<Fa
							class={$page.url.pathname.match('account/login')
								? 'text-primary'
								: 'hover:text-primary'}
							icon={faRightToBracket}
						/>
					{/if}
				</a>
			</div>

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
		</div>

		<div class="bg-primary h-1"></div>

		{#if showMenu}
			<div
				transition:slide={{ duration: 200, easing: sineInOut }}
				on:click={() => (showMenu = false)}
				class="flex h-[100svh] flex-col gap-4 pt-12 text-center text-3xl text-white backdrop-blur-xl backdrop-brightness-50 lg:hidden"
			>
				{#each tabs as tab}
					<div>
						<span class="text-primary">
							{tab.name}
						</span>
						<div class="flex flex-col text-xl">
							{#each tab.routes as route}
								<div class="flex items-center justify-center gap-2">
									<Fa icon={faArrowRight} />
									<a href={route.url}>{route.name}</a>
								</div>
							{/each}
						</div>
					</div>
				{/each}

				<a href="https://kings-cafe.de">
					<div class="flex items-center justify-center gap-2">
						International
						<Fa class="text-xl" icon={faArrowUpRightFromSquare} />
					</div>
				</a>
				<a class="self-center" href="/intern">
					<Fa icon={faRightToBracket} />
				</a>
			</div>
		{/if}
	</nav>

	{#if isValid}
		<div class="fixed bottom-4 left-4 z-10 lg:hidden">
			<a href="/intern">
				<img class="h-14 w-14 rounded-full border object-cover" {src} alt="user avatar" />
			</a>
		</div>
	{/if}

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
								Netzwerk Christlicher Hochschulgruppen.
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
						<a href="https://www.instagram.com/smd_karlsruhe/" class="flex items-center gap-4">
							<img src={insta} alt="Instagram Logo" class="w-10" />
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

	.CategoryLinkList {
		@apply bg-primary absolute hidden justify-center gap-4 px-4 py-2 hover:grid peer-hover:grid;
	}
	.CategoryLinkList > a {
		@apply hover:text-primary-text;
	}

	.CategoryTitle {
		@apply hover:text-primary flex items-center gap-2 hover:cursor-pointer;
	}

	.underline-a > a:hover {
		text-decoration: underline;
	}
</style>
