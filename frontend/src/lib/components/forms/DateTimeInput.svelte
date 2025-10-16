<script lang="ts">
	import { run } from 'svelte/legacy';

	import dayjs from 'dayjs';

	let formattedValue = $state('');
	interface Props {
		disabled?: boolean;
		value: Date | string | undefined;
		label?: string;
		required?: boolean;
		id?: string;
		name?: string;
		children?: import('svelte').Snippet;
	}

	let {
		disabled = false,
		value,
		label = '',
		required = false,
		id = '',
		name = '',
		children
	}: Props = $props();
	run(() => {
		if (!value) {
			formattedValue = '';
		} else {
			formattedValue = dayjs(value).format('YYYY-MM-DDTHH:mm');
		}
	});
</script>

<div class="relative">
	<input
		bind:value={formattedValue}
		class="peer w-full rounded-md border-2 p-3"
		placeholder={label}
		{name}
		{disabled}
		{required}
		type="datetime-local"
	/>
	<label
		for={id}
		class="text-secondary-text absolute -top-2.5 left-3 bg-white px-1 opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
	>
		{@render children?.()}
	</label>
</div>
