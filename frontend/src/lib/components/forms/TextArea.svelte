<script lang="ts">
	interface Props {
		disabled?: boolean;
		name?: string;
		value?: string;
		label?: string;
		required?: boolean;
		id?: any;
		rows?: number;
	}

	let {
		disabled = false,
		name = '',
		value = $bindable(''),
		label = '',
		required = false,
		id = name,
		rows = 3
	}: Props = $props();
</script>

<div class="relative">
	<textarea
		{id}
		bind:value
		class="peer w-full rounded-md border-2 p-3"
		{name}
		placeholder={label}
		{disabled}
		{required}
		{rows}
	></textarea>
	<label
		for={id}
		class="text-secondary-text absolute -top-2.5 left-3 bg-white px-1 opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
	>
		{label}
	</label>
</div>
