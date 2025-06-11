<script lang="ts">
	import Fa from 'svelte-fa';
	import type { PageData } from '../$types';
	import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import AddEventForm from './addEventForm.svelte';
	import EditEventForm from './editEventForm.svelte';
	import dayjs from 'dayjs';
	import { _eventStore, type CalendarEvent } from './+page';

	let shownEvent: CalendarEvent | undefined = undefined;
	let loading = false;
	let updated = false;

	// onMount(() => {
	// 	_eventStore.subscribe((events) => {
	// 		if (events.length === 0) {
	// 			shownEvent = undefined;
	// 			return;
	// 		}
	// 		shownEvent = events[0]; // Set the first event as the shown event by default
	// 	});
	// });

	const getDateString = (startDateString: string, endDateString: string) => {
		if (!endDateString) {
			return dayjs(startDateString).format('DD.MM.YYYY HH:mm');
		}
		if (dayjs(startDateString).isSame(dayjs(endDateString), 'day')) {
			return `${dayjs(startDateString).format('DD.MM HH:mm')} - ${dayjs(endDateString).format('HH:mm')}`;
		}
		return `${dayjs(startDateString).format('DD.MM.YYYY HH:mm')} - ${dayjs(endDateString).format('DD.MM.YYYY HH:mm')}`;
	};

	function onChangeEventSelection(event: CalendarEvent) {
		shownEvent = event;
		updated = false;
	}
</script>

<nav class="container mx-auto flex justify-between px-4 py-4">
	<ol class="inline-flex list-none">
		<li class="flex items-center">
			<a class="!no-underline" href="/intern">Intern</a>
			<Fa icon={faChevronRight} class="mx-2" />
		</li>
		<li class="flex items-center">
			<a class="!no-underline" href="/intern/kalender">Kalender bearbeiten</a>
		</li>
	</ol>
	<button on:click={() => (shownEvent = undefined)} class="bg-primary fa rounded-md p-2 text-white">
		<Fa icon={faPlus}></Fa>
		<span class="max-md:hidden"> Event hinzufügen </span>
	</button>
</nav>

{#if !$_eventStore}
	<p>loadingSpinner</p>
{:else}
	<main class="container mx-auto px-4 pb-8">
		<div></div>

		<div class="grid gap-4 rounded-lg lg:grid-cols-[32rem_1fr]">
			<section class="h-[82svh] overflow-y-auto overflow-x-hidden text-ellipsis max-lg:h-64">
				<div class="mr-1 grid gap-2">
					{#each $_eventStore as event}
						<div class="rounded-md bg-white p-4 shadow-md">
							<button
								on:click={() => onChangeEventSelection(event)}
								disabled={loading}
								class="overflow-hidden text-ellipsis py-2 text-left"
							>
								<b class="{shownEvent?.id === event.id ? 'text-primary underline' : ''}  "
									>{event.title}
								</b>
								<div>
									{getDateString(event.start_date_time, event.end_date_time)} +++
									{event.location}
								</div>
							</button>
						</div>
					{/each}
				</div>
			</section>
			<div class="h-0.5 bg-black md:hidden"></div>
			<section
				class="overflow-y-auto overflow-x-hidden rounded-md bg-white p-4 shadow-md lg:h-[82svh]"
			>
				<p class="rounded-md bg-gray-200 text-center">
					Übersetzung wird aktuell nur auf der Kings-Café-Seite angezeigt! Übersetzung ist aber auch
					für die Hauptseite geplant.
				</p>
				{#if !shownEvent}
					<AddEventForm />
				{:else}
					<EditEventForm {shownEvent} bind:loading bind:updated />
				{/if}
			</section>
		</div>
	</main>
{/if}
