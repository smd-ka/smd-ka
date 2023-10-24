<script lang="ts">
	import type { User } from '$lib/models';
	import { pb } from '$lib/pocketbase';
	import type { ListResult } from 'pocketbase';
	import { onMount } from 'svelte';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';

	let result: ListResult<User>;

	onMount(async () => {
		result = await pb.collection('users').getList();
	});
</script>

<main class="container mx-auto flex flex-col gap-4">
	<div class="card">
		<h1>Adressbuch</h1>
		<p></p>
	</div>

	<div class="card">
		{#if result}
			{#each result.items as user}
				<div>
					<h2>{user.name}</h2>
					<p>{user.email}</p>
					<p>{user.phonenumber}</p>
					<p>{user.address}</p>
					<p>{user.anniversary}</p>
				</div>
			{/each}
		{:else}
			<div class=" flex justify-center">
				<img src={loadingSpinner} alt="Lädt ..." />
			</div>
		{/if}
	</div>
</main>
