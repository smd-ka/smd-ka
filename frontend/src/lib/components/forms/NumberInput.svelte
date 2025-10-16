<script lang="ts">
	interface Props {
		label?: string;
		id?: string;
		name?: string;
		disabled?: boolean;
		required?: boolean;
		value?: number;
	}

	let {
		label = '',
		id = '',
		name = '',
		disabled = false,
		required = false,
		value = 0
	}: Props = $props();
</script>

<div class="grid grid-cols-2 items-center gap-4">
	<label for={id}>{label}</label>
	<input class="rounded-md border-2 p-3" {id} {disabled} {name} {required} {value} type="number" />
</div>
