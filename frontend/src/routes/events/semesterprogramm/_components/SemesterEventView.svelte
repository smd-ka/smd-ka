<script lang="ts">
	export let events: SemesterEvent[] = [];

	import dayjs from 'dayjs';

	type SemesterEvent = {
		id: string;
		title: string;
		start_date_time: string;
		speaker?: string;
		location: string;
		location_url?: string;
		[key: string]: any;
	};
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
					{#if event.location_url}
						<a href={event.location_url} class="hover:underline">
							{event.location}
						</a>
					{:else}
						<span>
							{event.location}
						</span>
					{/if}
				</div>
			</div>
		</div>
	{/each}
</section>
