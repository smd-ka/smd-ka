<script lang="ts">
	export let category: string | undefined = '';
	export let loading = false;
</script>

<select name="category" value={category} disabled={loading} class="w-full rounded-md border-2 py-3">
	<option value="" disabled selected>Kategorie, falls vorhanden</option>
	<option value="smd_abend">SMD-Abend</option>
	<option value="erstsemesteraktion">Erstsemesteraktion</option>
	<option value="kingscafe">Kings-Café</option>
	<option value="german_bible_study">Deutschkurs mit der Bibel</option>
	<option value="MIT">MIT</option>
	<option value="lecture_talk">Hörsaalvortrag</option>
	<option value="">sonstige/keine vorhanden</option>
</select>
