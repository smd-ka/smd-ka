<script lang="ts">
	import '../app.css';
	import { applyAction, enhance } from '$app/forms';
	import { pb } from '$lib/pocketbase';
	import { currentUser } from '$lib/pocketbase';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/index';
</script>

<nav class=" bg-cerulean text-white text-xl">
	<div class="container mx-auto">
		<div class=" flex justify-between">
			<!-- left list of links -->
			<div class="flex gap-4">
				<a href="/" class="hover:bg-curulean-dark p-4">Home</a>
			</div>

			<!-- right list of links -->
			<div class="flex gap-4">
				{#if $currentUser}
					<form
						class="self-center"
						method="POST"
						action="/logout"
						use:enhance={() => {
							return async ({ result }) => {
								pb.authStore.clear();
								await applyAction(result);
							};
						}}
					>
						<button class="flex align-middle gap-1 hover:bg-curulean-dark p-4" type="submit">
							<Fa class="self-center" icon={faRightFromBracket} />
							Logout</button
						>
					</form>
				{:else}
					<a href="/login" class="hover:bg-curulean-dark p-4">Login</a>
					<a href="/register" class="hover:bg-curulean-dark p-4">Registierung</a>
				{/if}
			</div>
		</div>
	</div>
</nav>
<!-- <div class="bg-neutral text-neutral-content">
	<div class="max-w-xl mx-auto navbar">
		<div class="navbar-start">
			<a href="/" class="btn btn-ghost text-xl">PB + SK</a>
		</div>
		<div class="navbar-end">
			<ul class="menu menu-horizontal">
				{#if $currentUser}
					<li><a href="/">{$currentUser.email}</a></li>
					<li>
						<form
							method="POST"
							action="/logout"
							use:enhance={() => {
								return async ({ result }) => {
									pb.authStore.clear();
									await applyAction(result);
								};
							}}
						>
							<button>Log out</button>
						</form>
					</li>
				{:else}
					<li><a href="/login">Log in</a></li>
					<li><a href="/register">Register</a></li>
				{/if}
			</ul>
		</div>
	</div>
</div> -->

<slot />
