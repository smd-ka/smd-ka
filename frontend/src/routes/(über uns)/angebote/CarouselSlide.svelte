<script lang="ts">
	import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { sineInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	export let src;
	export let title;
	export let subtitle;

	let showSlide = false;

	const toggleShow = () => (showSlide = !showSlide);
</script>

<div>
	<div class="relative h-[50svh] xl:h-[76svh]">
		<img {src} class="h-full w-full object-cover object-center brightness-90" alt="Angebote" />
		<div class="pad absolute top-1/3 grid w-full justify-center">
			<div class=" grid justify-items-center text-center text-white backdrop-filter">
				<h1 class="pb-0">{title}</h1>
				<p class="font-caveat text-xl md:text-3xl">{subtitle}</p>
				<button on:click={toggleShow} class="flex items-center gap-2 self-center">
					{#if showSlide}
						<div>Beschreibung ausblenden</div>
						<Fa icon={faArrowUp} />
					{:else}
						<div>Mehr erfahren</div>
						<Fa icon={faArrowDown} />
					{/if}
				</button>
			</div>
			<div>
				{#if showSlide}
					<div
						transition:fade={{ duration: 200, easing: sineInOut }}
						class="rounded-md bg-black bg-opacity-80 p-4 text-white backdrop-filter max-md:hidden xl:mx-60"
					>
						<p><slot /></p>
					</div>
				{/if}
			</div>
		</div>
	</div>
	{#if showSlide}
		<div
			transition:fade={{ duration: 200, easing: sineInOut }}
			class="pad bg-grey p-4 text-white md:hidden"
		>
			<p>
				<slot />
			</p>
		</div>
	{/if}
</div>
