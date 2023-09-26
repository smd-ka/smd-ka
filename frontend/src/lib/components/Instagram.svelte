<script>
	import { onMount } from 'svelte';

	onMount(() => {
		const script = document.createElement('script');
		script.src = 'https://apps.elfsight.com/p/platform.js';
		script.async = true;
		script.defer = true;
		document.body.appendChild(script);

		const link = document.getElementsByTagName('a');
	});
</script>

<div class="relative">
	<div class="elfsight-app-8ee267ab-3ccc-4953-ab2a-f27a74f11d94 z-0"></div>
	<div class="absolute bottom-20 z-50 h-14 w-full bg-white"></div>
</div>
