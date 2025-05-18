<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/caveat';
	import '@fontsource/shippori-mincho-b1';

	import logo from '$lib/assets/logos/kings-cafe_white.svg';
	import smd_ka_logo from '$lib/assets/logos/smd-ka_modified.svg';
	import smd_logo from '$lib/assets/logos/smd_invers.png';
	import insta from '$lib/assets/logos/insta.svg';
	import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import ifes from '$lib/assets/logos/ifes.png';
	import { headerImageHeight } from '$lib/stores';
	import '/node_modules/flag-icons/css/flag-icons.min.css';
	import { page } from '$app/stores';

	let scrollY: number;
	const navbarHeight = 90;
</script>

<svelte:window bind:scrollY />
<main class="flex min-h-screen flex-col">
	<nav class="sticky top-0 z-50 flex flex-[0_1_auto] flex-col shadow-md">
		<div
			class="{scrollY > $headerImageHeight - navbarHeight
				? 'bg-grey'
				: 'bg-transparent backdrop-blur-lg backdrop-brightness-90'} flex items-center justify-between gap-4 px-4 py-3
				transition-all duration-200
				"
		>
			<a
				class="fond-bold font-mincho flex items-center gap-2 py-2 text-2xl text-white md:basis-full"
				href="/"
			>
				<img class="font-mincho max-h-12" src={logo} alt="SMD Logo" />
				KING's Café
			</a>
			<div class="flex justify-center gap-4 md:basis-full">
				<a
					href="/"
					class="{$page.route.id == '/' ? 'outline outline-2 outline-white' : ''} fi fi-de"
					title="Deutsch"
				>
				</a>
				<a
					href="/en"
					class="{$page.route.id == '/en' ? ' outline outline-2 outline-white' : ''} fi fi-gb"
					title="English"
				></a>
			</div>

			<div class="flex basis-full items-center justify-end gap-4 text-xl text-white max-md:hidden">
				<a class="font-caveat flex items-center gap-2" href="https://smd-karlsruhe.de">
					<p class="-rotate-12">Powered by</p>
					<img class="max-h-7" src={smd_ka_logo} alt="SMD Logo" />
				</a>
			</div>
		</div>

		<div class="bg-primary h-1"></div>
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
						<a href="https://smd-karlsruhe.de/imprint">Impressum</a>
						<a href="https://smd-karlsruhe.de/datenschutz">Datenschutz</a>
						<a href="https://smd-karlsruhe.de/about/kontakt">Kontakt</a>
						<a href="https://smd-karlsruhe.de/about/spenden">Spenden</a>
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

	.underline-a > a:hover {
		text-decoration: underline;
	}
</style>
