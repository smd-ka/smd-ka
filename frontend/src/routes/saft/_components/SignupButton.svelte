<!-- hint: this button might also be included from pages outside this path -->
<script lang="ts">
	export let href: string = '/saft/signup';
	let classes: string = 'pointer mt-4 w-fit bg-black p-4 text-white';
	export { classes as class };
	// only show when actually open (even not while loading)
	export let raw: boolean = false;

	// API lib
	import { onMount } from 'svelte';
	import {
		RegistrationStatus,
		type RegistrationStatus,
		requestRegStatus
	} from '$lib/saftRegistrationApi';
	// components
	import MessageAfterwards from './MessageAfterwards.svelte';
	import MessageClosed from './MessageClosed.svelte';

	let status: RegistrationStatus = RegistrationStatus.Unknown;

	onMount(async () => {
		status = await requestRegStatus();
	});
</script>

{#if raw}
	{#if status === RegistrationStatus.Open}
		<slot />
	{/if}
{:else if status === RegistrationStatus.Closed}
	<MessageClosed />
{:else if status === RegistrationStatus.Afterwards}
	<MessageAfterwards />
{:else}
	<!-- if we are unsure here, its better invite people to the registration page, where the check will be more restrictive -->
	<a {href} class={classes}><slot /></a>
{/if}
