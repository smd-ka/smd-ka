<script lang="ts">
	import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { page } from '$app/stores';
	import { getAvatarUrl, pb } from '$lib/pocketbase';
	import { logout } from '$lib/logout';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';

	let isValid = pb.authStore.isValid;
	let src = getAvatarUrl();
	let loading = false;

	pb.authStore.onChange(() => {
		isValid = pb.authStore.isValid;
		src = getAvatarUrl();
	});
</script>

{#if isValid}
	{#if !loading}
		<img
			class="peer h-10 w-10 rounded-full border-2 border-gray-400 object-cover"
			{src}
			alt="user avatar"
		/>
	{:else}
		<img class="h-10 w-10" src={loadingSpinner} alt="loading spinner" />
	{/if}

	<div class="bg-primary absolute right-0 hidden justify-center hover:grid peer-hover:grid">
		<a class="menu-link" href="/intern">Dashboard</a>
		<a class="menu-link" href="/intern/profile">Profil</a>

		<button
			class="menu-link"
			on:click={async () => {
				loading = true;
				await logout();
				loading = false;
			}}
		>
			Ausloggen
		</button>
	</div>
{:else}
	<a href="/account/login" title="Anmelden">
		<Fa
			class={$page.url.pathname.match('account/login') ? 'text-primary' : 'hover:text-primary'}
			icon={faRightToBracket}
		/>
	</a>
{/if}

<style>
	.menu-link {
		@apply px-4 py-2 hover:bg-gray-100 hover:text-black;
	}
</style>
