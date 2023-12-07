<script lang="ts">
	export let imgSrc: string;
	export let title: string | undefined = undefined;
	export let bgSlogan: string = 'bg-primary';
	export let bgPosition: string = 'bg-[center_top_34%]';
</script>

<div class="relative">
	<span
		class="{bgSlogan} absolute right-0 top-64 z-10 bg-opacity-90 px-4 py-4 text-center text-2xl text-white md:top-60 lg:py-8 lg:text-4xl"
		>Denken. Glauben. Erleben.</span
	>
	<h1
		class="absolute left-1/2 top-32 z-10 -translate-x-1/2 whitespace-nowrap text-5xl text-white sm:text-6xl md:text-8xl"
	>
		{title || ''}
	</h1>
	<div
		class=" h-96 bg-cover {bgPosition} opacity-90 brightness-105"
		style="background-image: url({imgSrc});"
	/>
</div>
