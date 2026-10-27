<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';
	import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let id: string;
	export let checked: boolean;

	// lambda s.t. exception is thrown through
	/** performs the actual save; must reject on failure */
	export let update: (id: string, paid: boolean) => Promise<unknown>;

	const dispatch = createEventDispatcher<{
		error: { id: string };
		resolved: { id: string };
	}>();

	let loading = false;
	let hasError = false;

	async function onChange() {
		if (loading) return;
		loading = true;
		hasError = false;
		try {
			await update(id, checked);
			dispatch('resolved', { id });
		} catch (e) {
			console.error(e);
			hasError = true;
			dispatch('error', { id });
			checked = !checked; // revert
		} finally {
			loading = false;
		}
	}
</script>

<div class="flex items-start gap-4 py-1">
	<input disabled={loading} bind:checked={checked} on:change={onChange} type="checkbox" />
	{#if loading}
		<img class="h-4 w-4" src={loadingSpinner} alt="loading" />
	{:else if hasError}
		<Fa class="text-red-700" icon={faExclamationTriangle} />
	{/if}
</div>
