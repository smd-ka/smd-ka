<script lang="ts">
	export let disabled = false;
	export let value = '';
	export let label = '';
	export let required: boolean = false;
	export let id = '';
	export let name = '';
	export let error: boolean = false;
</script>

<div class="relative">
	<input
		{id}
		bind:value
		class="peer w-full rounded-md border-2 p-3 {error ? 'border-red-500' : ''}"
		placeholder={label}
		{name}
		{disabled}
		{required}
		type="email"
	/>
	<label
		for={label}
		class="text-secondary-text absolute -top-2.5 left-3 bg-white px-1 opacity-100 transition-all duration-100 peer-placeholder-shown:opacity-0"
	>
		{label}
	</label>
</div>
