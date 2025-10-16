<script lang="ts">
	interface Props {
		currentGender?: string;
	}

	let { currentGender = '' }: Props = $props();
</script>

<div class="relative flex gap-4 rounded-md border-2 p-3">
	<span class="text-secondary-text absolute -top-2.5 left-3 bg-white px-1">Geschlecht</span>
	<label for="male">
		<input
			id="male"
			checked={currentGender === 'male'}
			name="gender"
			type="radio"
			value="male"
			required
		/>
		Männlich
	</label>
	<label for="female">
		<input
			checked={currentGender === 'female'}
			id="female"
			name="gender"
			type="radio"
			value="female"
			required
		/>
		Weiblich
	</label>
</div>
