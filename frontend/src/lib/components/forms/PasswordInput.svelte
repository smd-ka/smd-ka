<script lang="ts">
	interface Props {
		disabled?: boolean;
		value?: string;
		label?: string;
		required?: boolean;
		id?: string;
		name?: string;
	}

	let {
		disabled = false,
		value = $bindable(''),
		label = '',
		required = false,
		id = '',
		name = ''
	}: Props = $props();
</script>

<div class="relative">
	<input
		{id}
		bind:value
		class="peer w-full rounded-md border-2 p-3"
		placeholder={label}
		{name}
		{disabled}
		{required}
		type="password"
	/>
	<label
		for={label}
		class="text-secondary-text absolute -top-2.5 left-3 bg-white px-1 opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
	>
		{label}
	</label>
</div>
