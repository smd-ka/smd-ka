<script lang="ts">
	interface Props {
		label?: string;
		checked?: boolean;
		id?: string;
		name?: string;
		disabled?: boolean;
		required?: boolean;
	}

	let {
		label = '',
		checked = $bindable(false),
		id = '',
		name = '',
		disabled = false,
		required = false
	}: Props = $props();
</script>

<div class="flex gap-2">
	<input bind:checked {required} {id} {disabled} {name} type="checkbox" />
	<label for={id}>{label}</label>
</div>
