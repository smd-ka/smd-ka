<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { pb } from '$lib/pocketbase';
</script>

<main class="flex justify-center">
	<form
		class=" bg-white p-4 mt-24 flex flex-col gap-4 rounded-md shadow-md w-80"
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				pb.authStore.loadFromCookie(document.cookie);
				await applyAction(result);
			};
		}}
	>
		<!-- TODO fix styling on inputs! -->
		<h1 class="text-2xl text-center py-5">Hauskreistool Login</h1>
		<div class="relative">
			<input
				class="peer border-2 p-2 rounded-md"
				type="email"
				name="email"
				placeholder="E-Mail-Adresse"
			/>
			<label
				for="email"
				class="absolute px-1 -top-2.5 left-3 text-[#555555] bg-white peer-placeholder-shown:opacity-0 opacity-100 transition-all duration-100"
			>
				Passwort
			</label>
		</div>
		<div class="relative">
			<input
				class="peer border-2 p-2 rounded-md"
				type="password"
				name="password"
				placeholder="Passwort"
			/>
			<label
				for="password"
				class="absolute px-1 -top-2.5 left-3 text-[#555555] bg-white peer-placeholder-shown:opacity-0 opacity-100 transition-all duration-100"
			>
				Passwort
			</label>
		</div>
		<!-- </div> -->
		<button class="bg-purple text-white py-2 rounded-md">Log in</button>
	</form>
</main>
