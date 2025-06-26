<script lang="ts">
	import { faSearch } from '@fortawesome/free-solid-svg-icons';
	import { _postImages } from '../list/+page';
	import Fa from 'svelte-fa';
	import { PUBLIC_SEMESTER } from '$env/static/public';
	import { convertGDPRtoString } from '$lib/gdpr';

	export let data;
	let filteredList = data.list;
	let search = '';

	function handleSearch(searchTerm: string) {
		if (!filteredList) return;
		searchTerm = searchTerm.toLocaleLowerCase();
		filteredList = data.list.filter((record) => {
			if (searchTerm === '') return true;
			return record.name.toLowerCase().includes(searchTerm);
		});
	}

	$: {
		handleSearch(search);
	}
</script>

<main class="container mx-auto px-4 py-12">
	<div class="grid xl:grid-cols-2">
		<h1 class="max-xl:text-center xl:pb-0">Bildrechte {PUBLIC_SEMESTER}</h1>

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

	<div class="card grid grid-cols-2 divide-y-2 divide-y-reverse">
		<div><b>Name</b></div>
		<b>Bildrechte</b>
		{#each filteredList as item}
			<div>
				{item.name}
			</div>
			<div>
				{convertGDPRtoString(item.gdpr)}
			</div>
		{/each}
	</div>
</main>
