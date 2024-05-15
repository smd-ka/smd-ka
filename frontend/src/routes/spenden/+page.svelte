<script lang="ts">
	import header from '$lib/assets/heroshots/karlsruhe_luft.jpeg';
	import Donate from '$lib/components/Donate.svelte';
	import HeroShot from '$lib/components/HeroShot.svelte';
</script>

<HeroShot imgSrc={header} />

<main class="container mx-auto">
	<div class="flex flex-col gap-8 px-4 py-20 xl:px-80">
		<Donate />
	</div>
</main>
