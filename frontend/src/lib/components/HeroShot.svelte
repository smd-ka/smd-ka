<script lang="ts">
	export let imgSrc: string;
	export let title: string | undefined = undefined;
	export let bgPosition: string = 'bg-[center_top_34%]';
</script>

<div class="relative">
	<h1
		class="absolute left-1/2 top-32 z-10 -translate-x-1/2 whitespace-nowrap text-5xl text-white sm:text-6xl md:text-7xl"
	>
		{title || ''}
	</h1>
	<div class="h-96 bg-cover max-md:h-52 {bgPosition} " style="background-image: url({imgSrc});" />
</div>
