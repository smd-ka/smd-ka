<script lang="ts">
	/** target of the link; acts like the anchor's `href` */
	export let href: string;

	/** opens the link in a new tab when set */
	export let external = false;
</script>

<a
	{href}
	class="flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-white no-underline hover:underline"
	{...external ? { target: '_blank', rel: 'noopener noreferrer' } : {}}
>
	<slot />
</a>

<style>
	a :global(svg) {
		height: 1em;
	}
</style>
