<script lang="ts">
	export let imgSrc: string;
	export let title: string | undefined = undefined;
	export let bgSlogan: string = 'bg-primary';
	export let bgPosition: string = 'bg-[center_top_34%]';
</script>

<div class="relative">
	<span
		class="{bgSlogan} text-grey absolute -bottom-10 right-52 z-10 w-[500px] px-4 py-8 text-center text-4xl font-bold max-md:hidden"
		>Herzlich Willkommen bei der Hochschul-SMD <br />
		<span class="text-white">Karlsruhe</span>
	</span>
	<h1
		class="absolute left-1/2 top-32 z-10 -translate-x-1/2 whitespace-nowrap text-5xl text-white sm:text-6xl md:text-8xl"
	>
		{title || ''}
	</h1>
	<div
		class=" h-96 bg-cover {bgPosition} opacity-90 brightness-105"
		style="background-image: url({imgSrc});"
	/>
	<div class="{bgSlogan} text-grey z-10 px-4 py-8 text-4xl font-bold md:hidden">
		Herzlich Willkommen bei der Hochschul-SMD <br />
		<span class="text-white">Karlsruhe</span>
	</div>
</div>
