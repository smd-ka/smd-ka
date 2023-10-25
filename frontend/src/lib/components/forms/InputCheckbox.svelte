<script lang="ts">
	export let label = '';
	export let checked = false;
	export let id = '';
</script>

<div class="flex gap-2">
	<input bind:checked {id} type="checkbox" />
	<label for={id}>{label}</label>
</div>
