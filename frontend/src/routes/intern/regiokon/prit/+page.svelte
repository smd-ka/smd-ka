<script lang="ts">
	import { faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';
	import { _postImages } from '../list/+page';
	import Fa from 'svelte-fa';
	import { PUBLIC_SEMESTER } from '$env/static/public';

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

<nav class="container mx-auto px-4 py-4">
	<ol class="inline-flex list-none">
		<li class="flex items-center">
			<a class="!no-underline" href="/intern">Intern</a>
			<Fa icon={faChevronRight} class="mx-2" />
		</li>
		<li class="flex items-center">
			<a class="!no-underline" href="/intern/regiokon/prit">PRIT Regiokon</a>
		</li>
	</ol>
</nav>

<main class="container mx-auto px-4">
	<div class="grid md:flex md:justify-between">
		<h3 class="max-md:text-center">Bildrechte Regiokon</h3>
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

	<div class="grid xl:grid-cols-2"></div>
	<div class="grid grid-cols-3 divide-y-2 divide-y-reverse">
		<b>Name</b>
		<b>Bildrechte</b>
		<b>Widerrufen</b>

		{#each filteredList as item}
			<div>
				{item.name}
				{item.surname}
			</div>
			<div>
				{_postImages(item.permission)}
			</div>
			<div>
				{item.revoked ? 'Ja' : 'Nein'}
			</div>
		{/each}
	</div>
</main>
