<script lang="ts">
	import { run } from 'svelte/legacy';

	import { faSearch } from '@fortawesome/free-solid-svg-icons';
	import { _postImages } from '../list/+page';
	import Fa from 'svelte-fa';
	import { PUBLIC_SEMESTER } from '$env/static/public';

	let { data } = $props();
	let filteredList = $state(data.list);
	let search = $state('');

	function handleSearch(searchTerm: string) {
		if (!filteredList) return;
		searchTerm = searchTerm.toLocaleLowerCase();
		filteredList = data.list.filter((record) => {
			if (searchTerm === '') return true;
			return record.name.toLowerCase().includes(searchTerm);
		});
	}

	run(() => {
		handleSearch(search);
	});
</script>

<main class="container mx-auto my-6 px-4">
	<div class="grid xl:grid-cols-2">
		<h1 class="xl:pb-0">Bildrechte SAFT {PUBLIC_SEMESTER}</h1>
		<div class="relative flex gap-2 px-4 pb-4">
			<Fa class="absolute left-8 top-3 text-2xl" icon={faSearch} />
			<input
				bind:value={search}
				class="backdrop: w-full rounded-full border-2 border-black p-2 pl-14"
				placeholder="Suche"
				type="text"
			/>
		</div>
	</div>
	<div class="grid grid-cols-2 divide-y-2 divide-y-reverse">
		<div><b>Name</b></div>
		<b>Bildrechte</b>
		{#each filteredList as item}
			<div>
				{item.name}
			</div>
			<div>
				{_postImages(item.post_images)}
			</div>
		{/each}
	</div>
</main>
