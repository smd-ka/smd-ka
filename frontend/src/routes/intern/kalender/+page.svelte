<script lang="ts">
	import Fa from 'svelte-fa';
	import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
	import AddEventForm from './addEventForm.svelte';
	import EditEventForm from './editEventForm.svelte';
	import dayjs from 'dayjs';
	import { _duplicateEvent, _eventStore, _shownEvent, type CalendarEvent } from './+page';
	import { onMount } from 'svelte';

	let loading = false;
	let updated = false;

	let eventList: CalendarEvent[] = [];

	onMount(() => {
		_eventStore.subscribe((events) => {
			eventList = events;
		});
	});

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
		_shownEvent.set(event);
		_duplicateEvent.set(undefined);
		updated = false;
	}

	function filterEventsByCategory(category: string) {
		if (!category) {
			_eventStore.subscribe((events) => {
				eventList = events;
			});
			return;
		}
		_eventStore.subscribe((events) => {
			eventList = events.filter((event) => event.category === category);
		});
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
	<button
		on:click={() => {
			_shownEvent.set(undefined);
			_duplicateEvent.set(undefined);
			return;
		}}
		class="bg-primary fa rounded-md p-2 text-white"
	>
		<Fa icon={faPlus}></Fa>
		<span class="max-md:hidden"> Event hinzufügen </span>
	</button>
</nav>

{#if !$_eventStore}
	<p>loadingSpinner</p>
{:else}
	<main class="container mx-auto px-4 pb-8">
		<div></div>

		<p class="mb-2 rounded-md bg-gray-300 text-center">
			Übersetzung wird aktuell nur auf der Kings-Café-Seite angezeigt! Übersetzung ist aber auch für
			die Hauptseite geplant.
		</p>

		<div class="grid gap-4 rounded-lg lg:grid-cols-[32rem_1fr]">
			<section class="h-[82svh] overflow-y-auto overflow-x-hidden text-ellipsis max-lg:h-64">
				<div class="mr-1 grid gap-2">
					<div class="flex">
						<button
							on:click={() => {
								filterEventsByCategory('');
							}}
							class="fa mb-2 rounded-full bg-gray-800 p-2 text-white"
						>
							Alle
						</button>
						<button
							on:click={() => {
								filterEventsByCategory('smd_abend');
							}}
							class="bg-primary fa mb-2 rounded-full p-2 text-white"
						>
							SMD-Abend
						</button>
						<button
							on:click={() => {
								filterEventsByCategory('kingscafe');
							}}
							class="fa mb-2 ml-2 rounded-full bg-gray-800 p-2 text-white"
						>
							King's Café
						</button>
					</div>
					{#each eventList as event}
						<div class="rounded-md bg-white p-4 shadow-md">
							<button
								on:click={() => onChangeEventSelection(event)}
								disabled={loading}
								class="overflow-hidden text-ellipsis py-2 text-left"
							>
								<b class="{$_shownEvent?.id === event.id ? 'text-primary underline' : ''}  "
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
				{#if !$_shownEvent}
					<AddEventForm />
				{:else}
					<EditEventForm shownEvent={$_shownEvent} bind:loading bind:updated />
				{/if}
			</section>
		</div>
	</main>
{/if}
