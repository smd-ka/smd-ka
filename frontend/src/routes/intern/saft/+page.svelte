<script lang="ts">
	import type { saftRegistration } from '$lib/models';
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import loadingSpinner from '$lib/assets/loading_spinner.gif';

	let loading = true;
	let error = false;
	let records: saftRegistration[] = [];

	onMount(async () => {
		records = await pb
			.collection('saft')
			.getFullList({ filter: `user="${pb.authStore.model?.id}"` });
		console.log(records);

		loading = false;
	});
</script>

<main class="container mx-auto">
	<div class="card mt-8">
		<h1 class="text-primary text-2xl md:text-4xl">Deine Saftanmeldungen</h1>
		<p>
			Wenn du dich für eine SAFT anmeldest, wird hier eine Übersicht über deine Anmeldungen
			angezeigt. Deine persönlichen Daten werden nicht angezeigt. Wenn du deine Daten ändern
			möchtest, kannst du das im <a class="text-primary" href="/intern/profile">Profil</a> tun.
		</p>

		{#if !records.length && !loading && !error}
			<p>Du scheinst noch auf keiner SAFT gewesen zu sein seit dem WiSe 23/24.</p>
		{/if}

		{#if loading}
			<div class="flex justify-center">
				<img src={loadingSpinner} class="h-32" alt="loading" />
			</div>
		{:else if error}
			<p>Es ist ein Fehler aufgetreten.</p>
		{:else}
			<div class="flex flex-col gap-8 py-8">
				{#each records as record}
					<div class="grid gap-4 md:gap-2">
						<h3 class="text-primary text-lg md:text-2xl">{record.semester}</h3>
						<div>
							<bold class="font-bold">An- und Abreise:</bold>
							<div>
								{#if record.takes_bike}
									Du nimmst an der Fahrradtour teil.
								{/if}
								{#if record.takes_car}
									Du reist mit Auto an.
								{/if}
								{#if record.takes_train}
									Du reist mit Bus und Bahn an. Außerdem hast du folgende Tickets angegeben: {record.ticket}
								{/if}
							</div>
						</div>

						<div>
							<bold class="font-bold">Vegetarier:</bold>
							{record.is_vegetarian ? 'Ja' : 'Nein'}
						</div>
						<div>
							<bold class="font-bold">Allegien bzw. Unverträglichkeiten:</bold>
							<div>
								{record.allergies}
							</div>
						</div>

						<div>
							<bold class="font-bold"> Du bringst einen Kuchen oder Ähnliches mit: </bold>
							<div>{record.brings_cake ? 'Ja' : 'Nein'}</div>
						</div>

						<div>
							<bold class="font-bold"
								>Du könntest dir vorstellen ggf. auf dem Boden zu schlafen und Schlafsack / Isomatte
								mitzubringen:
							</bold>
							<div>{record.would_sleep_on_floor ? 'Ja' : 'Nein'}</div>
						</div>

						<div>
							<bold class="font-bold">Anmerkungen:</bold>
							<div>{record.comments}</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</main>
