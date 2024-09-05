<script lang="ts">
	export let label = '';
	export let checked = false;
	export let id = '';
	export let name = '';
	export let disabled = false;
	export let required = false;
</script>

<div class="flex gap-2">
	<input bind:checked {required} {id} {disabled} {name} type="checkbox" />
	<label for={id}>{label}</label>
</div>
