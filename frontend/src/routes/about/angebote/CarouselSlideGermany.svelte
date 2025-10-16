<script lang="ts">
	import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	let {
		image,
		title,
		link,
		children
	} = $props();
</script>

<div class="bg-background-gray border-4 border-white">
	<img src={image} class="h-48 w-full object-cover object-center" alt="Sommerfreizeiten" />
	<a href={link} class="text-primary px-2 py-1 no-underline hover:underline" target="_blank">
		<h3 class="mx-4 flex flex-wrap items-center gap-2">
			{title}
			<Fa class="text-xl" icon={faArrowUpRightFromSquare} />
		</h3>
	</a>
	<p class="px-4 py-2">
		{@render children?.()}
	</p>
</div>
