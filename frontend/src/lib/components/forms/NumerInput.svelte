<script lang="ts">
	export let label = '';
	export let id = '';
	export let name = '';
	export let disabled = false;
	export let required = false;
	export let value = 0;
</script>

<div class="grid grid-cols-2 items-center gap-4">
	<label for={id}>{label}</label>
	<input class="rounded-md border-2 p-3" {id} {disabled} {name} {required} {value} type="number" />
</div>
