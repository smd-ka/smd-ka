<script lang="ts">
	export let label = '';
	export let checked = false;
	export let id = '';
	export let name = '';
	export let disabled = false;
</script>

<div class="flex gap-2">
	<input bind:checked {id} {disabled} {name} type="checkbox" />
	<label for={id}>{label}</label>
</div>
