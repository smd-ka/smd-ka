<script lang="ts">
	export let disabled = false;
	export let value: Date | string | undefined;
	let formattedValue = '';
	$: {
		if (value && typeof value === 'string') {
			formattedValue = new Date(value).toISOString().slice(0, 16);
		} else if (value instanceof Date) {
			formattedValue = value.toISOString().slice(0, 16);
		}
	}
	export let label = '';
	export let required: boolean = false;
	export let id = '';
	export let name = '';
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
		<slot></slot>
	</label>
</div>
