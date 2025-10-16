<script lang="ts">
	interface Props {
		category?: string | undefined;
		loading?: boolean;
	}

	let { category = '', loading = false }: Props = $props();
</script>

<select name="category" value={category} disabled={loading} class="w-full rounded-md border-2 py-3">
	<option value="" disabled selected>Kategorie, falls vorhanden</option>
	<option value="smd_abend">SMD-Abend</option>
	<option value="erstsemesteraktion">Erstsemesteraktion</option>
	<option value="church_hopping">Church Hopping</option>
	<option value="kingscafe">Kings-Café</option>
	<option value="german_bible_study">Deutschkurs mit der Bibel</option>
	<option value="MIT">MIT</option>
	<option value="lecture_talk">Hörsaalvortrag</option>
	<option value="">sonstige/keine vorhanden</option>
</select>
