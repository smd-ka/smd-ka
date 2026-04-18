<script lang="ts">
	export let start: string;
	export let end: string;

	import { onMount } from 'svelte';
	import { pb } from '$lib/pocketbase';
	import dayjs from 'dayjs';

	let events: any[] = [];

	function isStrictIsoDate(value: string): boolean {
		return /^\d{4}-\d{2}-\d{2}$/.test(value);
	}

	onMount(async () => {
		try {
			if (!isStrictIsoDate(start) || !isStrictIsoDate(end)) {
				throw new Error('Invalid date format. Expected YYYY-MM-DD.');
			}
			const records = await pb.collection('calendar').getFullList({
				sort: '+start_date_time',
				filter: `category='smd_abend' && start_date_time >= "${start} 00:00:00" && end_date_time < "${end} 00:00:00"`
			});
			events = records;
		} catch (error) {
			console.error(error);
		}
	});
</script>

<section class="grid gap-x-24 gap-y-6 py-12 xl:grid-cols-2">
	{#each events as event}
		<div class="grid grid-cols-[6rem_1fr] gap-2">
			<h3>
				{dayjs(event.start_date_time).format('DD.MM.')}
			</h3>
			<div>
				<a href={`/events/kalender/${event.id}`} class="hover:underline">
					<h3>
						{event.title}
					</h3>
				</a>
				<div>
					{#if event.speaker}
						<span class="italic">
							{event.speaker}
						</span>
						|
					{/if}
					<a href={event.location_url} class="hover:underline">
						{event.location}
					</a>
				</div>
			</div>
		</div>
	{/each}
</section>
